const Patient = require("../models/Patient");
const Visit = require("../models/Visit");

/* 🔎 STEP 1: Check Patient */
exports.checkPatient = async (req, res) => {
  try {
    const { phone } = req.body;

    const patient = await Patient.findOne({ phone });

    if (patient) {
      return res.json({
        existing: true,
        message: "Existing patient"
      });
    }

    return res.json({
      existing: false,
      message: "New patient. Payment required ₹305."
    });

  } catch (error) {
    res.status(500).json({ success: false });
  }
};


/* 💳 STEP 2: Confirm Registration */
exports.confirmRegistration = async (req, res) => {
  try {
    const { name, address, age, phone } = req.body;

    let patient = await Patient.findOne({ phone });

    // If new patient (after payment)
    if (!patient) {
      patient = await Patient.create({
        name,
        address,
        age,
        phone
      });
    }

    const now = new Date();

    // 🏥 Hospital day starts at 9AM
    const startOfHospitalDay = new Date();
    startOfHospitalDay.setHours(9, 0, 0, 0);

    if (now.getHours() < 9) {
      startOfHospitalDay.setDate(startOfHospitalDay.getDate() - 1);
    }

    // 🔎 Check if already registered today
    const existingVisit = await Visit.findOne({
      patientId: patient._id,
      visitDate: { $gte: startOfHospitalDay }
    });

    if (existingVisit) {
      return res.json({
        success: true,
        alreadyRegistered: true,
        tokenNumber: existingVisit.tokenNumber,
        message: "You already registered today."
      });
    }

    // 🔢 Count today's visits
    const todayCount = await Visit.countDocuments({
      visitDate: { $gte: startOfHospitalDay }
    });

    const newToken = todayCount + 1;

    await Visit.create({
      patientId: patient._id,
      tokenNumber: newToken
    });

    res.json({
      success: true,
      alreadyRegistered: false,
      tokenNumber: newToken,
      message: "Appointment confirmed."
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
};