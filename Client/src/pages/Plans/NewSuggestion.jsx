import React, { useState } from 'react';
import { api } from '../../utils/api';
import UnavBar from '../../components/UnavBar';
import { Sparkles, Activity, Plus, RefreshCw, AlertCircle, Save } from 'lucide-react';
import suggestNutrition from '../../utils/suggestNutrition'; // We can calculate locally first

export default function NewSuggestion({ authUser }) {
  // Setup inputs initialized with user details
  const [age, setAge] = useState(authUser?.age || 25);
  const [weight, setWeight] = useState(authUser?.weight || 70);
  const [height, setHeight] = useState(authUser?.height || 175);
  const [gender, setGender] = useState(authUser?.gender || 'Male');
  const [activityLevel, setActivityLevel] = useState(authUser?.activityLevel || 'Sedentary');
  const [goal, setGoal] = useState(authUser?.goal || 'Maintenance');

  const [simulatedResult, setSimulatedResult] = useState(null);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSimulate = (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    
    try {
      const result = suggestNutrition({
        age: Number(age),
        weight: Number(weight),
        height: Number(height),
        gender,
        activityLevel,
        goal
      });
      setSimulatedResult(result);
    } catch (err) {
      setError('Calculation failed. Check metrics.');
    }
  };

  const handleSaveToProfile = async () => {
    if (!simulatedResult) return;
    setSaving(true);
    setSuccess('');
    setError('');

    try {
      // Create suggestion on Server DB matching these stats
      // Note: In a MERN application, the backend does BMR calculations based on user model parameters.
      // So to log this suggestion permanently, we first update the profile and create the recommendation!
      await api.updateProfile({
        age: Number(age),
        weight: Number(weight),
        height: Number(height),
        activityLevel,
        goal
      });
      
      const res = await api.createSuggestion();
      if (res.success) {
        setSuccess('Successfully updated profile stats and saved suggestion to historical database!');
      }
    } catch (err) {
      setError(err.message || 'Failed to save suggestion to profile.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '40px 24px' }}>
      <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap-reverse' }}>
        
        {/* Sidebar subnav */}
        <div style={{ flex: '1 1 240px' }}>
          <UnavBar />
        </div>

        {/* Suggestion Calculator */}
        <div style={{ flex: '3 3 500px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div className="glass-card">
            <h2 style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Sparkles size={24} style={{ color: 'var(--primary)' }} /> On-the-Fly Calories Simulator
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.95rem' }}>
              Simulate dietary metrics without changing your active account settings, or apply calculations to your dashboard.
            </p>

            {success && (
              <div style={{ 
                background: 'rgba(52, 211, 153, 0.08)', 
                border: '1px solid var(--success)', 
                borderRadius: 'var(--radius-sm)', 
                padding: '12px 16px', 
                color: 'var(--success)',
                fontSize: '0.9rem',
                marginBottom: '20px'
              }}>
                {success}
              </div>
            )}

            {error && (
              <div style={{ 
                background: 'rgba(248, 113, 113, 0.08)', 
                border: '1px solid var(--danger)', 
                borderRadius: 'var(--radius-sm)', 
                padding: '12px 16px', 
                color: 'var(--danger)',
                fontSize: '0.9rem',
                marginBottom: '20px',
                display: 'flex',
                gap: '8px',
                alignItems: 'center'
              }}>
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSimulate}>
              <div className="grid-3">
                <div className="form-group">
                  <label className="form-label">Age (Years)</label>
                  <input
                    type="number"
                    required
                    min="1"
                    className="form-input"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Height (cm)</label>
                  <input
                    type="number"
                    required
                    min="50"
                    className="form-input"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Weight (kg)</label>
                  <input
                    type="number"
                    required
                    min="20"
                    className="form-input"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Gender</label>
                  <select 
                    className="form-select"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Fitness Goal</label>
                  <select 
                    className="form-select"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                  >
                    <option value="Weight Loss">Weight Loss</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Weight Gain">Weight Gain</option>
                  </select>
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '24px' }}>
                <label className="form-label">Physical Activity Level</label>
                <select 
                  className="form-select"
                  value={activityLevel}
                  onChange={(e) => setActivityLevel(e.target.value)}
                >
                  <option value="Sedentary">Sedentary (No / little exercise)</option>
                  <option value="Lightly Active">Lightly Active (Exercise 1-3 days/wk)</option>
                  <option value="Moderately Active">Moderately Active (Exercise 3-5 days/wk)</option>
                  <option value="Very Active">Very Active (Exercise 6-7 days/wk)</option>
                  <option value="Extra Active">Extra Active (Intense job/athletic training)</option>
                </select>
              </div>

              <button type="submit" className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Activity size={18} /> Simulate Calculations
              </button>
            </form>
          </div>

          {/* Simulation Output Card */}
          {simulatedResult && (
            <div className="glass-card animate-fade-in">
              <div className="flex-between" style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '16px', marginBottom: '20px' }}>
                <div>
                  <h3 style={{ color: 'var(--primary)' }}>Simulation Analytics</h3>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Based on Mifflin-St Jeor computations</span>
                </div>

                <button 
                  onClick={handleSaveToProfile} 
                  disabled={saving}
                  className="btn btn-primary"
                  style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                >
                  {saving ? (
                    <>
                      <RefreshCw size={14} className="animate-spin" /> Saving...
                    </>
                  ) : (
                    <>
                      <Save size={14} /> Apply to Profile & Log
                    </>
                  )}
                </button>
              </div>

              <div className="grid-3" style={{ marginBottom: '24px' }}>
                <div style={{ padding: '12px', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>BMI Score</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, marginTop: '4px', color: 'var(--accent)' }}>{simulatedResult.bmi}</div>
                </div>

                <div style={{ padding: '12px', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Calorie limit</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, marginTop: '4px', color: 'var(--primary)' }}>{simulatedResult.calories} kcal</div>
                </div>

                <div style={{ padding: '12px', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>TDEE Output</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, marginTop: '4px', color: 'var(--success)' }}>{simulatedResult.tdee} kcal</div>
                </div>
              </div>

              <h4 style={{ marginBottom: '12px' }}>Simulated Macronutrient Distribution</h4>
              <div className="grid-3" style={{ gap: '16px', marginBottom: '20px' }}>
                <div style={{ padding: '12px', border: '1px solid var(--glass-border)', borderRadius: '4px' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Protein</span>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{simulatedResult.protein}g</div>
                </div>

                <div style={{ padding: '12px', border: '1px solid var(--glass-border)', borderRadius: '4px' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Carbohydrates</span>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{simulatedResult.carbs}g</div>
                </div>

                <div style={{ padding: '12px', border: '1px solid var(--glass-border)', borderRadius: '4px' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Dietary Fats</span>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{simulatedResult.fats}g</div>
                </div>
              </div>

              <h4 style={{ marginBottom: '10px' }}>Dietary Advice</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {simulatedResult.recommendations.slice(0, 3).map((rec, i) => (
                  <li key={i} style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', paddingLeft: '12px', borderLeft: '2px solid var(--primary)' }}>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
