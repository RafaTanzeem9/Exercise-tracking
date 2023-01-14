const express = require("express");
const router = express.Router();
const { protect, admin } = require("../../../middlewares/front/auth");
const {
  authUser,
  getUserProfile,
  registerUser,
  refreshToken,
  userLogout,
  getUser,
  resetPassword,
  forgotPassword,
} = require("../../../controllers/front/user.controller");
const upload = require("../../../utils/upload");
router.post("/login", authUser);
router.post("/resetPassword", protect, resetPassword);
router.post("/forgotPassword", forgotPassword);
router.route("/profile").get(protect, getUserProfile);
router.route("/refreshToken").get(refreshToken);
router.route("/logout").get(userLogout);
router.route("/").post(upload.uploadSingle, registerUser);
router.route("/").get(admin, getUser);

module.exports = router;
