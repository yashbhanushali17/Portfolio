// =============================================
//  YASH PORTFOLIO — script.js
// =============================================

// ── Shared perf helpers (mobile optimization) ──
function debounce(fn, wait = 150) {
  let t;
  return function (...args) {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}
const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 768;

// ── Theme System (dark / light + GOAT mode) ──
(function () {
  const THEME_KEY = 'portfolio-theme';
  const GOAT_KEY = 'portfolio-goat';
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resolve(pref) {
    return pref === 'auto' ? (media.matches ? 'dark' : 'light') : pref;
  }

  function applyTheme(pref) {
    const resolved = resolve(pref);
    document.documentElement.setAttribute('data-theme', resolved);
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.setAttribute('aria-checked', String(resolved === 'dark'));
    });
  }

  const goatIntro = document.getElementById('goatIntro');
  const goatPanel = document.getElementById('goatPanel');
  let introTimer = null;

  function playGoatIntro() {
    if (!goatIntro || reduceMotion) return;
    goatIntro.classList.add('show');
    document.body.classList.add('goat-intro-lock');
    clearTimeout(introTimer);
    introTimer = setTimeout(dismissIntro, 3400);
  }
  function dismissIntro() {
    clearTimeout(introTimer);
    if (goatIntro) goatIntro.classList.remove('show');
    document.body.classList.remove('goat-intro-lock');
  }

  const messiFab = document.getElementById('messiFab');
  const goatPanelBackdrop = document.getElementById('goatPanelBackdrop');

  function setPanelOpen(open) {
    if (goatPanel) goatPanel.classList.toggle('open', open);
    if (goatPanelBackdrop) goatPanelBackdrop.classList.toggle('open', open);
    document.body.classList.toggle('goat-panel-lock', open);
    if (messiFab) {
      messiFab.classList.toggle('panel-open', open);
      messiFab.setAttribute('aria-expanded', String(open));
    }
  }

  function applyGoat(on, { silent } = {}) {
    document.documentElement.classList.toggle('goat-mode', on);
    document.querySelectorAll('.goat-btn').forEach(btn => {
      btn.setAttribute('aria-checked', String(on));
    });
    // Toggling Messi Mode never opens/closes the achievements panel by itself,
    // except to force it shut when the mode is switched off.
    if (!on) setPanelOpen(false);
    if (on && !silent) playGoatIntro();
    if (!on) dismissIntro();
  }

  const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
  applyTheme(savedTheme);
  applyGoat(localStorage.getItem(GOAT_KEY) === 'on', { silent: true });

  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const now = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      localStorage.setItem(THEME_KEY, now);
      applyTheme(now);
    });
  });

  document.querySelectorAll('.goat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const now = !document.documentElement.classList.contains('goat-mode');
      localStorage.setItem(GOAT_KEY, now ? 'on' : 'off');
      applyGoat(now);
    });
  });

  document.getElementById('goatIntroSkip')?.addEventListener('click', dismissIntro);

  function closeGoat() {
    localStorage.setItem(GOAT_KEY, 'off');
    applyGoat(false);
  }
  document.getElementById('closeGoatPanel')?.addEventListener('click', closeGoat);

  // Floating LM10 tab — only this opens/closes the achievements panel.
  messiFab?.addEventListener('click', () => {
    if (!document.documentElement.classList.contains('goat-mode')) return;
    setPanelOpen(!goatPanel?.classList.contains('open'));
  });

  // ESC closes the panel (mode itself stays on)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && goatPanel?.classList.contains('open')) setPanelOpen(false);
  });

  // Click outside the panel closes it (ignore the toggle buttons and the floating tab)
  document.addEventListener('click', (e) => {
    if (!goatPanel || !goatPanel.classList.contains('open')) return;
    if (goatPanel.contains(e.target)) return;
    if (e.target.closest('.goat-btn') || e.target.closest('.messi-fab')) return;
    setPanelOpen(false);
  });

  // Swipe down closes the bottom sheet on mobile
  if (goatPanel) {
    let touchStartY = null;
    goatPanel.addEventListener('touchstart', (e) => {
      touchStartY = e.touches[0].clientY;
    }, { passive: true });
    goatPanel.addEventListener('touchmove', (e) => {
      if (touchStartY === null) return;
      const dy = e.touches[0].clientY - touchStartY;
      if (dy > 80) {
        touchStartY = null;
        setPanelOpen(false);
      }
    }, { passive: true });
    goatPanel.addEventListener('touchend', () => { touchStartY = null; });
  }

  media.addEventListener('change', () => {
    if ((localStorage.getItem(THEME_KEY) || 'dark') === 'auto') applyTheme('auto');
  });

  // ── Golden GOAT cursor (desktop only) ──
  const cDot = document.getElementById('goatCursorDot');
  const cRing = document.getElementById('goatCursorRing');
  if (cDot && cRing && matchMedia('(pointer: fine)').matches) {
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      cDot.style.left = mx + 'px'; cDot.style.top = my + 'px';
      document.documentElement.classList.add('goat-cursor-active');
    });
    (function loop() {
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      cRing.style.left = rx + 'px'; cRing.style.top = ry + 'px';
      requestAnimationFrame(loop);
    })();
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest('a, button, .glass-card, .proj-card, .skill-item, input, textarea')) {
        cRing.classList.add('hovering');
      }
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest('a, button, .glass-card, .proj-card, .skill-item, input, textarea')) {
        cRing.classList.remove('hovering');
      }
    });
  }

  // ── Logo × 10 clicks → confetti easter egg ──
  let logoClicks = 0, logoClickTimer = null;
  document.querySelectorAll('.nav-logo').forEach(logo => {
    logo.addEventListener('click', (e) => {
      logoClicks++;
      clearTimeout(logoClickTimer);
      logoClickTimer = setTimeout(() => { logoClicks = 0; }, 1500);
      if (logoClicks >= 10) {
        logoClicks = 0;
        e.preventDefault();
        fireGoatConfetti();
        if (!document.documentElement.classList.contains('goat-mode')) {
          localStorage.setItem(GOAT_KEY, 'on');
          applyGoat(true);
        }
      }
    });
  });

  function fireGoatConfetti() {
    if (reduceMotion) return;
    const colors = ['#F4C542', '#A50044', '#004D98', '#F8FAFC'];
    for (let i = 0; i < 60; i++) {
      const piece = document.createElement('span');
      const size = 6 + Math.random() * 6;
      piece.style.cssText = `
        position:fixed; top:-20px; left:${Math.random() * 100}vw;
        width:${size}px; height:${size * 0.4}px;
        background:${colors[Math.floor(Math.random() * colors.length)]};
        z-index:9998; pointer-events:none; border-radius:2px;
        transform:rotate(${Math.random() * 360}deg);
        transition: transform ${2 + Math.random() * 1.5}s cubic-bezier(0.4,0,0.6,1), top ${2 + Math.random() * 1.5}s cubic-bezier(0.4,0,0.6,1), opacity 0.4s ease ${1.6 + Math.random()}s;
      `;
      document.body.appendChild(piece);
      requestAnimationFrame(() => {
        piece.style.top = '110vh';
        piece.style.transform = `rotate(${360 + Math.random() * 720}deg) translateX(${(Math.random() - 0.5) * 200}px)`;
        piece.style.opacity = '0';
      });
      setTimeout(() => piece.remove(), 3600);
    }
  }
})();

// ── Ripple Effect (buttons, chips, tabs) ──────
function addRipple(e) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const span = document.createElement('span');
  span.className = 'ripple';
  span.style.width = span.style.height = size + 'px';
  span.style.left = (e.clientX - rect.left - size / 2) + 'px';
  span.style.top = (e.clientY - rect.top - size / 2) + 'px';
  el.appendChild(span);
  span.addEventListener('animationend', () => span.remove());
}
document.querySelectorAll('.btn, .chip, .filter-tab, .send-btn, .nav-cta, .switch-toggle').forEach(el => {
  el.addEventListener('click', addRipple);
});

// ── Hero showcase — subtle mouse parallax (desktop, GPU-friendly) ──
(function () {
  const showcase = document.getElementById('heroShowcase');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!showcase || reduceMotion || !matchMedia('(pointer: fine)').matches) return;

  let targetX = 0, targetY = 0, curX = 0, curY = 0, ticking = false;
  const MAX_OFFSET = 10; // px

  function onMove(e) {
    const rect = showcase.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    targetX = ((e.clientX - cx) / rect.width) * MAX_OFFSET;
    targetY = ((e.clientY - cy) / rect.height) * MAX_OFFSET;
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  function update() {
    curX += (targetX - curX) * 0.12;
    curY += (targetY - curY) * 0.12;
    showcase.style.setProperty('--px', curX.toFixed(2) + 'px');
    showcase.style.setProperty('--py', curY.toFixed(2) + 'px');
    if (Math.abs(targetX - curX) > 0.05 || Math.abs(targetY - curY) > 0.05) {
      requestAnimationFrame(update);
    } else {
      ticking = false;
    }
  }

  document.getElementById('home')?.addEventListener('mousemove', onMove, { passive: true });
  document.getElementById('home')?.addEventListener('mouseleave', () => {
    targetX = 0; targetY = 0;
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
})();

// ── LM10 panel — infinite horizontal carousel (auto-scroll, hover pause, drag/swipe) ──
(function () {
  const wrap = document.getElementById('goatCarousel');
  const track = document.getElementById('goatCarouselTrack');
  if (!wrap || !track) return;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let pos = 0;
  let half = 0;
  let paused = false;
  let dragging = false;
  let dragMoved = false;
  let startX = 0;
  let startPos = 0;

  function measure() {
    half = track.scrollWidth / 2;
  }
  measure();
  window.addEventListener('resize', debounce(measure, 150), { passive: true });

  function setTransform() {
    track.style.transform = `translate3d(${pos}px,0,0)`;
  }

  function frame() {
    if (!paused && !dragging && !reduceMotion && half > 0) {
      pos -= 0.55;
      if (pos <= -half) pos += half;
      setTransform();
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  wrap.addEventListener('mouseenter', () => { paused = true; });
  wrap.addEventListener('mouseleave', () => { paused = false; });

  function dragStart(x) {
    dragging = true;
    dragMoved = false;
    startX = x;
    startPos = pos;
    wrap.classList.add('dragging');
  }
  function dragMove(x) {
    if (!dragging || half <= 0) return;
    const dx = x - startX;
    if (Math.abs(dx) > 3) dragMoved = true;
    pos = startPos + dx;
    if (pos > 0) pos -= half;
    if (pos <= -half) pos += half;
    setTransform();
  }
  function dragEnd() {
    dragging = false;
    wrap.classList.remove('dragging');
  }

  wrap.addEventListener('pointerdown', (e) => dragStart(e.clientX));
  window.addEventListener('pointermove', (e) => dragMove(e.clientX), { passive: true });
  window.addEventListener('pointerup', dragEnd, { passive: true });
  wrap.addEventListener('touchstart', (e) => dragStart(e.touches[0].clientX), { passive: true });
  wrap.addEventListener('touchmove', (e) => dragMove(e.touches[0].clientX), { passive: true });
  wrap.addEventListener('touchend', dragEnd, { passive: true });

  // Prevent the drag gesture from also firing a click on the slide underneath
  wrap.addEventListener('click', (e) => {
    if (dragMoved) { e.preventDefault(); e.stopPropagation(); }
  }, true);
})();

// ── Card Tilt (project cards + profile card) ──
function initTilt(selector, intensity) {
  document.querySelectorAll(selector).forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transition = 'transform 0.1s ease-out';
      card.style.transform = `perspective(900px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.4s cubic-bezier(0.4,0,0.2,1)';
      card.style.transform = '';
    });
  });
}
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  initTilt('.proj-card', 5);
  initTilt('.profile-card', 4);
}

// ── Page Loader ───────────────────────────────
window.addEventListener('load', () => {
  const loader = document.getElementById('pageLoader');
  if (loader) {
    setTimeout(() => loader.classList.add('hidden'), 350);
  }
});

// ── Typed.js ──────────────────────────────────
new Typed('#typed-el', {
  strings: [
    'Building full-stack AI applications.',
    'Turning data into insight.',
    'Training models that learn.',
    'Shipping ML with FastAPI.'
  ],
  typeSpeed: 50,
  backSpeed: 30,
  loop: true,
  backDelay: 2200
});

// ── Scroll Progress Bar + Active Nav ───────────
const scrollBar = document.getElementById('scrollBar');
const header    = document.getElementById('header');
const backToTop = document.getElementById('backToTop');
const navLinks  = document.querySelectorAll('.nav-link');
const sections  = document.querySelectorAll('main section[id]');

let scrollTicking = false;
function updateScrollUI() {
  const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  scrollBar.style.width = scrolled + '%';
  header.classList.toggle('scrolled', window.scrollY > 50);
  if (backToTop) backToTop.classList.toggle('show', window.scrollY > 500);
  scrollTicking = false;
}
window.addEventListener('scroll', () => {
  if (!scrollTicking) {
    scrollTicking = true;
    requestAnimationFrame(updateScrollUI);
  }
}, { passive: true });

// Active nav highlighting via IntersectionObserver
if (sections.length && navLinks.length) {
  const navObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.dataset.nav === id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

  sections.forEach(sec => navObs.observe(sec));
}

// Back to top click
if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ── Scroll Reveal ─────────────────────────────
const revealEls = document.querySelectorAll('.reveal');

function animateCounters(container) {
  container.querySelectorAll('.s-num, .stat-card .num').forEach(el => {
    if (el.dataset.counted) return;
    el.dataset.counted = '1';
    const raw = el.textContent.trim();
    const match = raw.match(/^(\d+(?:\.\d+)?)(.*)$/);
    if (!match) return;
    const target = parseFloat(match[1]);
    const suffix = match[2];
    const isFloat = match[1].includes('.');
    const duration = 900;
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = target * eased;
      el.textContent = (isFloat ? val.toFixed(1) : Math.round(val)) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}

const revealObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.w;
      });
      animateCounters(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => revealObs.observe(el));
// Hero profile-card stats aren't inside a .reveal wrapper — animate on load
animateCounters(document.querySelector('.profile-card') || document);

// ── Interactive Dot Grid Canvas ───────────────
const canvas = document.getElementById('bg');
const ctx    = canvas.getContext('2d');

let W, H, dots = [];
let mxC = -9999, myC = -9999;
// Touch devices never trigger mousemove reactions — use a wider grid (fewer
// dots) and skip every other frame to cut canvas CPU/GPU cost on mobile.
const dotGap = isCoarsePointer ? 84 : 44;
const dotFrameSkip = isCoarsePointer ? 1 : 0;
let dotFrameCount = 0;

function resizeCanvas() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', debounce(() => { resizeCanvas(); buildDots(); }, 150), { passive: true });

function buildDots() {
  dots = [];
  for (let x = dotGap; x < W; x += dotGap) {
    for (let y = dotGap; y < H; y += dotGap) {
      dots.push({ x, y, ox: x, oy: y });
    }
  }
}
buildDots();

if (!isCoarsePointer) {
  document.addEventListener('mousemove', e => { mxC = e.clientX; myC = e.clientY; }, { passive: true });
}

(function drawDots() {
  if (dotFrameSkip) {
    dotFrameCount = (dotFrameCount + 1) % (dotFrameSkip + 1);
    if (dotFrameCount !== 0) {
      requestAnimationFrame(drawDots);
      return;
    }
  }
  ctx.clearRect(0, 0, W, H);

  if (isCoarsePointer) {
    // No pointer to react to on touch — draw the static grid as one batched path.
    ctx.fillStyle = 'rgba(255,255,255,0.055)';
    ctx.beginPath();
    dots.forEach(d => { ctx.moveTo(d.ox + 1, d.oy); ctx.arc(d.ox, d.oy, 1, 0, Math.PI * 2); });
    ctx.fill();
  } else {
    dots.forEach(d => {
      const dx   = mxC - d.x;
      const dy   = myC - d.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const r    = 160;

      if (dist < r) {
        const force = (1 - dist / r) * 14;
        d.x = d.ox - (dx / dist) * force;
        d.y = d.oy - (dy / dist) * force;
        ctx.fillStyle = `rgba(255,255,255,${0.1 + (1 - dist / r) * 0.25})`;
      } else {
        d.x += (d.ox - d.x) * 0.1;
        d.y += (d.oy - d.y) * 0.1;
        ctx.fillStyle = 'rgba(255,255,255,0.055)';
      }

      ctx.beginPath();
      ctx.arc(d.x, d.y, 1, 0, Math.PI * 2);
      ctx.fill();
    });
  }
  requestAnimationFrame(drawDots);
})();

// ── Project Card Mouse Glow ───────────────────
document.querySelectorAll('.proj-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
    card.style.setProperty('--my', (e.clientY - rect.top)  + 'px');
  });
});

// ── Project Filtering + Search ────────────────
const filterTabs   = document.querySelectorAll('.filter-tab');
const projectCards = document.querySelectorAll('.proj-card');
const searchInput  = document.getElementById('projectSearch');
const noResults    = document.getElementById('noResults');
let activeFilter = 'all';

function applyProjectFilters() {
  const query = (searchInput?.value || '').trim().toLowerCase();
  let visibleCount = 0;

  projectCards.forEach(card => {
    const category = card.dataset.category || '';
    const haystack  = (card.dataset.search || '') + ' ' + card.querySelector('h3').textContent.toLowerCase();
    const matchesFilter = activeFilter === 'all' || category === activeFilter;
    const matchesSearch = !query || haystack.toLowerCase().includes(query);
    const show = matchesFilter && matchesSearch;
    card.classList.toggle('filtered-out', !show);
    if (show) visibleCount++;
  });

  if (noResults) noResults.hidden = visibleCount !== 0;
}

filterTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    filterTabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    activeFilter = tab.dataset.filter;
    applyProjectFilters();
  });
});

if (searchInput) {
  searchInput.addEventListener('input', applyProjectFilters);
}

// ── Resume Preview Modal ──────────────────────
const resumeModal        = document.getElementById('resumeModal');
const previewResumeBtn    = document.getElementById('previewResumeBtn');
const closeResumeModalBtn = document.getElementById('closeResumeModal');
const resumeModalBackdrop = document.getElementById('resumeModalBackdrop');

function openResumeModal() {
  if (!resumeModal) return;
  resumeModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeResumeModal() {
  if (!resumeModal) return;
  resumeModal.classList.remove('open');
  document.body.style.overflow = '';
}
if (previewResumeBtn) previewResumeBtn.addEventListener('click', openResumeModal);
if (closeResumeModalBtn) closeResumeModalBtn.addEventListener('click', closeResumeModal);
if (resumeModalBackdrop) resumeModalBackdrop.addEventListener('click', closeResumeModal);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && resumeModal?.classList.contains('open')) closeResumeModal();
});

// ── Mobile Nav (cached DOM refs — avoid repeated lookups) ────
const mobileNavEl = document.getElementById('mobileNav');
const hamburgerEl = document.getElementById('hamburger');
const mobileNavBackdropEl = document.getElementById('mobileNavBackdrop');

function toggleMenu() {
  const isOpen = mobileNavEl.classList.toggle('open');
  hamburgerEl.classList.toggle('open');
  hamburgerEl.setAttribute('aria-expanded', String(isOpen));
  mobileNavBackdropEl?.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

function closeMobileNav() {
  mobileNavEl.classList.remove('open');
  hamburgerEl.classList.remove('open');
  hamburgerEl.setAttribute('aria-expanded', 'false');
  mobileNavBackdropEl?.classList.remove('open');
  document.body.style.overflow = '';
}

// ── Contact Form ──────────────────────────────
const contactForm = document.getElementById('contactForm');
const statusMsg   = document.getElementById('statusMsg');

if (contactForm && statusMsg) {
  contactForm.addEventListener('submit', async e => {
    e.preventDefault();

    const data = {
      name:    contactForm.elements['name'].value,
      email:   contactForm.elements['email'].value,
      subject: contactForm.elements['subject'].value,
      message: contactForm.elements['message'].value
    };

    statusMsg.textContent = 'Sending...';

    try {
      const res = await fetch("https://portfolio-production-dd4e.up.railway.app/contact", {
        method:  'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept':       'application/json'
        },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        statusMsg.textContent = '✓ Message sent successfully!';
        contactForm.reset();
      } else {
        statusMsg.textContent = '✗ Error sending. Please try again.';
      }
    } catch (err) {
      statusMsg.textContent = '✗ Network error. Please try again.';
      console.error(err);
    }
  });
}

// =============================================
//  AI CHATBOT
// =============================================

const WORKER_URL = 'https://round-paper-417b.yashbhanushali1710.workers.dev/';



// DOM
const chatbotToggle   = document.getElementById('chatbot-toggle');
const chatbotWidget   = document.getElementById('chatbot-widget');
const closeBtn        = document.getElementById('close-chatbot');
const minimizeBtn      = document.getElementById('minimize-chatbot');
const chatInput       = document.getElementById('chat-input');
const sendBtn         = document.getElementById('send-btn');
const chatMessages    = document.getElementById('chat-messages');
const typingIndicator = document.getElementById('typing-indicator');

// Toggle open/close
chatbotToggle.addEventListener('click', () => {
  const isOpen = chatbotWidget.classList.toggle('open');
  chatbotToggle.classList.toggle('active', isOpen);
  // Hide notification dot on first open
  const notif = chatbotToggle.querySelector('.fab-notif');
  if (notif) notif.style.display = 'none';
  if (isOpen) {
    chatbotWidget.classList.remove('minimized');
    setTimeout(() => chatInput.focus(), 380);
  }
});

closeBtn.addEventListener('click', () => {
  chatbotWidget.classList.remove('open');
  chatbotToggle.classList.remove('active');
});

if (minimizeBtn) {
  minimizeBtn.addEventListener('click', () => {
    const nowMinimized = chatbotWidget.classList.toggle('minimized');
    minimizeBtn.textContent = nowMinimized ? '▢' : '–';
    minimizeBtn.setAttribute('aria-label', nowMinimized ? 'Maximize chat' : 'Minimize chat');
  });
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && chatbotWidget.classList.contains('open')) {
    chatbotWidget.classList.remove('open');
    chatbotToggle.classList.remove('active');
  }
});

// Suggestion chips
document.querySelectorAll('.chip').forEach(chip => {
  chip.addEventListener('click', () => {
    const chipText = chip.textContent.replace(/[^\w\s?]/g, '').trim();
    chatInput.value = chipText;
    chatInput.focus();
    sendMessage();
  });
});

// Time helper
function getTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// ── Lightweight Markdown Renderer ──────────────
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function renderMarkdown(raw) {
  let text = escapeHtml(raw);

  // Fenced code blocks ```lang\ncode```
  const codeBlocks = [];
  text = text.replace(/```(\w*)\n?([\s\S]*?)```/g, (m, lang, code) => {
    codeBlocks.push({ lang: lang || 'text', code: code.replace(/\n$/, '') });
    return `\u0000CODEBLOCK${codeBlocks.length - 1}\u0000`;
  });

  // Inline code
  text = text.replace(/`([^`]+)`/g, '<code class="md-inline-code">$1</code>');
  // Bold / italic
  text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  // Links
  text = text.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

  // Unordered lists
  text = text.replace(/(?:^|\n)((?:[-*] .+(?:\n|$))+)/g, block => {
    const items = block.trim().split('\n').map(l => `<li>${l.replace(/^[-*]\s+/, '')}</li>`).join('');
    return `<ul class="md-list">${items}</ul>`;
  });

  // Remaining newlines become line breaks (skip inside lists/code placeholders)
  text = text.split(/\n/).map(line => line).join('<br>')
    .replace(/<br>(<ul)/g, '$1')
    .replace(/(<\/ul>)<br>/g, '$1');

  // Restore code blocks
  text = text.replace(/\u0000CODEBLOCK(\d+)\u0000/g, (m, i) => {
    const { lang, code } = codeBlocks[i];
    return `<div class="md-code-block"><div class="md-code-head"><span>${lang}</span><button class="md-copy-btn" type="button">Copy</button></div><pre><code>${code}</code></pre></div>`;
  });

  return text;
}

function stripMarkdown(md) {
  return md
    .replace(/```(\w*)\n?([\s\S]*?)```/g, (m, lang, code) => code.replace(/\n$/, ''))
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1');
}

// Copy-code button (event delegation)
chatMessages.addEventListener('click', e => {
  const btn = e.target.closest('.md-copy-btn');
  if (!btn) return;
  const codeEl = btn.closest('.md-code-block')?.querySelector('code');
  if (!codeEl) return;
  navigator.clipboard.writeText(codeEl.textContent).then(() => {
    const original = btn.textContent;
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(() => { btn.textContent = original; btn.classList.remove('copied'); }, 1500);
  }).catch(() => {});
});

function createAvatar(sender) {
  const av = document.createElement('div');
  av.className = `msg-avatar ${sender}-avatar`;
  av.setAttribute('aria-hidden', 'true');
  av.innerHTML = sender === 'bot'
    ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="7" width="16" height="11" rx="3"/><circle cx="9" cy="12.5" r="1.6" fill="var(--bg-2)"/><circle cx="15" cy="12.5" r="1.6" fill="var(--bg-2)"/><rect x="10.2" y="2" width="1.6" height="4" rx="0.8"/></svg>'
    : '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6"/></svg>';
  return av;
}

// Add a message bubble. opts.stream => typewriter reveal for bot messages.
function addChatMessage(text, sender, opts = {}) {
  const { stream = false } = opts;

  const wrap = document.createElement('div');
  wrap.className = `chat-message ${sender}-msg`;

  const row = document.createElement('div');
  row.className = 'msg-row';
  row.appendChild(createAvatar(sender));

  const bubble = document.createElement('div');
  bubble.className = 'msg-bubble';

  const contentEl = document.createElement(sender === 'bot' ? 'div' : 'p');
  contentEl.className = 'msg-text';
  bubble.appendChild(contentEl);

  const time = document.createElement('span');
  time.className = 'msg-time';
  time.textContent = getTime();
  bubble.appendChild(time);

  row.appendChild(bubble);
  wrap.appendChild(row);
  chatMessages.insertBefore(wrap, typingIndicator);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  if (sender === 'user') {
    contentEl.textContent = text;
    return wrap;
  }

  if (!stream) {
    contentEl.innerHTML = renderMarkdown(text);
    return wrap;
  }

  // Streaming typewriter reveal, then swap in full markdown formatting
  const plain = stripMarkdown(text);
  let i = 0;
  const revealChunk = Math.max(1, Math.round(plain.length / 90));
  (function step() {
    i += revealChunk;
    contentEl.textContent = plain.slice(0, i);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    if (i < plain.length) {
      setTimeout(step, 14);
    } else {
      contentEl.innerHTML = renderMarkdown(text);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  })();

  return wrap;
}

// Main send function
async function sendMessage() {
  const message = chatInput.value.trim();
  if (!message) return;

  addChatMessage(message, 'user');
  chatInput.value = '';
  chatInput.style.height = 'auto';

  // Show typing
  typingIndicator.classList.add('show');
  sendBtn.disabled = true;
  sendBtn.classList.add('loading');
  chatMessages.scrollTop = chatMessages.scrollHeight;

  try {
    const res = await fetch(WORKER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });

    const data = await res.json();
    typingIndicator.classList.remove('show');

    if (data.success) {
      addChatMessage(data.message, 'bot', { stream: true });
    } else {
      addChatMessage('❌ ' + (data.error || 'Something went wrong. Please try again.'), 'bot');
    }
  } catch (err) {
    typingIndicator.classList.remove('show');
    addChatMessage('❌ Network error. Please check your connection and try again.', 'bot');
    console.error('Chat error:', err);
  } finally {
    sendBtn.disabled = false;
    sendBtn.classList.remove('loading');
    chatInput.focus();
  }
}

// Send on button click
sendBtn.addEventListener('click', sendMessage);

// Send on Enter (not Shift+Enter)
chatInput.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

// Auto-grow textarea
chatInput.addEventListener('input', () => {
  chatInput.style.height = 'auto';
  chatInput.style.height = Math.min(chatInput.scrollHeight, 80) + 'px';
});