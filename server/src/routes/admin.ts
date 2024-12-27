import * as express from 'express';
import { adminAuth } from '../middleware/adminAuth';
import { UserActivity } from '../models/UserActivity';
import { NewsletterSubscriber } from '../models/NewsletterSubscriber';

const router = express.Router();

// Get admin dashboard metrics
router.get('/metrics', adminAuth, async (req, res) => {
  try {
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
      UserActivity.countDocuments({ 'progress.introCallScheduled': true }),
      UserActivity.countDocuments({ 'progress.webinarRegistered': true }),
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
    res.status(500).json({ error: 'Server error' });
  }
});

// Get recent user activity
router.get('/user-activity', adminAuth, async (req, res) => {
  try {
    const activities = await UserActivity.find()
      .sort({ lastActive: -1 })
      .limit(50);
    
    res.json(activities);
  } catch (error) {
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