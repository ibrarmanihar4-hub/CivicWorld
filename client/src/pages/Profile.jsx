import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { issuesService } from '../services/auth';
import { useAuth } from '../context/AuthContext';
import IssueCard from '../components/IssueCard';
import { FiUser, FiMapPin, FiEdit } from 'react-icons/fi';

export default function Profile() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [userIssues, setUserIssues] = useState([]);
  const [userUpvotedIssues, setUserUpvotedIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('myPosts');

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  const fetchUserData = async () => {
    try {
      const res = await issuesService.getIssuesByUser(userId);
      setUserIssues(res.data);
      // Filter upvoted issues from all issues
      const allIssues = await issuesService.getAllIssues({});
      const upvoted = allIssues.data.filter(issue => issue.upvoters?.includes(userId));
      setUserUpvotedIssues(upvoted);
    } catch (err) {
      console.error('Failed to load user data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="container" style={{ padding: '2rem 0' }}>Loading...</div>;

  const isOwnProfile = user?.id === userId;
  const totalUpvotes = userIssues.reduce((sum, issue) => sum + (issue.upvoteCount || 0), 0);

  return (
    <div className="container" style={{ padding: '2rem 0', maxWidth: '900px' }}>
      <div className="card" style={{ marginBottom: '2rem', padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              backgroundColor: 'var(--primary)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              fontWeight: 'bold'
            }}>
              {user?.profilePictureUrl ? (
                <img src={user.profilePictureUrl} alt={user.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
              ) : (
                user?.name?.charAt(0)
              )}
            </div>
            <div>
              <h1 style={{ margin: '0 0 0.5rem 0' }}>{user?.name}</h1>
              <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gray-600)', margin: '0' }}>
                <FiMapPin /> {user?.city}
              </p>
            </div>
          </div>
          {isOwnProfile && (
            <button onClick={() => navigate('/edit-profile')} className="btn btn-primary">
              <FiEdit /> Edit Profile
            </button>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '2rem' }}>
          <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'var(--gray-50)', borderRadius: '8px' }}>
            <p style={{ margin: '0', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>{userIssues.length}</p>
            <p style={{ margin: '0.5rem 0 0 0', color: 'var(--gray-600)' }}>Posts</p>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'var(--gray-50)', borderRadius: '8px' }}>
            <p style={{ margin: '0', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>{totalUpvotes}</p>
            <p style={{ margin: '0.5rem 0 0 0', color: 'var(--gray-600)' }}>Upvotes</p>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'var(--gray-50)', borderRadius: '8px' }}>
            <p style={{ margin: '0', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>{userUpvotedIssues.length}</p>
            <p style={{ margin: '0.5rem 0 0 0', color: 'var(--gray-600)' }}>Upvoted</p>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', borderBottom: '2px solid var(--gray-200)', marginBottom: '1.5rem' }}>
          <button
            onClick={() => setActiveTab('myPosts')}
            style={{
              background: 'none',
              border: 'none',
              padding: '1rem',
              fontSize: '1rem',
              fontWeight: activeTab === 'myPosts' ? 'bold' : 'normal',
              color: activeTab === 'myPosts' ? 'var(--primary)' : 'var(--gray-600)',
              borderBottom: activeTab === 'myPosts' ? '2px solid var(--primary)' : 'none',
              cursor: 'pointer'
            }}
          >
            My Posts
          </button>
          <button
            onClick={() => setActiveTab('upvoted')}
            style={{
              background: 'none',
              border: 'none',
              padding: '1rem',
              fontSize: '1rem',
              fontWeight: activeTab === 'upvoted' ? 'bold' : 'normal',
              color: activeTab === 'upvoted' ? 'var(--primary)' : 'var(--gray-600)',
              borderBottom: activeTab === 'upvoted' ? '2px solid var(--primary)' : 'none',
              cursor: 'pointer'
            }}
          >
            Upvoted Issues
          </button>
        </div>

        {activeTab === 'myPosts' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {userIssues.length > 0 ? (
              userIssues.map(issue => (
                <IssueCard key={issue.id} issue={issue} currentUserId={user?.id} />
              ))
            ) : (
              <p style={{ textAlign: 'center', color: 'var(--gray-500)' }}>No posts yet</p>
            )}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {userUpvotedIssues.length > 0 ? (
              userUpvotedIssues.map(issue => (
                <IssueCard key={issue.id} issue={issue} currentUserId={user?.id} />
              ))
            ) : (
              <p style={{ textAlign: 'center', color: 'var(--gray-500)' }}>No upvoted issues yet</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
