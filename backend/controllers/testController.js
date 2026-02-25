const Razorpay = require("razorpay");
const crypto = require("crypto");
const TestBooking = require("../models/TestBooking");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET
});

// Create Test Order
exports.createTestOrder = async (req, res) => {
  try {
    const { tests } = req.body;

    const amount = tests.length * 150 * 100; // ₹150 per test in paise

    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: "test_" + Date.now()
    });

    res.json({ order });

  } catch (err) {
    res.status(500).json({ success: false });
  }
};

// Verify Test Payment
exports.verifyTestPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      formData,
      tests
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false });
    }

    const booking = await TestBooking.create({
      patientName: formData.name,
      phone: formData.phone,
      tests,
      amount: tests.length * 150,
      paymentId: razorpay_payment_id
    });

    res.json({
      success: true,
      bookingId: booking._id
    });

  } catch (err) {
    res.status(500).json({ success: false });
  }
};