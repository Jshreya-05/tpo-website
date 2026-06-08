import Gallery from '../models/Gallery.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { filePathToPublicUrl, resolveImageUrl } from '../utils/fileUrl.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function formatGalleryItem(item) {
  const doc = item.toObject ? item.toObject() : item;
  return {
    ...doc,
    imageUrl: resolveImageUrl(doc.imageUrl),
  };
}

// @desc    Get all gallery images
// @route   GET /api/gallery
// @access  Public
export const getGalleryImages = async (req, res) => {
  try {
    const { year, category, activityId, limit = 50, page = 1 } = req.query;
    
    const query = {};
    if (year) query.year = year;
    if (category) query.category = category;
    if (activityId) query.activityId = activityId;

    const skip = (page - 1) * limit;
    const images = await Gallery.find(query)
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip(skip)
      .populate('uploadedBy', 'name email');

    const total = await Gallery.countDocuments(query);

    res.json({
      success: true,
      data: images.map(formatGalleryItem),
      total,
      page: Number(page),
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Upload multiple gallery images
// @route   POST /api/gallery
// @access  Private/Admin/Editor
export const uploadGalleryImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'Please upload at least one image' });
    }

    const { year = new Date().getFullYear().toString(), activityId, category = 'General' } = req.body;
    
    // Process each uploaded file
    const galleryItems = await Promise.all(
      req.files.map(async (file) => {
        // Generate title from filename if not provided
        const originalName = file.originalname || 'Image';
        const title = originalName.split('.')[0].replace(/[-_]/g, ' ');

        return await Gallery.create({
          title,
          year,
          category,
          activityId: activityId || undefined,
          imageUrl: filePathToPublicUrl(file.path),
          publicId: file.filename,
          uploadedBy: req.user._id
        });
      })
    );

    res.status(201).json({
      success: true,
      message: `${galleryItems.length} images successfully added to the vault.`,
      data: galleryItems.map(formatGalleryItem)
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete gallery image
// @route   DELETE /api/gallery/:id
// @access  Private/Admin
export const deleteGalleryImage = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);

    if (!image) {
      return res.status(404).json({ success: false, message: 'Image not found' });
    }

    // Ensure only Admins can delete
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Administrative privileges required to purge assets' });
    }

    // Delete local file from disk if present
    try {
      const imageUrl = image.imageUrl || '';
      const uploadsIndex = imageUrl.indexOf('/uploads/');
      if (uploadsIndex >= 0) {
        const relativePath = imageUrl.slice(uploadsIndex + 1).replace(/\//g, path.sep);
        const localPath = path.join(__dirname, '..', relativePath);
        if (fs.existsSync(localPath)) fs.unlinkSync(localPath);
      }
    } catch (fileError) {
      // Ignore file delete failures and still remove DB record.
      console.error('Failed to remove local image file:', fileError.message);
    }
    
    // Delete from MongoDB
    await Gallery.deleteOne({ _id: image._id });

    res.json({ success: true, message: 'Visual asset permanently eradicated' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get gallery stats
// @route   GET /api/gallery/stats
// @access  Private
export const getGalleryStats = async (req, res) => {
  try {
    const totalImages = await Gallery.countDocuments();
    const imagesByYear = await Gallery.aggregate([
      { $group: { _id: '$year', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    const recentUploads = await Gallery.find()
      .sort({ createdAt: -1 })
      .limit(8)
      .select('imageUrl title createdAt')
      .lean();

    res.json({
      success: true,
      data: {
        totalImages,
        imagesByYear,
        recentUploads: recentUploads.map((item) => ({
          ...item,
          imageUrl: resolveImageUrl(item.imageUrl),
        })),
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
