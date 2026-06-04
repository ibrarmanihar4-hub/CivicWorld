import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { issuesService, commentsService } from '../services/auth';
import { useAuth } from '../context/AuthContext';
import { FiMessageCircle, FiTrash2 } from 'react-icons/fi';
import { formatDate, getCategoryColor } from '../utils/helpers';

export default function IssueDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [issue, setIssue] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchIssue();
    fetchComments();
  }, [id]);

  const fetchIssue = async () => {
    try {
      const res = await issuesService.getIssueById(id);
      setIssue(res.data);
    } catch (err) {
      setError('Failed to load issue');
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await commentsService.getCommentsByIssue(id);
      setComments(res.data);
    } catch (err) {
      console.error('Failed to load comments');
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      await commentsService.addComment(id, newComment);
      setNewComment('');
      await fetchComments();
    } catch (err) {
      setError('Failed to add comment');
    }
  };

  const handleUpvote = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const res = await issuesService.upvoteIssue(id);
      setIssue(res.data);
    } catch (err) {
      setError('Failed to upvote');
    }
  };

  if (loading) return <div className="container" style={{ padding: '2rem 0' }}>Loading...</div>;
  if (error || !issue) return <div className="container" style={{ padding: '2rem 0' }}><div className="alert alert-danger">{error || 'Issue not found'}</div></div>;

  return (
    <div className="container" style={{ padding: '2rem 0', maxWidth: '800px' }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: '1rem' }} className="btn btn-outline">← Back</button>

      <article className="card" style={{ marginBottom: '2rem' }}>
        {issue.imageUrl && (
          <img src={issue.imageUrl} alt={issue.title} style={{ width: '100%', borderRadius: '8px', marginBottom: '1.5rem', maxHeight: '400px', objectFit: 'cover' }} />
        )}

        <h1>{issue.title}</h1>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <span style={{
            backgroundColor: getCategoryColor(issue.category),
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '9999px',
            fontSize: '0.875rem'
          }}>
            {issue.category}
          </span>
          <span style={{ backgroundColor: 'var(--gray-200)', padding: '0.5rem 1rem', borderRadius: '9999px' }}>📍 {issue.location}</span>
          <span style={{ backgroundColor: 'var(--gray-200)', padding: '0.5rem 1rem', borderRadius: '9999px' }}>
            Status: <strong>{issue.status}</strong>
          </span>
        </div>

        <p style={{ color: 'var(--gray-600)', marginBottom: '1.5rem' }}>
          Reported in {issue.city} • {formatDate(issue.createdAt)}
        </p>

        <div style={{ borderTop: '1px solid var(--gray-200)', paddingTop: '1.5rem', marginBottom: '1.5rem' }}>
          <h3>Description</h3>
          <p style={{ lineHeight: '1.6', color: 'var(--gray-800)' }}>{issue.description}</p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid var(--gray-200)', paddingTop: '1.5rem' }}>
          <button onClick={handleUpvote} className="btn" style={{ backgroundColor: 'transparent', borderLeft: '3px solid var(--primary)' }}>
            <span role="img" aria-label="upvote" style={{ marginRight: '0.4rem' }}>⬆️</span> {issue.upvoteCount || 0} Upvotes
          </button>
          <div className="btn" style={{ backgroundColor: 'transparent', borderLeft: '3px solid var(--gray-300)' }}>
            <FiMessageCircle /> {comments.length} Comments
          </div>
        </div>
      </article>

      <div className="card">
        <h2>Comments</h2>

        {user ? (
          <form onSubmit={handleAddComment} style={{ marginBottom: '2rem' }}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              required
              style={{ width: '100%', minHeight: '100px', marginBottom: '1rem' }}
            />
            <button type="submit" className="btn btn-primary">Post Comment</button>
          </form>
        ) : (
          <p>Please <button onClick={() => navigate('/login')} style={{ color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>login</button> to comment.</p>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {comments.length > 0 ? (
            comments.map(comment => (
              <div key={comment.id} style={{ padding: '1rem', backgroundColor: 'var(--gray-50)', borderRadius: '8px', borderLeft: '3px solid var(--primary)' }}>
                <p style={{ marginBottom: '0.5rem', fontWeight: '500' }}>User {comment.userId?.substring(0, 5)}...</p>
                <p style={{ margin: '0', color: 'var(--gray-800)' }}>{comment.text}</p>
                <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.875rem', color: 'var(--gray-500)' }}>{formatDate(comment.createdAt)}</p>
              </div>
            ))
          ) : (
            <p style={{ color: 'var(--gray-500)', textAlign: 'center' }}>No comments yet. Be the first to comment!</p>
          )}
        </div>
      </div>
    </div>
  );
}
