import Registration from '../models/Registration.js';
import { sendRegistrationEmail } from '../utils/emailService.js';

// @desc    Register a new student for placement
// @route   POST /api/registrations
// @access  Public
export const createRegistration = async (req, res) => {
  try {
    const { name, email, phone, branch, year } = req.body;
    if (!name || !email || !phone || !branch || !year) {
      return res.status(400).json({ success: false, message: 'Please provide all required registration fields.' });
    }

    const registration = await Registration.create({
      name,
      email,
      phone,
      branch,
      year
    });

    // Fire email notification asynchronously so response is fast
    sendRegistrationEmail(registration).catch(err => {
      console.error('Failed to trigger background email process:', err.message);
    });

    res.status(201).json({ success: true, data: registration });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get all student registrations (Paginated)
// @route   GET /api/registrations/admin
// @access  Protected (Admin/Editor)
export const getRegistrations = async (req, res) => {
  try {
    const { page = 1, limit = 50, search } = req.query;

    let query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { branch: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const registrations = await Registration.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .lean();

    const total = await Registration.countDocuments(query);

    res.status(200).json({
      success: true,
      count: registrations.length,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      data: registrations.map(r => ({
        ...r,
        id: r._id.toString()
      }))
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a registration
// @route   DELETE /api/registrations/admin/:id
// @access  Protected (Admin)
export const deleteRegistration = async (req, res) => {
  try {
    const registration = await Registration.findByIdAndDelete(req.params.id);
    if (!registration) {
      return res.status(404).json({ success: false, message: 'Registration not found' });
    }
    res.status(200).json({ success: true, message: 'Registration deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
