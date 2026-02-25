const mongoose = require("mongoose");

const testBookingSchema = new mongoose.Schema({
  patientName: String,
  phone: String,
  tests: [String],
  amount: Number,
  paymentId: String,
  status: {
    type: String,
    default: "Booked"
  }
}, { timestamps: true });

module.exports = mongoose.model("TestBooking", testBookingSchema);