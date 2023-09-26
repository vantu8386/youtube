const videosServices = require("../services/videos.service");
const db = require("../utils/database");

const videoAll = async (req, res) => {
  try {
    const result = await videosServices.videoAll();
    let [rows] = result;
    res.status(200).json({
      message: "Lấy thành công",
      videos: rows,
    });
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({
      error: error,
    });
  }
};

const videoOne = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await videosServices.videoOne(id);
    let [rows] = result;
    console.log(result);
    if (rows.length > 0) {
      res.status(200).json({
        message: `Lấy thành công id: ${id}`,
        videoId: rows,
      });
    } else {
      res.status(500).json({
        message: `Không tìm thấy video có id: ${id}`,
      });
    }
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({
      error: error,
    });
  }
};


const videoUserName = async (req, res) => {
  const { userName } = req.params;
  const { page_number, page_index } = req.query;

  try {
    let result;

    if (page_number && page_index) {
     
      result = await db.execute(
        `
        SELECT v.VideoID, c.ChannelName, u.AvatarUrl, u.Username,
        v.Title, v.Descriptions, v.URL, DATE_FORMAT(v.UploadDate, '%Y-%m-%d') AS UploadDate, v.Views, v.Likes, v.Dislikes
        FROM channels AS c
        INNER JOIN videos AS v
        ON c.ChannelID = v.ChannelID
        INNER JOIN users AS u
        ON u.UserID = c.UserID
        WHERE u.Username = ? 
        LIMIT ? OFFSET ?
        `,
        [
          userName,
          Number(page_number),
          (Number(page_index) - 1) * Number(page_number) || 0,
        ]
      );
    } else {
    
      result = await videosServices.videoUserName(userName);
    }

    let [rows] = result;
    console.log(result);

    if (rows.length > 0) {
      res.status(200).json({
        message: `Lấy thành công userName: ${userName}`,
        videoId: rows,
      });
    } else {
      res.status(500).json({
        message: `Không tìm thấy userName: ${userName}`,
      });
    }
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({
      error: error,
    });
  }
};

const videoLikes = async (req, res) => {
  const { VideoID, UserID } = req.body;
  try {
    const existingDislike = await videosServices.checkLike(VideoID, UserID);

    if (existingDislike[0].length > 0) {
      await videosServices.dislike(VideoID);

      await videosServices.deleteDislike(VideoID, UserID);

      res.status(200).json({ message: "Thay đổi thành công: dislike -> like" });
      return;
    }

    const existingLike = await videosServices.getAllLikes(VideoID, UserID);

    if (existingLike[0].length > 0) {
      res.status(400).json({ message: "Bạn đã like video này rồi" });
      return;
    }

    await videosServices.postUserLike(VideoID, UserID);

    await videosServices.updateLike(VideoID);

    res.status(200).json({ message: "Like video thành công" });
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({ error: error });
  }
};

const VideoDislikes = async (req, res) => {
  const { VideoID, UserID } = req.body;
  try {
    const existingLike = await videosServices.getAllLikes(VideoID, UserID);

    if (existingLike[0].length > 0) {
      await videosServices.dislikeReduce(VideoID);

      await videosServices.deleteLike(VideoID, UserID);

      res.status(200).json({ message: "Thay đổi thành công: like -> dislike" });
      return;
    }

    // Kiểm tra người dùng đã dislike video này chưa
    const existingDislike = await videosServices.checkLike(VideoID, UserID);

    if (existingDislike[0].length > 0) {
      res.status(400).json({ message: "Bạn đã dislike video này rồi" });
      return;
    }

    await videosServices.postVideoDisLike(VideoID, UserID);

    // Sau khi thêm dislike vào VideoDislikes, cập nhật số lượng dislikes trong bảng Videos
    await videosServices.updateDislikes(VideoID);

    res.status(200).json({ message: "Dislike video thành công" });
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({ error: error });
  }
};

const updateVideo = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  console.log("description:", description)
  console.log("title:", title)
  try {
    const sql = await videosServices.updateVideo(title, description, id);
    if (sql[0].affectedRows > 0) {
      res.status(200).json({
        message: `sửa thành công id: ${id}`,
      });
    } else {
      res.status(404).json({
        message: `không tìm thấy id: ${id}`,
      });
    }
  } catch (error) {
    console.log("err::", error);
    res.status(500).json({
      error: error,
    });
  }
};


const deleteVideo = async (req, res) => {
  const { id } = req.params;
  console.log("id:", id)
  try {
    // check video có bình luận không
    const checkCommentsSql = await videosServices.checkCommentsSql(id);
    const comments = checkCommentsSql[0];

    //check video có lượt thích không
    const checkLikesSql = await videosServices.checkLikesSql(id);
    const likes = checkLikesSql[0];

    if (comments.length === 0 && likes.length === 0) {
      // không có bình luận và thích ==> xóa video nha :)
      const deleteVideoSql = await videosServices.deleteVideo(id);
      const affectedRows = deleteVideoSql[0].affectedRows;

      if (affectedRows === 0) {
        res.status(404).json({
          message: `Xóa không thành công, không tìm thấy id: ${id}`,
        });
      } else {
        res.status(200).json({
          message: `Xóa thành công id: ${id}`,
        });
      }
    } else {
      const deleteVideoSql = await videosServices.deleteVideo(id);
      const deleteCommentsSql = await videosServices.deleteCommentsSql(id)
      const deleteLikesSql = await videosServices.deleteLikesSql(id)

      const affectedRowsVideo = deleteVideoSql[0].affectedRows;
      const affectedRowsComments = deleteCommentsSql[0].affectedRows;
      const affectedRowsLikes = deleteLikesSql[0].affectedRows;

      if (affectedRowsVideo === 0 || affectedRowsComments === 0 || affectedRowsLikes === 0) {
        res.status(500).json({
          message: `Xóa không thành công id: ${id}`,
        });
      } else {
        res.status(200).json({
          message: `Xóa thành công id: ${id} cùng với bình luận và thích tương ứng`,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};


module.exports = {
  videoAll,
  videoOne,
  videoUserName,
  videoLikes,
  VideoDislikes,
  updateVideo,
  deleteVideo,
};
