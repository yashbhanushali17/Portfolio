// =============================================
//  YASH PORTFOLIO — script.js
// =============================================

// ── Typed.js ──────────────────────────────────
new Typed('#typed-el', {
  strings: [
    'Building intelligent systems.',
    'Turning data into insight.',
    'Training models that learn.',
    'Aspiring ML Engineer.'
  ],
  typeSpeed: 50,
  backSpeed: 30,
  loop: true,
  backDelay: 2200
});

// ── Custom Cursor ─────────────────────────────
const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');

let mouseX = -100, mouseY = -100;
let ringX  = -100, ringY  = -100;

// Hide cursor until mouse moves
cursor.style.opacity = '0';
cursorRing.style.opacity = '0';

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.opacity = '1';
  cursorRing.style.opacity = '1';
  cursor.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px)`;
});

(function animateRing() {
  ringX += (mouseX - ringX - 18) * 0.12;
  ringY += (mouseY - ringY - 18) * 0.12;
  cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
  requestAnimationFrame(animateRing);
})();

// Cursor hover effects
document.querySelectorAll('a, button, .proj-card, .stat-card, .skill-item, .social-link, .c-social, .tech-pill').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform += ' scale(2)';
    cursorRing.style.transform += ' scale(1.6)';
    cursorRing.style.borderColor = 'rgba(255,255,255,0.7)';
  });
  el.addEventListener('mouseleave', () => {
    cursorRing.style.borderColor = 'rgba(255,255,255,0.4)';
  });
});

// ── Scroll Progress Bar ───────────────────────
const scrollBar = document.getElementById('scrollBar');
const header    = document.getElementById('header');

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  scrollBar.style.width = scrolled + '%';
  header.classList.toggle('scrolled', window.scrollY > 50);
});

// ── Scroll Reveal ─────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Animate skill bars when skills section reveals
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.w;
      });
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => revealObs.observe(el));

// ── Interactive Dot Grid Canvas ───────────────
const canvas = document.getElementById('bg');
const ctx    = canvas.getContext('2d');

let W, H, dots = [];
let mxC = -9999, myC = -9999;

function resizeCanvas() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', () => { resizeCanvas(); buildDots(); });

function buildDots() {
  dots = [];
  const gap = 44;
  for (let x = gap; x < W; x += gap) {
    for (let y = gap; y < H; y += gap) {
      dots.push({ x, y, ox: x, oy: y });
    }
  }
}
buildDots();

document.addEventListener('mousemove', e => { mxC = e.clientX; myC = e.clientY; });

(function drawDots() {
  ctx.clearRect(0, 0, W, H);
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

// ── Mobile Nav ────────────────────────────────
function toggleMenu() {
  document.getElementById('mobileNav').classList.toggle('open');
  document.getElementById('hamburger').classList.toggle('open');
}

function closeMobileNav() {
  document.getElementById('mobileNav').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
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
      message: contactForm.elements['message'].value
    };

    statusMsg.textContent = 'Sending...';

    try {
      const res = await fetch('https://formspree.io/f/mlgwljzj', {
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
