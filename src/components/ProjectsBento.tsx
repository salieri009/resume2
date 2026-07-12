import { memo } from 'react';
import type { ProjectKey, Strings } from '../data/types';
import { PROJECTS } from '../data/projects';

interface ProjectsBentoProps {
  t: Strings;
  revealed: boolean;
  revealRef: (el: HTMLElement | null) => void;
  onOpenProject: (key: ProjectKey) => void;
}

/** Card order/placement in the bento grid; summaries stay i18n-keyed. */
const BENTO_META: { key: ProjectKey; cls: string; eyebrow: string; summaryKey: keyof Strings }[] = [
  { key: 'crowd', cls: 'sal-bento-a', eyebrow: 'WP-01 · Deep Learning', summaryKey: 'crowdSummary' },
  { key: 'iotbay', cls: 'sal-bento-b', eyebrow: 'WP-02 · Enterprise Platform', summaryKey: 'iotbaySummary' },
  { key: 'farm', cls: 'sal-bento-c', eyebrow: 'WP-03 · Graphics', summaryKey: 'farmSummary' },
  { key: 'gundam', cls: 'sal-bento-d', eyebrow: 'WP-04 · Full-Stack · Solo', summaryKey: 'gundamSummary' },
  { key: 'ephemeral', cls: 'sal-bento-f', eyebrow: 'WP-05 · Computational Design', summaryKey: 'ephemeralSummary' },
];

export const ProjectsBento = memo(function ProjectsBento({ t, revealed, revealRef, onOpenProject }: ProjectsBentoProps) {
  const open = (key: ProjectKey) => () => onOpenProject(key);
  const openKey = (key: ProjectKey) => (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpenProject(key);
    }
  };

  return (
    <section
      id="projects"
      data-reveal-key="projects"
      ref={revealRef}
      className={`sal-section${revealed ? ' is-revealed' : ''}`}
    >
      <div className="sal-section-header">
        <span className="sal-section-num">01.</span>
        <h2 className="sal-section-title">{t.sectionProjects}</h2>
        <div className="sal-section-rule" />
      </div>

      <div className="sal-bento">
        {BENTO_META.map(({ key, cls, eyebrow, summaryKey }) => {
          const project = PROJECTS[key];
          const m = project.manifest;
          return (
            <article
              key={key}
              className={`sal-bento-card ${cls} sal-focus`}
              role="button"
              tabIndex={0}
              aria-label={`Open case study: ${project.title}`}
              onClick={open(key)}
              onKeyDown={openKey(key)}
            >
              <div className="sal-bento-head">
                <span className="sal-eyebrow">{eyebrow}</span>
                <span className="sal-badge">{m.badge}</span>
              </div>
              <div className="sal-bento-body">
                <h3>{project.title}</h3>
                <p>{t[summaryKey]}</p>
                <div className="sal-tag-row sal-bento-chips">
                  {m.chips.map((tag) => (
                    <span key={tag} className="sal-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="sal-bento-footer">
                <span>{m.footer}</span>
                <span className="sal-case-study-link">Open →</span>
              </div>
            </article>
          );
        })}

        <a
          className="sal-bento-e sal-focus"
          href="https://github.com/salieri009"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="sal-eyebrow">85 repositories</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <h3 style={{ margin: 0, fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 20, color: 'var(--c-text)' }}>
              More on GitHub
            </h3>
            <p style={{ margin: 0, fontFamily: "'Inter', sans-serif", fontSize: '13.5px', color: 'var(--c-text-muted)', lineHeight: 1.55 }}>
              {t.githubTile}
            </p>
          </div>
          <span className="sal-case-study-link">github.com/salieri009 ↗</span>
        </a>
      </div>
    </section>
  );
});
