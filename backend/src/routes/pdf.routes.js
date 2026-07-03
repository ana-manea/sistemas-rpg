import { Router } from 'express';
import { exportPdf } from '../controllers/pdf/pdf.controller.js';
import { protect } from '../middlewares/auth.js';

const router = Router();
router.post('/export', protect, exportPdf);
export default router;
