'use client';

import { Card, Stat, Pill, Button } from '@/components/ui';
import { Icon } from '@/components/ui/Icon';
import { APPLICANTS_DATA, JOBS_DATA, TEAMS_DATA, NOTICES_DATA } from '@/lib/data';

const PIPELINE = [
  { label: 'Applied', count: 5, color: 'var(--info)' },
  { label: 'Exam Taken', count: 4, color: 'var(--primary)' },
  { label: 'Shortlisted', count: 2, color: 'var(--warning)' },
];

const RECENT_ACTIVITY = [
  { text: 'Abu Sayeed shortlisted for Network Engineer', time: '2 hours ago', icon: 'check', tone: 'success' },
  { text: 'Farhan Haque submitted Server Admin exam (91%)', time: '5 hours ago', icon: 'chart', tone: 'primary' },
  { text: 'New application: Tania Sultana (IT Support)', time: '1 day ago', icon: 'user', tone: 'info' },
  { text: 'Job post "Sales Executive" expires in 2 days', time: '1 day ago', icon: 'warning', tone: 'warning' },
  { text: 'Network maintenance notice published', time: '2 days ago', icon: 'bell', tone: 'neutral' },
];

export default function AdminDashboard({ go }: { go: (screen: string) => void }) {
  const totalEmployees = TEAMS_DATA.reduce((s, t) => s + t.members.length, 0);
  const pending = APPLICANTS_DATA.filter(a => a.status === 'pending').length;
  const shortlisted = APPLICANTS_DATA.filter(a => a.status === 'shortlisted').length;

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--ink)', margin: 0 }}>Admin Dashboard</h1>
          <p style={{ color: 'var(--ink-3)', fontSize: 14, margin: '4px 0 0' }}>Welcome back, Khaleda — here's the overview</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Button variant="outline" size="sm" onClick={() => go('admin-jobs')}><Icon name="briefcase" size={14}/>Post Job</Button>
          <Button variant="primary" size="sm" onClick={() => go('admin-applications')}><Icon name="users" size={14}/>View Applications</Button>
        </div>
      </div>

      {/* KPI stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        <Stat label="Total Employees" value={String(totalEmployees)} icon="users" delta="+2 this month" deltaTone="success" sublabel="Across 5 teams"/>
        <Stat label="Open Positions" value={String(JOBS_DATA.length)} icon="briefcase" sublabel="4 active posts"/>
        <Stat label="Applicants" value={String(APPLICANTS_DATA.length)} icon="user" sublabel={`${pending} pending review`}/>
        <Stat label="Shortlisted" value={String(shortlisted)} icon="check" delta="Ready for interview" deltaTone="success"/>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 20 }}>
        {/* Recruitment pipeline */}
        <Card style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)', margin: '0 0 20px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icon name="chart" size={16} color="var(--primary)"/> Recruitment Pipeline
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {PIPELINE.map(stage => (
              <div key={stage.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <span style={{ fontSize: 13, color: 'var(--ink-2)', fontWeight: 500 }}>{stage.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)' }}>{stage.count}</span>
                </div>
                <div style={{ height: 8, background: 'var(--surface-2)', borderRadius: 99, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${(stage.count / 5) * 100}%`, background: stage.color, borderRadius: 99, transition: 'width .5s' }}/>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
            <Button variant="outline" size="sm" onClick={() => go('admin-applications')} style={{ width: '100%' }}>
              <Icon name="users" size={14}/> Manage Applications
            </Button>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icon name="sparkle" size={16} color="var(--primary)"/> Quick Actions
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { label: 'Evaluate Exam Results', icon: 'chart', screen: 'admin-evaluate', tone: 'primary' },
              { label: 'Scan CVs with AI', icon: 'sparkle', screen: 'admin-cvscan', tone: 'success' },
              { label: 'Manage Job Posts', icon: 'briefcase', screen: 'admin-jobs', tone: 'info' },
              { label: 'Manage Employees', icon: 'users', screen: 'admin-employees', tone: 'warning' },
            ].map(a => (
              <button key={a.label} onClick={() => go(a.screen)} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
                background: 'var(--surface-2)', border: 'none', borderRadius: 10, cursor: 'pointer',
                fontFamily: 'var(--font-sans)', fontWeight: 500, color: 'var(--ink)', fontSize: 14,
                transition: 'background .15s', textAlign: 'left'
              }}>
                <Icon name={a.icon} size={16} color="var(--primary)"/>
                {a.label}
                <Icon name="arrowRight" size={14} color="var(--ink-3)" style={{ marginLeft: 'auto' }}/>
              </button>
            ))}
          </div>
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Recent Activity */}
        <Card style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icon name="bell" size={16} color="var(--primary)"/> Recent Activity
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {RECENT_ACTIVITY.map((a, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon name={a.icon} size={14} color="var(--primary)"/>
                </div>
                <div>
                  <p style={{ color: 'var(--ink)', fontSize: 13, margin: '0 0 2px', lineHeight: 1.4 }}>{a.text}</p>
                  <p style={{ color: 'var(--ink-3)', fontSize: 11, margin: 0 }}>{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Open Jobs */}
        <Card style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icon name="briefcase" size={16} color="var(--primary)"/> Active Job Posts
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {JOBS_DATA.map(j => {
              const apps = APPLICANTS_DATA.filter(a => a.jobId === j.id).length;
              return (
                <div key={j.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', background: 'var(--surface-2)', borderRadius: 10 }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 600, color: 'var(--ink)', margin: 0, fontSize: 13 }}>{j.title}</p>
                    <p style={{ color: 'var(--ink-3)', margin: 0, fontSize: 11 }}>{j.dept} · Deadline: {j.deadline}</p>
                  </div>
                  <Pill tone="info">{apps} applied</Pill>
                </div>
              );
            })}
          </div>
          <Button variant="outline" size="sm" onClick={() => go('admin-jobs')} style={{ width: '100%', marginTop: 14 }}>
            <Icon name="briefcase" size={14}/> Manage Jobs
          </Button>
        </Card>
      </div>

      {/* Notices */}
      <Card style={{ padding: 24 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icon name="bell" size={16} color="var(--primary)"/> Recent Notices
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          {NOTICES_DATA.map(n => (
            <div key={n.id} style={{ padding: 14, background: 'var(--surface-2)', borderRadius: 10, borderLeft: `3px solid ${n.priority === 'high' ? 'var(--danger)' : n.priority === 'medium' ? 'var(--warning)' : 'var(--info)'}` }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <p style={{ fontWeight: 600, fontSize: 13, color: 'var(--ink)', margin: 0 }}>{n.title}</p>
                <Pill tone={n.priority === 'high' ? 'danger' : n.priority === 'medium' ? 'warning' : 'info'} style={{ fontSize: 10 }}>{n.priority}</Pill>
              </div>
              <p style={{ color: 'var(--ink-2)', fontSize: 12, margin: 0, lineHeight: 1.5 }}>{n.body.slice(0, 80)}…</p>
              <p style={{ color: 'var(--ink-3)', fontSize: 11, margin: '6px 0 0' }}>{n.date}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
