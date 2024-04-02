const express = require('express');
const paymentController = require('./../controllers/paymentController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/authorizePayment', paymentController.authorizePayment);
router.use(authController.protect);
router.get('/createOrder', paymentController.createOrder);
router.post('/:paymentId/capturePayment', paymentController.capturePayment);

module.exports = router;
