const express = require("express");
const router = express.Router();
const multer = require("multer");
const db = require("../utils/database");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/videos");
  },
  filename: function (req, file, cb) {
    let ext = file.originalname.split(".")[1];
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + `.${ext}`;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
  try {
    const dataVideo = await db.execute("SELECT * FROM videos");
    res.json({
      message: "Lấy thành công all video",
      dataVideo: dataVideo[0],
    });
  } catch (error) {
    res.json({
      error: error,
    });
  }
});

router.post("/video/:userID", upload.single("uploads"), async (req, res) => {
  const { title, descriptions, views = 0, likes = 0, dislikes = 0 } = req.body;

  const { userID } = req.params;

  const [channelData] = await db.execute(
    "SELECT ChannelID FROM Channels WHERE UserID = ?",
    [userID]
  );

  if (channelData.length === 0) {
    res.status(404).json({ message: "Không tìm thấy channel của UserID này." });
    return;
  }

  const channelID = channelData[0].ChannelID;

  let originalname;
  if (req.file) {
    originalname = {
      videoUrl: `http://localhost:3000/videos/${req.file.filename}`,
    };
  }

  try {
    const [dataVideo] = await db.execute(
      `INSERT INTO videos (Title, Descriptions, URL, UploadDate, Views, Likes, Dislikes, ChannelID) VALUES (?, ?, ?, NOW(), ?, ?, ?, ?)`,
      [
        title,
        descriptions,
        originalname.videoUrl,
        views,
        likes,
        dislikes,
        channelID,
      ]
    );

    if (dataVideo.affectedRows > 0) {
      res
        .status(200)
        .json({ message: "Video đã được tải lên và lưu vào cơ sở dữ liệu." });
    } else {
      res.status(400).json({ message: "Tải video thất bại" });
    }
  } catch (error) {
    console.error("----------", error);
    res.status(500).json({ message: "Lỗi khi lưu video vào cơ sở dữ liệu." });
  }
});

module.exports = router;
