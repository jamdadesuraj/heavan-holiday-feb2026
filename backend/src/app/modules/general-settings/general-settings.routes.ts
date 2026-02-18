// settings.routes.ts

import { Router } from 'express';
import { getSettings, updateSettings } from './general-settings.controller';

import { upload } from '../../config/cloudinary';
const router = Router();

router.get('/', getSettings);

router.patch(
  '/',
  upload.fields([
    { name: 'companyLogo', maxCount: 1 },
    { name: 'paymentGateways', maxCount: 1 },
    { name: 'favicon', maxCount: 1 },
  ]),
  updateSettings,
);

export const generalSettingsRouter = router;
