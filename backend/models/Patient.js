const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: String,
  address: String,
  age: Number,
  phone: {
    type: String,
    unique: true
  },
  registrationDate: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24 * 7 // 7 days
  }
});

module.exports = mongoose.model("Patient", patientSchema);