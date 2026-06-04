// server/index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./src/config/database');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/issues', require('./src/routes/issues'));
app.use('/api/comments', require('./src/routes/comments'));

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'CivicConnect API is running' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error'
  });
});

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`🚀 CivicConnect API running on http://localhost:${port}`);
  });
});
