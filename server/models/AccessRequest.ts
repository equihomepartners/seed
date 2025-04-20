import mongoose from 'mongoose';

const AccessRequestSchema = new mongoose.Schema({
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

// Check if the model already exists to prevent overwriting
export default mongoose.models.AccessRequest || mongoose.model('AccessRequest', AccessRequestSchema);
