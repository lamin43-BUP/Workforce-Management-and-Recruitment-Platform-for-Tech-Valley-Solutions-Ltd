'use client';
import { useState, useEffect, useRef } from 'react';
import { Icon } from '../ui/Icon';

interface Message { role: 'user' | 'bot'; text: string; typing?: boolean; }

const SUGGESTIONS = ['What services does TVSL offer?','How do I apply for a job?','What is the AI exam like?','What are the open positions?','Where is TVSL located?','How can I contact TVSL?'];

export default function ChatbotFull({ onBack }: { onBack: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: "Hello! I'm the TVSL AI Assistant. I can help you with information about our company, job openings, services, the application process, and more. How can I assist you today?" },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  const send = async (text?: string) => {
    const msg = (text || input).trim();
    if (!msg || loading) return;
    setInput('');
    setMessages(m => [...m, { role: 'user', text: msg }]);
    setLoading(true);
    try {
      const history = messages.map(m => ({ role: m.role, text: m.text }));
      const res = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: msg, history }) });
      const data = await res.json();
      setMessages(m => [...m, { role: 'bot', text: data.reply, typing: true }]);
    } catch {
      setMessages(m => [...m, { role: 'bot', text: "I'm having some trouble right now. Please try again." }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: 'oklch(0.97 0.005 260)' }}>
      {/* Header */}
      <div style={{ background: '#152347', padding: '0 32px', height: 72, display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
        <button onClick={onBack} style={{ background: '#535f7d', border: 'none', color: 'white', borderRadius: 10, padding: '8px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7, fontSize: 14, fontWeight: 600, fontFamily: 'var(--font-sans)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          Back
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ position: 'relative' }}>
            <div style={{ width: 46, height: 46, borderRadius: 13, background: "white", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", border: "1px solid oklch(0.88 0.04 260)" }}>
              <img src="/Logo.png" alt="TVSL" style={{ width: 36, height: 36, objectFit: 'contain' }}
                onError={e => { (e.target as HTMLImageElement).style.display='none'; (e.target as HTMLImageElement).parentElement!.innerHTML += '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>'; }}
              />
            </div>
            <span style={{ position: 'absolute', bottom: 2, right: 2, width: 10, height: 10, borderRadius: '50%', background: 'oklch(0.55 0.13 155)', border: '2px solid oklch(0.17 0.04 260)' }}/>
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 17, color: 'white', letterSpacing: '-0.01em' }}>TVSL AI Assistant</div>
            <div style={{ fontSize: 12, color: 'oklch(0.68 0.06 260)', display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'oklch(0.55 0.13 155)', display: 'inline-block' }}/>
              Online 
            </div>
          </div>
        </div>
      </div>

      {/* Chat area */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Messages */}
        <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '32px 40px' }}>
          <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
            {messages.map((m, i) => <ChatMsg key={i} msg={m}/>)}
            {loading && (
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>
                <BotAvatar/>
                <div style={{ background: 'white', borderRadius: '4px 16px 16px 16px', padding: '14px 18px', boxShadow: '0 2px 12px oklch(0 0 0 / 0.06)' }}>
                  <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                    {[0,0.2,0.4].map((d,i) => <span key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: 'oklch(0.62 0.06 260)', animation: `tvsl-pulse 1.2s ease-in-out ${d}s infinite` }}/>)}
                  </div>
                </div>
              </div>
            )}
            {messages.length === 1 && !loading && (
              <div style={{ marginTop: 8 }}>
                <p style={{ fontSize: 13, color: 'oklch(0.52 0.012 250)', fontWeight: 600, marginBottom: 12 }}>Quick questions:</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {SUGGESTIONS.map(s => (
                    <button key={s} onClick={() => send(s)} style={{ background: 'white', border: '1.5px solid var(--border)', borderRadius: 99, padding: '9px 16px', fontSize: 13, color: 'oklch(0.32 0.18 260)', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontWeight: 600, transition: 'all .15s', boxShadow: '0 1px 6px oklch(0 0 0 / 0.04)' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background='oklch(0.94 0.03 260)'; (e.currentTarget as HTMLButtonElement).style.borderColor='oklch(0.62 0.1 260)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background='white'; (e.currentTarget as HTMLButtonElement).style.borderColor='var(--border)'; }}
                    >{s}</button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar info */}
        <div style={{ width: 280, background: 'white', borderLeft: '1px solid var(--border)', padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 24, overflowY: 'auto', flexShrink: 0 }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 800, color: 'oklch(0.52 0.012 250)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>About TVSL</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[{icon:'globe',t:'Website',v:'tvsl-bd.com'},{icon:'mapPin',t:'Location',v:'Dhaka, Bangladesh'},{icon:'mail',t:'Email',v:'info@tvsl-bd.com'},{icon:'phone',t:'Phone',v:'+88 01729-298875'}].map(c => (
                <div key={c.t} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '9px 12px', background: 'oklch(0.97 0.005 260)', borderRadius: 10 }}>
                  <Icon name={c.icon} size={14} color="oklch(0.32 0.18 260)"/>
                  <div>
                    <div style={{ fontSize: 10, color: 'oklch(0.52 0.012 250)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{c.t}</div>
                    <div style={{ fontSize: 12, color: 'oklch(0.25 0.02 260)', fontWeight: 600, marginTop: 1 }}>{c.v}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div style={{ background: 'linear-gradient(135deg, oklch(0.32 0.18 260), oklch(0.22 0.12 260))', borderRadius: 14, padding: 18, textAlign: 'center' }}>
            <p style={{ color: 'white', fontSize: 14, fontWeight: 700, margin: '0 0 12px' }}>Ready to apply?</p>
            <div style={{ fontSize: 12, color: 'oklch(0.78 0.06 260)', margin: '0 0 14px' }}>Explore careers at TVSL</div>
            <button onClick={onBack} style={{ background: 'white', color: 'oklch(0.32 0.18 260)', border: 'none', borderRadius: 8, padding: '8px 20px', fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font-sans)', width: '100%' }}>View Openings</button>
          </div>
        </div>
      </div>

      {/* Input bar */}
      <div style={{ background: 'white', borderTop: '1px solid var(--border)', padding: '16px 40px', flexShrink: 0 }}>
        <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', gap: 12, alignItems: 'center' }}>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
            placeholder="Ask me anything about TVSL, jobs, services…"
            style={{ flex: 1, background: 'oklch(0.97 0.005 260)', border: '1.5px solid var(--border)', borderRadius: 14, padding: '14px 18px', fontSize: 15, outline: 'none', color: 'var(--ink)', fontFamily: 'var(--font-sans)', transition: 'border .15s' }}
            onFocus={e => (e.target as HTMLInputElement).style.borderColor = 'oklch(0.62 0.1 260)'}
            onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'var(--border)'}
          />
          <button 
  onClick={() => send()} 
  disabled={!input.trim() || loading} 
  style={{ 
    width: 48, 
    height: 48, 
    borderRadius: 13, 
    background: 'oklch(0.32 0.18 260)',  // Always blue
    color: 'white', 
    border: 'none', 
    cursor: !input.trim() || loading ? 'not-allowed' : 'pointer', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    flexShrink: 0, 
    transition: 'all .15s',
    opacity: !input.trim() || loading ? 0.6 : 1  // Just change opacity when disabled
  }}
>
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
</button>
        </div>
        <p style={{ textAlign: 'center', fontSize: 12, color: 'oklch(0.62 0.01 260)', marginTop: 10 }}>TVSL AI Assistant </p>
      </div>
    </div>
  );
}

function BotAvatar() {
  // white bg for logo
  return (
    <div style={{ width: 36, height: 36, borderRadius: 10, background: 'white', border: '1px solid oklch(0.88 0.04 260)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
      <img src="/Logo.png" alt="TVSL" style={{ width: 28, height: 28, objectFit: 'contain' }}
        onError={e => { (e.target as HTMLImageElement).style.display='none'; }}/>
    </div>
  );
}

function ChatMsg({ msg }: { msg: Message }) {
  const isBot = msg.role === 'bot';
  const [shown, setShown] = useState(msg.typing ? '' : msg.text);
  useEffect(() => {
    if (!msg.typing) return;
    let i = 0;
    const t = setInterval(() => { i++; setShown(msg.text.slice(0, i)); if (i >= msg.text.length) clearInterval(t); }, 10);
    return () => clearInterval(t);
  }, [msg.text, msg.typing]);

  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', flexDirection: isBot ? 'row' : 'row-reverse' }}>
      {isBot && <BotAvatar/>}
      <div style={{ maxWidth: '72%' }}>
        <div style={{ padding: '13px 18px', borderRadius: isBot ? '4px 16px 16px 16px' : '16px 4px 16px 16px', background: isBot ? 'white' : 'oklch(0.32 0.18 260)', color: isBot ? 'var(--ink)' : 'white', fontSize: 15, lineHeight: 1.55, boxShadow: isBot ? '0 2px 12px oklch(0 0 0 / 0.06)' : '0 4px 16px oklch(0.32 0.18 260 / 0.3)' }}>
          {shown}
          {msg.typing && shown.length < msg.text.length && <span style={{ display: 'inline-block', width: 2, height: 14, background: 'currentColor', marginLeft: 2, verticalAlign: 'middle', animation: 'tvsl-blink 1s steps(2) infinite' }}/>}
        </div>
      </div>
    </div>
  );
}
