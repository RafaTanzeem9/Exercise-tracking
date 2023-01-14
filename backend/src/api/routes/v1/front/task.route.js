const express = require("express");
const {
  getTask,
  createTask,
} = require("../../../controllers/front/task.controller");
const { protect } = require("../../../middlewares/front/auth");
const router = express.Router();

router.get("/", protect, getTask);

router.post("/", protect, createTask);

module.exports = router;
