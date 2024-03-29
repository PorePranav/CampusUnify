const express = require('express');
const authController = require('./../controllers/authController');
const eventController = require('./../controllers/eventController');

const router = express.Router();

router.use(authController.protect);
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
