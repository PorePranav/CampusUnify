const express = require('express');
const paymentController = require('./../controllers/paymentController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.protect);
router.get('/createOrder', paymentController.createOrder);

module.exports = router;
