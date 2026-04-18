const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  status: {
    type: String,
    enum: ['Not Started', 'Started', 'In-Progress', 'Mastered'],
    default: 'Not Started'
  }
});

module.exports = mongoose.model('Topic', topicSchema);