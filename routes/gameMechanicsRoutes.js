const express = require("express");

const gameMechanicsController = require("../controllers/gameMechanicsController");
const loginController = require("../controllers/loginController");

const router = express.Router();

router.post("/gm/capture/:anyUserId", [
  loginController.isLogged,
  gameMechanicsController.captureUser,
]);
router.post("/gm/setfree/:anyUserId", [
  loginController.isLogged,
  gameMechanicsController.setUserFree,
]);
router.get("/gm/ranking", [
  loginController.isLogged,
  gameMechanicsController.ranking,
]);
router.get("/gm/people", [
  loginController.isLogged,
  gameMechanicsController.people,
]);
router.get("/gm/inventory", [
  loginController.isLogged,
  gameMechanicsController.inventory,
]);
router.get("/gm/shelter", [
  loginController.isLogged,
  gameMechanicsController.shelter,
]);

module.exports = router;
