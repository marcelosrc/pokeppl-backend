const express = require("express");

const userController = require("../controllers/userController");

const router = express.Router();

router.get("/users/me", userController.readMyUser);
router.get("/users/any", userController.readAnyUsers);

module.exports = router;
