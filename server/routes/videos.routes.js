const express = require("express");
const router = express.Router();
const db = require("../utils/database");

const {
  videoAll,
  videoOne,
  videoUserName,
  videoLikes,
  VideoDislikes,
  updateVideo,
  deleteVideo,
} = require("../controllers/videos.controller");

router.get("/", videoAll);

router.get("/:id", videoOne);

router.get("/userName/:userName", videoUserName);

router.post("/like", videoLikes);

router.post("/dislike", VideoDislikes);

router.put("/:id", updateVideo);

router.delete("/userName/:id", deleteVideo);

module.exports = router;
