import express from 'express';
import { body } from 'express-validator';
import {
  getInventoryItems,
  getRoomInventory,
  getInventoryItemById,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
  bulkCreateInventoryItems,
  bulkUpdateInventoryStatus,
} from '../controllers/inventoryController';
import { authenticate, isEmployee } from '../middleware/auth';
import { validate } from '../middleware/validation';
import { auditMiddleware } from '../middleware/auditLogger';
import { AuditAction } from '../models/AuditLog';
import { ItemStatus } from '../models/InventoryItem';

const router = express.Router({ mergeParams: true });

// All routes require authentication
router.use(authenticate);

// Routes with propertyId parameter
if (router.params && router.params.propertyId) {
  // @route   GET /api/properties/:propertyId/inventory
  router.get('/', getInventoryItems);
}

// Routes with roomId parameter
if (router.params && router.params.roomId) {
  // @route   GET /api/rooms/:roomId/inventory
  router.get('/', getRoomInventory);

  // @route   POST /api/rooms/:roomId/inventory
  router.post(
    '/',
    isEmployee,
    validate([
      body('name').notEmpty().withMessage('Item name is required'),
      body('quantity').optional().isInt({ min: 0 }).withMessage('Quantity must be a positive integer'),
      body('status')
        .optional()
        .isIn(Object.values(ItemStatus))
        .withMessage('Invalid status'),
    ]),
    auditMiddleware('InventoryItem', AuditAction.CREATE),
    createInventoryItem
  );

  // @route   POST /api/rooms/:roomId/inventory/bulk
  router.post(
    '/bulk',
    isEmployee,
    validate([
      body('items').isArray().withMessage('Items must be an array'),
      body('items.*.name').notEmpty().withMessage('Item name is required'),
      body('items.*.quantity')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Quantity must be a positive integer'),
      body('items.*.status')
        .optional()
        .isIn(Object.values(ItemStatus))
        .withMessage('Invalid status'),
    ]),
    bulkCreateInventoryItems
  );

  // @route   PUT /api/rooms/:roomId/inventory/bulk-status
  router.put(
    '/bulk-status',
    isEmployee,
    validate([
      body('itemIds').isArray().withMessage('Item IDs must be an array'),
      body('status')
        .isIn(Object.values(ItemStatus))
        .withMessage('Invalid status'),
    ]),
    bulkUpdateInventoryStatus
  );
}

// Routes without propertyId or roomId parameter
router.use('/:id', (req, res, next) => {
  // Remove propertyId and roomId from params if they exist
  if (req.params.propertyId) {
    delete req.params.propertyId;
  }
  if (req.params.roomId) {
    delete req.params.roomId;
  }
  next();
});

// @route   GET /api/inventory/:id
router.get('/:id', getInventoryItemById);

// @route   PUT /api/inventory/:id
router.put(
  '/:id',
  isEmployee,
  validate([
    body('name').optional().notEmpty().withMessage('Item name cannot be empty'),
    body('quantity')
      .optional()
      .isInt({ min: 0 })
      .withMessage('Quantity must be a positive integer'),
    body('status')
      .optional()
      .isIn(Object.values(ItemStatus))
      .withMessage('Invalid status'),
  ]),
  auditMiddleware('InventoryItem', AuditAction.UPDATE),
  updateInventoryItem
);

// @route   DELETE /api/inventory/:id
router.delete(
  '/:id', 
  isEmployee, 
  auditMiddleware('InventoryItem', AuditAction.DELETE),
  deleteInventoryItem
);

export default router;

