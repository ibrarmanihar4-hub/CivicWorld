import React, { useEffect, useState } from 'react';
import { issuesService, authService } from '../services/auth';
import { FiUsers, FiAlertCircle, FiCheckCircle, FiClock, FiX } from 'react-icons/fi';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [issues, setIssues] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const statsRes = await issuesService.getDashboardStats();
      setStats(statsRes.data);

      const issuesRes = await issuesService.getAllIssues({});
      setIssues(issuesRes.data);

      const usersRes = await authService.getAllUsers();
      setUsers(usersRes.data);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="container" style={{ padding: '2rem 0' }}>Loading...</div>;

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h1 style={{ marginBottom: '2rem' }}>Admin Dashboard</h1>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card" style={{ textAlign: 'center', padding: '1.5rem' }}>
          <FiUsers size={32} style={{ color: 'var(--primary)', marginBottom: '0.5rem' }} />
          <p style={{ margin: '0', color: 'var(--gray-600)' }}>Total Users</p>
          <p style={{ margin: '0.5rem 0 0 0', fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)' }}>
            {users.length}
          </p>
        </div>

        <div className="card" style={{ textAlign: 'center', padding: '1.5rem' }}>
          <FiAlertCircle size={32} style={{ color: '#ff6b6b', marginBottom: '0.5rem' }} />
          <p style={{ margin: '0', color: 'var(--gray-600)' }}>Total Issues</p>
          <p style={{ margin: '0.5rem 0 0 0', fontSize: '2rem', fontWeight: 'bold', color: '#ff6b6b' }}>
            {stats?.totalIssues || 0}
          </p>
        </div>

        <div className="card" style={{ textAlign: 'center', padding: '1.5rem' }}>
          <FiClock size={32} style={{ color: '#ffa500', marginBottom: '0.5rem' }} />
          <p style={{ margin: '0', color: 'var(--gray-600)' }}>Pending</p>
          <p style={{ margin: '0.5rem 0 0 0', fontSize: '2rem', fontWeight: 'bold', color: '#ffa500' }}>
            {stats?.pendingIssues || 0}
          </p>
        </div>

        <div className="card" style={{ textAlign: 'center', padding: '1.5rem' }}>
          <FiCheckCircle size={32} style={{ color: '#51cf66', marginBottom: '0.5rem' }} />
          <p style={{ margin: '0', color: 'var(--gray-600)' }}>Resolved</p>
          <p style={{ margin: '0.5rem 0 0 0', fontSize: '2rem', fontWeight: 'bold', color: '#51cf66' }}>
            {stats?.resolvedIssues || 0}
          </p>
        </div>
      </div>

      {/* Issues Table */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>Recent Issues</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--gray-200)' }}>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Title</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Category</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>City</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Status</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Upvotes</th>
              </tr>
            </thead>
            <tbody>
              {issues.slice(0, 10).map(issue => (
                <tr key={issue.id} style={{ borderBottom: '1px solid var(--gray-100)' }}>
                  <td style={{ padding: '1rem' }}>{issue.title}</td>
                  <td style={{ padding: '1rem' }}>{issue.category}</td>
                  <td style={{ padding: '1rem' }}>{issue.city}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{
                      padding: '0.4rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.875rem',
                      backgroundColor: issue.status === 'resolved' ? '#d4edda' : '#fee2e2',
                      color: issue.status === 'resolved' ? '#155724' : '#c33'
                    }}>
                      {issue.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>{issue.upvoteCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Users Table */}
      <div className="card">
        <h2 style={{ marginBottom: '1.5rem' }}>Users</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--gray-200)' }}>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Name</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Email</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>City</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Posts</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} style={{ borderBottom: '1px solid var(--gray-100)' }}>
                  <td style={{ padding: '1rem' }}>{u.name}</td>
                  <td style={{ padding: '1rem' }}>{u.email}</td>
                  <td style={{ padding: '1rem' }}>{u.city}</td>
                  <td style={{ padding: '1rem' }}>{u.totalPosts || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
