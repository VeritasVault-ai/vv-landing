import express from 'express';
import { body } from 'express-validator';
import {
  getMaintenanceTasks,
  getMaintenanceTaskById,
  createMaintenanceTask,
  updateMaintenanceTask,
  deleteMaintenanceTask,
} from '../controllers/maintenanceController';
import { authenticate, isHost } from '../middleware/auth';
import { validate } from '../middleware/validation';
import { auditMiddleware } from '../middleware/auditLogger';
import { AuditAction } from '../models/AuditLog';
import { TaskStatus, TaskPriority } from '../models/MaintenanceTask';

const router = express.Router({ mergeParams: true });

// All routes require authentication
router.use(authenticate);

// Routes with propertyId parameter
if (router.params && router.params.propertyId) {
  // @route   GET /api/properties/:propertyId/maintenance
  router.get('/', getMaintenanceTasks);

  // @route   POST /api/properties/:propertyId/maintenance
  router.post(
    '/',
    validate([
      body('title').notEmpty().withMessage('Task title is required'),
      body('description').notEmpty().withMessage('Task description is required'),
      body('priority')
        .optional()
        .isIn(Object.values(TaskPriority))
        .withMessage('Invalid priority'),
      body('dueDate').optional().isISO8601().withMessage('Invalid date format'),
    ]),
    auditMiddleware('MaintenanceTask', AuditAction.CREATE),
    createMaintenanceTask
  );
}

// Routes without propertyId parameter
router.use('/:id', (req, res, next) => {
  // Remove propertyId from params if it exists
  if (req.params.propertyId) {
    delete req.params.propertyId;
  }
  next();
});

// @route   GET /api/maintenance/:id
router.get('/:id', getMaintenanceTaskById);

// @route   PUT /api/maintenance/:id
router.put(
  '/:id',
  validate([
    body('title').optional().notEmpty().withMessage('Task title cannot be empty'),
    body('description').optional().notEmpty().withMessage('Task description cannot be empty'),
    body('status')
      .optional()
      .isIn(Object.values(TaskStatus))
      .withMessage('Invalid status'),
    body('priority')
      .optional()
      .isIn(Object.values(TaskPriority))
      .withMessage('Invalid priority'),
    body('dueDate').optional().isISO8601().withMessage('Invalid date format'),
  ]),
  auditMiddleware('MaintenanceTask', AuditAction.UPDATE),
  updateMaintenanceTask
);

// @route   DELETE /api/maintenance/:id
router.delete(
  '/:id', 
  isHost, 
  auditMiddleware('MaintenanceTask', AuditAction.DELETE),
  deleteMaintenanceTask
);

export default router;

