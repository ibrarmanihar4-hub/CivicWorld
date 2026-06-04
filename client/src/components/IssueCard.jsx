import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiMessageCircle, FiTrash2, FiEdit } from 'react-icons/fi';
import { formatDate, truncateText, getCategoryColor } from '../utils/helpers';
import { issuesService } from '../services/auth';
import './IssueCard.css';

export default function IssueCard({ issue, onUpvote, onDelete, currentUserId }) {
  const [isUpvoting, setIsUpvoting] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(issue.upvoteCount || 0);
  const [upvoters, setUpvoters] = useState(issue.upvoters || []);
  const isUserIssue = currentUserId === issue.reporterId;
  const isUpvoted = upvoters.includes(currentUserId);

  // Keep local state in sync when the issue prop changes (re-fetch, filtering, sorting)
  useEffect(() => {
    setUpvoteCount(issue.upvoteCount || 0);
    setUpvoters(issue.upvoters || []);
  }, [issue.upvoteCount, issue.upvoters]);

  const handleUpvote = async () => {
    if (!currentUserId || isUpvoting) return;
    setIsUpvoting(true);
    try {
      const res = await issuesService.upvoteIssue(issue.id);
      const updated = res.data;
      // Always trust the server's authoritative values
      setUpvoteCount(updated.upvoteCount ?? 0);
      setUpvoters(updated.upvoters ?? []);
      onUpvote?.(updated);
    } catch (err) {
      console.error('Failed to upvote:', err);
    } finally {
      setIsUpvoting(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this issue?')) {
      try {
        await issuesService.deleteIssue(issue.id);
        onDelete?.(issue.id);
      } catch (err) {
        console.error('Failed to delete:', err);
      }
    }
  };

  return (
    <article className="issue-card card">
      {/* Header */}
      <div className="issue-header">
        <div className="issue-user">
          <div className="user-avatar">
            {issue.reporter?.profilePictureUrl ? (
              <img src={issue.reporter.profilePictureUrl} alt={issue.reporter.name} />
            ) : (
              <span>{issue.reporter?.name?.charAt(0) || 'U'}</span>
            )}
          </div>
          <div className="user-info">
            <h4 className="user-name">{issue.reporter?.name || 'Anonymous'}</h4>
            <p className="user-city">{issue.city}</p>
            <p className="posted-date">{formatDate(issue.createdAt)}</p>
          </div>
        </div>

        {isUserIssue && (
          <div className="issue-actions">
            <Link to={`/issues/${issue.id}/edit`} className="btn btn-sm btn-outline">
              <FiEdit />
            </Link>
            <button onClick={handleDelete} className="btn btn-sm btn-danger">
              <FiTrash2 />
            </button>
          </div>
        )}
      </div>

      {/* Image */}
      {issue.imageUrl && (
        <div className="issue-image-container">
          <img src={issue.imageUrl} alt={issue.title} className="issue-image" />
        </div>
      )}

      {/* Content */}
      <div className="issue-content">
        <Link to={`/issues/${issue.id}`} className="issue-title-link">
          <h3 className="issue-title">{issue.title}</h3>
        </Link>
        <p className="issue-description">{truncateText(issue.description, 200)}</p>
      </div>

      {/* Meta */}
      <div className="issue-meta">
        <span
          className="category-badge"
          style={{ backgroundColor: getCategoryColor(issue.category) }}
        >
          {issue.category}
        </span>
        <span className="location-badge">📍 {issue.location}</span>
        <span className={`status-badge status-${issue.status}`}>
          {issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
        </span>
      </div>

      {/* Footer */}
      <div className="issue-footer">
        <button
          onClick={handleUpvote}
          disabled={isUpvoting || !currentUserId}
          className={`action-btn upvote-btn ${isUpvoted ? 'active' : ''}`}
          title={isUpvoted ? 'Remove upvote' : 'Upvote'}
        >
          <span className="upvote-emoji" role="img" aria-label="upvote">⬆️</span>
          <span>{upvoteCount}</span>
        </button>

        <Link to={`/issues/${issue.id}`} className="action-btn">
          <FiMessageCircle size={18} />
          <span>Comment</span>
        </Link>
      </div>
    </article>
  );
}
