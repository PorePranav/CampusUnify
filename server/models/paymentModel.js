const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A payment should be associated with an user'],
  },
  orderId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Order',
    required: [true, 'A orderId is required'],
  },
  internalPaymentId: {
    type: String,
    required: [true, 'A payment should have a payment id'],
  },
  paymentTime: {
    type: Date,
    required: [true, 'A payment should have a date'],
    default: Date.now,
  },
  razorpayOrderId: {
    type: String,
    required: [true, 'A razorpay order_id is required'],
  },
  razorpayPaymentId: {
    type: String,
    required: [true, 'A razorpay payment_id is required'],
  },
  totalAmount: {
    type: Number,
    required: [true, 'A payment should have a totalAmount'],
  },
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
