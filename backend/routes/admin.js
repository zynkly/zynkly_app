const express = require('express');
const { body } = require('express-validator');
const {
  createService,
  updateService,
  deleteService,
  getAllOrders,
  updateOrderStatus,
  getAllUsers,
  getDashboardStats
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/auth');
const validate = require('../middleware/validator');

const router = express.Router();

// All routes require authentication and admin role
router.use(protect);
router.use(admin);

// ========== SERVICE ROUTES ==========

// @route   POST /api/admin/services
router.post(
  '/services',
  [
    body('name').trim().notEmpty().withMessage('Service name is required'),
    body('description').trim().notEmpty().withMessage('Service description is required'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('duration').isInt({ min: 1 }).withMessage('Duration must be at least 1 minute'),
    body('category').optional().isIn(['home', 'bathroom', 'kitchen', 'deep', 'office', 'other']).withMessage('Invalid category')
  ],
  validate,
  createService
);

// @route   PUT /api/admin/services/:id
router.put(
  '/services/:id',
  [
    body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('duration').optional().isInt({ min: 1 }).withMessage('Duration must be at least 1 minute'),
    body('category').optional().isIn(['home', 'bathroom', 'kitchen', 'deep', 'office', 'other']).withMessage('Invalid category'),
    body('isActive').optional().isBoolean().withMessage('isActive must be a boolean')
  ],
  validate,
  updateService
);

// @route   DELETE /api/admin/services/:id
router.delete('/services/:id', deleteService);

// ========== ORDER ROUTES ==========

// @route   GET /api/admin/orders
router.get('/orders', getAllOrders);

// @route   PUT /api/admin/orders/:id/status
router.put(
  '/orders/:id/status',
  [
    body('status').isIn(['pending', 'paid', 'cancelled', 'completed']).withMessage('Invalid status')
  ],
  validate,
  updateOrderStatus
);

// ========== USER ROUTES ==========

// @route   GET /api/admin/users
router.get('/users', getAllUsers);

// @route   GET /api/admin/stats
router.get('/stats', getDashboardStats);

module.exports = router;

