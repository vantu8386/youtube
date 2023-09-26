const usersService = require("../services/users.service");
const db = require("../utils/database");

const findAll = async (req, res) => {
  try {
    const resutl = await usersService.findAll();
    let [rows] = resutl;
    res.status(200).json({
      message: "GetAll users thành công",
      users: rows,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

const subscriptions = async (req, res) => {
  try {
    const username = req.params.username;

    const [results] = await usersService.subscriptions(username);

    const subscribedChannelsWithAvatar = results.map((row) => ({
      AvatarUrl: row.AvatarUrl,
      ChannelName: row.ChannelName,
    }));

    res.json({ subscribedChannels: subscribedChannelsWithAvatar });
  } catch (error) {
    console.error("Lỗi truy vấn cơ sở dữ liệu:", error);
    res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
  }
};

const findOne = async (req, res) => {
  const { id } = req.params;
  try {
    const resutl = await usersService.findOne(id);
    let [rows] = resutl;
    res.status(200).json({
      message: "GetOne users thành công",
      users: rows,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

const create = async (req, res) => {
  const { Username, Email, Passwords } = req.body;
  try {
    let result = await usersService.create(Username, Email, Passwords);
    let [rows] = result;
    res.status(200).json({
      message: `Thêm thành công username`,
      username: rows,
    });
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({
      error: error,
    });
  }
};

module.exports = { findAll, subscriptions, findOne, create };
