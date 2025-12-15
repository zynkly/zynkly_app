import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

export const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn
  });
};

export const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, config.refreshSecret, {
    expiresIn: config.refreshExpiresIn
  });
};


