const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');

dotenv.config();

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
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

// Import models
const DealRoomActivity = require('./server/models/DealRoomActivity');

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
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176', 'http://127.0.0.1:5173', 'http://127.0.0.1:5174', 'http://127.0.0.1:5175', 'http://127.0.0.1:5176'],
  credentials: true
}));
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
    await connectToDatabase();

    // Get all access requests
    const requests = await AccessRequest.find().sort({ timestamp: -1 });

    res.status(200).json(requests);
  } catch (error) {
    console.error('Error fetching access requests:', error);
    res.status(500).json({ message: 'Failed to fetch access requests' });
  }
});

// Update access request status (admin only)
app.put('/api/access-requests/:id', async (req, res) => {
  const { id } = req.params;
  const { status, adminEmail } = req.body;

  try {
    // Connect to MongoDB
    await connectToDatabase();

    // Find the request
    const request = await AccessRequest.findById(id);

    if (!request) {
      return res.status(404).json({ message: 'Access request not found' });
    }

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
    res.status(500).json({ message: 'Failed to update access request' });
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
  const { email, name, requestType, adminEmail } = req.body;

  if (!email || !requestType) {
    return res.status(400).json({ message: 'Email and requestType are required' });
  }

  try {
    // Connect to MongoDB
    await connectToDatabase();

    // Check if user already has a request
    let existingRequest = await AccessRequest.findOne({
      email: email,
      requestType: requestType
    });

    if (existingRequest) {
      // Update existing request
      existingRequest.status = 'approved';
      existingRequest.approvedAt = new Date();
      existingRequest.approvedBy = adminEmail || 'admin';
      await existingRequest.save();

      console.log(`Existing access request for ${email} has been manually approved by ${adminEmail || 'admin'}`);
      return res.status(200).json({ message: 'Access granted to existing request', request: existingRequest });
    }

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
  } catch (error) {
    console.error('Error granting access:', error);
    res.status(500).json({ message: 'Failed to grant access' });
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
    await connectToDatabase();

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
    await connectToDatabase();

    // Get all activity, sorted by timestamp (newest first)
    const activities = await DealRoomActivity.find().sort({ timestamp: -1 }).limit(100);

    res.status(200).json(activities);
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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log('OpenAI API Key:', process.env.OPENAI_API_KEY ? 'Present' : 'Missing');
});
