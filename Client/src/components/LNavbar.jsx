import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, Compass, User, Apple } from 'lucide-react';

export default function LNavbar({ authUser, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="app-navbar">
      <div className="container navbar-content">
        <NavLink to="/dashboard" className="logo-container">
          <div className="brand-icon-box">
            <Apple size={18} />
          </div>
          <span>Nutri<span className="brand-accent">Assist</span></span>
        </NavLink>

        <ul className="nav-links">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => isActive ? 'nav-link active nav-link-item' : 'nav-link nav-link-item'}
            >
              <LayoutDashboard size={16} /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/plans"
              className={({ isActive }) => isActive ? 'nav-link active nav-link-item' : 'nav-link nav-link-item'}
            >
              <Compass size={16} /> Recommendations
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) => isActive ? 'nav-link active nav-link-item' : 'nav-link nav-link-item'}
            >
              <User size={16} /> Profile
            </NavLink>
          </li>
          {authUser && (
            <li className="user-menu-item">
              <span className="welcome-label">
                Hi, <span className="welcome-username">{authUser.username}</span>
              </span>
              <button onClick={handleLogout} className="btn btn-secondary nav-logout-btn">
                <LogOut size={14} /> Log Out
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
