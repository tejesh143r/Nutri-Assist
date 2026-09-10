import React, { useState, useEffect } from 'react';
import UnavBar from '../../components/UnavBar';
import { Calendar, Compass, ClipboardList, CheckSquare, Plus, Trash2, Award } from 'lucide-react';

export default function NewPlan() {
  const [plans, setPlans] = useState([]);
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('Weight Loss');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [adherenceLogs, setAdherenceLogs] = useState({}); // { [planId]: { [date]: { water: bool, calories: bool, workout: bool } } }
  
  // Load plans from localStorage for persistence in client
  useEffect(() => {
    const savedPlans = localStorage.getItem('diet_plans');
    if (savedPlans) {
      setPlans(JSON.parse(savedPlans));
    }
    const savedLogs = localStorage.getItem('adherence_logs');
    if (savedLogs) {
      setAdherenceLogs(JSON.parse(savedLogs));
    }
  }, []);

  const savePlansToStorage = (updatedPlans) => {
    localStorage.setItem('diet_plans', JSON.stringify(updatedPlans));
  };

  const saveLogsToStorage = (updatedLogs) => {
    localStorage.setItem('adherence_logs', JSON.stringify(updatedLogs));
  };

  const handleCreatePlan = (e) => {
    e.preventDefault();
    if (!name || !startDate || !endDate) return;

    const newPlan = {
      id: Date.now().toString(),
      name,
      goal,
      startDate,
      endDate,
      createdAt: new Date().toISOString()
    };

    const updatedPlans = [...plans, newPlan];
    setPlans(updatedPlans);
    savePlansToStorage(updatedPlans);

    // Initialize adherence log for this plan
    const updatedLogs = {
      ...adherenceLogs,
      [newPlan.id]: {}
    };
    setAdherenceLogs(updatedLogs);
    saveLogsToStorage(updatedLogs);

    // Reset inputs
    setName('');
    setStartDate('');
    setEndDate('');
  };

  const handleDeletePlan = (id) => {
    const updatedPlans = plans.filter(p => p.id !== id);
    setPlans(updatedPlans);
    savePlansToStorage(updatedPlans);

    const updatedLogs = { ...adherenceLogs };
    delete updatedLogs[id];
    setAdherenceLogs(updatedLogs);
    saveLogsToStorage(updatedLogs);
  };

  const handleToggleHabit = (planId, dateKey, habitKey) => {
    const planLogs = adherenceLogs[planId] || {};
    const dateLogs = planLogs[dateKey] || { water: false, calories: false, workout: false };
    
    const updatedDateLogs = {
      ...dateLogs,
      [habitKey]: !dateLogs[habitKey]
    };

    const updatedLogs = {
      ...adherenceLogs,
      [planId]: {
        ...planLogs,
        [dateKey]: updatedDateLogs
      }
    };

    setAdherenceLogs(updatedLogs);
    saveLogsToStorage(updatedLogs);
  };

  const parseLocalDate = (dateString) => {
    if (!dateString) return null;
    const [year, month, day] = dateString.split('-').map(Number);
    if (!year || !month || !day) return null;
    return new Date(year, month - 1, day);
  };

  const formatDisplayDate = (dateString) => {
    const parsedDate = parseLocalDate(dateString);
    if (!parsedDate) return '—';

    return parsedDate.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getTodayDateString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Helper: Calculate progress percentage
  const getProgress = (plan) => {
    const start = parseLocalDate(plan.startDate);
    const end = parseLocalDate(plan.endDate);
    const today = new Date();
    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    if (!start || !end) return 0;
    if (todayDate < start) return 0;
    if (todayDate > end) return 100;

    const totalDuration = end - start;
    const elapsed = todayDate - start;
    return Math.min(Math.round((elapsed / totalDuration) * 100), 100);
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '40px 24px' }}>
      <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap-reverse' }}>
        
        {/* Sidebar subnav */}
        <div style={{ flex: '1 1 240px' }}>
          <UnavBar />
        </div>

        {/* Plan creation page */}
        <div style={{ flex: '3 3 500px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Create Plan Form */}
          <div className="glass-card">
            <h2 style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ClipboardList size={24} style={{ color: 'var(--primary)' }} /> Set Up New Diet Plan
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '20px', fontSize: '0.95rem' }}>
              Define target schedules and tracking dates for diet adherence challenges.
            </p>

            <form onSubmit={handleCreatePlan}>
              <div className="form-group">
                <label className="form-label">Plan Name / Challenge Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Summer Shred, Keto 30-Day Cycle"
                  className="form-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Dietary Goal Focus</label>
                <select 
                  className="form-select"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                >
                  <option value="Weight Loss">Calorie Deficit / Fat Loss</option>
                  <option value="Maintenance">Body Composition Maintenance</option>
                  <option value="Weight Gain">Hypertrophy / Lean Mass Gain</option>
                </select>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Start Date</label>
                  <input
                    type="date"
                    required
                    className="form-input"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">End Date</label>
                  <input
                    type="date"
                    required
                    className="form-input"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                <Plus size={18} /> Initialize Diet Plan
              </button>
            </form>
          </div>

          {/* Active Plans Tracker */}
          <div className="glass-card">
            <h2 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Award size={24} style={{ color: 'var(--accent)' }} /> Active Diet Plans & Adherence
            </h2>

            {plans.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '40px 0' }}>
                No active tracking schedules. Set up a plan above to begin tracking habits.
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {plans.map((plan) => {
                  const progressVal = getProgress(plan);
                  const todayStr = getTodayDateString();
                  const planLogs = adherenceLogs[plan.id]?.[todayStr] || { water: false, calories: false, workout: false };

                  return (
                    <div 
                      key={plan.id} 
                      style={{ 
                        border: '1px solid var(--glass-border)', 
                        borderRadius: 'var(--radius-sm)', 
                        padding: '20px',
                        background: 'rgba(255,255,255,0.01)'
                      }}
                    >
                      <div className="flex-between" style={{ marginBottom: '12px' }}>
                        <div>
                          <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>{plan.name}</h3>
                          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                            Focus: <b>{plan.goal}</b> ({formatDisplayDate(plan.startDate)} - {formatDisplayDate(plan.endDate)})
                          </span>
                        </div>
                        <button 
                          onClick={() => handleDeletePlan(plan.id)}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--danger)',
                            cursor: 'pointer',
                            padding: '6px'
                          }}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      {/* Progress Bar */}
                      <div style={{ marginBottom: '20px' }}>
                        <div className="flex-between" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                          <span>Timeline Adherence</span>
                          <span>{progressVal}% Completed</span>
                        </div>
                        <div style={{ height: '6px', background: 'var(--bg-tertiary)', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ width: `${progressVal}%`, height: '100%', background: 'linear-gradient(90deg, var(--primary) 0%, var(--accent) 100%)' }}></div>
                        </div>
                      </div>

                      {/* Daily Habits Adherence Checklist */}
                      <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '16px' }}>
                        <h4 style={{ fontSize: '0.9rem', marginBottom: '12px', color: 'var(--text-secondary)' }}>
                          Daily Habits Check (Today: {formatDisplayDate(todayStr)})
                        </h4>
                        
                        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                          {/* Habit: Caloric adherence */}
                          <label style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '8px', 
                            fontSize: '0.85rem',
                            padding: '8px 12px',
                            background: planLogs.calories ? 'var(--primary-glow)' : 'rgba(255,255,255,0.01)',
                            border: '1px solid',
                            borderColor: planLogs.calories ? 'var(--primary)' : 'var(--glass-border)',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            userSelect: 'none'
                          }}>
                            <input 
                              type="checkbox" 
                              checked={planLogs.calories}
                              onChange={() => handleToggleHabit(plan.id, todayStr, 'calories')}
                              style={{ display: 'none' }}
                            />
                            <CheckSquare size={16} style={{ color: planLogs.calories ? 'var(--primary)' : 'var(--text-muted)' }} />
                            <span>Met Daily Calorie Target</span>
                          </label>

                          {/* Habit: Water intake */}
                          <label style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '8px', 
                            fontSize: '0.85rem',
                            padding: '8px 12px',
                            background: planLogs.water ? 'var(--accent-glow)' : 'rgba(255,255,255,0.01)',
                            border: '1px solid',
                            borderColor: planLogs.water ? 'var(--accent)' : 'var(--glass-border)',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            userSelect: 'none'
                          }}>
                            <input 
                              type="checkbox" 
                              checked={planLogs.water}
                              onChange={() => handleToggleHabit(plan.id, todayStr, 'water')}
                              style={{ display: 'none' }}
                            />
                            <CheckSquare size={16} style={{ color: planLogs.water ? 'var(--accent)' : 'var(--text-muted)' }} />
                            <span>Drank 3 Liters Water</span>
                          </label>

                          {/* Habit: Workout */}
                          <label style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '8px', 
                            fontSize: '0.85rem',
                            padding: '8px 12px',
                            background: planLogs.workout ? 'rgba(251,191,36,0.08)' : 'rgba(255,255,255,0.01)',
                            border: '1px solid',
                            borderColor: planLogs.workout ? 'var(--warning)' : 'var(--glass-border)',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            userSelect: 'none'
                          }}>
                            <input 
                              type="checkbox" 
                              checked={planLogs.workout}
                              onChange={() => handleToggleHabit(plan.id, todayStr, 'workout')}
                              style={{ display: 'none' }}
                            />
                            <CheckSquare size={16} style={{ color: planLogs.workout ? 'var(--warning)' : 'var(--text-muted)' }} />
                            <span>Completed 30 Min Active Workout</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
