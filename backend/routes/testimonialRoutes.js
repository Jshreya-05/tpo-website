import express from 'express';
import {
  getTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
} from '../controllers/testimonialController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getTestimonials);
router.get('/:id', getTestimonialById);

// Admin Routes (Sub-paths under /api/testimonials/admin)
router.post('/admin', protect, authorize('admin', 'editor'), createTestimonial);
router.put('/admin/:id', protect, authorize('admin', 'editor'), updateTestimonial);
router.delete('/admin/:id', protect, authorize('admin'), deleteTestimonial);

export default router;
