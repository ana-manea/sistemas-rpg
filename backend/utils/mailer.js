import nodemailer from 'nodemailer';

function createTransporter() {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) return null;
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: Number(process.env.EMAIL_PORT || 587),
    secure: String(process.env.EMAIL_SECURE || 'false') === 'true',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
  });
}

export async function sendMail({ to, subject, html, text }) {
  const transporter = createTransporter();
  if (!transporter) {
    console.warn('[SMTP] EMAIL_USER ou EMAIL_PASS não configurado. E-mail não enviado:', subject);
    return { skipped: true };
  }
  const from = process.env.EMAIL_FROM || `Arquivo da Máscara <${process.env.EMAIL_USER}>`;
  return transporter.sendMail({ from, to, subject, html, text });
}

export async function sendWelcomeEmail(user) {
  return sendMail({
    to: user.email,
    subject: 'Bem-vindo ao Arquivo da Máscara',
    text: `Olá, ${user.name}! Sua conta foi criada com sucesso.`,
    html: `<h2>Bem-vindo ao Arquivo da Máscara</h2><p>Olá, <strong>${user.name}</strong>!</p><p>Sua conta foi criada com sucesso.</p>`
  });
}

export async function sendPasswordResetEmail(user, resetUrl) {
  return sendMail({
    to: user.email,
    subject: 'Recuperação de senha - Arquivo da Máscara',
    text: `Olá, ${user.name}. Para redefinir sua senha, acesse: ${resetUrl}`,
    html: `<h2>Recuperação de senha</h2><p>Olá, <strong>${user.name}</strong>.</p><p>Clique no botão abaixo para redefinir sua senha:</p><p><a href="${resetUrl}" style="display:inline-block;padding:12px 18px;background:#b52b3f;color:#fff;text-decoration:none;border-radius:6px;">Redefinir senha</a></p><p>Este link expira em 1 hora.</p><p>Se você não solicitou isso, ignore este e-mail.</p>`
  });
}

export async function sendPasswordChangedEmail(user) {
  return sendMail({
    to: user.email,
    subject: 'Senha alterada - Arquivo da Máscara',
    text: `Olá, ${user.name}. Sua senha foi alterada com sucesso.`,
    html: `<h2>Senha alterada</h2><p>Olá, <strong>${user.name}</strong>.</p><p>Sua senha foi alterada com sucesso.</p>`
  });
}
