import { useReveal } from '../hooks/useReveal.js';
import { profile } from '../data/portfolioData.js';
import { asset } from '../utils/asset.js';
import Clouds from '../components/Clouds.jsx';
import CastleSilhouette from '../components/CastleSilhouette.jsx';
import Owl from '../components/Owl.jsx';

export default function Gates({ onPreviewResume }) {
  const [ref, visible] = useReveal(0.1);

  return (
    <section id="gates" className="stage gates-stage" style={{ '--bg-photo': `url(${asset('images/backgrounds/hogwarts-gates-bg.jpg')})` }} ref={ref}>
      <div className="gates-arch" aria-hidden="true" />
      <Clouds />
      <CastleSilhouette speed={0.06} />
      <CastleSilhouette speed={0.11} className="castle-silhouette-near" />
      <Owl delaySeconds={4} />
      <Owl delaySeconds={13} className="owl-cameo-low" />
      <div className="house-watermark" aria-hidden="true" />
      <div className={`container gates-content ${visible ? 'visible' : ''}`}>
        <div className="availability-tag">
          <span className="pulse" />
          Available for Opportunities
        </div>
        <h1 className="gates-name">
          I'm <span className="name-highlight">{profile.name.split(' ')[0]}</span>
        </h1>
        <p className="gates-role">{profile.role}</p>
        <p className="gates-pitch">
          Full-stack AI applications, built end to end — from data pipeline to production API —
          now presented as a walk through Hogwarts itself.
        </p>
        <div className="gates-btns">
          <a href={profile.resumePath} className="btn btn-solid" download>Download Resume</a>
          <button type="button" className="btn btn-ghost btn-sm" onClick={onPreviewResume}>Preview Resume</button>
        </div>
        <a href="#restricted" className="gates-explore-link">
          Enter the Restricted Section <span aria-hidden="true">→</span>
        </a>
      </div>
      <a href="#great-hall" className="scroll-cue" aria-label="Scroll to continue">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M6 13l6 6 6-6"/></svg>
      </a>
    </section>
  );
}
