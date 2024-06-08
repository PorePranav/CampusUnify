const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Bookings = require('./../models/bookingsModel');
const Event = require('./../models/eventModel');
const Order = require('./../models/orderModel');
const Registrations = require('./../models/registrationModel');
const mongoose = require('mongoose');

exports.addBooking = catchAsync(async (req, res, next) => {
  const fetchedOrder = await Order.findById(req.payment.orderId);
  const eventIds = fetchedOrder.orderItems;

  for (const eventId of eventIds) {
    const fetchedBookings = await Bookings.findOne({ eventId });
    const newRegisteredUser = {
      userId: req.payment.userId,
      paymentId: req.payment._id,
    };
    fetchedBookings.registeredUsers.push(newRegisteredUser);
    await fetchedBookings.save();

    await Registrations.create({
      userId: req.payment.userId,
      eventId,
      paymentId: req.payment._id,
    });
  }

  res.status(200).json({
    status: 'success',
    data: eventIds,
  });
});

exports.getEventBookings = catchAsync(async (req, res, next) => {
  const fetchedEvent = await Event.findById(req.params.eventId);
  if (!fetchedEvent) {
    return next(
      new AppError(`No event with the given ${req.params.eventId} exists`, 404)
    );
  }

  if (!isAuthorized(req.user.id, fetchedEvent)) {
    return next(
      new AppError('You are unauthorized to perform this action', 403)
    );
  }

  const fetchedBookings = await Bookings.findOne({
    eventId: req.params.eventId,
  }).populate('registeredUsers.userId registeredUsers.paymentId');

  res.status(200).json({
    status: 'success',
    results: fetchedBookings.registeredUsers.length,
    data: { registeredUsers: fetchedBookings.registeredUsers },
  });
});

exports.getUserRegistrations = catchAsync(async (req, res, next) => {
  const userRegistrations = await Registrations.find({
    userId: req.user.id,
  }).populate('eventId paymentId');

  res.status(200).json({
    status: 'success',
    results: userRegistrations.length,
    data: userRegistrations,
  });
});

exports.deleteEventBooking = catchAsync(async (req, res, next) => {
  const fetchedEvent = await Event.findById(req.params.eventId);
  if (!fetchedEvent) {
    return next(
      new AppError(`No event with the given ${req.params.eventId} exists`, 404)
    );
  }

  if (!isAuthorized(req.user.id, fetchedEvent)) {
    return next(
      new AppError('You are unauthorized to perform this action', 403)
    );
  }

  const fetchedBookings = await Bookings.findOne({
    eventId: req.params.eventId,
  }).populate('registeredUsers.userId registeredUsers.paymentId');

  const newBookings = fetchedBookings.registeredUsers.filter(
    (booking) => booking._id.toString() !== req.params.bookingId
  );

  fetchedBookings.registeredUsers = newBookings;

  await fetchedBookings.save();

  res.status(200).json({
    status: 'success',
    data: fetchedBookings,
  });
});

exports.getSingleEventDetails = catchAsync(async (req, res, next) => {
  const fetchedEvent = await Event.findById(req.params.eventId);
  if (!fetchedEvent) {
    return next(
      new AppError(`No event with the given ${req.params.eventId} exists`, 404)
    );
  }

  if (!isAuthorized(req.user.id, fetchedEvent)) {
    return next(
      new AppError('You are unauthorized to perform this action', 403)
    );
  }

  const fetchedBookings = await Bookings.findOne({
    eventId: req.params.eventId,
  }).populate('registeredUsers.userId registeredUsers.paymentId');

  const searchedBooking = fetchedBookings.registeredUsers.find(
    (booking) => booking._id.toString() === req.params.bookingId
  );

  if (!searchedBooking) {
    return next(
      new AppError(`There is no booking with ${req.params.bookingId}`, 404)
    );
  }

  res.status(200).json({
    status: 'success',
    data: searchedBooking,
  });
});

function isAuthorized(userId, fetchedEvent) {
  return userId.toString() === fetchedEvent.clubId.toString();
}
