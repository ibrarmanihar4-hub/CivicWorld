// server/src/controllers/commentsController.js
const commentsService = require('../services/commentsService');

class CommentsController {
  // Get comments for an issue
  async getCommentsByIssue(req, res) {
    try {
      const comments = commentsService.getCommentsByIssue(req.params.issueId);
      res.json(comments);
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message });
    }
  }

  // Add comment
  async addComment(req, res) {
    try {
      const { text } = req.body;

      if (!text) {
        return res.status(400).json({ error: 'Comment text is required' });
      }

      const comment = commentsService.addComment(
        req.params.issueId,
        { text },
        req.user.id
      );

      res.status(201).json(comment);
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message });
    }
  }

  // Update comment
  async updateComment(req, res) {
    try {
      const { text } = req.body;

      if (!text) {
        return res.status(400).json({ error: 'Comment text is required' });
      }

      const comment = commentsService.updateComment(
        req.params.id,
        text,
        req.user.id
      );

      res.json(comment);
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message });
    }
  }

  // Delete comment
  async deleteComment(req, res) {
    try {
      const result = commentsService.deleteComment(req.params.id, req.user.id);
      res.json(result);
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message });
    }
  }
}

module.exports = new CommentsController();
