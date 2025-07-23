// models/Visitor.js

const mongoose = require('mongoose');

const VisitorSchema = new mongoose.Schema({
  service_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true,
  },
  visitor_data: {
    type: mongoose.Schema.Types.Mixed, // Use a defined schema if you know the structure
    default: {},
  },
  email: {
    type: String,
    default: '',
  },
  image_url: {
    type: String,
    default: '',
  },
  payment_status: {
    type: String,
    enum: ['Paid', 'Free'],
    required: true,
  },
  order_id: {
    type: String,
    default: '',
  },
  validation_status: {
    type: Boolean,
    default: false,
  },
  remain_scans: {
    type: Number,
    default: 0,
  },
  qrcode: {
    type: String,
    default: '',
  },
  expired_time: {
    type: Number, // UNIX timestamp in milliseconds
    required: true,
  },
  vis_identifier: {
    type: String,
    required: true,
    unique: true,
  },
  time_stamps: {
    type: [Date], // Array of ISO date-time objects
    default: [],
  },
}, {
  timestamps: true // Adds createdAt and updatedAt
});

module.exports = mongoose.model('Visitor', VisitorSchema);
