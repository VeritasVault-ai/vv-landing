import { Request, Response } from 'express';
import MaintenanceTask, { IMaintenanceTask, TaskStatus, TaskPriority } from '../models/MaintenanceTask';
import Property from '../models/Property';
import InventoryItem from '../models/InventoryItem';
import { asyncHandler } from '../middleware/errorHandler';
import { createAuditLog, AuditAction } from '../models/AuditLog';
import { UserRole } from '../models/User';

// @desc    Get all maintenance tasks for a property
// @route   GET /api/properties/:propertyId/maintenance
// @access  Private
export const getMaintenanceTasks = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const propertyId = req.params.propertyId;
  
  // Check if property exists and user has access
  const property = await Property.findById(propertyId);
  
  if (!property) {
    res.status(404);
    throw new Error('Property not found');
  }
  
  // Check if user has access to this property
  if (
    req.user.role !== UserRole.ADMIN &&
    property.owner.toString() !== req.user.id
  ) {
    res.status(403);
    throw new Error('Not authorized to access this property');
  }

  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;
  
  // Filter options
  const status = req.query.status as TaskStatus;
  const priority = req.query.priority as TaskPriority;
  const assignedTo = req.query.assignedTo as string;
  
  // Build query
  let query: any = { property: propertyId };
  
  if (status) {
    query.status = status;
  }
  
  if (priority) {
    query.priority = priority;
  }
  
  if (assignedTo) {
    query.assignedTo = assignedTo;
  }

  const tasks = await MaintenanceTask.find(query)
    .populate('assignedTo', 'firstName lastName')
    .populate('reportedBy', 'firstName lastName')
    .populate('inventoryItem', 'name status')
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await MaintenanceTask.countDocuments(query);

  res.json({
    tasks,
    page,
    pages: Math.ceil(total / limit),
    total,
  });
});

// @desc    Get maintenance task by ID
// @route   GET /api/maintenance/:id
// @access  Private
export const getMaintenanceTaskById = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const task = await MaintenanceTask.findById(req.params.id)
    .populate('assignedTo', 'firstName lastName')
    .populate('reportedBy', 'firstName lastName')
    .populate('inventoryItem', 'name status room');

  if (!task) {
    res.status(404);
    throw new Error('Maintenance task not found');
  }

  // Check if user has access to this task's property
  const property = await Property.findById(task.property);
  
  if (!property) {
    res.status(404);
    throw new Error('Property not found');
  }
  
  if (
    req.user.role !== UserRole.ADMIN &&
    property.owner.toString() !== req.user.id
  ) {
    res.status(403);
    throw new Error('Not authorized to access this maintenance task');
  }

  res.json(task);
});

// @desc    Create a new maintenance task
// @route   POST /api/properties/:propertyId/maintenance
// @access  Private
export const createMaintenanceTask = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const propertyId = req.params.propertyId;
  
  // Check if property exists and user has access
  const property = await Property.findById(propertyId);
  
  if (!property) {
    res.status(404);
    throw new Error('Property not found');
  }
  
  // Check if user has access to this property
  const isEmployee = req.user.role === UserRole.EMPLOYEE;
  const isOwnerOrAdmin = 
    req.user.role === UserRole.ADMIN || 
    property.owner.toString() === req.user.id;
  
  if (!isOwnerOrAdmin && !isEmployee) {
    res.status(403);
    throw new Error('Not authorized to create maintenance tasks for this property');
  }

  const {
    title,
    description,
    inventoryItemId,
    assignedTo,
    priority,
    dueDate,
    images,
    notes,
  } = req.body;

  // If inventory item is provided, verify it belongs to the property
  if (inventoryItemId) {
    const item = await InventoryItem.findById(inventoryItemId);
    
    if (!item) {
      res.status(404);
      throw new Error('Inventory item not found');
    }
    
    if (item.property.toString() !== propertyId) {
      res.status(400);
      throw new Error('Inventory item does not belong to this property');
    }
  }

  const task = await MaintenanceTask.create({
    title,
    description,
    property: propertyId,
    inventoryItem: inventoryItemId,
    assignedTo,
    reportedBy: req.user.id,
    status: TaskStatus.PENDING,
    priority: priority || TaskPriority.MEDIUM,
    dueDate,
    images,
    notes,
  });

  // Create audit log
  await createAuditLog(
    req.user.id,
    AuditAction.CREATE,
    'MaintenanceTask',
    task._id.toString(),
    { title: task.title, property: propertyId },
    req
  );

  res.status(201).json(task);
});

// @desc    Update maintenance task
// @route   PUT /api/maintenance/:id
// @access  Private
export const updateMaintenanceTask = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const task = await MaintenanceTask.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Maintenance task not found');
  }

  // Check if user has access to this task's property
  const property = await Property.findById(task.property);
  
  if (!property) {
    res.status(404);
    throw new Error('Property not found');
  }
  
  const isOwnerOrAdmin = 
    req.user.role === UserRole.ADMIN || 
    property.owner.toString() === req.user.id;
  
  const isAssignedEmployee = 
    req.user.role === UserRole.EMPLOYEE && 
    task.assignedTo && 
    task.assignedTo.toString() === req.user.id;
  
  const isReporter = task.reportedBy.toString() === req.user.id;
  
  if (!isOwnerOrAdmin && !isAssignedEmployee && !isReporter) {
    res.status(403);
    throw new Error('Not authorized to update this maintenance task');
  }

  // Update fields
  task.title = req.body.title || task.title;
  task.description = req.body.description || task.description;
  
  // Only owner/admin can change assignment
  if (isOwnerOrAdmin) {
    if (req.body.assignedTo !== undefined) {
      task.assignedTo = req.body.assignedTo || null;
    }
    
    if (req.body.priority) {
      task.priority = req.body.priority;
    }
    
    if (req.body.dueDate !== undefined) {
      task.dueDate = req.body.dueDate || null;
    }
  }
  
  // Anyone with access can update status
  if (req.body.status) {
    const oldStatus = task.status;
    task.status = req.body.status;
    
    // If status is being set to completed, record completion time
    if (req.body.status === TaskStatus.COMPLETED && oldStatus !== TaskStatus.COMPLETED) {
      task.completedAt = new Date();
    } else if (req.body.status !== TaskStatus.COMPLETED) {
      task.completedAt = undefined;
    }
  }
  
  if (req.body.images) {
    task.images = req.body.images;
  }
  
  task.notes = req.body.notes || task.notes;

  const updatedTask = await task.save();

  // Create audit log
  await createAuditLog(
    req.user.id,
    AuditAction.UPDATE,
    'MaintenanceTask',
    task._id.toString(),
    { updatedFields: Object.keys(req.body) },
    req
  );

  res.json(updatedTask);
});

// @desc    Delete maintenance task
// @route   DELETE /api/maintenance/:id
// @access  Private/Host
export const deleteMaintenanceTask = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const task = await MaintenanceTask.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Maintenance task not found');
  }

  // Check if user has access to this task's property
  const property = await Property.findById(task.property);
  
  if (!property) {
    res.status(404);
    throw new Error('Property not found');
  }
  
  if (
    req.user.role !== UserRole.ADMIN &&
    property.owner.toString() !== req.user.id
  ) {
    res.status(403);
    throw new Error('Not authorized to delete this maintenance task');
  }

  await task.deleteOne();

  // Create audit log
  await createAuditLog(
    req.user.id,
    AuditAction.DELETE,
    'MaintenanceTask',
    task._id.toString(),
    { title: task.title },
    req
  );

  res.json({ message: 'Maintenance task removed' });
});

