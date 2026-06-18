'use client';

import { useState, useRef, useEffect } from 'react';
import { Button, Input, Avatar, Pill } from '@/components/ui';
import { Icon } from '@/components/ui/Icon';
import { TEAMS_DATA } from '@/lib/data';

type Msg = {
  id: string;
  sender: string;
  text: string;
  time: string;
  mine: boolean;
};

const INIT_MSGS: Record<string, Msg[]> = {
  general: [
    { id: 'm1', sender: 'Khaleda Khatun', text: "Good morning team! Don't forget the Q2 review this Friday at 10am.", time: '9:02 AM', mine: false },
    { id: 'm2', sender: 'Mizanur Rahman', text: 'Got it. Will the meeting room be booked?', time: '9:15 AM', mine: false },
    { id: 'm3', sender: 'Rafiul Islam', text: 'Yes, Conference Room B is reserved from 10–11:30 AM.', time: '9:18 AM', mine: true },
    { id: 'm4', sender: 'Asif Karim', text: "Perfect. I'll prepare the server uptime report before then.", time: '9:22 AM', mine: false },
    { id: 'm5', sender: 'Raihan Kabir', text: "Same here — I'll have the Q2 client acquisition numbers ready.", time: '9:30 AM', mine: false },
  ],
  it: [
    { id: 'i1', sender: 'Nusrat Jahan', text: 'Hey, the ticketing system is slow today. Anyone else noticing?', time: '10:05 AM', mine: false },
    { id: 'i2', sender: 'Tanvir Ahmed', text: "Yes, I think the DB needs indexing. I'll check.", time: '10:08 AM', mine: false },
    { id: 'i3', sender: 'Rafiul Islam', text: "I'll restart the service after hours to avoid disruption.", time: '10:12 AM', mine: true },
  ],
};

const CHANNELS = [
  { id: 'general', name: 'General', icon: 'globe', desc: 'Company-wide announcements' },
  { id: 'it', name: 'IT Team', icon: 'cpu', desc: 'Internal IT discussions' },
];

export default function EmployeeChat() {
  const [channel, setChannel] = useState('general');
  const [msgs, setMsgs] = useState<Record<string, Msg[]>>(INIT_MSGS);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, channel]);

  const send = () => {
    const text = input.trim();
    if (!text) return;

    const newMsg: Msg = {
      id: Date.now().toString(),
      sender: 'Rafiul Islam',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      mine: true,
    };

    setMsgs(prev => ({
      ...prev,
      [channel]: [...(prev[channel] || []), newMsg],
    }));

    setInput('');
  };

  const currentMsgs = msgs[channel] || [];
  const currentChannel = CHANNELS.find(c => c.id === channel);

  return (
    <div style={{ height: 'calc(100vh - 64px)', display: 'flex', overflow: 'hidden' }}>

      {/* Sidebar (Channels removed) */}
      <div
        style={{
          width: 260,
          borderRight: '1px solid var(--border)',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--surface-2)',
        }}
      >
        <div style={{ padding: '20px 16px', borderBottom: '1px solid var(--border)' }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, margin: 0 }}>Team Chat</h2>
          <p style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 4 }}>TVSL Internal</p>
        </div>

        {/* Only team members now */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '12px 8px' }}>
          <p style={{ fontSize: 11, textTransform: 'uppercase', color: 'var(--ink-3)' }}>
            Team Members
          </p>

          {TEAMS_DATA[0].members.map(m => (
            <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px' }}>
              <Avatar name={m.name} size={28} />
              <span style={{ fontSize: 13 }}>{m.name.split(' ')[0]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main chat */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--surface)' }}>

        {/* Header */}
        <div
          style={{
            padding: '14px 20px',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Icon name={currentChannel?.icon || 'globe'} size={18} />

          <div style={{ marginLeft: 10 }}>
            <h3 style={{ margin: 0 }}>#{currentChannel?.name}</h3>
            <p style={{ margin: 0, fontSize: 12, color: 'var(--ink-3)' }}>
              {currentChannel?.desc}
            </p>
          </div>

          <div style={{ marginLeft: 'auto' }}>
            <Pill tone="success">{currentMsgs.length} messages</Pill>
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
          {currentMsgs.map(msg => (
            <div
              key={msg.id}
              style={{
                marginBottom: 10,
                display: 'flex',
                flexDirection: msg.mine ? 'row-reverse' : 'row',
                gap: 10,
              }}
            >
              <div
                style={{
                  padding: '10px 14px',
                  borderRadius: 12,
                  background: msg.mine ? 'var(--primary)' : 'var(--surface-2)',
                  color: msg.mine ? 'white' : 'var(--ink)',
                  maxWidth: '65%',
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input (WIDER + better spacing) */}
        <div
          style={{
            padding: '14px 18px',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            gap: 14,
            alignItems: 'center',
          }}
        >
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder={`Message #${currentChannel?.name}`}
            style={{
              flex: 1,
              borderRadius: 24,
              padding: '12px 16px',
              fontSize: 14,
            }}
          />

          <Button
            onClick={send}
            disabled={!input.trim()}
            style={{ borderRadius: 999, padding: '10px 14px' }}
          >
            <Icon name="arrowRight" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}