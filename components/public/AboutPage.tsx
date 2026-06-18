'use client';

import { PublicNav, Footer } from './Nav';
import { Button, Card, Avatar } from '../ui/index';
import { Icon } from '../ui/Icon';

interface Props { go: (screen: string, jobId?: string) => void; }

export default function AboutPage({ go }: Props) {
  return (
    <div style={{ background: 'var(--bg)' }}>
      <PublicNav go={go} active="about"/>

      {/* HERO */}
      <section style={{ padding: '72px 48px 56px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'oklch(0.94 0.03 260)', border: '1px solid oklch(0.86 0.06 260)', borderRadius: 99, padding: '5px 14px', fontSize: 11, fontWeight: 700, color: 'oklch(0.32 0.18 260)', letterSpacing: '0.06em', marginBottom: 22 }}>ABOUT TVSL</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 72, alignItems: 'end' }}>
          <h1 style={{ fontSize: 58, lineHeight: 1.02, letterSpacing: '-0.04em', margin: 0, fontWeight: 900, fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 260)' }}>
            Enterprise networking,<br/>
            <span style={{ color: 'oklch(0.32 0.18 260)' }}>built for Bangladesh.</span>
          </h1>
          <p style={{ fontSize: 17, color: 'oklch(0.52 0.012 250)', lineHeight: 1.6, margin: 0 }}>
            Tech Valley Solutions Ltd. was founded in Dhaka to provide world-class networking and data center services to businesses across Bangladesh.
          </p>
        </div>
      </section>

      {/* METRICS */}
      <section style={{ padding: '0 48px 64px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {[
            { n: '2012', l: 'Founded', icon: 'calendar', bg: 'oklch(0.94 0.03 260)', color: 'oklch(0.32 0.18 260)' },
            { n: '100+', l: 'Team members', icon: 'users', bg: 'oklch(0.95 0.04 155)', color: 'oklch(0.40 0.14 155)' },
            { n: '200+', l: 'Client companies', icon: 'briefcase', bg: 'oklch(0.94 0.03 230)', color: 'oklch(0.42 0.14 230)' },
             ].map(m => (
            <div key={m.l} style={{ background: m.bg, borderRadius: 16, padding: '24px 22px', display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 2px 8px oklch(0 0 0 / 0.06)' }}>
                <Icon name={m.icon} size={22} color={m.color}/>
              </div>
              <div>
                <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1, color: m.color }}>{m.n}</div>
                <div style={{ fontSize: 12, color: 'oklch(0.48 0.02 260)', marginTop: 4, fontWeight: 600 }}>{m.l}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CHAIRMAN SECTION */}
      <section style={{ background: 'oklch(0.97 0.005 260)', padding: '80px 48px', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '0.75fr 1.25fr', gap: 80, alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <div style={{ aspectRatio: '3/4', borderRadius: 24, overflow: 'hidden', boxShadow: '0 24px 64px oklch(0.32 0.18 260 / 0.18)', position: 'relative', border: '1px solid oklch(0.86 0.06 260)' }}>
                <img src="/c.jpg" alt="Mohammad Mahfuz Ali Sohel — Chairman, TVSL"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }}
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.style.display = 'none';
                    const parent = img.parentElement!;
                    parent.style.background = 'linear-gradient(135deg, oklch(0.94 0.03 260) 0%, oklch(0.88 0.07 260) 100%)';
                    parent.innerHTML += '<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:12px"><div style="width:90px;height:90px;border-radius:50%;background:oklch(0.32 0.18 260);display:flex;align-items:center;justify-content:center;color:white;font-size:32px;font-weight:800">MS</div></div>';
                  }}/>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, oklch(0.14 0.04 260 / 0.85) 0%, transparent 100%)', padding: '32px 20px 20px' }}>
                  <div style={{ fontWeight: 800, fontSize: 16, color: 'white', fontFamily: 'var(--font-display)' }}>Mohammad Mahfuz Ali Sohel</div>
                  <div style={{ fontSize: 12, color: 'oklch(0.72 0.08 260)', fontWeight: 600, marginTop: 3 }}>Chairman · Tech Valley Solutions Ltd.</div>
                </div>
              </div>
            </div>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'oklch(0.94 0.03 260)', border: '1px solid oklch(0.86 0.06 260)', borderRadius: 99, padding: '5px 14px', fontSize: 11, fontWeight: 700, color: 'oklch(0.32 0.18 260)', letterSpacing: '0.06em', marginBottom: 20 }}>A MESSAGE FROM OUR CHAIRMAN</div>
              <h2 style={{ fontSize: 36, lineHeight: 1.08, letterSpacing: '-0.035em', margin: '0 0 20px', fontWeight: 800, fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 260)' }}>
                &quot;Building the future of enterprise networking in Bangladesh.&quot;
              </h2>
              <div style={{ fontSize: 15, lineHeight: 1.7, color: 'oklch(0.42 0.015 260)', display: 'flex', flexDirection: 'column', gap: 14 }}>
                <p style={{ margin: 0 }}>At TVSL, we started with a simple idea: businesses in Bangladesh deserve the same quality of network infrastructure that global enterprises take for granted. We&apos;ve spent years building the expertise and partnerships to make that a reality.</p>
                <p style={{ margin: 0 }}>Today, we serve over 200 enterprise clients with 24/7 managed services, fiber connectivity, and data center solutions. Our team of 100+ certified engineers is the backbone of reliable connectivity for businesses across the country.</p>
              </div>
              <div style={{ marginTop: 28, display: 'flex', gap: 12 }}>
                <Button variant="outline" size="sm">
                  <Icon name="link" size={13}/> LinkedIn
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="mail" size={13}/> Email
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES — nice card UI */}
      <section style={{ padding: '88px 48px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'oklch(0.94 0.03 260)', border: '1px solid oklch(0.86 0.06 260)', borderRadius: 99, padding: '5px 14px', fontSize: 11, fontWeight: 700, color: 'oklch(0.32 0.18 260)', letterSpacing: '0.06em', marginBottom: 14 }}>OUR VALUES</div>
          <h2 style={{ fontSize: 40, fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 14px', color: 'oklch(0.18 0.02 260)' }}>What we stand for</h2>
          <p style={{ color: 'oklch(0.52 0.012 250)', fontSize: 16, maxWidth: 500, margin: '0 auto' }}>The principles that guide every decision we make at Tech Valley Solutions.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {[
            { n: '01', icon: 'zap', h: 'Reliability First', d: '99.9% uptime SLA backed by redundant infrastructure, real-time NOC monitoring, and rapid incident response. Your business never sleeps, and neither do we.', color: 'oklch(0.42 0.15 260)', bg: 'oklch(0.94 0.03 260)' },
            { n: '02', icon: 'globe', h: 'Local Expertise', d: 'Deep understanding of Bangladesh\'s connectivity landscape, regulatory environment, and enterprise needs. We know this market because we built our careers here.', color: 'oklch(0.40 0.14 155)', bg: 'oklch(0.95 0.04 155)' },
            { n: '03', icon: 'users', h: 'Partnership Over Vendor', d: 'We work as an extension of your IT team — not just another vendor. Long-term relationships, dedicated support engineers, and a genuine stake in your success.', color: 'oklch(0.45 0.13 230)', bg: 'oklch(0.94 0.03 230)' },
            { n: '04', icon: 'shield', h: 'Security by Design', d: 'Cybersecurity isn\'t an afterthought — it\'s woven into every network design, server deployment, and client engagement from day one.', color: 'oklch(0.50 0.15 300)', bg: 'oklch(0.95 0.03 300)' },
            { n: '05', icon: 'award', h: 'Excellence in Execution', d: 'Cisco Gold partnerships, certified engineers, and a track record of on-time, on-budget project delivery. We set high standards and hold ourselves to them.', color: 'oklch(0.58 0.14 75)', bg: 'oklch(0.96 0.04 80)' },
            { n: '06', icon: 'sparkle', h: 'Innovation & Growth', d: 'We continuously invest in new technologies — SD-WAN, cloud connectivity, AI-powered monitoring — to keep our clients ahead of the curve.', color: 'oklch(0.42 0.15 260)', bg: 'oklch(0.94 0.03 260)' },
          ].map(v => (
            <div key={v.n} style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 18, padding: '28px 26px', transition: 'box-shadow .2s, transform .2s' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = '0 12px 40px oklch(0.32 0.18 260 / 0.10)'; el.style.transform = 'translateY(-4px)'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = 'none'; el.style.transform = 'none'; }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 18 }}>
                <div style={{ width: 50, height: 50, borderRadius: 14, background: v.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name={v.icon} size={22} color={v.color}/>
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: v.color, fontWeight: 700, letterSpacing: '0.05em', background: v.bg, padding: '3px 9px', borderRadius: 99 }}>{v.n}</span>
              </div>
              <h3 style={{ fontSize: 18, letterSpacing: '-0.015em', margin: '0 0 10px', fontWeight: 700, color: 'oklch(0.18 0.02 260)' }}>{v.h}</h3>
              <p style={{ fontSize: 13.5, lineHeight: 1.65, color: 'oklch(0.52 0.012 250)', margin: 0 }}>{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM LEADS */}
      <section style={{ background: 'oklch(0.16 0.05 260)', padding: '80px 48px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'oklch(0.28 0.08 260)', border: '1px solid oklch(0.36 0.1 260)', borderRadius: 99, padding: '5px 14px', fontSize: 11, fontWeight: 700, color: 'oklch(0.72 0.08 260)', letterSpacing: '0.06em', marginBottom: 14 }}>LEADERSHIP</div>
              <h2 style={{ fontSize: 38, fontWeight: 800, letterSpacing: '-0.03em', margin: 0, color: 'white', fontFamily: 'var(--font-display)' }}>The team behind TVSL</h2>
            </div>
            <button onClick={() => go('jobs')} style={{ background: 'oklch(0.28 0.08 260)', border: '1px solid oklch(0.36 0.1 260)', color: 'white', borderRadius: 10, padding: '10px 20px', cursor: 'pointer', fontWeight: 600, fontSize: 14, fontFamily: 'var(--font-sans)', display: 'flex', alignItems: 'center', gap: 7 }}>
              Join us
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {[
              { n: 'Mohammad Mahfuz Ali Sohel', r: 'Chairman', dept: 'Management' },
              { n: 'Mohammad Amir Hassan Chowdhury', r: 'Head of HR & Admin', dept: 'HR & Admin' },
              { n: 'Kishor Kumar Paul', r: 'Network Lead', dept: 'Network & Cyber' },
              { n: 'Shamir Ashik Chowdhury', r: 'Server Lead', dept: 'Server Team' },
              { n: 'Sofiqur Rahman Shumon', r: 'Power Team Lead', dept: 'Power Team' },
              { n: 'Md. Abdullah Shah', r: 'Data Center Lead', dept: 'Data Center' },
              { n: 'Raihan Kabir', r: 'Sales Manager', dept: 'Sales & Marketing' },
              { n: 'A M Rashid Ashef Hossain', r: 'IT Manager', dept: 'IT Team' },
            ].map(p => (
              <div key={p.n} style={{ background: 'oklch(0.22 0.05 260)', borderRadius: 16, padding: '22px 18px', textAlign: 'center', border: '1px solid oklch(0.28 0.06 260)', transition: 'background .15s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = 'oklch(0.26 0.06 260)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'oklch(0.22 0.05 260)'; }}>
                <div style={{ width: 68, height: 68, borderRadius: '50%', background: 'oklch(0.32 0.18 260)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', color: 'white', fontWeight: 800, fontSize: 22 }}>
                  {p.n.split(' ').slice(-2).map(w => w[0]).join('')}
                </div>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: 'white', marginBottom: 4, lineHeight: 1.3 }}>{p.n}</div>
                <div style={{ fontSize: 12, color: 'oklch(0.62 0.1 260)', fontWeight: 600, marginBottom: 6 }}>{p.r}</div>
                <div style={{ fontSize: 11, color: 'oklch(0.50 0.04 260)', background: 'oklch(0.28 0.06 260)', padding: '2px 10px', borderRadius: 99, display: 'inline-block' }}>{p.dept}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section style={{ padding: '80px 48px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ background: 'linear-gradient(135deg, oklch(0.32 0.18 260) 0%, oklch(0.22 0.12 260) 100%)', borderRadius: 20, padding: '52px 56px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'oklch(1 0 0 / 0.15)', border: '1px solid oklch(1 0 0 / 0.25)', borderRadius: 99, padding: '5px 14px', fontSize: 11, fontWeight: 700, color: 'white', letterSpacing: '0.06em', marginBottom: 18 }}>GET IN TOUCH</div>
            <h2 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.025em', color: 'white', margin: '0 0 14px' }}>Contact TVSL</h2>
            <p style={{ fontSize: 15, color: 'oklch(0.78 0.06 260)', margin: 0, lineHeight: 1.6 }}>
              Ready to upgrade your network infrastructure? We respond within 4 business hours.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { icon: 'location', l: 'Head Office', v: '12-A, 12th Floor, CONCORD SOHEL SQUARE, 75 Satmasjid Road, Dhaka 1209' },
              { icon: 'mail', l: 'Email', v: 'info@tvsl-bd.com' },
              { icon: 'phone', l: 'Phone', v: '+88 01729-298875' },
              { icon: 'globe', l: 'Website', v: 'www.tvsl-bd.com' },
            ].map(c => (
              <div key={c.l} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '12px 0', borderTop: '1px solid oklch(1 0 0 / 0.12)' }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: 'oklch(1 0 0 / 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    {c.icon === 'location' && <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>}
                    {c.icon === 'mail' && <><rect x="3" y="5" width="18" height="14" rx="2"/><polyline points="3 7 12 13 21 7"/></>}
                    {c.icon === 'phone' && <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7a2 2 0 0 1 1.72 2.04z"/>}
                    {c.icon === 'globe' && <><circle cx="12" cy="12" r="9"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 3a14 14 0 0 1 0 18"/><path d="M12 3a14 14 0 0 0 0 18"/></>}
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: 'oklch(0.72 0.06 260)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 3 }}>{c.l}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'white', lineHeight: 1.4 }}>{c.v}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer go={go}/>
    </div>
  );
}
