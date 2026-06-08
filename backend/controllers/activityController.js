import Activity from '../models/Activity.js';
import { validateActivity } from '../validators/activityValidator.js';
import { filePathToPublicUrl, resolveImageUrls } from '../utils/fileUrl.js';

function formatActivity(activity) {
  const doc = activity.toObject ? activity.toObject() : activity;
  return {
    ...doc,
    id: doc._id?.toString?.() || doc.id,
    images: resolveImageUrls(doc.images),
  };
}

// @desc    Get all activities (Paginated & Filterable)
// @route   GET /api/activities
// @access  Public
export const getActivities = async (req, res) => {
  try {
    const { year, category, search, status, page = 1, limit = 10, isFeatured } = req.query;

    let query = {};

    // Internal Dashboard can see all, Public UI sees published by default
    if (status && status !== 'all') {
      query.status = status;
    } else if (!status) {
      query.status = 'published';
    }

    // Filters
    if (year) query.year = Number(year);
    if (category) query.category = category;
    if (isFeatured) query.isFeatured = isFeatured === 'true';

    // Text Search
    if (search) {
      query.$text = { $search: search };
    }

    const skip = (Number(page) - 1) * Number(limit);

    // Fetch data with sorting (latest first)
    const activities = await Activity.find(query)
      .sort(search ? { score: { $meta: 'textScore' } } : { eventDate: -1, createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .lean();

    const total = await Activity.countDocuments(query);

    res.status(200).json({
      success: true,
      count: activities.length,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      data: activities.map(formatActivity)
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get specific activity
// @route   GET /api/activities/:id
// @access  Public
export const getActivityById = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) return res.status(404).json({ success: false, message: 'Activity not found' });

    res.status(200).json({ success: true, data: formatActivity(activity) });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Create new activity
// @route   POST /api/admin/activities
// @access  Protected (Admin)
export const createActivity = async (req, res) => {
  try {
    const { error } = validateActivity(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details.map(x => x.message).join(', ') });
    }

    // Extract uploaded image URLs from multer/cloudinary
    const imageUrls = req.files ? req.files.map((file) => filePathToPublicUrl(file.path)) : [];

    const newActivity = await Activity.create({
      ...req.body,
      images: imageUrls,
      createdBy: req.user._id
    });

    res.status(201).json({ success: true, data: formatActivity(newActivity) });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update activity
// @route   PUT /api/admin/activities/:id
// @access  Protected (Admin)
export const updateActivity = async (req, res) => {
  try {
    let activity = await Activity.findById(req.params.id);
    if (!activity) return res.status(404).json({ success: false, message: 'Activity not found' });

    const { error } = validateActivity(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details.map(x => x.message).join(', ') });
    }

    let newImages = [];
    if (req.body.existingImages) {
      newImages = Array.isArray(req.body.existingImages) 
        ? req.body.existingImages 
        : [req.body.existingImages];
    }
    
    // Append any newly uploaded Multer/Cloudinary paths
    if (req.files && req.files.length > 0) {
      const imageUrls = req.files.map((file) => filePathToPublicUrl(file.path));
      newImages = [...newImages, ...imageUrls];
    }

    activity = await Activity.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        images: newImages,
        updatedBy: req.user._id
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, data: formatActivity(activity) });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete activity
// @route   DELETE /api/admin/activities/:id
// @access  Protected (Admin)
export const deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    if (!activity) return res.status(404).json({ success: false, message: 'Activity not found' });

    res.status(200).json({ success: true, message: 'Activity deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get featured activities for homepage
// @route   GET /api/activities/featured
// @access  Public
export const getFeaturedActivities = async (req, res) => {
  try {
    const activities = await Activity.find({ isFeatured: true, status: 'published' })
      .sort({ eventDate: -1 })
      .limit(3)
      .lean();

    res.status(200).json({
      success: true,
      data: activities.map(formatActivity)
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get dashboard analytics
// @route   GET /api/admin/analytics
// @access  Protected (Admin)
export const getAdminAnalytics = async (req, res) => {
  try {
    const [totalActivities, placementDrives, uniqueCompanies, latestYearCount] = await Promise.all([
      Activity.countDocuments(),
      Activity.countDocuments({ category: 'Placement Drive' }),
      Activity.distinct('companyName'),
      Activity.countDocuments({ year: new Date().getFullYear() })
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalActivities,
        totalPlacementDrives: placementDrives,
        totalCompanies: uniqueCompanies.filter(c => c).length,
        latestYearCount
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


