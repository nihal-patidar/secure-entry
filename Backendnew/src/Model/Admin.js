// models/Admin.js

const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Assuming email is unique
  },
  password: {
    type: String,
    required: true,
  },
  total_revenue: {
    type: mongoose.Schema.Types.Decimal128,
    default: 0.0,
  },
  total_service_revenue: {
    type: Number,
    default: 0,
  },
  total_ad_revenue: {
    type: mongoose.Schema.Types.Decimal128,
    default: 0.0,
  },
  total_services: {
    type: Number,
    default: 0,
  },
  total_users: {
    type: Number,
    default: 0,
  },
  total_validators: {
    type: Number,
    default: 0,
  },
  notifications: {
    type: mongoose.Schema.Types.Mixed, // or [Schema.Types.Mixed] if it's an array
    default: [],
  },
}, {
  timestamps: true // handles createdAt and updatedAt automatically
});

module.exports = mongoose.model('Admin', AdminSchema);
