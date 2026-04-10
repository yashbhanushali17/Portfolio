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
// Custom cursor disabled - using default arrow cursor

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

// =============================================
//  AI CHATBOT
// =============================================

const WORKER_URL = 'https://round-paper-417b.yashbhanushali1710.workers.dev/';

const YASH_PORTFOLIO = {
  name: "Yash Bhanushali",
  bio: "Aspiring Machine Learning Engineer and AI Enthusiast with 2+ years of learning in data science and AI. Passionate about building intelligent systems that solve real-world problems.",
  skills: {
    "Python": "8/10 - Strong proficiency in data science and ML libraries",
    "Machine Learning": "7/10 - Model training, evaluation, and optimization",
    "Scikit-learn": "6/10 - Supervised and unsupervised learning models",
    "SQL": "7/10 - Database design and complex queries",
    "Computer Vision": "6/10 - Image processing and face recognition",
    "NLP": "5/10 - Natural language processing and text analysis",
    "Data Analysis": "7/10 - Statistical analysis and data visualization",
    "Git & Version Control": "6/10 - Collaborative development"
  },
  projects: [
    {
      name: "Face Recognition System",
      description: "Real-time face detection and recognition pipeline using Python and OpenCV. Identifies faces with high accuracy across varying lighting conditions.",
      tags: ["Python", "OpenCV", "face_recognition", "ML"]
    },
    {
      name: "Stock Price Prediction",
      description: "ML models trained on historical market data to forecast stock price movements and trends using regression algorithms.",
      tags: ["Python", "Sklearn", "Pandas", "Time Series"]
    },
    {
      name: "AI Chatbot",
      description: "NLP-powered conversational assistant capable of understanding intent and generating contextual responses.",
      tags: ["NLP", "NLTK", "Python", "Text Processing"]
    },
    {
      name: "Data Analysis Dashboard",
      description: "Interactive EDA tool to surface insights from complex datasets quickly and visually.",
      tags: ["Pandas", "Matplotlib", "Seaborn", "Data Visualization"]
    }
  ],
  experience: {
    "2023": "Started learning Python & Data Science — self-taught foundations",
    "2024": "Dived into Machine Learning — Sklearn, model training & evaluation",
    "2025": "Building real-world projects — Face recognition, stock prediction, NLP"
  },
  stats: { Projects: "4+", LearningStreak: "2 years", CuriosityLevel: "∞" },
  contact: "Available for ML engineering opportunities, internships, and collaborations. Use the contact form on this site or reach out via LinkedIn/GitHub.",
  github: "https://github.com/yashbhanushali17"
};

// DOM
const chatbotToggle   = document.getElementById('chatbot-toggle');
const chatbotWidget   = document.getElementById('chatbot-widget');
const closeBtn        = document.getElementById('close-chatbot');
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
  if (isOpen) setTimeout(() => chatInput.focus(), 380);
});

closeBtn.addEventListener('click', () => {
  chatbotWidget.classList.remove('open');
  chatbotToggle.classList.remove('active');
});

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

// Add a message bubble
function addChatMessage(text, sender) {
  const wrap = document.createElement('div');
  wrap.className = `chat-message ${sender}-msg`;

  const p = document.createElement('p');
  p.textContent = text;
  wrap.appendChild(p);

  const time = document.createElement('span');
  time.className = 'msg-time';
  time.textContent = getTime();
  wrap.appendChild(time);

  // Insert before typing indicator so it stays at bottom
  chatMessages.insertBefore(wrap, typingIndicator);
  chatMessages.scrollTop = chatMessages.scrollHeight;
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
  chatMessages.scrollTop = chatMessages.scrollHeight;

  try {
    const res = await fetch(WORKER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, portfolioData: YASH_PORTFOLIO })
    });

    const data = await res.json();
    typingIndicator.classList.remove('show');

    if (data.success) {
      addChatMessage(data.message, 'bot');
    } else {
      addChatMessage('❌ ' + (data.error || 'Something went wrong. Please try again.'), 'bot');
    }
  } catch (err) {
    typingIndicator.classList.remove('show');
    addChatMessage('❌ Network error. Please check your connection and try again.', 'bot');
    console.error('Chat error:', err);
  } finally {
    sendBtn.disabled = false;
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
