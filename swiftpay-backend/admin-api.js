const express = require("express");
const { credit, debit } = require("./wallet-service");
const { db } = require("./db");

const router = express.Router();

// LIST ALL USERS
router.get("/admin/users", async (req, res) => {
  await db.read();
  res.json(db.data.users);
});

// LIST ALL TRANSACTIONS
router.get("/admin/transactions", async (req, res) => {
  await db.read();
  res.json(db.data.transactions);
});

// ADMIN CREDIT USER
router.post("/admin/credit", async (req, res) => {
  const { email, amount } = req.body;

  const result = await credit(email, amount, "Admin Credit");

  res.json(result);
});

// ADMIN DEBIT USER
router.post("/admin/debit", async (req, res) => {
  const { email, amount } = req.body;

  const result = await debit(email, amount, "Admin Debit");

  res.json(result);
});

module.exports = router;
