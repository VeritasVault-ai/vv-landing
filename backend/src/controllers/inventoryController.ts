import { Request, Response } from 'express';
import InventoryItem, { IInventoryItem, ItemStatus } from '../models/InventoryItem';
import Room from '../models/Room';
import Property from '../models/Property';
import { asyncHandler } from '../middleware/errorHandler';
import { createAuditLog, AuditAction } from '../models/AuditLog';
import { UserRole } from '../models/User';

// @desc    Get all inventory items for a property
// @route   GET /api/properties/:propertyId/inventory
// @access  Private
export const getInventoryItems = asyncHandler(async (req: Request, res: Response) => {
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
  const limit = parseInt(req.query.limit as string) || 20;
  const skip = (page - 1) * limit;
  
  // Filter options
  const roomId = req.query.roomId as string;
  const status = req.query.status as ItemStatus;
  const category = req.query.category as string;
  const search = req.query.search as string;
  
  // Build query
  let query: any = { property: propertyId };
  
  if (roomId) {
    query.room = roomId;
  }
  
  if (status) {
    query.status = status;
  }
  
  if (category) {
    query.category = category;
  }
  
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  const items = await InventoryItem.find(query)
    .populate('room', 'name')
    .skip(skip)
    .limit(limit)
    .sort({ name: 1 });

  const total = await InventoryItem.countDocuments(query);

  res.json({
    items,
    page,
    pages: Math.ceil(total / limit),
    total,
  });
});

// @desc    Get inventory items for a room
// @route   GET /api/rooms/:roomId/inventory
// @access  Private
export const getRoomInventory = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const roomId = req.params.roomId;
  
  // Check if room exists
  const room = await Room.findById(roomId);
  
  if (!room) {
    res.status(404);
    throw new Error('Room not found');
  }
  
  // Check if user has access to this room's property
  const property = await Property.findById(room.property);
  
  if (!property) {
    res.status(404);
    throw new Error('Property not found');
  }
  
  if (
    req.user.role !== UserRole.ADMIN &&
    property.owner.toString() !== req.user.id
  ) {
    res.status(403);
    throw new Error('Not authorized to access this room');
  }

  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;
  const skip = (page - 1) * limit;
  
  // Filter options
  const status = req.query.status as ItemStatus;
  const category = req.query.category as string;
  const search = req.query.search as string;
  
  // Build query
  let query: any = { room: roomId };
  
  if (status) {
    query.status = status;
  }
  
  if (category) {
    query.category = category;
  }
  
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  const items = await InventoryItem.find(query)
    .skip(skip)
    .limit(limit)
    .sort({ name: 1 });

  const total = await InventoryItem.countDocuments(query);

  res.json({
    items,
    page,
    pages: Math.ceil(total / limit),
    total,
  });
});

// @desc    Get inventory item by ID
// @route   GET /api/inventory/:id
// @access  Private
export const getInventoryItemById = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const item = await InventoryItem.findById(req.params.id)
    .populate('room', 'name')
    .populate('lastCheckedBy', 'firstName lastName');

  if (!item) {
    res.status(404);
    throw new Error('Inventory item not found');
  }

  // Check if user has access to this item's property
  const property = await Property.findById(item.property);
  
  if (!property) {
    res.status(404);
    throw new Error('Property not found');
  }
  
  if (
    req.user.role !== UserRole.ADMIN &&
    property.owner.toString() !== req.user.id
  ) {
    res.status(403);
    throw new Error('Not authorized to access this inventory item');
  }

  res.json(item);
});

// @desc    Create a new inventory item
// @route   POST /api/rooms/:roomId/inventory
// @access  Private
export const createInventoryItem = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const roomId = req.params.roomId;
  
  // Check if room exists
  const room = await Room.findById(roomId);
  
  if (!room) {
    res.status(404);
    throw new Error('Room not found');
  }
  
  // Check if user has access to this room's property
  const property = await Property.findById(room.property);
  
  if (!property) {
    res.status(404);
    throw new Error('Property not found');
  }
  
  if (
    req.user.role !== UserRole.ADMIN &&
    property.owner.toString() !== req.user.id
  ) {
    res.status(403);
    throw new Error('Not authorized to add inventory to this room');
  }

  const {
    name,
    description,
    category,
    quantity,
    status,
    images,
    notes,
  } = req.body;

  const item = await InventoryItem.create({
    name,
    description,
    room: roomId,
    property: property._id,
    category,
    quantity: quantity || 1,
    status: status || ItemStatus.OK,
    images,
    notes,
    lastCheckedBy: req.user.id,
    lastCheckedAt: new Date(),
  });

  // Create audit log
  await createAuditLog(
    req.user.id,
    AuditAction.CREATE,
    'InventoryItem',
    item._id.toString(),
    { name: item.name, room: roomId, property: property._id.toString() },
    req
  );

  res.status(201).json(item);
});

// @desc    Update inventory item
// @route   PUT /api/inventory/:id
// @access  Private
export const updateInventoryItem = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const item = await InventoryItem.findById(req.params.id);

  if (!item) {
    res.status(404);
    throw new Error('Inventory item not found');
  }

  // Check if user has access to this item's property
  const property = await Property.findById(item.property);
  
  if (!property) {
    res.status(404);
    throw new Error('Property not found');
  }
  
  if (
    req.user.role !== UserRole.ADMIN &&
    property.owner.toString() !== req.user.id
  ) {
    res.status(403);
    throw new Error('Not authorized to update this inventory item');
  }

  // Update fields
  item.name = req.body.name || item.name;
  item.description = req.body.description || item.description;
  item.category = req.body.category || item.category;
  item.quantity = req.body.quantity !== undefined ? req.body.quantity : item.quantity;
  
  // If status is being updated, record who checked it and when
  if (req.body.status && req.body.status !== item.status) {
    item.status = req.body.status;
    item.lastCheckedBy = req.user.id;
    item.lastCheckedAt = new Date();
  }
  
  if (req.body.images) {
    item.images = req.body.images;
  }
  
  item.notes = req.body.notes || item.notes;
  
  // If room is being changed, verify it belongs to the same property
  if (req.body.room && req.body.room !== item.room.toString()) {
    const newRoom = await Room.findById(req.body.room);
    
    if (!newRoom) {
      res.status(404);
      throw new Error('New room not found');
    }
    
    if (newRoom.property.toString() !== item.property.toString()) {
      res.status(400);
      throw new Error('Cannot move item to a room in a different property');
    }
    
    item.room = req.body.room;
  }

  const updatedItem = await item.save();

  // Create audit log
  await createAuditLog(
    req.user.id,
    AuditAction.UPDATE,
    'InventoryItem',
    item._id.toString(),
    { updatedFields: Object.keys(req.body) },
    req
  );

  res.json(updatedItem);
});

// @desc    Delete inventory item
// @route   DELETE /api/inventory/:id
// @access  Private
export const deleteInventoryItem = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const item = await InventoryItem.findById(req.params.id);

  if (!item) {
    res.status(404);
    throw new Error('Inventory item not found');
  }

  // Check if user has access to this item's property
  const property = await Property.findById(item.property);
  
  if (!property) {
    res.status(404);
    throw new Error('Property not found');
  }
  
  if (
    req.user.role !== UserRole.ADMIN &&
    property.owner.toString() !== req.user.id
  ) {
    res.status(403);
    throw new Error('Not authorized to delete this inventory item');
  }

  await item.deleteOne();

  // Create audit log
  await createAuditLog(
    req.user.id,
    AuditAction.DELETE,
    'InventoryItem',
    item._id.toString(),
    { name: item.name, room: item.room.toString() },
    req
  );

  res.json({ message: 'Inventory item removed' });
});

// @desc    Bulk create inventory items
// @route   POST /api/rooms/:roomId/inventory/bulk
// @access  Private
export const bulkCreateInventoryItems = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const roomId = req.params.roomId;
  const { items } = req.body;
  
  if (!items || !Array.isArray(items) || items.length === 0) {
    res.status(400);
    throw new Error('No items provided for bulk creation');
  }
  
  // Check if room exists
  const room = await Room.findById(roomId);
  
  if (!room) {
    res.status(404);
    throw new Error('Room not found');
  }
  
  // Check if user has access to this room's property
  const property = await Property.findById(room.property);
  
  if (!property) {
    res.status(404);
    throw new Error('Property not found');
  }
  
  if (
    req.user.role !== UserRole.ADMIN &&
    property.owner.toString() !== req.user.id
  ) {
    res.status(403);
    throw new Error('Not authorized to add inventory to this room');
  }

  // Prepare items for bulk insert
  const itemsToInsert = items.map((item: any) => ({
    name: item.name,
    description: item.description,
    room: roomId,
    property: property._id,
    category: item.category,
    quantity: item.quantity || 1,
    status: item.status || ItemStatus.OK,
    images: item.images || [],
    notes: item.notes,
    lastCheckedBy: req.user?.id,
    lastCheckedAt: new Date(),
  }));

  // Insert all items
  const createdItems = await InventoryItem.insertMany(itemsToInsert);

  // Create audit logs
  for (const item of createdItems) {
    await createAuditLog(
      req.user.id,
      AuditAction.CREATE,
      'InventoryItem',
      item._id.toString(),
      { name: item.name, room: roomId, property: property._id.toString(), bulkOperation: true },
      req
    );
  }

  res.status(201).json({
    message: `${createdItems.length} inventory items created successfully`,
    items: createdItems,
  });
});

// @desc    Bulk update inventory items status
// @route   PUT /api/rooms/:roomId/inventory/bulk-status
// @access  Private
export const bulkUpdateInventoryStatus = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const roomId = req.params.roomId;
  const { itemIds, status } = req.body;
  
  if (!itemIds || !Array.isArray(itemIds) || itemIds.length === 0) {
    res.status(400);
    throw new Error('No item IDs provided for bulk update');
  }
  
  if (!status || !Object.values(ItemStatus).includes(status)) {
    res.status(400);
    throw new Error('Invalid status provided');
  }
  
  // Check if room exists
  const room = await Room.findById(roomId);
  
  if (!room) {
    res.status(404);
    throw new Error('Room not found');
  }
  
  // Check if user has access to this room's property
  const property = await Property.findById(room.property);
  
  if (!property) {
    res.status(404);
    throw new Error('Property not found');
  }
  
  if (
    req.user.role !== UserRole.ADMIN &&
    property.owner.toString() !== req.user.id
  ) {
    res.status(403);
    throw new Error('Not authorized to update inventory in this room');
  }

  // Update all items
  const updateResult = await InventoryItem.updateMany(
    { _id: { $in: itemIds }, room: roomId },
    { 
      $set: { 
        status,
        lastCheckedBy: req.user.id,
        lastCheckedAt: new Date()
      } 
    }
  );

  // Create audit log
  await createAuditLog(
    req.user.id,
    AuditAction.UPDATE,
    'InventoryItem',
    null,
    { 
      bulkOperation: true, 
      status, 
      itemCount: updateResult.modifiedCount,
      room: roomId
    },
    req
  );

  res.json({
    message: `${updateResult.modifiedCount} inventory items updated successfully`,
    modifiedCount: updateResult.modifiedCount,
  });
});

