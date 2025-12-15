import Razorpay from 'razorpay';
import { config } from './env.js';

export const razorpayInstance = new Razorpay({
  key_id: config.razorpayKeyId,
  key_secret: config.razorpayKeySecret
});


