import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiMenu, FiX, FiLogOut, FiUser } from 'react-icons/fi';
import brandIcon from '../assets/istockphoto-517163466-612x612.jpg';
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
          <img src={brandIcon} alt="CivicConnect logo" className="brand-icon" />
          <span className="brand-text">CivicConnect</span>
        </Link>

        <button className="navbar-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          <NavLink to="/" end className="navbar-link">Home</NavLink>
          <NavLink to="/issues" className="navbar-link">Issues</NavLink>
          <NavLink to="/about" className="navbar-link">About</NavLink>
          <NavLink to="/contact" className="navbar-link">Contact</NavLink>

          <div className="navbar-divider"></div>

          {isAuthenticated ? (
            <div className="navbar-auth">
              <NavLink to={`/profile/${user?.id}`} className="navbar-link navbar-user">
                <FiUser size={18} />
                {user?.name}
              </NavLink>
              <Link to="/create-issue" className="btn btn-primary">
                + Report Issue
              </Link>
              <button onClick={handleLogout} className="btn btn-outline">
                <FiLogOut size={18} />
                Logout
              </button>
              {user?.role === 'admin' && (
                <NavLink to="/admin" className="navbar-link">Admin</NavLink>
              )}
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
