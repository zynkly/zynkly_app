import crypto from 'crypto';
import { razorpayInstance } from '../config/razorpay.js';
import { Payment } from '../models/Payment.js';
import { Booking } from '../models/Booking.js';
import { transporter } from '../config/nodemailer.js';

const sendPaymentEmail = async (email, status, amount, paymentId) => {
  const subject = status === 'success' ? 'Payment Successful' : 'Payment Failed';
  const text =
    status === 'success'
      ? `Your payment of ₹${amount / 100} was successful. Payment ID: ${paymentId}`
      : `Your payment of ₹${amount / 100} failed. Please try again.`;

  await transporter.sendMail({
    from: '"ZYApp" <no-reply@zyapp.com>',
    to: email,
    subject,
    text
  });
};

export const createOrder = async (req, res, next) => {
  try {
    const { amount, currency = 'INR', bookingId } = req.body;

    if (!amount) {
      return res.status(400).json({ message: 'Amount is required' });
    }

    const options = {
      amount: amount * 100,
      currency,
      receipt: `rcpt_${Date.now()}`,
      payment_capture: 1
    };

    const order = await razorpayInstance.orders.create(options);

    const payment = await Payment.create({
      user: req.user._id,
      booking: bookingId || null,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      status: 'created'
    });

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID,
      paymentId: payment._id
    });
  } catch (err) {
    next(err);
  }
};

export const verifyPayment = async (req, res, next) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      paymentRecordId
    } = req.body;

    const shasum = crypto.createHmac(
      'sha256',
      process.env.RAZORPAY_KEY_SECRET
    );
    shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = shasum.digest('hex');

    const payment = await Payment.findById(paymentRecordId).populate('user');
    if (!payment) {
      return res.status(400).json({ message: 'Payment record not found' });
    }

    if (digest === razorpay_signature) {
      payment.status = 'success';
      payment.paymentId = razorpay_payment_id;
      payment.signature = razorpay_signature;
      await payment.save();

      if (payment.booking) {
        await Booking.findByIdAndUpdate(payment.booking, {
          status: 'confirmed'
        });
      }

      await sendPaymentEmail(
        payment.user.email,
        'success',
        payment.amount,
        payment.paymentId
      );

      return res.json({ message: 'Payment verified successfully' });
    }

    payment.status = 'failed';
    payment.paymentId = razorpay_payment_id;
    payment.signature = razorpay_signature;
    await payment.save();

    await sendPaymentEmail(
      payment.user.email,
      'failed',
      payment.amount,
      payment.paymentId
    );

    return res.status(400).json({ message: 'Invalid payment signature' });
  } catch (err) {
    next(err);
  }
};


