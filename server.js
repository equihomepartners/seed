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
    
    // Send email to admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'sujay@equihome.com.au', // Admin email
      subject: 'New Deal Room Access Request',
      html: `
        <h2>New Deal Room Access Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Request Type:</strong> ${requestType}</p>
        <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
        <br>
        <p>To grant access, please log in to the admin dashboard.</p>
      `
    });

    // Send confirmation to user
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Access Request Confirmation - Equihome Partners',
      html: `
        <h2>Thank you for requesting access to the Equihome Deal Room</h2>
        <p>We have received your request for access to our exclusive deal room.</p>
        <p>Our team will review your request and grant access shortly.</p>
        <p>You will receive an email notification when access is granted.</p>
        <br>
        <p>Best regards,</p>
        <p>Equihome Partners Team</p>
      `
    });

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
      
      // Send approval email to user
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: request.email,
        subject: 'Deal Room Access Approved - Equihome Partners',
        html: `
          <h2>Your Access Request Has Been Approved</h2>
          <p>We're pleased to inform you that your request for access to the Equihome Deal Room has been approved.</p>
          <p>You can now access the Deal Room by logging in to your account.</p>
          <br>
          <p>Best regards,</p>
          <p>Equihome Partners Team</p>
        `
      });
    } else if (status === 'denied') {
      // Send denial email to user
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: request.email,
        subject: 'Deal Room Access Request - Equihome Partners',
        html: `
          <h2>Regarding Your Access Request</h2>
          <p>Thank you for your interest in accessing the Equihome Deal Room.</p>
          <p>After careful consideration, we are unable to grant access at this time.</p>
          <p>If you have any questions, please contact our team directly.</p>
          <br>
          <p>Best regards,</p>
          <p>Equihome Partners Team</p>
        `
      });
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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log('OpenAI API Key:', process.env.OPENAI_API_KEY ? 'Present' : 'Missing');
});
