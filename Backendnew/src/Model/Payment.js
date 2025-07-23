// models/Payment.js

const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  ticket_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ticket',
    required: true,
  },
  amount: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  method: {
    type: String,
    required: true, // e.g., 'UPI', 'Card', 'Wallet', etc.
  },
  payment_id: {
    type: String,
    required: true,
  },
  order_id: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['paid', 'unpaid', 'verified'],
    default: 'unpaid',
  },
}, {
  timestamps: { createdAt: true, updatedAt: false }
});

module.exports = mongoose.model('Payment', PaymentSchema);
