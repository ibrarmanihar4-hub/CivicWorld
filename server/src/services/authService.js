// server/src/services/authService.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// In-memory user storage
const users = [];

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key_change_in_production';

class AuthService {
  // Register a new user
  async register(userData) {
    const { name, email, password, city, profilePictureUrl } = userData;

    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      throw { status: 409, message: 'User already exists' };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
      city,
      profilePictureUrl: profilePictureUrl || 'https://via.placeholder.com/150',
      createdAt: new Date().toISOString(),
      totalPosts: 0,
      totalUpvotes: 0,
    };

    users.push(newUser);

    // Generate token
    const token = this.generateToken(newUser.id, newUser.email);

    return {
      user: this.sanitizeUser(newUser),
      token
    };
  }

  // Login user
  async login(email, password) {
    const user = users.find(u => u.email === email);

    if (!user) {
      throw { status: 401, message: 'Invalid email or password' };
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw { status: 401, message: 'Invalid email or password' };
    }

    // Generate token
    const token = this.generateToken(user.id, user.email);

    return {
      user: this.sanitizeUser(user),
      token
    };
  }

  // Get user profile
  getUserProfile(userId) {
    const user = users.find(u => u.id === userId);

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
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  // Get all users (for admin)
  getAllUsers() {
    return users.map(u => this.sanitizeUser(u));
  }

  // Update user profile
  updateUserProfile(userId, updates) {
    const user = users.find(u => u.id === userId);

    if (!user) {
      throw { status: 404, message: 'User not found' };
    }

    if (updates.name) user.name = updates.name;
    if (updates.city) user.city = updates.city;
    if (updates.profilePictureUrl) user.profilePictureUrl = updates.profilePictureUrl;

    return this.sanitizeUser(user);
  }
}

module.exports = new AuthService();
