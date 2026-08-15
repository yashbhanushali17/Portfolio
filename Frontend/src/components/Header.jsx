import { useEffect, useState } from 'react';
import HouseSwitcher from './HouseSwitcher.jsx';
import AudioToggle from './AudioToggle.jsx';
import LumosToggle from './LumosToggle.jsx';

const NAV = [
  { href: '#great-hall', world: 'Great Hall', plain: 'Home' },
  { href: '#library', world: 'Library', plain: 'About' },
  { href: '#potions', world: 'Potions', plain: 'Skills' },
  { href: '#restricted', world: 'Restricted Section', plain: 'Projects' },
  { href: '#prophet', world: 'Daily Prophet', plain: 'Experience' },
  { href: '#headmaster', world: "Headmaster's Office", plain: 'Resume' },
  { href: '#owlery', world: 'Owlery', plain: 'Contact' },
];

export default function Header({ activeId }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Cheap "left the entrance" cue: IntersectionObserver on the hero
  // rather than a scroll listener, so there's zero per-frame JS cost —
  // it only fires the two times the hero crosses the header's edge.
  useEffect(() => {
    const gates = document.getElementById('gates');
    if (!gates) return undefined;
    const obs = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0, rootMargin: '-72px 0px 0px 0px' }
    );
    obs.observe(gates);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <a href="#gates" className="brand" aria-label="Back to the beginning">
          <span className="brand-seal" aria-hidden="true">✒️</span>
          <span className="brand-text">Yash<span className="brand-dot">.</span>Nanda</span>
        </a>

        <nav className="primary-nav" aria-label="Primary">
          <ul>
            {NAV.map((item) => {
              const isActive = item.href === `#${activeId}`;
              return (
                <li key={item.href}>
                  <a href={item.href} className={isActive ? 'active' : ''} aria-current={isActive ? 'true' : undefined}>
                    <span className="nav-world">{item.world}</span>
                    <span className="nav-plain">{item.plain}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="header-controls">
          <LumosToggle />
          <AudioToggle />
          <HouseSwitcher />
          <button
            type="button"
            className="hamburger"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* Fixed, exactly-viewport-sized, overflow-hidden clip box. The
          drawer inside is position:absolute (not fixed) specifically so
          this ancestor's overflow:hidden reliably clips it while closed —
          a position:fixed child's translated-offscreen box can still
          inflate document.documentElement.scrollWidth in some engines even
          though nothing is visible, which briefly caused real horizontal
          overflow on mobile. This wrapper sidesteps that entirely. */}
      <div className="mobile-nav-clip" aria-hidden={!open}>
        {open && <div className="mobile-nav-backdrop" onClick={() => setOpen(false)} />}
        <div id="mobile-nav" className={`mobile-nav ${open ? 'open' : ''}`} role="dialog" aria-label="Mobile navigation">
          {NAV.map((item) => {
            const isActive = item.href === `#${activeId}`;
            return (
              <a
                key={item.href}
                href={item.href}
                className={isActive ? 'active' : ''}
                aria-current={isActive ? 'true' : undefined}
                onClick={() => setOpen(false)}
              >
                <span className="nav-world">{item.world}</span>
                <span className="nav-plain">{item.plain}</span>
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
}
