// server/src/routes/comments.js
const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController');
const authMiddleware = require('../middleware/auth');

// Get comments for an issue
router.get('/issue/:issueId', commentsController.getCommentsByIssue);

// Add comment
router.post('/issue/:issueId', authMiddleware, commentsController.addComment);

// Update comment
router.put('/:id', authMiddleware, commentsController.updateComment);

// Delete comment
router.delete('/:id', authMiddleware, commentsController.deleteComment);

module.exports = router;
