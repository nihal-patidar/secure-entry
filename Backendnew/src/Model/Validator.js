// models/Validator.js

const mongoose = require('mongoose');

const ValidatorSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organiser',
    required: true,
  },
  service_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true,
  },
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
  mobile_number: {
    type: String,
    default: '',
  },
  aadhar_number: {
    type: String,
    default: '',
  },
  address: {
    type: String,
    default: '',
  },
  validator_identifier: {
    type: String,
    required: true,
    unique: true,
  },
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

module.exports = mongoose.model('Validator', ValidatorSchema);
