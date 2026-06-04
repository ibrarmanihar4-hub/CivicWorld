import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import IssueCard from '../components/IssueCard';
import TrendingSection from '../components/TrendingSection';
import FeedFilter from '../components/FeedFilter';
import { issuesService } from '../services/auth';
import { useAuth } from '../context/AuthContext';
import './Home.css';

export default function Home() {
  const { user } = useAuth();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    search: '',
    city: '',
    category: '',
    status: '',
    sortBy: 'latest'
  });

  useEffect(() => {
    fetchIssues();
  }, [filters]);

  const fetchIssues = async () => {
    setLoading(true);
    try {
      const res = await issuesService.getAllIssues(filters);
      setIssues(res.data);
      setError('');
    } catch (err) {
      setError('Failed to load issues');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpvote = (updatedIssue) => {
    setIssues(issues.map(issue =>
      issue.id === updatedIssue.id ? { ...issue, ...updatedIssue } : issue
    ));
  };

  const handleDelete = (issueId) => {
    setIssues(issues.filter(issue => issue.id !== issueId));
  };

  return (
    <div className="home-page">
      <Header />

      <div className="container">
        <div className="home-grid">
          <div className="feed-section">
            <FeedFilter onFilterChange={setFilters} filters={filters} />

            {error && <div className="alert alert-danger">{error}</div>}

            {loading ? (
              <div className="loading-message">Loading issues...</div>
            ) : issues.length > 0 ? (
              <div className="issues-feed">
                {issues.map(issue => (
                  <IssueCard
                    key={issue.id}
                    issue={issue}
                    onUpvote={handleUpvote}
                    onDelete={handleDelete}
                    currentUserId={user?.id}
                  />
                ))}
              </div>
            ) : (
              <div className="no-issues">
                <p>No issues found. Be the first to report one!</p>
                <Link to="/create-issue" className="btn btn-primary">
                  Create an Issue
                </Link>
              </div>
            )}
          </div>

          <aside className="sidebar">
            <TrendingSection />
          </aside>
        </div>
      </div>
    </div>
  );
}
