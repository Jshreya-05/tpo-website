import express from 'express';
import {
  getDepartments,
  getPrograms,
  getAdminPrograms,
  getProgramById,
  createProgram,
  updateProgram,
  deleteProgram,
} from '../controllers/programController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getPrograms);
router.get('/departments', getDepartments);
router.get('/:id', getProgramById);

router.get('/admin/list', protect, authorize('admin', 'editor'), getAdminPrograms);
router.post('/admin', protect, authorize('admin', 'editor'), createProgram);
router.put('/admin/:id', protect, authorize('admin', 'editor'), updateProgram);
router.delete('/admin/:id', protect, authorize('admin'), deleteProgram);

export default router;
