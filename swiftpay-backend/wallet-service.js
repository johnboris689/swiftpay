const { getWallet, updateBalance } = require("./db");
const { addNotification } = require("./notifications");

async function debit(email, amount, reason="Transaction") {

  const result = await updateBalance(email, amount, "debit");

  if (result.error) return result;

  const event = {
    type: "wallet-debit",
    email,
    message: `${reason} -₦${amount}`,
    balance: result.balance,
    time: new Date().toISOString()
  };

  await addNotification(email, event.message, "success");

  if (global.broadcast) global.broadcast(event);

  return result;
}

async function credit(email, amount, reason="Credit") {

  const result = await updateBalance(email, amount, "credit");

  const event = {
    type: "wallet-credit",
    email,
    message: `${reason} +₦${amount}`,
    balance: result.balance,
    time: new Date().toISOString()
  };

  await addNotification(email, event.message, "success");

  if (global.broadcast) global.broadcast(event);

  return result;
}

module.exports = { debit, credit };
