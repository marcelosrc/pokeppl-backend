const express = require("express");
const passport = require("passport");

const loginController = require("../controllers/loginController");

const router = express.Router();

router.get("/checkauth", loginController.checkCurrentSession);

router.get("/login/auth/facebook", passport.authenticate("facebook"));
router.get("/login/auth/facebook/redirect", [
  passport.authenticate("facebook", {
    failureRedirect: "http://www.turmadamonica.com.br",
    failureMessage: true,
  }),
  loginController.currentSession,
]);
router.get("/logout", loginController.logout);

module.exports = router;
