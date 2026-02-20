import { Router } from 'express';
import {
  loginAdmin,
  getAdmin,
  changePassword,
  createAdmin,
} from './adminControllers';

import { adminAuthMiddleware } from '../../middlewares/adminMiddleware';

const router = Router();

// Public
router.post('/login', loginAdmin);

// Protected
router.get('/me', adminAuthMiddleware, getAdmin);
router.patch('/change-password', adminAuthMiddleware, changePassword);
router.post('/create', createAdmin);
export const adminRouter = router;
