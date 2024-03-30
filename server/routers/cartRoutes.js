const express = require('express');
const authController = require('./../controllers/authController');
const cartController = require('./../controllers/cartController');

const router = express.Router();

router.use(authController.protect);
router.use(authController.restrictTo('user'));
router
  .route('/:eventId')
  .post(cartController.addToCart)
  .delete(cartController.deleteFromCart);

router.route('/').get(cartController.getCart).delete(cartController.clearCart);

module.exports = router;
