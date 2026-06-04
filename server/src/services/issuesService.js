// server/src/services/issuesService.js

// In-memory issues storage
const issues = [];

class IssuesService {
  // Create a new issue
  createIssue(issueData, userId) {
    const {
      title,
      description,
      category,
      city,
      location,
      imageUrl
    } = issueData;

    const newIssue = {
      id: Date.now().toString(),
      title,
      description,
      category,
      city,
      location,
      imageUrl: imageUrl || 'https://via.placeholder.com/500',
      reporterId: userId,
      status: 'open',
      upvoteCount: 0,
      upvoters: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    issues.push(newIssue);
    return newIssue;
  }

  // Get all issues with filtering and sorting
  getAllIssues(filters = {}) {
    let filteredIssues = [...issues];

    // Filter by city
    if (filters.city) {
      filteredIssues = filteredIssues.filter(i => i.city.toLowerCase() === filters.city.toLowerCase());
    }

    // Filter by category
    if (filters.category) {
      filteredIssues = filteredIssues.filter(i => i.category === filters.category);
    }

    // Filter by status
    if (filters.status) {
      filteredIssues = filteredIssues.filter(i => i.status === filters.status);
    }

    // Search by title or location
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredIssues = filteredIssues.filter(i =>
        i.title.toLowerCase().includes(searchTerm) ||
        i.location.toLowerCase().includes(searchTerm) ||
        i.description.toLowerCase().includes(searchTerm)
      );
    }

    // Sorting
    if (filters.sortBy === 'mostUpvoted') {
      filteredIssues.sort((a, b) => b.upvoteCount - a.upvoteCount);
    } else if (filters.sortBy === 'leastUpvoted') {
      filteredIssues.sort((a, b) => a.upvoteCount - b.upvoteCount);
    } else if (filters.sortBy === 'latest') {
      filteredIssues.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (filters.sortBy === 'oldest') {
      filteredIssues.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    return filteredIssues;
  }

  // Get issue by ID
  getIssueById(issueId) {
    const issue = issues.find(i => i.id === issueId);

    if (!issue) {
      throw { status: 404, message: 'Issue not found' };
    }

    return issue;
  }

  // Update issue
  updateIssue(issueId, updates, userId) {
    const issue = this.getIssueById(issueId);

    // Only reporter or admin can update
    if (issue.reporterId !== userId) {
      throw { status: 403, message: 'Not authorized to update this issue' };
    }

    if (updates.title) issue.title = updates.title;
    if (updates.description) issue.description = updates.description;
    if (updates.category) issue.category = updates.category;
    if (updates.status) issue.status = updates.status;
    if (updates.location) issue.location = updates.location;
    if (updates.imageUrl) issue.imageUrl = updates.imageUrl;

    issue.updatedAt = new Date().toISOString();

    return issue;
  }

  // Delete issue
  deleteIssue(issueId, userId) {
    const index = issues.findIndex(i => i.id === issueId);

    if (index === -1) {
      throw { status: 404, message: 'Issue not found' };
    }

    const issue = issues[index];

    // Only reporter or admin can delete
    if (issue.reporterId !== userId) {
      throw { status: 403, message: 'Not authorized to delete this issue' };
    }

    issues.splice(index, 1);
    return { message: 'Issue deleted successfully' };
  }

  // Upvote issue
  upvoteIssue(issueId, userId) {
    const issue = this.getIssueById(issueId);

    // Check if user already upvoted
    if (issue.upvoters.includes(userId)) {
      // Remove upvote
      issue.upvoters = issue.upvoters.filter(id => id !== userId);
      issue.upvoteCount--;
    } else {
      // Add upvote
      issue.upvoters.push(userId);
      issue.upvoteCount++;
    }

    return issue;
  }

  // Get trending issues (top 5 most upvoted)
  getTrendingIssues(limit = 5) {
    return issues
      .sort((a, b) => b.upvoteCount - a.upvoteCount)
      .slice(0, limit);
  }

  // Get issues by user
  getIssuesByUser(userId) {
    return issues.filter(i => i.reporterId === userId);
  }

  // Get admin dashboard stats
  getDashboardStats() {
    return {
      totalIssues: issues.length,
      openIssues: issues.filter(i => i.status === 'open').length,
      resolvedIssues: issues.filter(i => i.status === 'resolved').length,
      pendingIssues: issues.filter(i => i.status === 'pending').length,
    };
  }
}

module.exports = new IssuesService();
