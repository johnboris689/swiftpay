const express = require("express");
const { Wallet, Transaction, initDB } = require("./db");

const app = express();
app.use(express.json());

initDB();

// GET WALLET
app.get("/api/wallet", async (req, res) => {
  const email = req.headers.authorization;
  let wallet = await Wallet.findOne({ where: { email } });

  if (!wallet) {
    wallet = await Wallet.create({ email, balance: 200000 });
  }

  res.json(wallet);
});

// CREDIT / DEBIT
app.post("/api/transaction", async (req, res) => {
  const { email, type, amount } = req.body;

  let wallet = await Wallet.findOne({ where: { email } });
  if (!wallet) wallet = await Wallet.create({ email, balance: 0 });

  if (type === "debit" && wallet.balance < amount) {
    return res.json({ message: "Insufficient funds" });
  }

  wallet.balance =
    type === "credit"
      ? wallet.balance + amount
      : wallet.balance - amount;

  await wallet.save();

  await Transaction.create({ email, type, amount });

  res.json({ message: "Success", balance: wallet.balance });
});

// TRANSACTION HISTORY
app.get("/api/transactions", async (req, res) => {
  const email = req.headers.authorization;

  const tx = await Transaction.findAll({
    where: { email },
    order: [["id", "DESC"]],
  });

  res.json(tx);
});

module.exports = app;
