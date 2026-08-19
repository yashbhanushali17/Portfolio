import { useMemo, useState } from 'react';
import { useReveal } from '../hooks/useReveal.js';
import { useVisible } from '../hooks/useVisible.js';
import { projects, filterTabs } from '../data/portfolioData.js';
import { asset } from '../utils/asset.js';
import RoomTransition from '../components/RoomTransition.jsx';

export default function RestrictedSection() {
  const [ref, visible] = useReveal();
  const active = useVisible(ref);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');

  const visibleProjects = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const matchesFilter = filter === 'all' || p.category === filter;
      const haystack = (p.title + ' ' + p.desc + ' ' + p.tags.join(' ')).toLowerCase();
      const matchesQuery = !q || haystack.includes(q);
      return matchesFilter && matchesQuery;
    });
  }, [filter, query]);

  return (
    <section id="restricted" className="stage restricted-stage" style={{ '--bg-photo': `url(${asset('images/backgrounds/restricted-section-bg.jpg')})` }} ref={ref}>
      <RoomTransition motif="curtain" open={visible} />
      <div className={`restricted-barrier ${active ? 'is-active' : ''}`} aria-hidden="true" />
      <div className="restricted-mist" aria-hidden="true" />
      <div className={`container ${visible ? 'visible' : ''}`}>
        <div className="section-header">
          <div className="section-tag">// Restricted Section</div>
          <h2 className="section-title">What I've <span>Built</span> <span className="plain-label">(Projects)</span></h2>
        </div>

        <div className="project-controls">
          <div className="filter-tabs" role="tablist" aria-label="Filter projects by category">
            {filterTabs.map((t) => (
              <button
                key={t.key}
                className={`filter-tab ${filter === t.key ? 'active' : ''}`}
                role="tab"
                aria-selected={filter === t.key}
                onClick={() => setFilter(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="project-search">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input
              type="search"
              placeholder="Search the restricted shelves…"
              aria-label="Search projects"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="project-count" aria-live="polite">
          {visibleProjects.length} record{visibleProjects.length === 1 ? '' : 's'} on the shelf
        </div>

        <div className="projects-grid">
          {visibleProjects.map((p) => (
            <article key={p.id} className="proj-card">
              <div className="proj-top">
                <span className="proj-num">{p.id}</span>
                <span className="proj-icon-badge" aria-hidden="true">
                  <span className="proj-icon">{p.icon}</span>
                </span>
              </div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <div className="proj-meta">
                {p.meta.map((m) => <span key={m} className="meta-chip">{m}</span>)}
              </div>
              <div className="proj-tags">
                {p.tags.map((t) => <span key={t} className="proj-tag">{t}</span>)}
              </div>
              <a href={p.link} target="_blank" rel="noopener" className="proj-link">
                {p.linkLabel}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </article>
          ))}
        </div>
        {visibleProjects.length === 0 && (
          <p className="no-results">No tomes match your search. Try a different word or shelf.</p>
        )}
      </div>
    </section>
  );
}
