import { useReveal } from '../hooks/useReveal.js';
import { useVisible } from '../hooks/useVisible.js';
import { skills } from '../data/portfolioData.js';
import { asset } from '../utils/asset.js';
import RoomTransition from '../components/RoomTransition.jsx';

// Presentation-only grouping — no change to the underlying skills data.
// Any skill name that doesn't match one of these buckets still renders,
// safely caught by the "Other" fallback below.
const SKILL_GROUPS = [
  { label: 'Machine Learning', names: ['Machine Learning', 'Scikit-learn', 'Feature Engineering', 'Model Evaluation', 'Model Deployment'] },
  { label: 'Data & Analysis', names: ['Pandas', 'NumPy', 'Data Visualization'] },
  { label: 'Backend & APIs', names: ['FastAPI', 'REST APIs', 'React.js'] },
  { label: 'Languages & Tooling', names: ['Python', 'SQL', 'Git & Version Control'] },
];

function groupSkills() {
  const used = new Set();
  const groups = SKILL_GROUPS.map((g) => {
    const items = g.names
      .map((n) => skills.find((s) => s.name === n))
      .filter(Boolean);
    items.forEach((s) => used.add(s.name));
    return { label: g.label, items };
  }).filter((g) => g.items.length);

  const leftover = skills.filter((s) => !used.has(s.name));
  if (leftover.length) groups.push({ label: 'Other', items: leftover });
  return groups;
}

export default function Potions() {
  const [ref, visible] = useReveal();
  const active = useVisible(ref);
  const groups = groupSkills();

  return (
    <section id="potions" className="stage potions-stage" style={{ '--bg-photo': `url(${asset('images/backgrounds/potions-classroom-bg.jpg')})` }} ref={ref}>
      <RoomTransition motif="mist" open={visible} />
      <div className={`potions-cauldron ${active ? 'is-active' : ''}`} aria-hidden="true">
        <div className="cauldron-smoke" />
        <div className="cauldron-glow" />
        <span className="cauldron-bubble" />
        <span className="cauldron-bubble" />
        <span className="cauldron-bubble" />
        <div className="cauldron-pot" />
      </div>
      <div className={`container ${visible ? 'visible' : ''}`}>
        <div className="section-header">
          <div className="section-tag">// Potions Classroom</div>
          <h2 className="section-title">What I <span>Know</span> <span className="plain-label">(Skills)</span></h2>
        </div>

        <div className="potions-groups">
          {groups.map((g) => (
            <div key={g.label} className="potions-category">
              <h3 className="potions-category-label">{g.label}</h3>
              <div className="vials-grid">
                {g.items.map((s) => (
                  <div key={s.name} className="vial-card">
                    <div className="vial-header">
                      <span className="vial-icon" aria-hidden="true">{s.icon}</span>
                      <h3>{s.name}</h3>
                    </div>
                    <div className="vial-meta">
                      <span>Proficiency</span>
                      <span>{s.score}/10</span>
                    </div>
                    <div className="vial-flask" role="progressbar" aria-valuenow={s.score} aria-valuemin={0} aria-valuemax={10} aria-label={`${s.name} proficiency`}>
                      <div className="vial-fill" style={{ height: visible ? `${s.score * 10}%` : '0%' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
