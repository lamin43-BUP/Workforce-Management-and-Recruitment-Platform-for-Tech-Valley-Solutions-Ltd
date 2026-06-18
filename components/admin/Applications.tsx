'use client';

import { useState } from 'react';
import { Card, Button, Pill, Input } from '@/components/ui';
import { Icon } from '@/components/ui/Icon';
import { APPLICANTS_DATA, JOBS_DATA } from '@/lib/data';

type Status = 'pending' | 'shortlisted';
const STATUS_TONE: Record<Status, 'neutral'|'primary'|'warning'|'danger'|'success'> = {
  pending: 'neutral', shortlisted: 'primary',
};

export default function AdminApplications() {
  const [apps, setApps] = useState(APPLICANTS_DATA.map(a => ({ ...a, status: a.status as Status })));
  const [jobFilter, setJobFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = apps.filter(a => {
    const q = search.toLowerCase();
    const matchSearch = !q || a.name.toLowerCase().includes(q) || a.jobTitle.toLowerCase().includes(q);
    const matchJob = jobFilter === 'all' || a.jobId === jobFilter;
    const matchStatus = statusFilter === 'all' || a.status === statusFilter;
    return matchSearch && matchJob && matchStatus;
  });

  const setStatus = (id: string, status: Status) => {
    setApps(as => as.map(a => a.id === id ? { ...a, status } : a));
  };

  const sel = apps.find(a => a.id === selected);

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--ink)', margin: 0 }}>Applications</h1>
          <p style={{ color: 'var(--ink-3)', fontSize: 14, margin: '4px 0 0' }}>{apps.length} total applicants</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Pill tone="neutral">{apps.filter(a => a.status === 'pending').length} pending</Pill>
          <Pill tone="primary">{apps.filter(a => a.status === 'shortlisted').length} shortlisted</Pill>
          </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search applicants…" style={{ minWidth: 200 }}/>
        <select value={jobFilter} onChange={e => setJobFilter(e.target.value)} style={{ padding: '8px 12px', borderRadius: 8, border: '1.5px solid var(--border)', background: 'var(--surface)', color: 'var(--ink)', fontSize: 13, fontFamily: 'var(--font-sans)' }}>
          <option value="all">All Jobs</option>
          {JOBS_DATA.map(j => <option key={j.id} value={j.id}>{j.title}</option>)}
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ padding: '8px 12px', borderRadius: 8, border: '1.5px solid var(--border)', background: 'var(--surface)', color: 'var(--ink)', fontSize: 13, fontFamily: 'var(--font-sans)' }}>
          <option value="all">All Statuses</option>
          {(['pending','shortlisted'] as Status[]).map(s => <option key={s} value={s} style={{ textTransform: 'capitalize' }}>{s}</option>)}
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: sel ? '1fr 320px' : '1fr', gap: 20 }}>
        {/* Table */}
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--surface-2)' }}>
                {['Applicant','Applied For','Score','Status','Applied','Actions'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((app, i) => (
                <tr key={app.id} onClick={() => setSelected(selected === app.id ? null : app.id)} style={{ borderTop: '1px solid var(--border)', background: selected === app.id ? 'var(--surface-2)' : i % 2 === 0 ? 'var(--surface)' : 'transparent', cursor: 'pointer', transition: 'background .15s' }}>
                  <td style={{ padding: '12px 16px' }}>
                    <div>
                      <p style={{ fontWeight: 600, color: 'var(--ink)', margin: 0, fontSize: 14 }}>{app.name}</p>
                      <p style={{ color: 'var(--ink-3)', margin: 0, fontSize: 12 }}>{app.email}</p>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', color: 'var(--ink-2)', fontSize: 13 }}>{app.jobTitle}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 40, height: 6, borderRadius: 99, background: 'var(--surface-3)', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${app.score}%`, background: app.score >= 80 ? 'var(--success)' : app.score >= 60 ? 'var(--warning)' : 'var(--danger)' }}/>
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 700, color: app.score >= 80 ? 'var(--success)' : app.score >= 60 ? 'var(--warning)' : 'var(--danger)' }}>{app.score}%</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <Pill tone={STATUS_TONE[app.status]} style={{ textTransform: 'capitalize' }}>{app.status}</Pill>
                  </td>
                  <td style={{ padding: '12px 16px', color: 'var(--ink-3)', fontSize: 12 }}>{app.appliedDate}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <Button variant="outline" size="sm" onClick={e => { e.stopPropagation(); setStatus(app.id, 'shortlisted'); }}>Shortlist</Button>
                      <Button variant="ghost" size="sm" onClick={e => { e.stopPropagation(); setStatus(app.id, 'pending'); }}><Icon name="close" size={13}/></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--ink-3)' }}>
              <Icon name="users" size={28} color="var(--ink-3)"/>
              <p style={{ marginTop: 10 }}>No applications found.</p>
            </div>
          )}
        </Card>

        {/* Detail panel */}
        {sel && (
          <Card style={{ padding: 22, alignSelf: 'flex-start' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, margin: 0, color: 'var(--ink)' }}>Applicant Detail</h3>
              <Button variant="ghost" size="sm" onClick={() => setSelected(null)}><Icon name="close" size={14}/></Button>
            </div>
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', color: 'var(--primary-ink)', fontWeight: 800, fontSize: 22 }}>
                {sel.name.split(' ').map(n => n[0]).join('')}
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, margin: '0 0 4px', color: 'var(--ink)' }}>{sel.name}</h3>
              <p style={{ color: 'var(--ink-2)', margin: '0 0 8px', fontSize: 13 }}>{sel.email}</p>
              <Pill tone={STATUS_TONE[sel.status]} style={{ textTransform: 'capitalize' }}>{sel.status}</Pill>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
              <Detail label="Applied For" value={sel.jobTitle}/>
              <Detail label="Experience" value={sel.experience}/>
              <Detail label="Education" value={sel.education}/>
              <Detail label="Exam Score" value={`${sel.score}%`} valueColor={sel.score >= 80 ? 'var(--success)' : sel.score >= 60 ? 'var(--warning)' : 'var(--danger)'}/>
            </div>
            <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', textTransform: 'uppercase', margin: '0 0 8px' }}>Skills</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
              {sel.skills.map(s => <Pill key={s} tone="primary" style={{ fontSize: 11 }}>{s}</Pill>)}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', textTransform: 'uppercase', margin: '0 0 4px' }}>Update Status</p>
              {(['shortlisted','interview','hired','rejected'] as Status[]).map(s => (
                <Button key={s} variant={sel.status === s ? 'primary' : 'outline'} size="sm" style={{ textTransform: 'capitalize' }} onClick={() => setStatus(sel.id, s)}>
                  {sel.status === s && <Icon name="check" size={12}/>} {s}
                </Button>
              ))}
            </div>
            <Button variant="outline" size="sm" style={{ width: '100%', marginTop: 12 }}>
              <Icon name="download" size={13}/> Download CV
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}

function Detail({ label, value, valueColor }: { label: string; value: string; valueColor?: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
      <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 600, color: valueColor || 'var(--ink)' }}>{value}</span>
    </div>
  );
}
