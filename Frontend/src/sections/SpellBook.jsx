import { useReveal } from '../hooks/useReveal.js';
import { useVisible } from '../hooks/useVisible.js';
import { asset } from '../utils/asset.js';
import RoomTransition from '../components/RoomTransition.jsx';

export default function SpellBook({ onOpenChat }) {
  const [ref, visible] = useReveal();
  const active = useVisible(ref);

  return (
    <section id="spellbook" className="stage spellbook-stage" style={{ '--bg-photo': `url(${asset('images/backgrounds/spellbook-bg.jpg')})` }} ref={ref}>
      <RoomTransition motif="book" open={visible} />
      <div className={`spellbook-circle ${active ? 'is-active' : ''}`} aria-hidden="true">
        <svg viewBox="0 0 160 160">
          <circle cx="80" cy="80" r="70" />
          <circle cx="80" cy="80" r="52" />
          <circle cx="4" cy="80" r="2.4" />
          <circle cx="156" cy="80" r="2.4" />
          <circle cx="80" cy="4" r="2.4" />
          <circle cx="80" cy="156" r="2.4" />
        </svg>
      </div>
      <div className={`container ${visible ? 'visible' : ''}`}>
        <div className="section-header">
          <div className="section-tag">// The Spell Book</div>
          <h2 className="section-title">Ask the <span>Book</span> <span className="plain-label">(Chatbot)</span></h2>
          <p className="section-lede">
            An enchanted grimoire that answers questions about projects, skills, and experience —
            in real time, in its own words.
          </p>
        </div>
        <div className="spellbook-cta-wrap">
          <span className="availability-tag spellbook-tag">
            <span className="pulse" aria-hidden="true" />
            Answers instantly, any hour
          </span>
          <span className={`spellbook-btn-wrap ${active ? 'is-active' : ''}`}>
            <span className="spellbook-glow" aria-hidden="true" />
            <button type="button" className="btn btn-solid open-spellbook-btn" onClick={onOpenChat}>
              Open the Spell Book
            </button>
          </span>
        </div>
      </div>
    </section>
  );
}
