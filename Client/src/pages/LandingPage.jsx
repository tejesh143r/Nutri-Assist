import React from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  Sparkles,
  Brain,
  Apple,
  LineChart,
  ArrowRight,
  Check,
  MessageSquareText,
  Salad,
  BellRing,
  Gauge,
  ShieldCheck,
  Target,
  TrendingUp,
  Clock3,
} from 'lucide-react';

export default function LandingPage() {
  const featureCards = [
    { icon: Brain, title: 'AI Nutrition Assistant', text: 'Understand meals, goals, and macro balance with instant guidance tailored to your profile.' },
    { icon: Target, title: 'Personalized Recommendations', text: 'Get macro targets and food suggestions based on your body metrics and wellness objectives.' },
    { icon: Salad, title: 'Meal Analysis', text: 'Evaluate food choices through smarter calorie and nutrition breakdowns in seconds.' },
    { icon: LineChart, title: 'Progress Insights', text: 'Turn daily habits into actionable trends with a clean view of your nutrition journey.' },
  ];

  const prompts = ['Analyze my meal', 'How much protein do I need?', 'Suggest a healthy dinner', 'Am I meeting my calorie goal?'];

  const insights = [
    'Your protein intake is slightly below your daily target.',
    'Hydration has improved by 18% this week.',
    'You usually consume fewer calories at breakfast.',
    'Try adding more fiber-rich foods to your dinner.',
  ];

  return (
    <div className="animate-fade-in" id="home">
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <div className="hero-badge">
              <Sparkles size={14} /> Nutri Assistant AI
            </div>
            <h1 className="hero-title">
              Eat Smarter.<br />
              <span className="gradient-text">Live Healthier.</span>
            </h1>
            <p className="hero-subtitle">
              Your intelligent nutrition companion for better food decisions, personalized insights, and healthier everyday habits.
            </p>
            <div className="hero-actions">
              <Link to="/register" className="btn btn-primary">Start Your Nutrition Journey</Link>
              <Link to="/login" className="btn btn-secondary">Explore Nutri Assistant</Link>
            </div>
          </div>

          <div className="hero-panel" aria-label="Nutrition dashboard preview">
            <div className="nutrition-panel">
              <div className="panel-top">
                <div>
                  <div className="panel-label">Today's nutrition</div>
                </div>
                <div className="score-badge">
                  <ShieldCheck size={13} /> AI balanced
                </div>
              </div>

              <div className="macro-list">
                <div className="macro-item">
                  <div>
                    <div className="macro-meta">
                      <span>Calories</span>
                      <strong>1,842 / 2,200</strong>
                    </div>
                    <div className="progress-track"><div className="progress-bar" style={{ width: '84%' }} /></div>
                  </div>
                </div>

                <div className="macro-item">
                  <div>
                    <div className="macro-meta">
                      <span>Protein</span>
                      <strong>86 / 100g</strong>
                    </div>
                    <div className="progress-track"><div className="progress-bar" style={{ width: '86%', background: 'linear-gradient(90deg, #4ec7b5 0%, #8edfc4 100%)' }} /></div>
                  </div>
                </div>

                <div className="macro-item">
                  <div>
                    <div className="macro-meta">
                      <span>Carbs</span>
                      <strong>210 / 250g</strong>
                    </div>
                    <div className="progress-track"><div className="progress-bar" style={{ width: '84%', background: 'linear-gradient(90deg, #2bb673 0%, #65d899 100%)' }} /></div>
                  </div>
                </div>

                <div className="macro-item">
                  <div>
                    <div className="macro-meta">
                      <span>Fiber</span>
                      <strong>28 / 30g</strong>
                    </div>
                    <div className="progress-track"><div className="progress-bar" style={{ width: '93%', background: 'linear-gradient(90deg, #7ac7ff 0%, #5ec7b4 100%)' }} /></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="floating-card float-one">
              <strong>92</strong>
              <span>Nutrition score</span>
            </div>
            <div className="floating-card float-two">
              <strong>+18%</strong>
              <span>Hydration trend</span>
            </div>
            <div className="floating-card float-three">
              <strong>Good</strong>
              <span>AI insight</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="problem">
        <div className="container problem-grid">
          <div className="problem-copy">
            <div className="section-header" style={{ margin: '0 0 24px', textAlign: 'left' }}>
              <h2>Healthy eating shouldn’t require a nutrition degree.</h2>
            </div>
            <p>
              Most people struggle with understanding food labels, tracking calories, balancing macros, and making consistent choices throughout the week. Nutri Assistant brings clarity, structure, and smarter guidance into one place.
            </p>
            <ul className="problem-list">
              <li><span className="problem-bullet"><Check size={14} /></span>Understand what’s actually in your meals.</li>
              <li><span className="problem-bullet"><Check size={14} /></span>Track calories and macros without the overwhelm.</li>
              <li><span className="problem-bullet"><Check size={14} /></span>Get personalized recommendations based on your goals.</li>
              <li><span className="problem-bullet"><Check size={14} /></span>Stay consistent with daily nutrition guidance.</li>
            </ul>
          </div>

          <div className="problem-panel">
            <div className="panel-label" style={{ color: 'rgba(237,253,247,0.74)' }}>AI nutrition overview</div>
            <div style={{ marginTop: '18px', display: 'grid', gap: '14px' }}>
              <div className="mini-stat"><span>Calories</span><strong>2,200</strong></div>
              <div className="mini-stat"><span>Protein</span><strong>100g</strong></div>
              <div className="mini-stat"><span>Fiber</span><strong>30g</strong></div>
              <div className="mini-stat"><span>Meal balance</span><strong>87%</strong></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="nutrition">
        <div className="container">
          <div className="section-header">
            <h2>Nutrition, made intelligent.</h2>
            <p>Every recommendation is shaped around your goals, movements, and day-to-day habits.</p>
          </div>

          <div className="ai-surface">
            <div className="glass-card" style={{ padding: '24px' }}>
              <div className="panel-top" style={{ color: 'var(--text-primary)', marginBottom: '18px' }}>
                <div>
                  <div className="panel-label" style={{ color: 'var(--text-secondary)' }}>Today's nutrition</div>
                </div>
                <div className="score-badge" style={{ color: 'var(--primary-strong)' }}><Gauge size={12} /> 92 score</div>
              </div>

              <div className="macro-list">
                <div className="macro-item" style={{ background: 'rgba(29,143,105,0.03)' }}>
                  <div>
                    <div className="macro-meta"><span>Calories</span><strong>1,842 / 2,200 kcal</strong></div>
                    <div className="progress-track"><div className="progress-bar" style={{ width: '84%' }} /></div>
                  </div>
                </div>
                <div className="macro-item" style={{ background: 'rgba(94,199,180,0.03)' }}>
                  <div>
                    <div className="macro-meta"><span>Protein</span><strong>86 / 100 g</strong></div>
                    <div className="progress-track"><div className="progress-bar" style={{ width: '86%', background: 'linear-gradient(90deg, #28a17a 0%, #90e1c2 100%)' }} /></div>
                  </div>
                </div>
                <div className="macro-item" style={{ background: 'rgba(104,179,255,0.03)' }}>
                  <div>
                    <div className="macro-meta"><span>Carbohydrates</span><strong>210 / 250 g</strong></div>
                    <div className="progress-track"><div className="progress-bar" style={{ width: '84%', background: 'linear-gradient(90deg, #5a8ef8 0%, #8dbcff 100%)' }} /></div>
                  </div>
                </div>
                <div className="macro-item" style={{ background: 'rgba(245,185,74,0.05)' }}>
                  <div>
                    <div className="macro-meta"><span>Healthy fats</span><strong>52 / 65 g</strong></div>
                    <div className="progress-track"><div className="progress-bar" style={{ width: '80%', background: 'linear-gradient(90deg, #f4b94a 0%, #f9d77d 100%)' }} /></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '26px 22px' }}>
              <div className="chat-title" style={{ marginBottom: '18px' }}>
                <div className="chat-avatar"><Brain size={18} /></div>
                <span>AI Insight</span>
              </div>
              <p style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: '8px' }}>
                “You’re doing great on protein today. Consider adding a fiber-rich food to balance your dinner.”
              </p>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                <TrendingUp size={14} /> Personalized tracking update
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="features">
        <div className="container">
          <div className="section-header">
            <h2>AI assistant experience.</h2>
            <p>Instant answers for meals, goals, and daily nutrition decisions.</p>
          </div>

          <div className="ai-surface">
            <div className="ai-chat">
              <div className="chat-header">
                <div className="chat-title">
                  <div className="chat-avatar"><MessageSquareText size={18} /></div>
                  <span>Nutri Assistant</span>
                </div>
                <span className="score-badge" style={{ background: 'rgba(46, 182, 115, 0.08)', color: 'var(--primary-strong)' }}><Activity size={12} /> Online</span>
              </div>

              <div className="chat-bubbles">
                <div className="chat-bubble user">Is this meal healthy?</div>
                <div className="chat-bubble ai">Overall, yes. It’s a strong source of protein, but adding vegetables would improve fiber and micronutrient balance.</div>
              </div>

              <div className="prompt-row">
                {prompts.map((prompt) => (
                  <button key={prompt} type="button" className="prompt-pill">{prompt}</button>
                ))}
              </div>
            </div>

            <div className="score-grid">
              <div className="score-card">
                <div className="score-ring">
                  <svg viewBox="0 0 100 100">
                    <defs>
                      <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#1d8f69" />
                        <stop offset="100%" stopColor="#8edfc4" />
                      </linearGradient>
                    </defs>
                    <circle className="track" cx="50" cy="50" r="38" />
                    <circle className="fill" cx="50" cy="50" r="38" strokeDasharray="238" strokeDashoffset="26" />
                  </svg>
                  <div className="score-text">92</div>
                </div>
                <h4>Nutrition score</h4>
                <p>Excellent</p>
              </div>

              <div className="score-card">
                <div style={{ display: 'grid', gap: '12px', marginTop: '8px' }}>
                  <div><strong style={{ color: 'var(--text-primary)' }}>Protein balance</strong><div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>94%</div></div>
                  <div><strong style={{ color: 'var(--text-primary)' }}>Fiber intake</strong><div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>86%</div></div>
                  <div><strong style={{ color: 'var(--text-primary)' }}>Calorie balance</strong><div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>91%</div></div>
                  <div><strong style={{ color: 'var(--text-primary)' }}>Meal diversity</strong><div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>89%</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="how-it-works">
        <div className="container">
          <div className="section-header">
            <h2>How it works.</h2>
            <p>From personal profile to daily decisions, the experience stays simple and clear.</p>
          </div>

          <div className="steps">
            <div className="step-card">
              <div className="step-number">01</div>
              <h3>Tell us about yourself</h3>
              <p>Set your age, activity level, and goals to create a tailored baseline.</p>
            </div>
            <div className="step-card">
              <div className="step-number">02</div>
              <h3>Track what you eat</h3>
              <p>Log meals and review how your nutrition supports your day-to-day rhythm.</p>
            </div>
            <div className="step-card">
              <div className="step-number">03</div>
              <h3>Let Nutri Assistant analyze it</h3>
              <p>Calorie and macro insights are calculated into actionable recommendations.</p>
            </div>
            <div className="step-card">
              <div className="step-number">04</div>
              <h3>Get personalized guidance</h3>
              <p>Follow clear next steps that help you stay consistent and healthier over time.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="about">
        <div className="container">
          <div className="section-header">
            <h2>Smart insights that help you move better.</h2>
            <p>Actionable guidance, not generic advice.</p>
          </div>

          <div className="feature-grid">
            {featureCards.map(({ icon: Icon, title, text }) => (
              <div key={title} className="feature-card">
                <div className="feature-icon"><Icon size={22} /></div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>

          <div className="cta-wrap">
            <div className="cta-box">
              <h2>Your better eating habits start today.</h2>
              <p>Make smarter food decisions with an intelligent nutrition companion designed around you.</p>
              <Link to="/register" className="btn btn-primary">Start Your Nutrition Journey <ArrowRight size={18} /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '24px' }}>
        <div className="container">
          <div className="section-header">
            <h2>AI-generated recommendations</h2>
            <p>Practical, personalized cues that work in real life.</p>
          </div>

          <div className="feature-grid" style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
            {insights.map((item) => (
              <div key={item} className="feature-card" style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div className="feature-icon" style={{ width: '42px', height: '42px', minWidth: '42px' }}><BellRing size={18} /></div>
                <p style={{ marginTop: '4px' }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
