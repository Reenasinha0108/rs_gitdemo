import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '@services/index';
import './Navbar.css';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  const handleLogout = (): void => {
    authService.logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">📦</span>
          GloLogistics
        </Link>

        <div className="nav-menu">
          <Link to="/shipments" className="nav-link">
            Shipments
          </Link>
          <Link to="/about" className="nav-link">
            About Us
          </Link>
          <Link to="/contact" className="nav-link">
            Contact Us
          </Link>

          {user && (
            <div className="nav-user">
              <span className="user-email">{user.email}</span>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
