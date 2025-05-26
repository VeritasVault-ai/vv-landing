import { Request, Response } from 'express';
import Property, { IProperty } from '../models/Property';
import Room from '../models/Room';
import InventoryItem from '../models/InventoryItem';
import { asyncHandler } from '../middleware/errorHandler';
import { createAuditLog, AuditAction } from '../models/AuditLog';
import { UserRole } from '../models/User';

// @desc    Get all properties
// @route   GET /api/properties
// @access  Private
export const getProperties = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  let query = {};

  // If not admin, only show properties owned by the user
  if (req.user.role !== UserRole.ADMIN) {
    query = { owner: req.user.id };
  }

  const properties = await Property.find(query)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await Property.countDocuments(query);

  res.json({
    properties,
    page,
    pages: Math.ceil(total / limit),
    total,
  });
});

// @desc    Get property by ID
// @route   GET /api/properties/:id
// @access  Private
export const getPropertyById = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const property = await Property.findById(req.params.id);

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

  res.json(property);
});

// @desc    Create a new property
// @route   POST /api/properties
// @access  Private/Host
export const createProperty = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const { name, address, description, images } = req.body;

  const property = await Property.create({
    name,
    address,
    description,
    images,
    owner: req.user.id,
  });

  // Create audit log
  await createAuditLog(
    req.user.id,
    AuditAction.CREATE,
    'Property',
    property._id.toString(),
    { name: property.name },
    req
  );

  res.status(201).json(property);
});

// @desc    Update property
// @route   PUT /api/properties/:id
// @access  Private/Host
export const updateProperty = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const property = await Property.findById(req.params.id);

  if (!property) {
    res.status(404);
    throw new Error('Property not found');
  }

  // Check if user has access to update this property
  if (
    req.user.role !== UserRole.ADMIN &&
    property.owner.toString() !== req.user.id
  ) {
    res.status(403);
    throw new Error('Not authorized to update this property');
  }

  // Update fields
  property.name = req.body.name || property.name;
  
  if (req.body.address) {
    property.address = {
      ...property.address,
      ...req.body.address,
    };
  }
  
  property.description = req.body.description || property.description;
  
  if (req.body.images) {
    property.images = req.body.images;
  }
  
  property.isActive = req.body.isActive !== undefined ? req.body.isActive : property.isActive;

  const updatedProperty = await property.save();

  // Create audit log
  await createAuditLog(
    req.user.id,
    AuditAction.UPDATE,
    'Property',
    property._id.toString(),
    { updatedFields: Object.keys(req.body) },
    req
  );

  res.json(updatedProperty);
});

// @desc    Delete property
// @route   DELETE /api/properties/:id
// @access  Private/Host
export const deleteProperty = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const property = await Property.findById(req.params.id);

  if (!property) {
    res.status(404);
    throw new Error('Property not found');
  }

  // Check if user has access to delete this property
  if (
    req.user.role !== UserRole.ADMIN &&
    property.owner.toString() !== req.user.id
  ) {
    res.status(403);
    throw new Error('Not authorized to delete this property');
  }

  // Instead of deleting, deactivate the property
  property.isActive = false;
  await property.save();

  // Create audit log
  await createAuditLog(
    req.user.id,
    AuditAction.DELETE,
    'Property',
    property._id.toString(),
    { name: property.name },
    req
  );

  res.json({ message: 'Property deactivated' });
});

// @desc    Get property statistics
// @route   GET /api/properties/:id/stats
// @access  Private
export const getPropertyStats = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const property = await Property.findById(req.params.id);

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

  // Get room count
  const roomCount = await Room.countDocuments({ property: property._id });

  // Get inventory item counts by status
  const inventoryStats = await InventoryItem.aggregate([
    { $match: { property: property._id } },
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);

  // Format inventory stats
  const inventoryStatusCounts = inventoryStats.reduce((acc: Record<string, number>, curr) => {
    acc[curr._id] = curr.count;
    return acc;
  }, {});

  // Get total inventory count
  const totalInventoryCount = await InventoryItem.countDocuments({ property: property._id });

  res.json({
    roomCount,
    inventoryStatusCounts,
    totalInventoryCount,
  });
});

