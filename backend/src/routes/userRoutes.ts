import express from 'express';
import { body } from 'express-validator';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/userController';
import { authenticate, isAdmin } from '../middleware/auth';
import { validate } from '../middleware/validation';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// @route   GET /api/users
router.get('/', isAdmin, getUsers);

// @route   GET /api/users/:id
router.get('/:id', isAdmin, getUserById);

// @route   POST /api/users
router.post(
  '/',
  isAdmin,
  validate([
    body('email').isEmail().withMessage('Please include a valid email'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long'),
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('role').isIn(['host', 'employee', 'admin']).withMessage('Invalid role'),
  ]),
  createUser
);

// @route   PUT /api/users/:id
router.put(
  '/:id',
  isAdmin,
  validate([
    body('email').optional().isEmail().withMessage('Please include a valid email'),
    body('password')
      .optional()
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long'),
    body('firstName').optional().notEmpty().withMessage('First name cannot be empty'),
    body('lastName').optional().notEmpty().withMessage('Last name cannot be empty'),
    body('role').optional().isIn(['host', 'employee', 'admin']).withMessage('Invalid role'),
    body('isActive').optional().isBoolean().withMessage('isActive must be a boolean'),
  ]),
  updateUser
);

// @route   DELETE /api/users/:id
router.delete('/:id', isAdmin, deleteUser);

export default router;

