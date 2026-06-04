import React, { useEffect, useState } from 'react';
import IssueCard from '../components/IssueCard';
import FeedFilter from '../components/FeedFilter';
import { issuesService } from '../services/auth';
import { useAuth } from '../context/AuthContext';

export default function IssuesList() {
  const { user } = useAuth();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    search: '', city: '', category: '', status: '', sortBy: 'latest'
  });

  useEffect(() => {
    fetchIssues();
  }, [filters]);

  const fetchIssues = async () => {
    setLoading(true);
    try {
      const res = await issuesService.getAllIssues(filters);
      setIssues(res.data);
    } catch (err) {
      setError('Failed to load issues');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h1>All Issues</h1>
      <FeedFilter onFilterChange={setFilters} filters={filters} />
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <p>Loading...</p>
      ) : issues.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {issues.map(issue => (
            <IssueCard
              key={issue.id}
              issue={issue}
              currentUserId={user?.id}
            />
          ))}
        </div>
      ) : (
        <p>No issues found.</p>
      )}
    </div>
  );
}
