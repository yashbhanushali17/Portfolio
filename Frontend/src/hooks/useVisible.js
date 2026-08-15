import { useEffect, useState } from 'react';

// Continuously-toggling visibility, unlike useReveal (which fires once and
// unobserves — correct for one-shot entrance reveals, wrong for gating an
// always-on CSS loop). This mirrors the IntersectionObserver pattern
// already proven in useParallax's first effect: it never unobserves, so
// `visible` genuinely flips back to false once the element scrolls back
// out of range. Takes an existing ref (e.g. the one returned by useReveal)
// so callers don't need to attach a second ref to the same DOM node.
//
// Used to pause decorative infinite CSS animations (cauldron pulse,
// barrier shimmer, instrument spin) while their section is off-screen —
// Phase 9 fix: the previous `is-active` wiring reused useReveal's one-shot
// `visible`, so once a section had been seen once, its loop ran forever.
export function useVisible(ref, rootMargin = '200px 0px') {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, rootMargin]);

  return visible;
}
