const express = require("express");
const router = express.Router();
const db = require("../utils/database");



// get channel
router.get("/:username", async (req, res) => {
  const { username } = req.params;
  try {
    let result = await db.execute(
      `
    SELECT v.VideoID, c.ChannelName, u.Username, u.AvatarUrl,  
      v.Title, v.Descriptions, v.URL, DATE_FORMAT(v.UploadDate, '%Y-%m-%d') AS UploadDate, v.Views, v.Likes, v.Dislikes
      FROM channels AS c
      INNER JOIN videos AS v 
      ON c.ChannelID = v.ChannelID
      INNER JOIN users AS u
      ON u.UserID = c.UserID
      WHERE Username = ?
    `,
      [username]
    );

    let [rows] = result;
    res.status(200).json({
      message: `Lấy thành công username: ${username}`,
      username: rows,
    });
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({
      error: error,
    });
  }
});

router.post("/",async (req, res) => {
  try {
    const sql = await db.execute("INSERT INTO channels VALUES (ChannelName, Subscribers, UserID) VALUES (?, 0, ?)")
  } catch (error) {
    res.status(500).json({
      error: error,
    })
  }
} )

module.exports = router;
