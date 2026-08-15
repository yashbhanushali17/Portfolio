import { useState } from 'react';
import { CONTACT_API_URL } from '../data/portfolioData.js';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setSending(true);
    setStatus('Sending your owl...');

    try {
      const res = await fetch(CONTACT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus('✓ Your owl has been sent!');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('✗ Error sending. Please try again.');
      }
    } catch (err) {
      setStatus('✗ Network error. Please try again.');
      console.error(err);
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="owlery-form" onSubmit={onSubmit}>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="cf-name">Your Name</label>
          <input id="cf-name" required value={form.name} onChange={update('name')} placeholder="Your Name" />
        </div>
        <div className="form-field">
          <label htmlFor="cf-email">Your Email</label>
          <input id="cf-email" type="email" required value={form.email} onChange={update('email')} placeholder="Your Email" />
        </div>
      </div>
      <div className="form-field">
        <label htmlFor="cf-subject">Subject</label>
        <input id="cf-subject" value={form.subject} onChange={update('subject')} placeholder="Project Collaboration / Opportunity" />
      </div>
      <div className="form-field">
        <label htmlFor="cf-message">Message</label>
        <textarea id="cf-message" required value={form.message} onChange={update('message')} placeholder="Tell me about your project or opportunity..." />
      </div>
      <button type="submit" className="btn btn-solid btn-full" disabled={sending}>
        Send by Owl
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 3l3 6 6 1-4.5 4.5L18 21l-6-3-6 3 1.5-6.5L3 10l6-1z"/></svg>
      </button>
      <p role="status" className="form-status">{status}</p>
    </form>
  );
}
