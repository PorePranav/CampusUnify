const Razorpay = require('razorpay');
const crypto = require('crypto');

const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Cart = require('./../models/cartModel');
const Order = require('./../models/orderModel');
const Payment = require('../models/paymentModel');

const rzpInstance = new Razorpay({
  key_id: process.env.RAZORPAY_ID_KEY,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

function generateOrderID(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
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
    internalOrderId: generateOrderID(8),
    userId: req.user.id,
    orderItems: fetchedCart.eventIds,
    totalAmount: fetchedCart.totalAmount,
    razorpayOrderId: order.id,
  };

  //Only for testing

  // const order = await rzpInstance.orders.create({
  //   amount: 500 * 100,
  //   currency: 'INR',
  // });

  // const dbOrder = {
  //   internalOrderId: generateOrderID(8),
  //   userId: '6620c30ebef1543313823d8d',
  //   orderItems: ['665b1de62aa571f791b3dbbd'],
  //   totalAmount: 500,
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

exports.paymentCaptured = catchAsync(async (req, res, next) => {
  const shaSum = crypto.createHmac(
    'sha256',
    process.env.RAZORPAY_WEBHOOK_SECRET
  );
  shaSum.update(JSON.stringify(req.body));
  const digest = shaSum.digest('hex');

  if (digest !== req.headers['x-razorpay-signature']) {
    return next(
      new AppError('You are unauthorized to perform this action', 403)
    );
  }

  const {
    order_id: orderId,
    id: paymentId,
    created_at,
  } = req.body.payload.payment.entity;

  await Order.findOneAndUpdate(
    { razorpayOrderId: orderId },
    { status: 'captured' }
  );

  const {
    userId,
    _id: fetchedOrderId,
    razorpayOrderId,
    internalOrderId,
    totalAmount,
  } = await Order.findOne({ razorpayOrderId: orderId });

  const newPayment = await Payment.create({
    userId,
    orderId: fetchedOrderId,
    razorpayOrderId,
    internalPaymentId: internalOrderId,
    razorpayPaymentId: paymentId,
    createdAt: new Date(created_at * 1000),
    totalAmount,
  });

  req.payment = newPayment;
  next();
});

exports.paymentFailed = catchAsync(async (req, res, next) => {
  const shaSum = crypto.createHmac(
    'sha256',
    process.env.RAZORPAY_WEBHOOK_SECRET
  );
  shaSum.update(JSON.stringify(req.body));
  const digest = shaSum.digest('hex');

  if (digest !== req.headers['x-razorpay-signature']) {
    return next(
      new AppError('You are unauthorized to perform this action', 403)
    );
  }

  const failedOrderId = req.body.payload.payment.entity.order_id;

  await Order.findOneAndUpdate(
    { razorpayOrderId: failedOrderId },
    { status: 'failed' }
  );

  res.status(200).json({
    status: 'success',
  });
});
