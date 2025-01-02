import mongoose, { Schema, Document } from 'mongoose';

interface IVisitHistory {
  page: string;
  timestamp: Date;
  scheduledDate?: Date;
}

interface IProgress {
  businessPitchViewed?: boolean;
  portfolioOSViewed?: boolean;
  introCallScheduled?: boolean;
  interestRegistered?: boolean;
  webinarRegistered?: boolean;
  scheduledCallDate?: Date;
  [key: string]: any;
}

export interface IUserActivity extends Document {
  userId: string;
  email: string;
  lastActive: Date;
  lastSignIn: Date;
  visitHistory: IVisitHistory[];
  progress: IProgress;
  createdAt: Date;
  updatedAt: Date;
}

const UserActivitySchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  lastActive: {
    type: Date,
    default: Date.now
  },
  lastSignIn: {
    type: Date,
    default: Date.now
  },
  visitHistory: [{
    page: String,
    timestamp: {
      type: Date,
      default: Date.now
    },
    scheduledDate: Date
  }],
  progress: {
    businessPitchViewed: {
      type: Boolean,
      default: false
    },
    portfolioOSViewed: {
      type: Boolean,
      default: false
    },
    introCallScheduled: {
      type: Boolean,
      default: false
    },
    interestRegistered: {
      type: Boolean,
      default: false
    },
    webinarRegistered: {
      type: Boolean,
      default: false
    },
    scheduledCallDate: Date
  }
}, {
  timestamps: true
});

export const UserActivity = mongoose.model<IUserActivity>('UserActivity', UserActivitySchema); 