const express = require('express');
const { body } = require('express-validator');
const {
  createRazorpayOrder,
  verifyPayment,
  getUserOrders,
  getOrder,
  cancelOrder
} = require('../controllers/orderController');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validator');

const router = express.Router();

// All routes require authentication
router.use(protect);

// @route   POST /api/orders/create-order
router.post('/create-order', createRazorpayOrder);

// @route   POST /api/orders/verify-payment
router.post(
  '/verify-payment',
  [
    body('razorpayOrderId').notEmpty().withMessage('Razorpay order ID is required'),
    body('razorpayPaymentId').notEmpty().withMessage('Razorpay payment ID is required'),
    body('razorpaySignature').notEmpty().withMessage('Razorpay signature is required')
  ],
  validate,
  verifyPayment
);

// @route   GET /api/orders
router.get('/', getUserOrders);

// @route   GET /api/orders/:id
router.get('/:id', getOrder);

// @route   PUT /api/orders/:id/cancel
router.put('/:id/cancel', cancelOrder);

module.exports = router;

