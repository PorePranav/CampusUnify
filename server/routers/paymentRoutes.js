const express = require('express');
const paymentController = require('./../controllers/paymentController');
const authController = require('./../controllers/authController');
const cartController = require('./../controllers/cartController');
const eventController = require('./../controllers/eventController');

const router = express.Router();

router.post('/failedPayment', paymentController.paymentFailed);

//For testing
router.post(
  '/capturedPayment',
  paymentController.paymentCaptured,
  eventController.addBooking
);

//For production
// router.post(
//   '/capturedPayment',
//   paymentController.paymentCaptured,
//   cartController.clearCart
// );

//Commented only for testing
// router.use(authController.protect);
router.get('/createOrder', paymentController.createOrder);

module.exports = router;
