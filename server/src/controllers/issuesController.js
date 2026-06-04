// server/src/controllers/issuesController.js
const issuesService = require('../services/issuesService');

class IssuesController {
  // Get all issues with filtering
  async getAllIssues(req, res) {
    try {
      const filters = {
        city: req.query.city,
        category: req.query.category,
        status: req.query.status,
        search: req.query.search,
        sortBy: req.query.sortBy || 'latest'
      };

      const issues = issuesService.getAllIssues(filters);
      res.json(issues);
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message });
    }
  }

  // Get issue by ID
  async getIssueById(req, res) {
    try {
      const issue = issuesService.getIssueById(req.params.id);
      res.json(issue);
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message });
    }
  }

  // Create issue
  async createIssue(req, res) {
    try {
      const { title, description, category, city, location, imageUrl } = req.body;

      if (!title || !description || !category || !city || !location) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const issue = issuesService.createIssue(
        { title, description, category, city, location, imageUrl },
        req.user.id
      );

      res.status(201).json(issue);
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message });
    }
  }

  // Update issue
  async updateIssue(req, res) {
    try {
      const issue = issuesService.updateIssue(
        req.params.id,
        req.body,
        req.user.id
      );

      res.json(issue);
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message });
    }
  }

  // Delete issue
  async deleteIssue(req, res) {
    try {
      const result = issuesService.deleteIssue(req.params.id, req.user.id);
      res.json(result);
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message });
    }
  }

  // Upvote issue
  async upvoteIssue(req, res) {
    try {
      const issue = issuesService.upvoteIssue(req.params.id, req.user.id);
      res.json(issue);
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message });
    }
  }

  // Get trending issues
  async getTrendingIssues(req, res) {
    try {
      const limit = req.query.limit || 5;
      const issues = issuesService.getTrendingIssues(parseInt(limit));
      res.json(issues);
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message });
    }
  }

  // Get issues by user
  async getIssuesByUser(req, res) {
    try {
      const issues = issuesService.getIssuesByUser(req.params.userId);
      res.json(issues);
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message });
    }
  }

  // Get dashboard stats
  async getDashboardStats(req, res) {
    try {
      const stats = issuesService.getDashboardStats();
      res.json(stats);
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message });
    }
  }
}

module.exports = new IssuesController();
