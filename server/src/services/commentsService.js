// server/src/services/commentsService.js

// In-memory comments storage
const comments = [];

class CommentsService {
  // Add comment to issue
  addComment(issueId, commentData, userId) {
    const { text } = commentData;

    const newComment = {
      id: Date.now().toString(),
      issueId,
      userId,
      text,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    comments.push(newComment);
    return newComment;
  }

  // Get comments for an issue
  getCommentsByIssue(issueId) {
    return comments.filter(c => c.issueId === issueId);
  }

  // Get comment by ID
  getCommentById(commentId) {
    const comment = comments.find(c => c.id === commentId);

    if (!comment) {
      throw { status: 404, message: 'Comment not found' };
    }

    return comment;
  }

  // Update comment
  updateComment(commentId, text, userId) {
    const comment = this.getCommentById(commentId);

    // Only author can update
    if (comment.userId !== userId) {
      throw { status: 403, message: 'Not authorized to update this comment' };
    }

    comment.text = text;
    comment.updatedAt = new Date().toISOString();

    return comment;
  }

  // Delete comment
  deleteComment(commentId, userId) {
    const index = comments.findIndex(c => c.id === commentId);

    if (index === -1) {
      throw { status: 404, message: 'Comment not found' };
    }

    const comment = comments[index];

    // Only author can delete
    if (comment.userId !== userId) {
      throw { status: 403, message: 'Not authorized to delete this comment' };
    }

    comments.splice(index, 1);
    return { message: 'Comment deleted successfully' };
  }
}

module.exports = new CommentsService();
