import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './components/Home';
import LNavbar from './components/LNavbar';
import UserData from './pages/User/UserData';
import SuggestedNutrition from './pages/Plans/SuggestedNutrition';
import NewPlan from './pages/Plans/NewPlan';
import NewSuggestion from './pages/Plans/NewSuggestion';
import { Compass, Sparkles, ClipboardList } from 'lucide-react';

export default function App() {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (savedUser && token) {
      setAuthUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthUser(null);
  };

  if (loading) {
    return (
      <div className="flex-center" style={{ minHeight: '100vh', color: 'var(--text-secondary)' }}>
        Loading Application...
      </div>
    );
  }

  // Protected Route Wrapper
  const ProtectedRoute = ({ children }) => {
    if (!authUser) {
      return <Navigate to="/login" replace />;
    }
    return (
      <>
        <LNavbar authUser={authUser} onLogout={handleLogout} />
        {children}
      </>
    );
  };

  return (
    <Router>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        
        {/* Navigation header for public pages */}
        {!authUser && (
          <header className="navbar">
            <div className="container navbar-content">
              <Link to="/" className="logo-container">
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
                  🍎
                </div>
                <span>Nutri<span style={{ color: 'var(--primary)' }}>Assist</span></span>
              </Link>

              <div style={{ display: 'flex', gap: '16px' }}>
                <Link to="/login" className="nav-link">Sign In</Link>
                <Link to="/register" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                  Register
                </Link>
              </div>
            </div>
          </header>
        )}

        <div style={{ flex: 1 }}>
          <Routes>
            {/* Public Routes */}
            <Route 
              path="/" 
              element={authUser ? <Navigate to="/dashboard" replace /> : <LandingPage />} 
            />
            <Route 
              path="/login" 
              element={authUser ? <Navigate to="/dashboard" replace /> : <Login setAuthUser={setAuthUser} />} 
            />
            <Route 
              path="/register" 
              element={authUser ? <Navigate to="/dashboard" replace /> : <Register setAuthUser={setAuthUser} />} 
            />

            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Home authUser={authUser} />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <UserData authUser={authUser} setAuthUser={setAuthUser} />
                </ProtectedRoute>
              } 
            />
            
            {/* Plans Routes */}
            <Route 
              path="/plans" 
              element={
                <ProtectedRoute>
                  {/* Tab Navigation header to toggle sub plan sheets */}
                  <div className="container" style={{ paddingTop: '24px' }}>
                    <div className="glass-card" style={{ padding: '10px 16px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                      <Link 
                        to="/plans" 
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'var(--primary)', fontSize: '0.9rem', fontWeight: 600 }}
                      >
                        <Compass size={16} /> View Recommendations
                      </Link>
                      <Link 
                        to="/plans/new" 
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}
                      >
                        <ClipboardList size={16} /> Active Habits Planner
                      </Link>
                      <Link 
                        to="/plans/simulate" 
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}
                      >
                        <Sparkles size={16} /> Quick Simulator
                      </Link>
                    </div>
                  </div>
                  <SuggestedNutrition />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/plans/new" 
              element={
                <ProtectedRoute>
                  <div className="container" style={{ paddingTop: '24px' }}>
                    <div className="glass-card" style={{ padding: '10px 16px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                      <Link 
                        to="/plans" 
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}
                      >
                        <Compass size={16} /> View Recommendations
                      </Link>
                      <Link 
                        to="/plans/new" 
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'var(--primary)', fontSize: '0.9rem', fontWeight: 600 }}
                      >
                        <ClipboardList size={16} /> Active Habits Planner
                      </Link>
                      <Link 
                        to="/plans/simulate" 
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}
                      >
                        <Sparkles size={16} /> Quick Simulator
                      </Link>
                    </div>
                  </div>
                  <NewPlan />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/plans/simulate" 
              element={
                <ProtectedRoute>
                  <div className="container" style={{ paddingTop: '24px' }}>
                    <div className="glass-card" style={{ padding: '10px 16px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                      <Link 
                        to="/plans" 
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}
                      >
                        <Compass size={16} /> View Recommendations
                      </Link>
                      <Link 
                        to="/plans/new" 
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}
                      >
                        <ClipboardList size={16} /> Active Habits Planner
                      </Link>
                      <Link 
                        to="/plans/simulate" 
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'var(--primary)', fontSize: '0.9rem', fontWeight: 600 }}
                      >
                        <Sparkles size={16} /> Quick Simulator
                      </Link>
                    </div>
                  </div>
                  <NewSuggestion authUser={authUser} />
                </ProtectedRoute>
              } 
            />

            {/* Fallback Redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        {/* Global Footer */}
        <footer style={{ 
          padding: '24px 0', 
          borderTop: '1px solid var(--glass-border)', 
          background: 'rgba(10,15,13,0.9)', 
          textAlign: 'center', 
          fontSize: '0.85rem', 
          color: 'var(--text-muted)' 
        }}>
          <div className="container">
            <p>© {new Date().getFullYear()} NutriAssist. SmartBridge Internship Full Stack Project.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}
