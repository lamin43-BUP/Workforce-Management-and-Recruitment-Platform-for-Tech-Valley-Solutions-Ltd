'use client';

import { PublicNav, Footer } from './Nav';
import { Button, Pill, Card } from '../ui/index';
import { Icon } from '../ui/Icon';

interface Props { go: (screen: string, jobId?: string) => void; }

export default function LandingPage({ go }: Props) {
  return (
    <div style={{ background: 'var(--bg)', color: 'var(--ink)' }}>
      <PublicNav go={go} active="home"/>

      {/* ── HERO ── */}
      <section style={{ padding: '88px 56px 104px', maxWidth: 1320, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 80, alignItems: 'center' }}>

          {/* ── LEFT: Company name + info + CTAs ── */}
          <div>
            {/* Badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'oklch(0.94 0.03 260)', border: '1px solid oklch(0.86 0.06 260)', borderRadius: 99, padding: '6px 16px', fontSize: 11, fontWeight: 700, color: 'oklch(0.30 0.18 260)', letterSpacing: '0.05em', marginBottom: 28 }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              NETWORKING &amp; DATA CENTER SOLUTIONS
            </div>

            {/* Heading */}
            <h1 style={{ fontSize: 78, lineHeight: 0.96, letterSpacing: '-0.045em', fontWeight: 900, margin: '0 0 26px', fontFamily: 'var(--font-display)', color: 'oklch(0.12 0.02 260)' }}>
              Tech Valley<br/>
              <span style={{ background: 'linear-gradient(135deg, oklch(0.26 0.20 260) 0%, oklch(0.46 0.18 240) 55%, oklch(0.38 0.16 215) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Solutions Ltd.</span>
            </h1>

            {/* Description */}
            <p style={{ fontSize: 17, lineHeight: 1.7, color: 'oklch(0.46 0.015 250)', margin: '0 0 36px', maxWidth: 520 }}>
              Enterprise networking infrastructure, data center management, server solutions, power systems, and managed IT services — trusted by <strong style={{ color: 'oklch(0.28 0.18 260)', fontWeight: 700 }}>200+ businesses</strong> across Bangladesh.
            </p>

            {/* CTA buttons */}
            <div style={{ display: 'flex', gap: 14, marginBottom: 48 }}>
              <button onClick={() => go('jobs')} style={{ display: 'flex', alignItems: 'center', gap: 9, background: 'oklch(0.26 0.18 260)', color: 'white', border: 'none', borderRadius: 12, padding: '15px 30px', fontWeight: 700, fontSize: 15, cursor: 'pointer', fontFamily: 'var(--font-sans)', letterSpacing: '-0.01em', boxShadow: '0 8px 24px oklch(0.26 0.18 260 / 0.35)', transition: 'all .2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'oklch(0.20 0.18 260)'; (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'oklch(0.26 0.18 260)'; (e.currentTarget as HTMLButtonElement).style.transform = 'none'; }}>
                View Open Positions
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </button>
              <button onClick={() => go('about')} style={{ display: 'flex', alignItems: 'center', gap: 9, background: 'transparent', color: 'oklch(0.26 0.18 260)', border: '2px solid oklch(0.82 0.06 260)', borderRadius: 12, padding: '15px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer', fontFamily: 'var(--font-sans)', letterSpacing: '-0.01em', transition: 'all .2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'oklch(0.50 0.12 260)'; (e.currentTarget as HTMLButtonElement).style.background = 'oklch(0.96 0.02 260)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'oklch(0.82 0.06 260)'; (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}>
                About TVSL
              </button>
            </div>

            {/* Trust indicators */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, paddingTop: 28, borderTop: '1px solid oklch(0.91 0.008 260)' }}>
              <div style={{ display: 'flex', gap: -6 }}>
                {['oklch(0.42 0.15 260)','oklch(0.52 0.14 155)','oklch(0.48 0.14 230)','oklch(0.55 0.14 75)'].map((c,i) => (
                  <div key={i} style={{ width: 34, height: 34, borderRadius: '50%', background: c, border: '2px solid white', marginLeft: i > 0 ? -10 : 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 11, fontWeight: 800 }}>{['K','S','A','R'][i]}</div>
                ))}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'oklch(0.22 0.02 260)' }}>Trusted by enterprise leaders</div>
                <div style={{ fontSize: 12, color: 'oklch(0.52 0.012 250)', marginTop: 1 }}>ISO-certified · 200+ clients · Since 2009</div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Stats cards grid ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Top stat cards 2×2 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {[
                { n:'14+',   l:'Years of service',   icon:'📅', bg:'oklch(0.94 0.03 260)', nb:'oklch(0.86 0.08 260)', nc:'oklch(0.22 0.16 260)', lc:'oklch(0.38 0.10 260)' },
                { n:'200+', l:'Enterprise clients',  icon:'🏢', bg:'oklch(0.95 0.04 155)', nb:'oklch(0.86 0.08 155)', nc:'oklch(0.28 0.14 155)', lc:'oklch(0.38 0.10 155)' },
                { n:'100+', l:'Team members',        icon:'👥', bg:'oklch(0.94 0.04 230)', nb:'oklch(0.86 0.08 230)', nc:'oklch(0.28 0.14 230)', lc:'oklch(0.38 0.10 230)' },
                { n:'24/7', l:'NOC Support',         icon:'🌐', bg:'oklch(0.96 0.04 75)',  nb:'oklch(0.88 0.08 75)',  nc:'oklch(0.38 0.16 75)',  lc:'oklch(0.44 0.12 75)' },
              ].map(s => (
                <div key={s.l} style={{ background: s.bg, border: `1.5px solid ${s.nb}`, borderRadius: 18, padding: '22px 20px', transition: 'transform .2s, box-shadow .2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = `0 12px 32px ${s.nc}22`; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'none'; (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; }}>
                  <div style={{ fontSize: 28, marginBottom: 10 }}>{s.icon}</div>
                  <div style={{ fontSize: 38, fontWeight: 900, letterSpacing: '-0.045em', lineHeight: 1, color: s.nc, fontFamily: 'var(--font-display)' }}>{s.n}</div>
                  <div style={{ fontSize: 13, color: s.lc, marginTop: 7, fontWeight: 600 }}>{s.l}</div>
                </div>
              ))}
            </div>

            {/* Partner strip */}
            <div style={{ background: 'white', border: '1px solid oklch(0.91 0.008 240)', borderRadius: 16, padding: '16px 20px', boxShadow: '0 4px 16px oklch(0.18 0.02 260 / 0.05)' }}>
              <p style={{ fontSize: 10, fontWeight: 800, color: 'oklch(0.55 0.02 260)', textTransform: 'uppercase' as const, letterSpacing: '0.08em', margin: '0 0 12px' }}>Technology Partners</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const, alignItems: 'center' }}>
                {[
                  { name: 'Cisco',     url: 'https://www.tvsl-bd.com/img/Partners/logo-cisco.webp' },
                  { name: 'HPE',       url: 'https://www.tvsl-bd.com/img/Partners/logo-hpe.webp' },
                  { name: 'Dell',      url: 'https://www.tvsl-bd.com/img/Partners/logo-dell.webp' },
                  { name: 'Huawei',    url: 'https://www.tvsl-bd.com/img/Partners/logo-huawei.webp' },
                  { name: 'Fortinet',  url: 'https://www.tvsl-bd.com/img/Partners/logo-fortinet.webp' },
                  { name: 'Microsoft', url: 'https://www.tvsl-bd.com/img/Partners/logo-microsoft.webp' },
                ].map(p => (
                  <div key={p.name} style={{ background: 'oklch(0.97 0.003 240)', border: '1px solid oklch(0.91 0.005 240)', borderRadius: 9, padding: '5px 10px', height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={p.url} alt={p.name} style={{ height: 18, maxWidth: 62, objectFit: 'contain', filter: 'grayscale(0.2)' }}
                      onError={e => { (e.target as HTMLImageElement).style.display='none'; (e.target as HTMLImageElement).parentElement!.innerHTML += `<span style="font-size:10px;font-weight:700;color:oklch(0.42 0.12 260)">${p.name}</span>`; }}/>
                  </div>
                ))}
                <a href="https://www.tvsl-bd.com/partners.php" target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, fontWeight: 700, color: 'oklch(0.32 0.18 260)', textDecoration: 'none', padding: '5px 12px', border: '1.5px solid oklch(0.82 0.06 260)', borderRadius: 9, background: 'oklch(0.96 0.02 260)', whiteSpace: 'nowrap' as const }}>
                  +16 more →
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── SERVICES ── */}
      <section style={{ background: 'oklch(0.97 0.005 260)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '80px 48px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'oklch(0.94 0.03 260)', border: '1px solid oklch(0.86 0.06 260)', borderRadius: 99, padding: '5px 14px', fontSize: 11, fontWeight: 700, color: 'oklch(0.32 0.18 260)', letterSpacing: '0.06em', marginBottom: 14 }}>OUR SERVICES</div>
            <h2 style={{ fontSize: 42, fontWeight: 800, letterSpacing: '-0.03em', margin: 0, color: 'oklch(0.18 0.02 260)' }}>What we deliver</h2>
            <p style={{ color: 'oklch(0.52 0.012 250)', fontSize: 16, marginTop: 12, maxWidth: 480, margin: '12px auto 0' }}>Comprehensive IT infrastructure services to keep your business connected and running.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {[
              { icon: 'globe', title: 'Enterprise Networking', desc: 'Cisco/Juniper network design, implementation, and 24/7 NOC management for enterprises.', grad: 'linear-gradient(135deg, oklch(0.94 0.03 260) 0%, oklch(0.90 0.06 260) 100%)', color: 'oklch(0.28 0.18 260)', border: 'oklch(0.86 0.08 260)', num: '01' },
              { icon: 'layers', title: 'Data Center Solutions', desc: 'Rack colocation, server management, and complete data center infrastructure services.', grad: 'linear-gradient(135deg, oklch(0.95 0.03 155) 0%, oklch(0.90 0.06 155) 100%)', color: 'oklch(0.32 0.16 155)', border: 'oklch(0.86 0.07 155)', num: '02' },
              { icon: 'cpu', title: 'Managed IT Services', desc: 'Proactive 24/7 monitoring, helpdesk support, and full IT operations management.', grad: 'linear-gradient(135deg, oklch(0.95 0.03 230) 0%, oklch(0.90 0.06 230) 100%)', color: 'oklch(0.32 0.16 230)', border: 'oklch(0.86 0.07 230)', num: '03' },
              { icon: 'zap', title: 'Fiber Connectivity', desc: 'High-speed fiber broadband and dedicated leased-line solutions for business continuity.', grad: 'linear-gradient(135deg, oklch(0.96 0.04 75) 0%, oklch(0.92 0.07 75) 100%)', color: 'oklch(0.42 0.16 75)', border: 'oklch(0.88 0.08 75)', num: '04' },
            ].map((s) => (
              <div key={s.title} style={{ background: s.grad, border: `1px solid ${s.border}`, borderRadius: 18, padding: '26px 22px', transition: 'transform .2s, box-shadow .2s', cursor: 'default', position: 'relative', overflow: 'hidden' }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = `0 12px 36px ${s.color}22`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'none'; (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; }}>
                <div style={{ position: 'absolute', top: 14, right: 16, fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 52, color: s.color, opacity: 0.08, lineHeight: 1, letterSpacing: '-0.05em' }}>{s.num}</div>
                <div style={{ width: 50, height: 50, borderRadius: 14, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18, boxShadow: `0 4px 12px ${s.color}20` }}>
                  <Icon name={s.icon} size={23} color={s.color}/>
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, color: 'oklch(0.14 0.02 260)', fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' }}>{s.title}</div>
                <p style={{ fontSize: 13, color: 'oklch(0.38 0.02 260)', lineHeight: 1.65, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI PLATFORM ── */}
      <section style={{ background: 'oklch(0.17 0.04 260)', color: 'white', padding: '88px 48px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'oklch(0.30 0.08 260)', border: '1px solid oklch(0.38 0.1 260)', borderRadius: 99, padding: '6px 14px', fontSize: 11, fontWeight: 700, color: 'oklch(0.75 0.1 260)', letterSpacing: '0.06em', marginBottom: 22 }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3 L13.5 9.5 L20 11 L13.5 12.5 L12 19 L10.5 12.5 L4 11 L10.5 9.5 Z"/></svg>
                AI-POWERED PLATFORM
              </div>
              <h2 style={{ fontSize: 42, fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 20px', lineHeight: 1.1 }}>Smart recruitment,<br/>powered by AI.</h2>
              <p style={{ fontSize: 16, color: 'oklch(0.72 0.04 260)', lineHeight: 1.6, margin: '0 0 32px' }}>
                Our platform uses Gemini AI to automate CV screening, generate technical exams, and evaluate candidates — saving HR teams hours every week.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                {[
                  { n: 'AI CV Scanner', d: 'Automatically ranks applicant CVs against job requirements.' },
                  { n: 'Exam Generator', d: 'Creates role-specific technical exams instantly for any position.' },
                  { n: 'Answer Evaluator', d: 'AI grades exam answers and provides detailed scoring feedback.' },
                  { n: 'Smart Chatbot', d: 'Answers candidate and employee questions 24/7 in real-time.' },
                ].map(f => (
                  <div key={f.n} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <div style={{ width: 30, height: 30, borderRadius: 8, background: 'oklch(0.42 0.15 260)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="white"><path d="M12 3 L13.5 9.5 L20 11 L13.5 12.5 L12 19 L10.5 12.5 L4 11 L10.5 9.5 Z"/></svg>
                    </div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 3, color: 'white' }}>{f.n}</div>
                      <div style={{ fontSize: 13, color: 'oklch(0.68 0.04 260)', lineHeight: 1.45 }}>{f.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Pipeline visual */}
            <div style={{ background: 'oklch(0.22 0.05 260)', borderRadius: 20, padding: 30, border: '1px solid oklch(0.28 0.06 260)' }}>
              <div style={{ fontSize: 11, color: 'oklch(0.62 0.1 260)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'oklch(0.62 0.1 260)', display: 'inline-block' }}/>
                AI RECRUITMENT PIPELINE
              </div>
              {[
                { step: '01', title: 'Job Post Created', status: 'done', note: 'Network Engineer · 3 slots' },
                { step: '02', title: 'Applications Received', status: 'done', note: '24 applicants · AI pre-screened' },
                { step: '03', title: 'AI Exam Generated', status: 'done', note: '20 questions · Auto-graded' },
                { step: '04', title: 'Top 5 Shortlisted', status: 'active', note: 'AI score > 75%' },
                { step: '05', title: 'Interview Scheduled', status: 'pending', note: 'HR review pending' },
              ].map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '12px 0', borderBottom: i < 4 ? '1px solid oklch(0.28 0.05 260)' : undefined }}>
                  <div style={{ width: 30, height: 30, borderRadius: '50%', flexShrink: 0, background: s.status === 'done' ? 'oklch(0.55 0.13 155)' : s.status === 'active' ? 'oklch(0.42 0.15 260)' : 'oklch(0.28 0.04 260)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: 'white' }}>
                    {s.status === 'done' ? '✓' : s.step}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: s.status === 'pending' ? 'oklch(0.48 0.03 260)' : 'white', marginBottom: 2 }}>{s.title}</div>
                    <div style={{ fontSize: 12, color: 'oklch(0.58 0.04 260)' }}>{s.note}</div>
                  </div>
                  {s.status === 'active' && <span style={{ fontSize: 10, fontWeight: 700, color: 'oklch(0.62 0.1 260)', background: 'oklch(0.30 0.08 260)', borderRadius: 99, padding: '2px 8px' }}>LIVE</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── OPEN POSITIONS TEASER ── */}
      <section style={{ padding: '80px 48px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 36 }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'oklch(0.94 0.03 260)', border: '1px solid oklch(0.86 0.06 260)', borderRadius: 99, padding: '5px 14px', fontSize: 11, fontWeight: 700, color: 'oklch(0.32 0.18 260)', letterSpacing: '0.06em', marginBottom: 14 }}>WE&apos;RE HIRING</div>
            <h2 style={{ fontSize: 40, fontWeight: 800, letterSpacing: '-0.03em', margin: 0, color: 'oklch(0.18 0.02 260)' }}>Join our team</h2>
          </div>
          <Button variant="outline" onClick={() => go('jobs')}>
            All positions
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </Button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
          {[
            { title: 'Network Engineer', dept: 'Networking', salary: '৳60,000–90,000/mo', id: 'j1' },
            { title: 'Server Administrator', dept: 'Server', salary: '৳55,000–80,000/mo', id: 'j2' },
            { title: 'IT Support Specialist', dept: 'IT', salary: '৳35,000–55,000/mo', id: 'j3' },
            { title: 'Sales Executive', dept: 'Sales & Marketing', salary: '৳40,000–70,000 + commission', id: 'j4' },
          ].map(job => (
            <div key={job.id} onClick={() => go('job', job.id)} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '18px 22px', background: 'white', border: '1px solid var(--border)', borderRadius: 14, cursor: 'pointer', transition: 'all .2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'oklch(0.62 0.1 260)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 20px oklch(0.32 0.18 260 / 0.1)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; }}>
              <div style={{ width: 46, height: 46, borderRadius: 12, background: 'oklch(0.94 0.03 260)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name="briefcase" size={20} color="oklch(0.32 0.18 260)"/>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'oklch(0.18 0.02 260)', marginBottom: 3 }}>{job.title}</div>
                <div style={{ fontSize: 13, color: 'oklch(0.52 0.012 250)' }}>{job.dept} · Full-time · Dhaka</div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="oklch(0.62 0.06 260)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18"/></svg>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{ padding: '0 48px 80px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ background: 'linear-gradient(135deg, oklch(0.32 0.18 260) 0%, oklch(0.22 0.12 260) 100%)', borderRadius: 20, padding: '48px 56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 40 }}>
          <div>
            <h3 style={{ fontSize: 28, fontWeight: 800, color: 'white', margin: '0 0 10px', letterSpacing: '-0.02em' }}>Ready to join TVSL?</h3>
            <p style={{ color: 'oklch(0.78 0.06 260)', fontSize: 15, margin: 0 }}>Apply today and start your journey with Bangladesh's leading networking company.</p>
          </div>
          <div style={{ display: 'flex', gap: 12, flexShrink: 0 }}>
            <button onClick={() => go('jobs')} style={{ background: 'white', color: 'oklch(0.32 0.18 260)', border: 'none', borderRadius: 10, padding: '12px 24px', fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>View Openings</button>
            <button onClick={() => go('about')} style={{ background: 'oklch(1 0 0 / 0.12)', color: 'white', border: '1px solid oklch(1 0 0 / 0.25)', borderRadius: 10, padding: '12px 24px', fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>Learn More</button>
          </div>
        </div>
      </section>

      <Footer go={go}/>
    </div>
  );
}
