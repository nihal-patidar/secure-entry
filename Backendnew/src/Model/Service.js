// models/Service.js

const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organiser',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  event_start_time: {
    type: String, // Format: "HH:mm" (e.g., "06:00")
  },
  event_end_time: {
    type: String,
  },
  location: {
    type: String,
    default: '',
  },
  ticket_price: {
    type: mongoose.Schema.Types.Decimal128,
    default: 0.0,
  },
  total_allowed_ticket: {
    type: Number,
    default: 0,
  },
  tickets_sold: {
    type: Number,
    default: 0,
  },
  is_ticket_free: {
    type: Boolean,
    default: false,
  },
  qr_code_url: {
    type: String,
    default: '',
  },
  service_form_url: {
    type: String,
    default: '',
  },
  service_image_url: {
    type: String,
    default: '',
  },
  service_qr_code: {
    type: String,
    default: '',
  },
  revenue_amount: {
    type: mongoose.Schema.Types.Decimal128,
    default: 0.0,
  },
  withdrawn_amount: {
    type: mongoose.Schema.Types.Decimal128,
    default: 0.0,
  },
  total_scans: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['Scheduled', 'Active', 'Completed', 'Cancelled'],
    default: 'Scheduled',
  },

  // Service Modes
  service_mode: {
    type: String,
    enum: ['SingleUse', 'MultiScan', 'Subscription', 'Attendance'],
    default: 'SingleUse',
  },
  valid_scans: {
    type: Number,
    default: 1, // Default for SingleUse
  },

  // Subscription Mode Fields
  scan_window_start: {
    type: String, // Format: "HH:mm"
  },
  scan_window_end: {
    type: String,
  },
  subscription_start_date: {
    type: Date,
  },
  subscription_end_date: {
    type: Date,
  },

  // Attendance Mode
  attendance_enabled: {
    type: Boolean,
    default: false,
  },

}, {
  timestamps: true // Auto adds createdAt and updatedAt
});

module.exports = mongoose.model('Service', ServiceSchema);
