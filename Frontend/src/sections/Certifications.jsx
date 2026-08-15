import { useReveal } from '../hooks/useReveal.js';
import { certifications } from '../data/portfolioData.js';
import { asset } from '../utils/asset.js';
import Owl from '../components/Owl.jsx';

export default function Certifications() {
  const [ref, visible] = useReveal();

  return (
    <section id="certifications" className="stage certifications-stage" style={{ '--bg-photo': `url(${asset('images/backgrounds/owl-newt-records-bg.jpg')})` }} ref={ref}>
      <div className="cert-archive-glow" aria-hidden="true" />
      <Owl delaySeconds={6} className="owl-cameo-low" />
      <div className={`container ${visible ? 'visible' : ''}`}>
        <div className="section-header">
          <div className="section-tag">// O.W.L. &amp; N.E.W.T. Records</div>
          <h2 className="section-title">Marks I've <span>Earned</span> <span className="plain-label">(Certifications)</span></h2>
        </div>

        <div className="cert-grid">
          {certifications.map((c) => (
            <div key={c.title} className="cert-card">
              <span className="cert-icon" aria-hidden="true">{c.icon}</span>
              <h3>{c.title}</h3>
              <span className="cert-issuer">{c.issuer}</span>
              <span className="cert-grade">O</span>
            </div>
          ))}
        </div>
        <p className="cert-note">"O" — Outstanding, in the Hogwarts grading scale.</p>
      </div>
    </section>
  );
}
