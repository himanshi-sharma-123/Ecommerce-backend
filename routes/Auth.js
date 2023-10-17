const express = require("express");
const {
  createUser,
  loginUser,
  checkUser,
  checkAuth,
  resetPasswordRequest,
  resetPassword,
  logout,
} = require("../controller/Auth");
const router = express.Router();
const passport = require("passport");
// /user is already added in base path
router
  .post("/signup", createUser)
  .post("/login", passport.authenticate("local"), loginUser)
  .get("/check", passport.authenticate("jwt"), checkAuth)
  .get("/logout", logout)
  .post("/reset-password-request", resetPasswordRequest)
  .post("/reset-password", resetPassword);

exports.router = router;
