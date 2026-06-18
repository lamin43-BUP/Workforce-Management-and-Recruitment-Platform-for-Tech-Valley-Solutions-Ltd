'use client';

import { PublicNav, Footer } from './Nav';
import { Button, Pill, Card } from '../ui/index';
import { Icon } from '../ui/Icon';
import { JOBS_DATA } from '@/lib/data';

interface Props {
  go: (screen: string, jobId?: string) => void;
  jobId: string;
  openApply: (id: string) => void;
}

export default function JobDetailPage({ go, jobId, openApply }: Props) {
  const job = JOBS_DATA.find(j => j.id === jobId) || JOBS_DATA[0];
  return (
    <div style={{ background: 'var(--bg)' }}>
      <PublicNav go={go} active="jobs"/>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 48px 80px' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32, fontSize: 13, color: 'var(--muted)' }}>
          <button onClick={() => go('jobs')} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', padding: 0, fontFamily: 'var(--font-sans)', fontSize: 13 }}>Careers</button>
          <Icon name="chevronRight" size={13}/>
          <span style={{ color: 'var(--ink)', fontWeight: 600 }}>{job.title}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 40 }}>
          {/* Main */}
          <div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, marginBottom: 28 }}>
              <div style={{ width: 60, height: 60, borderRadius: 'var(--r-lg)', background: 'var(--primary-soft)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name="briefcase" size={26}/>
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                  <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.025em', margin: 0 }}>{job.title}</h1>
                  <Pill tone="success" size="sm">OPEN</Pill>
                </div>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  {[{icon:'briefcase',v:job.dept},{icon:'location',v:job.location},{icon:'clock',v:job.type},{icon:'dollar',v:job.salary}].map(m => (
                    <span key={m.v} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: 'var(--muted)' }}>
                      <Icon name={m.icon} size={13}/> {m.v}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 6, marginBottom: 32 }}>
              {job.tags.map(t => <Pill key={t} tone="primary" size="sm">{t}</Pill>)}
            </div>

            <section style={{ marginBottom: 32 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>About the Role</h2>
              <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--ink-2)', margin: 0 }}>{job.short} This is a full-time position based at our Dhaka headquarters, working with our {job.dept} team to deliver excellence to our enterprise clients.</p>
            </section>

            <section style={{ marginBottom: 32 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Responsibilities</h2>
              <ul style={{ paddingLeft: 20, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {job.responsibilities.map((r, i) => <li key={i} style={{ fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.5 }}>{r}</li>)}
              </ul>
            </section>

            <section style={{ marginBottom: 32 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Requirements</h2>
              <ul style={{ paddingLeft: 20, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {job.requirements.map((r, i) => <li key={i} style={{ fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.5 }}>{r}</li>)}
              </ul>
            </section>

            {/* Exam info */}
            <Card padding={20} style={{ background: 'var(--warning-soft)', border: '1px solid oklch(0.85 0.08 75)' }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <Icon name="clock" size={20} color="oklch(0.55 0.12 65)"/>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>AI Technical Exam Required</div>
                  <p style={{ fontSize: 14, color: 'var(--ink-2)', margin: '0 0 8px', lineHeight: 1.4 }}>
                    After submitting your application, you will take a 45-minute AI-generated technical exam with 20 questions specific to this role. The exam window opens: <strong>{job.examTime}</strong>
                  </p>
                  <Pill tone="warning" size="sm">Exam: {job.examTime}</Pill>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Card padding={24} style={{ position: 'sticky', top: 80 }}>
              <Button full size="lg" iconRight="arrowRight" onClick={() => openApply(job.id)} style={{ marginBottom: 12 }}>Apply Now</Button>
              <Button full size="md" variant="outline" onClick={() => go('jobs')}>Back to Jobs</Button>
              <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { l: 'Posted', v: job.posted },
                  { l: 'Application Deadline', v: job.deadline },
                  { l: 'Exam Time', v: job.examTime },
                  { l: 'Openings', v: `${job.slots} position${job.slots > 1 ? 's' : ''}` },
                  { l: 'Type', v: job.type },
                  { l: 'Location', v: job.location },
                ].map(m => (
                  <div key={m.l} style={{ padding: '8px 0', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                    <span style={{ color: 'var(--muted)' }}>{m.l}</span>
                    <span style={{ fontWeight: 600, color: 'var(--ink)' }}>{m.v}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
      <Footer go={go}/>
    </div>
  );
}
