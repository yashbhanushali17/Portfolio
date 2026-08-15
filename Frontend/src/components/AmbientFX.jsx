import { useEffect, useMemo, useState } from 'react';

// One global, capped particle layer for the whole journey — not a
// per-section canvas system. Pure CSS transforms/opacity (no per-frame
// JS), pauses when the tab is hidden, and reacts to both the house
// accent and the Lumos/Nox state via CSS custom properties rather than
// re-rendering. See App.css "Ambient FX" block for the tuning knobs.
const MOTE_COUNT = 16;

function makeMotes() {
  return Array.from({ length: MOTE_COUNT }, (_, i) => ({
    id: i,
    left: Math.round(Math.random() * 100),
    delay: (Math.random() * 12).toFixed(2),
    duration: (14 + Math.random() * 10).toFixed(2),
    size: (2 + Math.random() * 2.5).toFixed(1),
  }));
}

export default function AmbientFX() {
  const motes = useMemo(makeMotes, []);
  const [paused, setPaused] = useState(document.hidden);

  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  return (
    <div className={`ambient-fx ${paused ? 'paused' : ''}`} aria-hidden="true">
      <div className="ambient-rays" />
      <div className="ambient-motes">
        {motes.map((m) => (
          <span
            key={m.id}
            className="mote"
            style={{
              left: `${m.left}%`,
              width: `${m.size}px`,
              height: `${m.size}px`,
              animationDelay: `${m.delay}s`,
              animationDuration: `${m.duration}s`,
            }}
          />
        ))}
      </div>
      <div className="ambient-fog-layer" />
    </div>
  );
}
