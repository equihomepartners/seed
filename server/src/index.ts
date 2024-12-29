import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import adminRoutes from './routes/admin';
import trackingRoutes from './routes/tracking';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/equihome', {
  serverSelectionTimeoutMS: 5000
})
.then(() => {
  console.log('Connected to MongoDB successfully');
  if (mongoose.connection.db) {
    console.log('Database:', mongoose.connection.db.databaseName);
  }
})
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

mongoose.connection.on('error', err => {
  console.error('MongoDB error:', err);
});

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/track', trackingRoutes);

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 