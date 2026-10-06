import express from 'express';
import {
  getGalleryImages,
  uploadGalleryImages,
  deleteGalleryImage,
  getGalleryStats
} from '../controllers/galleryController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';
import { uploadGalleryFiles } from '../middlewares/galleryUploadMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getGalleryImages)
  .post(protect, authorize('admin', 'editor'), uploadGalleryFiles, uploadGalleryImages);

router.get('/stats', protect, authorize('admin', 'editor'), getGalleryStats);

router.route('/:id')
  .delete(protect, authorize('admin'), deleteGalleryImage); // Restrict deletion to Admin only

export default router;