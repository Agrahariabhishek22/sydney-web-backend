const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  date_time: {
    type: String,
    required: true
  },
  venue: {
    type: String,
    required: true
  },
  price: {
    type: String,
    default: null
  },
  link: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);
