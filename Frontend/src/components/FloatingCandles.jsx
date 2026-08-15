// The floating-candle-ceiling motif, generalized as a small capped cluster
// so it can sit behind any indoor section's header without weight. Each
// candle only ever animates `transform` (bob) and `opacity` (flicker) —
// no filter, no box-shadow blur beyond what CandleRail already proved
// cheap at this scale.
const COUNT = 7;

export default function FloatingCandles({ count = COUNT, className = '' }) {
  const candles = Array.from({ length: count }, (_, i) => i);
  return (
    <div className={`floating-candles ${className}`} aria-hidden="true">
      {candles.map((i) => (
        <span
          key={i}
          className="floating-candle"
          style={{
            left: `${8 + i * (84 / (count - 1))}%`,
            animationDelay: `${(i * 0.7).toFixed(1)}s, ${(i * 0.4).toFixed(1)}s`,
          }}
        />
      ))}
    </div>
  );
}
