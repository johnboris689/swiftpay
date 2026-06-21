const { Low } = require('lowdb')
const { JSONFile } = require('lowdb/node')
const path = require('path')

const file = path.join(__dirname, 'swiftpay-db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)

async function initDB() {
  await db.read()
  db.data ||= { users: [], transactions: [] }
  await db.write()
}

// Get wallet
async function getWallet(email) {
  await initDB()

  let user = db.data.users.find(u => u.email === email)

  if (!user) {
    user = { email, balance: 200000 }
    db.data.users.push(user)
    await db.write()
  }

  return user
}

// Update wallet
async function updateBalance(email, amount, type) {
  await initDB()

  const user = await getWallet(email)

  if (type === "debit" && user.balance < amount) {
    return { error: "Insufficient funds" }
  }

  user.balance =
    type === "credit"
      ? user.balance + amount
      : user.balance - amount

  db.data.transactions.push({
    email,
    type,
    amount,
    date: new Date().toISOString()
  })

  await db.write()

  return { success: true, balance: user.balance }
}

module.exports = { db, getWallet, updateBalance }
