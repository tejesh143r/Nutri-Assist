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
import { Compass, Sparkles, ClipboardList, Menu, X } from 'lucide-react';

export default function App() {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (savedUser && token) {
      setAuthUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
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
      <div className="app-shell">
        {!authUser && (
          <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
            <div className="container nav-shell">
              <Link to="/" className="brand-mark" aria-label="Nutri Assistant home">
                <span className="brand-icon">N</span>
                <span>Nutri<span className="brand-accent">Assistant</span></span>
              </Link>

              <nav className={`nav-panel ${mobileMenuOpen ? 'open' : ''}`} aria-label="Main navigation">
                <Link to="/#home" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Home</Link>
                <a href="#nutrition" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Nutrition</a>
                <a href="#features" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Features</a>
                <a href="#how-it-works" className="nav-link" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
                <a href="#about" className="nav-link" onClick={() => setMobileMenuOpen(false)}>About</a>
              </nav>

              <div className="nav-actions">
                <Link to="/login" className="nav-login">Login</Link>
                <Link to="/register" className="btn btn-primary nav-cta">Get Started</Link>
                <button
                  type="button"
                  className="menu-toggle"
                  aria-label="Toggle navigation menu"
                  onClick={() => setMobileMenuOpen((prev) => !prev)}
                >
                  {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            </div>
          </header>
        )}

        <main className="main-content">
          <Routes>
            <Route path="/" element={authUser ? <Navigate to="/dashboard" replace /> : <LandingPage />} />
            <Route path="/login" element={authUser ? <Navigate to="/dashboard" replace /> : <Login setAuthUser={setAuthUser} />} />
            <Route path="/register" element={authUser ? <Navigate to="/dashboard" replace /> : <Register setAuthUser={setAuthUser} />} />

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

            <Route
              path="/plans"
              element={
                <ProtectedRoute>
                  <div className="container subnav-container">
                    <div className="glass-card subnav-tab-bar">
                      <Link to="/plans" className="subnav-tab active">
                        <Compass size={16} /> View Recommendations
                      </Link>
                      <Link to="/plans/new" className="subnav-tab">
                        <ClipboardList size={16} /> Active Habits Planner
                      </Link>
                      <Link to="/plans/simulate" className="subnav-tab">
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
                  <div className="container subnav-container">
                    <div className="glass-card subnav-tab-bar">
                      <Link to="/plans" className="subnav-tab">
                        <Compass size={16} /> View Recommendations
                      </Link>
                      <Link to="/plans/new" className="subnav-tab active">
                        <ClipboardList size={16} /> Active Habits Planner
                      </Link>
                      <Link to="/plans/simulate" className="subnav-tab">
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
                  <div className="container subnav-container">
                    <div className="glass-card subnav-tab-bar">
                      <Link to="/plans" className="subnav-tab">
                        <Compass size={16} /> View Recommendations
                      </Link>
                      <Link to="/plans/new" className="subnav-tab">
                        <ClipboardList size={16} /> Active Habits Planner
                      </Link>
                      <Link to="/plans/simulate" className="subnav-tab active">
                        <Sparkles size={16} /> Quick Simulator
                      </Link>
                    </div>
                  </div>
                  <NewSuggestion authUser={authUser} />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <footer className="site-footer">
          <div className="container footer-shell">
            <div>
              <h3>Nutri Assistant</h3>
              <p>Intelligent nutrition for everyday life.</p>
            </div>
            <div>
              <h4>Product</h4>
              <ul>
                <li><a href="#features">Features</a></li>
                <li><a href="#nutrition">Nutrition</a></li>
                <li><a href="#how-it-works">How It Works</a></li>
              </ul>
            </div>
            <div>
              <h4>Resources</h4>
              <ul>
                <li><a href="#about">About</a></li>
                <li><a href="/login">Login</a></li>
                <li><a href="/register">Get Started</a></li>
              </ul>
            </div>
          </div>
          <div className="container copyright">
            <p>© {new Date().getFullYear()} Nutri Assistant. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}
