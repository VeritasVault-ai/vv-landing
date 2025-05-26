import express from 'express';
import { body } from 'express-validator';
import { 
  register, 
  login, 
  refreshToken, 
  getUserProfile, 
  updateUserProfile 
} from '../controllers/authController';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validation';

const router = express.Router();

// @route   POST /api/auth/register
router.post(
  '/register',
  validate([
    body('email').isEmail().withMessage('Please include a valid email'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long'),
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
  ]),
  register
);

// @route   POST /api/auth/login
router.post(
  '/login',
  validate([
    body('email').isEmail().withMessage('Please include a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
  ]),
  login
);

// @route   POST /api/auth/refresh
router.post(
  '/refresh',
  validate([
    body('refreshToken').notEmpty().withMessage('Refresh token is required'),
  ]),
  refreshToken
);

// @route   GET /api/auth/profile
router.get('/profile', authenticate, getUserProfile);

// @route   PUT /api/auth/profile
router.put(
  '/profile',
  authenticate,
  validate([
    body('firstName').optional().notEmpty().withMessage('First name cannot be empty'),
    body('lastName').optional().notEmpty().withMessage('Last name cannot be empty'),
    body('password')
      .optional()
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long'),
  ]),
  updateUserProfile
);

export default router;

