import { useEffect, useRef, useState } from 'react';

// Cinematic entry sequence:
// owl (flies in) -> landed (envelope settles) -> sealed (idle, waiting for
// the visitor) -> breaking (seal cracks) -> opening (flap swings open) ->
// unfolding (letter slides out & unfurls) -> writing (quill ink reveals the
// greeting) -> ready (Enter Hogwarts CTA) -> leaving (camera push transition).
//
// Every visual here is CSS/SVG only — a generic owl silhouette and a plain
// wax-sealed envelope, no franchise likenesses. Swap in real art later at
// the paths noted in REQUIRED_ASSETS.md (§2 Loading/Transition Assets)
// without touching this component's logic.
const GREETING = 'Your acceptance is waiting, Yash.';

const AUTO_STAGE_TIMING = [
  ['owl', 1300],
  ['landed', 550],
  ['sealed', 0], // waits for the visitor
];

export default function AcceptanceLetter({ onEnter }) {
  const [stage, setStage] = useState('owl');
  const [skipped, setSkipped] = useState(false);
  const timeouts = useRef([]);

  useEffect(() => {
    let elapsed = 0;
    AUTO_STAGE_TIMING.forEach(([name, delay], i) => {
      if (i === 0) return; // 'owl' is the initial state already
      elapsed += AUTO_STAGE_TIMING[i - 1][1];
      const t = setTimeout(() => setStage(name), elapsed);
      timeouts.current.push(t);
    });
    return () => timeouts.current.forEach(clearTimeout);
  }, []);

  function clearAllTimeouts() {
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];
  }

  function breakSeal() {
    if (stage !== 'sealed') return;
    clearAllTimeouts();
    setStage('breaking');
    schedule('opening', 480);
    schedule('unfolding', 480 + 620);
    schedule('writing', 480 + 620 + 620);
    schedule('ready', 480 + 620 + 620 + 1250);
  }

  function schedule(name, delay) {
    const t = setTimeout(() => setStage(name), delay);
    timeouts.current.push(t);
  }

  function leave() {
    if (stage !== 'ready') return;
    clearAllTimeouts();
    setStage('leaving');
    const t = setTimeout(onEnter, 780);
    timeouts.current.push(t);
  }

  function skipAll() {
    clearAllTimeouts();
    setSkipped(true);
    setStage('leaving');
    const t = setTimeout(onEnter, 300);
    timeouts.current.push(t);
  }

  function onKeyDown(e) {
    if (e.key !== 'Enter') return;
    if (stage === 'sealed') breakSeal();
    else if (stage === 'ready') leave();
  }

  const interactive = stage === 'sealed' || stage === 'ready';

  return (
    <div
      id="letter"
      className={`acceptance-letter stage-${stage} ${skipped ? 'skipped' : ''}`}
      onKeyDown={onKeyDown}
      role="dialog"
      aria-label="Acceptance sequence"
    >
      <div className="letter-stars" aria-hidden="true" />
      <div className="letter-fog" aria-hidden="true" />

      <button type="button" className="letter-skip" onClick={skipAll}>
        Skip
      </button>

      <div className="letter-scene">
        <svg className="letter-owl" viewBox="0 0 120 90" aria-hidden="true">
          <ellipse className="owl-wing owl-wing-l" cx="34" cy="40" rx="26" ry="14" />
          <ellipse className="owl-wing owl-wing-r" cx="86" cy="40" rx="26" ry="14" />
          <ellipse className="owl-body" cx="60" cy="46" rx="17" ry="22" />
          <circle className="owl-head" cx="60" cy="26" r="14" />
          <polygon className="owl-beak" points="60,30 56,36 64,36" />
        </svg>

        <div className="letter-envelope" aria-hidden={!interactive}>
          <div className="envelope-shadow" />
          <div className="envelope-body">
            <div className="envelope-flap" />
            <button
              type="button"
              className="wax-seal"
              onClick={breakSeal}
              disabled={stage !== 'sealed'}
              aria-label="Break the wax seal to open your letter"
            >
              <span>YN</span>
            </button>
          </div>

          <div className="letter-paper">
            <div className="letter-paper-inner">
              <p className="letter-quill-text">
                <span className="ink-reveal">{GREETING}</span>
              </p>
              <p className="letter-body-copy">
                Hogwarts School of Backend &amp; Machine Learning is delighted
                to confirm your place. A portfolio, and a path through it,
                awaits beyond these gates.
              </p>
              {stage === 'ready' && (
                <button type="button" className="btn btn-solid enter-btn" onClick={leave}>
                  Enter Hogwarts
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {stage === 'sealed' && (
        <p className="letter-hint" aria-hidden="true">Tap the seal to continue</p>
      )}
    </div>
  );
}
