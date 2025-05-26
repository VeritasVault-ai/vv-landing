import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRole } from '../models/User';
import { logger } from '../config/logger';

// Extend Express Request interface to include user property
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: UserRole;
      };
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'No token provided, authorization denied' });
      return;
    }
    
    // Verify token
    const token = authHeader.split(' ')[1];
    const jwtSecret = process.env.JWT_SECRET || 'default_jwt_secret';
    
    try {
      const decoded = jwt.verify(token, jwtSecret) as {
        id: string;
        email: string;
        role: UserRole;
      };
      
      req.user = decoded;
      next();
    } catch (error) {
      logger.error('Token verification failed:', error);
      res.status(401).json({ message: 'Token is not valid' });
    }
  } catch (error) {
    logger.error('Authentication error:', error);
    res.status(500).json({ message: 'Server error during authentication' });
  }
};

export const authorize = (roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ message: 'User not authenticated' });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({ message: 'User not authorized to access this resource' });
      return;
    }

    next();
  };
};

export const isHost = (req: Request, res: Response, next: NextFunction): void => {
  authorize([UserRole.HOST, UserRole.ADMIN])(req, res, next);
};

export const isEmployee = (req: Request, res: Response, next: NextFunction): void => {
  authorize([UserRole.EMPLOYEE, UserRole.HOST, UserRole.ADMIN])(req, res, next);
};

export const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
  authorize([UserRole.ADMIN])(req, res, next);
};

