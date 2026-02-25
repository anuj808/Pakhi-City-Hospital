const express = require("express");
const router = express.Router();
const Visit = require("../models/Visit");
const TestBooking = require("../models/TestBooking");
const Patient = require("../models/Patient");

// 🔹 Get All Appointments
router.get("/appointments", async (req, res) => {
  const visits = await Visit.find()
    .populate("patientId")
    .sort({ createdAt: -1 });

  res.json(visits);
});

// 🔹 Get All Test Bookings
router.get("/tests", async (req, res) => {
  const tests = await TestBooking.find()
    .sort({ createdAt: -1 });

  res.json(tests);
});

// 🔹 Mark Appointment Completed
router.put("/complete/:id", async (req, res) => {
  await Visit.findByIdAndUpdate(req.params.id, {
    status: "Completed"
  });

  res.json({ success: true });
});

// 🔹 Basic Stats
router.get("/stats", async (req, res) => {
  const totalPatients = await Patient.countDocuments();
  const totalVisits = await Visit.countDocuments();
  const totalTests = await TestBooking.countDocuments();

  res.json({
    totalPatients,
    totalVisits,
    totalTests
  });
});

module.exports = router;