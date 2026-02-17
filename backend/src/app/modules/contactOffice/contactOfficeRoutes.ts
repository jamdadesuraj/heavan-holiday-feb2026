import { Router } from 'express';
import {
  getAllOffices,
  getOfficeById,
  createOffice,
  updateOffice,
  deleteOffice,
  updateOfficeTimes,
  addHoliday,
  removeHoliday,
  getOfficeHolidays,
  checkOfficeStatus,
  getOfficeSchedule,
} from './contactOffice.Controller';

const router = Router();

// Basic CRUD operations
router.get('/', getAllOffices);
router.get('/:id', getOfficeById);
router.post('/', createOffice);
router.put('/:id', updateOffice);
router.delete('/:id', deleteOffice);

// Office times management
router.put('/:id/times', updateOfficeTimes);

// Holiday management
router.post('/:id/holidays', addHoliday);
router.delete('/:id/holidays', removeHoliday);
router.get('/:id/holidays', getOfficeHolidays);

// Status and schedule
router.get('/:id/status', checkOfficeStatus);
router.get('/:id/schedule', getOfficeSchedule);

export const contactOfficeRouter = router;
