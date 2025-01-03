import express from 'express';
import { UserActivity } from '../models/UserActivity';
import mongoose from 'mongoose';

const router = express.Router();

// Helper function to retry database operations
const retryOperation = async (operation: () => Promise<any>, maxRetries = 3) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      if (attempt === maxRetries) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    }
  }
};

// Track user activity (page views, etc)
router.post('/activity', async (req, res) => {
  try {
    console.log('Received activity tracking request:', req.body);
    const { userId, email, page } = req.body;

    if (!userId || !email || !page) {
      console.log('Missing required fields:', { userId, email, page });
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check MongoDB connection
    if (mongoose.connection.readyState !== 1) {
      console.error('MongoDB not connected. Current state:', mongoose.connection.readyState);
      return res.status(503).json({ error: 'Database connection unavailable' });
    }

    // Find or create user activity document
    let userActivity = await UserActivity.findOne({ userId });

    if (!userActivity) {
      console.log('Creating new user activity record for:', userId);
      userActivity = new UserActivity({
        userId,
        email,
        lastActive: new Date(),
        visitHistory: []
      });
    }

    // Add page view to history
    userActivity.visitHistory.push({
      page,
      timestamp: new Date()
    });

    // Update last active
    userActivity.lastActive = new Date();
    userActivity.email = email;

    console.log('Saving user activity...');
    await userActivity.save();
    console.log('User activity saved successfully');

    res.json({ success: true });
  } catch (error) {
    console.error('Error tracking activity:', error);
    if (error instanceof Error) {
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
    }
    res.status(500).json({ error: 'Error tracking activity' });
  }
});

// Track user progress
router.post('/progress', async (req, res) => {
  try {
    const { userId, progress } = req.body;

    if (!userId || !progress) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    await retryOperation(async () => {
      // Find or create user activity document with timeout
      let userActivity = await UserActivity.findOne({ userId }).maxTimeMS(5000);

      if (!userActivity) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Update progress
      userActivity.progress = {
        ...userActivity.progress,
        ...progress
      };

      await userActivity.save({ wtimeout: 5000 });
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Error updating progress:', error);
    res.status(500).json({ error: 'Error updating progress' });
  }
});

// Track user sign-in
router.post('/signin', async (req, res) => {
  try {
    const { userId, email } = req.body;

    if (!userId || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    await retryOperation(async () => {
      // Find or create user activity document with timeout
      let userActivity = await UserActivity.findOne({ userId }).maxTimeMS(5000);

      if (!userActivity) {
        userActivity = new UserActivity({
          userId,
          email,
          lastActive: new Date(),
          visitHistory: []
        });
      }

      // Update last sign in
      userActivity.lastSignIn = new Date();
      userActivity.email = email; // Keep email up to date
      await userActivity.save({ wtimeout: 5000 });
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Error tracking signin:', error);
    res.status(500).json({ error: 'Error tracking signin' });
  }
});

export default router; 