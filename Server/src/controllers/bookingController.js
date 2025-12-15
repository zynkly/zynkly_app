import { Booking } from '../models/Booking.js';
import { transporter } from '../config/nodemailer.js';

const sendBookingEmail = async (email, booking, type) => {
  let subject;
  let text;

  if (type === 'created') {
    subject = 'Booking Created';
    text = `Your booking for ${booking.service} on ${booking.date.toDateString()} is created with status ${booking.status}.`;
  } else {
    subject = 'Booking Status Updated';
    text = `Your booking status is now ${booking.status}.`;
  }

  await transporter.sendMail({
    from: '"ZYApp" <no-reply@zyapp.com>',
    to: email,
    subject,
    text
  });
};

export const createBooking = async (req, res, next) => {
  try {
    const { service, price, date } = req.body;

    if (!service || !price || !date) {
      return res
        .status(400)
        .json({ message: 'service, price and date are required' });
    }

    const booking = await Booking.create({
      user: req.user._id,
      service,
      price,
      date,
      status: 'pending'
    });

    await sendBookingEmail(req.user.email, booking, 'created');

    res.status(201).json({
      message: 'Booking created',
      booking
    });
  } catch (err) {
    next(err);
  }
};

export const getBookingStatus = async (req, res, next) => {
  try {
    const { bookingId } = req.params;
    const booking = await Booking.findOne({
      _id: bookingId,
      user: req.user._id
    });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json({ status: booking.status, booking });
  } catch (err) {
    next(err);
  }
};


