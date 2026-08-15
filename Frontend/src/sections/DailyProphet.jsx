import { useReveal } from '../hooks/useReveal.js';
import { experience } from '../data/portfolioData.js';
import { asset } from '../utils/asset.js';

export default function DailyProphet() {
  const [ref, visible] = useReveal();

  return (
    <section id="prophet" className="stage prophet-stage" style={{ '--bg-photo': `url(${asset('images/backgrounds/daily-prophet-bg.jpg')})` }} ref={ref}>
      <div className={`container ${visible ? 'visible' : ''}`}>
        <div className="section-header">
          <div className="section-tag">// The Daily Prophet</div>
          <h2 className="section-title">Where I've <span>Worked</span> <span className="plain-label">(Experience)</span></h2>
        </div>

        <div className="prophet-columns">
          {experience.map((e, i) => (
            <article key={e.role} className={`prophet-card ${e.current ? 'is-current' : ''}`}>
              <div className="prophet-card-top">
                <div>
                  <div className="prophet-eyebrow">
                    <span className="prophet-index">No. {String(i + 1).padStart(2, '0')}</span>
                    <span className={`exp-badge ${e.current ? 'current' : ''}`}>{e.badge}</span>
                  </div>
                  <h3>{e.role}</h3>
                  <div className="exp-company">{e.company}</div>
                </div>
                <div className="exp-dates">{e.dates}</div>
              </div>
              <ul className="exp-points">
                {e.points.map((pt, j) => <li key={j}>{pt}</li>)}
              </ul>
              {e.trust.length > 0 && (
                <div className="exp-trust-wrap">
                  <span className="exp-trust-label">Verified credentials</span>
                  <div className="exp-trust">
                    {e.trust.map((t) => <span key={t} className="trust-badge">✔ {t}</span>)}
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
