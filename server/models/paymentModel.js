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
  paymentDate: {
    type: Date,
    required: [true, 'A payment should have a date'],
    default: Date.now,
  },
  rzpOrderId: {
    type: String,
    required: [true, 'A razorpay order_id is required'],
  },
  rzpPaymentId: {
    type: String,
    required: [true, 'A razorpay payment_id is required'],
  },
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
