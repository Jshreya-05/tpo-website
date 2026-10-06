import Gallery from '../models/Gallery.js';
import {
  destroyCloudinaryAsset,
  destroyCloudinaryAssets,
  getUploadedAssetMeta,
} from '../config/cloudinary.js';
import { resolveImageUrl } from '../utils/fileUrl.js';

function formatGalleryItem(item) {
  const doc = item.toObject ? item.toObject() : item;
  return {
    ...doc,
    imageUrl: resolveImageUrl(doc.imageUrl),
  };
}

function titleFromOriginalName(originalName = 'Image') {
  return originalName.split('.')[0].replace(/[-_]/g, ' ').trim() || 'Image';
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

// @desc    Upload multiple gallery images to Cloudinary
// @route   POST /api/gallery
// @access  Private/Admin/Editor
export const uploadGalleryImages = async (req, res, next) => {
  const uploadedAssets = (req.files || []).map((file) => ({
    ...getUploadedAssetMeta(file),
    originalname: file.originalname,
  }));

  try {
    if (uploadedAssets.length === 0) {
      return res.status(400).json({ success: false, message: 'Please upload at least one image' });
    }

    const incomplete = uploadedAssets.filter((asset) => !asset.imageUrl || !asset.publicId);
    if (incomplete.length > 0) {
      await destroyCloudinaryAssets(uploadedAssets.map((asset) => asset.publicId));
      return res.status(502).json({
        success: false,
        message: 'Cloudinary did not return a complete upload result. No gallery records were created.',
      });
    }

    const { year = new Date().getFullYear().toString(), activityId, category = 'General' } = req.body;
    const created = [];

    try {
      for (const asset of uploadedAssets) {
        const item = await Gallery.create({
          title: titleFromOriginalName(asset.originalname),
          year,
          category,
          activityId: activityId || undefined,
          imageUrl: asset.imageUrl,
          publicId: asset.publicId,
          uploadedBy: req.user._id,
        });
        created.push(item);
      }
    } catch (error) {
      await Promise.allSettled(created.map((item) => Gallery.deleteOne({ _id: item._id })));
      await destroyCloudinaryAssets(uploadedAssets.map((asset) => asset.publicId));
      throw error;
    }

    res.status(201).json({
      success: true,
      message: `${created.length} images successfully added to the vault.`,
      data: created.map(formatGalleryItem)
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete gallery image
// @route   DELETE /api/gallery/:id
// @access  Private/Admin
export const deleteGalleryImage = async (req, res, next) => {
  try {
    const image = await Gallery.findById(req.params.id);

    if (!image) {
      return res.status(404).json({ success: false, message: 'Image not found' });
    }

    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Administrative privileges required to purge assets' });
    }

    await destroyCloudinaryAsset(image.publicId);
    await Gallery.deleteOne({ _id: image._id });

    res.json({ success: true, message: 'Visual asset permanently eradicated' });
  } catch (error) {
    next(error);
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
