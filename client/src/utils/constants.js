// client/src/utils/constants.js

export const ISSUE_CATEGORIES = [
  'Road Damage',
  'Garbage',
  'Water Leakage',
  'Street Light',
  'Electricity',
  'Public Sanitation',
  'Traffic',
  'Pollution',
  'Other'
];

export const ISSUE_STATUSES = ['open', 'pending', 'resolved', 'closed'];

export const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'mostUpvoted', label: 'Most Upvoted' },
  { value: 'leastUpvoted', label: 'Least Upvoted' },
];

export const API_BASE_URL = 'http://localhost:5000/api';
