const express = require("express");

const loginController = require("../controllers/loginController");

const router = express.Router();

router.post("/", loginController.login);
router.get("/", loginController.logout);

module.exports = router;
