'use client';

import { PublicNav, Footer } from './Nav';
import { Button, Pill, Card } from '../ui/index';
import { Icon } from '../ui/Icon';
import { JOBS_DATA } from '@/lib/data';

interface ListProps {
  go: (screen: string, jobId?: string) => void;
  openJob: (id: string) => void;
}

export default function JobsListPage({ go, openJob }: ListProps) {
  return (
    <div style={{ background: 'var(--bg)' }}>
      <PublicNav go={go} active="jobs"/>
      <section style={{ padding: '60px 48px', maxWidth: 1280, margin: '0 auto' }}>
        <Pill tone="primary" size="md" icon="sparkle" style={{ marginBottom: 16 }}>CAREERS AT TVSL</Pill>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
          <div>
            <h1 style={{ fontSize: 48, fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 12px' }}>Open Positions</h1>
            <p style={{ fontSize: 16, color: 'var(--muted)', margin: 0 }}>
              Join the team building enterprise networking solutions across Bangladesh.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <select style={{ padding: '8px 12px', background: 'var(--surface)', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-md)', fontSize: 14, color: 'var(--ink)' }}>
              <option>All Departments</option>
              {['IT', 'Networking', 'Server', 'Sales & Marketing', 'Management'].map(d => <option key={d}>{d}</option>)}
            </select>
            <select style={{ padding: '8px 12px', background: 'var(--surface)', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-md)', fontSize: 14, color: 'var(--ink)' }}>
              <option>All Types</option>
              <option>Full-time</option>
              <option>Part-time</option>
            </select>
          </div>
        </div>

        {/* Notice banner */}
        <div style={{ background: 'var(--primary-soft)', border: '1px solid var(--primary-ring)', borderRadius: 'var(--r-md)', padding: '14px 20px', marginBottom: 28, display: 'flex', gap: 12, alignItems: 'center' }}>
          <Icon name="info" size={16} color="var(--primary)"/>
          <span style={{ fontSize: 14, color: 'var(--primary-soft-ink)' }}>
            <strong>Important:</strong> After applying, you will receive exam timing details via email. AI-generated technical exams are mandatory for all positions.
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {JOBS_DATA.map(job => (
            <Card key={job.id} hover padding={0} onClick={() => openJob(job.id)} style={{ cursor: 'pointer', overflow: 'hidden', transition: 'border-color .15s, box-shadow .15s' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 24, padding: '24px 28px' }}>
                <div style={{ width: 52, height: 52, borderRadius: 'var(--r-lg)', background: 'var(--primary-soft)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon name="briefcase" size={22}/>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.015em' }}>{job.title}</span>
                    <Pill tone="success" size="sm">HIRING</Pill>
                  </div>
                  <p style={{ fontSize: 14, color: 'var(--muted)', margin: '0 0 10px', lineHeight: 1.4 }}>{job.short}</p>
                  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                    {[
                      { icon: 'briefcase', v: job.dept },
                      { icon: 'location', v: job.location },
                      { icon: 'calendar', v: `Deadline: ${job.deadline}` },
                      { icon: 'clock', v: `Exam: ${job.examTime}` },
                    ].map(m => (
                      <span key={m.v} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: 'var(--muted-2)' }}>
                        <Icon name={m.icon} size={13} color="var(--muted)"/> {m.v}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, flexShrink: 0 }}>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                    {job.tags.slice(0, 3).map(t => <Pill key={t} tone="neutral" size="sm">{t}</Pill>)}
                  </div>
                  <Button size="sm" iconRight="arrowRight" onClick={e => { e.stopPropagation(); openJob(job.id); }}>View Details</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
      <Footer go={go}/>
    </div>
  );
}
