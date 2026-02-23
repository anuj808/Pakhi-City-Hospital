const express = require("express");
const router = express.Router();

const {
  checkPatient,
  confirmRegistration
} = require("../controllers/appointmentController");

router.post("/check", checkPatient);
router.post("/confirm", confirmRegistration);

module.exports = router;