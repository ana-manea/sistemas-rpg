import jwt from 'jsonwebtoken';
import { jwtConfig } from '../../config/jwt.js';

export function makeAuthToken(user) {
  return jwt.sign({ id: user._id }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
}

export function makePasswordResetToken(user) {
  return jwt.sign(
    { id: user._id, purpose: 'password-reset', version: user.passwordResetVersion || 0 },
    jwtConfig.resetSecret,
    { expiresIn: jwtConfig.resetExpiresIn }
  );
}

export function verifyAuthToken(token) {
  return jwt.verify(token, jwtConfig.secret);
}

export function verifyPasswordResetToken(token) {
  return jwt.verify(token, jwtConfig.resetSecret);
}
