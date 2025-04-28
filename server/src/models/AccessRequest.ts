import mongoose, { Schema, Document } from 'mongoose';

export interface IAccessRequest extends Document {
  email: string;
  name: string;
  requestType: 'dealRoom' | 'portfolioOS' | 'techDemo';
  status: 'pending' | 'approved' | 'denied';
  timestamp: Date;
  approvedAt?: Date;
  approvedBy?: string;
}

const AccessRequestSchema = new Schema({
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
  requestType: {
    type: String,
    required: true,
    enum: ['dealRoom', 'portfolioOS', 'techDemo']
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'approved', 'denied'],
    default: 'pending'
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  approvedAt: {
    type: Date,
    default: null
  },
  approvedBy: {
    type: String,
    default: null
  }
});

export const AccessRequest = mongoose.model<IAccessRequest>('AccessRequest', AccessRequestSchema);
