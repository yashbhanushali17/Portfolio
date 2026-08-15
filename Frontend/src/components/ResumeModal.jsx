import { useEffect } from 'react';
import { profile } from '../data/portfolioData.js';

export default function ResumeModal({ open, onClose }) {
  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape' && open) onClose(); }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <div className={`resume-modal ${open ? 'open' : ''}`} role="dialog" aria-modal="true" aria-label="Resume preview" aria-hidden={!open}>
      <div className="resume-modal-backdrop" onClick={onClose} />
      <div className="resume-modal-card">
        <div className="resume-modal-header">
          <h3>Headmaster's Records</h3>
          <div className="resume-modal-actions">
            <a href={profile.resumePath} className="btn btn-solid btn-sm" download>Download</a>
            <button className="close-btn" onClick={onClose} aria-label="Close preview">✕</button>
          </div>
        </div>
        <div className="resume-modal-body">
          {open && <iframe src={profile.resumePath} title={`${profile.name} Resume`} loading="lazy" />}
        </div>
      </div>
    </div>
  );
}
