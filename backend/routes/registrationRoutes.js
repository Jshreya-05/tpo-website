import express from 'express';
import {
  createRegistration,
  getRegistrations,
  deleteRegistration
} from '../controllers/registrationController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', createRegistration);
router.get('/admin', protect, authorize('admin', 'editor'), getRegistrations);
router.delete('/admin/:id', protect, authorize('admin'), deleteRegistration);

export default router;
