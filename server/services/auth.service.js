const bcrypt = require("bcrypt");
const usersService = require("./users.service");
const jwt = require("jsonwebtoken");
const db = require("../utils/database");

const signup = (Username, Email, Passwords) => {
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(Passwords, salt);
  return usersService.create(Username, Email, hashPassword);
};

const signin = async (Email, Passwords) => {
  console.log(Email, Passwords);
  try {
    let findUser = await usersService.findOneByEmail(Email);
    let [rows] = findUser;
    if (rows.length === 0) {
      return {
        status: "fasle email",
        message: "Không tìm thấy người dùng",
      };
    } else {
      let hashPassword = rows[0].Passwords;
      let compare = bcrypt.compareSync(Passwords, hashPassword);

      if (!compare) {
        return {
          status: "Thất bại",
          message: "Mật khẩu không đúng",
        };
      } else {
        let token = jwt.sign(
          {
            data: { id: rows[0].UserID, email: rows[0].Email },
          },
          "vantu",
          { expiresIn: "1h" }
        );
        return {
          status: "Thành công",
          message: "Đăng nhập thành công",
          token,
          Username: rows[0].Username,
          UserID: rows[0].UserID,
        };
      }
    }
  } catch (error) {
    return error;
  }
};

module.exports = { signup, signin };
