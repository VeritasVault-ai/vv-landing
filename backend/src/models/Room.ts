import mongoose, { Document, Schema } from 'mongoose';

export interface IRoom extends Document {
  name: string;
  property: mongoose.Types.ObjectId;
  description?: string;
  images?: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const RoomSchema = new Schema<IRoom>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    property: {
      type: Schema.Types.ObjectId,
      ref: 'Property',
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    images: [{
      type: String,
    }],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IRoom>('Room', RoomSchema);

