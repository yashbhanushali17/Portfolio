// Distant-sky depth for hero-weight sections. Deliberately no filter:blur()
// — soft edges come from the radial-gradient's own fade-to-transparent
// stops, so there's zero per-frame raster cost even with GPU compositing
// disabled. Three blobs, transform-only drift, capped and cheap.
export default function Clouds({ className = '' }) {
  return (
    <div className={`sky-clouds ${className}`} aria-hidden="true">
      <span className="cloud cloud-1" />
      <span className="cloud cloud-2" />
      <span className="cloud cloud-3" />
    </div>
  );
}
