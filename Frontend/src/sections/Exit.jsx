import { useReveal } from '../hooks/useReveal.js';
import { profile } from '../data/portfolioData.js';

export default function Exit() {
  const [ref, visible] = useReveal(0.05);

  return (
    <footer id="exit" className={`stage exit-stage ${visible ? 'visible' : ''}`} ref={ref}>
      <div className="exit-gate" aria-hidden="true">
        <span className="exit-gate-panel left" />
        <span className="exit-gate-panel right" />
      </div>
      <div className={`container exit-content ${visible ? 'visible' : ''}`}>
        <p className="exit-farewell">Until next time.</p>
        <div className="exit-links">
          <a href="#gates">Back to the beginning ↑</a>
          <a href={profile.socials.github} target="_blank" rel="noopener">GitHub</a>
          <a href="#owlery">Contact</a>
        </div>
        <p className="exit-credit">Crafted by {profile.name} · ML Engineer · 2026</p>
      </div>
    </footer>
  );
}
