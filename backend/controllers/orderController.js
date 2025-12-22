const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Service = require('../models/Service');
const { createOrder, verifyPaymentSignature, fetchPaymentDetails } = require('../utils/razorpay');
const { sendOrderConfirmationEmail } = require('../utils/email');
const config = require('../config/env');

// @desc    Create Razorpay order
// @route   POST /api/orders/create-order
// @access  Private
exports.createRazorpayOrder = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.service');
    
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty'
      });
    }

    // Create Razorpay order
    const razorpayOrder = await createOrder(
      cart.totalAmount,
      'INR',
      `receipt_${Date.now()}_${req.user._id}`
    );

    res.json({
      success: true,
      message: 'Razorpay order created',
      data: {
        orderId: razorpayOrder.orderId,
        amount: razorpayOrder.amount / 100, // Convert from paise to rupees
        currency: razorpayOrder.currency,
        keyId: config.razorpayKeyId
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Verify payment and create order
// @route   POST /api/orders/verify-payment
// @access  Private
exports.verifyPayment = async (req, res, next) => {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, address, scheduledDate } = req.body;

    // Verify payment signature
    const isSignatureValid = verifyPaymentSignature(
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature
    );

    if (!isSignatureValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment signature'
      });
    }

    // Fetch payment details from Razorpay
    const paymentDetails = await fetchPaymentDetails(razorpayPaymentId);

    if (paymentDetails.payment.status !== 'captured') {
      return res.status(400).json({
        success: false,
        message: 'Payment not captured'
      });
    }

    // Get cart
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.service');
    
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty'
      });
    }

    // Create order items
    const orderItems = cart.items.map(item => ({
      service: item.service._id,
      serviceName: item.service.name,
      quantity: item.quantity,
      price: item.price,
      duration: item.service.duration
    }));

    // Create order
    const order = new Order({
      user: req.user._id,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      items: orderItems,
      totalAmount: cart.totalAmount,
      status: 'paid',
      paymentStatus: 'completed',
      address: address || null,
      scheduledDate: scheduledDate || null
    });

    await order.save();
    await order.populate('user', 'name email phone');

    // Clear cart
    cart.items = [];
    await cart.save();

    // Send order confirmation email
    try {
      await sendOrderConfirmationEmail(
        req.user.email,
        req.user.name,
        order
      );
    } catch (emailError) {
      console.error('Failed to send order confirmation email:', emailError);
      // Continue even if email fails
    }

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: order
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user orders
// @route   GET /api/orders
// @access  Private
exports.getUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.service')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.service');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if order belongs to user or user is admin
    if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this order'
      });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Cancel order
// @route   PUT /api/orders/:id/cancel
// @access  Private
exports.cancelOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if order belongs to user
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this order'
      });
    }

    // Check if order can be cancelled
    if (order.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Order is already cancelled'
      });
    }

    if (order.status === 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel completed order'
      });
    }

    order.status = 'cancelled';
    await order.save();

    res.json({
      success: true,
      message: 'Order cancelled successfully',
      data: order
    });
  } catch (error) {
    next(error);
  }
};

