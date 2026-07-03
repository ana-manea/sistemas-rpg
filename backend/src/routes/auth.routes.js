import { Router } from 'express';
import { forgotPassword, login, me, register, resetPassword } from '../controllers/auth/auth.controller.js';
import { protect } from '../middlewares/auth.js';

const router = Router();
router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.get('/me', protect, me);
export default router;
