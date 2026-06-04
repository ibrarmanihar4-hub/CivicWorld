// server/src/services/issuesService.js
const Issue = require('../models/Issue');

class IssuesService {
  // Create a new issue
  async createIssue(issueData, userId) {
    const { title, description, category, city, location, imageUrl } = issueData;

    const newIssue = await Issue.create({
      title,
      description,
      category,
      city,
      location,
      imageUrl: imageUrl || 'https://via.placeholder.com/500',
      reporterId: userId,
    });

    return newIssue.toJSON();
  }

  // Get all issues with filtering and sorting
  async getAllIssues(filters = {}) {
    const query = {};

    // Filter by city (case-insensitive)
    if (filters.city) {
      query.city = new RegExp(`^${filters.city}$`, 'i');
    }

    // Filter by category
    if (filters.category) {
      query.category = filters.category;
    }

    // Filter by status
    if (filters.status) {
      query.status = filters.status;
    }

    // Search by title, description, or location
    if (filters.search) {
      const searchRegex = new RegExp(filters.search, 'i');
      query.$or = [
        { title: searchRegex },
        { description: searchRegex },
        { location: searchRegex },
      ];
    }

    // Determine sort order
    let sortOption = { createdAt: -1 }; // default: latest
    if (filters.sortBy === 'mostUpvoted') {
      sortOption = { upvoteCount: -1 };
    } else if (filters.sortBy === 'leastUpvoted') {
      sortOption = { upvoteCount: 1 };
    } else if (filters.sortBy === 'latest') {
      sortOption = { createdAt: -1 };
    } else if (filters.sortBy === 'oldest') {
      sortOption = { createdAt: 1 };
    }

    const issues = await Issue.find(query).sort(sortOption);
    return issues.map(issue => issue.toJSON());
  }

  // Get issue by ID
  async getIssueById(issueId) {
    const issue = await Issue.findById(issueId);

    if (!issue) {
      throw { status: 404, message: 'Issue not found' };
    }

    return issue.toJSON();
  }

  // Update issue
  async updateIssue(issueId, updates, userId) {
    const issue = await Issue.findById(issueId);

    if (!issue) {
      throw { status: 404, message: 'Issue not found' };
    }

    // Only reporter can update
    if (issue.reporterId !== userId) {
      throw { status: 403, message: 'Not authorized to update this issue' };
    }

    const allowedUpdates = {};
    if (updates.title) allowedUpdates.title = updates.title;
    if (updates.description) allowedUpdates.description = updates.description;
    if (updates.category) allowedUpdates.category = updates.category;
    if (updates.status) allowedUpdates.status = updates.status;
    if (updates.location) allowedUpdates.location = updates.location;
    if (updates.imageUrl) allowedUpdates.imageUrl = updates.imageUrl;

    const updatedIssue = await Issue.findByIdAndUpdate(issueId, allowedUpdates, { new: true });
    return updatedIssue.toJSON();
  }

  // Delete issue
  async deleteIssue(issueId, userId) {
    const issue = await Issue.findById(issueId);

    if (!issue) {
      throw { status: 404, message: 'Issue not found' };
    }

    // Only reporter can delete
    if (issue.reporterId !== userId) {
      throw { status: 403, message: 'Not authorized to delete this issue' };
    }

    await Issue.findByIdAndDelete(issueId);
    return { message: 'Issue deleted successfully' };
  }

  // Upvote issue
  async upvoteIssue(issueId, userId) {
    const issue = await Issue.findById(issueId);

    if (!issue) {
      throw { status: 404, message: 'Issue not found' };
    }

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

    await issue.save();
    return issue.toJSON();
  }

  // Get trending issues (top most upvoted)
  async getTrendingIssues(limit = 5) {
    const issues = await Issue.find().sort({ upvoteCount: -1 }).limit(limit);
    return issues.map(issue => issue.toJSON());
  }

  // Get issues by user
  async getIssuesByUser(userId) {
    const issues = await Issue.find({ reporterId: userId });
    return issues.map(issue => issue.toJSON());
  }

  // Get admin dashboard stats
  async getDashboardStats() {
    const [totalIssues, openIssues, resolvedIssues, pendingIssues] = await Promise.all([
      Issue.countDocuments(),
      Issue.countDocuments({ status: 'open' }),
      Issue.countDocuments({ status: 'resolved' }),
      Issue.countDocuments({ status: 'pending' }),
    ]);

    return {
      totalIssues,
      openIssues,
      resolvedIssues,
      pendingIssues,
    };
  }
}

module.exports = new IssuesService();
