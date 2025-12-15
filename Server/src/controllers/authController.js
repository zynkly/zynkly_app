import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { transporter } from '../config/nodemailer.js';
import { generateOtp } from '../utils/generateOtp.js';
import {
  generateAccessToken,
  generateRefreshToken
} from '../utils/generateToken.js';

const sendOtpEmail = async (email, otp) => {
  await transporter.sendMail({
    from: '"ZYApp" <no-reply@zyapp.com>',
    to: email,
    subject: 'Your OTP for Signup',
    text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
    html: `<p>Your OTP is <b>${otp}</b>. It will expire in 10 minutes.</p>`
  });
};

export const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    let user = await User.findOne({ email });
    if (user && user.verified) {
      return res.status(400).json({ message: 'User already exists' });
    }

    if (!user) {
      const hashed = await bcrypt.hash(password, 10);
      user = await User.create({ name, email, password: hashed });
    }

    const otp = generateOtp();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExpiresAt = otpExpiresAt;
    await user.save();

    await sendOtpEmail(email, otp);

    res.status(200).json({
      message: 'Signup successful, OTP sent to email',
      userId: user._id
    });
  } catch (err) {
    next(err);
  }
};

export const verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    if (!user.otp || !user.otpExpiresAt || user.otpExpiresAt < new Date()) {
      return res.status(400).json({ message: 'OTP expired, please request again' });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    user.verified = true;
    user.otp = undefined;
    user.otpExpiresAt = undefined;
    await user.save();

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res.status(200).json({
      message: 'OTP verified successfully',
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        verified: user.verified
      }
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    if (!user.verified) {
      return res.status(400).json({ message: 'Email not verified' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res.status(200).json({
      message: 'Login successful',
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        verified: user.verified
      }
    });
  } catch (err) {
    next(err);
  }
};


