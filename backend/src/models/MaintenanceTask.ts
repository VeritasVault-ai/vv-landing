import mongoose, { Document, Schema } from 'mongoose';

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent'
}

export interface IMaintenanceTask extends Document {
  title: string;
  description: string;
  property: mongoose.Types.ObjectId;
  inventoryItem?: mongoose.Types.ObjectId;
  assignedTo?: mongoose.Types.ObjectId;
  reportedBy: mongoose.Types.ObjectId;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: Date;
  completedAt?: Date;
  images?: string[];
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const MaintenanceTaskSchema = new Schema<IMaintenanceTask>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    property: {
      type: Schema.Types.ObjectId,
      ref: 'Property',
      required: true,
    },
    inventoryItem: {
      type: Schema.Types.ObjectId,
      ref: 'InventoryItem',
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    reportedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(TaskStatus),
      default: TaskStatus.PENDING,
      required: true,
    },
    priority: {
      type: String,
      enum: Object.values(TaskPriority),
      default: TaskPriority.MEDIUM,
      required: true,
    },
    dueDate: {
      type: Date,
    },
    completedAt: {
      type: Date,
    },
    images: [{
      type: String,
    }],
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IMaintenanceTask>('MaintenanceTask', MaintenanceTaskSchema);

