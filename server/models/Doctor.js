const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  experience: String,
  location: String,
  fee: Number,
  rating: Number,
  reviews: Number,
  availability: String,
  image: String,
});

module.exports = mongoose.model("Doctor", doctorSchema);
