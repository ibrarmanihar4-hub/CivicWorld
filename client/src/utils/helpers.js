// client/src/utils/helpers.js

export function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
  });
}

export function truncateText(text, maxLength = 150) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function getStatusColor(status) {
  const colors = {
    open: '#ff6b6b',
    pending: '#ffa500',
    resolved: '#51cf66',
    closed: '#868e96'
  };
  return colors[status] || '#868e96';
}

export function getStatusBgColor(status) {
  const colors = {
    open: '#ffe0e0',
    pending: '#fff3e0',
    resolved: '#e8f5e9',
    closed: '#f5f5f5'
  };
  return colors[status] || '#f5f5f5';
}

export function getCategoryColor(category) {
  const colors = {
    'Road Damage': '#FF6B6B',
    'Garbage': '#4ECDC4',
    'Water Leakage': '#45B7D1',
    'Street Light': '#FFA500',
    'Electricity': '#FFD93D',
    'Public Sanitation': '#6BCB77',
    'Traffic': '#FF006E',
    'Pollution': '#8338EC',
    'Other': '#868e96'
  };
  return colors[category] || '#868e96';
}

export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function validatePassword(password) {
  return password.length >= 6;
}
