import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiTrendingUp, FiArrowRight } from 'react-icons/fi';
import { issuesService } from '../services/auth';
import { formatDate, getCategoryColor, truncateText } from '../utils/helpers';
import './TrendingSection.css';

export default function TrendingSection() {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTrending();
  }, []);

  const fetchTrending = async () => {
    try {
      const res = await issuesService.getTrendingIssues(5);
      setTrending(res.data);
      setError('');
    } catch (err) {
      setError('Failed to load trending issues');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="trending-section card">Loading trending issues...</div>;

  return (
    <div className="trending-section card">
      <div className="trending-header">
        <h3 className="trending-title">
          <FiTrendingUp />
          Trending Issues
        </h3>
        <Link to="/issues" className="view-all-link">
          View All
          <FiArrowRight />
        </Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="trending-list">
        {trending.length > 0 ? (
          trending.map((issue, index) => (
            <Link key={issue.id} to={`/issues/${issue.id}`} className="trending-item">
              <span className="trending-rank">#{index + 1}</span>
              <div className="trending-content">
                <h4 className="trending-item-title">{issue.title}</h4>
                <div className="trending-meta">
                  <span
                    className="category-pill"
                    style={{ backgroundColor: getCategoryColor(issue.category) }}
                  >
                    {issue.category}
                  </span>
                  <span className="upvote-count">👍 {issue.upvoteCount}</span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="no-trending">No trending issues yet</p>
        )}
      </div>
    </div>
  );
}
