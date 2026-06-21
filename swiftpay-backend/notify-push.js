const { db } = require("./db");

async function pushNotification(email, message, type="success"){
  await db.read();

  db.data.notifications ||= [];

  db.data.notifications.unshift({
    email,
    message,
    type,
    read:false,
    date:new Date().toISOString()
  });

  await db.write();
}

module.exports = { pushNotification };
