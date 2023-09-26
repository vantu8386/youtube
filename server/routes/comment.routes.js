const express = require("express");
const router = express.Router();
const db = require("../utils/database");

router.get("/:videoId", async (req, res) => {
  try {
    const videoId = req.params.videoId;
    const commentsQuery = `
        SELECT Comments.CommentID, Comments.CommentText, Comments.CommentDate,
        Users.UserID, Users.Username, Users.AvatarUrl
        FROM Comments
        INNER JOIN Users ON Comments.UserID = Users.UserID
        WHERE Comments.VideoID = ?
      `;

    const [comments] = await db.execute(commentsQuery, [videoId]);

    const commentUsers = comments.map((comment) => ({
      userId: comment.UserID,
      username: comment.Username,
      avatarUrl: comment.AvatarUrl,
    }));

    res.status(200).json({
      comments: comments,
      // commentUsers: commentUsers,
    });
  } catch (error) {
    console.error("Lỗi lấy bình luận của video:", error);
    res.status(500).json({ message: "Lỗi lấy bình luận của video" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { VideoID, UserID, CommentText } = req.body;
    console.log("CommentText:", CommentText);
    console.log("UserID:", UserID);
    console.log("VideoID:", VideoID);

    const result = await db.execute(
      "INSERT INTO Comments (VideoID, UserID, CommentText, CommentDate) VALUES (?, ?, ?, NOW())",
      [VideoID, UserID, CommentText]
    );

    if (result[0].affectedRows === 1) {
      res.status(201).json({ message: "Bình luận đã được thêm thành công." });
    } else {
      res.status(500).json({ message: "Không thể thêm bình luận." });
    }
  } catch (error) {
    console.error("Lỗi khi thêm bình luận:", error);
    res.status(500).json({ message: "Lỗi khi thêm bình luận." });
  }
});

module.exports = router;
