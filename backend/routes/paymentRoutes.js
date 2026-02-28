const express = require("express");
const router = express.Router();
const generateReceipt = require("../utils/generateReceipt");

const {
  createOrder,
  verifyPayment
} = require("../controllers/paymentController");

router.post("/create-order", createOrder);
router.post("/verify-payment", verifyPayment);
router.get(
  "/receipt/:paymentId/:token/:name/:phone",
  (req, res) => {
    generateReceipt(res, {
      paymentId: req.params.paymentId,
      token: req.params.token,
      name: req.params.name,
      phone: req.params.phone
    });
  }
);

module.exports = router;