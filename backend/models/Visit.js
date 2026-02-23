const mongoose = require("mongoose");

const visitSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient"
  },
  tokenNumber: Number,
  visitDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Visit", visitSchema);