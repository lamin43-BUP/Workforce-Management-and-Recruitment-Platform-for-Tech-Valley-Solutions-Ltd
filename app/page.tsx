'use client';
import { useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import LandingPage from '@/components/public/LandingPage';
import AboutPage from '@/components/public/AboutPage';
import JobsListPage from '@/components/public/JobsListPage';
import JobDetailPage from '@/components/public/JobDetailPage';
import ApplyPage from '@/components/public/ApplyPage';
import ExamPage from '@/components/public/ExamPage';
import ChatbotFull from '@/components/public/ChatbotFull';
import LoginPage from '@/components/employee/LoginPage';
import EmployeeDashboard from '@/components/employee/Dashboard';
import EmployeeProfile from '@/components/employee/Profile';
import EmployeeTeam from '@/components/employee/Team';
import EmployeeChat from '@/components/employee/Chat';
import EmployeeNotices from '@/components/employee/Notices';
import { AppShell } from '@/components/ui/AppShell';
import AdminDashboard from '@/components/admin/Dashboard';
import AdminEmployees from '@/components/admin/Employees';
import AdminJobs from '@/components/admin/Jobs';
import AdminApplications from '@/components/admin/Applications';
import AdminEvaluate from '@/components/admin/Evaluate';
import AdminCVScan from '@/components/admin/CVScan';

export default function HomePage() {
  const [section, setSection] = useState<'public'|'employee'|'admin'|'chat'>('public');
  const [pubScreen, setPubScreen] = useState('home');
  const [pubJobId, setPubJobId] = useState('j1');
  const [empScreen, setEmpScreen] = useState('emp-dashboard');
  const [admScreen, setAdmScreen] = useState('admin-dashboard');
  const [loggedIn, setLoggedIn] = useState(false);

  const goPub = (screen: string, jobId?: string) => {
    if (screen === 'login') { setSection('employee'); return; }
    setPubScreen(screen);
    if (jobId) setPubJobId(jobId);
  };

  const handleLogin = (role: string) => {
    setLoggedIn(true);
    if (role === 'admin') { setSection('admin'); setAdmScreen('admin-dashboard'); }
    else { setSection('employee'); setEmpScreen('emp-dashboard'); }
  };

  // Section Switcher — always visible at bottom
  const Switcher = () => (
    <div style={{ position:'fixed', bottom:20, left:'50%', transform:'translateX(-50%)', background:'oklch(0.14 0.04 260)', color:'white', borderRadius:99, padding:'5px 5px', display:'flex', gap:2, boxShadow:'0 8px 40px oklch(0.14 0.04 260 / 0.6)', zIndex:9999, border:'1px solid oklch(0.25 0.06 260)' }}>
      {([
        {id:'public',label:'Public',icon:'globe'},
        {id:'employee',label:'Employee',icon:'users'},
        {id:'admin',label:'Admin',icon:'shield'},
        {id:'chat',label:'AI Chat',icon:'bot'},
      ] as const).map(s => (
        <button key={s.id} onClick={() => setSection(s.id)} style={{ background: section===s.id ? 'oklch(0.42 0.15 260)' : 'transparent', color:'white', border:'none', borderRadius:99, padding:'9px 18px', cursor:'pointer', display:'flex', gap:7, alignItems:'center', fontWeight:600, fontSize:14, transition:'background .15s', fontFamily:'var(--font-sans)', letterSpacing:'-0.01em' }}>
          <Icon name={s.icon} size={15}/> {s.label}
        </button>
      ))}
    </div>
  );

  if (section === 'chat') {
    return (
      <div style={{ position:'relative', minHeight:'100vh' }}>
        <ChatbotFull onBack={() => setSection('public')}/>
      </div>
    );
  }

  if (section === 'employee') {
    if (!loggedIn) return (
      <div style={{ position:'relative', minHeight:'100vh' }}>
        <div style={{ paddingBottom: 80 }}>
          <LoginPage go={(s:string) => { setSection('public'); setPubScreen(s); }} onLogin={handleLogin}/>
        </div>
        <Switcher/>
      </div>
    );
    let pane: React.ReactNode = null;
    if (empScreen === 'emp-dashboard') pane = <EmployeeDashboard go={setEmpScreen}/>;
    else if (empScreen === 'emp-profile') pane = <EmployeeProfile/>;
    else if (empScreen === 'emp-team') pane = <EmployeeTeam/>;
    else if (empScreen === 'emp-chat') pane = <EmployeeChat/>;
    else if (empScreen === 'emp-notices') pane = <EmployeeNotices/>;
    return (
      <div style={{ position:'relative', minHeight:'100vh' }}>
        <AppShell side="employee" screen={empScreen} setScreen={setEmpScreen} userName="A M Rashid Ashef Hossain" userRole="IT Manager">{pane}</AppShell>
        <Switcher/>
      </div>
    );
  }

  if (section === 'admin') {
    if (!loggedIn) return (
      <div style={{ position:'relative', minHeight:'100vh' }}>
        <div style={{ paddingBottom: 80 }}>
          <LoginPage go={(s:string) => { setSection('public'); setPubScreen(s); }} onLogin={handleLogin}/>
        </div>
        <Switcher/>
      </div>
    );
    let pane: React.ReactNode = null;
    if (admScreen === 'admin-dashboard') pane = <AdminDashboard go={setAdmScreen}/>;
    else if (admScreen === 'admin-employees') pane = <AdminEmployees/>;
    else if (admScreen === 'admin-jobs') pane = <AdminJobs/>;
    else if (admScreen === 'admin-applications') pane = <AdminApplications/>;
    else if (admScreen === 'admin-evaluate') pane = <AdminEvaluate/>;
    else if (admScreen === 'admin-cvscan') pane = <AdminCVScan/>;
    return (
      <div style={{ position:'relative', minHeight:'100vh' }}>
        <AppShell side="admin" screen={admScreen} setScreen={setAdmScreen} userName="Mohammad Amir Hassan Chowdhury" userRole="Head of HR & Admin">{pane}</AppShell>
        <Switcher/>
      </div>
    );
  }

  // Public section
  let body: React.ReactNode = null;
  if (pubScreen === 'home') body = <LandingPage go={goPub}/>;
  else if (pubScreen === 'about') body = <AboutPage go={goPub}/>;
  else if (pubScreen === 'jobs') body = <JobsListPage go={goPub} openJob={(id:string) => { setPubScreen('job'); setPubJobId(id); }}/>;
  else if (pubScreen === 'job') body = <JobDetailPage go={goPub} jobId={pubJobId} openApply={(id:string) => { setPubScreen('apply'); setPubJobId(id); }}/>;
  else if (pubScreen === 'apply') body = <ApplyPage go={goPub} jobId={pubJobId} openExam={(id:string) => { setPubScreen('exam'); setPubJobId(id); }}/>;
  else if (pubScreen === 'exam') body = <ExamPage go={goPub} jobId={pubJobId} onSubmit={() => setPubScreen('home')}/>;

  return (
    <div style={{ position:'relative', minHeight:'100vh', background:'var(--bg)' }}>
      <div style={{ paddingBottom: 88 }}>{body}</div>
      <Switcher/>
      {/* Floating chatbot button */}
      <button onClick={() => setSection('chat')} style={{ position:'fixed', bottom:90, right:28, width:56, height:56, borderRadius:'50%', background:'oklch(0.32 0.18 260)', color:'white', border:'none', cursor:'pointer', boxShadow:'0 8px 28px oklch(0.32 0.18 260 / 0.45)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:100 }}>
        <Icon name="bot" size={23}/>
        <span style={{ position:'absolute', top:5, right:5, width:11, height:11, borderRadius:99, background:'oklch(0.55 0.13 155)', border:'2px solid oklch(0.32 0.18 260)' }}/>
      </button>
    </div>
  );
}
