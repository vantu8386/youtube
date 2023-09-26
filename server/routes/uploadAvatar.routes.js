const express = require("express");
const router = express.Router();
const multer = require("multer");
const db = require("../utils/database");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/avatar");
  },
  filename: function (req, file, cb) {
    let ext = file.originalname.split(".")[1];
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + `.${ext}`;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

router.put("/avatar/:id", upload.single("uploads"), async (req, res) => {
  const { id } = req.params;

  let newUpload;

  if (req.file) {
    newUpload = {
      AvatarUrl: `http://localhost:3000/avatar/${req.file.filename}`,
    };
  }

  try {
    const [dataAvatar] = await db.execute(
      `UPDATE users SET AvatarUrl = ? WHERE UserID = ?`,
      [newUpload.AvatarUrl, id]
    );

    if (dataAvatar.affectedRows > 0) {
      res.status(200).json({
        message: "Avatar đã được tải lên và lưu vào cơ sở dữ liệu.",
      });
    } else {
      res.status(500).json({
        message: "Không thể cập nhật Avatar trong cơ sở dữ liệu.",
      });
    }
  } catch (error) {
    res.json({
      error: error,
    });
  }
});

module.exports = router;
