import mongoose from 'mongoose';

const visitHistorySchema = new mongoose.Schema({
  page: String,
  timestamp: Date,
  scheduledDate: Date
});

const userActivitySchema = new mongoose.Schema({
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
  progress: {
    businessPitchViewed: Boolean,
    portfolioOSViewed: Boolean,
    introCallScheduled: Boolean,
    interestRegistered: Boolean,
    webinarRegistered: Boolean,
    scheduledCallDate: Date
  },
  visitHistory: [visitHistorySchema]
}, {
  timestamps: true
});

export const UserActivity = mongoose.model('UserActivity', userActivitySchema); 