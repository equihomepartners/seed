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

// Track user sign-in
router.post('/signin', async (req, res) => {
  try {
    console.log('Received sign-in request:', req.body);
    const { userId, email } = req.body;

    if (!userId || !email) {
      console.error('Missing required fields:', { userId, email });
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if user exists
    let activity = await UserActivity.findOne({ userId });
    
    if (!activity) {
      // New user
      activity = await UserActivity.create({
        userId,
        email,
        lastActive: new Date(),
        createdAt: new Date(),
        progress: {
          businessPitchViewed: false,
          portfolioOSViewed: false,
          introCallScheduled: false,
          interestRegistered: false,
          webinarRegistered: false
        },
        visitHistory: []
      });
      console.log('Created new user:', activity);
    } else {
      // Existing user - update last active
      activity = await UserActivity.findOneAndUpdate(
        { userId },
        {
          $set: {
            lastActive: new Date()
          }
        },
        { new: true }
      );
      console.log('Updated existing user:', activity);
    }

    res.json(activity);
  } catch (error) {
    console.error('Error tracking sign-in:', error);
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