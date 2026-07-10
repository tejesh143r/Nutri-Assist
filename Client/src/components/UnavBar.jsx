import React from 'react';
import { NavLink } from 'react-router-dom';
import { User, Shield, Key, Dumbbell } from 'lucide-react';

export default function UnavBar() {
  return (
    <div className="glass-card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <h3 style={{ fontSize: '1rem', padding: '8px 12px', borderBottom: '1px solid var(--glass-border)', color: 'var(--text-muted)' }}>
        User Menu
      </h3>
      
      <NavLink 
        to="/profile" 
        className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        style={({ isActive }) => ({
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '10px 12px',
          borderRadius: 'var(--radius-sm)',
          background: isActive ? 'var(--primary-glow)' : 'transparent',
          color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
          textDecoration: 'none',
          fontWeight: 500,
        })}
      >
        <User size={16} /> Personal Data
      </NavLink>

      <NavLink 
        to="/plans" 
        className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        style={({ isActive }) => ({
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '10px 12px',
          borderRadius: 'var(--radius-sm)',
          background: isActive ? 'var(--primary-glow)' : 'transparent',
          color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
          textDecoration: 'none',
          fontWeight: 500,
        })}
      >
        <Dumbbell size={16} /> Recommendations
      </NavLink>
    </div>
  );
}
