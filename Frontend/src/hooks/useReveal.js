import { useEffect, useRef, useState } from 'react';

// Lightweight scroll-reveal: no GSAP/ScrollTrigger cost for a simple
// class toggle — CSS transitions handle the actual animation so it stays
// on the compositor (transform/opacity only) and respects reduced motion
// via the global CSS rule in index.css.
export function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: '0px 0px -8% 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, visible];
}
