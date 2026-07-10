import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../utils/api';
import { UserPlus, Mail, Lock, User as UserIcon, Calendar, ArrowRight, ArrowLeft, ShieldAlert } from 'lucide-react';

export default function Register({ setAuthUser }) {
  const [step, setStep] = useState(1);
  
  // State variables
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('Male');
  const [activityLevel, setActivityLevel] = useState('Sedentary');
  const [goal, setGoal] = useState('Maintenance');
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleNext = (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setError('Please fill in all account credentials');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setError('');
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload = {
        username,
        email,
        password,
        age: Number(age),
        weight: Number(weight),
        height: Number(height),
        gender,
        activityLevel,
        goal
      };

      const data = await api.register(payload);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setAuthUser(data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container flex-center animate-fade-in" style={{ minHeight: 'calc(100vh - 120px)', padding: '40px 24px' }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '520px' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ 
            width: '56px', 
            height: '56px', 
            borderRadius: '16px', 
            background: 'var(--primary-glow)', 
            color: 'var(--primary)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px'
          }}>
            <UserPlus size={28} />
          </div>
          <h2>Join Nutrition Assistant</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '6px' }}>
            Step {step} of 2: {step === 1 ? 'Account Setup' : 'Body Analytics'}
          </p>
        </div>

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

        {step === 1 ? (
          <form onSubmit={handleNext}>
            <div className="form-group">
              <label className="form-label">Username</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                  <UserIcon size={18} />
                </span>
                <input
                  type="text"
                  required
                  className="form-input"
                  style={{ paddingLeft: '44px' }}
                  placeholder="John Doe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                  <Mail size={18} />
                </span>
                <input
                  type="email"
                  required
                  className="form-input"
                  style={{ paddingLeft: '44px' }}
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '24px' }}>
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                  <Lock size={18} />
                </span>
                <input
                  type="password"
                  required
                  className="form-input"
                  style={{ paddingLeft: '44px' }}
                  placeholder="•••••••• (Min 6 chars)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px' }}>
              Continue <ArrowRight size={18} />
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Age (Years)</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                    <Calendar size={18} />
                  </span>
                  <input
                    type="number"
                    required
                    min="1"
                    max="120"
                    className="form-input"
                    style={{ paddingLeft: '44px' }}
                    placeholder="25"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>
              </div>

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
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Height (cm)</label>
                <input
                  type="number"
                  required
                  min="50"
                  max="250"
                  className="form-input"
                  placeholder="175"
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
                  max="300"
                  className="form-input"
                  placeholder="70"
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
              <label className="form-label">Your Fitness Goal</label>
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

            <div style={{ display: 'flex', gap: '16px' }}>
              <button 
                type="button" 
                className="btn btn-secondary" 
                style={{ flex: 1 }}
                onClick={() => setStep(1)}
              >
                <ArrowLeft size={18} /> Back
              </button>
              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ flex: 2 }}
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Complete Register'}
              </button>
            </div>
          </form>
        )}

        <p style={{ textAlign: 'center', marginTop: '20px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>
            Sign In here
          </Link>
        </p>
      </div>
    </div>
  );
}
