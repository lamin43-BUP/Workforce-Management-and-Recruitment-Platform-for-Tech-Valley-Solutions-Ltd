'use client';

import { useState } from 'react';
import { Card, Button, Pill, Avatar, Input } from '@/components/ui';
import { Icon } from '@/components/ui/Icon';
import { TEAMS_DATA } from '@/lib/data';

const ALL_EMPLOYEES = TEAMS_DATA.flatMap(team =>
  team.members.map(m => ({ ...m, teamName: team.name, teamColor: team.color, teamIcon: team.icon }))
);

export default function AdminEmployees() {
  const [search, setSearch] = useState('');
  const [teamFilter, setTeamFilter] = useState('all');
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = ALL_EMPLOYEES.filter(e => {
    const q = search.toLowerCase();
    const matchSearch = !q || e.name.toLowerCase().includes(q) || e.role.toLowerCase().includes(q) || e.email.toLowerCase().includes(q);
    const matchTeam = teamFilter === 'all' || e.teamName === teamFilter;
    return matchSearch && matchTeam;
  });

  const selectedEmp = ALL_EMPLOYEES.find(e => e.id === selected);

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--ink)', margin: 0 }}>Employee Management</h1>
          <p style={{ color: 'var(--ink-3)', fontSize: 14, margin: '4px 0 0' }}>{ALL_EMPLOYEES.length} employees across {TEAMS_DATA.length} teams</p>
        </div>
        <Button variant="primary" size="sm"><Icon name="plus" size={14}/>Add Employee</Button>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, role, email…" style={{ minWidth: 240 }}/>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => setTeamFilter('all')} style={{ background: teamFilter === 'all' ? 'var(--primary)' : 'var(--surface-2)', color: teamFilter === 'all' ? 'var(--primary-ink)' : 'var(--ink-2)', border: 'none', borderRadius: 99, padding: '7px 16px', cursor: 'pointer', fontWeight: 600, fontSize: 13, fontFamily: 'var(--font-sans)' }}>All</button>
          {TEAMS_DATA.map(t => (
            <button key={t.id} onClick={() => setTeamFilter(t.name)} style={{ background: teamFilter === t.name ? 'var(--primary)' : 'var(--surface-2)', color: teamFilter === t.name ? 'var(--primary-ink)' : 'var(--ink-2)', border: 'none', borderRadius: 99, padding: '7px 14px', cursor: 'pointer', fontWeight: 600, fontSize: 12, fontFamily: 'var(--font-sans)' }}>{t.name.replace(' Team','').replace(' & Marketing','')}</button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 340px' : '1fr', gap: 20 }}>
        {/* Table */}
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--surface-2)' }}>
                {['Employee','Team','Role','Skills','Joined','Actions'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((e, i) => (
                <tr key={e.id} onClick={() => setSelected(selected === e.id ? null : e.id)} style={{ borderTop: '1px solid var(--border)', background: selected === e.id ? 'var(--surface-2)' : i % 2 === 0 ? 'var(--surface)' : 'transparent', cursor: 'pointer', transition: 'background .15s' }}>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 36, height: 36, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                        <Avatar name={e.name} size={36}/>
                      </div>
                      <div>
                        <p style={{ fontWeight: 600, color: 'var(--ink)', margin: 0, fontSize: 14 }}>{e.name}</p>
                        <p style={{ color: 'var(--ink-3)', margin: 0, fontSize: 12 }}>{e.email}</p>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <Pill tone="primary" style={{ fontSize: 11 }}>{e.teamName}</Pill>
                  </td>
                  <td style={{ padding: '12px 16px', color: 'var(--ink-2)', fontSize: 13 }}>{e.role}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                      {e.skills.slice(0, 2).map(s => <Pill key={s} tone="neutral" style={{ fontSize: 10 }}>{s}</Pill>)}
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', color: 'var(--ink-3)', fontSize: 12 }}>{e.joined}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <Button variant="ghost" size="sm"><Icon name="edit" size={13}/></Button>
                      <Button variant="ghost" size="sm"><Icon name="mail" size={13}/></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--ink-3)' }}>
              <Icon name="users" size={28} color="var(--ink-3)"/>
              <p style={{ marginTop: 10 }}>No employees match your search.</p>
            </div>
          )}
        </Card>

        {/* Detail panel */}
        {selectedEmp && (
          <Card style={{ padding: 24, alignSelf: 'flex-start' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', margin: 0 }}>Employee Details</h3>
              <Button variant="ghost" size="sm" onClick={() => setSelected(null)}><Icon name="close" size={14}/></Button>
            </div>
            <div style={{ textAlign: 'center', marginBottom: 18 }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', overflow: 'hidden', margin: '0 auto 10px' }}>
                <Avatar name={selectedEmp.name} size={72}/>
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, margin: '0 0 4px', color: 'var(--ink)' }}>{selectedEmp.name}</h3>
              <p style={{ color: 'var(--ink-2)', margin: '0 0 8px', fontSize: 14 }}>{selectedEmp.role}</p>
              <Pill tone="primary">{selectedEmp.teamName}</Pill>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 18 }}>
              <Row icon="mail" label="Email" value={selectedEmp.email}/>
              <Row icon="calendar" label="Joined" value={selectedEmp.joined}/>
            </div>
            <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', margin: '0 0 8px', textTransform: 'uppercase' }}>Skills</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
              {selectedEmp.skills.map(s => <Pill key={s} tone="primary" style={{ fontSize: 11 }}>{s}</Pill>)}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Button variant="outline" size="sm" style={{ flex: 1 }}><Icon name="edit" size={13}/> Edit</Button>
              <Button variant="danger" size="sm" style={{ flex: 1 }}><Icon name="close" size={13}/> Remove</Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

function Row({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <Icon name={icon} size={14} color="var(--primary)"/>
      <div>
        <p style={{ color: 'var(--ink-3)', fontSize: 11, margin: 0 }}>{label}</p>
        <p style={{ color: 'var(--ink)', fontSize: 13, margin: 0, fontWeight: 500 }}>{value}</p>
      </div>
    </div>
  );
}
