const razorpay = require('razorpay');
const crypto = require('crypto');
const config = require('../config/env');

// Initialize Razorpay instance
const razorpayInstance = new razorpay({
  key_id: config.razorpayKeyId,
  key_secret: config.razorpayKeySecret
});

// Create Razorpay order
const createOrder = async (amount, currency = 'INR', receipt = null) => {
  try {
    const options = {
      amount: amount * 100, // Convert to paise (Razorpay expects amount in smallest currency unit)
      currency: currency,
      receipt: receipt || `receipt_${Date.now()}`,
      payment_capture: 1 // Auto capture payment
    };

    const order = await razorpayInstance.orders.create(options);
    return {
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt
    };
  } catch (error) {
    console.error('❌ Razorpay order creation error:', error);
    if (error.error) {
      console.error('Detailed Error:', JSON.stringify(error.error, null, 2));
    }
    throw new Error('Failed to create Razorpay order: ' + (error.error?.description || error.message));
  }
};

// Verify payment signature
const verifyPaymentSignature = (orderId, paymentId, signature) => {
  try {
    const text = `${orderId}|${paymentId}`;
    const generatedSignature = crypto
      .createHmac('sha256', config.razorpayKeySecret)
      .update(text)
      .digest('hex');

    return generatedSignature === signature;
  } catch (error) {
    console.error('❌ Payment signature verification error:', error);
    return false;
  }
};

// Fetch payment details
const fetchPaymentDetails = async (paymentId) => {
  try {
    const payment = await razorpayInstance.payments.fetch(paymentId);
    return {
      success: true,
      payment: {
        id: payment.id,
        amount: payment.amount / 100, // Convert from paise to rupees
        currency: payment.currency,
        status: payment.status,
        method: payment.method,
        orderId: payment.order_id,
        createdAt: new Date(payment.created_at * 1000)
      }
    };
  } catch (error) {
    console.error('❌ Error fetching payment details:', error);
    throw new Error('Failed to fetch payment details');
  }
};

module.exports = {
  createOrder,
  verifyPaymentSignature,
  fetchPaymentDetails,
  razorpayInstance
};

