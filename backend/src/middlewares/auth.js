import User from '../models/User.js';
import { verifyAuthToken } from '../services/jwt/tokenService.js';

export async function protect(req, res, next) {
  try {
    const auth = req.headers.authorization || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
    if (!token) return res.status(401).json({ message: 'Token não informado.' });
    const decoded = verifyAuthToken(token);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) return res.status(401).json({ message: 'Usuário inválido.' });
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Sessão inválida ou expirada.' });
  }
}
