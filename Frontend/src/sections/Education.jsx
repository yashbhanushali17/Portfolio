import { useReveal } from '../hooks/useReveal.js';
import { education } from '../data/portfolioData.js';
import { asset } from '../utils/asset.js';
import RoomTransition from '../components/RoomTransition.jsx';

export default function Education() {
  const [ref, visible] = useReveal();

  return (
    <section id="education" className="stage education-stage" style={{ '--bg-photo': `url(${asset('images/backgrounds/ravenclaw-tower-bg.jpg')})` }} ref={ref}>
      <RoomTransition motif="ink" open={visible} />
      <div className="education-stars" aria-hidden="true" />
      <div className="education-moon" aria-hidden="true" />
      <div className={`container ${visible ? 'visible' : ''}`}>
        <div className="section-header">
          <div className="section-tag">// Astronomy Tower</div>
          <h2 className="section-title">Years of <span>Study</span> <span className="plain-label">(Education)</span></h2>
        </div>

        <ol className="scroll-list">
          {education.map((e, i) => (
            <li key={e.school} className={`scroll-item ${e.status}`}>
              <span className="scroll-icon" aria-hidden="true">🦅</span>
              <div className="scroll-body">
                <div className="scroll-top">
                  <span className="scroll-rec">REC. {String(i + 1).padStart(2, '0')}</span>
                  <h3>{e.school}</h3>
                  <span className={`status-pill ${e.status}`}>
                    {e.status === 'complete' ? 'Completed' : e.status === 'upcoming' ? 'Upcoming' : 'In Progress'}
                  </span>
                </div>
                <p className="scroll-degree">{e.degree}</p>
                <p className="scroll-period">{e.period}{e.note ? ` · ${e.note}` : ''}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
