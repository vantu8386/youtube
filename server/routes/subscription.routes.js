const express = require("express");
const router = express.Router();
const db = require("../utils/database");

router.get("/", async (req, res) => {
  try {
    const sql = await db.execute(
      `SELECT s.SubscriptionID, s.SubscriberID,  c.ChannelID, c.ChannelName
      FROM subscriptions AS s
      INNER JOIN Channels AS c
      ON s.ChannelID = c.ChannelID`
    );
    res.json(sql[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server." });
  }
});

// lấy 1 kênh
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const sql = await db.execute(
      `SELECT s.SubscriptionID, s.SubscriberID,  c.ChannelID, c.ChannelName
      FROM subscriptions AS s
      INNER JOIN Channels AS c
      ON s.ChannelID = c.ChannelID
      WHERE s.SubscriberID = ?`,
      [id]
    );
    res.json(sql[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server." });
  }
});

// đăng ký kênh
router.post("/", async (req, res) => {
  try {
    const { SubscriberID, ChannelID } = req.body;

    const [subscription] = await db.execute(
      "SELECT * FROM Subscriptions WHERE SubscriberID = ? AND ChannelID = ?",
      [SubscriberID, ChannelID]
    );

    if (subscription.length > 0) {
      return res.status(400).json({ message: "Đăng ký đã tồn tại." });
    }

    await db.execute(
      "INSERT INTO Subscriptions (SubscriberID, ChannelID, SubscriptionDate) VALUES (?, ?, NOW())",
      [SubscriberID, ChannelID]
    );

    res.status(201).json({ message: "Đã đăng ký thành công." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server." });
  }
});

//  hủy đăng ký kênh
router.delete("/", async (req, res) => {
  try {
    const { SubscriberID, ChannelID } = req.body;
    console.log("ChannelID:", ChannelID);
    console.log("SubscriberID:", SubscriberID);

    const [subscription] = await db.execute(
      "SELECT * FROM Subscriptions WHERE SubscriberID = ? AND ChannelID = ?",
      [SubscriberID, ChannelID]
    );

    if (subscription.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy đăng ký." });
    }

    await db.execute(
      "DELETE FROM Subscriptions WHERE SubscriberID = ? AND ChannelID = ?",
      [SubscriberID, ChannelID]
    );

    res.json({ message: "Đã hủy đăng ký thành công." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server." });
  }
});

module.exports = router;
