const Razorpay = require('razorpay');
const crypto = require('crypto');

const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Cart = require('./../models/cartModel');
const Order = require('./../models/orderModel');

const rzpInstance = new Razorpay({
  key_id: process.env.RAZORPAY_ID_KEY,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

function generateOrderID(length) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const randomBytes = crypto.randomBytes(length);
  let result = '';

  for (let i = 0; i < randomBytes.length; i++) {
    const index = randomBytes[i] % characters.length;
    result += characters.charAt(index);
  }

  return result;
}

exports.createOrder = catchAsync(async (req, res, next) => {
  const fetchedCart = await Cart.findOne({ userId: req.user.id });

  if (!fetchedCart.totalAmount)
    return next(new AppError('Add events to your cart first', 404));

  const order = await rzpInstance.orders.create({
    amount: fetchedCart.totalAmount * 100,
    currency: 'INR',
  });

  const dbOrder = {
    orderId: generateOrderID(8),
    userId: req.user.id,
    orderItems: fetchedCart.eventIds,
    totalAmount: fetchedCart.totalAmount * 100,
    razorpayOrderId: order.id,
  };

  //Only for testing

  // const order = await rzpInstance.orders.create({
  //   amount: 300 * 100,
  //   currency: 'INR',
  // });

  // const dbOrder = {
  //   orderId: generateOrderID(8),
  //   userId: '6604638d58dbc14a6b2820f3',
  //   orderItems: ['6608651eaa2da7c35a8041fe'],
  //   totalAmount: 30000,
  //   razorpayOrderId: order.id,
  // };

  await Order.create(dbOrder);

  res.status(200).json({
    status: 'success',
    data: {
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    },
  });
});

exports.capturePayment = catchAsync(async (req, res, next) => {
  const paymentAuth = await rzpInstance.payments.capture(
    req.params.paymentId,
    req.body.amount,
    req.body.currency
  );

  res.status(201).json({
    status: 'success',
    data: {
      paymentId: paymentAuth.id,
      paymentStatus: paymentAuth.status,
    },
  });
});

exports.authorizePayment = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
  });
});
