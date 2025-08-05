// models/Scan.js

const mongoose = require('mongoose');

const ScanSchema = new mongoose.Schema({
  service_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true,
  },
  validator_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Validator',
    required: true,advertisements 
  },
  visitor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Visitor',
    required: true,
  },
  scanned_at: {
    type: Date,
    default: Date.now, // automatically sets the scan timestamp
  },
});

module.exports = mongoose.model('Scan', ScanSchema);
