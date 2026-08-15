import { useParallax } from '../hooks/useParallax.js';

// A generic gothic-castle skyline silhouette — flat towers, arches,
// crenellations. Not a likeness of any specific/copyrighted building,
// just the general silhouette language the whole site already uses
// (arches, stone, candlelight). Single flat SVG shape, no gradients-on
// -paths, cheap to paint; only `transform` ever animates (parallax drift).
export default function CastleSilhouette({ speed = 0.08, className = '' }) {
  const ref = useParallax(speed);
  return (
    <div ref={ref} className={`castle-silhouette ${className}`} aria-hidden="true">
      <svg viewBox="0 0 900 220" preserveAspectRatio="xMidYMax slice">
        <path d="M0 220 L0 150 L30 150 L30 120 L55 120 L55 150 L90 150 L90 90 L110 90 L110 60 L120 60 L120 90 L130 90 L130 150 L170 150 L170 110 L190 110 L190 80 L210 80 L210 110 L230 110 L230 150 L270 150 L270 130 L290 130 L290 150 L330 150 L330 40 L345 40 L345 20 L355 20 L355 40 L370 40 L370 150 L410 150 L410 100 L425 100 L425 70 L440 70 L440 100 L455 100 L455 150 L520 150 L520 110 L535 110 L535 80 L555 80 L555 110 L570 110 L570 150 L610 150 L610 130 L630 130 L630 150 L670 150 L670 60 L685 60 L685 30 L700 30 L700 60 L715 60 L715 150 L760 150 L760 100 L780 100 L780 70 L800 70 L800 100 L820 100 L820 150 L860 150 L860 120 L880 120 L880 150 L900 150 L900 220 Z" />
      </svg>
    </div>
  );
}
