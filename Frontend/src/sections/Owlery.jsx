import { useReveal } from '../hooks/useReveal.js';
import { profile } from '../data/portfolioData.js';
import { asset } from '../utils/asset.js';
import ContactForm from '../components/ContactForm.jsx';
import RoomTransition from '../components/RoomTransition.jsx';
import Clouds from '../components/Clouds.jsx';
import CastleSilhouette from '../components/CastleSilhouette.jsx';
import Owl from '../components/Owl.jsx';

const SOCIALS = [
  { href: profile.socials.github, label: 'GitHub', sub: '@yashbhanushali17', icon: '🦉' },
  { href: profile.socials.linkedin, label: 'LinkedIn', sub: 'Connect professionally', icon: '🕊️' },
  { href: profile.socials.whatsapp, label: 'WhatsApp', sub: '+91 77790 88071', icon: '📨' },
  { href: profile.socials.email, label: 'Email', sub: 'yashbhanushali1710@gmail.com', icon: '✉️', primary: true },
];

export default function Owlery() {
  const [ref, visible] = useReveal();

  return (
    <section id="owlery" className="stage owlery-stage" style={{ '--bg-photo': `url(${asset('images/backgrounds/owlery-bg.jpg')})` }} ref={ref}>
      <RoomTransition motif="moonlit" open={visible} />
      <Clouds />
      <CastleSilhouette speed={0.05} className="castle-silhouette-far" />
      <Owl delaySeconds={0} />
      <Owl delaySeconds={9} className="owl-cameo-low" />
      <div className={`container ${visible ? 'visible' : ''}`}>
        <div className="section-header">
          <div className="section-tag">// The Owlery</div>
          <h2 className="section-title">Let's <span>Connect</span> <span className="plain-label">(Contact)</span></h2>
        </div>

        <div className="owlery-wrap">
          <div className="owlery-info">
            <div className="availability-tag owlery-availability">
              <span className="pulse" />
              Available for Opportunities
            </div>
            <p>
              I'm actively looking for ML engineering opportunities, internships, and collaborations.
              Send an owl any time — my window is always open.
            </p>
            <div className="owlery-socials">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener"
                  className={`owl-social ${s.primary ? 'owl-social-primary' : ''}`}
                >
                  <span className="owl-icon" aria-hidden="true">{s.icon}</span>
                  <span className="owl-text">
                    <span className="owl-label">{s.label}</span>
                    <span className="owl-sub">{s.sub}</span>
                  </span>
                  <span className="owl-arrow">→</span>
                </a>
              ))}
            </div>
          </div>

          <div className="owlery-form-wrap">
            <div className="owlery-form-head">
              <h3>Send a Letter</h3>
              <p className="owlery-form-sub">I read every owl personally — expect a reply within a day or two.</p>
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
