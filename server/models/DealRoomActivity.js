const mongoose = require('mongoose');

const DealRoomActivitySchema = new mongoose.Schema({
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

module.exports = mongoose.models.DealRoomActivity || mongoose.model('DealRoomActivity', DealRoomActivitySchema);
