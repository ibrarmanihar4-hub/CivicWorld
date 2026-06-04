// server/src/services/authService.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key_change_in_production';

class AuthService {
  // Register a new user
  async register(userData) {
    const { name, email, password, city, profilePictureUrl } = userData;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw { status: 409, message: 'User already exists' };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      city,
      profilePictureUrl: profilePictureUrl || 'https://via.placeholder.com/150',
    });

    // Generate token
    const token = this.generateToken(newUser._id.toString(), newUser.email);

    return {
      user: this.sanitizeUser(newUser),
      token,
    };
  }

  // Login user
  async login(email, password) {
    const user = await User.findOne({ email });

    if (!user) {
      throw { status: 401, message: 'Invalid email or password' };
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw { status: 401, message: 'Invalid email or password' };
    }

    // Generate token
    const token = this.generateToken(user._id.toString(), user.email);

    return {
      user: this.sanitizeUser(user),
      token,
    };
  }

  // Get user profile
  async getUserProfile(userId) {
    const user = await User.findById(userId);

    if (!user) {
      throw { status: 404, message: 'User not found' };
    }

    return this.sanitizeUser(user);
  }

  // Generate JWT token
  generateToken(userId, email) {
    return jwt.sign(
      { id: userId, email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
  }

  // Verify token
  verifyToken(token) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (err) {
      throw { status: 401, message: 'Invalid or expired token' };
    }
  }

  // Sanitize user data (remove password)
  sanitizeUser(user) {
    const userObj = user.toJSON();
    delete userObj.password;
    return userObj;
  }

  // Get all users (for admin)
  async getAllUsers() {
    const users = await User.find();
    return users.map(u => this.sanitizeUser(u));
  }

  // Update user profile
  async updateUserProfile(userId, updates) {
    const allowedUpdates = {};
    if (updates.name) allowedUpdates.name = updates.name;
    if (updates.city) allowedUpdates.city = updates.city;
    if (updates.profilePictureUrl) allowedUpdates.profilePictureUrl = updates.profilePictureUrl;

    const user = await User.findByIdAndUpdate(userId, allowedUpdates, { new: true });

    if (!user) {
      throw { status: 404, message: 'User not found' };
    }

    return this.sanitizeUser(user);
  }
}

module.exports = new AuthService();
