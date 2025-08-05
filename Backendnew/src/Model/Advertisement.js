// models/Advertisement.js

const mongoose = require('mongoose');

const AdvertisementSchema = new mongoose.Schema({
  owner_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organiser',
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
  redirect_link: {
    type: String,
    default: '',
  },
  views_count: {
    type: Number,
    default: 0,
  },
  clicks_count: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected', 'Completed', 'Blocked'],
    default: 'Pending',
  },
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
    required: true,
  },
  placement: {
    type: String,
    enum: ['Dashboard', 'Landing', 'Event Page'],
    required: true,
  },
  payment_status: {
    type: String,
    enum: ['Free', 'Paid'],
    default: 'Free',
  },
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

module.exports = mongoose.model('Advertisement', AdvertisementSchema);
