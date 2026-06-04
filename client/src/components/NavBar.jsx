import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiMenu, FiX, FiLogOut, FiUser } from 'react-icons/fi';
import './NavBar.css';

export default function NavBar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container container">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">🏛️</span>
          <span className="brand-text">CivicConnect</span>
        </Link>

        <button className="navbar-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/issues" className="navbar-link">Issues</Link>
          <Link to="/about" className="navbar-link">About</Link>
          <Link to="/contact" className="navbar-link">Contact</Link>

          <div className="navbar-divider"></div>

          {isAuthenticated ? (
            <div className="navbar-auth">
              <Link to={`/profile/${user?.id}`} className="navbar-link navbar-user">
                <FiUser size={18} />
                {user?.name}
              </Link>
              <Link to="/create-issue" className="btn btn-primary">
                + Report Issue
              </Link>
              <button onClick={handleLogout} className="btn btn-outline">
                <FiLogOut size={18} />
                Logout
              </button>
              <Link to="/admin" className="navbar-link">Admin</Link>
            </div>
          ) : (
            <div className="navbar-auth">
              <Link to="/login" className="btn btn-outline">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
