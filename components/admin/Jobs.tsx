'use client';

import { useState } from 'react';
import { Card, Button, Pill, Input, Select, Textarea } from '@/components/ui';
import { Icon } from '@/components/ui/Icon';
import { JOBS_DATA, APPLICANTS_DATA } from '@/lib/data';

type Job = typeof JOBS_DATA[0];

export default function AdminJobs() {
  const [jobs, setJobs] = useState(JOBS_DATA);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: '', dept: '', type: 'Full-time', salary: '', deadline: '', examTime: '', slots: '1', short: '' });

  const handleSubmit = () => {
    if (!form.title || !form.dept) return;
    if (editId) {
      setJobs(js => js.map(j => j.id === editId ? { ...j, ...form, slots: parseInt(form.slots), tags: [], requirements: [], responsibilities: [] } : j));
    } else {
      const newJob: Job = {
        id: `j${Date.now()}`, ...form, slots: parseInt(form.slots), posted: 'Just now',
        location: 'Dhaka, Bangladesh',
        tags: [], requirements: [], responsibilities: [],
      };
      setJobs(js => [...js, newJob]);
    }
    setShowForm(false);
    setEditId(null);
    setForm({ title: '', dept: '', type: 'Full-time', salary: '', deadline: '', examTime: '', slots: '1', short: '' });
  };

  const handleEdit = (job: Job) => {
    setForm({ title: job.title, dept: job.dept, type: job.type, salary: job.salary, deadline: job.deadline, examTime: job.examTime, slots: String(job.slots), short: job.short });
    setEditId(job.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => setJobs(js => js.filter(j => j.id !== id));

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--ink)', margin: 0 }}>Job Posts</h1>
          <p style={{ color: 'var(--ink-3)', fontSize: 14, margin: '4px 0 0' }}>{jobs.length} active positions</p>
        </div>
        <Button variant="primary" size="sm" onClick={() => { setShowForm(true); setEditId(null); }}>
          <Icon name="plus" size={14}/> Post New Job
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <Card style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)', margin: '0 0 20px' }}>{editId ? 'Edit Job Post' : 'New Job Post'}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-2)', display: 'block', marginBottom: 6 }}>Job Title *</label>
              <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Network Engineer"/>
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-2)', display: 'block', marginBottom: 6 }}>Department *</label>
              <Input value={form.dept} onChange={e => setForm(f => ({ ...f, dept: e.target.value }))} placeholder="e.g. Networking"/>
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-2)', display: 'block', marginBottom: 6 }}>Salary Range</label>
              <Input value={form.salary} onChange={e => setForm(f => ({ ...f, salary: e.target.value }))} placeholder="e.g. ৳50,000 – ৳80,000/mo"/>
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-2)', display: 'block', marginBottom: 6 }}>Vacancies</label>
              <Input type="number" value={form.slots} onChange={e => setForm(f => ({ ...f, slots: e.target.value }))} min="1"/>
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-2)', display: 'block', marginBottom: 6 }}>Application Deadline</label>
              <Input type="date" value={form.deadline} onChange={e => setForm(f => ({ ...f, deadline: e.target.value }))}/>
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-2)', display: 'block', marginBottom: 6 }}>Exam Date & Time</label>
              <Input value={form.examTime} onChange={e => setForm(f => ({ ...f, examTime: e.target.value }))} placeholder="e.g. June 25, 2025 · 10:00 AM"/>
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-2)', display: 'block', marginBottom: 6 }}>Short Description</label>
              <Textarea value={form.short} onChange={e => setForm(f => ({ ...f, short: e.target.value }))} rows={3} placeholder="Brief description of the role…"/>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 18, justifyContent: 'flex-end' }}>
            <Button variant="outline" size="sm" onClick={() => setShowForm(false)}>Cancel</Button>
            <Button variant="primary" size="sm" onClick={handleSubmit}><Icon name="check" size={14}/>{editId ? 'Update Post' : 'Publish Job'}</Button>
          </div>
        </Card>
      )}

      {/* Jobs list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {jobs.map(job => {
          const appCount = APPLICANTS_DATA.filter(a => a.jobId === job.id).length;
          return (
            <Card key={job.id} style={{ padding: 22 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon name="briefcase" size={22} color="var(--primary)"/>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)', margin: 0 }}>{job.title}</h3>
                    <Pill tone="success">Active</Pill>
                    <Pill tone="info">{job.slots} slot{job.slots > 1 ? 's' : ''}</Pill>
                  </div>
                  <p style={{ color: 'var(--ink-2)', fontSize: 13, margin: '0 0 10px', lineHeight: 1.5 }}>{job.short}</p>
                  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                    <Meta icon="briefcase" value={job.dept}/>
                    <Meta icon="mapPin" value={job.location}/>
                    <Meta icon="calendar" value={`Deadline: ${job.deadline}`}/>
                    <Meta icon="clock" value={`Exam: ${job.examTime}`}/>
                    <Meta icon="users" value={`${appCount} applicant${appCount !== 1 ? 's' : ''}`}/>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                  <Button variant="outline" size="sm" onClick={() => handleEdit(job)}><Icon name="edit" size={13}/> Edit</Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(job.id)}><Icon name="close" size={13}/> Delete</Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function Meta({ icon, value }: { icon: string; value: string }) {
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--ink-3)', fontSize: 12 }}>
      <Icon name={icon} size={12}/> {value}
    </span>
  );
}
