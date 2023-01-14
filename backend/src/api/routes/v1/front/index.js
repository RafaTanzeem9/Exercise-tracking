const express = require("express");
const userRoutes = require("./user.route");
const taskRoutes = require("./task.route");

const router = express.Router();
// const { cpUpload } = require("../../../utils/upload");
/**
 * GET v1/status
 */

router.use("/user", userRoutes);
router.use("/task", taskRoutes);

module.exports = router;
