const db = require("../utils/database");

const findAll = () => {
  return db.execute("SELECT * FROM users");
};

const subscriptions = (username) => {
  return   db.execute(
      `
        SELECT Users.AvatarUrl, Channels.ChannelName
        FROM Users
        JOIN Subscriptions ON Users.UserID = Subscriptions.SubscriberID
        JOIN Channels ON Subscriptions.ChannelID = Channels.ChannelID
        WHERE Users.Username = ?
      `,
      [username]
    )
}

const findOne = (id) => {
  return db.execute("SELECT * FROM users WHERE UserID = ?", [id]);
};

const findOneByEmail = (Email) => {
  return db.execute("SELECT * FROM users WHERE Email = ?", [Email]);
};

const create = (Username, Email, Passwords) => {
  return db.execute(
    "INSERT INTO users (Username, Email, Passwords) VALUES (?, ?, ?)",
    [Username, Email, Passwords]
  );
};

module.exports = { findAll,subscriptions, findOne, findOneByEmail, create };
