const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const { convertUrlDocumentToPdf } = require('./server/utils/documentConverter');

dotenv.config();

// Environment flag
const isProduction = process.env.NODE_ENV === 'production';
console.log(`Running in ${isProduction ? 'PRODUCTION' : 'DEVELOPMENT'} mode`);

const app = express();
const port = process.env.PORT || 3001;

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Configure OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// MongoDB connection
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');
    return true;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    console.log('Using mock data instead of MongoDB');
    return false;
  }
};

// Import models
const DealRoomActivity = require('./server/models/DealRoomActivity');
const DealRoomDocument = require('./server/models/DealRoomDocument');

// Define NewsletterSubscriber model
const newsletterSubscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true
  },
  name: {
    type: String,
    trim: true
  },
  subscribedAt: {
    type: Date,
    default: Date.now
  },
  active: {
    type: Boolean,
    default: true
  }
});

const NewsletterSubscriber = mongoose.models.NewsletterSubscriber || mongoose.model('NewsletterSubscriber', newsletterSubscriberSchema);

// Define AccessRequest model
const accessRequestSchema = new mongoose.Schema({
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

const AccessRequest = mongoose.models.AccessRequest || mongoose.model('AccessRequest', accessRequestSchema);

// Middleware
if (isProduction) {
  // In production, allow requests from any origin
  app.use(cors({
    origin: '*',
    credentials: true
  }));
  console.log('CORS configured for production - allowing all origins');
} else {
  // In development, only allow requests from localhost
  app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176', 'http://127.0.0.1:5173', 'http://127.0.0.1:5174', 'http://127.0.0.1:5175', 'http://127.0.0.1:5176'],
    credentials: true
  }));
  console.log('CORS configured for development - allowing only localhost origins');
}
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.log('Request headers:', req.headers);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  console.log('Health check request received');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// OpenAI Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    console.log('Received chat request:', req.body);
    const { messages } = req.body;

    if (!messages) {
      return res.status(400).json({ error: 'Messages are required' });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
      temperature: 0.7,
      max_tokens: 1000
    });

    console.log('OpenAI response:', completion);
    res.json(completion);
  } catch (error) {
    console.error('OpenAI error:', error);
    res.status(500).json({
      error: 'An error occurred while processing your request',
      details: error.message
    });
  }
});

// Email endpoint
app.post('/api/schedule-call', async (req, res) => {
  const { name, email, company, timePreference, message } = req.body;

  try {
    // Send email to team
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.TEAM_EMAIL,
      subject: 'New Call Request',
      html: `
        <h2>New Call Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'N/A'}</p>
        <p><strong>Time Preference:</strong> ${timePreference}</p>
        <p><strong>Message:</strong> ${message || 'N/A'}</p>
      `
    });

    // Send confirmation to user
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Call Request Confirmation',
      html: `
        <h2>Thank you for scheduling a call with us!</h2>
        <p>We have received your request and will get back to you shortly to confirm the time.</p>
        <p><strong>Your preferred time:</strong> ${timePreference}</p>
        <br>
        <p>Best regards,</p>
        <p>Equihome Partners Team</p>
      `
    });

    res.status(200).json({ message: 'Call request sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ message: 'Failed to send request' });
  }
});

// Access Request endpoint
app.post('/api/request-access', async (req, res) => {
  const { name, email, requestType } = req.body;

  try {
    // Connect to MongoDB
    await connectToDatabase();

    // Create new access request in MongoDB
    const accessRequest = new AccessRequest({
      name,
      email,
      requestType,
      status: 'pending',
      timestamp: new Date()
    });

    // Save to database
    await accessRequest.save();

    console.log(`New access request from ${email} for ${requestType}`);

    res.status(200).json({ message: 'Access request sent successfully', requestId: accessRequest._id });
  } catch (error) {
    console.error('Error processing access request:', error);
    res.status(500).json({ message: 'Failed to process access request' });
  }
});

// Get all access requests (admin only)
app.get('/api/access-requests', async (req, res) => {
  try {
    // Connect to MongoDB
    const connected = await connectToDatabase();

    if (connected) {
      // Get all access requests
      const requests = await AccessRequest.find().sort({ timestamp: -1 });
      res.status(200).json(requests);
    } else {
      // Return mock data if MongoDB is not available
      console.log('Returning mock access requests data');
      res.status(200).json([
        {
          _id: '1',
          email: 'namb.jay@gmail.com',
          name: 'Investor',
          requestType: 'dealRoom',
          status: 'pending',
          timestamp: new Date(Date.now() - 86400000).toISOString()
        },
        {
          _id: '2',
          email: 'sujay@equihome.com.au',
          name: 'Investor',
          requestType: 'dealRoom',
          status: 'pending',
          timestamp: new Date(Date.now() - 172800000).toISOString()
        }
      ]);
    }
  } catch (error) {
    console.error('Error fetching access requests:', error);
    res.status(500).json({ message: 'Failed to fetch access requests' });
  }
});

// Update access request status (admin only) - Support both PUT and POST for compatibility
app.post('/api/access-requests/:id', async (req, res) => {
  const { id } = req.params;
  const { status, adminEmail } = req.body;

  console.log(`Updating access request ${id} to status ${status} by ${adminEmail}`);

  try {
    // Connect to MongoDB
    await connectToDatabase();

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error(`Invalid ObjectId: ${id}`);
      return res.status(400).json({ message: 'Invalid request ID format' });
    }

    // Find the request
    const request = await AccessRequest.findById(id);

    if (!request) {
      console.error(`Access request not found with ID: ${id}`);
      return res.status(404).json({ message: 'Access request not found' });
    }

    console.log(`Found access request: ${request.email} for ${request.requestType}`);

    // Update status
    request.status = status;

    if (status === 'approved') {
      request.approvedAt = new Date();
      request.approvedBy = adminEmail || 'admin';
      console.log(`Access request from ${request.email} for ${request.requestType} has been approved by ${adminEmail || 'admin'}`);
    } else if (status === 'denied') {
      console.log(`Access request from ${request.email} for ${request.requestType} has been denied by ${adminEmail || 'admin'}`);
    }

    // Save changes
    await request.save();

    res.status(200).json({ message: `Access request ${status}`, request });
  } catch (error) {
    console.error('Error updating access request:', error);
    res.status(500).json({ message: `Failed to update access request: ${error.message}` });
  }
});

// Also support PUT for the same endpoint (for backward compatibility)
app.put('/api/access-requests/:id', async (req, res) => {
  // Forward to the POST handler
  const { id } = req.params;
  const { status, adminEmail } = req.body;

  console.log(`PUT request forwarded to POST handler: Updating access request ${id} to status ${status} by ${adminEmail}`);

  try {
    // Connect to MongoDB
    await connectToDatabase();

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error(`Invalid ObjectId: ${id}`);
      return res.status(400).json({ message: 'Invalid request ID format' });
    }

    // Find the request
    const request = await AccessRequest.findById(id);

    if (!request) {
      console.error(`Access request not found with ID: ${id}`);
      return res.status(404).json({ message: 'Access request not found' });
    }

    console.log(`Found access request: ${request.email} for ${request.requestType}`);

    // Update status
    request.status = status;

    if (status === 'approved') {
      request.approvedAt = new Date();
      request.approvedBy = adminEmail || 'admin';
      console.log(`Access request from ${request.email} for ${request.requestType} has been approved by ${adminEmail || 'admin'}`);
    } else if (status === 'denied') {
      console.log(`Access request from ${request.email} for ${request.requestType} has been denied by ${adminEmail || 'admin'}`);
    }

    // Save changes
    await request.save();

    res.status(200).json({ message: `Access request ${status}`, request });
  } catch (error) {
    console.error('Error updating access request:', error);
    res.status(500).json({ message: `Failed to update access request: ${error.message}` });
  }
});

// Check if user has access to a specific resource
app.get('/api/check-access', async (req, res) => {
  const { email, resourceType } = req.query;

  if (!email || !resourceType) {
    return res.status(400).json({ message: 'Email and resourceType are required' });
  }

  try {
    // Connect to MongoDB
    await connectToDatabase();

    // Check if user has an approved access request for this resource
    const request = await AccessRequest.findOne({
      email: email,
      requestType: resourceType,
      status: 'approved'
    });

    if (request) {
      res.status(200).json({ hasAccess: true, since: request.approvedAt });
    } else {
      res.status(200).json({ hasAccess: false });
    }
  } catch (error) {
    console.error('Error checking access:', error);
    res.status(500).json({ message: 'Failed to check access' });
  }
});

// Manually grant access to a user
app.post('/api/grant-access', async (req, res) => {
  console.log('Received grant access request:', req.body);
  const { email, name, requestType, adminEmail } = req.body;

  if (!email || !requestType) {
    console.log('Missing required fields:', { email, requestType });
    return res.status(400).json({ message: 'Email and requestType are required' });
  }

  try {
    // Connect to MongoDB
    const connected = await connectToDatabase();
    console.log('MongoDB connection status:', connected ? 'Connected' : 'Failed to connect');

    if (connected) {
      // Check if user already has a request
      let existingRequest = await AccessRequest.findOne({
        email: email,
        requestType: requestType
      });

      if (existingRequest) {
        console.log(`Found existing request for ${email} with status ${existingRequest.status}`);
        // Update existing request
        existingRequest.status = 'approved';
        existingRequest.approvedAt = new Date();
        existingRequest.approvedBy = adminEmail || 'admin';
        await existingRequest.save();

        console.log(`Existing access request for ${email} has been manually approved by ${adminEmail || 'admin'}`);
        return res.status(200).json({ message: 'Access granted to existing request', request: existingRequest });
      }

      console.log(`Creating new access request for ${email}`);
      // Create new access request with approved status
      const newRequest = new AccessRequest({
        email,
        name: name || email.split('@')[0], // Use part of email as name if not provided
        requestType,
        status: 'approved',
        timestamp: new Date(),
        approvedAt: new Date(),
        approvedBy: adminEmail || 'admin'
      });

      // Save to database
      await newRequest.save();

      console.log(`Manual access granted to ${email} for ${requestType} by ${adminEmail || 'admin'}`);

      res.status(200).json({ message: 'Access granted successfully', request: newRequest });
    } else {
      // Mock response when MongoDB is not available
      console.log(`MongoDB not available. Simulating access grant for ${email}`);
      const mockRequest = {
        _id: Math.random().toString(36).substring(7),
        email,
        name: name || email.split('@')[0],
        requestType,
        status: 'approved',
        timestamp: new Date().toISOString(),
        approvedAt: new Date().toISOString(),
        approvedBy: adminEmail || 'admin'
      };

      res.status(200).json({ message: 'Access granted successfully (mock)', request: mockRequest });
    }
  } catch (error) {
    console.error('Error granting access:', error);
    res.status(500).json({ message: `Failed to grant access: ${error.message}` });
  }
});

// Revoke access from a user
app.post('/api/revoke-access', async (req, res) => {
  const { email, requestType, adminEmail } = req.body;

  if (!email || !requestType) {
    return res.status(400).json({ message: 'Email and requestType are required' });
  }

  try {
    // Connect to MongoDB
    const connected = await connectToDatabase();
    console.log('MongoDB connection status:', connected ? 'Connected' : 'Failed to connect');

    if (connected) {
      // Find the user's access request
      const request = await AccessRequest.findOne({
        email: email,
        requestType: requestType
      });

      if (!request) {
        return res.status(404).json({ message: 'No access request found for this user' });
      }

      // Update status to denied
      request.status = 'denied';
      request.approvedAt = null;
      request.approvedBy = null;

      // Save changes
      await request.save();

      console.log(`Access revoked from ${email} for ${requestType} by ${adminEmail || 'admin'}`);

      res.status(200).json({ message: 'Access revoked successfully', request });
    } else {
      // Mock response when MongoDB is not available
      console.log(`MongoDB not available. Simulating access revocation for ${email}`);
      const mockRequest = {
        _id: Math.random().toString(36).substring(7),
        email,
        requestType,
        status: 'denied',
        timestamp: new Date().toISOString(),
        approvedAt: null,
        approvedBy: null
      };

      res.status(200).json({ message: 'Access revoked successfully (mock)', request: mockRequest });
    }
  } catch (error) {
    console.error('Error revoking access:', error);
    res.status(500).json({ message: 'Failed to revoke access' });
  }
});

// Track Deal Room activity
app.post('/api/track-activity', async (req, res) => {
  const { email, name, action, documentId, documentName } = req.body;

  if (!email || !action) {
    return res.status(400).json({ message: 'Email and action are required' });
  }

  try {
    // Connect to MongoDB
    await connectToDatabase();

    // Create new activity record
    const activity = new DealRoomActivity({
      email,
      name: name || email.split('@')[0],
      action,
      documentId,
      documentName,
      timestamp: new Date(),
      ipAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
      userAgent: req.headers['user-agent']
    });

    // Save to database
    await activity.save();

    console.log(`Deal Room activity tracked: ${email} ${action} ${documentName || ''}`);

    res.status(200).json({ message: 'Activity tracked successfully' });
  } catch (error) {
    console.error('Error tracking activity:', error);
    res.status(500).json({ message: 'Failed to track activity' });
  }
});

// Get Deal Room activity
app.get('/api/deal-room-activity', async (req, res) => {
  try {
    // Connect to MongoDB
    const connected = await connectToDatabase();

    if (connected) {
      // Get all activity, sorted by timestamp (newest first)
      const activities = await DealRoomActivity.find().sort({ timestamp: -1 }).limit(100);
      res.status(200).json(activities);
    } else {
      // Return mock data if MongoDB is not available
      console.log('Returning mock deal room activity data');
      res.status(200).json([
        {
          _id: '1',
          email: 'user1@example.com',
          name: 'User One',
          action: 'viewed',
          documentName: 'Investment Thesis',
          timestamp: new Date().toISOString()
        },
        {
          _id: '2',
          email: 'user2@example.com',
          name: 'User Two',
          action: 'downloaded',
          documentName: 'Financial Model',
          timestamp: new Date(Date.now() - 86400000).toISOString()
        }
      ]);
    }
  } catch (error) {
    console.error('Error fetching Deal Room activity:', error);
    res.status(500).json({ message: 'Failed to fetch activity' });
  }
});

// Get Deal Room activity for a specific user
app.get('/api/deal-room-activity/user/:email', async (req, res) => {
  const { email } = req.params;

  try {
    // Connect to MongoDB
    await connectToDatabase();

    // Get user's activity, sorted by timestamp (newest first)
    const activities = await DealRoomActivity.find({ email }).sort({ timestamp: -1 }).limit(50);

    res.status(200).json(activities);
  } catch (error) {
    console.error('Error fetching user Deal Room activity:', error);
    res.status(500).json({ message: 'Failed to fetch user activity' });
  }
});

// Get all Deal Room documents
app.get('/api/deal-room/documents', async (req, res) => {
  try {
    // Connect to MongoDB
    await connectToDatabase();

    // Get all documents, sorted by category and sortOrder
    const documents = await DealRoomDocument.find().sort({ category: 1, sortOrder: 1 });

    res.status(200).json(documents);
  } catch (error) {
    console.error('Error fetching Deal Room documents:', error);
    res.status(500).json({ message: 'Failed to fetch documents' });
  }
});

// Get documents by category
app.get('/api/deal-room/documents/category/:category', async (req, res) => {
  const { category } = req.params;

  try {
    // Connect to MongoDB
    await connectToDatabase();

    // Get documents by category, sorted by sortOrder
    const documents = await DealRoomDocument.find({ category }).sort({ sortOrder: 1 });

    res.status(200).json(documents);
  } catch (error) {
    console.error('Error fetching documents by category:', error);
    res.status(500).json({ message: 'Failed to fetch documents by category' });
  }
});

// Add a new document (admin only)
app.post('/api/deal-room/documents', async (req, res) => {
  const { title, description, category, fileUrl, externalUrl, iconType, isLocked, sortOrder, bookmark } = req.body;

  try {
    // Connect to MongoDB
    await connectToDatabase();

    // Create new document
    const document = new DealRoomDocument({
      title,
      description,
      category,
      fileUrl,
      externalUrl,
      iconType,
      isLocked: isLocked || false,
      sortOrder: sortOrder || 0,
      bookmark
    });

    // Save to database
    await document.save();

    console.log(`New document added: ${title} in ${category}`);

    res.status(201).json({ message: 'Document added successfully', document });
  } catch (error) {
    console.error('Error adding document:', error);
    res.status(500).json({ message: 'Failed to add document' });
  }
});

// Update a document (admin only)
app.put('/api/deal-room/documents/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, category, fileUrl, externalUrl, iconType, isLocked, sortOrder, bookmark } = req.body;

  try {
    // Connect to MongoDB
    await connectToDatabase();

    // Find the document
    const document = await DealRoomDocument.findById(id);

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    // Update fields
    if (title) document.title = title;
    if (description !== undefined) document.description = description;
    if (category) document.category = category;
    if (fileUrl !== undefined) document.fileUrl = fileUrl;
    if (externalUrl !== undefined) document.externalUrl = externalUrl;
    if (iconType) document.iconType = iconType;
    if (isLocked !== undefined) document.isLocked = isLocked;
    if (sortOrder !== undefined) document.sortOrder = sortOrder;
    if (bookmark !== undefined) document.bookmark = bookmark;

    document.updatedAt = new Date();

    // Save changes
    await document.save();

    console.log(`Document updated: ${document.title}`);

    res.status(200).json({ message: 'Document updated successfully', document });
  } catch (error) {
    console.error('Error updating document:', error);
    res.status(500).json({ message: 'Failed to update document' });
  }
});

// Delete a document (admin only)
app.delete('/api/deal-room/documents/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Connect to MongoDB
    await connectToDatabase();

    // Find and delete the document
    const document = await DealRoomDocument.findByIdAndDelete(id);

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    console.log(`Document deleted: ${document.title}`);

    res.status(200).json({ message: 'Document deleted successfully' });
  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).json({ message: 'Failed to delete document' });
  }
});

// Initialize Deal Room with default documents
app.post('/api/deal-room/initialize', async (req, res) => {
  try {
    // Connect to MongoDB
    await connectToDatabase();

    // Check if documents already exist
    const existingCount = await DealRoomDocument.countDocuments();

    if (existingCount > 0) {
      return res.status(400).json({ message: 'Deal Room already initialized' });
    }

    // Default documents
    const defaultDocuments = [
      // Company Documentation
      {
        title: 'US Company Documentation',
        description: 'Legal documents for the US entity',
        category: 'company',
        iconType: 'folder',
        sortOrder: 1
      },
      {
        title: 'Equihome Company Model - $1.5m USD Raise',
        description: 'Financial model for the company',
        category: 'financial',
        iconType: 'chart',
        sortOrder: 1
      },
      {
        title: 'Equihome Fund Model - $500m Draw Down',
        description: 'Financial model for the fund',
        category: 'financial',
        iconType: 'chart',
        sortOrder: 2
      },
      {
        title: 'Equihome Thesis Presentation',
        description: 'Investment thesis presentation',
        category: 'company',
        iconType: 'presentation',
        sortOrder: 2
      },
      {
        title: 'Cap Table',
        description: 'Current capitalization table',
        category: 'company',
        iconType: 'table',
        sortOrder: 3
      },
      {
        title: 'Equihome Seed Website',
        description: 'Seed stage website',
        category: 'company',
        externalUrl: 'https://seed.equihome.com.au',
        iconType: 'web',
        sortOrder: 4
      },
      {
        title: '¾ Page Introduction',
        description: 'Brief company introduction',
        category: 'email',
        iconType: 'email',
        sortOrder: 1
      },
      {
        title: '2 Paragraphs - Bart Email',
        description: 'Email from Bart with company overview',
        category: 'email',
        iconType: 'email',
        sortOrder: 2
      },

      // Updated Documents (with bookmark)
      {
        title: 'Investment Thesis - Current Draft',
        description: 'Latest version of the investment thesis',
        category: 'updated',
        iconType: 'file',
        bookmark: '15 April 2025',
        sortOrder: 1
      },
      {
        title: 'Equihome Model - Blended Duration - $2m Raise',
        description: 'Updated financial model with blended duration',
        category: 'updated',
        iconType: 'chart',
        bookmark: '15 April 2025',
        sortOrder: 2
      },
      {
        title: 'SWOT Analysis',
        description: 'Strengths, weaknesses, opportunities, and threats analysis',
        category: 'updated',
        iconType: 'file',
        bookmark: '15 April 2025',
        sortOrder: 3
      },
      {
        title: 'Competitive Landscape',
        description: 'Analysis of competitors in the market',
        category: 'market',
        iconType: 'file',
        sortOrder: 1
      },
      {
        title: 'Residential Mortgage Market',
        description: 'Overview of the residential mortgage market',
        category: 'market',
        iconType: 'file',
        sortOrder: 2
      },
      {
        title: 'Go to Market Strategy',
        description: 'Strategy for market entry and growth',
        category: 'strategy',
        iconType: 'file',
        sortOrder: 1
      },
      {
        title: 'Market Fit Analysis',
        description: 'Analysis of product-market fit',
        category: 'strategy',
        iconType: 'file',
        sortOrder: 2
      },
      {
        title: 'Introduction Deck - Updated',
        description: 'Latest version of the introduction deck',
        category: 'updated',
        iconType: 'presentation',
        bookmark: '15 April 2025',
        sortOrder: 4
      },

      // Technical Documents
      {
        title: 'Technical Architecture',
        description: 'Overview of the technical architecture',
        category: 'technical',
        iconType: 'file',
        sortOrder: 1
      },
      {
        title: 'API Documentation',
        description: 'Documentation for the API',
        category: 'technical',
        iconType: 'file',
        sortOrder: 2
      },
      {
        title: 'Security Overview',
        description: 'Overview of security measures',
        category: 'technical',
        iconType: 'file',
        sortOrder: 3
      }
    ];

    // Insert all documents
    await DealRoomDocument.insertMany(defaultDocuments);

    console.log(`Initialized Deal Room with ${defaultDocuments.length} documents`);

    res.status(201).json({ message: 'Deal Room initialized successfully', count: defaultDocuments.length });
  } catch (error) {
    console.error('Error initializing Deal Room:', error);
    res.status(500).json({ message: 'Failed to initialize Deal Room' });
  }
});

// Access Requests API endpoints

// This endpoint was moved to line 221

// This endpoint was moved to line 304

// This endpoint was moved to line 491

// Admin API endpoints

// Get metrics for admin dashboard
app.get('/api/admin/metrics', async (req, res) => {
  try {
    // Connect to MongoDB
    const connected = await connectToDatabase();

    if (connected) {
      // Get counts from various collections
      const totalUsers = await AccessRequest.countDocuments();

      // Count active users in the last 24 hours
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const activeUsers = await DealRoomActivity.countDocuments({
        timestamp: { $gte: oneDayAgo }
      });

      // Count active newsletter subscribers
      const newsletterSubscribers = await NewsletterSubscriber.countDocuments({ active: true });

      res.status(200).json({
        totalUsers,
        activeUsers,
        newsletterSubscribers
      });
    } else {
      // Return mock data if MongoDB is not available
      console.log('Returning mock metrics data');
      res.status(200).json({
        totalUsers: 12,
        activeUsers: 5,
        newsletterSubscribers: 8
      });
    }
  } catch (error) {
    console.error('Error fetching admin metrics:', error);
    res.status(500).json({ message: 'Failed to fetch metrics' });
  }
});

// Get user activity for admin dashboard
app.get('/api/admin/user-activity', async (req, res) => {
  try {
    // Connect to MongoDB
    const connected = await connectToDatabase();

    if (connected) {
      // Get unique users with their last activity time
      const activities = await DealRoomActivity.aggregate([
        { $sort: { timestamp: -1 } },
        { $group: {
          _id: "$email",
          email: { $first: "$email" },
          name: { $first: "$name" },
          lastActive: { $first: "$timestamp" }
        }},
        { $limit: 20 }
      ]);

      res.status(200).json(activities);
    } else {
      // Return mock data if MongoDB is not available
      console.log('Returning mock user activity data');
      res.status(200).json([
        { _id: '1', email: 'user1@example.com', name: 'User One', lastActive: new Date().toISOString() },
        { _id: '2', email: 'user2@example.com', name: 'User Two', lastActive: new Date(Date.now() - 86400000).toISOString() }
      ]);
    }
  } catch (error) {
    console.error('Error fetching user activity:', error);
    res.status(500).json({ message: 'Failed to fetch user activity' });
  }
});

// Subscribe to newsletter
app.post('/api/newsletter-subscribe', async (req, res) => {
  const { email, name } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    // Connect to MongoDB
    await connectToDatabase();

    // Check if email already exists
    const existingSubscriber = await NewsletterSubscriber.findOne({ email });

    if (existingSubscriber) {
      // If subscriber exists but is inactive, reactivate them
      if (!existingSubscriber.active) {
        existingSubscriber.active = true;
        await existingSubscriber.save();
        return res.status(200).json({ message: 'Subscription reactivated successfully' });
      }

      // Already subscribed and active
      return res.status(200).json({ message: 'Already subscribed' });
    }

    // Create new subscriber
    const newSubscriber = new NewsletterSubscriber({
      email,
      name,
      subscribedAt: new Date(),
      active: true
    });

    // Save to database
    await newSubscriber.save();

    console.log(`New newsletter subscriber: ${email}`);

    res.status(201).json({ message: 'Subscribed successfully' });
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    res.status(500).json({ message: 'Failed to subscribe' });
  }
});

// Unsubscribe from newsletter
app.post('/api/newsletter-unsubscribe', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    // Connect to MongoDB
    await connectToDatabase();

    // Find subscriber
    const subscriber = await NewsletterSubscriber.findOne({ email });

    if (!subscriber) {
      return res.status(404).json({ message: 'Email not found in subscribers list' });
    }

    // Set as inactive (soft delete)
    subscriber.active = false;
    await subscriber.save();

    console.log(`Newsletter unsubscribe: ${email}`);

    res.status(200).json({ message: 'Unsubscribed successfully' });
  } catch (error) {
    console.error('Error unsubscribing from newsletter:', error);
    res.status(500).json({ message: 'Failed to unsubscribe' });
  }
});

// Get newsletter subscribers for admin dashboard
app.get('/api/admin/newsletter-subscribers', async (req, res) => {
  try {
    // Connect to MongoDB
    const connected = await connectToDatabase();

    if (connected) {
      // Check if we have any subscribers in the database
      const subscriberCount = await NewsletterSubscriber.countDocuments();

      // If no subscribers exist, create some sample data
      if (subscriberCount === 0) {
        console.log('No newsletter subscribers found, creating sample data');

        // Sample data
        const sampleSubscribers = [
          { email: 'subscriber1@example.com', name: 'Subscriber One', subscribedAt: new Date() },
          { email: 'subscriber2@example.com', name: 'Subscriber Two', subscribedAt: new Date(Date.now() - 86400000) },
          { email: 'subscriber3@example.com', name: 'Subscriber Three', subscribedAt: new Date(Date.now() - 172800000) },
          { email: 'subscriber4@example.com', name: 'Subscriber Four', subscribedAt: new Date(Date.now() - 259200000) },
          { email: 'subscriber5@example.com', name: 'Subscriber Five', subscribedAt: new Date(Date.now() - 345600000) },
          { email: 'subscriber6@example.com', name: 'Subscriber Six', subscribedAt: new Date(Date.now() - 432000000) },
          { email: 'subscriber7@example.com', name: 'Subscriber Seven', subscribedAt: new Date(Date.now() - 518400000) },
          { email: 'subscriber8@example.com', name: 'Subscriber Eight', subscribedAt: new Date(Date.now() - 604800000) }
        ];

        // Insert sample data
        await NewsletterSubscriber.insertMany(sampleSubscribers);
        console.log('Sample newsletter subscribers created');
      }

      // Get all active subscribers, sorted by subscribedAt (newest first)
      const subscribers = await NewsletterSubscriber.find({ active: true }).sort({ subscribedAt: -1 });

      res.status(200).json(subscribers);
    } else {
      // Return mock data if MongoDB is not available
      console.log('Returning mock newsletter subscribers data');
      res.status(200).json([
        { _id: '1', email: 'subscriber1@example.com', name: 'Subscriber One', subscribedAt: new Date().toISOString() },
        { _id: '2', email: 'subscriber2@example.com', name: 'Subscriber Two', subscribedAt: new Date(Date.now() - 86400000).toISOString() },
        { _id: '3', email: 'subscriber3@example.com', name: 'Subscriber Three', subscribedAt: new Date(Date.now() - 172800000).toISOString() },
        { _id: '4', email: 'subscriber4@example.com', name: 'Subscriber Four', subscribedAt: new Date(Date.now() - 259200000).toISOString() },
        { _id: '5', email: 'subscriber5@example.com', name: 'Subscriber Five', subscribedAt: new Date(Date.now() - 345600000).toISOString() },
        { _id: '6', email: 'subscriber6@example.com', name: 'Subscriber Six', subscribedAt: new Date(Date.now() - 432000000).toISOString() },
        { _id: '7', email: 'subscriber7@example.com', name: 'Subscriber Seven', subscribedAt: new Date(Date.now() - 518400000).toISOString() },
        { _id: '8', email: 'subscriber8@example.com', name: 'Subscriber Eight', subscribedAt: new Date(Date.now() - 604800000).toISOString() }
      ]);
    }
  } catch (error) {
    console.error('Error fetching newsletter subscribers:', error);
    res.status(500).json({ message: 'Failed to fetch newsletter subscribers' });
  }
});

// Document conversion endpoint
app.post('/api/convert-document', async (req, res) => {
  const { documentUrl, documentId } = req.body;

  if (!documentUrl) {
    return res.status(400).json({ message: 'Document URL is required' });
  }

  try {
    // Check if the URL is for a Word document
    const isWordDoc = documentUrl.toLowerCase().endsWith('.doc') ||
                      documentUrl.toLowerCase().endsWith('.docx');

    if (!isWordDoc) {
      return res.status(400).json({ message: 'Only Word documents can be converted' });
    }

    console.log(`Converting document: ${documentUrl}`);

    // Create the converted directory if it doesn't exist
    const convertedDir = path.join(__dirname, 'public', 'converted');
    if (!fs.existsSync(convertedDir)) {
      fs.mkdirSync(convertedDir, { recursive: true });
    }

    // Convert the document
    const outputPath = await convertUrlDocumentToPdf(documentUrl, convertedDir);

    // Create a URL for the converted document
    const pdfUrl = `/converted/${path.basename(outputPath)}`;

    console.log(`Document converted successfully: ${pdfUrl}`);

    // If a document ID was provided, update the document in the database
    if (documentId) {
      try {
        await connectToDatabase();

        const document = await DealRoomDocument.findById(documentId);

        if (document) {
          document.pdfUrl = pdfUrl;
          document.updatedAt = new Date();
          await document.save();

          console.log(`Document ${documentId} updated with PDF URL: ${pdfUrl}`);
        }
      } catch (dbError) {
        console.error('Error updating document in database:', dbError);
        // Continue even if database update fails
      }
    }

    res.status(200).json({
      message: 'Document converted successfully',
      pdfUrl
    });
  } catch (error) {
    console.error('Error converting document:', error);
    res.status(500).json({ message: 'Failed to convert document' });
  }
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'dist')));
// Serve converted files
app.use('/converted', express.static(path.join(__dirname, 'public', 'converted')));

// Log all routes that aren't found to help with debugging
app.use((req, res, next) => {
  const isApiRequest = req.path.startsWith('/api/');
  if (isApiRequest) {
    console.log(`API route not found: ${req.method} ${req.path}`);
  }
  next();
});



// Catch-all route to serve the React app
app.get('*', (req, res) => {
  console.log(`Serving React app for path: ${req.path}`);
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log('OpenAI API Key:', process.env.OPENAI_API_KEY ? 'Present' : 'Missing');
});
