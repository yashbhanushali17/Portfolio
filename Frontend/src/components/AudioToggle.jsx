import { useEffect, useRef, useState } from 'react';

// Off by default, per MASTER_PLAN §7/§10 (music never blocks first paint,
// never autoplays). The <audio> element itself lives in AmbientAudio.jsx,
// sourced from public/audio/HedwigsTheme.mp3 — this component just
// controls play/pause via #ambient-audio.
export default function AudioToggle() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    audioRef.current = document.getElementById('ambient-audio');
  }, []);

  const toggle = async () => {
    const el = audioRef.current;
    if (!el) return;
    try {
      if (playing) {
        el.pause();
        setPlaying(false);
      } else {
        await el.play();
        setPlaying(true);
      }
    } catch (err) {
      // No track present, or browser blocked playback — fail quietly,
      // disable the control rather than throwing errors at the visitor.
      setAvailable(false);
    }
  };

  return (
    <button
      type="button"
      className="audio-toggle"
      onClick={toggle}
      aria-pressed={playing}
      aria-label={playing ? 'Pause ambient music' : 'Play ambient music'}
      title={available ? undefined : 'Music playback unavailable in this browser'}
    >
      <span className="audio-icon" aria-hidden="true">
        {playing ? (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
        ) : (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4l13 8-13 8V4z"/></svg>
        )}
      </span>
      <span className="audio-label">{playing ? 'Music on' : 'Music off'}</span>
    </button>
  );
}
