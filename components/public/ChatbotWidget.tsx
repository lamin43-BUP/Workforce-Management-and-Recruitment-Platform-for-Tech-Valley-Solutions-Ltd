'use client';

import { useState, useEffect, useRef } from 'react';
import { Icon } from '../ui/Icon';

interface Message { role: 'user' | 'bot'; text: string; typing?: boolean; }

interface Props { onClose: () => void; }

const SUGGESTIONS = [
  'What services does TVSL offer?',
  'How do I apply for a job?',
  'What is the AI exam like?',
  'Where is TVSL located?',
];

export default function ChatbotWidget({ onClose }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: "Hi! I'm the TVSL AI assistant. I can help with job openings, company info, networking questions, and more. What can I help you with?" },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);

  const send = async (text?: string) => {
    const msg = (text || input).trim();
    if (!msg || loading) return;
    setInput('');
    setMessages(m => [...m, { role: 'user', text: msg }]);
    setLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role, text: m.text }));
      const res = await fetch('/api/chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, history }),
      });
      const data = await res.json();
      setMessages(m => [...m, { role: 'bot', text: data.reply, typing: true }]);
    } catch {
      setMessages(m => [...m, { role: 'bot', text: "Sorry, I'm having trouble connecting. Please try again shortly." }]);
    }
    setLoading(false);
  };

  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24, width: 380, height: 560,
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: 'var(--r-xl)', boxShadow: 'var(--sh-pop)',
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
      zIndex: 1000, animation: 'tvsl-fade-in .2s',
    }}>
      {/* Header */}
      <div style={{ padding: '14px 18px', background: 'var(--ink)', color: 'var(--surface)', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="bot" size={18}/>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 14 }}>TVSL Assistant</div>
          <div style={{ fontSize: 11, opacity: 0.7, display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 6, height: 6, borderRadius: 99, background: 'var(--success)' }}/>
            Powered by Gemini AI
          </div>
        </div>
        <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', padding: 4, display: 'flex', borderRadius: 6 }}>
          <Icon name="close" size={18}/>
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="scroll-pretty" style={{ flex: 1, overflow: 'auto', padding: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {messages.map((m, i) => <ChatMessage key={i} msg={m}/>)}
        {loading && (
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
            <div style={{ width: 24, height: 24, borderRadius: 8, background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon name="bot" size={12}/>
            </div>
            <div style={{ background: 'var(--surface-2)', borderRadius: 12, padding: '10px 14px', display: 'flex', gap: 4 }}>
              {[0, 0.15, 0.3].map((delay, i) => (
                <span key={i} style={{ width: 7, height: 7, borderRadius: 99, background: 'var(--muted)', animation: `tvsl-pulse 1.2s ease-in-out ${delay}s infinite` }}/>
              ))}
            </div>
          </div>
        )}
        {messages.length === 1 && (
          <div style={{ marginTop: 4, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ fontSize: 10, color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>Suggested</div>
            {SUGGESTIONS.map(s => (
              <button key={s} onClick={() => send(s)} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 99, padding: '8px 14px', fontSize: 13, color: 'var(--ink-2)', textAlign: 'left', cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>{s}</button>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <div style={{ padding: 12, borderTop: '1px solid var(--border)', display: 'flex', gap: 8 }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Ask me anything…"
          style={{ flex: 1, background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 99, padding: '10px 14px', fontSize: 14, outline: 'none', color: 'var(--ink)', fontFamily: 'var(--font-sans)' }}/>
        <button onClick={() => send()} disabled={!input.trim() || loading} style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--primary)', color: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, opacity: !input.trim() || loading ? 0.5 : 1 }}>
          <Icon name="send" size={15}/>
        </button>
      </div>
    </div>
  );
}

function ChatMessage({ msg }: { msg: Message }) {
  const isBot = msg.role === 'bot';
  const [shown, setShown] = useState(msg.typing ? '' : msg.text);

  useEffect(() => {
    if (!msg.typing) return;
    let i = 0;
    const t = setInterval(() => {
      i++;
      setShown(msg.text.slice(0, i));
      if (i >= msg.text.length) clearInterval(t);
    }, 12);
    return () => clearInterval(t);
  }, [msg.text, msg.typing]);

  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', flexDirection: isBot ? 'row' : 'row-reverse' }}>
      {isBot && (
        <div style={{ width: 24, height: 24, borderRadius: 8, background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Icon name="bot" size={12}/>
        </div>
      )}
      <div style={{ maxWidth: '78%', padding: '10px 14px', borderRadius: 14, background: isBot ? 'var(--surface-2)' : 'var(--primary)', color: isBot ? 'var(--ink)' : 'white', fontSize: 14, lineHeight: 1.45, borderBottomLeftRadius: isBot ? 4 : 14, borderBottomRightRadius: isBot ? 14 : 4 }}>
        {shown}
        {msg.typing && shown.length < msg.text.length && (
          <span style={{ display: 'inline-block', width: 2, height: 13, background: 'currentColor', marginLeft: 2, verticalAlign: 'middle', animation: 'tvsl-blink 1s steps(2) infinite' }}/>
        )}
      </div>
    </div>
  );
}
