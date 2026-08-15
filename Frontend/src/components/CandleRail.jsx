import { useRef } from 'react';

// 'letter' (the AcceptanceLetter overlay) is deliberately excluded here:
// that section unmounts once `entered` is true (see App.jsx), and
// CandleRail only ever renders post-entry, so a candle for it would
// point at an anchor that no longer exists in the DOM.
const STAGES = [
  'gates', 'great-hall', 'library', 'education',
  'potions', 'certifications', 'restricted', 'prophet',
  'headmaster', 'spellbook', 'owlery', 'exit',
];

// A vertical rail of candles, one per journey stage. As the visitor
// passes a stage its candle lights. This replaces the generic top
// scrollbar with something that is specifically "walking a corridor".
export default function CandleRail({ activeId }) {
  const railRef = useRef(null);

  const activeIndex = Math.max(0, STAGES.indexOf(activeId));

  return (
    <nav className="candle-rail" aria-label="Journey progress" ref={railRef}>
      {STAGES.map((s, i) => (
        <a
          key={s}
          href={`#${s}`}
          className={`candle-node ${i <= activeIndex ? 'lit' : ''} ${s === activeId ? 'current' : ''}`}
          aria-current={s === activeId ? 'true' : undefined}
          aria-label={s.replace('-', ' ')}
        >
          <span className="candle-flame" aria-hidden="true" />
        </a>
      ))}
    </nav>
  );
}

export { STAGES };
