import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

interface SidebarProps {
  activeLink: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activeLink }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <h3 className="sidebar-title">Services</h3>
        <ul className="sidebar-menu">
          <li>
            <Link
              to="/shipments"
              className={`sidebar-link ${activeLink === 'shipments' ? 'active' : ''}`}
            >
              <span className="icon">📋</span>
              View Shipments
            </Link>
          </li>
          <li>
            <Link
              to="/shipments/create"
              className={`sidebar-link ${activeLink === 'create' ? 'active' : ''}`}
            >
              <span className="icon">➕</span>
              Add Shipment
            </Link>
          </li>
        </ul>
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-title">Company</h3>
        <ul className="sidebar-menu">
          <li>
            <Link
              to="/about"
              className={`sidebar-link ${activeLink === 'about' ? 'active' : ''}`}
            >
              <span className="icon">ℹ️</span>
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={`sidebar-link ${activeLink === 'contact' ? 'active' : ''}`}
            >
              <span className="icon">📞</span>
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
