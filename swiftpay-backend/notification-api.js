const express = require("express");
const { getNotifications } = require("./notifications");

const router = express.Router();

router.get("/notifications", async (req, res) => {
  const email = req.headers.authorization;

  const notes = await getNotifications(email);

  res.json(notes);
});

module.exports = router;
