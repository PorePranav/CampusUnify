const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A user ID is required for the cart'],
  },
  eventIds: {
    type: [mongoose.Schema.ObjectId],
    ref: 'Event',
  },
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
