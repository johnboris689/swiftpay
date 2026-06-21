const express = require("express");
const { debit } = require("./wallet-service");

const router = express.Router();

router.post("/buy-bpc", async (req, res) => {
  const { email, amount } = req.body;

  const result = await debit(email, amount);

  if (result.error) {
    return res.json({ success: false, message: result.error });
  }

  return res.json({
    success: true,
    message: "BPC payment successful",
    redirect: "/pages/bpc/countdown.html",
    balance: result.balance
  });
});

module.exports = router;
