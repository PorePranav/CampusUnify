const express = require('express');
const paymentController = require('./../controllers/paymentController');
const authController = require('./../controllers/authController');
const cartController = require('./../controllers/cartController');
const bookingsController = require('./../controllers/bookingsController');

const router = express.Router();

router.post('/failedPayment', paymentController.paymentFailed);

router.post(
  '/capturedPayment',
  paymentController.paymentCaptured,
  bookingsController.addBooking,
  cartController.clearCart
);

router.use(authController.protect);
router.get('/createOrder', paymentController.createOrder);

module.exports = router;
