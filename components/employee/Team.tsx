'use client';

import { useState } from 'react';
import { Card, Pill, Avatar } from '@/components/ui';
import { Icon } from '@/components/ui/Icon';
import { TEAMS_DATA } from '@/lib/data';

export default function EmployeeTeam() {
  const [activeTeam, setActiveTeam] = useState('it');
  const team = TEAMS_DATA.find(t => t.id === activeTeam) || TEAMS_DATA[0];

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--ink)', margin: 0 }}>Teams</h1>
        <p style={{ color: 'var(--ink-3)', fontSize: 14, margin: '4px 0 0' }}>
          {TEAMS_DATA.reduce((s, t) => s + t.members.length, 0)} employees across {TEAMS_DATA.length} departments
        </p>
      </div>

      {/* Team tabs */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        {TEAMS_DATA.map(t => (
          <button key={t.id} onClick={() => setActiveTeam(t.id)} style={{
            background: activeTeam === t.id ? 'var(--primary)' : 'var(--surface-2)',
            color: activeTeam === t.id ? 'var(--primary-ink)' : 'var(--ink-2)',
            border: 'none', borderRadius: 99, padding: '8px 18px', cursor: 'pointer',
            fontWeight: 600, fontSize: 13, display: 'flex', alignItems: 'center', gap: 7,
            transition: 'all .15s', fontFamily: 'var(--font-sans)'
          }}>
            <Icon name={t.icon} size={14}/>
            {t.name}
            <span style={{ background: activeTeam === t.id ? 'oklch(1 0 0 / 0.2)' : 'var(--surface-3)', borderRadius: 99, padding: '1px 7px', fontSize: 11 }}>
              {t.members.length}
            </span>
          </button>
        ))}
      </div>

      {/* Team overview card */}
      <Card style={{ padding: 20, display: 'flex', alignItems: 'center', gap: 16, background: 'linear-gradient(135deg, var(--surface) 0%, var(--surface-2) 100%)' }}>
        <div style={{ width: 52, height: 52, borderRadius: 14, background: team.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name={team.icon} size={24} color="white"/>
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--ink)', margin: 0 }}>{team.name}</h2>
          <p style={{ color: 'var(--ink-3)', margin: '4px 0 0', fontSize: 14 }}>{team.members.length} team members · Active</p>
        </div>
        <Pill tone="success">All Active</Pill>
      </Card>

      {/* Members grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
        {team.members.map((m, i) => (
          <MemberCard key={m.id} member={m} isMe={i === 0 && activeTeam === 'it'}/>
        ))}
      </div>

      {/* All-teams overview */}
      <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--ink)', margin: '8px 0 0' }}>All Teams Overview</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
        {TEAMS_DATA.map(t => (
          <Card key={t.id} onClick={() => setActiveTeam(t.id)} style={{ padding: 18, cursor: 'pointer', borderLeft: `3px solid ${t.color}`, transition: 'box-shadow .15s' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: t.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name={t.icon} size={18} color="white"/>
                </div>
                <div>
                  <p style={{ fontWeight: 600, color: 'var(--ink)', margin: 0, fontSize: 14 }}>{t.name}</p>
                  <p style={{ color: 'var(--ink-3)', margin: 0, fontSize: 12 }}>{t.members.length} members</p>
                </div>
              </div>
              <Icon name="arrowRight" size={16} color="var(--ink-3)"/>
            </div>
            <div style={{ display: 'flex', gap: -8 }}>
              {t.members.slice(0, 4).map(m => (
                <div key={m.id} style={{ marginLeft: -6, width: 32, height: 32, borderRadius: '50%', border: '2px solid var(--surface)', overflow: 'hidden' }}>
                  <Avatar name={m.name} size={32}/>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function MemberCard({ member, isMe }: { member: (typeof TEAMS_DATA[0]['members'])[0]; isMe: boolean }) {
  return (
    <Card style={{ padding: 22, textAlign: 'center', position: 'relative' }}>
      {isMe && (
        <span style={{ position: 'absolute', top: 12, right: 12, background: 'var(--primary)', color: 'var(--primary-ink)', borderRadius: 99, padding: '2px 8px', fontSize: 10, fontWeight: 700 }}>YOU</span>
      )}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', overflow: 'hidden', border: '3px solid var(--surface-2)' }}>
          <Avatar name={member.name} size={64}/>
        </div>
      </div>
      <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', margin: '0 0 4px' }}>{member.name}</h3>
      <p style={{ color: 'var(--ink-3)', fontSize: 13, margin: '0 0 12px' }}>{member.role}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center', marginBottom: 14 }}>
        {member.skills.slice(0, 2).map(s => <Pill key={s} tone="primary" style={{ fontSize: 11 }}>{s}</Pill>)}
      </div>
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: 12 }}>
        <a href={`mailto:${member.email}`} style={{ color: 'var(--primary)', fontSize: 12, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
          <Icon name="mail" size={12}/> {member.email}
        </a>
        <p style={{ color: 'var(--ink-3)', fontSize: 11, margin: '4px 0 0' }}>Since {member.joined}</p>
      </div>
    </Card>
  );
}
