import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

// @desc    Get authenticated user
// @route   GET /api/auth/me
// @access  Private
export const getCurrentUser = (req, res) => {
  res.json({
    success: true,
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role
  });
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const authUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        success: true,
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Register a new admin/editor (Setup use only)
// @route   POST /api/auth/register
// @access  Private (Admin)
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const assignedRole = role === undefined ? 'editor' : role;

    if (!['admin', 'editor'].includes(assignedRole)) {
      return res.status(400).json({ success: false, message: 'Role must be admin or editor' });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    const user = await User.create({
      name,
      email,
      password,
      role: assignedRole
    });

    if (user) {
      res.status(201).json({
        success: true,
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (error) {
    next(error);
  }
};
