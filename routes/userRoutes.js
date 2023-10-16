const express = require("express");

const userController = require("../controllers/userController");
const loginController = require("../controllers/loginController");

const router = express.Router();

router.get("/users/me", [loginController.isLogged, userController.readMyUser]);
router.get("/users/any/:id", [
  loginController.isLogged,
  userController.readAnyUser,
]);

module.exports = router;
