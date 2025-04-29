import mongoose, { Schema, Document } from 'mongoose';

export interface IDealRoomDocument extends Document {
  title: string;
  description?: string;
  category: 'company' | 'financial' | 'market' | 'strategy' | 'technical' | 'email' | 'updated';
  fileUrl?: string;
  externalUrl?: string;
  iconType: 'file' | 'chart' | 'table' | 'presentation' | 'email' | 'web' | 'folder';
  isLocked: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
  bookmark?: string;
}

const DealRoomDocumentSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: false,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['company', 'financial', 'market', 'strategy', 'technical', 'email', 'updated']
  },
  fileUrl: {
    type: String,
    required: false
  },
  externalUrl: {
    type: String,
    required: false
  },
  iconType: {
    type: String,
    required: true,
    enum: ['file', 'chart', 'table', 'presentation', 'email', 'web', 'folder']
  },
  isLocked: {
    type: Boolean,
    default: false
  },
  sortOrder: {
    type: Number,
    default: 0
  },
  bookmark: {
    type: String,
    required: false
  }
}, {
  timestamps: true
});

export const DealRoomDocument = mongoose.model<IDealRoomDocument>('DealRoomDocument', DealRoomDocumentSchema);
