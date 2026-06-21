const express = require("express");
const { debit } = require("./wallet-service");

const router = express.Router();

router.post("/buy-data", async (req, res) => {
  const { email, amount, plan, phone } = req.body;

  const result = await debit(email, amount);

  if (result.error) {
    return res.json({ success: false, message: result.error });
  }

  return res.json({
    success: true,
    message: "Data purchase successful",
    balance: result.balance
  });
});

module.exports = router;
