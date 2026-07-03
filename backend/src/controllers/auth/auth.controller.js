import User from '../../models/User.js';
import { makeAuthToken, makePasswordResetToken, verifyPasswordResetToken } from '../../services/jwt/tokenService.js';
import { sendPasswordChangedEmail, sendPasswordResetEmail } from '../../services/smtp/mailer.js';

function publicUser(user) {
  return { id: user._id, name: user.name, email: user.email };
}

export async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Preencha nome, e-mail e senha.' });
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: 'Este e-mail já está cadastrado.' });
    const user = await User.create({ name, email, password });
    res.status(201).json({ token: makeAuthToken(user), user: publicUser(user) });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar usuário.' });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) return res.status(401).json({ message: 'E-mail ou senha inválidos.' });
    res.json({ token: makeAuthToken(user), user: publicUser(user) });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao entrar.' });
  }
}

export async function me(req, res) {
  res.json({ user: req.user });
}

export async function forgotPassword(req, res) {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Informe o e-mail cadastrado.' });

    const user = await User.findOne({ email: String(email).toLowerCase().trim() });
    const genericMessage = 'Se o e-mail estiver cadastrado, enviaremos um link para redefinir sua senha.';
    if (!user) return res.json({ message: genericMessage });

    const resetToken = makePasswordResetToken(user);
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const resetUrl = `${frontendUrl.replace(/\/$/, '')}/redefinir-senha/${resetToken}`;

    const result = await sendPasswordResetEmail(user, resetUrl);
    const response = { message: genericMessage };
    if (result?.skipped && process.env.NODE_ENV !== 'production') {
      response.devResetUrl = resetUrl;
      response.message = 'SMTP não configurado. Use o link de desenvolvimento retornado para redefinir a senha.';
    }
    return res.json(response);
  } catch (error) {
    console.error('[forgotPassword]', error);
    return res.status(500).json({ message: 'Erro ao solicitar recuperação de senha.' });
  }
}

export async function resetPassword(req, res) {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!token) return res.status(400).json({ message: 'Token de recuperação ausente.' });
    if (!password || password.length < 6) return res.status(400).json({ message: 'A senha deve ter pelo menos 6 caracteres.' });

    let payload;
    try {
      payload = verifyPasswordResetToken(token);
    } catch (error) {
      return res.status(400).json({ message: 'Link de recuperação inválido ou expirado.' });
    }

    if (payload.purpose !== 'password-reset') {
      return res.status(400).json({ message: 'Token inválido para recuperação de senha.' });
    }

    const user = await User.findById(payload.id);
    if (!user) return res.status(400).json({ message: 'Usuário não encontrado.' });
    if ((user.passwordResetVersion || 0) !== payload.version) {
      return res.status(400).json({ message: 'Este link de recuperação já foi utilizado. Solicite um novo link.' });
    }

    user.password = password;
    user.passwordResetVersion = (user.passwordResetVersion || 0) + 1;
    await user.save();

    await sendPasswordChangedEmail(user);
    return res.json({ message: 'Senha redefinida com sucesso. Faça login com sua nova senha.' });
  } catch (error) {
    console.error('[resetPassword]', error);
    return res.status(500).json({ message: 'Erro ao redefinir senha.' });
  }
}
