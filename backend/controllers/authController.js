import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { sendPasswordChangedEmail, sendPasswordResetEmail, sendWelcomeEmail } from '../utils/mailer.js';

function makeToken(user) {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '7d' });
}

function publicUser(user) {
  return { id: user._id, name: user.name, email: user.email, role: user.role };
}

export async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Preencha nome, e-mail e senha.' });
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: 'Este e-mail já está cadastrado.' });
    const user = await User.create({ name, email, password });
    sendWelcomeEmail(user).catch(error => console.error('[SMTP] Erro ao enviar boas-vindas:', error.message));
    res.status(201).json({ token: makeToken(user), user: publicUser(user) });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar usuário.' });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) return res.status(401).json({ message: 'E-mail ou senha inválidos.' });
    res.json({ token: makeToken(user), user: publicUser(user) });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao entrar.' });
  }
}

export async function forgotPassword(req, res) {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Informe seu e-mail.' });

    const user = await User.findOne({ email });
    // Resposta genérica para não expor se o e-mail existe ou não.
    if (!user) return res.json({ message: 'Se o e-mail estiver cadastrado, enviaremos um link de recuperação.' });

    const rawToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');

    user.passwordResetToken = hashedToken;
    user.passwordResetExpires = new Date(Date.now() + 60 * 60 * 1000);
    await user.save({ validateBeforeSave: false });

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const resetUrl = `${frontendUrl}/redefinir-senha/${rawToken}`;
    await sendPasswordResetEmail(user, resetUrl);

    res.json({ message: 'Se o e-mail estiver cadastrado, enviaremos um link de recuperação.' });
  } catch (error) {
    console.error('[AUTH] Erro ao recuperar senha:', error.message);
    res.status(500).json({ message: 'Erro ao solicitar recuperação de senha.' });
  }
}

export async function resetPassword(req, res) {
  try {
    const { token } = req.params;
    const { password } = req.body;
    if (!password || password.length < 6) return res.status(400).json({ message: 'A senha deve ter pelo menos 6 caracteres.' });

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: new Date() }
    });

    if (!user) return res.status(400).json({ message: 'Link inválido ou expirado.' });

    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    sendPasswordChangedEmail(user).catch(error => console.error('[SMTP] Erro ao enviar aviso de senha alterada:', error.message));

    res.json({ message: 'Senha redefinida com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao redefinir senha.' });
  }
}

export async function me(req, res) {
  res.json({ user: req.user });
}
