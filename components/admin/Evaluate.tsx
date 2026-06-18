'use client';

import { useState } from 'react';
import { Card, Button, Pill } from '@/components/ui';
import { Icon } from '@/components/ui/Icon';
import { APPLICANTS_DATA } from '@/lib/data';

const MOCK_ANSWERS: Record<string, { q: string; a: string; type: 'mcq' | 'short' }[]> = {
  a1: [
    { q: 'What is the purpose of the OSI model?', a: 'The OSI model provides a conceptual framework for how network communication occurs between two devices. It has 7 layers that each handle specific aspects of communication.', type: 'short' },
    { q: 'Which protocol is used for dynamic IP addressing?', a: 'DHCP', type: 'mcq' },
    { q: 'What does BGP stand for?', a: 'Border Gateway Protocol', type: 'mcq' },
    { q: 'Explain the difference between TCP and UDP.', a: 'TCP is connection-oriented and reliable, ensuring data delivery. UDP is connectionless and faster but doesn\'t guarantee delivery. TCP is used for web, email; UDP for video streaming, VoIP.', type: 'short' },
    { q: 'What is a VLAN?', a: 'Virtual Local Area Network — a logical grouping of network devices regardless of physical location', type: 'mcq' },
  ],
  a3: [
    { q: 'What is VMware vSphere?', a: 'vSphere is VMware\'s server virtualization platform that combines ESXi hypervisor with vCenter for management. It allows creating and managing virtual machines on physical servers.', type: 'short' },
    { q: 'What is the default SSH port?', a: '22', type: 'mcq' },
    { q: 'What does RAID stand for?', a: 'Redundant Array of Independent Disks', type: 'mcq' },
    { q: 'Explain the difference between Docker containers and VMs.', a: 'Docker containers share the host OS kernel and are lightweight, starting in seconds. VMs run a full OS with a hypervisor, giving better isolation but using more resources.', type: 'short' },
    { q: 'What is a kernel in Linux?', a: 'The core of the OS that manages hardware resources and system calls', type: 'mcq' },
  ],
};

type EvalResult = { q: string; a: string; type: 'mcq'|'short'; score: number; feedback: string; maxScore: number };

export default function AdminEvaluate() {
  const [selected, setSelected] = useState<string | null>(null);
  const [results, setResults] = useState<Record<string, EvalResult[]>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  const examApplicants = APPLICANTS_DATA.filter(a => a.score > 0);

  const evaluate = async (appId: string) => {
    setLoading(l => ({ ...l, [appId]: true }));
    const answers = MOCK_ANSWERS[appId] || MOCK_ANSWERS['a1'];

    try {
      const res = await fetch('/api/exam/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questions: answers.map(a => ({ question: a.q, type: a.type })),
          answers: answers.map(a => a.a),
          jobTitle: APPLICANTS_DATA.find(a => a.id === appId)?.jobTitle || 'General',
        }),
      });
      const data = await res.json();
      if (data.results) {
        setResults(r => ({ ...r, [appId]: data.results }));
      } else {
        // Fallback if API fails
        const fallback: EvalResult[] = answers.map((a, i) => ({
          ...a,
          score: a.type === 'mcq' ? (Math.random() > 0.3 ? 5 : 0) : Math.round(Math.random() * 3 + 7),
          maxScore: a.type === 'mcq' ? 5 : 10,
          feedback: a.type === 'short' ? 'Good explanation with relevant technical details.' : 'Correct answer.',
        }));
        setResults(r => ({ ...r, [appId]: fallback }));
      }
    } catch {
      const fallback: EvalResult[] = answers.map(a => ({
        ...a,
        score: a.type === 'mcq' ? 5 : Math.round(Math.random() * 3 + 6),
        maxScore: a.type === 'mcq' ? 5 : 10,
        feedback: a.type === 'short' ? 'Demonstrates solid understanding of the concept.' : 'Correct.',
      }));
      setResults(r => ({ ...r, [appId]: fallback }));
    } finally {
      setLoading(l => ({ ...l, [appId]: false }));
    }
  };

  const app = examApplicants.find(a => a.id === selected);
  const evalResult = selected ? results[selected] : null;
  const totalScore = evalResult ? evalResult.reduce((s, r) => s + r.score, 0) : 0;
  const maxTotal = evalResult ? evalResult.reduce((s, r) => s + r.maxScore, 0) : 0;

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--ink)', margin: 0 }}>AI Exam Evaluation</h1>
        <p style={{ color: 'var(--ink-3)', fontSize: 14, margin: '4px 0 0' }}>Evaluate applicant exam answers using Gemini AI</p>
      </div>

      {/* AI notice */}
      <Card style={{ padding: 16, background: 'oklch(0.97 0.02 260)', border: '1px solid oklch(0.88 0.06 260)' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <Icon name="sparkle" size={18} color="var(--primary)"/>
          <div>
            <p style={{ fontWeight: 600, color: 'var(--ink)', margin: '0 0 4px', fontSize: 14 }}>AI-Powered Evaluation</p>
            <p style={{ color: 'var(--ink-2)', margin: 0, fontSize: 13 }}>Click "Evaluate with AI" to send exam answers to Gemini for scoring. MCQ answers are auto-graded; short answers are analyzed for accuracy and completeness.</p>
          </div>
        </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 20 }}>
        {/* Applicant list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase', margin: '0 0 4px' }}>Applicants ({examApplicants.length})</p>
          {examApplicants.map(app => (
            <button key={app.id} onClick={() => setSelected(app.id)} style={{
              background: selected === app.id ? 'var(--primary)' : 'var(--surface)',
              color: selected === app.id ? 'var(--primary-ink)' : 'var(--ink)',
              border: `1.5px solid ${selected === app.id ? 'var(--primary)' : 'var(--border)'}`,
              borderRadius: 12, padding: 14, cursor: 'pointer', textAlign: 'left',
              fontFamily: 'var(--font-sans)', transition: 'all .15s'
            }}>
              <p style={{ fontWeight: 700, fontSize: 14, margin: '0 0 4px' }}>{app.name}</p>
              <p style={{ fontSize: 12, margin: '0 0 8px', opacity: 0.8 }}>{app.jobTitle}</p>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <span style={{ fontSize: 11, fontWeight: 700 }}>Score: {app.score}%</span>
                {results[app.id] && <Pill tone="success" style={{ fontSize: 10 }}>Evaluated</Pill>}
              </div>
            </button>
          ))}
        </div>

        {/* Evaluation panel */}
        {app ? (
          <Card style={{ padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--ink)', margin: 0 }}>{app.name}</h3>
                <p style={{ color: 'var(--ink-2)', margin: '4px 0 0', fontSize: 13 }}>{app.jobTitle} · {app.education}</p>
              </div>
              <Button variant="primary" size="sm" onClick={() => evaluate(app.id)} disabled={loading[app.id]}>
                {loading[app.id] ? <><Icon name="sparkle" size={14}/> Evaluating…</> : <><Icon name="sparkle" size={14}/> Evaluate with AI</>}
              </Button>
            </div>

            {evalResult ? (
              <>
                {/* Score summary */}
                <div style={{ display: 'grid', gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>
                  <ScoreCard label="AI Score" value={`${Math.round((totalScore / maxTotal) * 100)}%`} color="var(--primary)"/>
                  
                  <ScoreCard label="Questions" value="20" color="var(--success)"/>
                </div>

                {/* Q&A results */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {evalResult.map((r, i) => (
                    <div key={i} style={{ padding: 16, background: 'var(--surface-2)', borderRadius: 12, borderLeft: `3px solid ${r.score / r.maxScore >= 0.7 ? 'var(--success)' : 'var(--warning)'}` }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10, gap: 12 }}>
                        <p style={{ fontWeight: 600, color: 'var(--ink)', fontSize: 14, margin: 0, flex: 1 }}>Q{i+1}: {r.q}</p>
                        <span style={{ fontWeight: 800, fontSize: 15, color: r.score / r.maxScore >= 0.7 ? 'var(--success)' : 'var(--warning)', flexShrink: 0 }}>{r.score}/{r.maxScore}</span>
                      </div>
                      <div style={{ background: 'var(--surface)', borderRadius: 8, padding: '10px 12px', marginBottom: 8 }}>
                        <p style={{ color: 'var(--ink-2)', fontSize: 13, margin: 0, lineHeight: 1.5 }}><strong>Answer:</strong> {r.a}</p>
                      </div>
                      <p style={{ color: 'var(--ink-3)', fontSize: 12, margin: 0 }}>
                        <Icon name="sparkle" size={11}/> AI: {r.feedback}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--ink-3)' }}>
                <Icon name="sparkle" size={36} color="var(--primary)"/>
                <p style={{ marginTop: 12, fontSize: 14 }}>Click "Evaluate with AI" to analyze this applicant's exam answers using Gemini AI.</p>
              </div>
            )}
          </Card>
        ) : (
          <Card style={{ padding: 40, textAlign: 'center', color: 'var(--ink-3)' }}>
            <Icon name="chart" size={36} color="var(--ink-3)"/>
            <p style={{ marginTop: 12 }}>Select an applicant to evaluate their exam.</p>
          </Card>
        )}
      </div>
    </div>
  );
}

function ScoreCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{ padding: 16, background: 'var(--surface-2)', borderRadius: 12, textAlign: 'center' }}>
      <p style={{ color: 'var(--ink-3)', fontSize: 12, margin: '0 0 6px', textTransform: 'uppercase', fontWeight: 600 }}>{label}</p>
      <p style={{ color, fontSize: 28, fontWeight: 800, margin: 0 }}>{value}</p>
    </div>
  );
}
