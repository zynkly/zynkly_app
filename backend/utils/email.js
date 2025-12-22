const nodemailer = require('nodemailer');
const config = require('../config/env');

// Create transporter
const transporter = nodemailer.createTransport({
  host: config.emailHost,
  port: config.emailPort,
  secure: false, // true for 465, false for other ports
  auth: {
    user: config.emailUser,
    pass: config.emailPass
  }
});

// Verify transporter configuration (only if credentials are provided)
if (config.emailUser && config.emailPass) {
  transporter.verify(function (error, success) {
    if (error) {
      console.log('⚠️  Email transporter error:', error.message);
      console.log('   Email functionality may not work. Check EMAIL_USER and EMAIL_PASS in .env');
    } else {
      console.log('✅ Email server is ready to send messages');
    }
  });
} else {
  console.log('⚠️  Email credentials not configured. Email functionality disabled.');
}

// Send OTP email
const sendOTPEmail = async (email, name, otp) => {
  // Check if email is configured
  if (!config.emailUser || !config.emailPass) {
    console.warn('⚠️  Email not configured. OTP:', otp, 'for', email);
    return { success: false, message: 'Email service not configured' };
  }

  const mailOptions = {
    from: `"Cleaning Services" <${config.emailFrom}>`,
    to: email,
    subject: 'Your OTP for Cleaning Services',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>OTP Verification</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">Cleaning Services</h1>
        </div>
        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #667eea;">Hello ${name}!</h2>
          <p>Thank you for using Cleaning Services. Please use the following OTP to verify your account:</p>
          <div style="background: white; border: 2px dashed #667eea; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
            <h1 style="color: #667eea; font-size: 36px; letter-spacing: 5px; margin: 0;">${otp}</h1>
          </div>
          <p style="color: #666; font-size: 14px;">This OTP will expire in ${config.otpExpireMinutes} minutes.</p>
          <p style="color: #666; font-size: 14px;">If you didn't request this OTP, please ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="color: #999; font-size: 12px; text-align: center;">© ${new Date().getFullYear()} Cleaning Services. All rights reserved.</p>
        </div>
      </body>
      </html>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ OTP email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending OTP email:', error);
    throw new Error('Failed to send OTP email');
  }
};

// Send order confirmation email
const sendOrderConfirmationEmail = async (email, name, order) => {
  // Check if email is configured
  if (!config.emailUser || !config.emailPass) {
    console.warn('⚠️  Email not configured. Order confirmation not sent for order:', order.orderId);
    return { success: false, message: 'Email service not configured' };
  }

  const mailOptions = {
    from: `"Cleaning Services" <${config.emailFrom}>`,
    to: email,
    subject: `Order Confirmation - ${order.orderId}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Confirmation</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">Order Confirmed!</h1>
        </div>
        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #667eea;">Hello ${name}!</h2>
          <p>Thank you for your order. We've received your payment and your cleaning services are confirmed.</p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #667eea; margin-top: 0;">Order Details</h3>
            <p><strong>Order ID:</strong> ${order.orderId}</p>
            <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleString()}</p>
            <p><strong>Payment Status:</strong> <span style="color: #28a745; font-weight: bold;">${order.paymentStatus.toUpperCase()}</span></p>
            <p><strong>Order Status:</strong> <span style="color: #667eea; font-weight: bold;">${order.status.toUpperCase()}</span></p>
          </div>

          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #667eea; margin-top: 0;">Services Booked</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background: #f5f5f5;">
                  <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Service</th>
                  <th style="padding: 10px; text-align: center; border-bottom: 2px solid #ddd;">Qty</th>
                  <th style="padding: 10px; text-align: right; border-bottom: 2px solid #ddd;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${order.items.map(item => `
                  <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">
                      <strong>${item.serviceName}</strong><br>
                      <small style="color: #666;">Duration: ${item.duration} min</small>
                    </td>
                    <td style="padding: 10px; text-align: center; border-bottom: 1px solid #eee;">${item.quantity}</td>
                    <td style="padding: 10px; text-align: right; border-bottom: 1px solid #eee;">₹${item.price * item.quantity}</td>
                  </tr>
                `).join('')}
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="2" style="padding: 10px; text-align: right; font-weight: bold; border-top: 2px solid #667eea;">Total Amount:</td>
                  <td style="padding: 10px; text-align: right; font-weight: bold; font-size: 18px; color: #667eea; border-top: 2px solid #667eea;">₹${order.totalAmount}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          ${order.address ? `
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #667eea; margin-top: 0;">Delivery Address</h3>
            <p>${order.address.street}<br>
            ${order.address.city}, ${order.address.state} ${order.address.pincode}<br>
            ${order.address.landmark ? `Landmark: ${order.address.landmark}` : ''}</p>
          </div>
          ` : ''}

          <p style="margin-top: 30px;">We'll send you updates about your order status. If you have any questions, please contact our support team.</p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="color: #999; font-size: 12px; text-align: center;">© ${new Date().getFullYear()} Cleaning Services. All rights reserved.</p>
        </div>
      </body>
      </html>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Order confirmation email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending order confirmation email:', error);
    throw new Error('Failed to send order confirmation email');
  }
};

module.exports = {
  sendOTPEmail,
  sendOrderConfirmationEmail
};

