import { useEffect, useState } from 'react';

// This is a spell, not a light/dark mode switch. Toggling it sets
// data-lumos on <html>; App.css uses that to react across the whole
// environment at once — candle glow radius, fog opacity, ambient
// brightness, particle density — rather than swapping two color
// palettes. See App.css "Lumos / Nox environment" block.
export default function LumosToggle() {
  const [lit, setLit] = useState(() => localStorage.getItem('hogwarts-lumos') === 'on');
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-lumos', lit ? 'on' : 'off');
    localStorage.setItem('hogwarts-lumos', lit ? 'on' : 'off');
  }, [lit]);

  function toggle() {
    setLit((v) => !v);
    setFlash(true);
    setTimeout(() => setFlash(false), 420);
  }

  return (
    <>
      <button
        type="button"
        className="lumos-toggle"
        onClick={toggle}
        aria-pressed={lit}
        aria-label={lit ? 'Cast Nox — dim the environment' : 'Cast Lumos — light the environment'}
        title={lit ? 'Nox' : 'Lumos'}
      >
        <span className="lumos-tip" aria-hidden="true" />
        <span className="lumos-label">{lit ? 'Nox' : 'Lumos'}</span>
      </button>
      {flash && <div className="lumos-flash" aria-hidden="true" />}
    </>
  );
}
