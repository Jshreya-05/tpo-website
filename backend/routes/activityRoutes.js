import express from 'express';
import {
  getActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
  getFeaturedActivities,
  getAdminAnalytics
} from '../controllers/activityController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();

// Public Routes
router.get('/', getActivities);
router.get('/featured', getFeaturedActivities);
router.get('/:id', getActivityById);

// Admin Routes (Sub-paths under /api/activities/admin)
router.get('/admin/analytics', protect, authorize('admin', 'editor'), getAdminAnalytics);
router.post('/admin', protect, authorize('admin', 'editor'), upload.array('images', 10), createActivity);
router.put('/admin/:id', protect, authorize('admin', 'editor'), upload.array('images', 10), updateActivity);
router.delete('/admin/:id', protect, authorize('admin'), deleteActivity);
router.get('/admin/list', protect, authorize('admin', 'editor'), getActivities); // Reuse getActivities with status=all via frontend


export default router;

