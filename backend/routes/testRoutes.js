const express = require("express");
const router = express.Router();
const testController = require("../controllers/testController");

router.post("/create-order", testController.createTestOrder);
router.post("/verify-payment", testController.verifyTestPayment);

module.exports = router;