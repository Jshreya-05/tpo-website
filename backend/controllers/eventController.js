import Event from '../models/Event.js';
import { validateEvent } from '../validators/eventValidator.js';
import { filePathToPublicUrl, resolveImageUrl } from '../utils/fileUrl.js';

function formatEvent(event) {
  const doc = event.toObject ? event.toObject() : event;
  return {
    ...doc,
    id: doc._id?.toString?.() || doc.id,
    image: resolveImageUrl(doc.image),
  };
}

// @desc    Get all events (Paginated & Filterable)
// @route   GET /api/events
// @access  Public
export const getEvents = async (req, res) => {
  try {
    const { search, status, page = 1, limit = 10 } = req.query;

    let query = {};

    // Internal Dashboard can see all, Public UI sees published by default
    if (status && status !== 'all') {
      query.status = status;
    } else if (!status) {
      query.status = 'published';
    }

    // Text Search
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { companyName: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);

    // Fetch data with sorting (soonest event/deadline first, or latest created)
    const events = await Event.find(query)
      .sort({ eventDate: 1, createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .lean();

    const total = await Event.countDocuments(query);

    res.status(200).json({
      success: true,
      count: events.length,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      data: events.map(formatEvent)
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get specific event
// @route   GET /api/events/:id
// @access  Public
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });

    res.status(200).json({ success: true, data: formatEvent(event) });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Create new event
// @route   POST /api/events/admin
// @access  Protected (Admin)
export const createEvent = async (req, res) => {
  try {
    const { error } = validateEvent(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details.map(x => x.message).join(', ') });
    }

    // Extract uploaded image URL from multer
    const imageUrl = req.file ? filePathToPublicUrl(req.file.path) : '';

    const newEvent = await Event.create({
      ...req.body,
      image: imageUrl,
      createdBy: req.user._id
    });

    res.status(201).json({ success: true, data: formatEvent(newEvent) });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update event
// @route   PUT /api/events/admin/:id
// @access  Protected (Admin)
export const updateEvent = async (req, res) => {
  try {
    let event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });

    const { error } = validateEvent(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details.map(x => x.message).join(', ') });
    }

    let finalImage = req.body.existingImage || '';
    
    // If a new file is uploaded, use it
    if (req.file) {
      finalImage = filePathToPublicUrl(req.file.path);
    }

    event = await Event.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        image: finalImage,
        updatedBy: req.user._id
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, data: formatEvent(event) });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete event
// @route   DELETE /api/events/admin/:id
// @access  Protected (Admin)
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });

    res.status(200).json({ success: true, message: 'Event deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
