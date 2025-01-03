import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { adminAuth } from '../middleware/adminAuth';
import { UserActivity } from '../models/UserActivity';
import { NewsletterSubscriber } from '../models/NewsletterSubscriber';

const router = express.Router();

// Admin login
router.post('/login', async (req, res) => {
  try {
    console.log('Admin login attempt received:', { email: req.body.email });
    const { email, password } = req.body;
    
    if (!email || !password) {
      console.log('Login failed: Missing email or password');
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    console.log('Checking credentials...');
    console.log('Admin email from env:', adminEmail);
    console.log('Provided email:', email.toLowerCase());

    // Check if email and password match
    if (email.toLowerCase() !== adminEmail?.toLowerCase() || 
        password !== adminPassword) {
      console.log('Login failed: Invalid credentials for:', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { email: email.toLowerCase(), role: 'admin' },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    console.log('Admin login successful for:', email);
    res.json({ 
      token,
      email: email.toLowerCase()
    });
  } catch (error) {
    console.error('Admin login error:', error);
    if (error instanceof Error) {
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
    }
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