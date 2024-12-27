import * as express from 'express';
import { UserActivity } from '../models/UserActivity';
import { NewsletterSubscriber } from '../models/NewsletterSubscriber';

const router = express.Router();

// Track user activity
router.post('/activity', async (req, res) => {
  try {
    const { userId, email, page } = req.body;

    const activity = await UserActivity.findOneAndUpdate(
      { userId },
      {
        $set: {
          email,
          lastActive: new Date()
        },
        $push: {
          visitHistory: {
            page,
            timestamp: new Date()
          }
        }
      },
      { upsert: true, new: true }
    );

    res.json(activity);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update user progress
router.post('/progress', async (req, res) => {
  try {
    const { userId, progress } = req.body;

    const activity = await UserActivity.findOneAndUpdate(
      { userId },
      {
        $set: {
          progress,
          lastActive: new Date()
        }
      },
      { new: true }
    );

    res.json(activity);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Add newsletter subscriber
router.post('/newsletter', async (req, res) => {
  try {
    const { email } = req.body;

    const subscriber = await NewsletterSubscriber.findOneAndUpdate(
      { email },
      {
        $set: {
          subscribedAt: new Date()
        }
      },
      { upsert: true, new: true }
    );

    res.json(subscriber);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router; 