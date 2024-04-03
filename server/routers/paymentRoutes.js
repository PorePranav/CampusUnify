const express = require('express');
const paymentController = require('./../controllers/paymentController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/failedPayment', paymentController.paymentFailed);
router.post('/capturedPayment', paymentController.paymentCaptured);
// router.use(authController.protect);
router.get('/createOrder', paymentController.createOrder);

module.exports = router;
