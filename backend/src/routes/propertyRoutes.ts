import express from 'express';
import { body } from 'express-validator';
import {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  getPropertyStats,
} from '../controllers/propertyController';
import { authenticate, isHost } from '../middleware/auth';
import { validate } from '../middleware/validation';
import { auditMiddleware } from '../middleware/auditLogger';
import { AuditAction } from '../models/AuditLog';

// Import nested routes
import roomRoutes from './roomRoutes';
import inventoryRoutes from './inventoryRoutes';
import maintenanceRoutes from './maintenanceRoutes';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Nested routes
router.use('/:propertyId/rooms', roomRoutes);
router.use('/:propertyId/inventory', inventoryRoutes);
router.use('/:propertyId/maintenance', maintenanceRoutes);

// @route   GET /api/properties
router.get('/', getProperties);

// @route   GET /api/properties/:id
router.get('/:id', getPropertyById);

// @route   GET /api/properties/:id/stats
router.get('/:id/stats', getPropertyStats);

// @route   POST /api/properties
router.post(
  '/',
  isHost,
  validate([
    body('name').notEmpty().withMessage('Property name is required'),
    body('address.street').notEmpty().withMessage('Street address is required'),
    body('address.city').notEmpty().withMessage('City is required'),
    body('address.state').notEmpty().withMessage('State is required'),
    body('address.zipCode').notEmpty().withMessage('Zip code is required'),
    body('address.country').notEmpty().withMessage('Country is required'),
  ]),
  auditMiddleware('Property', AuditAction.CREATE),
  createProperty
);

// @route   PUT /api/properties/:id
router.put(
  '/:id',
  isHost,
  validate([
    body('name').optional().notEmpty().withMessage('Property name cannot be empty'),
    body('address.street').optional().notEmpty().withMessage('Street address cannot be empty'),
    body('address.city').optional().notEmpty().withMessage('City cannot be empty'),
    body('address.state').optional().notEmpty().withMessage('State cannot be empty'),
    body('address.zipCode').optional().notEmpty().withMessage('Zip code cannot be empty'),
    body('address.country').optional().notEmpty().withMessage('Country cannot be empty'),
    body('isActive').optional().isBoolean().withMessage('isActive must be a boolean'),
  ]),
  auditMiddleware('Property', AuditAction.UPDATE),
  updateProperty
);

// @route   DELETE /api/properties/:id
router.delete(
  '/:id', 
  isHost, 
  auditMiddleware('Property', AuditAction.DELETE),
  deleteProperty
);

export default router;

