import mongoose, { Document, Schema } from 'mongoose';

export enum AuditAction {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  VIEW = 'view',
  STATUS_CHANGE = 'status_change',
  LOGIN = 'login',
  LOGOUT = 'logout'
}

export interface IAuditLog extends Document {
  user: mongoose.Types.ObjectId;
  action: AuditAction;
  entityType: string;
  entityId?: mongoose.Types.ObjectId;
  details?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}

const AuditLogSchema = new Schema<IAuditLog>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    action: {
      type: String,
      enum: Object.values(AuditAction),
      required: true,
    },
    entityType: {
      type: String,
      required: true,
    },
    entityId: {
      type: Schema.Types.ObjectId,
    },
    details: {
      type: Schema.Types.Mixed,
    },
    ipAddress: {
      type: String,
    },
    userAgent: {
      type: String,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

// Create indexes for efficient querying
AuditLogSchema.index({ user: 1, createdAt: -1 });
AuditLogSchema.index({ entityType: 1, entityId: 1 });
AuditLogSchema.index({ action: 1 });

export default mongoose.model<IAuditLog>('AuditLog', AuditLogSchema);

