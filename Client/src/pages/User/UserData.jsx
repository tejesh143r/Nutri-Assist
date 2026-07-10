import React, { useState, useEffect } from 'react';
import { api } from '../../utils/api';
import UnavBar from '../../components/UnavBar';
import { User, Activity, Dumbbell, ShieldAlert, Award, Save, RefreshCw } from 'lucide-react';

export default function UserData({ authUser, setAuthUser }) {
  const [username, setUsername] = useState(authUser?.username || '');
  const [age, setAge] = useState(authUser?.age || '');
  const [weight, setWeight] = useState(authUser?.weight || '');
  const [height, setHeight] = useState(authUser?.height || '');
  const [activityLevel, setActivityLevel] = useState(authUser?.activityLevel || 'Sedentary');
  const [goal, setGoal] = useState(authUser?.goal || 'Maintenance');

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (authUser) {
      setUsername(authUser.username);
      setAge(authUser.age);
      setWeight(authUser.weight);
      height && setHeight(authUser.height);
      setActivityLevel(authUser.activityLevel);
      setGoal(authUser.goal);
    }
  }, [authUser]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccess('');
    setError('');

    try {
      // 1. Update Profile Information
      const profileRes = await api.updateProfile({
        username,
        age: Number(age),
        weight: Number(weight),
        height: Number(height),
        activityLevel,
        goal,
      });

      if (profileRes.success) {
        localStorage.setItem('user', JSON.stringify(profileRes.user));
        setAuthUser(profileRes.user);

        // 2. Automatically generate new suggestions based on updated stats
        await api.createSuggestion();

        setSuccess('Profile updated successfully! New suggestions generated.');
      }
    } catch (err) {
      setError(err.message || 'Failed to update profile settings.');
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

        {/* Main Content Form */}
        <div style={{ flex: '3 3 500px' }}>
          <div className="glass-card">
            <h2 style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <User size={24} style={{ color: 'var(--primary)' }} /> Personal Profile Settings
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.95rem' }}>
              Update your body metrics and daily physical activity level to customize your nutrition suggestions.
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
                <ShieldAlert size={18} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

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

              <div className="form-group">
                <label className="form-label">Activity Level</label>
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

              <div className="form-group" style={{ marginBottom: '28px' }}>
                <label className="form-label">Fitness Goal</label>
                <select 
                  className="form-select"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                >
                  <option value="Weight Loss">Weight Loss (Caloric Deficit)</option>
                  <option value="Maintenance">Maintenance (Balanced Intake)</option>
                  <option value="Weight Gain">Weight Gain / Muscle Building</option>
                </select>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary"
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                disabled={saving}
              >
                {saving ? (
                  <>
                    <RefreshCw className="animate-spin" size={18} />
                    Saving Changes...
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    Save & Recalculate Targets
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
