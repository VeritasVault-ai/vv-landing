import mongoose, { Document, Schema } from 'mongoose';

export enum ItemStatus {
  OK = 'ok',
  MISSING = 'missing',
  DAMAGED = 'damaged',
  NEEDS_ATTENTION = 'needs_attention'
}

export interface IInventoryItem extends Document {
  name: string;
  description?: string;
  room: mongoose.Types.ObjectId;
  property: mongoose.Types.ObjectId;
  category?: string;
  quantity: number;
  status: ItemStatus;
  images?: string[];
  lastCheckedBy?: mongoose.Types.ObjectId;
  lastCheckedAt?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const InventoryItemSchema = new Schema<IInventoryItem>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    room: {
      type: Schema.Types.ObjectId,
      ref: 'Room',
      required: true,
    },
    property: {
      type: Schema.Types.ObjectId,
      ref: 'Property',
      required: true,
    },
    category: {
      type: String,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
      min: 0,
    },
    status: {
      type: String,
      enum: Object.values(ItemStatus),
      default: ItemStatus.OK,
      required: true,
    },
    images: [{
      type: String,
    }],
    lastCheckedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    lastCheckedAt: {
      type: Date,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create a compound index for efficient querying
InventoryItemSchema.index({ property: 1, room: 1, name: 1 });

export default mongoose.model<IInventoryItem>('InventoryItem', InventoryItemSchema);

