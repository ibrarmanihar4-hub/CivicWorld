// server/src/routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

// Register
router.post('/register', authController.register);

// Login
router.post('/login', authController.login);

// Get profile
router.get('/profile', authMiddleware, authController.getProfile);

// Update profile
router.put('/profile', authMiddleware, authController.updateProfile);

// Get all users (admin)
router.get('/users', authMiddleware, authController.getAllUsers);

module.exports = router;
