import { Request, Response } from 'express';
import Room, { IRoom } from '../models/Room';
import Property from '../models/Property';
import InventoryItem from '../models/InventoryItem';
import { asyncHandler } from '../middleware/errorHandler';
import { createAuditLog, AuditAction } from '../models/AuditLog';
import { UserRole } from '../models/User';

// @desc    Get all rooms for a property
// @route   GET /api/properties/:propertyId/rooms
// @access  Private
export const getRooms = asyncHandler(async (req: Request, res: Response) => {
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

  const rooms = await Room.find({ property: propertyId })
    .skip(skip)
    .limit(limit)
    .sort({ name: 1 });

  const total = await Room.countDocuments({ property: propertyId });

  res.json({
    rooms,
    page,
    pages: Math.ceil(total / limit),
    total,
  });
});

// @desc    Get room by ID
// @route   GET /api/rooms/:id
// @access  Private
export const getRoomById = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const room = await Room.findById(req.params.id);

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

  res.json(room);
});

// @desc    Create a new room
// @route   POST /api/properties/:propertyId/rooms
// @access  Private/Host
export const createRoom = asyncHandler(async (req: Request, res: Response) => {
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
    throw new Error('Not authorized to add rooms to this property');
  }

  const { name, description, images } = req.body;

  const room = await Room.create({
    name,
    description,
    images,
    property: propertyId,
  });

  // Create audit log
  await createAuditLog(
    req.user.id,
    AuditAction.CREATE,
    'Room',
    room._id.toString(),
    { name: room.name, property: propertyId },
    req
  );

  res.status(201).json(room);
});

// @desc    Update room
// @route   PUT /api/rooms/:id
// @access  Private/Host
export const updateRoom = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const room = await Room.findById(req.params.id);

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
    throw new Error('Not authorized to update this room');
  }

  // Update fields
  room.name = req.body.name || room.name;
  room.description = req.body.description || room.description;
  
  if (req.body.images) {
    room.images = req.body.images;
  }
  
  room.isActive = req.body.isActive !== undefined ? req.body.isActive : room.isActive;

  const updatedRoom = await room.save();

  // Create audit log
  await createAuditLog(
    req.user.id,
    AuditAction.UPDATE,
    'Room',
    room._id.toString(),
    { updatedFields: Object.keys(req.body) },
    req
  );

  res.json(updatedRoom);
});

// @desc    Delete room
// @route   DELETE /api/rooms/:id
// @access  Private/Host
export const deleteRoom = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const room = await Room.findById(req.params.id);

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
    throw new Error('Not authorized to delete this room');
  }

  // Check if room has inventory items
  const inventoryCount = await InventoryItem.countDocuments({ room: room._id });
  
  if (inventoryCount > 0) {
    // Instead of deleting, deactivate the room
    room.isActive = false;
    await room.save();
    
    // Create audit log
    await createAuditLog(
      req.user.id,
      AuditAction.UPDATE,
      'Room',
      room._id.toString(),
      { isActive: false },
      req
    );
    
    res.json({ message: 'Room deactivated because it has inventory items' });
  } else {
    // If no inventory items, we can safely delete
    await room.deleteOne();
    
    // Create audit log
    await createAuditLog(
      req.user.id,
      AuditAction.DELETE,
      'Room',
      room._id.toString(),
      { name: room.name },
      req
    );
    
    res.json({ message: 'Room removed' });
  }
});

