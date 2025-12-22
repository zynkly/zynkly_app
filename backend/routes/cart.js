const express = require('express');
const { body } = require('express-validator');
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
} = require('../controllers/cartController');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validator');

const router = express.Router();

// All routes require authentication
router.use(protect);

// @route   GET /api/cart
router.get('/', getCart);

// @route   POST /api/cart/add
router.post(
  '/add',
  [
    body('serviceId').notEmpty().withMessage('Service ID is required'),
    body('quantity').optional().isInt({ min: 1 }).withMessage('Quantity must be at least 1')
  ],
  validate,
  addToCart
);

// @route   PUT /api/cart/update/:itemId
router.put(
  '/update/:itemId',
  [
    body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1')
  ],
  validate,
  updateCartItem
);

// @route   DELETE /api/cart/remove/:itemId
router.delete('/remove/:itemId', removeFromCart);

// @route   DELETE /api/cart/clear
router.delete('/clear', clearCart);

module.exports = router;

