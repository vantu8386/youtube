const db = require("../utils/database");

const videoAll = () => {
  return db.execute(`
    SELECT v.VideoID, c.ChannelName, u.Username, u.AvatarUrl,  
    v.Title, v.Descriptions, v.URL, DATE_FORMAT(v.UploadDate, '%Y-%m-%d') AS UploadDate, Views 
    FROM channels AS c
    INNER JOIN videos AS v 
    ON c.ChannelID = v.ChannelID
    INNER JOIN users AS u
    ON u.UserID = c.UserID
    `);
};

const videoOne = (id) => {
  return db.execute(
    `
    SELECT v.VideoID, c.ChannelID, c.ChannelName, u.Username, u.AvatarUrl,  
    v.Title, v.Descriptions, v.URL, DATE_FORMAT(v.UploadDate, '%Y-%m-%d')
    AS UploadDate,  v.Views, v.Likes, v.Dislikes
    FROM channels AS c
    INNER JOIN videos AS v ON c.ChannelID = v.ChannelID
    INNER JOIN users AS u ON u.UserID = c.UserID 
    WHERE v.VideoID = ?
    `,
    [id]
  );
};


const videoUserName = (userName) => {
  return db.execute(
    `
    SELECT v.VideoID, c.ChannelName, u.AvatarUrl, u.Username,
    v.Title, v.Descriptions, v.URL, DATE_FORMAT(v.UploadDate, '%Y-%m-%d') AS UploadDate, v.Views, v.Likes, v.Dislikes
    FROM channels AS c
    INNER JOIN videos AS v
    ON c.ChannelID = v.ChannelID
    INNER JOIN users AS u
    ON u.UserID = c.UserID
    WHERE u.Username = ?
    `,
    [userName]
  );
};

// ===============likes==================

// Kiểm tra xem người dùng đã dislike video này chưa
const checkLike = (VideoID, UserID) => {
  return db.execute(
    "SELECT * FROM VideoDislikes WHERE VideoID = ? AND UserID = ?",
    [VideoID, UserID]
  );
};
// Nếu đã dislike rồi, hãy trừ đi một lượt dislike và cộng thêm một lượt like
const dislike = (VideoID) => {
  return db.execute(
    "UPDATE Videos SET Dislikes = Dislikes - 1, Likes = Likes + 1 WHERE VideoID = ?",
    [VideoID]
  );
};
// Sau đó, xóa dislike từ bảng VideoDislikes
const deleteDislike = (VideoID, UserID) => {
  return db.execute(
    "DELETE FROM VideoDislikes WHERE VideoID = ? AND UserID = ?",
    [VideoID, UserID]
  );
};

const getAllLikes = (VideoID, UserID) => {
  return db.execute(
    "SELECT * FROM VideoLikes WHERE VideoID = ? AND UserID = ?",
    [VideoID, UserID]
  );
};
// Thêm dữ liệu vào bảng VideoLikes
const postUserLike = (VideoID, UserID) => {
  return db.execute("INSERT INTO VideoLikes (VideoID, UserID) VALUES (?, ?)", [
    VideoID,
    UserID,
  ]);
};
// Sau khi thêm like vào VideoLikes, cập nhật số lượng likes trong bảng Videos
const updateLike = (VideoID) => {
  return db.execute("UPDATE Videos SET Likes = Likes + 1 WHERE VideoID = ?", [
    VideoID,
  ]);
};

// ===================dislikes=================

// Nếu đã like rồi, hãy trừ đi một lượt like và cộng thêm một lượt dislike
const dislikeReduce = (VideoID) => {
  return db.execute(
    "UPDATE Videos SET Likes = Likes - 1, Dislikes = Dislikes + 1 WHERE VideoID = ?",
    [VideoID]
  );
};

// Sau đó, xóa like từ bảng VideoLikes
const deleteLike = (VideoID, UserID) => {
  return db.execute("DELETE FROM VideoLikes WHERE VideoID = ? AND UserID = ?", [
    VideoID,
    UserID,
  ]);
};

// Thêm dữ liệu vào bảng VideoDislikes
const postVideoDisLike = (VideoID, UserID) => {
  return db.execute(
    "INSERT INTO VideoDislikes (VideoID, UserID) VALUES (?, ?)",
    [VideoID, UserID]
  );
};

const updateDislikes = (VideoID) => {
  return db.execute(
    "UPDATE Videos SET Dislikes = Dislikes + 1 WHERE VideoID = ?",
    [VideoID]
  );
};

const updateVideo = (title, description, id) => {
  return db.execute(
    "UPDATE videos SET Title = ?, Descriptions = ? WHERE VideoID = ?",
    [title, description, id]
  );
};

// deletevideos

const deleteVideo = (id) => {
  return db.execute("DELETE FROM videos WHERE VideoID = ?", [id]);
};

const checkCommentsSql = (id) => {
  return db.execute("SELECT * FROM Comments WHERE VideoID = ?", [id]);
};

const checkLikesSql = (id) => {
  return db.execute("SELECT * FROM VideoLikes WHERE VideoID = ?", [id]);
};

const deleteCommentsSql = (id) => {
  return db.execute("DELETE FROM Comments WHERE VideoID = ?", [id]);
};

const deleteLikesSql = (id) => {
  return db.execute("DELETE FROM VideoLikes WHERE VideoID = ?", [id]);
}

module.exports = {
  videoAll,
  videoOne,
  videoUserName,
  checkLike,
  dislike,
  deleteDislike,
  getAllLikes,
  postUserLike,
  updateLike,
  dislikeReduce,
  deleteLike,
  postVideoDisLike,
  updateDislikes,
  updateVideo,
  deleteVideo,
  checkCommentsSql,
  checkLikesSql,
  deleteCommentsSql,
  deleteLikesSql,
};
