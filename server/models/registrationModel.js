const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Registered user must have a user ID'],
  },
  eventId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Event',
    required: [true, 'Registration must have an event ID'],
  },
  paymentId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Payment',
    required: [true, 'Registration must have a payment'],
  },
  currentStatus: {
    type: String,
    enum: ['confirmed', 'cancelled'],
    default: 'confirmed',
  },
});

const Registrations = mongoose.model('Registrations', registrationSchema);

module.exports = Registrations;
