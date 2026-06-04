// server/src/routes/issues.js
const express = require('express');
const router = express.Router();
const issuesController = require('../controllers/issuesController');
const authMiddleware = require('../middleware/auth');

// Get all issues (with filtering and sorting)
router.get('/', issuesController.getAllIssues);

// Get trending issues
router.get('/trending/list', issuesController.getTrendingIssues);

// Get dashboard stats
router.get('/admin/stats', authMiddleware, issuesController.getDashboardStats);

// Create issue
router.post('/', authMiddleware, issuesController.createIssue);

// Get issue by ID
router.get('/:id', issuesController.getIssueById);

// Update issue
router.put('/:id', authMiddleware, issuesController.updateIssue);

// Delete issue
router.delete('/:id', authMiddleware, issuesController.deleteIssue);

// Upvote issue
router.post('/:id/upvote', authMiddleware, issuesController.upvoteIssue);

// Get issues by user
router.get('/user/:userId', issuesController.getIssuesByUser);

module.exports = router;
