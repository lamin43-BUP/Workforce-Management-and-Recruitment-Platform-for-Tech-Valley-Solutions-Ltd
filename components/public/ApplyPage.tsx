'use client';

import { useState } from 'react';
import { PublicNav, Footer } from './Nav';
import { Button, Pill, Card, Input, Textarea } from '../ui/index';
import { Icon } from '../ui/Icon';
import { JOBS_DATA } from '@/lib/data';

interface ApplyProps {
  go: (screen: string, jobId?: string) => void;
  jobId: string;
  openExam: (id: string) => void;
}

export default function ApplyPage({ go, jobId, openExam }: ApplyProps) {
  const job = JOBS_DATA.find(j => j.id === jobId) || JOBS_DATA[0];
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', age: '', email: '', phone: '', school: '', college: '', university: '', subject: '', q1: '', q2: '', cvName: '' });
  const [submitted, setSubmitted] = useState(false);

  if (submitted) return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <PublicNav go={go}/>
      <Card padding={48} style={{ maxWidth: 520, textAlign: 'center' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--success-soft)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          <Icon name="check" size={28}/>
        </div>
        <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 12 }}>Application Submitted!</h2>
        <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.55, marginBottom: 24 }}>
          Your application for <strong>{job.title}</strong> has been received. Your AI exam is scheduled for <strong>{job.examTime}</strong>. Check your email for confirmation.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <Button onClick={() => openExam(jobId)}>Start Exam Now</Button>
          <Button variant="outline" onClick={() => go('jobs')}>View More Jobs</Button>
        </div>
      </Card>
    </div>
  );

  return (
    <div style={{ background: 'var(--bg)' }}>
      <PublicNav go={go}/>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '48px 24px 80px' }}>
        <button onClick={() => step > 1 ? setStep(s => s - 1) : go('job', jobId)} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, marginBottom: 24, fontFamily: 'var(--font-sans)' }}>
          <Icon name="chevronLeft" size={16}/> {step > 1 ? 'Previous step' : 'Back to job'}
        </button>

        <div style={{ marginBottom: 32 }}>
          <Pill tone="primary" size="md" style={{ marginBottom: 12 }}>APPLY FOR POSITION</Pill>
          <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.025em', margin: '0 0 8px' }}>{job.title}</h1>
          <p style={{ fontSize: 14, color: 'var(--muted)', margin: 0 }}>{job.dept} · {job.location} · {job.type}</p>
        </div>

        {/* Steps indicator */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
          {['Personal Info', 'Education', 'Questions & CV'].map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700,
                background: i + 1 < step ? 'var(--success)' : i + 1 === step ? 'var(--primary)' : 'var(--surface-3)',
                color: i + 1 <= step ? 'white' : 'var(--muted)', flexShrink: 0,
              }}>{i + 1 < step ? <Icon name="check" size={13}/> : i + 1}</div>
              <span style={{ fontSize: 13, fontWeight: i + 1 === step ? 700 : 400, color: i + 1 === step ? 'var(--ink)' : 'var(--muted)', flex: 1 }}>{s}</span>
              {i < 2 && <div style={{ height: 1, background: 'var(--border)', flex: 1 }}/>}
            </div>
          ))}
        </div>

        <Card padding={32}>
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 4px' }}>Personal Information</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <Input label="Full Name *" placeholder="Your full name" value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))}/>
                <Input label="Age *" type="number" placeholder="Your age" value={form.age} onChange={e => setForm(f => ({...f, age: e.target.value}))}/>
                <Input label="Email Address *" type="email" icon="mail" placeholder="you@email.com" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))}/>
                <Input label="Phone Number *" icon="phone" placeholder="+880..." value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))}/>
              </div>
              <Button iconRight="arrowRight" onClick={() => setStep(2)} disabled={!form.name || !form.email}>Continue to Education</Button>
            </div>
          )}
          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 4px' }}>Educational Background</h3>
              <Input label="School" placeholder="Secondary school name" value={form.school} onChange={e => setForm(f => ({...f, school: e.target.value}))}/>
              <Input label="College / Higher Secondary" placeholder="College name" value={form.college} onChange={e => setForm(f => ({...f, college: e.target.value}))}/>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <Input label="University / Institute" placeholder="University name" value={form.university} onChange={e => setForm(f => ({...f, university: e.target.value}))}/>
                <Input label="Subject / Major" placeholder="e.g. Computer Science, EEE" value={form.subject} onChange={e => setForm(f => ({...f, subject: e.target.value}))}/>
              </div>
              <Button iconRight="arrowRight" onClick={() => setStep(3)}>Continue to Questions</Button>
            </div>
          )}
          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 4px' }}>Application Questions & CV</h3>
              <Textarea label={`Why are you interested in the ${job.title} role at TVSL?`} rows={4} placeholder="Tell us about your motivation..." value={form.q1} onChange={e => setForm(f => ({...f, q1: e.target.value}))}/>
              <Textarea label="Briefly describe your most relevant experience for this position" rows={4} placeholder="Describe relevant projects, certifications, or work experience..." value={form.q2} onChange={e => setForm(f => ({...f, q2: e.target.value}))}/>
              
              {/* CV Upload */}
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-2)', display: 'block', marginBottom: 6 }}>CV / Resume *</label>
                <div style={{ border: '2px dashed var(--border-strong)', borderRadius: 'var(--r-md)', padding: '28px', textAlign: 'center', background: 'var(--surface-2)', cursor: 'pointer' }}
                  onClick={() => setForm(f => ({...f, cvName: 'resume.pdf'}))}>
                  <Icon name="upload" size={24} color="var(--muted)" style={{ display: 'block', margin: '0 auto 8px' }}/>
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{form.cvName || 'Click to upload your CV'}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>PDF or DOCX · Max 5MB</div>
                </div>
              </div>

              <Card padding={14} style={{ background: 'var(--primary-soft)', border: '1px solid var(--primary-ring)' }}>
                <div style={{ fontSize: 13, color: 'var(--primary-soft-ink)' }}>
                  <strong>Exam Notice:</strong> Your technical exam is scheduled for <strong>{job.examTime}</strong>. You will receive login instructions via email. The exam is 45 minutes with 20 AI-generated questions.
                </div>
              </Card>

              <Button size="lg" iconRight="check" onClick={() => setSubmitted(true)} disabled={!form.q1 || !form.cvName}>Submit Application</Button>
            </div>
          )}
        </Card>
      </div>
      <Footer go={go}/>
    </div>
  );
}
