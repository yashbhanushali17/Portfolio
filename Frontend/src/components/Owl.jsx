import { useEffect, useRef, useState } from 'react';

// One owl silhouette definition, reused anywhere a section wants an
// occasional "something alive just crossed the sky" beat — Owlery, Great
// Hall ceiling, Gates. CSS keyframe only (transform), starts only once the
// section is actually in view, then loops on a long interval so it reads
// as a rare event rather than a treadmill. No canvas, no per-frame JS.
export default function Owl({ delaySeconds = 0, className = '' }) {
  const wrapRef = useRef(null);
  const [flying, setFlying] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setFlying(true); },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      className={`owl-cameo ${flying ? 'flying' : ''} ${className}`}
      style={{ animationDelay: `${delaySeconds}s` }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 120 90" className="owl-cameo-svg">
        <ellipse className="owl-wing owl-wing-l" cx="34" cy="40" rx="26" ry="14" />
        <ellipse className="owl-wing owl-wing-r" cx="86" cy="40" rx="26" ry="14" />
        <ellipse className="owl-body" cx="60" cy="46" rx="17" ry="22" />
        <circle className="owl-head" cx="60" cy="26" r="14" />
        <polygon className="owl-beak" points="60,30 56,36 64,36" />
      </svg>
    </div>
  );
}
