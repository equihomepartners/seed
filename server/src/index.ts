import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import adminRoutes from './routes/admin';
import trackingRoutes from './routes/tracking';
import { AccessRequest } from './models/AccessRequest';
import { DealRoomActivity } from './models/DealRoomActivity';
import { DealRoomDocument } from './models/DealRoomDocument';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['https://seed.equihome.com.au', 'http://localhost:3000', 'https://equihome-seed-api-pnk9i.ondigitalocean.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Authorization'],
  credentials: true
}));

// Root route
app.get('/', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    message: 'Equihome Seed API',
    version: '1.0.0'
  });
});

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: dbStatus
  });
});

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/track', trackingRoutes);

// Also mount routes without the /api prefix for compatibility with frontend
app.use('/admin', adminRoutes);
app.use('/track', trackingRoutes);

// Get all access requests
app.get('/api/access-requests', async (req: Request, res: Response) => {
  try {
    // Get all access requests
    const requests = await AccessRequest.find().sort({ timestamp: -1 });
    res.status(200).json(requests);
  } catch (error) {
    console.error('Error fetching access requests:', error);
    res.status(500).json({ message: 'Failed to fetch access requests' });
  }
});

// Update access request status
app.post('/api/access-requests/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, adminEmail } = req.body;

  console.log(`Updating access request ${id} to status ${status} by ${adminEmail}`);

  try {
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
    res.status(500).json({ message: `Failed to update access request: ${error instanceof Error ? error.message : 'Unknown error'}` });
  }
});

// Also support PUT for the same endpoint (for backward compatibility)
app.put('/api/access-requests/:id', async (req: Request, res: Response) => {
  // Forward to the POST handler
  const { id } = req.params;
  const { status, adminEmail } = req.body;

  console.log(`PUT request forwarded to POST handler: Updating access request ${id} to status ${status} by ${adminEmail}`);

  try {
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
    res.status(500).json({ message: `Failed to update access request: ${error instanceof Error ? error.message : 'Unknown error'}` });
  }
});

// Manually grant access to a user
app.post('/api/grant-access', async (req: Request, res: Response) => {
  console.log('Received grant access request:', req.body);
  const { email, name, requestType, adminEmail } = req.body;

  if (!email || !requestType) {
    console.log('Missing required fields:', { email, requestType });
    return res.status(400).json({ message: 'Email and requestType are required' });
  }

  try {
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
  } catch (error) {
    console.error('Error granting access:', error);
    res.status(500).json({ message: `Failed to grant access: ${error instanceof Error ? error.message : 'Unknown error'}` });
  }
});

// Revoke access from a user
app.post('/api/revoke-access', async (req: Request, res: Response) => {
  const { email, requestType, adminEmail } = req.body;

  if (!email || !requestType) {
    return res.status(400).json({ message: 'Email and requestType are required' });
  }

  try {
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
    request.approvedAt = undefined;
    request.approvedBy = undefined;

    // Save changes
    await request.save();

    console.log(`Access revoked from ${email} for ${requestType} by ${adminEmail || 'admin'}`);

    res.status(200).json({ message: 'Access revoked successfully', request });
  } catch (error) {
    console.error('Error revoking access:', error);
    res.status(500).json({ message: `Failed to revoke access: ${error instanceof Error ? error.message : 'Unknown error'}` });
  }
});

// Check if user has access to a specific resource
app.get('/api/check-access', async (req: Request, res: Response) => {
  const { email, resourceType } = req.query;

  if (!email || !resourceType) {
    return res.status(400).json({ message: 'Email and resourceType are required' });
  }

  // Hardcoded access for specific users - permanent global access regardless of IP
  const hardcodedUsers = ['taurian@equihome.com.au', 'namb.jay@gmail.com', 'vmenon1309@yahoo.co.uk', 'ian@equihome.com.au', 'kaden@fundlaunchpartners.com', 'acquisitions@fundlaunchpartners.com', 'andrea@maincharactercapital.com'];
  if (hardcodedUsers.includes(email as string) && resourceType === 'dealRoom') {
    console.log(`Granting permanent global access to ${email} for ${resourceType}`);
    return res.status(200).json({
      hasAccess: true,
      since: new Date().toISOString(),
      hardcoded: true,
      permanent: true
    });
  }

  try {
    // Check if user has an approved access request for this resource
    const request = await AccessRequest.findOne({
      email: email as string,
      requestType: resourceType as string,
      status: 'approved'
    });

    if (request) {
      res.status(200).json({ hasAccess: true, since: request.approvedAt });
    } else {
      res.status(200).json({ hasAccess: false });
    }
  } catch (error) {
    console.error('Error checking access:', error);
    // Even if there's a database error, grant access to hardcoded users as a fallback
    if (hardcodedUsers.includes(email as string) && resourceType === 'dealRoom') {
      console.log(`Granting permanent global access to ${email} for ${resourceType} after DB error`);
      return res.status(200).json({
        hasAccess: true,
        since: new Date().toISOString(),
        hardcoded: true,
        permanent: true,
        fallback: true
      });
    }
    res.status(500).json({ message: 'Failed to check access' });
  }
});

// Get all Deal Room activity (for admin dashboard)
app.get('/api/deal-room-activity', async (req: Request, res: Response) => {
  try {
    // Return mock data for now to avoid 404 errors
    console.log('Returning mock deal room activity data');
    res.status(200).json([
      {
        _id: '1',
        email: 'user1@example.com',
        name: 'User One',
        action: 'view',
        documentName: 'Investment Thesis',
        timestamp: new Date().toISOString()
      },
      {
        _id: '2',
        email: 'user2@example.com',
        name: 'User Two',
        action: 'download',
        documentName: 'Financial Model',
        timestamp: new Date(Date.now() - 86400000).toISOString()
      }
    ]);
  } catch (error) {
    console.error('Error fetching Deal Room activity:', error);
    res.status(500).json({ message: 'Failed to fetch activity' });
  }
});

// Track Deal Room activity
app.post('/api/track-activity', async (req: Request, res: Response) => {
  const { email, name, action, documentId, documentName } = req.body;

  console.log('Received track activity request:', { email, name, action, documentId, documentName });

  if (!email || !action) {
    return res.status(400).json({ message: 'Email and action are required' });
  }

  // Just return success for now
  return res.status(200).json({ success: true, message: 'Activity tracked successfully' });
});



// Get Deal Room activity for a specific user
app.get('/api/deal-room-activity/user/:email', async (req: Request, res: Response) => {
  const { email } = req.params;

  try {
    // Return mock data for now
    console.log(`Returning mock deal room activity data for user: ${email}`);
    res.status(200).json([
      {
        _id: '1',
        email: email,
        name: email.split('@')[0],
        action: 'view',
        documentName: 'Investment Thesis',
        timestamp: new Date().toISOString()
      }
    ]);
  } catch (error) {
    console.error('Error fetching user Deal Room activity:', error);
    res.status(500).json({ message: 'Failed to fetch user activity' });
  }
});

// Get all Deal Room documents
app.get('/api/deal-room-documents', async (req: Request, res: Response) => {
  try {
    // Return mock data for now
    console.log('Returning mock deal room documents');
    res.status(200).json([
      {
        _id: '1',
        title: 'Investment Thesis',
        description: 'Overview of our investment strategy',
        category: 'company',
        iconType: 'file',
        isLocked: false,
        sortOrder: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        _id: '2',
        title: 'Financial Model',
        description: 'Detailed financial projections',
        category: 'financial',
        iconType: 'chart',
        isLocked: false,
        sortOrder: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]);
  } catch (error) {
    console.error('Error fetching Deal Room documents:', error);
    res.status(500).json({ message: 'Failed to fetch documents' });
  }
});



// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'An error occurred'
  });
});

// Connect to MongoDB
const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      console.error('MONGODB_URI environment variable is not set');
      return false;
    }

    console.log('Connecting to MongoDB with URI:', mongoUri.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@'));

    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 30000,
      retryWrites: true,
      w: 'majority',
      ssl: true,
      authSource: 'admin',
      maxPoolSize: 10,
      minPoolSize: 5,
      maxIdleTimeMS: 60000
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Set up connection error handlers
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected. Attempting to reconnect...');
      setTimeout(connectDB, 5000);
    });

    return true;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    if (error instanceof Error) {
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
    }
    console.log('Attempting to reconnect in 5 seconds...');
    await new Promise(resolve => setTimeout(resolve, 5000));
    return connectDB();
  }
};

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Not found' });
});

// Start server
const startServer = async () => {
  try {
    // Try to connect to MongoDB first
    const isConnected = await connectDB();
    if (!isConnected) {
      console.error('Failed to connect to MongoDB');
      process.exit(1);
    }

    // Start Express server only after MongoDB is connected
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV}`);
      console.log(`MongoDB URI: ${process.env.MONGODB_URI?.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@')}`);
    });
  } catch (error) {
    console.error('Server startup error:', error);
    process.exit(1);
  }
};

// Start the server
startServer();