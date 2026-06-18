'use client';
import React from 'react';
import { Icon } from './Icon';
import { Avatar } from './index';

function SidebarLogo({ label }: { label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ width: 38, height: 38, borderRadius: 10, overflow: 'hidden', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid oklch(0.90 0.01 260)', flexShrink: 0 }}>
        <img src="/Logo.png" alt="TVSL" style={{ width: 34, height: 34, objectFit: 'contain' }}
          onError={e => { (e.target as HTMLImageElement).style.display = 'none'; (e.target as HTMLImageElement).parentElement!.innerHTML = '<div style="width:34px;height:34px;background:oklch(0.32 0.18 260);border-radius:8px;display:flex;align-items:center;justify-content:center;color:white;font-weight:800;font-size:13px">TV</div>'; }}/>
      </div>
      <div style={{ lineHeight: 1 }}>
        <div style={{ fontWeight: 800, fontSize: 16, letterSpacing: '-0.025em', color: 'oklch(0.18 0.02 260)', fontFamily: 'var(--font-display)' }}>{label}</div>
        <div style={{ fontWeight: 500, fontSize: 10, color: 'oklch(0.52 0.012 250)', marginTop: 2 }}>Tech Valley Solutions</div>
      </div>
    </div>
  );
}

export function SidebarItem({ icon, label, active, badge, onClick }: { icon:string; label:string; active?:boolean; badge?:number; onClick?:()=>void }) {
  return (
    <button onClick={onClick} style={{ display:'flex', alignItems:'center', gap:11, padding:'11px 13px', background: active ? 'oklch(0.92 0.04 260)' : 'transparent', color: active ? 'oklch(0.25 0.18 260)' : 'oklch(0.42 0.02 260)', border:'none', borderRadius:11, width:'100%', cursor:'pointer', fontSize:14.5, fontWeight: active ? 700 : 500, transition:'all .12s', fontFamily:'var(--font-sans)', letterSpacing:'-0.01em', marginBottom: 2 }}>
      <Icon name={icon} size={17} color="currentColor"/>
      <span style={{ flex:1, textAlign:'left' }}>{label}</span>
      {badge != null && badge > 0 && <span style={{ background:'oklch(0.55 0.18 25)', color:'white', borderRadius:99, fontSize:11, fontWeight:700, padding:'2px 7px', lineHeight:1.4 }}>{badge}</span>}
    </button>
  );
}

const EMPLOYEE_NAV = [
  { id:'emp-dashboard', icon:'home', label:'Dashboard' },
  { id:'emp-profile', icon:'user', label:'My Profile' },
  { id:'emp-team', icon:'users', label:'My Team' },
  { id:'emp-chat', icon:'chat', label:'Team Chat', badge:3 },
  { id:'emp-notices', icon:'bell', label:'Notices', badge:2 },
];
const ADMIN_NAV = [
  { id:'admin-dashboard', icon:'chart', label:'Overview' },
  { id:'admin-employees', icon:'users', label:'Employees' },
  { id:'admin-jobs', icon:'briefcase', label:'Job Posts' },
  { id:'admin-applications', icon:'file', label:'Applications' },
  { id:'admin-evaluate', icon:'sparkle', label:'AI Evaluate' },
  { id:'admin-cvscan', icon:'fileCheck', label:'CV Scanner' },
];

export function AppShell({ side, screen, setScreen, children, brand='TVSL', userName, userRole }: { side:'employee'|'admin'; screen:string; setScreen:(s:string)=>void; children:React.ReactNode; brand?:string; userName?:string; userRole?:string }) {
  const nav = side === 'employee' ? EMPLOYEE_NAV : ADMIN_NAV;
  const defaultName = side === 'employee' ? 'A M Rashid Ashef Hossain' : 'Mohammad Amir Hassan Chowdhury';
  const defaultRole = side === 'employee' ? 'IT Manager' : 'Head of HR & Admin';
  const displayName = userName || defaultName;
  const displayRole = userRole || defaultRole;

  const isAdmin = side === 'admin';
  const sidebarBg = 'oklch(0.15 0.04 260)';
  const sidebarText = 'white';
  const sidebarMuted = 'oklch(0.58 0.04 260)';
  const activeBg = 'oklch(0.30 0.10 260)';
  const activeColor = 'white';
  const inactiveColor = 'oklch(0.68 0.04 260)';
  const pillBg = 'oklch(0.28 0.08 260)';
  const pillColor = 'oklch(0.72 0.1 260)';

  return (
    <div style={{ display:'flex', height:'100vh', background: isAdmin ? 'oklch(0.975 0.008 240)' : 'oklch(0.978 0.006 220)', overflow:'hidden' }}>
      <aside style={{ width:262, background: sidebarBg, borderRight: '1px solid oklch(0.22 0.06 260)', display:'flex', flexDirection:'column', flexShrink:0 }}>
        <div style={{ padding:'20px 18px 16px', borderBottom: '1px solid oklch(0.22 0.06 260)' }}>
          {isAdmin ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, overflow: 'hidden', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <img src="/Logo.png" alt="TVSL" style={{ width: 34, height: 34, objectFit: 'contain' }} onError={e => { (e.target as HTMLImageElement).style.display='none'; }}/>
              </div>
              <div><div style={{ fontWeight: 800, fontSize: 16, color: 'white', letterSpacing: '-0.03em', fontFamily: 'var(--font-display)' }}>{brand}</div><div style={{ fontSize: 10, color: 'oklch(0.58 0.06 260)', marginTop: 2 }}>Tech Valley Solutions</div></div>
            </div>
          ) : <SidebarLogo label={brand}/>}
          <div style={{ marginTop:10, fontSize:11, color: pillColor, fontWeight:800, textTransform:'uppercase', letterSpacing:'0.08em', background: pillBg, display:'inline-block', padding:'3px 10px', borderRadius:6 }}>
            {side==='admin' ? 'Admin Console' : 'Employee Portal'}
          </div>
        </div>
        <nav style={{ flex:1, padding:'10px 10px', overflowY:'auto' }}>
          {nav.map(item => (
            <button key={item.id} onClick={() => setScreen(item.id)} style={{ display:'flex', alignItems:'center', gap:11, padding:'11px 13px', background: screen===item.id ? activeBg : 'transparent', color: screen===item.id ? activeColor : inactiveColor, border:'none', borderRadius:11, width:'100%', cursor:'pointer', fontSize:14.5, fontWeight: screen===item.id ? 700 : 500, transition:'all .12s', fontFamily:'var(--font-sans)', letterSpacing:'-0.01em', marginBottom:2 }}>
              <Icon name={item.icon} size={17} color="currentColor"/>
              <span style={{ flex:1, textAlign:'left' }}>{item.label}</span>
              {(item as {badge?:number}).badge != null && (item as {badge?:number}).badge! > 0 && <span style={{ background:'oklch(0.55 0.18 25)', color:'white', borderRadius:99, fontSize:11, fontWeight:700, padding:'2px 7px', lineHeight:1.4 }}>{(item as {badge?:number}).badge}</span>}
            </button>
          ))}
        </nav>
        <div style={{ padding:'14px 18px', borderTop: '1px solid oklch(0.22 0.06 260)', display:'flex', alignItems:'center', gap:11 }}>
          <Avatar name={displayName} size={38}/>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:13, fontWeight:700, color: sidebarText, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{displayName}</div>
            <div style={{ fontSize:11, color: sidebarMuted, marginTop:1 }}>{displayRole}</div>
          </div>
          <button style={{ background:'none', border:'none', color: sidebarMuted, cursor:'pointer', padding:4 }}>
            <Icon name="logout" size={17}/>
          </button>
        </div>
      </aside>
      <main style={{ flex:1, overflow:'auto', display:'flex', flexDirection:'column', paddingBottom: 80 }}>
        {children}
      </main>
    </div>
  );
}

export function Topbar({ title, subtitle, actions, search }: { title:string; subtitle?:string; actions?:React.ReactNode; search?:string }) {
  return (
    <div style={{ padding:'22px 36px', borderBottom:'1px solid var(--border)', background:'white', display:'flex', alignItems:'center', gap:20, flexShrink:0, boxShadow:'0 1px 0 var(--border)' }}>
      <div style={{ flex:1 }}>
        <h1 style={{ fontSize:22, fontWeight:800, letterSpacing:'-0.03em', margin:0, lineHeight:1.1, color:'oklch(0.18 0.02 260)', fontFamily:'var(--font-display)' }}>{title}</h1>
        {subtitle && <p style={{ fontSize:14, color:'var(--muted)', margin:'3px 0 0' }}>{subtitle}</p>}
      </div>
      {search && (
        <div style={{ position:'relative' }}>
          <Icon name="search" size={16} color="var(--muted)" style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)' }}/>
          <input placeholder={search} style={{ paddingLeft:36, paddingRight:14, paddingTop:9, paddingBottom:9, background:'var(--surface-2)', border:'1.5px solid var(--border)', borderRadius:10, fontSize:14, color:'var(--ink)', outline:'none', width:260, fontFamily:'var(--font-sans)' }}/>
        </div>
      )}
      {actions && <div style={{ display:'flex', gap:8 }}>{actions}</div>}
    </div>
  );
}
