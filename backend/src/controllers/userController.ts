import { Request, Response } from 'express';
import User, { IUser, UserRole } from '../models/User';
import { asyncHandler } from '../middleware/errorHandler';
import { createAuditLog, AuditAction } from '../models/AuditLog';

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const users = await User.find()
    .select('-password')
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await User.countDocuments();

  res.json({
    users,
    page,
    pages: Math.ceil(total / limit),
    total,
  });
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id).select('-password');

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.json(user);
});

// @desc    Create a new user
// @route   POST /api/users
// @access  Private/Admin
export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, firstName, lastName, role, phone } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Create new user
  const user = await User.create({
    email,
    password,
    firstName,
    lastName,
    role: role || UserRole.EMPLOYEE,
    phone,
  });

  if (user) {
    // Create audit log
    if (req.user) {
      await createAuditLog(
        req.user.id,
        AuditAction.CREATE,
        'User',
        user._id.toString(),
        { email: user.email, role: user.role },
        req
      );
    }

    res.status(201).json({
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      phone: user.phone,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Update fields
  user.email = req.body.email || user.email;
  user.firstName = req.body.firstName || user.firstName;
  user.lastName = req.body.lastName || user.lastName;
  user.role = req.body.role || user.role;
  user.phone = req.body.phone || user.phone;
  user.isActive = req.body.isActive !== undefined ? req.body.isActive : user.isActive;
  
  // Only update password if provided
  if (req.body.password) {
    user.password = req.body.password;
  }

  const updatedUser = await user.save();

  // Create audit log
  if (req.user) {
    await createAuditLog(
      req.user.id,
      AuditAction.UPDATE,
      'User',
      user._id.toString(),
      { updatedFields: Object.keys(req.body) },
      req
    );
  }

  res.json({
    _id: updatedUser._id,
    email: updatedUser.email,
    firstName: updatedUser.firstName,
    lastName: updatedUser.lastName,
    role: updatedUser.role,
    phone: updatedUser.phone,
    isActive: updatedUser.isActive,
  });
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Instead of deleting, deactivate the user
  user.isActive = false;
  await user.save();

  // Create audit log
  if (req.user) {
    await createAuditLog(
      req.user.id,
      AuditAction.DELETE,
      'User',
      user._id.toString(),
      { email: user.email },
      req
    );
  }

  res.json({ message: 'User deactivated' });
});

