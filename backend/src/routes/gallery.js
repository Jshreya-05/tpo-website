import express from 'express';
import path from 'path';
import { Gallery } from '../models/Gallery.js';
import { galleryUpload } from '../middleware/upload.js';
import { buildFileUrl, resolveImageUrl } from '../utils/fileUrl.js';

const router = express.Router();

function formatGalleryItem(item) {
  const doc = item.toObject ? item.toObject() : item;
  return {
    ...doc,
    imageUrl: resolveImageUrl(doc.imageUrl),
  };
}

router.get('/', async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 12));
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.year) filter.year = req.query.year;
    if (req.query.category) filter.category = req.query.category;

    const [items, total] = await Promise.all([
      Gallery.find(filter)
        .populate('uploadedBy', 'name email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Gallery.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: items.map(formatGalleryItem),
      total,
      page,
      pages: Math.ceil(total / limit) || 1,
    });
  } catch (error) {
    console.error('Gallery fetch error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch gallery items' });
  }
});

router.post('/', galleryUpload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Image file is required' });
    }

    const { title, year, category, uploadedBy } = req.body;
    if (!title || !year || !category) {
      return res.status(400).json({
        success: false,
        message: 'title, year, and category are required',
      });
    }

    const relativePath = path
      .join('gallery', year, 'general', req.file.filename)
      .replace(/\\/g, '/');

    const galleryItem = await Gallery.create({
      title,
      year,
      category,
      imageUrl: buildFileUrl(relativePath),
      publicId: req.file.filename,
      uploadedBy: uploadedBy || undefined,
    });

    const populated = await Gallery.findById(galleryItem._id).populate(
      'uploadedBy',
      'name email'
    );

    res.status(201).json({
      success: true,
      data: formatGalleryItem(populated),
    });
  } catch (error) {
    console.error('Gallery upload error:', error);
    res.status(500).json({ success: false, message: 'Failed to upload gallery image' });
  }
});

export default router;
