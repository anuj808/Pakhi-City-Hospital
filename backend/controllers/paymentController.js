const Razorpay = require("razorpay");
const crypto = require("crypto");
const Patient = require("../models/Patient");
const Visit = require("../models/Visit");
const generateReceipt = require("../utils/generateReceipt");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET
});

// 🔹 Create Order
exports.createOrder = async (req, res) => {
  try {
    const { phone } = req.body;

    const patient = await Patient.findOne({ phone });

    if (patient) {
      return res.json({
        existing: true
      });
    }

    const options = {
      amount: 30500, // ₹305
      currency: "INR",
      receipt: "receipt_" + Date.now()
    };

    const order = await razorpay.orders.create(options);

    res.json({
      existing: false,
      order
    });

  } catch (err) {
    console.log("Create Order Error:", err);
    res.status(500).json({ success: false });
  }
};

// 🔹 Verify Payment
exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      formData
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false });
    }

    // ✅ Payment verified

    let patient = await Patient.findOne({ phone: formData.phone });

    if (!patient) {
      patient = await Patient.create(formData);
    }

    // 9 AM reset logic
    const now = new Date();
    const startOfHospitalDay = new Date();
    startOfHospitalDay.setHours(9, 0, 0, 0);

    if (now.getHours() < 9) {
      startOfHospitalDay.setDate(startOfHospitalDay.getDate() - 1);
    }

    const existingVisit = await Visit.findOne({
      patientId: patient._id,
      visitDate: { $gte: startOfHospitalDay }
    });

    let token;

    if (existingVisit) {
      token = existingVisit.tokenNumber;
    } else {
      const todayCount = await Visit.countDocuments({
        visitDate: { $gte: startOfHospitalDay }
      });

      token = todayCount + 1;

      await Visit.create({
        patientId: patient._id,
        tokenNumber: token,
        visitDate: new Date(),
        status: "Pending"
      });
    }

    // ✅ Return JSON ONLY
    res.json({
      success: true,
      tokenNumber: token,
      paymentId: razorpay_payment_id
    });

  } catch (err) {
    console.log("Verify Error:", err);
    res.status(500).json({ success: false });
  }
};