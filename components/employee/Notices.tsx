'use client';

import { useState } from 'react';
import { Card, Pill } from '@/components/ui';
import { Icon } from '@/components/ui/Icon';
import { NOTICES_DATA } from '@/lib/data';

const TONE: Record<string, 'danger'|'warning'|'info'|'neutral'> = { high: 'danger', medium: 'warning', low: 'info' };
const TYPE_ICON: Record<string, string> = { meeting: 'users', work: 'layers', company: 'briefcase' };

export default function EmployeeNotices() {
  const [filter, setFilter] = useState<'all'|'meeting'|'work'|'company'>('all');
  const [read, setRead] = useState<Set<string>>(new Set());

  const visible = filter === 'all' ? NOTICES_DATA : NOTICES_DATA.filter(n => n.type === filter);

  return (
    <div style={{ maxWidth: 820, margin: '0 auto', padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--ink)', margin: 0 }}>Notices</h1>
          <p style={{ color: 'var(--ink-3)', fontSize: 14, margin: '4px 0 0' }}>
            Company announcements and updates · {NOTICES_DATA.length - read.size} unread
          </p>
        </div>
        <Pill tone={NOTICES_DATA.length - read.size > 0 ? 'danger' : 'success'}>
          {NOTICES_DATA.length - read.size > 0 ? `${NOTICES_DATA.length - read.size} Unread` : 'All Read'}
        </Pill>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8 }}>
        {(['all','meeting','work','company'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            background: filter === f ? 'var(--primary)' : 'var(--surface-2)',
            color: filter === f ? 'var(--primary-ink)' : 'var(--ink-2)',
            border: 'none', borderRadius: 99, padding: '7px 16px', cursor: 'pointer',
            fontWeight: 600, fontSize: 13, textTransform: 'capitalize', fontFamily: 'var(--font-sans)'
          }}>
            {f === 'all' ? `All (${NOTICES_DATA.length})` : f}
          </button>
        ))}
        {read.size > 0 && (
          <button onClick={() => setRead(new Set())} style={{ marginLeft: 'auto', background: 'transparent', border: 'none', color: 'var(--ink-3)', fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>
            Mark all unread
          </button>
        )}
      </div>

      {/* Notices */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {visible.map(notice => {
          const isRead = read.has(notice.id);
          return (
            <Card key={notice.id} onClick={() => setRead(r => { const n = new Set(r); n.add(notice.id); return n; })}
              style={{ padding: 22, cursor: 'pointer', opacity: isRead ? 0.7 : 1, borderLeft: `4px solid ${notice.priority === 'high' ? 'var(--danger)' : notice.priority === 'medium' ? 'var(--warning)' : 'var(--info)'}`, transition: 'opacity .2s' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon name={TYPE_ICON[notice.type] || 'bell'} size={20} color="var(--primary)"/>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', margin: 0 }}>{notice.title}</h3>
                    {!isRead && <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--primary)', display: 'inline-block'}}/>}
                  </div>
                  <p style={{ color: 'var(--ink-2)', fontSize: 14, lineHeight: 1.6, margin: '0 0 12px' }}>{notice.body}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Pill tone={TONE[notice.priority]}>{notice.priority} priority</Pill>
                    <Pill tone="neutral" style={{ textTransform: 'capitalize' }}>{notice.type}</Pill>
                    <span style={{ color: 'var(--ink-3)', fontSize: 12, marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 5 }}>
                      <Icon name="calendar" size={12}/> {notice.date}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {visible.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--ink-3)' }}>
          <Icon name="bell" size={36} color="var(--ink-3)"/>
          <p style={{ marginTop: 12 }}>No notices in this category.</p>
        </div>
      )}
    </div>
  );
}
