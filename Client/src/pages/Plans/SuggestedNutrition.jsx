import React, { useState, useEffect } from 'react';
import { api } from '../../utils/api';
import UnavBar from '../../components/UnavBar';
import { Compass, Sparkles, Calendar, Scale, Flame, RefreshCw, AlertCircle } from 'lucide-react';

export default function SuggestedNutrition() {
  const [history, setHistory] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchSuggestions = async () => {
    try {
      setLoading(true);
      const data = await api.getSuggestions();
      if (data.success) {
        setHistory(data.suggestions);
        if (data.suggestions.length > 0) {
          setSelectedItem(data.suggestions[0]);
        }
      }
    } catch (err) {
      setError('Could not retrieve nutrition recommendations history.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="container flex-center" style={{ minHeight: 'calc(100vh - 120px)' }}>
        <div>
          <RefreshCw className="animate-spin" size={32} style={{ color: 'var(--primary)', marginBottom: '16px' }} />
          <p style={{ color: 'var(--text-secondary)' }}>Loading Personalized Guidelines...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in" style={{ padding: '40px 24px' }}>
      <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap-reverse' }}>
        
        {/* Sidebar Navigation */}
        <div style={{ flex: '1 1 240px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <UnavBar />

          {/* Historical Logs Sidebar Card */}
          <div className="glass-card" style={{ padding: '16px' }}>
            <h3 style={{ fontSize: '1rem', paddingBottom: '8px', borderBottom: '1px solid var(--glass-border)', color: 'var(--text-muted)', marginBottom: '12px' }}>
              Historical Audits
            </h3>
            
            {history.length === 0 ? (
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center', padding: '16px 0' }}>
                No past logs generated.
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '300px', overflowY: 'auto' }}>
                {history.map((item) => (
                  <button
                    key={item._id}
                    onClick={() => setSelectedItem(item)}
                    style={{
                      background: selectedItem?._id === item._id ? 'rgba(16, 185, 129, 0.08)' : 'transparent',
                      border: '1px solid',
                      borderColor: selectedItem?._id === item._id ? 'var(--primary)' : 'var(--glass-border)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '10px',
                      color: 'var(--text-primary)',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      width: '100%',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Calendar size={14} style={{ color: 'var(--primary)' }} />
                      {new Date(item.createdAt).toLocaleDateString()}
                    </div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', marginTop: '4px' }}>
                      {item.calories} kcal • BMI {item.bmi}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Suggestions Detail Panel */}
        <div style={{ flex: '3 3 500px' }}>
          {error && (
            <div className="glass-card" style={{ borderLeft: '4px solid var(--danger)', color: 'var(--danger)', padding: '16px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            </div>
          )}

          {!selectedItem ? (
            <div className="glass-card" style={{ textAlign: 'center', padding: '40px' }}>
              <Compass size={40} style={{ color: 'var(--text-muted)', marginBottom: '16px' }} />
              <h3>No Guidelines Found</h3>
              <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
                Go to the Dashboard and generate a nutrition target suggestion first.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Profile details at compilation time */}
              <div className="glass-card">
                <div className="flex-between" style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '16px', marginBottom: '20px' }}>
                  <div>
                    <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Compass size={24} style={{ color: 'var(--primary)' }} /> Diet recommendations Plan
                    </h2>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      Generated on: {formatDate(selectedItem.createdAt)}
                    </span>
                  </div>
                  <span style={{ 
                    padding: '4px 12px', 
                    background: 'var(--primary-glow)', 
                    color: 'var(--primary)', 
                    borderRadius: '50px',
                    fontSize: '0.8rem',
                    fontWeight: 600
                  }}>
                    Active Recommendation
                  </span>
                </div>

                {/* Micro Stats Grid */}
                <div className="grid-3" style={{ marginBottom: '24px' }}>
                  <div style={{ padding: '12px', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>BMI Score</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: '4px', color: 'var(--accent)' }}>{selectedItem.bmi}</div>
                  </div>
                  
                  <div style={{ padding: '12px', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Basal Calories (BMR)</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: '4px', color: 'var(--warning)' }}>{selectedItem.bmr} kcal</div>
                  </div>

                  <div style={{ padding: '12px', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Outflow (TDEE)</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: '4px', color: 'var(--success)' }}>{selectedItem.tdee} kcal</div>
                  </div>
                </div>

                {/* Macro Distribution Details */}
                <h3 style={{ marginBottom: '16px', fontSize: '1.1rem' }}>Macronutrients Target Breakdown</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-sm)', padding: '20px', marginBottom: '24px' }}>
                  
                  {/* Calorie Bar */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold', fontSize: '1.1rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '12px' }}>
                    <span>Target Calories Limit:</span>
                    <span style={{ color: 'var(--primary)' }}>{selectedItem.calories} kcal / day</span>
                  </div>

                  {/* Protein */}
                  <div>
                    <div className="flex-between" style={{ marginBottom: '6px', fontSize: '0.9rem' }}>
                      <span>Protein (Target ~30%)</span>
                      <span style={{ fontWeight: 600 }}>{selectedItem.protein}g ({selectedItem.protein * 4} kcal)</span>
                    </div>
                    <div style={{ height: '6px', background: 'var(--bg-tertiary)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: '30%', height: '100%', background: '#10b981' }}></div>
                    </div>
                  </div>

                  {/* Carbs */}
                  <div>
                    <div className="flex-between" style={{ marginBottom: '6px', fontSize: '0.9rem' }}>
                      <span>Carbohydrates (Target ~40%)</span>
                      <span style={{ fontWeight: 600 }}>{selectedItem.carbs}g ({selectedItem.carbs * 4} kcal)</span>
                    </div>
                    <div style={{ height: '6px', background: 'var(--bg-tertiary)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: '40%', height: '100%', background: '#06b6d4' }}></div>
                    </div>
                  </div>

                  {/* Fats */}
                  <div>
                    <div className="flex-between" style={{ marginBottom: '6px', fontSize: '0.9rem' }}>
                      <span>Fats (Target ~30%)</span>
                      <span style={{ fontWeight: 600 }}>{selectedItem.fats}g ({selectedItem.fats * 9} kcal)</span>
                    </div>
                    <div style={{ height: '6px', background: 'var(--bg-tertiary)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: '30%', height: '100%', background: '#fbbf24' }}></div>
                    </div>
                  </div>

                </div>

                {/* Detailed Recommendations List */}
                <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem' }}>
                  <Sparkles size={18} style={{ color: 'var(--primary)' }} /> Clinical & Dietary Action Tips
                </h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {selectedItem.recommendations.map((rec, i) => (
                    <li key={i} style={{
                      padding: '12px 16px',
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid var(--glass-border)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.9rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.5
                    }}>
                      {rec}
                    </li>
                  ))}
                </ul>

              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
}
