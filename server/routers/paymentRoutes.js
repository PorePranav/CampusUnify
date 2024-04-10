const express = require('express');
const paymentController = require('./../controllers/paymentController');
const authController = require('./../controllers/authController');
const cartController = require('./../controllers/cartController');
const bookingsController = require('./../controllers/bookingsController');
const eventController = require('./../controllers/eventController');

const router = express.Router();

router.post('/failedPayment', paymentController.paymentFailed);

//For testing
router.post(
  '/capturedPayment',
  paymentController.paymentCaptured,
  bookingsController.addBooking
);

//For production
// router.post(
//   '/capturedPayment',
//   paymentController.paymentCaptured,
//   bookingsController.addBooking,
//   cartController.clearCart
// );

//Commented only for testing
// router.use(authController.protect);
router.get('/createOrder', paymentController.createOrder);

module.exports = router;
