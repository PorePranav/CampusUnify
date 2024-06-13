const express = require('express');
const authController = require('./../controllers/authController');
const bookingsController = require('./../controllers/bookingsController');
const router = express.Router();

router.use(authController.protect);
router.get(
  '/',
  authController.restrictTo('user'),
  bookingsController.getUserRegistrations
);

router.get(
  '/generateTicket/:id',
  authController.restrictTo('user'),
  bookingsController.generateTicket
);

router.use(authController.restrictTo('club'));

router.get('/:eventId', bookingsController.getEventBookings);
router.get(
  '/:eventId/booking/:bookingId',
  bookingsController.getSingleEventDetails
);
router.delete(
  '/:eventId/booking/:bookingId',
  bookingsController.deleteEventBooking
);

module.exports = router;
