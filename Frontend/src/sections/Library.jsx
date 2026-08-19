import { useReveal } from '../hooks/useReveal.js';
import { bio, timeline, profile } from '../data/portfolioData.js';
import { asset } from '../utils/asset.js';
import RoomTransition from '../components/RoomTransition.jsx';

export default function Library() {
  const [ref, visible] = useReveal();

  return (
    <section id="library" className="stage library-stage" style={{ '--bg-photo': `url(${asset('images/backgrounds/library-bg.jpg')})` }} ref={ref}>
      <RoomTransition motif="parchment" open={visible} />
      <div className={`container ${visible ? 'visible' : ''}`}>
        <div className="section-header">
          <div className="section-tag">// The Library</div>
          <h2 className="section-title">Who I <span>Am</span> <span className="plain-label">(About Me)</span></h2>
        </div>

        <div className="about-grid">
          <div className="about-bio">
            {bio.map((p, i) => <p key={i}>{p}</p>)}

            <ol className="timeline">
              {timeline.map((t) => (
                <li key={t.year} className="tl-item">
                  <span className="tl-icon" aria-hidden="true">{t.icon}</span>
                  <div className="tl-content">
                    <div className="tl-year">{t.year}</div>
                    <h4>{t.title}</h4>
                    <p>{t.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <aside className="about-stats">
            {profile.stats.map((s) => (
              <div key={s.label} className="stat-card">
                <span className="num">{s.num}</span>
                <span className="lbl">{s.label}</span>
              </div>
            ))}
          </aside>
        </div>
      </div>
    </section>
  );
}
