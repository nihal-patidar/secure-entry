// models/Organiser.js

const mongoose = require('mongoose');

const OrganiserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    default: '',
  },
  is_mobile_verified: {
    type: Boolean,
    default: false,
  },
  is_verified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ['admin', 'creator', 'validator'],
    default: 'creator', // assuming default
  },
  bank_account_number: {
    type: String,
    default: '',
  },
  bank_account_holder_name: {
    type: String,
    default: '',
  },
  bank_name: {
    type: String,
    default: '',
  },
  ifsc_number: {
    type: String,
    default: '',
  },
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

module.exports = mongoose.model('Organiser', OrganiserSchema);
