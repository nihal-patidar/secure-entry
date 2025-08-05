// models/Withdrawal.js

const mongoose = require('mongoose');

const WithdrawalSchema = new mongoose.Schema({
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
  amount: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed', 'Rejected'],
    default: 'Pending',
  },
  requested_at: {
    type: Date,
    default: Date.now,
  },
  processed_at: {
    type: Date,
  },
});

module.exports = mongoose.model('Withdrawal', WithdrawalSchema);
