const mongoose = require('mongoose');

const registeredUserSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Registered user must have a user ID'],
  },
  paymentId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Payment',
    required: [true, 'Each registered user must have a payment ID'],
  },
});

const bookingsSchema = mongoose.Schema({
  eventId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Event',
    required: [true, 'Bookings must be associated with an event'],
  },
  registeredUsers: {
    type: [registeredUserSchema],
    required: [true, 'There should be registrations for the event'],
  },
});

bookingsSchema.pre(/^find/, function (next) {
  this.select('-__v').populate('registeredUsers').select('-avatar');
  next();
});

bookingsSchema.pre(/^find/, function (next) {
  this.select('-__v');
  next();
});

const Bookings = mongoose.model('Bookings', bookingsSchema);

module.exports = Bookings;
