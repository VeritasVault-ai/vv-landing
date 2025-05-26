import express from 'express';
import { body } from 'express-validator';
import {
  getRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
} from '../controllers/roomController';
import { authenticate, isHost } from '../middleware/auth';
import { validate } from '../middleware/validation';
import { auditMiddleware } from '../middleware/auditLogger';
import { AuditAction } from '../models/AuditLog';

// Import nested routes
import inventoryRoutes from './inventoryRoutes';

const router = express.Router({ mergeParams: true });

// All routes require authentication
router.use(authenticate);

// Nested routes
router.use('/:roomId/inventory', inventoryRoutes);

// @route   GET /api/properties/:propertyId/rooms
router.get('/', getRooms);

// @route   POST /api/properties/:propertyId/rooms
router.post(
  '/',
  isHost,
  validate([
    body('name').notEmpty().withMessage('Room name is required'),
  ]),
  auditMiddleware('Room', AuditAction.CREATE),
  createRoom
);

// Routes without propertyId parameter
router.use('/:id', (req, res, next) => {
  // Remove propertyId from params if it exists
  if (req.params.propertyId) {
    delete req.params.propertyId;
  }
  next();
});

// @route   GET /api/rooms/:id
router.get('/:id', getRoomById);

// @route   PUT /api/rooms/:id
router.put(
  '/:id',
  isHost,
  validate([
    body('name').optional().notEmpty().withMessage('Room name cannot be empty'),
    body('isActive').optional().isBoolean().withMessage('isActive must be a boolean'),
  ]),
  auditMiddleware('Room', AuditAction.UPDATE),
  updateRoom
);

// @route   DELETE /api/rooms/:id
router.delete(
  '/:id', 
  isHost, 
  auditMiddleware('Room', AuditAction.DELETE),
  deleteRoom
);

export default router;

