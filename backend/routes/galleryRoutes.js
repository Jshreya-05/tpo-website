import express from 'express';
import {
  getGalleryImages,
  uploadGalleryImages,
  deleteGalleryImage,
  getGalleryStats
} from '../controllers/galleryController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getGalleryImages)
  .post(protect, authorize('admin', 'editor'), upload.array('images', 20), uploadGalleryImages);

router.get('/stats', protect, getGalleryStats);

router.route('/:id')
  .delete(protect, authorize('admin'), deleteGalleryImage); // Restrict deletion to Admin only

export default router;