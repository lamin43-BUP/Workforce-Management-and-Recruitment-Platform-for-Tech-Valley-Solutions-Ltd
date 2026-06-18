'use client';

import { useState, useEffect, useRef } from 'react';
import { Button, Pill, Card } from '../ui/index';
import { Icon } from '../ui/Icon';
import { JOBS_DATA } from '@/lib/data';

interface Props {
  go: (screen: string) => void;
  jobId: string;
  onSubmit: () => void;
}

const FALLBACK_QUESTIONS = [
  { id: 'q1', type: 'mcq', topic: 'Networking Basics', text: 'Which OSI layer is responsible for routing packets between networks?', options: ['Layer 2 - Data Link', 'Layer 3 - Network', 'Layer 4 - Transport', 'Layer 5 - Session'], correct: 1, difficulty: 'Easy' },
  { id: 'q2', type: 'mcq', topic: 'Protocols', text: 'What does TCP stand for?', options: ['Transfer Control Protocol', 'Transmission Control Protocol', 'Transport Communication Protocol', 'Terminal Control Program'], correct: 1, difficulty: 'Easy' },
  { id: 'q3', type: 'mcq', topic: 'IP Addressing', text: 'What is the subnet mask for a /24 network?', options: ['255.255.0.0', '255.0.0.0', '255.255.255.0', '255.255.255.128'], correct: 2, difficulty: 'Easy' },
  { id: 'q4', type: 'mcq', topic: 'Routing', text: 'Which routing protocol uses the Bellman-Ford algorithm?', options: ['OSPF', 'BGP', 'RIP', 'EIGRP'], correct: 2, difficulty: 'Medium' },
  { id: 'q5', type: 'mcq', topic: 'Switching', text: 'What is a VLAN used for?', options: ['Speed optimization', 'Network segmentation', 'IP assignment', 'MAC filtering'], correct: 1, difficulty: 'Easy' },
  { id: 'q6', type: 'mcq', topic: 'Security', text: 'What does a firewall primarily do?', options: ['Speeds up network', 'Filters traffic', 'Assigns IPs', 'Compresses data'], correct: 1, difficulty: 'Easy' },
  { id: 'q7', type: 'mcq', topic: 'Cisco', text: 'Which Cisco command shows the routing table?', options: ['show ip route', 'show route', 'display ip route', 'list ip routes'], correct: 0, difficulty: 'Medium' },
  { id: 'q8', type: 'mcq', topic: 'Protocols', text: 'BGP is used for?', options: ['Internal routing', 'Wireless management', 'Internet routing between ISPs', 'VPN tunneling'], correct: 2, difficulty: 'Medium' },
  { id: 'q9', type: 'mcq', topic: 'OSI Model', text: 'Switches operate at which OSI layer?', options: ['Layer 1', 'Layer 2', 'Layer 3', 'Layer 4'], correct: 1, difficulty: 'Easy' },
  { id: 'q10', type: 'mcq', topic: 'DNS', text: 'What port does DNS use?', options: ['80', '443', '53', '25'], correct: 2, difficulty: 'Easy' },
  { id: 'q11', type: 'mcq', topic: 'IP Addressing', text: 'Class C IP range starts at?', options: ['10.0.0.0', '172.16.0.0', '192.0.0.0', '224.0.0.0'], correct: 2, difficulty: 'Medium' },
  { id: 'q12', type: 'mcq', topic: 'Wireless', text: 'What frequency does 802.11n use?', options: ['900 MHz only', '2.4 GHz only', '5 GHz only', 'Both 2.4 and 5 GHz'], correct: 3, difficulty: 'Medium' },
  { id: 'q13', type: 'mcq', topic: 'Troubleshooting', text: 'Which tool tests connectivity between hosts?', options: ['tracert only', 'ping', 'nslookup', 'arp'], correct: 1, difficulty: 'Easy' },
  { id: 'q14', type: 'mcq', topic: 'VPN', text: 'What does IPSec provide?', options: ['IP assignment', 'Secure encrypted tunnels', 'MAC address resolution', 'DNS resolution'], correct: 1, difficulty: 'Medium' },
  { id: 'q15', type: 'mcq', topic: 'Data Center', text: 'What is a rack unit (U)?', options: ['1.75 inches of vertical space', '1 inch', '2 inches', '3.5 inches'], correct: 0, difficulty: 'Medium' },
  { id: 'q16', type: 'short', topic: 'Network Design', text: 'Describe the difference between a hub, switch, and router and when you would use each.', difficulty: 'Medium' },
  { id: 'q17', type: 'short', topic: 'Troubleshooting', text: 'A user reports they cannot access the internet but can access local network resources. Describe your troubleshooting steps.', difficulty: 'Hard' },
  { id: 'q18', type: 'short', topic: 'Routing Protocols', text: 'Explain the key differences between OSPF and BGP. When would you choose one over the other?', difficulty: 'Hard' },
  { id: 'q19', type: 'short', topic: 'Security', text: 'What is a DMZ in network security? Describe a typical DMZ architecture.', difficulty: 'Medium' },
  { id: 'q20', type: 'short', topic: 'TVSL', text: 'Why do you want to work at Tech Valley Solutions Ltd.? How do your skills align with our networking and data center services?', difficulty: 'Easy' },
];

export default function ExamPage({ go, jobId, onSubmit }: Props) {
  const job = JOBS_DATA.find(j => j.id === jobId) || JOBS_DATA[0];
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState<typeof FALLBACK_QUESTIONS>([]);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState<Record<string, unknown>>({});
  const [idx, setIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45 * 60);
  const [submitted, setSubmitted] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (started && !submitted) {
      timerRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) { handleSubmit(); return 0; }
          return t - 1;
        });
      }, 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [started, submitted]);

  const startExam = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/exam/generate', {
        method: 'POST', headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ jobTitle: job.title, dept: job.dept }),
      });
      const data = await res.json();
      setQuestions(data.questions?.length >= 5 ? data.questions : FALLBACK_QUESTIONS);
    } catch {
      setQuestions(FALLBACK_QUESTIONS);
    }
    setLoading(false);
    setStarted(true);
  };

  const handleSubmit = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setSubmitted(true);
  };

  const mins = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const secs = (timeLeft % 60).toString().padStart(2, '0');
  const q = questions[idx];
  const answered = Object.keys(answers).length;

  if (submitted) return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Card padding={48} style={{ maxWidth: 480, textAlign: 'center' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--success-soft)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          <Icon name="check" size={28}/>
        </div>
        <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 8 }}>Exam Submitted!</h2>
        <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.55, marginBottom: 8 }}>
          You answered <strong>{answered}</strong> of <strong>{questions.length}</strong> questions.
        </p>
        <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.5, marginBottom: 24 }}>
          Your exam is being evaluated by AI. Results will be reviewed by our HR team. You&apos;ll hear back within 5 business days.
        </p>
        <Button onClick={onSubmit}>Return to Home</Button>
      </Card>
    </div>
  );

  if (!started) return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Card padding={40} style={{ maxWidth: 520 }}>
        <Pill tone="primary" icon="sparkle" size="md" style={{ marginBottom: 16 }}>AI-GENERATED EXAM</Pill>
        <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.025em', margin: '0 0 12px' }}>Technical Assessment</h2>
        <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.55, marginBottom: 24 }}>
          Position: <strong>{job.title}</strong> at TVSL
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
          {[{icon:'clock',l:'Duration',v:'45 minutes'},{icon:'file',l:'Questions',v:'20 questions'},{icon:'sparkle',l:'Generated by',v:'Gemini AI'},{icon:'award',l:'Pass score',v:'70 / 100'}].map(m => (
            <div key={m.l} style={{ background: 'var(--surface-2)', borderRadius: 'var(--r-md)', padding: '14px 16px', display: 'flex', gap: 12, alignItems: 'center' }}>
              <Icon name={m.icon} size={18} color="var(--primary)"/>
              <div>
                <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{m.l}</div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>{m.v}</div>
              </div>
            </div>
          ))}
        </div>
        <Card padding={14} style={{ background: 'var(--warning-soft)', border: '1px solid oklch(0.85 0.08 75)', marginBottom: 20 }}>
          <div style={{ fontSize: 13, color: 'oklch(0.45 0.1 65)' }}>
            Once started, the timer cannot be paused. Ensure you have a stable internet connection before proceeding.
          </div>
        </Card>
        <Button full size="lg" loading={loading} iconLeft="play" onClick={startExam}>
          {loading ? 'Generating Questions...' : 'Start Exam'}
        </Button>
        <button onClick={() => go('jobs')} style={{ background: 'none', border: 'none', color: 'var(--muted)', fontSize: 13, cursor: 'pointer', marginTop: 12, display: 'block', width: '100%', fontFamily: 'var(--font-sans)' }}>
          Return to jobs
        </button>
      </Card>
    </div>
  );

  if (!q) return null;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      {/* Exam header */}
      <header style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '14px 32px', display: 'flex', alignItems: 'center', gap: 20, position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 700 }}>{job.title} — Technical Assessment</div>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>AI-generated · {questions.length} questions · {answered} answered</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: timeLeft < 300 ? 'var(--danger-soft)' : 'var(--surface-2)', borderRadius: 'var(--r-md)' }}>
          <Icon name="clock" size={15} color={timeLeft < 300 ? 'var(--danger)' : 'var(--ink)'}/>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 700, color: timeLeft < 300 ? 'var(--danger)' : 'var(--ink)' }}>{mins}:{secs}</span>
        </div>
        <div style={{ height: 4, width: 160, background: 'var(--surface-3)', borderRadius: 4, overflow: 'hidden' }}>
          <div style={{ height: '100%', background: 'var(--primary)', borderRadius: 4, width: `${(answered / questions.length) * 100}%`, transition: 'width .3s' }}/>
        </div>
        <Button variant="outline" size="sm" onClick={handleSubmit}>Submit exam</Button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', flex: 1 }}>
        {/* Question navigator */}
        <aside style={{ background: 'var(--surface)', borderRight: '1px solid var(--border)', padding: 16 }} className="scroll-pretty">
          <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Questions</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {questions.map((qq, i) => {
              const ans = answers[qq.id] != null;
              return (
                <button key={qq.id} onClick={() => setIdx(i)} style={{
                  display: 'flex', gap: 10, alignItems: 'center', padding: '7px 10px',
                  background: idx === i ? 'var(--primary-soft)' : 'transparent',
                  color: idx === i ? 'var(--primary-soft-ink)' : 'var(--ink-2)',
                  border: 'none', borderRadius: 'var(--r-md)', cursor: 'pointer', textAlign: 'left',
                  fontSize: 13, fontWeight: idx === i ? 700 : 400, fontFamily: 'var(--font-sans)',
                }}>
                  <span style={{ width: 20, height: 20, borderRadius: '50%', background: ans ? 'var(--success)' : 'var(--surface-3)', color: ans ? 'white' : 'var(--muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, flexShrink: 0 }}>
                    {ans ? <Icon name="check" size={10}/> : i + 1}
                  </span>
                  <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{qq.topic}</span>
                  <span style={{ fontSize: 9, color: 'var(--muted)', textTransform: 'uppercase' }}>{qq.type}</span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Question area */}
        <section style={{ padding: '32px 48px', maxWidth: 840 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <Pill size="md">{q.topic}</Pill>
              <Pill size="md" tone={q.difficulty === 'Easy' ? 'success' : q.difficulty === 'Medium' ? 'warning' : 'danger'}>{q.difficulty}</Pill>
              <Pill size="sm" tone="neutral">{q.type.toUpperCase()}</Pill>
            </div>
            <span style={{ fontSize: 13, color: 'var(--muted)' }}>Q{idx + 1} / {questions.length}</span>
          </div>

          <h2 style={{ fontSize: 20, fontWeight: 700, lineHeight: 1.4, letterSpacing: '-0.015em', margin: '0 0 24px' }}>{q.text}</h2>

          {q.type === 'mcq' && q.options && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {q.options.map((opt, i) => (
                <button key={i} onClick={() => setAnswers(a => ({...a, [q.id]: i}))} style={{
                  display: 'flex', gap: 12, alignItems: 'center', textAlign: 'left', padding: '14px 16px',
                  background: answers[q.id] === i ? 'var(--primary-soft)' : 'var(--surface)',
                  border: `1px solid ${answers[q.id] === i ? 'var(--primary)' : 'var(--border-strong)'}`,
                  borderRadius: 'var(--r-md)', cursor: 'pointer', fontSize: 15, color: 'var(--ink)',
                  fontFamily: 'var(--font-sans)', fontWeight: answers[q.id] === i ? 600 : 400,
                }}>
                  <span style={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${answers[q.id] === i ? 'var(--primary)' : 'var(--border-strong)'}`, background: answers[q.id] === i ? 'var(--primary)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {answers[q.id] === i && <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'white' }}/>}
                  </span>
                  <span style={{ flex: 1 }}>{opt}</span>
                </button>
              ))}
            </div>
          )}

          {q.type === 'short' && (
            <textarea value={(answers[q.id] as string) || ''} onChange={e => setAnswers(a => ({...a, [q.id]: e.target.value}))}
              rows={10} placeholder="Write your answer here..."
              style={{ width: '100%', padding: '14px 16px', background: 'var(--surface)', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-md)', fontSize: 15, lineHeight: 1.55, resize: 'vertical', outline: 'none', color: 'var(--ink)', fontFamily: 'var(--font-sans)' }}/>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 28 }}>
            <Button variant="outline" iconLeft="chevronLeft" onClick={() => setIdx(Math.max(0, idx - 1))} disabled={idx === 0} style={{ opacity: idx === 0 ? 0.4 : 1 }}>Previous</Button>
            {idx < questions.length - 1 ? (
              <Button iconRight="arrowRight" onClick={() => setIdx(idx + 1)}>Next question</Button>
            ) : (
              <Button iconRight="check" onClick={handleSubmit}>Submit exam</Button>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
