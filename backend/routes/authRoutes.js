import express from 'express';
import { authUser, registerUser } from '../controllers/authController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/login', authUser);
// Only existing admins can register new users
router.post('/register', protect, authorize('admin'), registerUser); 

export default router;
