const express = require("express");

const gameMechanicsController = require("../controllers/gameMechanicsController");

const router = express.Router();

router.post("/gm/capture/:anyUserId", gameMechanicsController.captureUser);

module.exports = router;
