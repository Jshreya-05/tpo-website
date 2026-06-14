import ContactSubmission from '../models/ContactSubmission.js';

// @desc    Submit a contact form entry
// @route   POST /api/contacts
// @access  Public
export const createContactSubmission = async (req, res) => {
  try {
    const { name, email, phone, role, org, message } = req.body;
    if (!name || !email || !role) {
      return res.status(400).json({ success: false, message: 'Name, email, and role are required.' });
    }

    const submission = await ContactSubmission.create({
      name,
      email,
      phone,
      role,
      org,
      message
    });

    res.status(201).json({ success: true, data: submission });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get all contact submissions
// @route   GET /api/contacts/admin
// @access  Protected (Admin/Editor)
export const getContactSubmissions = async (req, res) => {
  try {
    const { page = 1, limit = 50, search } = req.query;

    let query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const submissions = await ContactSubmission.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .lean();

    const total = await ContactSubmission.countDocuments(query);

    res.status(200).json({
      success: true,
      count: submissions.length,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      data: submissions.map(s => ({
        ...s,
        id: s._id.toString()
      }))
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a contact submission
// @route   DELETE /api/contacts/admin/:id
// @access  Protected (Admin)
export const deleteContactSubmission = async (req, res) => {
  try {
    const submission = await ContactSubmission.findByIdAndDelete(req.params.id);
    if (!submission) {
      return res.status(404).json({ success: false, message: 'Contact submission not found' });
    }
    res.status(200).json({ success: true, message: 'Contact submission deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
