import { useEffect, useState } from 'react';

const HOUSES = [
  { key: 'candlelight', label: 'Candlelight', a: '#d9a441', b: '#b8552e', crest: '🕯️' },
  { key: 'gryffindor', label: 'Gryffindor', a: '#c8443a', b: '#d3a625', crest: '🦁' },
  { key: 'slytherin', label: 'Slytherin', a: '#3f9e64', b: '#c7c7c7', crest: '🐍' },
  { key: 'ravenclaw', label: 'Ravenclaw', a: '#4c74c9', b: '#a9812f', crest: '🦅' },
  { key: 'hufflepuff', label: 'Hufflepuff', a: '#f0c419', b: '#2b2420', crest: '🦡' },
];

export default function HouseSwitcher() {
  const [open, setOpen] = useState(false);
  const [house, setHouse] = useState(() => localStorage.getItem('hogwarts-house') || 'candlelight');

  useEffect(() => {
    const h = HOUSES.find((x) => x.key === house) || HOUSES[0];
    document.documentElement.style.setProperty('--house-accent', h.a);
    document.documentElement.style.setProperty('--house-accent-2', h.b);
    document.documentElement.setAttribute('data-house', h.key);
    localStorage.setItem('hogwarts-house', house);
  }, [house]);

  const current = HOUSES.find((x) => x.key === house) || HOUSES[0];

  return (
    <div className="house-switcher">
      <button
        type="button"
        className="house-btn"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Choose a house theme"
        onClick={() => setOpen((o) => !o)}
      >
        <span aria-hidden="true">{current.crest}</span>
      </button>
      {open && (
        <ul className="house-menu" role="menu">
          {HOUSES.map((h) => (
            <li key={h.key} role="none">
              <button
                role="menuitem"
                className={`house-option ${house === h.key ? 'active' : ''}`}
                onClick={() => { setHouse(h.key); setOpen(false); }}
              >
                <span className="house-swatch" style={{ background: h.a }} aria-hidden="true" />
                {h.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
