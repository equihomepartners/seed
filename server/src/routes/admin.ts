import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { adminAuth } from '../middleware/adminAuth';
import { UserActivity } from '../models/UserActivity';
import { NewsletterSubscriber } from '../models/NewsletterSubscriber';

const router = express.Router();

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Hardcode the credentials temporarily to ensure it works
    const validEmail = 'sujay@equihome.com.au';
    const validPassword = 'equihome2024';

    // Simple direct comparison
    if (email.toLowerCase().trim() === validEmail && password.trim() === validPassword) {
      const token = jwt.sign(
        { email: email.toLowerCase(), role: 'admin' },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );

      res.json({ token, email: email.toLowerCase() });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get admin dashboard metrics
router.get('/metrics', adminAuth, async (req, res) => {
  try {
    console.log('Fetching admin metrics...');
    const [
      totalUsers,
      activeUsers,
      scheduledCalls,
      webinarRegistrations,
      newsletterSubscribers
    ] = await Promise.all([
      UserActivity.countDocuments({
        email: { $exists: true, $ne: null }
      }),
      UserActivity.countDocuments({
        email: { $exists: true, $ne: null },
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

    console.log('Admin metrics:', {
      totalUsers,
      activeUsers,
      scheduledCalls,
      webinarRegistrations,
      newsletterSubscribers
    });

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
router.get('/user-activity', adminAuth, async (req, res) => {
  try {
    console.log('Fetching user activities...');
    const activities = await UserActivity.find({
      email: { $exists: true, $ne: null }
    })
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
    
    console.log(`Found ${activities.length} user activities`);
    res.json(activities);
  } catch (error) {
    console.error('Error fetching user activities:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get newsletter subscribers
router.get('/newsletter-subscribers', adminAuth, async (req, res) => {
  try {
    const subscribers = await NewsletterSubscriber.find()
      .sort({ subscribedAt: -1 });
    
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router; 