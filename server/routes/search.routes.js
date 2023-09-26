const express = require("express");
const router = express.Router();
const db = require("../utils/database");

router.get("/", async (req, res) => {
  const { search } = req.query;
  console.log("search:", search)

  try {
    const [sql] = await db.query(
      `
      SELECT v.VideoID, c.ChannelName, u.Username, u.AvatarUrl,  
      v.Title, v.Descriptions, v.URL, DATE_FORMAT(v.UploadDate, '%Y-%m-%d') AS UploadDate, v.Views, v.Likes
      FROM channels AS c
      INNER JOIN videos AS v 
      ON c.ChannelID = v.ChannelID
      INNER JOIN users AS u
      ON u.UserID = c.UserID
      WHERE c.ChannelName LIKE ? OR u.Username LIKE ? OR v.Title LIKE ?
      `,
      [`%${search}%`, `%${search}%`, `%${search}%`]
    );
    res.status(201).json(sql);
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({
      error: error.message,
    });
  }
});

module.exports = router;
