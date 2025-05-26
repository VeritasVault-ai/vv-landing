import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser, UserRole } from '../models/User';
import { asyncHandler } from '../middleware/errorHandler';
import { createAuditLog, AuditAction } from '../models/AuditLog';

// Generate JWT token
const generateToken = (user: IUser): string => {
  const jwtSecret = process.env.JWT_SECRET || 'default_jwt_secret';
  const expiresIn = process.env.JWT_EXPIRES_IN || '1h';
  
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    jwtSecret,
    { expiresIn }
  );
};

// Generate refresh token
const generateRefreshToken = (user: IUser): string => {
  const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET || 'default_jwt_refresh_secret';
  const expiresIn = process.env.JWT_REFRESH_EXPIRES_IN || '7d';
  
  return jwt.sign(
    { id: user._id },
    jwtRefreshSecret,
    { expiresIn }
  );
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const register = asyncHandler(async (req: Request, res: Response) => {
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
    await createAuditLog(
      user._id.toString(),
      AuditAction.CREATE,
      'User',
      user._id.toString(),
      { email: user.email, role: user.role }
    );

    res.status(201).json({
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      token: generateToken(user),
      refreshToken: generateRefreshToken(user),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email });

  if (!user) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  // Check if user is active
  if (!user.isActive) {
    res.status(401);
    throw new Error('User account is deactivated');
  }

  // Check if password matches
  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  // Update last login
  user.lastLogin = new Date();
  await user.save();

  // Create audit log
  await createAuditLog(
    user._id.toString(),
    AuditAction.LOGIN,
    'User',
    user._id.toString(),
    { email: user.email },
    req
  );

  res.json({
    _id: user._id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    token: generateToken(user),
    refreshToken: generateRefreshToken(user),
  });
});

// @desc    Refresh access token
// @route   POST /api/auth/refresh
// @access  Public (with refresh token)
export const refreshToken = asyncHandler(async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(401);
    throw new Error('Refresh token is required');
  }

  try {
    const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET || 'default_jwt_refresh_secret';
    const decoded = jwt.verify(refreshToken, jwtRefreshSecret) as { id: string };
    
    const user = await User.findById(decoded.id);

    if (!user || !user.isActive) {
      res.status(401);
      throw new Error('Invalid refresh token or user not found');
    }

    res.json({
      token: generateToken(user),
      refreshToken: generateRefreshToken(user),
    });
  } catch (error) {
    res.status(401);
    throw new Error('Invalid refresh token');
  }
});

// @desc    Get current user profile
// @route   GET /api/auth/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const user = await User.findById(req.user.id).select('-password');

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.json(user);
});

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateUserProfile = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Update fields
  user.firstName = req.body.firstName || user.firstName;
  user.lastName = req.body.lastName || user.lastName;
  user.phone = req.body.phone || user.phone;
  
  // Only update password if provided
  if (req.body.password) {
    user.password = req.body.password;
  }

  const updatedUser = await user.save();

  // Create audit log
  await createAuditLog(
    user._id.toString(),
    AuditAction.UPDATE,
    'User',
    user._id.toString(),
    { updatedFields: Object.keys(req.body) },
    req
  );

  res.json({
    _id: updatedUser._id,
    email: updatedUser.email,
    firstName: updatedUser.firstName,
    lastName: updatedUser.lastName,
    role: updatedUser.role,
    phone: updatedUser.phone,
    token: generateToken(updatedUser),
  });
});

