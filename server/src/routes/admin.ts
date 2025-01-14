import * as express from 'express';
import { UserActivity } from '../models/UserActivity';
import { NewsletterSubscriber } from '../models/NewsletterSubscriber';

const router = express.Router();

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (email.toLowerCase().trim() === 'sujay@equihome.com.au') {
      res.json({ email: email.toLowerCase() });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get admin dashboard metrics
router.get('/metrics', async (req, res) => {
  try {
    console.log('Fetching admin metrics...');
    const [
      totalUsers,
      activeUsers,
      scheduledCalls,
      webinarRegistrations,
      newsletterSubscribers
    ] = await Promise.all([
      UserActivity.countDocuments(),
      UserActivity.countDocuments({
        lastActive: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
      }),
      UserActivity.countDocuments({ 
        'progress.introCallScheduled': true
      }),
      UserActivity.countDocuments({ 
        'progress.webinarRegistered': true
      }),
      NewsletterSubscriber.countDocuments()
    ]);

    res.json({
      totalUsers,
      activeUsers,
      scheduledCalls,
      webinarRegistrations,
      newsletterSubscribers
    });
  } catch (error) {
    console.error('Error fetching metrics:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get recent user activity
router.get('/user-activity', async (req, res) => {
  try {
    const activities = await UserActivity.find()
      .select({
        userId: 1,
        email: 1,
        lastActive: 1,
        lastSignIn: 1,
        visitHistory: 1,
        progress: 1,
        createdAt: 1
      })
      .sort({ lastActive: -1 })
      .limit(50);
    
    res.json(activities);
  } catch (error) {
    console.error('Error fetching user activities:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get newsletter subscribers
router.get('/newsletter-subscribers', async (req, res) => {
  try {
    const subscribers = await NewsletterSubscriber.find()
      .sort({ subscribedAt: -1 });
    
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router; 