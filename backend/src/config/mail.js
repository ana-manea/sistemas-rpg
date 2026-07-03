export const mailConfig = {
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: Number(process.env.EMAIL_PORT || 587),
  secure: String(process.env.EMAIL_SECURE || 'false') === 'true',
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS,
  from: process.env.EMAIL_FROM || (process.env.EMAIL_USER ? `Arquivo de RPG <${process.env.EMAIL_USER}>` : undefined),
};
