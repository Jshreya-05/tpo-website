import express from 'express';
import {
  createContactSubmission,
  getContactSubmissions,
  deleteContactSubmission
} from '../controllers/contactController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', createContactSubmission);
router.get('/admin', protect, authorize('admin', 'editor'), getContactSubmissions);
router.delete('/admin/:id', protect, authorize('admin'), deleteContactSubmission);

export default router;
