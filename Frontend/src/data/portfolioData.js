// All content below is reused verbatim from the existing portfolio
// (index.html / script.js) and the LinkedIn profile export (Profile.pdf).
// Only presentation changes — see MASTER_PLAN.md §3.

export const profile = {
  name: "Yash Nanda",
  role: "ML Engineer & Python Backend Developer",
  roleLong:
    "Machine Learning Engineer | Python Developer | FastAPI & Backend Development | Building AI-Powered Applications",
  location: "Ahmedabad, Gujarat, India",
  cgpa: "7.8",
  stats: [
    { num: "4+", label: "Projects" },
    { num: "1", label: "Internship" },
    { num: "7.8", label: "CGPA" },
  ],
  socials: {
    github: "https://github.com/yashbhanushali17",
    linkedin: "https://www.linkedin.com/in/yash-nanda17/",
    whatsapp: "https://wa.me/917779088071",
    email: "mailto:yashbhanushali1710@gmail.com",
  },
  resumePath: "resume/Yash_Nanda_Resume.pdf",
};

export const bio = [
  "I'm Yash, a Python Backend Developer and Machine Learning Engineer (BCA, 2026) who builds full-stack AI applications end to end — from data pipelines to production-style APIs.",
  "I enjoy the entire lifecycle of an ML product: cleaning and exploring data, engineering features, training and evaluating models with Scikit-learn, then wrapping them in a FastAPI backend and shipping them to the cloud.",
  "I recently completed a Machine Learning Developer internship at Cognetix Global Technology LLP, working on real-world predictive modeling and model evaluation pipelines — adding hands-on industry experience to a strong foundation in data structures, algorithms and clean, maintainable code.",
];

export const timeline = [
  {
    year: "2023",
    icon: "🚀",
    title: "Started BCA & began learning Python",
    detail: "Foundations in programming, data structures and algorithms",
  },
  {
    year: "2024 – 2025",
    icon: "🤖",
    title: "Dived into Machine Learning & backend development",
    detail: "Scikit-learn, FastAPI, REST APIs — shipped DiagnoWeb & InsureIQ",
  },
  {
    year: "May – Jun 2026",
    icon: "💼",
    title: "ML Developer Intern at Cognetix Global Technology",
    detail: "Real-world predictive modeling, model evaluation & pipeline debugging",
  },
];

// ── NEW: Education (from Profile.pdf) ──────────────────────────
export const education = [
  {
    school: "Manipal University Jaipur",
    degree: "Master of Computer Applications (Artificial Intelligence & Machine Learning) · Online",
    period: "2026 – 2028",
    status: "in-progress",
    note: "Currently Pursuing",
  },
  {
    school: "Sardar Vallabhbhai Global University",
    degree: "Bachelor of Computer Applications",
    period: "Completed",
    status: "complete",
    note: "CGPA: 7.82 / 10",
  },
];

// ── NEW: Certifications (from Profile.pdf) ─────────────────────
export const certifications = [
  {
    title: "Introduction to Retrieval Augmented Generation",
    issuer: "IBM SkillBuild",
    icon: "🧪",
  },
  {
    title: "Data Visualisation: Empowering Business with Effective Insights — Job Simulation",
    issuer: "Tata",
    icon: "📊",
  },
  {
    title: "Machine Learning for Beginners",
    issuer: "Independent study",
    icon: "🔮",
  },
  {
    title: "Data Analytics — Job Simulation",
    issuer: "Deloitte Australia",
    icon: "🦉",
  },
];

export const skills = [
  { icon: "🐍", name: "Python", score: 8 },
  { icon: "🧠", name: "Machine Learning", score: 7 },
  { icon: "🔬", name: "Scikit-learn", score: 7 },
  { icon: "⚡", name: "FastAPI", score: 7 },
  { icon: "🗄️", name: "SQL", score: 7 },
  { icon: "🔌", name: "REST APIs", score: 7 },
  { icon: "⚛️", name: "React.js", score: 6 },
  { icon: "🐼", name: "Pandas", score: 8 },
  { icon: "🔢", name: "NumPy", score: 7 },
  { icon: "📊", name: "Data Visualization", score: 7 },
  { icon: "🚀", name: "Model Deployment", score: 7 },
  { icon: "🧩", name: "Feature Engineering", score: 7 },
  { icon: "📈", name: "Model Evaluation", score: 7 },
  { icon: "🔗", name: "Git & Version Control", score: 6 },
];

export const experience = [
  {
    badge: "Internship",
    current: true,
    role: "Machine Learning Developer Intern",
    company: "Cognetix Global Technology LLP · Remote",
    dates: "10 May 2026 – 10 Jun 2026",
    points: [
      "Worked on real-world AI/ML tasks spanning data preprocessing, exploratory data analysis, and feature engineering using Python, Pandas, and NumPy.",
      "Built and evaluated machine learning models using Scikit-learn, applying regression and classification techniques for predictive modeling.",
      "Assisted in testing and debugging model pipelines, documenting workflows and results for reproducibility.",
      "Collaborated using Git/GitHub for version control and code review as part of a distributed development workflow.",
    ],
    trust: [
      "MCA Registered LLP",
      "ISO 9001:2015 Certified",
      "MSME Registered",
      "Startup India Recognized",
    ],
  },
  {
    badge: "Team Project",
    current: false,
    role: "Frontend & Full-Stack Contributor",
    company: "Cohort — Unified Professional Communication Platform",
    dates: "Collaborative build",
    points: [
      "Built and maintained reusable React.js UI components and integrated Node.js REST API endpoints into the frontend, gaining full-stack experience across the data flow.",
      "Contributed to feature testing, UI bug fixes, peer code reviews, and technical documentation within an Agile SDLC process.",
    ],
    trust: [],
  },
];

export const projects = [
  {
    id: "PROJECT_01",
    icon: "👁️",
    category: "team",
    title: "Cohort — Unified Communication Platform",
    desc: "Team-built real-time chat and collaboration platform. Built reusable React.js UI components and integrated Node.js REST endpoints into the frontend, contributing to feature testing, bug fixes and peer code review within an Agile workflow.",
    meta: ["👥 Team Project", "⚡ Real-time (Socket.IO)"],
    tags: ["React", "Node.js", "MongoDB", "Socket.IO"],
    link: "https://github.com/yashbhanushali17/Cohort",
    linkLabel: "View on GitHub",
  },
  {
    id: "PROJECT_02",
    icon: "📈",
    category: "ml",
    title: "DiagnoWeb — AI-Powered Diabetes Risk Predictor",
    desc: "Full-stack AI web app with a FastAPI backend serving a trained Scikit-learn classification model through RESTful prediction endpoints. Built an end-to-end pipeline — preprocessing, feature engineering, model training & evaluation — with Chart.js risk visualizations and automated PDF report generation.",
    meta: ["🧠 Classification Model", "📄 Auto PDF Reports", "☁️ Deployed on Render"],
    tags: ["Python", "FastAPI", "Scikit-learn", "Chart.js"],
    link: "https://yashbhanushali17.github.io/DiagnoWeb/",
    linkLabel: "View Live Project",
  },
  {
    id: "PROJECT_03",
    icon: "🛡️",
    category: "ml",
    title: "InsureIQ — AI-Based Insurance Cost Estimator",
    desc: "Full-stack ML web app for real-time insurance cost estimation, integrating a FastAPI backend with a trained Scikit-learn regression model via REST API. Implemented BMI calculation and city-tier regional prediction logic, plus prediction history tracking and interactive result charts.",
    meta: ["📊 Regression Model", "🕒 Prediction History", "☁️ Render + GitHub Pages"],
    tags: ["FastAPI", "Scikit-learn", "Python", "Pandas"],
    link: "https://yashbhanushali17.github.io/InsureIQ/",
    linkLabel: "View Live Project",
  },
  {
    id: "PROJECT_04",
    icon: "🤖",
    category: "web",
    title: "AI-Powered Developer Portfolio",
    desc: "This portfolio itself — a custom-built, fully responsive site with premium animations and an AI chatbot integrated via Cloudflare Workers for interactive, real-time conversations about my work.",
    meta: ["💬 AI Chatbot", "⚡ Cloudflare Workers"],
    tags: ["Frontend", "AI Chatbot", "Cloudflare Workers", "API Integration"],
    link: "https://github.com/yashbhanushali17/Portfolio",
    linkLabel: "View on GitHub",
  },
];

export const filterTabs = [
  { key: "all", label: "All" },
  { key: "ml", label: "Machine Learning" },
  { key: "web", label: "Full-Stack" },
  { key: "team", label: "Team Project" },
];

// ── Backend endpoints — reused exactly, do not change ──────────
export const CHATBOT_WORKER_URL = "https://round-paper-417b.yashbhanushali1710.workers.dev/";
export const CONTACT_API_URL = "https://portfolio-production-dd4e.up.railway.app/contact";
