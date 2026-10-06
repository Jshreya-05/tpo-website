import express from 'express';
import { authUser, getCurrentUser, registerUser } from '../controllers/authController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/login', authUser);
router.get('/me', protect, getCurrentUser);
// Only existing admins can register new users
router.post('/register', protect, authorize('admin'), registerUser); 

export default router;
