const Razorpay = require('razorpay');

const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Cart = require('./../models/cartModel');

const rzpInstance = new Razorpay({
  key_id: process.env.RAZORPAY_ID_KEY,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

exports.createOrder = catchAsync(async (req, res, next) => {
  const fetchedCart = await Cart.findOne({ userId: req.user.id });

  if (!fetchedCart.totalAmount)
    return next(new AppError('Add events to your cart first', 404));

  const order = await rzpInstance.orders.create({
    amount: fetchedCart.totalAmount * 100,
    currency: 'INR',
  });

  res.status(200).json({
    status: 'success',
    data: {
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    },
  });
});
