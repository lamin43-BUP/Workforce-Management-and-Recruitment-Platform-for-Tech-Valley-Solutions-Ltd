'use client';

import { Topbar } from '../ui/AppShell';
import { Button, Pill, Card, Stat, Avatar } from '../ui/index';
import { Icon } from '../ui/Icon';
import { NOTICES_DATA } from '@/lib/data';

export default function EmployeeDashboard({ go }: { go: (s: string) => void }) {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  const tasks = [
    { id: 1, title: 'Submit Q2 performance self-review', tag: 'HR', priority: 'high', due: 'June 18', done: false },
    { id: 2, title: 'Update switch firmware on core stack', tag: 'Maintenance', priority: 'medium', due: 'June 20', done: true },
    { id: 3, title: 'Team stand-up — 10:00 AM', tag: 'Meeting', priority: 'low', due: 'Today', done: false },
    { id: 4, title: 'Document new VLAN configurations', tag: 'Documentation', priority: 'medium', due: 'June 22', done: false },
  ];

  return (
    <>
      <Topbar title="Dashboard" subtitle={`${today} · Good morning, Rashid Ashef`}
        search="Search tasks, notices..."
        actions={<>
          <Button variant="outline" iconLeft="bell" size="sm" onClick={() => go('emp-notices')}>Notices</Button>
          <Button iconLeft="chat" size="sm" onClick={() => go('emp-chat')}>Team Chat</Button>
        </>}
      />
      <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          <Stat label="Tasks pending" value="4" delta="2 due today"  icon="briefcase"/>
          <Stat label="Team size" value="8" icon="users" sublabel="IT Team"/>
          <Stat label="Unread notices" value="2" icon="bell" sublabel="This week"/>
          <Stat label="Attendance" value="98%" deltaTone="success" icon="calendar" sublabel="This month"/>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 24 }}>
          {/* Tasks */}
          <Card padding={0}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: 15, fontWeight: 700 }}>My Tasks</div>
              <Pill tone="danger" size="sm">{tasks.filter(t => !t.done && t.due === 'Today').length} due today</Pill>
            </div>
            <div style={{ padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: 2 }}>
              {tasks.map(task => (
                <div key={task.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 8px', borderRadius: 'var(--r-md)', opacity: task.done ? 0.5 : 1 }}>
                  <div style={{ width: 18, height: 18, borderRadius: 4, border: `2px solid ${task.done ? 'var(--success)' : 'var(--border-strong)'}`, background: task.done ? 'var(--success)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {task.done && <Icon name="check" size={10} color="white"/>}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 500, textDecoration: task.done ? 'line-through' : 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{task.title}</div>
                    <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 1 }}>{task.tag} · Due {task.due}</div>
                  </div>
                  <div style={{ width:10, height:10, borderRadius:"50%", background: task.priority === "high" ? "var(--danger)" : task.priority === "medium" ? "oklch(0.7 0.14 75)" : "var(--success)", flexShrink:0 }}/>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent notices */}
          <Card padding={0}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: 15, fontWeight: 700 }}>Recent Notices</div>
              <button onClick={() => go('emp-notices')} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>View all</button>
            </div>
            <div style={{ padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: 0 }}>
              {NOTICES_DATA.slice(0, 3).map((n, i) => (
                <div key={n.id} style={{ padding: '12px 8px', borderBottom: i < 2 ? '1px solid var(--border)' : 'none' }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 4 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: n.priority === 'high' ? 'var(--danger-soft)' : n.priority === 'medium' ? 'var(--warning-soft)' : 'var(--surface-3)', color: n.priority === 'high' ? 'var(--danger)' : n.priority === 'medium' ? 'var(--warning)' : 'var(--muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon name={n.type === 'meeting' ? 'calendar' : n.type === 'work' ? 'briefcase' : 'bell'} size={13}/>
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700 }}>{n.title}</div>
                      <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2, lineHeight: 1.4 }}>{n.body.slice(0, 80)}...</div>
                      <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>{n.date}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick actions */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {[
            { icon: 'users', label: 'My Team', sub: 'View team members', target: 'emp-team' },
            { icon: 'chat', label: 'Team Chat', sub: '3 unread messages', target: 'emp-chat' },
            { icon: 'bell', label: 'Notices', sub: '2 new notices', target: 'emp-notices' },
            { icon: 'user', label: 'My Profile', sub: 'View & edit profile', target: 'emp-profile' },
          ].map(a => (
            <Card key={a.label} hover padding={20} onClick={() => go(a.target)} style={{ cursor: 'pointer', display: 'flex', gap: 14, alignItems: 'center' }}>
              <div style={{ width: 40, height: 40, borderRadius: 'var(--r-md)', background: 'var(--primary-soft)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name={a.icon} size={18}/>
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>{a.label}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{a.sub}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
