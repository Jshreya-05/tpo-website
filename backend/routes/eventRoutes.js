import express from 'express';
import {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
} from '../controllers/eventController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();

// Public Routes
router.get('/', getEvents);
router.get('/:id', getEventById);

// Admin Routes (Sub-paths under /api/events/admin)
router.post('/admin', protect, authorize('admin', 'editor'), upload.single('image'), createEvent);
router.put('/admin/:id', protect, authorize('admin', 'editor'), upload.single('image'), updateEvent);
router.delete('/admin/:id', protect, authorize('admin'), deleteEvent);
router.get('/admin/list', protect, authorize('admin', 'editor'), getEvents); // Reuse getEvents with status=all via frontend query param

export default router;
