const authService = require("../services/auth.service");
const db = require("../utils/database");

const signup = async (req, res) => {
  let { Username, Email, Passwords } = req.body;
  try {
    const [userResult] = await authService.signup(Username, Email, Passwords);
    console.log("userResult:", userResult);
    const userId = userResult.insertId;
    const randomChannel = Math.random().toString(36).substring(2, 8);
    await db.execute(
      "INSERT INTO Channels (ChannelName, Subscribers, UserID) VALUES (?, 0, ?)",
      [Username + "'s Channel" + randomChannel, userId]
    );

    res.json({
      message: "Đăng ký và tạo kênh thành công",
    });
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({
      error: error,
    });
  }
};

const signin = async (req, res) => {
  let { Email, Passwords } = req.body;
  try {
    let result = await authService.signin(Email, Passwords);
    res.json({
      result,
    });
  } catch (error) {
    console.log("error:", error);
  }
};

module.exports = { signup, signin };
