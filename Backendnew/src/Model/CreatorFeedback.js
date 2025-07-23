// models/CreatorFeedback.js

const mongoose = require('mongoose');

const CreatorFeedbackSchema = new mongoose.Schema({
  creator_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organiser',
    required: true,
  },
  service_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['Feedback', 'Issue', 'Query', 'Request'],
    required: true,
  },
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Resolved', 'Rejected'],
    default: 'Open',
  },
  admin_response: {
    type: String,
    default: '',
  },
}, {
  timestamps: { createdAt: true, updatedAt: false }
});

module.exports = mongoose.model('CreatorFeedback', CreatorFeedbackSchema);
