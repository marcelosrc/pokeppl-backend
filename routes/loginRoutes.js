const express = require("express");
const passport = require("passport");

const loginController = require("../controllers/loginController");

const router = express.Router();

//router.post("/login", loginController.login);
router.get("/logout", loginController.logout);
router.get("/login/auth/facebook", passport.authenticate("facebook"));
router.get("/login/auth/facebook/redirect", [
  passport.authenticate("facebook", {
    failureRedirect: "http://www.turmadamonica.com.br",
    failureMessage: true,
  }),
  loginController.login,
]);

module.exports = router;
