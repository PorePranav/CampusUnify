const mongoose = require('mongoose');

const daySchema = new mongoose.Schema({
  date: {
    type: Date,
    required: [true, 'A date must be specified for the event'],
  },
  description: {
    type: String,
    required: [true, 'A description must be provided for the date'],
  },
  venue: {
    type: String,
    required: [true, 'A venue must be specified for the date'],
  },
});

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'An event must have a name'],
  },
  eventCharges: {
    type: Number,
    required: [true, 'An event must have charges'],
    default: 0,
  },
  description: {
    type: String,
    required: [true, 'An event must have a description'],
  },
  days: {
    type: [daySchema],
    required: [true, 'An event must atleast have a day'],
  },
  clubId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'An event must belong to a club'],
  },
  bookings: {
    type: [mongoose.Schema.ObjectId],
    ref: 'User',
    required: [true, 'An event must have bookings'],
    default: [],
  },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
