const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  firstVisitDate: {
    type: Date,
    required: true
  },
  visitDate: {
    type: Date,
    required: true
  },
  tokenNumber: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Appointment", appointmentSchema);