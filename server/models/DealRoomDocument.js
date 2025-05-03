const mongoose = require('mongoose');

const DealRoomDocumentSchema = new mongoose.Schema({
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
  pdfUrl: {
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
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  bookmark: {
    type: String,
    required: false
  }
});

module.exports = mongoose.models.DealRoomDocument || mongoose.model('DealRoomDocument', DealRoomDocumentSchema);
