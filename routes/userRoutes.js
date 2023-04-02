const express = require("express");

const userController = require("../controllers/userController");

const router = express.Router();

router.get("/users/me", userController.readMyUser);

module.exports = router;
