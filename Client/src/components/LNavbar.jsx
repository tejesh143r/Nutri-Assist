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
    <nav className="navbar">
      <div className="container navbar-content">
        <NavLink to="/dashboard" className="logo-container">
          <div style={{ 
            width: '32px', 
            height: '32px', 
            borderRadius: '8px', 
            background: 'var(--primary-glow)', 
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Apple size={18} />
          </div>
          <span>Nutri<span style={{ color: 'var(--primary)' }}>Assist</span></span>
        </NavLink>

        <ul className="nav-links">
          <li>
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <LayoutDashboard size={16} /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/plans" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Compass size={16} /> Recommendations
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/profile" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <User size={16} /> Profile
            </NavLink>
          </li>
          {authUser && (
            <li style={{ display: 'flex', alignItems: 'center', gap: '12px', borderLeft: '1px solid var(--glass-border)', paddingLeft: '20px' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Hi, <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{authUser.username}</span>
              </span>
              <button 
                onClick={handleLogout}
                className="btn btn-secondary" 
                style={{ padding: '6px 12px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <LogOut size={14} /> Log Out
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
