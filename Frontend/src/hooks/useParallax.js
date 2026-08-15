import { useEffect, useRef, useState } from 'react';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Deliberately minimal: this hook only ever writes `transform` (compositor
// -friendly, no layout/paint thrash) and only while the element is actually
// intersecting the viewport (IntersectionObserver — no work for the eleven
// other sections offscreen). The scroll handler is rAF-throttled and
// passive. Fully a no-op under prefers-reduced-motion. Built to stay smooth
// even with hardware acceleration disabled, per MASTER_PLAN.md §7 — no
// filter/blur, no per-frame layout reads beyond one getBoundingClientRect.
//
// speed: 0 = fixed to page, 0.1–0.3 = distant/background depth,
// negative = drifts opposite to scroll (rarely needed).
export function useParallax(speed = 0.15) {
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  const ticking = useRef(false);
  const reduced = useRef(prefersReducedMotion());

  useEffect(() => {
    if (reduced.current) return undefined;
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), {
      rootMargin: '200px 0px',
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!active || reduced.current) return undefined;
    const el = ref.current;
    if (!el) return undefined;

    function apply() {
      const rect = el.getBoundingClientRect();
      const offset = (rect.top - window.innerHeight / 2) * speed;
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      ticking.current = false;
    }
    function onScroll() {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(apply);
    }

    apply();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [active, speed]);

  return ref;
}
