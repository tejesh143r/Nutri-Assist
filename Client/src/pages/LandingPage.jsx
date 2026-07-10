import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, ShieldAlert, Award, TrendingUp, Sparkles, BookOpen } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="flex-center" style={{ marginBottom: '16px' }}>
            <span style={{ 
              background: 'rgba(16, 185, 129, 0.1)', 
              color: 'var(--primary)', 
              padding: '6px 16px', 
              borderRadius: '50px', 
              fontSize: '0.85rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              border: '1px solid rgba(16, 185, 129, 0.2)'
            }}>
              <Sparkles size={14} /> Next-Gen Nutrition Assistant
            </span>
          </div>
          
          <h1 className="hero-title">
            Your Personalized Journey to <br />
            <span className="gradient-text">Balanced Living</span>
          </h1>
          
          <p className="hero-subtitle">
            Leverage tailored calorie calculations, personalized macro targets, and structured dietary plans to meet your wellness, strength, or weight goals.
          </p>
          
          <div className="flex-center" style={{ gap: '16px' }}>
            <Link to="/register" className="btn btn-primary">
              Get Started Free
            </Link>
            <Link to="/login" className="btn btn-secondary">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section style={{ padding: '60px 0', borderTop: '1px solid var(--glass-border)' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '2rem' }}>
            Engineered for <span className="gradient-text">Optimal Wellness</span>
          </h2>
          
          <div className="grid-3">
            <div className="glass-card">
              <div style={{ color: 'var(--primary)', marginBottom: '16px' }}>
                <Activity size={32} />
              </div>
              <h3 style={{ marginBottom: '10px' }}>Calorie Optimization</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Calculates BMR & TDEE based on age, weight, height, gender, and physical activity levels using Mifflin-St Jeor formulas.
              </p>
            </div>

            <div className="glass-card">
              <div style={{ color: 'var(--accent)', marginBottom: '16px' }}>
                <TrendingUp size={32} />
              </div>
              <h3 style={{ marginBottom: '10px' }}>Goal Tuning</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Adapts macronutrient targets (proteins, carbs, fats) dynamically for muscle building, calorie deficit, or weight maintenance.
              </p>
            </div>

            <div className="glass-card">
              <div style={{ color: 'var(--success)', marginBottom: '16px' }}>
                <BookOpen size={32} />
              </div>
              <h3 style={{ marginBottom: '10px' }}>Personal Guidance</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Provides customized suggestions and dietary pointers tailored directly to your Body Mass Index (BMI) and goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Medical Disclaimer */}
      <section style={{ padding: '40px 0 80px' }}>
        <div className="container">
          <div className="glass-card" style={{ 
            borderLeft: '4px solid var(--warning)', 
            background: 'rgba(251, 191, 36, 0.03)',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ color: 'var(--warning)' }}>
                <ShieldAlert size={28} />
              </div>
              <div>
                <h4 style={{ color: 'var(--warning)', marginBottom: '6px' }}>Important Medical Disclaimer</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  The Nutrition Assistant App provides automated dietary guidelines and calculated recommendations for educational purposes. It does not constitute medical advice, diagnosis, or treatment. Always consult with a qualified physician or registered dietitian before beginning any new diet or exercise regimen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
