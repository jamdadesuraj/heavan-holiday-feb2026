import express from 'express';
import { getAboutUs, updateAboutUs } from './aboutus.controller';

import { upload } from '../../config/cloudinary';
const router = express.Router();

router.post(
  '/',
  upload.fields([
    { name: 'video', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 },
  ]),
  updateAboutUs,
);

router.get('/', getAboutUs);

export const aboutusRouter = router;
