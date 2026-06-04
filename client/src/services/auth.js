// client/src/services/auth.js
import api from './api';

export const authService = {
  register: (name, email, password, city, profilePictureUrl) =>
    api.post('/auth/register', { name, email, password, city, profilePictureUrl }),

  login: (email, password) =>
    api.post('/auth/login', { email, password }),

  getProfile: () =>
    api.get('/auth/profile'),

  updateProfile: (updates) =>
    api.put('/auth/profile', updates),

  getAllUsers: () =>
    api.get('/auth/users'),
};

export const issuesService = {
  getAllIssues: (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.city) params.append('city', filters.city);
    if (filters.category) params.append('category', filters.category);
    if (filters.status) params.append('status', filters.status);
    if (filters.search) params.append('search', filters.search);
    if (filters.sortBy) params.append('sortBy', filters.sortBy);

    return api.get(`/issues?${params.toString()}`);
  },

  getIssueById: (id) =>
    api.get(`/issues/${id}`),

  createIssue: (data) =>
    api.post('/issues', data),

  updateIssue: (id, data) =>
    api.put(`/issues/${id}`, data),

  deleteIssue: (id) =>
    api.delete(`/issues/${id}`),

  upvoteIssue: (id) =>
    api.post(`/issues/${id}/upvote`),

  getTrendingIssues: (limit = 5) =>
    api.get(`/issues/trending/list?limit=${limit}`),

  getIssuesByUser: (userId) =>
    api.get(`/issues/user/${userId}`),

  getDashboardStats: () =>
    api.get('/issues/admin/stats'),
};

export const commentsService = {
  getCommentsByIssue: (issueId) =>
    api.get(`/comments/issue/${issueId}`),

  addComment: (issueId, text) =>
    api.post(`/comments/issue/${issueId}`, { text }),

  updateComment: (id, text) =>
    api.put(`/comments/${id}`, { text }),

  deleteComment: (id) =>
    api.delete(`/comments/${id}`),
};
