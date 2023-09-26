const express = require("express");
const router = express.Router();
const db = require("../utils/database");

const {
  findAll,
  subscriptions,
  findOne,
  create,
} = require("../controllers/users.controller");
const { isAuth } = require("../middlewares/auth.middleware");

router.get("/", isAuth, findAll);

router.get("/subscriptions/:username", subscriptions);

router.get("/:id", findOne);

router.post("/", isAuth, create);

module.exports = router;
