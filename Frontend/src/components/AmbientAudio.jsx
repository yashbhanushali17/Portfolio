import { asset } from '../utils/asset.js';

// Off by default (see MASTER_PLAN §7/§10 — music never blocks first paint,
// never autoplays). AudioToggle controls this element via #ambient-audio.
export default function AmbientAudio() {
  return (
    <audio id="ambient-audio" loop preload="none">
      <source src={asset('audio/HedwigsTheme.mp3')} type="audio/mpeg" />
    </audio>
  );
}
