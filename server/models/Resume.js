const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  phone: String,
  education: [{ school: String, degree: String, year: String }],
  experience: [{ company: String, role: String, duration: String, description: String }],
  skills: [String],
  summary: String,
}, { timestamps: true });

module.exports = mongoose.model('Resume', ResumeSchema);