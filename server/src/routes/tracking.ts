import express from 'express';
import { UserActivity } from '../models/UserActivity';

const router = express.Router();

// Track user activity (page views, etc)
router.post('/activity', async (req, res) => {
  try {
    const { userId, email, page } = req.body;

    if (!userId || !email || !page) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Find or create user activity document
    let userActivity = await UserActivity.findOne({ userId });

    if (!userActivity) {
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

    await userActivity.save();

    res.json({ success: true });
  } catch (error) {
    console.error('Error tracking activity:', error);
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

    // Find or create user activity document
    let userActivity = await UserActivity.findOne({ userId });

    if (!userActivity) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update progress
    userActivity.progress = {
      ...userActivity.progress,
      ...progress
    };

    await userActivity.save();

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

    // Find or create user activity document
    let userActivity = await UserActivity.findOne({ userId });

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
    await userActivity.save();

    res.json({ success: true });
  } catch (error) {
    console.error('Error tracking signin:', error);
    res.status(500).json({ error: 'Error tracking signin' });
  }
});

export default router; 