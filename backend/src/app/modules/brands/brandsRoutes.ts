import express from 'express';
import {
  createBrand,
  getAllBrands,
  updateBrandById,
  deleteBrandById,
  createIndustry,
  getAllIndustries,
  updateIndustryById,
  deleteIndustryById,
  getBrandsSection,
  updateBrandsSectionHeading,
} from './brandsController';
import { upload } from '../../config/cloudinary';

const router = express.Router();

router.get('/section', getBrandsSection);

router.patch('/section', updateBrandsSectionHeading);

router.post('/brands', createBrand);

router.get('/brands', getAllBrands);

router.patch('/brands/:id', updateBrandById);

router.delete('/brands/:id', deleteBrandById);

router.post('/industries', upload.single('image'), createIndustry);

router.get('/industries', getAllIndustries);

router.patch('/industries/:id', upload.single('image'), updateIndustryById);

router.delete('/industries/:id', deleteIndustryById);

export const brandsRouter = router;
