const { db } = require("./db");

async function addNotification(email, message, type="info") {
  await db.read();

  db.data.notifications ||= [];

  db.data.notifications.push({
    email,
    message,
    type,
    date: new Date().toISOString(),
    read: false
  });

  await db.write();
}

async function getNotifications(email) {
  await db.read();

  return db.data.notifications
    .filter(n => n.email === email)
    .reverse();
}

module.exports = { addNotification, getNotifications };
