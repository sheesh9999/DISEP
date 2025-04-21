import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { register, login, logout } from './controllers/auth';
import { getProfile, updateProfile } from './controllers/profile';
import { getAllDrugs, checkInteraction, addInteraction } from './controllers/drugInteraction';
import { protect } from './middleware/auth';
import sequelize from './config/database';
import { seedDrugs } from './seeders/drugData';

// Import models with associations
import './models/index';

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Set up middleware
app.use(cors({
  origin: ['http://localhost:3001', 'http://127.0.0.1:3001', 'http://10.20.65.88:3001'], // Allow specific origins
  credentials: true, // Allow credentials
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// Test database connection and sync models
sequelize.authenticate()
  .then(() => {
    console.log('Connected to SQLite database successfully');
    return sequelize.sync({ alter: true }); // This will update tables without dropping data
  })
  .then(async () => {
    console.log('Database synchronized successfully');
    // Seed initial data
    try {
      await seedDrugs();
    } catch (error) {
      console.error('Error seeding data:', error);
    }
  })
  .catch((err) => {
    console.error('Database connection error:', err);
    process.exit(1);
  });

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'MediPredict API is running' });
});

// Auth routes
app.post('/api/auth/register', register);
app.post('/api/auth/login', login);
app.post('/api/auth/logout', protect, logout);

// Profile routes
app.get('/api/profile', protect, getProfile);
app.put('/api/profile', protect, updateProfile);

// Drug interaction routes
app.get('/api/drugs', getAllDrugs);
app.get('/api/interactions/:drug1Id/:drug2Id', checkInteraction);
app.post('/api/interactions', protect, addInteraction);

// Protected route
app.get('/api/user/profile', protect, (req, res) => {
  res.json({
    status: 'success',
    data: {
      user: req.user
    }
  });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Internal server error'
  });
});

// Start server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 