import mongoose, { Schema, Document } from 'mongoose';

export interface IDealRoomActivity extends Document {
  email: string;
  name: string;
  action: 'view' | 'download' | 'share';
  documentId?: string;
  documentName?: string;
  timestamp: Date;
  ipAddress?: string;
  userAgent?: string;
}

const DealRoomActivitySchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  action: {
    type: String,
    required: true,
    enum: ['view', 'download', 'share']
  },
  documentId: {
    type: String,
    required: false
  },
  documentName: {
    type: String,
    required: false
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  ipAddress: {
    type: String,
    required: false
  },
  userAgent: {
    type: String,
    required: false
  }
});

export const DealRoomActivity = mongoose.model<IDealRoomActivity>('DealRoomActivity', DealRoomActivitySchema);
