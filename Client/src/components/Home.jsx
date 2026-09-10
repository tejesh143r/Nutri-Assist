import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../utils/api';
import { Activity, Dumbbell, Scale, Flame, RefreshCw, Sparkles, Plus, AlertCircle } from 'lucide-react';

export default function Home({ authUser }) {
  const [latestSuggestion, setLatestSuggestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [generating, setGenerating] = useState(false);
  const navigate = useNavigate();

  const fetchLatestSuggestion = async () => {
    try {
      setLoading(true);
      const data = await api.getSuggestions();
      if (data.success && data.suggestions.length > 0) {
        setLatestSuggestion(data.suggestions[0]);
      }
    } catch (err) {
      console.error(err);
      setError('Could not load suggestions details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestSuggestion();
  }, []);

  const handleGenerate = async () => {
    try {
      setGenerating(true);
      setError('');
      const data = await api.createSuggestion();
      if (data.success) {
        setLatestSuggestion(data.suggestion);
      }
    } catch (err) {
      setError(err.message || 'Failed to generate recommendations');
    } finally {
      setGenerating(false);
    }
  };

  // Helper for BMI Color Coding
  const getBmiCategory = (bmi) => {
    if (bmi < 18.5) return { label: 'Underweight', color: 'var(--warning)' };
    if (bmi < 25) return { label: 'Healthy Weight', color: 'var(--success)' };
    if (bmi < 30) return { label: 'Overweight', color: 'var(--warning)' };
    return { label: 'Obese', color: 'var(--danger)' };
  };

  if (loading) {
    return (
      <div className="container flex-center" style={{ minHeight: 'calc(100vh - 120px)' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="flex-center" style={{ marginBottom: '16px' }}>
            <Activity size={32} className="animate-spin" style={{ color: 'var(--primary)' }} />
          </div>
          <p style={{ color: 'var(--text-secondary)' }}>Loading Dashboard Analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in dashboard-shell" style={{ padding: '40px 24px' }}>
      <div className="dashboard-header">
        <div>
          <h1 style={{ fontSize: '2rem' }}>Welcome Back, <span className="gradient-text">{authUser?.username}</span></h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
            Here is your personalized nutritional summary and targets.
          </p>
        </div>

        <button
          onClick={handleGenerate}
          disabled={generating}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <RefreshCw size={16} className={generating ? 'animate-spin' : ''} />
          {latestSuggestion ? 'Recalculate Suggestions' : 'Generate suggestions'}
        </button>
      </div>

      {error && (
        <div className="glass-card" style={{ borderLeft: '4px solid var(--danger)', background: 'rgba(248,113,113,0.05)', marginBottom: '24px', padding: '16px' }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', color: 'var(--danger)' }}>
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        </div>
      )}

      {!latestSuggestion ? (
        /* Empty State */
        <div className="glass-card" style={{ textAlign: 'center', padding: '60px 40px', maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ 
            width: '64px', 
            height: '64px', 
            borderRadius: '50%', 
            background: 'var(--primary-glow)', 
            color: 'var(--primary)', 
            display: 'inline-flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            marginBottom: '20px'
          }}>
            <Sparkles size={32} />
          </div>
          <h2>Analyze Your Nutrition</h2>
          <p style={{ color: 'var(--text-secondary)', margin: '12px 0 24px', lineHeight: 1.6 }}>
            We haven't calculated your targets yet. Click the button below to generate personalized daily calorie limits, BMI reports, and macro plans based on your profile details.
          </p>
          <button onClick={handleGenerate} disabled={generating} className="btn btn-primary">
            {generating ? 'Processing Stats...' : 'Generate Recommendations Now'}
          </button>
        </div>
      ) : (
        /* Full Dashboard Dashboard layout */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Top Cards Row */}
          <div className="grid-3">
            <div className="glass-card metric-card">
              <div className="metric-copy">
                <span className="metric-label">BODY MASS INDEX</span>
                <h2 className="metric-value">{latestSuggestion.bmi}</h2>
                <span className="metric-detail" style={{ color: getBmiCategory(latestSuggestion.bmi).color }}>
                  {getBmiCategory(latestSuggestion.bmi).label}
                </span>
              </div>
              <div className="metric-icon metric-icon-accent">
                <Scale size={28} />
              </div>
            </div>

            <div className="glass-card metric-card">
              <div className="metric-copy">
                <span className="metric-label">BASAL METABOLIC RATE</span>
                <h2 className="metric-value">{latestSuggestion.bmr}</h2>
                <span className="metric-detail">kcal/day baseline</span>
              </div>
              <div className="metric-icon metric-icon-warn">
                <Flame size={28} />
              </div>
            </div>

            <div className="glass-card metric-card">
              <div className="metric-copy">
                <span className="metric-label">DAILY EXPENDITURE (TDEE)</span>
                <h2 className="metric-value">{latestSuggestion.tdee}</h2>
                <span className="metric-detail">active calories output</span>
              </div>
              <div className="metric-icon metric-icon-primary">
                <Dumbbell size={28} />
              </div>
            </div>
          </div>

          {/* Macro Breakdown & Targets */}
          <div className="grid-2">
            
            {/* Targets Card */}
            <div className="glass-card">
              <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Flame size={20} style={{ color: 'var(--primary)' }} /> Daily Calorie & Macronutrient Targets
              </h3>
              
              <div className="flex-between" style={{ padding: '16px', background: 'rgba(16, 185, 129, 0.05)', borderRadius: 'var(--radius-sm)', marginBottom: '24px' }}>
                <div>
                  <h4 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{latestSuggestion.calories} kcal</h4>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Target Daily Intake for <b>{authUser?.goal}</b></span>
                </div>
                <Link to="/profile" className="btn btn-secondary" style={{ padding: '8px 12px', fontSize: '0.85rem' }}>
                  Edit Goal
                </Link>
              </div>

              {/* Progress Rings Container */}
              <div className="flex-center" style={{ gap: '32px', flexWrap: 'wrap' }}>
                {/* Protein Ring */}
                <div style={{ textAlign: 'center' }}>
                  <div className="macro-ring-container">
                    <svg className="macro-ring-svg">
                      <circle className="macro-ring-bg" cx="45" cy="45" r="36" />
                      <circle 
                        className="macro-ring-fill" 
                        cx="45" 
                        cy="45" 
                        r="36" 
                        stroke="#10b981" 
                        strokeDasharray={`${2 * Math.PI * 36}`}
                        strokeDashoffset={`${2 * Math.PI * 36 * (1 - 0.3)}`} 
                      />
                    </svg>
                    <div className="macro-ring-text">
                      <div className="macro-ring-value">{latestSuggestion.protein}g</div>
                      <div className="macro-ring-label">Protein</div>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '8px' }}>Target: ~30%</p>
                </div>

                {/* Carbs Ring */}
                <div style={{ textAlign: 'center' }}>
                  <div className="macro-ring-container">
                    <svg className="macro-ring-svg">
                      <circle className="macro-ring-bg" cx="45" cy="45" r="36" />
                      <circle 
                        className="macro-ring-fill" 
                        cx="45" 
                        cy="45" 
                        r="36" 
                        stroke="#06b6d4" 
                        strokeDasharray={`${2 * Math.PI * 36}`}
                        strokeDashoffset={`${2 * Math.PI * 36 * (1 - 0.4)}`}
                      />
                    </svg>
                    <div className="macro-ring-text">
                      <div className="macro-ring-value">{latestSuggestion.carbs}g</div>
                      <div className="macro-ring-label">Carbs</div>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '8px' }}>Target: ~40%</p>
                </div>

                {/* Fats Ring */}
                <div style={{ textAlign: 'center' }}>
                  <div className="macro-ring-container">
                    <svg className="macro-ring-svg">
                      <circle className="macro-ring-bg" cx="45" cy="45" r="36" />
                      <circle 
                        className="macro-ring-fill" 
                        cx="45" 
                        cy="45" 
                        r="36" 
                        stroke="#fbbf24" 
                        strokeDasharray={`${2 * Math.PI * 36}`}
                        strokeDashoffset={`${2 * Math.PI * 36 * (1 - 0.3)}`}
                      />
                    </svg>
                    <div className="macro-ring-text">
                      <div className="macro-ring-value">{latestSuggestion.fats}g</div>
                      <div className="macro-ring-label">Fats</div>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '8px' }}>Target: ~30%</p>
                </div>
              </div>
            </div>

            {/* Recommendations Pointers Card */}
            <div className="glass-card">
              <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={20} style={{ color: 'var(--primary)' }} /> Personalized Guidance Tips
              </h3>
              
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {latestSuggestion.recommendations.slice(0, 5).map((rec, i) => (
                  <li key={i} style={{ 
                    display: 'flex', 
                    gap: '12px', 
                    alignItems: 'flex-start',
                    padding: '10px 14px',
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.9rem',
                    lineHeight: 1.4
                  }}>
                    <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>•</span>
                    <span style={{ color: 'var(--text-secondary)' }}>{rec}</span>
                  </li>
                ))}
              </ul>
              
              <div style={{ marginTop: '20px', textAlign: 'right' }}>
                <Link to="/plans" style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>
                  View All Guidelines & Plan Details →
                </Link>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
