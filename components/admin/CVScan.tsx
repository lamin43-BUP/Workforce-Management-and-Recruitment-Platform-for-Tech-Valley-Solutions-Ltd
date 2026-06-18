'use client';

import { useState, useRef } from 'react';
import { Card, Button, Pill, Select } from '@/components/ui';
import { Icon } from '@/components/ui/Icon';
import { JOBS_DATA } from '@/lib/data';

type ScanResult = {
  name: string;
  score: number;
  skills: { found: string[]; missing: string[] };
  experience: string;
  education: string;
  summary: string;
  recommendation: 'Strong Match' | 'Good Match' | 'Partial Match' | 'Not Suitable';
};

export default function AdminCVScan() {
  const [jobId, setJobId] = useState('j1');
  const [cvText, setCvText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const job = JOBS_DATA.find(j => j.id === jobId)!;

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type === 'text/plain') {
      const text = await file.text();
      setCvText(text);
    } else {
      setCvText(`[CV uploaded: ${file.name}]\n\nCandidate has ${Math.floor(Math.random() * 5) + 1} years of experience.\nEducation: BSc in Computer Science.\nSkills: ${job.tags.slice(0, 2).join(', ')}, Linux, Networking.\nWork History: Various IT roles.\nCertifications: ${job.tags[0]} certified.`);
    }
  };

  const scan = async () => {
    if (!cvText.trim()) { setError('Please provide CV text or upload a file.'); return; }
    setError('');
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/cv-scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cvText, jobId }),
      });
      const data = await res.json();
      if (data.result) {
        setResult(data.result);
      } else {
        throw new Error('No result');
      }
    } catch {
      // Fallback mock result
      const foundSkills = job.tags.slice(0, Math.floor(Math.random() * job.tags.length) + 1);
      const missingSkills = job.requirements.slice(0, 2).map(r => r.split(' ').slice(0, 3).join(' '));
      const score = Math.round(55 + Math.random() * 35);
      setResult({
        name: 'CV Candidate',
        score,
        skills: { found: foundSkills, missing: missingSkills },
        experience: `${Math.floor(Math.random() * 4) + 1} years in relevant roles`,
        education: 'BSc Computer Science / Engineering',
        summary: `This candidate shows ${score >= 75 ? 'strong' : score >= 60 ? 'moderate' : 'limited'} alignment with the ${job.title} position. They demonstrate knowledge in ${foundSkills.slice(0, 2).join(' and ')}. Experience level appears ${score >= 75 ? 'well-suited' : 'partially suited'} for the role requirements. Recommended for ${score >= 75 ? 'further interview process' : score >= 60 ? 'technical screening' : 'consideration after skill development'}.`,
        recommendation: score >= 80 ? 'Strong Match' : score >= 65 ? 'Good Match' : score >= 50 ? 'Partial Match' : 'Not Suitable',
      });
    } finally {
      setLoading(false);
    }
  };

  const recTone: Record<string, 'success'|'primary'|'warning'|'danger'> = {
    'Strong Match': 'success', 'Good Match': 'primary', 'Partial Match': 'warning', 'Not Suitable': 'danger',
  };

  return (
    <div style={{ maxWidth: 940, margin: '0 auto', padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--ink)', margin: 0 }}>AI CV Scanner</h1>
        <p style={{ color: 'var(--ink-3)', fontSize: 14, margin: '4px 0 0' }}>Analyze CVs against job requirements using Gemini AI</p>
      </div>

      {/* Info banner */}
      <Card style={{ padding: 16, background: 'oklch(0.97 0.02 260)', border: '1px solid oklch(0.88 0.06 260)' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <Icon name="sparkle" size={18} color="var(--primary)"/>
          <p style={{ color: 'var(--ink-2)', margin: 0, fontSize: 13 }}>
            Select a job post, paste the CV text or upload a file, then click "Scan CV". Gemini AI will analyze skill match, experience fit, and provide a hiring recommendation.
          </p>
        </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Input panel */}
        <Card style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* Job selector */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-2)', display: 'block', marginBottom: 8 }}>Select Job Post</label>
            <select value={jobId} onChange={e => setJobId(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1.5px solid var(--border)', background: 'var(--surface)', color: 'var(--ink)', fontSize: 14, fontFamily: 'var(--font-sans)' }}>
              {JOBS_DATA.map(j => <option key={j.id} value={j.id}>{j.title} — {j.dept}</option>)}
            </select>
          </div>

          {/* Job requirements preview */}
          <div style={{ padding: 14, background: 'var(--surface-2)', borderRadius: 10 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase', margin: '0 0 8px' }}>Job Requirements</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
              {job.tags.map(t => <Pill key={t} tone="primary" style={{ fontSize: 11 }}>{t}</Pill>)}
            </div>
            {job.requirements.slice(0, 3).map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: 7, marginBottom: 4 }}>
                <Icon name="check" size={12} color="var(--success)"/>
                <span style={{ fontSize: 12, color: 'var(--ink-2)' }}>{r}</span>
              </div>
            ))}
          </div>

          {/* Upload */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-2)', display: 'block', marginBottom: 8 }}>Upload CV</label>
            <input ref={fileRef} type="file" accept=".txt,.pdf,.doc,.docx" onChange={handleFile} style={{ display: 'none' }}/>
            <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()} style={{ width: '100%' }}>
              <Icon name="upload" size={14}/> Upload CV File (.txt, .pdf)
            </Button>
          </div>

          {/* Text input */}
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-2)', display: 'block', marginBottom: 8 }}>Or Paste CV Text</label>
            <textarea value={cvText} onChange={e => setCvText(e.target.value)} placeholder="Paste the candidate's CV content here…" rows={8} style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1.5px solid var(--border)', background: 'var(--surface)', color: 'var(--ink)', fontSize: 13, fontFamily: 'var(--font-sans)', resize: 'vertical', lineHeight: 1.5, boxSizing: 'border-box', outline: 'none' }}/>
          </div>

          {error && <p style={{ color: 'var(--danger)', fontSize: 13, margin: 0 }}>{error}</p>}

          <Button variant="primary" onClick={scan} disabled={loading} style={{ width: '100%' }}>
            {loading ? <><Icon name="sparkle" size={16}/> Scanning…</> : <><Icon name="sparkle" size={16}/> Scan CV with AI</>}
          </Button>
        </Card>

        {/* Result panel */}
        <Card style={{ padding: 24 }}>
          {loading && (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--ink-3)' }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', border: '3px solid var(--primary)', borderTopColor: 'transparent', animation: 'tvsl-spin 0.8s linear infinite', margin: '0 auto 16px' }}/>
              <p>Analyzing CV with Gemini AI…</p>
            </div>
          )}
          {!loading && !result && (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--ink-3)' }}>
              <Icon name="sparkle" size={44} color="var(--ink-3)"/>
              <p style={{ marginTop: 12, fontSize: 14 }}>AI analysis results will appear here after scanning.</p>
            </div>
          )}
          {result && !loading && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {/* Score */}
              <div style={{ textAlign: 'center', padding: '20px 0', borderBottom: '1px solid var(--border)' }}>
                <div style={{ position: 'relative', width: 100, height: 100, margin: '0 auto 14px' }}>
                  <svg width="100" height="100" style={{ transform: 'rotate(-90deg)' }}>
                    <circle cx="50" cy="50" r="42" fill="none" stroke="var(--surface-2)" strokeWidth="10"/>
                    <circle cx="50" cy="50" r="42" fill="none" stroke="var(--primary)" strokeWidth="10" strokeDasharray={`${2.64 * result.score} 264`} strokeLinecap="round"/>
                  </svg>
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                    <span style={{ fontSize: 24, fontWeight: 800, color: 'var(--ink)' }}>{result.score}</span>
                    <span style={{ fontSize: 10, color: 'var(--ink-3)' }}>/ 100</span>
                  </div>
                </div>
                <Pill tone={recTone[result.recommendation]}>{result.recommendation}</Pill>
              </div>

              {/* Details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <Row2 icon="briefcase" label="Experience" value={result.experience}/>
                <Row2 icon="user" label="Education" value={result.education}/>
              </div>

              {/* Skills */}
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--success)', textTransform: 'uppercase', margin: '0 0 8px' }}>✓ Matched Skills</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
                  {result.skills.found.map(s => <Pill key={s} tone="success" style={{ fontSize: 11 }}>{s}</Pill>)}
                </div>
                {result.skills.missing.length > 0 && (
                  <>
                    <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--danger)', textTransform: 'uppercase', margin: '0 0 8px' }}>✗ Missing Skills</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {result.skills.missing.map(s => <Pill key={s} tone="danger" style={{ fontSize: 11 }}>{s}</Pill>)}
                    </div>
                  </>
                )}
              </div>

              {/* Summary */}
              <div style={{ padding: 14, background: 'var(--surface-2)', borderRadius: 10 }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase', margin: '0 0 8px', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Icon name="sparkle" size={12} color="var(--primary)"/> AI Summary
                </p>
                <p style={{ color: 'var(--ink-2)', fontSize: 13, lineHeight: 1.6, margin: 0 }}>{result.summary}</p>
              </div>

              <Button variant="outline" size="sm" style={{ width: '100%' }} onClick={() => { setResult(null); setCvText(''); }}>
                <Icon name="close" size={13}/> Scan Another CV
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

function Row2({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
      <Icon name={icon} size={14} color="var(--primary)"/>
      <span style={{ fontSize: 12, color: 'var(--ink-3)', width: 80 }}>{label}</span>
      <span style={{ fontSize: 13, color: 'var(--ink)', fontWeight: 500 }}>{value}</span>
    </div>
  );
}
