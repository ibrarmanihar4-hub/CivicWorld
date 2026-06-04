// server/src/controllers/authController.js
const authService = require('../services/authService');

class AuthController {
  // Register
  async register(req, res) {
    try {
      const { name, email, password, city, profilePictureUrl } = req.body;

      if (!name || !email || !password || !city) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const result = await authService.register({
        name,
        email,
        password,
        city,
        profilePictureUrl
      });

      res.status(201).json(result);
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message });
    }
  }

  // Login
  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      const result = await authService.login(email, password);
      res.json(result);
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message });
    }
  }

  // Get profile
  async getProfile(req, res) {
    try {
      const user = authService.getUserProfile(req.user.id);
      res.json(user);
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message });
    }
  }

  // Update profile
  async updateProfile(req, res) {
    try {
      const { name, city, profilePictureUrl } = req.body;

      const updated = authService.updateUserProfile(req.user.id, {
        name,
        city,
        profilePictureUrl
      });

      res.json(updated);
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message });
    }
  }

  // Get all users
  async getAllUsers(req, res) {
    try {
      const users = authService.getAllUsers();
      res.json(users);
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message });
    }
  }
}

module.exports = new AuthController();
