import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './App.css';

import Header from './components/Header.jsx';
import CandleRail, { STAGES } from './components/CandleRail.jsx';
import ChatbotWidget from './components/ChatbotWidget.jsx';
import ResumeModal from './components/ResumeModal.jsx';
import AmbientAudio from './components/AmbientAudio.jsx';
import AmbientFX from './components/AmbientFX.jsx';

import AcceptanceLetter from './sections/AcceptanceLetter.jsx';
import Gates from './sections/Gates.jsx';
import GreatHall from './sections/GreatHall.jsx';
import Library from './sections/Library.jsx';
import Education from './sections/Education.jsx';
import Potions from './sections/Potions.jsx';
import Certifications from './sections/Certifications.jsx';
import RestrictedSection from './sections/RestrictedSection.jsx';
import DailyProphet from './sections/DailyProphet.jsx';
import HeadmastersOffice from './sections/HeadmastersOffice.jsx';
import SpellBook from './sections/SpellBook.jsx';
import Owlery from './sections/Owlery.jsx';
import Exit from './sections/Exit.jsx';

import { useReducedMotion } from './hooks/useReducedMotion.js';

export default function App() {
  const [entered, setEntered] = useState(false);
  const [activeId, setActiveId] = useState('gates');
  // Tracks the last real content section visited (excludes 'gates' and
  // 'great-hall' itself), separately from activeId — activeId flips back
  // to 'great-hall' the instant the visitor scrolls back to the hub, so
  // it can't be used to show "where you left off" there; this can.
  const [lastVisitedId, setLastVisitedId] = useState(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const mainRef = useRef(null);
  const reducedMotion = useReducedMotion();

  // Skip the letter overlay entirely for reduced-motion visitors —
  // no forced waiting on an animation they've asked to avoid.
  useEffect(() => {
    if (reducedMotion) setEntered(true);
  }, [reducedMotion]);

  function handleEnter() {
    setEntered(true);
    if (!reducedMotion) {
      gsap.fromTo(
        '#main-content',
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
          // GSAP's `y` writes an inline transform even at y:0 (e.g.
          // matrix(1,0,0,1,0,0)), and ANY non-"none" transform on this
          // element — which wraps the entire site — turns it into the
          // containing block for every position:fixed descendant (header,
          // nav drawer, candle rail, modals). clearProps removes the
          // inline transform once the entrance is done so fixed elements
          // stay correctly anchored to the real viewport.
          clearProps: 'transform',
        }
      );
    }
  }

  // Track which stage is active for the candle rail + header state
  useEffect(() => {
    if (!entered) return;
    const sections = STAGES
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            if (entry.target.id !== 'gates' && entry.target.id !== 'great-hall') {
              setLastVisitedId(entry.target.id);
            }
          }
        });
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [entered]);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <AmbientAudio />
      <AmbientFX />

      {!entered && <AcceptanceLetter onEnter={handleEnter} />}

      <div id="main-content" className={`main-journey ${entered ? 'visible' : ''}`} ref={mainRef} aria-hidden={!entered}>
        <Header activeId={activeId} />
        <CandleRail activeId={activeId} />

        <main>
          <Gates onPreviewResume={() => setResumeOpen(true)} />
          <GreatHall lastVisitedId={lastVisitedId} />
          <Library />
          <Education />
          <Potions />
          <Certifications />
          <RestrictedSection />
          <DailyProphet />
          <HeadmastersOffice onPreviewResume={() => setResumeOpen(true)} />
          <SpellBook onOpenChat={() => document.querySelector('.chatbot-fab')?.click()} />
          <Owlery />
        </main>

        <Exit />

        <ChatbotWidget />
        <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
      </div>
    </>
  );
}
