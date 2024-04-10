const express = require('express');
const authController = require('./../controllers/authController');
const bookingsController = require('./../controllers/bookingsController');
const router = express.Router();

router.use(authController.protect);
router.get(
  '/event/:eventId',
  authController.restrictTo('club'),
  bookingsController.getEventBookings
);

module.exports = router;
