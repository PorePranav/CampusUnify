const express = require('express');
const authController = require('./../controllers/authController');
const eventController = require('./../controllers/eventController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/eventDays/:eventId/day/:dayId')
  .get(eventController.getEventDay)
  .patch(eventController.updateEventDay)
  .delete(eventController.deleteEventDay);

router
  .route('/eventDays/:eventId')
  .get(eventController.getAllEventDays)
  .post(eventController.createEventDay);

router
  .route('/:id')
  .get(eventController.getSingleEvent)
  .patch(authController.restrictTo('club'), eventController.updateEvent)
  .delete(authController.restrictTo('club'), eventController.deleteEvent);

router
  .route('/')
  .get(eventController.getAllEvents)
  .post(authController.restrictTo('club'), eventController.createEvent);

module.exports = router;
