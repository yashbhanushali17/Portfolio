// Reusable cinematic "passing through a threshold" transition, shared by
// every section after Gates (which has its own dedicated Acceptance
// Letter cinematic and needs no incoming threshold).
//
// One mechanic — an atmospheric shadow + two panels + a light seam —
// re-skinned per room via the `motif` class and a set of CSS custom
// properties (see the "ROOM THRESHOLD" block in App.css). This is
// intentionally NOT a second observer or a second piece of visibility
// state: it rides the exact same one-shot `visible` boolean each section
// already computes via useReveal for its own content reveal, passed in
// as `open`. That keeps the whole thing collapsible to a single class
// toggle described entirely in CSS — closed state and open state are
// both static end-points of a transition, not something a stuck JS
// event listener has to resolve. If `open` never flips true for any
// reason, the veil just never lifts visually; the section's real content
// underneath still reveals normally (it's driven by the same `visible`
// value independently), so nothing can end up permanently invisible.
export default function RoomTransition({ motif = 'doors', open = false }) {
  return (
    <div className={`room-threshold rt-${motif}${open ? ' is-open' : ''}`} aria-hidden="true">
      <span className="rt-shadow" />
      <span className="rt-panel rt-panel-a" />
      <span className="rt-panel rt-panel-b" />
      <span className="rt-seam" />
      <span className="rt-glow" />
    </div>
  );
}
