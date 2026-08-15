import { useEffect, useRef, useState } from 'react';
import { CHATBOT_WORKER_URL } from '../data/portfolioData.js';
import { renderMarkdown, stripMarkdown } from '../utils/markdown.js';

const CHIPS = ['Projects 🚀', 'Skills 💡', 'Internship?', 'Contact 📬'];

function getTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

let idCounter = 0;
const nextId = () => ++idCounter;

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState([
    { id: nextId(), sender: 'bot', text: "Hey! 👋 I'm Yash's AI. Ask me about his skills, projects, experience — or just say hi!", time: getTime(), streaming: false },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [sending, setSending] = useState(false);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, typing]);

  useEffect(() => {
    if (open && !minimized) setTimeout(() => inputRef.current?.focus(), 380);
  }, [open, minimized]);

  // Copy-code delegation
  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    const handler = (e) => {
      const btn = e.target.closest('[data-copy]');
      if (!btn) return;
      const codeEl = btn.closest('.md-code-block')?.querySelector('code');
      if (!codeEl) return;
      navigator.clipboard.writeText(codeEl.textContent).then(() => {
        const original = btn.textContent;
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(() => { btn.textContent = original; btn.classList.remove('copied'); }, 1500);
      }).catch(() => {});
    };
    el.addEventListener('click', handler);
    return () => el.removeEventListener('click', handler);
  }, []);

  async function send(rawText) {
    const message = (rawText ?? input).trim();
    if (!message) return;

    setMessages((m) => [...m, { id: nextId(), sender: 'user', text: message, time: getTime() }]);
    setInput('');
    setTyping(true);
    setSending(true);

    try {
      const res = await fetch(CHATBOT_WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      setTyping(false);

      if (data.success) {
        streamBotMessage(data.message);
      } else {
        setMessages((m) => [...m, { id: nextId(), sender: 'bot', text: '❌ ' + (data.error || 'Something went wrong. Please try again.'), time: getTime() }]);
      }
    } catch (err) {
      setTyping(false);
      setMessages((m) => [...m, { id: nextId(), sender: 'bot', text: '❌ Network error. Please check your connection and try again.', time: getTime() }]);
      console.error('Chat error:', err);
    } finally {
      setSending(false);
      inputRef.current?.focus();
    }
  }

  function streamBotMessage(fullText) {
    const id = nextId();
    const plain = stripMarkdown(fullText);
    setMessages((m) => [...m, { id, sender: 'bot', text: plain, full: fullText, time: getTime(), streaming: true }]);

    let i = 0;
    const chunk = Math.max(1, Math.round(plain.length / 90));
    const step = () => {
      i += chunk;
      setMessages((m) => m.map((msg) => (msg.id === id ? { ...msg, text: plain.slice(0, i) } : msg)));
      if (i < plain.length) {
        setTimeout(step, 14);
      } else {
        setMessages((m) => m.map((msg) => (msg.id === id ? { ...msg, text: msg.full, streaming: false } : msg)));
      }
    };
    step();
  }

  function onChip(chip) {
    const text = chip.replace(/[^\w\s?]/g, '').trim();
    send(text);
  }

  return (
    <>
      <button
        className="chatbot-fab"
        aria-label="Open the Spell Book assistant"
        onClick={() => setOpen((o) => !o)}
      >
        <span aria-hidden="true">📖</span>
        <span className="fab-notif" />
      </button>

      <div className={`spellbook-widget ${open ? 'open' : ''} ${minimized ? 'minimized' : ''}`} role="dialog" aria-label="Spell Book — AI chat assistant" aria-hidden={!open}>
        <div className="spellbook-header">
          <div className="spellbook-title">
            <span className="spellbook-icon" aria-hidden="true">🪶</span>
            <div>
              <h3>The Spell Book</h3>
              <span className="spellbook-status"><span className="status-dot" />Online · Ask me anything</span>
            </div>
          </div>
          <div className="spellbook-actions">
            <button aria-label="Minimize" onClick={() => setMinimized((v) => !v)}>{minimized ? '▢' : '–'}</button>
            <button aria-label="Close" onClick={() => setOpen(false)}>✕</button>
          </div>
        </div>

        <div className="spellbook-body" ref={bodyRef}>
          <div className="chat-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-message ${msg.sender}-msg`}>
                <div className="msg-row">
                  <div className={`msg-avatar ${msg.sender}-avatar`} aria-hidden="true">
                    {msg.sender === 'bot' ? '🪶' : '🧑'}
                  </div>
                  <div className="msg-bubble">
                    {msg.sender === 'user' ? (
                      <p className="msg-text ink-write">{msg.text}</p>
                    ) : msg.streaming ? (
                      <div className="msg-text">{msg.text}</div>
                    ) : (
                      <div className="msg-text" dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.text) }} />
                    )}
                    <span className="msg-time">{msg.time}</span>
                  </div>
                </div>
              </div>
            ))}
            {typing && (
              <div className="typing-indicator show">
                <div className="msg-avatar bot-avatar" aria-hidden="true">🪶</div>
                <div className="quill-thinking" aria-label="Thinking">
                  <span /><span /><span />
                </div>
              </div>
            )}
          </div>

          <div className="chat-suggestions">
            {CHIPS.map((chip) => (
              <button key={chip} className="chip" onClick={() => onChip(chip)}>{chip}</button>
            ))}
          </div>

          <form
            className="spellbook-input-area"
            onSubmit={(e) => { e.preventDefault(); send(); }}
          >
            <textarea
              ref={inputRef}
              className="chat-input"
              placeholder="Write your question in ink…"
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              aria-label="Type a message"
            />
            <button type="submit" className="send-btn" disabled={sending} aria-label="Send message">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
