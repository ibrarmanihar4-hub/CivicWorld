// server/src/services/commentsService.js
const Comment = require('../models/Comment');

class CommentsService {
  // Add comment to issue
  async addComment(issueId, commentData, userId) {
    const { text } = commentData;

    const newComment = await Comment.create({
      issueId,
      userId,
      text,
    });

    return newComment.toJSON();
  }

  // Get comments for an issue
  async getCommentsByIssue(issueId) {
    const comments = await Comment.find({ issueId });
    return comments.map(c => c.toJSON());
  }

  // Get comment by ID
  async getCommentById(commentId) {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      throw { status: 404, message: 'Comment not found' };
    }

    return comment.toJSON();
  }

  // Update comment
  async updateComment(commentId, text, userId) {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      throw { status: 404, message: 'Comment not found' };
    }

    // Only author can update
    if (comment.userId !== userId) {
      throw { status: 403, message: 'Not authorized to update this comment' };
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { text },
      { new: true }
    );

    return updatedComment.toJSON();
  }

  // Delete comment
  async deleteComment(commentId, userId) {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      throw { status: 404, message: 'Comment not found' };
    }

    // Only author can delete
    if (comment.userId !== userId) {
      throw { status: 403, message: 'Not authorized to delete this comment' };
    }

    await Comment.findByIdAndDelete(commentId);
    return { message: 'Comment deleted successfully' };
  }
}

module.exports = new CommentsService();
