import { useReveal } from '../hooks/useReveal.js';
import { profile } from '../data/portfolioData.js';
import { asset } from '../utils/asset.js';
import FloatingCandles from '../components/FloatingCandles.jsx';
import RoomTransition from '../components/RoomTransition.jsx';

const PATHS = [
  { href: '#library', title: 'The Library', sub: 'About', icon: '📚' },
  { href: '#potions', title: 'Potions Classroom', sub: 'Skills', icon: '⚗️' },
  { href: '#restricted', title: 'Restricted Section', sub: 'Projects', icon: '🔒' },
  { href: '#prophet', title: 'Daily Prophet', sub: 'Experience', icon: '📰' },
  { href: '#headmaster', title: "Headmaster's Office", sub: 'Resume', icon: '🖋️' },
  { href: '#owlery', title: 'Owlery', sub: 'Contact', icon: '🦉' },
];

const NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI'];

export default function GreatHall({ lastVisitedId }) {
  const [ref, visible] = useReveal();

  return (
    <section id="great-hall" className="stage great-hall-stage" style={{ '--bg-photo': `url(${asset('images/backgrounds/great-hall-bg.jpg')})` }} ref={ref}>
      <RoomTransition motif="doors" open={visible} />
      <div className="great-hall-sky" aria-hidden="true" />
      <FloatingCandles count={11} />
      <div className={`container ${visible ? 'visible' : ''}`}>
        <div className="section-header hall-header">
          <div className="section-tag">// The Great Hall</div>
          <h2 className="section-title">Choose Your <span>Path</span> <span className="plain-label">(Home)</span></h2>
          <p className="section-lede">
            Every corridor in this castle leads to a real piece of {profile.name.split(' ')[0]}'s work.
            Pick a door — or simply keep walking.
          </p>
          <div className="hall-divider" aria-hidden="true"><span /></div>
        </div>
        <div className="path-grid">
          {PATHS.map((p, i) => {
            // Lets the hub reflect where the visitor was last reading —
            // the connective tissue between the hub and the rest of the
            // castle when they scroll/jump back here mid-visit.
            const isLastVisited = lastVisitedId && p.href === `#${lastVisitedId}`;
            return (
              <a
                key={p.href}
                href={p.href}
                className={`path-card${isLastVisited ? ' last-visited' : ''}`}
              >
                <span className="path-num" aria-hidden="true">{NUMERALS[i]}</span>
                <span className="path-icon" aria-hidden="true">{p.icon}</span>
                <h3>{p.title}</h3>
                <span className="path-sub">{p.sub}</span>
                <span className="path-arrow" aria-hidden="true">→</span>
                {isLastVisited && <span className="path-visited-label">Continue here</span>}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
