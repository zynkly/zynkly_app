import express from 'express';
import {
  createBooking,
  getBookingStatus
} from '../controllers/bookingController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/create', authMiddleware, createBooking);
router.get('/status/:bookingId', authMiddleware, getBookingStatus);

export default router;


