'use client';
import { Button } from '../ui/index';

interface PublicNavProps { go: (screen: string, jobId?: string) => void; active?: string; }

export function TVSLLogo({ size = 36, white = false }: { size?: number; white?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      {/* Logo image — replace Logo.png with actual company logo */}
      <img src="/Logo.png" alt="TVSL Logo" style={{ width: size, height: size, objectFit: 'contain', borderRadius: 8 }}
        onError={(e) => {
          // Fallback SVG if image not found
          const parent = (e.target as HTMLImageElement).parentElement!;
          (e.target as HTMLImageElement).style.display = 'none';
          const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          svg.setAttribute('width', String(size));
          svg.setAttribute('height', String(size));
          svg.setAttribute('viewBox', '0 0 40 40');
          svg.innerHTML = `<rect width="40" height="40" rx="10" fill="oklch(0.32 0.18 260)"/><circle cx="20" cy="12" r="3.5" fill="white"/><circle cx="10" cy="28" r="3.5" fill="white" opacity="0.85"/><circle cx="30" cy="28" r="3.5" fill="white" opacity="0.85"/><line x1="20" y1="15.5" x2="10" y2="24.5" stroke="white" stroke-width="1.5" opacity="0.6"/><line x1="20" y1="15.5" x2="30" y2="24.5" stroke="white" stroke-width="1.5" opacity="0.6"/><line x1="13.5" y1="28" x2="26.5" y2="28" stroke="white" stroke-width="1.5" opacity="0.6"/>`;
          parent.insertBefore(svg, parent.firstChild);
        }}
      />
      <div style={{ lineHeight: 1 }}>
        <div style={{ fontWeight: 800, fontSize: size * 0.48, letterSpacing: '-0.03em', color: white ? 'white' : 'oklch(0.14 0.02 260)', fontFamily: 'var(--font-display)' }}>TVSL</div>
        <div style={{ fontWeight: 500, fontSize: size * 0.24, color: white ? 'oklch(0.78 0.06 260)' : 'oklch(0.52 0.012 250)', letterSpacing: '0.01em', marginTop: 1 }}>Tech Valley Solutions</div>
      </div>
    </div>
  );
}

export function PublicNav({ go, active }: PublicNavProps) {
  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(16px)', borderBottom: '1px solid var(--border)', padding: '0 56px', display: 'flex', alignItems: 'center', gap: 32, height: 84, boxShadow: '0 1px 20px oklch(0.18 0.02 260 / 0.05)' }}>
      <button onClick={() => go('home')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
        <TVSLLogo size={44}/>
      </button>
      <div style={{ flex: 1, display: 'flex', gap: 4, alignItems: 'center' }}>
        {[{id:'home',label:'Home'},{id:'about',label:'About'},{id:'jobs',label:'Careers'}].map(l => (
          <button key={l.id} onClick={() => go(l.id)} style={{ background: active === l.id ? 'oklch(0.95 0.025 260)' : 'none', border: 'none', cursor: 'pointer', padding: '9px 18px', borderRadius: 10, fontSize: 16, fontWeight: active === l.id ? 700 : 500, fontFamily: 'var(--font-sans)', color: active === l.id ? 'oklch(0.32 0.18 260)' : 'oklch(0.42 0.02 260)', transition: 'all .15s' }}>{l.label}</button>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <Button variant="outline" size="sm" onClick={() => go('login')}>Sign in</Button>
        <Button size="sm" onClick={() => go('jobs')}>View Openings</Button>
      </div>
    </nav>
  );
}

export function Footer({ go }: { go?: (screen: string) => void }) {
  return (
    <footer style={{ background: 'oklch(0.15 0.04 260)', color: 'white', padding: '60px 48px 32px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr 1fr 1fr', gap: 52, marginBottom: 52, borderBottom: '1px solid oklch(0.24 0.04 260)', paddingBottom: 48 }}>
          <div>
            <TVSLLogo size={48} white/>
            <p style={{ fontSize: 14, color: 'oklch(0.68 0.04 260)', lineHeight: 1.7, margin: '18px 0 22px', maxWidth: 320 }}>Enterprise networking infrastructure, data center solutions, and managed IT services — trusted by 200+ businesses across Bangladesh.</p>
            <div style={{ display: 'flex', gap: 10 }}>
              {[{p:<><circle cx="12" cy="12" r="9"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 3a14 14 0 0 1 0 18"/><path d="M12 3a14 14 0 0 0 0 18"/></>},{p:<><rect x="3" y="5" width="18" height="14" rx="2"/><polyline points="3 7 12 13 21 7"/></>},{p:<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7a2 2 0 0 1 1.72 2.04z"/>}].map((icon,i) => (
                <div key={i} style={{ width: 36, height: 36, borderRadius: 9, background: 'oklch(0.24 0.04 260)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background .15s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = 'oklch(0.32 0.18 260)'}
                  onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = 'oklch(0.24 0.04 260)'}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="oklch(0.72 0.06 260)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{icon.p}</svg>
                </div>
              ))}
            </div>
          </div>
          {[
            { title: 'Company', items: [{l:'About Us',s:'about'},{l:'Careers',s:'jobs'},{l:'Contact Us',s:'about'}] },
            { title: 'Services', items: [{l:'Enterprise Networking',s:null},{l:'Data Center',s:null},{l:'Managed IT Services',s:null},{l:'Fiber Connectivity',s:null}] },
            { title: 'Contact', items: [{l:'Head Office: 12-A, 12th Floor, CONCORD SOHEL SQUARE, 75 Satmasjid Road, Dhaka 1209',s:null},{l:'Email: info@tvsl-bd.com',s:null},{l:'Phone: +88 01729-298875',s:null},{l:'tvsl-bd.com',s:null}] },
          ].map(col => (
            <div key={col.title}>
              <div style={{ fontSize: 11, fontWeight: 800, color: 'oklch(0.58 0.1 260)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 18 }}>{col.title}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.items.map(item => (
                  <span key={item.l} onClick={() => go && item.s && go(item.s)} style={{ fontSize: 13.5, color: 'oklch(0.68 0.04 260)', cursor: item.s ? 'pointer' : 'default', lineHeight: 1.5, transition: 'color .15s' }}
                    onMouseEnter={e => { if (item.s) (e.target as HTMLElement).style.color = 'white'; }}
                    onMouseLeave={e => { (e.target as HTMLElement).style.color = 'oklch(0.68 0.04 260)'; }}>{item.l}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 13, color: 'oklch(0.50 0.03 260)' }}>© 2026 Tech Valley Solutions Ltd. All rights reserved.</span>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy Policy','Terms of Service'].map(l => (
              <span key={l} style={{ fontSize: 13, color: 'oklch(0.50 0.03 260)', cursor: 'pointer' }}>{l}</span>
            ))}
            <a href="https://www.tvsl-bd.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: 'oklch(0.60 0.1 260)', textDecoration: 'none' }}>tvsl-bd.com ↗</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
