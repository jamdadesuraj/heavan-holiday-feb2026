import { Router } from 'express';
import { loginAdmin, getAdmin, changePassword } from './adminControllers';

import { adminAuthMiddleware } from '../../middlewares/adminMiddleware';

const router = Router();

// Public
router.post('/login', loginAdmin);

// Protected
router.get('/me', adminAuthMiddleware, getAdmin);
router.patch('/change-password', adminAuthMiddleware, changePassword);

export const adminRouter = router;
