const mongoose = require('mongoose');
const activityLogSchema = new mongoose.Schema({
  activityDate: { type: Date, default: Date.now },
  minutesSpent: { type: Number, default: 15 },
  activityType: { type: String, required: true }
});
module.exports = mongoose.model('ActivityLog', activityLogSchema);