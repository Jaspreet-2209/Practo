const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Doctor = require("./models/Doctor");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://jaspreetsingh221309:uR0HSjnAH2Tykrjf@cluster0.besjgzu.mongodb.net/practoDB", {
 
  useUnifiedTopology: true,
});

// Seed doctors (only once)
app.post("/api/doctors", async (req, res) => {
  const newDoctor = new Doctor(req.body);
  await newDoctor.save();
  res.json(newDoctor);
});

// Fetch by query + location
app.get("/api/search", async (req, res) => {
  const { query, location } = req.query;
  const doctors = await Doctor.find({
    specialization: new RegExp(query, "i"),
    location: new RegExp(location, "i"),
  });
  res.json(doctors);
});

app.listen(5000, () => console.log("Backend running on http://localhost:5000"));
