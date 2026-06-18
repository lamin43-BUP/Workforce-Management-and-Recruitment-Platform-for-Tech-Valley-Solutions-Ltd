'use client';
import { useState } from 'react';
import { Input, Avatar } from '../ui/index';

interface Props { go: (screen: string) => void; onLogin: (role: string) => void; }

export default function LoginPage({ go, onLogin }: Props) {
  const [role, setRole] = useState<'employee' | 'admin'>('employee');

  const creds = {
    employee: { email: 'rashid@tvsl-bd.com', name: 'A M Rashid Ashef Hossain',       dept: 'IT Manager' },
    admin:    { email: 'hr@tvsl-bd.com',     name: 'Mohammad Amir Hassan Chowdhury', dept: 'Head of HR & Admin' },
  };
  const demo = creds[role];

  // Admin-specific right panel content
  const adminFeatures = [
    { icon: '👥', title: 'Employee Management', desc: 'Manage all employees, teams, roles and departments from one place.' },
    { icon: '📋', title: 'Recruitment Pipeline', desc: 'Review applications, run AI exams, shortlist and hire top candidates.' },
    { icon: '✨', title: 'AI-Powered Tools', desc: 'CV scanner, exam generator and answer evaluator powered by Gemini AI.' },
    { icon: '📢', title: 'Notices & Announcements', desc: 'Publish company-wide notices and manage internal communications.' },
  ];

  const employeeFeatures = [
    { icon: '🖥️', title: 'Personal Dashboard', desc: 'View your tasks, attendance, notices and performance at a glance.' },
    { icon: '👥', title: 'Team Collaboration', desc: 'Connect with your team, view member profiles and communicate in real-time.' },
    { icon: '💬', title: 'Team Chat', desc: 'Message your colleagues across channels — General, IT, Networking and more.' },
    { icon: '🔔', title: 'Notices & Updates', desc: 'Stay informed with company announcements and priority alerts.' },
  ];

  const features = role === 'admin' ? adminFeatures : employeeFeatures;
  const panelTitle = role === 'admin' ? 'Admin Console' : 'Employee Portal';
  const panelSub = role === 'admin' ? 'Full control over HR, recruitment & team management' : 'Your workspace for tasks, team & communication';

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>

      {/* ── LEFT — form ── */}
      <div style={{ display: 'flex', flexDirection: 'column', padding: '44px 72px', justifyContent: 'space-between', background: 'white' }}>

        {/* Logo */}
        <button onClick={() => go('home')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 10, width: 'fit-content' }}>
          <div style={{ width: 42, height: 42, borderRadius: 10, overflow: 'hidden', background: 'oklch(0.96 0.01 260)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid oklch(0.90 0.02 260)' }}>
            <img src="/Logo.png" alt="TVSL" style={{ width: 36, height: 36, objectFit: 'contain' }} onError={e => (e.target as HTMLImageElement).style.display='none'}/>
          </div>
          <div style={{ lineHeight: 1.2 }}>
            <div style={{ fontWeight: 800, fontSize: 18, letterSpacing: '-0.025em', color: 'oklch(0.14 0.02 260)', fontFamily: 'var(--font-display)' }}>TVSL</div>
            <div style={{ fontWeight: 400, fontSize: 11, color: 'oklch(0.52 0.012 250)' }}>Tech Valley Solutions</div>
          </div>
        </button>

        {/* Form */}
        <div style={{ maxWidth: 400, width: '100%', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'oklch(0.94 0.03 260)', border: '1px solid oklch(0.86 0.06 260)', borderRadius: 99, padding: '5px 14px', fontSize: 11, fontWeight: 700, color: 'oklch(0.32 0.18 260)', letterSpacing: '0.07em', marginBottom: 22 }}>
            WORKSPACE SIGN-IN
          </div>
          <h1 style={{ fontSize: 42, letterSpacing: '-0.04em', margin: '0 0 8px', lineHeight: 1.05, fontWeight: 800, color: 'oklch(0.12 0.02 260)', fontFamily: 'var(--font-display)' }}>Welcome back.</h1>
          <p style={{ fontSize: 15, color: 'oklch(0.52 0.012 250)', margin: '0 0 32px' }}>Sign in to your TVSL workspace.</p>

          {/* Role tabs */}
          <div style={{ display: 'flex', padding: 4, background: 'oklch(0.96 0.006 260)', borderRadius: 14, marginBottom: 26, border: '1px solid oklch(0.90 0.008 260)' }}>
            {(['employee','admin'] as const).map(t => (
              <button key={t} onClick={() => setRole(t)} style={{ flex: 1, padding: '11px 14px', border: 'none', cursor: 'pointer', background: role === t ? 'white' : 'transparent', color: role === t ? 'oklch(0.22 0.18 260)' : 'oklch(0.52 0.012 250)', borderRadius: 10, fontWeight: 700, fontSize: 14, boxShadow: role === t ? '0 2px 10px oklch(0 0 0 / 0.08)' : 'none', fontFamily: 'var(--font-sans)', transition: 'all .15s' }}>
                {t === 'employee' ? 'Employee' : 'Admin / HR'}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 22 }}>
            <Input label="Work Email" placeholder="you@tvsl-bd.com" icon="mail" defaultValue={demo.email}/>
            <Input label="Password" placeholder="••••••••" type="password" defaultValue="••••••••"/>
            <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 14 }}>
              <span style={{ display: 'flex', gap: 7, alignItems: 'center', cursor: 'pointer', color: 'oklch(0.42 0.02 260)', userSelect: 'none' as const }}><input type="checkbox" defaultChecked/> Remember me</span>
              <a style={{ color: 'oklch(0.32 0.18 260)', cursor: 'pointer', fontWeight: 700, fontSize: 13 }}>Forgot password?</a>
            </label>
          </div>

          <button onClick={() => onLogin(role)}
            style={{ width: '100%', padding: '15px 0', background: 'oklch(0.26 0.18 260)', color: 'white', border: 'none', borderRadius: 12, fontWeight: 700, fontSize: 15, cursor: 'pointer', fontFamily: 'var(--font-sans)', letterSpacing: '-0.01em', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'background .15s' }}
            onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = 'oklch(0.20 0.18 260)'}
            onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = 'oklch(0.26 0.18 260)'}>
            Sign in to workspace
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </button>

          <p style={{ fontSize: 14, color: 'oklch(0.52 0.012 250)', textAlign: 'center', marginTop: 22 }}>
            Looking for jobs?{' '}
            <a onClick={() => go('jobs')} style={{ color: 'oklch(0.32 0.18 260)', cursor: 'pointer', fontWeight: 700, textDecoration: 'none' }}>Browse openings</a>
          </p>
        </div>

        <div style={{ fontSize: 12, color: 'oklch(0.66 0.01 260)' }}>© 2025 Tech Valley Solutions Ltd.</div>
      </div>

      {/* ── RIGHT — dynamic role panel ── */}
      <div style={{ background: 'oklch(0.12 0.04 260)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '52px 60px', position: 'relative', overflow: 'hidden' }}>
        {/* Glow */}
        <div style={{ position: 'absolute', top: '-15%', right: '-20%', width: 520, height: 520, background: 'oklch(0.30 0.18 260)', borderRadius: '50%', filter: 'blur(140px)', opacity: 0.18, pointerEvents: 'none' }}/>
        <div style={{ position: 'absolute', bottom: '-15%', left: '-15%', width: 400, height: 400, background: 'oklch(0.40 0.12 210)', borderRadius: '50%', filter: 'blur(120px)', opacity: 0.12, pointerEvents: 'none' }}/>

        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 28 }}>

          {/* Portal type badge */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'oklch(0.24 0.08 260)', border: '1px solid oklch(0.32 0.10 260)', borderRadius: 99, padding: '6px 14px', fontSize: 11, fontWeight: 700, color: 'oklch(0.72 0.10 260)', letterSpacing: '0.07em', marginBottom: 16 }}>
              ✦ TVSL {panelTitle.toUpperCase()}
            </div>
            <h2 style={{ fontSize: 30, fontWeight: 800, color: 'white', letterSpacing: '-0.03em', lineHeight: 1.1, margin: '0 0 10px', fontFamily: 'var(--font-display)' }}>{panelTitle}</h2>
            <p style={{ fontSize: 14, color: 'oklch(0.62 0.04 260)', lineHeight: 1.6, margin: 0 }}>{panelSub}</p>
          </div>

          {/* Feature cards — 2×2 grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {features.map(f => (
              <div key={f.title} style={{ background: 'oklch(0.19 0.06 260)', border: '1px solid oklch(0.27 0.08 260)', borderRadius: 14, padding: '16px 16px' }}>
                <div style={{ fontSize: 22, marginBottom: 8 }}>{f.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'white', marginBottom: 5, letterSpacing: '-0.01em', fontFamily: 'var(--font-display)' }}>{f.title}</div>
                <div style={{ fontSize: 12, color: 'oklch(0.58 0.04 260)', lineHeight: 1.55 }}>{f.desc}</div>
              </div>
            ))}
          </div>

          {/* Logged-in user preview */}
          <div style={{ background: 'oklch(0.19 0.06 260)', border: '1px solid oklch(0.28 0.08 260)', borderRadius: 14, padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 14 }}>
            <Avatar name={demo.name} size={44}/>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'white', letterSpacing: '-0.01em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const, fontFamily: 'var(--font-display)' }}>{demo.name}</div>
              <div style={{ fontSize: 12, color: 'oklch(0.60 0.06 260)', marginTop: 2 }}>{demo.dept}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'oklch(0.55 0.13 155)', fontWeight: 700, flexShrink: 0 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'oklch(0.55 0.13 155)', display: 'inline-block' }}/>Online
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
