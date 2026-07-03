import nodemailer from 'nodemailer';
import { mailConfig } from '../../config/mail.js';

function createTransporter() {
  if (!mailConfig.user || !mailConfig.pass) return null;

  return nodemailer.createTransport({
    host: mailConfig.host,
    port: mailConfig.port,
    secure: mailConfig.secure,
    auth: { user: mailConfig.user, pass: mailConfig.pass }
  });
}

export async function sendMail({ to, subject, html, text }) {
  const transporter = createTransporter();

  if (!transporter) {
    console.warn('[SMTP] EMAIL_USER ou EMAIL_PASS não configurado. E-mail não enviado:', subject);
    return { skipped: true };
  }

  return transporter.sendMail({ from: mailConfig.from, to, subject, html, text });
}

export async function sendWelcomeEmail(user) {
  return sendMail({
    to: user.email,
    subject: 'Bem-vindo ao Arquivo de RPG',
    text: `Olá, ${user.name}! Sua conta foi criada com sucesso.`,
    html: `<h2>Bem-vindo ao Arquivo de RPG</h2><p>Olá, <strong>${user.name}</strong>!</p><p>Sua conta foi criada com sucesso.</p>`
  });
}

export async function sendPasswordResetEmail(user, resetUrl) {
  return sendMail({
    to: user.email,
    subject: 'Recuperação de senha - Arquivo de RPG',
    text: `Olá, ${user.name}. Para redefinir sua senha, acesse: ${resetUrl}. Este link expira em 1 hora.`,
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#19151d;max-width:620px;margin:0 auto;">
        <h2 style="color:#5f3dc4;">Recuperação de senha</h2>
        <p>Olá, <strong>${user.name}</strong>.</p>
        <p>Recebemos uma solicitação para redefinir a senha da sua conta no <strong>Arquivo de RPG</strong>.</p>
        <p><a href="${resetUrl}" style="display:inline-block;padding:12px 18px;background:#5f3dc4;color:#fff;text-decoration:none;border-radius:6px;font-weight:bold;">Redefinir senha</a></p>
        <p>Este link expira em 1 hora e só pode ser usado uma vez.</p>
        <p>Se você não solicitou isso, ignore este e-mail.</p>
      </div>
    `
  });
}

export async function sendPasswordChangedEmail(user) {
  return sendMail({
    to: user.email,
    subject: 'Senha alterada - Arquivo de RPG',
    text: `Olá, ${user.name}. Sua senha foi alterada com sucesso.`,
    html: `<h2>Senha alterada</h2><p>Olá, <strong>${user.name}</strong>.</p><p>Sua senha foi alterada com sucesso.</p>`
  });
}
