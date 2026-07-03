import { Router } from 'express';
import { getProfile } from '../controllers/users/users.controller.js';
import { protect } from '../middlewares/auth.js';

const router = Router();
router.get('/profile', protect, getProfile);
export default router;
