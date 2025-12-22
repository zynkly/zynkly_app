const express = require('express');
const { body } = require('express-validator');
const {
  signup,
  verifyOTP,
  resendOTP,
  login,
  loginWithOTP,
  verifyLoginOTP,
  getMe
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validator');

const router = express.Router();

// @route   POST /api/auth/signup
router.post(
  '/signup',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
    body('phone').trim().notEmpty().withMessage('Phone number is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
  ],
  validate,
  signup
);

// @route   POST /api/auth/verify-otp
router.post(
  '/verify-otp',
  [
    body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
    body('otp').trim().notEmpty().withMessage('OTP is required')
  ],
  validate,
  verifyOTP
);

// @route   POST /api/auth/resend-otp
router.post(
  '/resend-otp',
  [
    body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email')
  ],
  validate,
  resendOTP
);

// @route   POST /api/auth/login
router.post(
  '/login',
  [
    body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  validate,
  login
);

// @route   POST /api/auth/login-otp
router.post(
  '/login-otp',
  [
    body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email')
  ],
  validate,
  loginWithOTP
);

// @route   POST /api/auth/verify-login-otp
router.post(
  '/verify-login-otp',
  [
    body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
    body('otp').trim().notEmpty().withMessage('OTP is required')
  ],
  validate,
  verifyLoginOTP
);

// @route   GET /api/auth/me
router.get('/me', protect, getMe);

module.exports = router;

