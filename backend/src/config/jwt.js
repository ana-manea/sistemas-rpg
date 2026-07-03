export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'dev-secret',
  expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  resetSecret: process.env.RESET_PASSWORD_SECRET || process.env.JWT_SECRET || 'dev-secret',
  resetExpiresIn: process.env.RESET_PASSWORD_EXPIRES_IN || '1h',
};
