import { useReveal } from '../hooks/useReveal.js';
import { useVisible } from '../hooks/useVisible.js';
import { profile } from '../data/portfolioData.js';
import { asset } from '../utils/asset.js';

// Anchors point at existing sections already on the page — a "table of
// contents" for the record, not new content. No portfolioData changes.
const RECORD_INDEX = [
  { href: '#potions', icon: '🧪', label: 'Skills' },
  { href: '#restricted', icon: '🗂️', label: 'Projects' },
  { href: '#prophet', icon: '📰', label: 'Experience' },
  { href: '#education', icon: '🔭', label: 'Education' },
  { href: '#certifications', icon: '🎓', label: 'Certifications' },
];

export default function HeadmastersOffice({ onPreviewResume }) {
  const [ref, visible] = useReveal();
  const active = useVisible(ref);

  return (
    <section id="headmaster" className="stage headmaster-stage" style={{ '--bg-photo': `url(${asset('images/backgrounds/headmasters-office-bg.jpg')})` }} ref={ref}>
      <div className={`headmaster-instrument ${active ? 'is-active' : ''}`} aria-hidden="true">
        <svg viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="50" />
          <circle cx="60" cy="60" r="34" />
          <ellipse cx="60" cy="60" rx="50" ry="18" />
        </svg>
      </div>
      <div className={`headmaster-ember ${active ? 'is-active' : ''}`} aria-hidden="true" />
      <div className={`container ${visible ? 'visible' : ''}`}>
        <div className="section-header">
          <div className="section-tag">// Headmaster's Office</div>
          <h2 className="section-title">The Full <span>Record</span> <span className="plain-label">(Resume)</span></h2>
        </div>

        <div className="headmaster-card">
          <span className="headmaster-stamp" aria-hidden="true">🖋️</span>
          <div className="headmaster-layout">
            <div className="headmaster-main">
              <p>
                Every credential, role, and skill in this castle is kept on file here.
                Read it in full, or take a copy with you.
              </p>
              <div className="headmaster-btns">
                <a href={profile.resumePath} className="btn btn-solid" download>Download Resume</a>
                <button type="button" className="btn btn-ghost" onClick={onPreviewResume}>Preview Resume</button>
              </div>
            </div>

            <div className="headmaster-index">
              <span className="headmaster-index-label">The file contains</span>
              <nav aria-label="Jump to resume sections">
                {RECORD_INDEX.map((item) => (
                  <a key={item.href} href={item.href} className="headmaster-index-item">
                    <span aria-hidden="true">{item.icon}</span>
                    <span>{item.label}</span>
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
