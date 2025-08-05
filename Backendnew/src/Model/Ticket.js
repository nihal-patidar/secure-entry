// models/Ticket.js

const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  visitor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Visitor',
    required: true,
  },
  service_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true,
  },
  qr_code: {
    type: String,
    required: true, // assuming every ticket must have QR data
  },
  status: {
    type: String,
    enum: ['valid', 'scanned', 'expired'],
    default: 'valid',
  },
}, {
  timestamps: { createdAt: true, updatedAt: false } // Only createdAt is needed
});

module.exports = mongoose.model('Ticket', TicketSchema);
