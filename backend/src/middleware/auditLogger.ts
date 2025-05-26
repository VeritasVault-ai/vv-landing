import { Request, Response, NextFunction } from 'express';
import AuditLog, { AuditAction } from '../models/AuditLog';
import { logger } from '../config/logger';

export const createAuditLog = async (
  userId: string,
  action: AuditAction,
  entityType: string,
  entityId?: string,
  details?: Record<string, any>,
  req?: Request
): Promise<void> => {
  try {
    const auditLog = new AuditLog({
      user: userId,
      action,
      entityType,
      entityId,
      details,
      ipAddress: req?.ip,
      userAgent: req?.headers['user-agent'],
    });

    await auditLog.save();
  } catch (error) {
    logger.error('Error creating audit log:', error);
  }
};

export const auditMiddleware = (entityType: string, action: AuditAction) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Store the original end method
    const originalEnd = res.end;
    
    // Override the end method
    res.end = function (this: Response, ...args: any[]): Response {
      // Only create audit log for successful operations
      if (res.statusCode >= 200 && res.statusCode < 300 && req.user) {
        const entityId = req.params.id;
        
        createAuditLog(
          req.user.id,
          action,
          entityType,
          entityId,
          { body: req.body },
          req
        ).catch(err => logger.error('Audit logging failed:', err));
      }
      
      // Call the original end method
      return originalEnd.apply(this, args);
    } as any;
    
    next();
  };
};

