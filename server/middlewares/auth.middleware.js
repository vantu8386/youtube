const jwt = require("jsonwebtoken");
const usersService = require("../services/users.service");
module.exports.isAuth = async (req, res, next) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
  

    let result = jwt.verify(token, "vantu");

    let { id } = result.data;

    let user = await usersService.findOne(id);

    if (user) {
      next();
    } else {
      res.json({
        message: "Unauthorized",
      });
    }
  } catch (error) {
    res.json({
      error,
    });
  }
};
