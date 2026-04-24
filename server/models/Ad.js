const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  image_url: {
    type: String,
    required: true
  },
  link_url: {
    type: String,
    default: ''
  },
  position: {
    type: String,
    enum: ['banner', 'sidebar', 'in-article'],
    default: 'banner'
  },
  start_date: {
    type: Date
  },
  end_date: {
    type: Date
  },
  clicks: {
    type: Number,
    default: 0
  },
  impressions: {
    type: Number,
    default: 0
  },
  is_active: {
    type: Boolean,
    default: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Ad', adSchema);