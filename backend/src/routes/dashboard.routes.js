import { Router } from 'express';
import { dashboardSummary } from '../controllers/dashboard/dashboard.controller.js';
import { protect } from '../middlewares/auth.js';

const router = Router();
router.get('/', protect, dashboardSummary);
export default router;
