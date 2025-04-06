import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Make sure to add your custom styles here

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Admin</h2>
      </div>
      <nav>
        <ul>
          <li><Link to="/">Admin Dashboard</Link></li>
          <li><Link to="/job-listings">Job Listings</Link></li>
          <li><Link to="/candidate-applications">Candidate Applications</Link></li>
          <li><Link to="/user-management">User Management</Link></li>
          <li><Link to="/analytics">Analytics</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
