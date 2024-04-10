const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Cart = require('./../models/cartModel');
const Event = require('./../models/eventModel');
const Bookings = require('./../models/bookingsModel');

exports.getCart = catchAsync(async (req, res, next) => {
  const fetchedCart = (await Cart.findOne({ userId: req.user.id })) || {};

  res.status(200).json({
    status: 'success',
    data: fetchedCart,
  });
});

exports.addToCart = catchAsync(async (req, res, next) => {
  const fetchedEvent = await Event.findById(req.params.eventId);
  if (!fetchedEvent) {
    return next(
      new AppError(`No event with id ${req.params.eventId} exists`, 404)
    );
  }

  let fetchedCart = await Cart.findOne({ userId: req.user.id });
  if (!fetchedCart)
    fetchedCart = new Cart({ userId: req.user.id, eventIds: [] });

  const fetchedEventBookings = await Bookings.findOne({
    eventId: req.params.eventId,
  });

  if (fetchedEventBookings.registeredUsers.length == fetchedEvent.maxCapacity)
    return next(
      new AppError('Maximum bookings have been reached for this event', 403)
    );

  const existingEventId = fetchedCart.eventIds.find(
    (id) => id.toString() === req.params.eventId
  );

  if (existingEventId)
    return next(new AppError('This event already exists in the cart', 403));

  fetchedCart.eventIds.push(fetchedEvent._id);
  await fetchedCart.save();

  res.status(200).json({
    status: 'success',
    data: fetchedCart,
  });
});

exports.deleteFromCart = catchAsync(async (req, res, next) => {
  const fetchedCart = await Cart.findOne({ userId: req.user.id });
  if (!fetchedCart) {
    return next(new AppError('Cart not found for the user', 404));
  }

  const eventIdx = fetchedCart.eventIds.findIndex(
    (id) => id.toString() === req.params.eventId
  );

  if (eventIdx === -1)
    return next(
      new AppError(
        `Event with id ${req.params.eventId} was not found in your cart`,
        404
      )
    );

  fetchedCart.eventIds.splice(eventIdx, 1);

  await fetchedCart.save();

  res.status(204).json({
    status: 'success',
    data: fetchedCart,
  });
});

exports.clearCart = catchAsync(async (req, res, next) => {
  const fetchedCart = await Cart.findOne({ userId: req.user.id });
  if (!fetchedCart) {
    return next(new AppError('Cart not found for the user', 404));
  }

  fetchedCart.eventIds = [];

  await fetchedCart.save();

  res.status(204).json({
    data: 'success',
    data: fetchedCart,
  });
});
