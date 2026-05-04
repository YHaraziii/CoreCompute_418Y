const mongoose = require('mongoose');
const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, enum: ['Theory', 'Practice Problems', 'Interview Prep'], required: true },
  type: { type: String, enum: ['Article', 'Interactive', 'Guide', 'Video'], required: true },
  url: { type: String, required: true }, // Actual link
  accessedAt: { type: Date, default: null }
});
module.exports = mongoose.model('Resource', resourceSchema);