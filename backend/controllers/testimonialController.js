import Testimonial from '../models/Testimonial.js';

const defaultTestimonials = [
  { 
    name: 'Priya Deshmukh', 
    role: 'Software Engineer', 
    company: 'TCS Digital', 
    batch: 'B.E. CSE 2024', 
    text: "The aptitude training and mock interview sessions at KBP TPO gave me the confidence I needed. Got placed at TCS Digital with a 7.2 LPA package — couldn't have done it without this support.", 
    initials: 'PD', 
    pkg: '7.2 LPA' 
  },
  { 
    name: 'Rohit Jadhav', 
    role: 'Associate Engineer', 
    company: 'Persistent Systems', 
    batch: 'B.E. ENTC 2024', 
    text: 'The Full Stack workshop was transformative. I built a complete MERN app and showed it during my Persistent interview. The TPO team prepped us for every stage of the process.', 
    initials: 'RJ', 
    pkg: '6.5 LPA' 
  },
  { 
    name: 'Sneha Kulkarni', 
    role: 'Data Analyst', 
    company: 'LTIMindtree', 
    batch: 'B.E. IT 2024', 
    text: 'The Data Science bootcamp helped me pivot into analytics. The trainers were experienced, the curriculum matched industry needs, and the placement support was outstanding.', 
    initials: 'SK', 
    pkg: '8.0 LPA' 
  }
];

// @desc    Get all testimonials (seeds default if database collection is empty)
// @route   GET /api/testimonials
// @access  Public
export const getTestimonials = async (req, res) => {
  try {
    let testimonials = await Testimonial.find().sort({ createdAt: -1 }).lean();
    
    if (testimonials.length === 0) {
      // Auto seed default records
      console.log('Seeding default testimonials into database...');
      await Testimonial.create(defaultTestimonials);
      testimonials = await Testimonial.find().sort({ createdAt: -1 }).lean();
    }

    res.status(200).json({
      success: true,
      count: testimonials.length,
      data: testimonials.map(t => ({
        ...t,
        id: t._id.toString()
      }))
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single testimonial details
// @route   GET /api/testimonials/:id
// @access  Public
export const getTestimonialById = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }
    res.status(200).json({ success: true, data: testimonial });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Create a testimonial
// @route   POST /api/testimonials/admin
// @access  Protected (Admin/Editor)
export const createTestimonial = async (req, res) => {
  try {
    const { name, role, company, batch, text, initials, pkg } = req.body;
    if (!name || !role || !company || !batch || !text || !initials || !pkg) {
      return res.status(400).json({ success: false, message: 'All testimonial fields are required.' });
    }

    const testimonial = await Testimonial.create({
      name,
      role,
      company,
      batch,
      text,
      initials,
      pkg
    });

    res.status(201).json({ success: true, data: testimonial });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update a testimonial
// @route   PUT /api/testimonials/admin/:id
// @access  Protected (Admin/Editor)
export const updateTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }
    res.status(200).json({ success: true, data: testimonial });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete a testimonial
// @route   DELETE /api/testimonials/admin/:id
// @access  Protected (Admin)
export const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }
    res.status(200).json({ success: true, message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
