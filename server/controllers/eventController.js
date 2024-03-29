const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Event = require('../models/eventModel');
const authController = require('./authController');
const APIFeatures = require('./../utils/apiFeatures');

exports.getAllEvents = catchAsync(async (req, res, next) => {
  let filter;
  const features = new APIFeatures(Event.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const fetchedEvents = await features.query;

  res.status(200).json({
    status: 'success',
    results: fetchedEvents.length,
    data: fetchedEvents,
  });
});

exports.getSingleEvent = catchAsync(async (req, res, next) => {
  const fetchedEvent = await Event.findById(req.params.id);

  if (!fetchedEvent) {
    return next(
      new AppError(`Event with id ${req.params.id} does not exist`, 404)
    );
  }

  res.status(200).json({
    status: 'success',
    data: fetchedEvent,
  });
});

exports.createEvent = catchAsync(async (req, res, next) => {
  const eventData = req.body;
  eventData.clubId = req.user.id;

  const newEvent = await Event.create(eventData);

  res.status(201).json({
    status: 'success',
    data: newEvent,
  });
});

exports.updateEvent = catchAsync(async (req, res, next) => {
  const fetchedEvent = await Event.findById(req.params.id);
  if (!fetchedEvent) {
    return next(
      new AppError(`There is no event with the id ${req.params.id}`, 404)
    );
  }

  if (!isAuthorized(req.user.id, fetchedEvent)) {
    return next(
      new AppError('You are unauthorized to perform this action', 403)
    );
  }

  for (let field in req.body) fetchedEvent[field] = req.body[field];

  await fetchedEvent.save();

  res.status(200).json({
    status: 'success',
    data: fetchedEvent,
  });
});

exports.deleteEvent = catchAsync(async (req, res, next) => {
  const fetchedEvent = await Event.findById(req.params.id);
  if (!fetchedEvent) {
    return next(
      new AppError(`There is no event with the id ${req.params.id}`, 404)
    );
  }

  if (!isAuthorized(req.user.id, fetchedEvent)) {
    return next(
      new AppError('You are unauthorized to perform this action', 403)
    );
  }

  const deletedEvent = await Event.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: deletedEvent,
  });
});

function isAuthorized(userId, fetchedEvent) {
  return userId.toString() === fetchedEvent.clubId.toString();
}
