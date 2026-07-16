import { memo } from 'react';
import type { ProjectKey, Strings } from '../data/types';
import { PROJECTS, PROJECT_ORDER } from '../data/projects';
import { KeyPlan } from './KeyPlan';

interface ProjectsBentoProps {
  t: Strings;
  revealed: boolean;
  revealRef: (el: HTMLElement | null) => void;
  onOpenProject: (key: ProjectKey, origin?: DOMRect) => void;
}

/**
 * Card order/placement in the bento grid; summaries stay i18n-keyed.
 *
 * `plan` is only on the hero card. The span-2 cards are ~370px wide and the
 * massing lands straight on top of their summary text — reserving a third of
 * a small card for a decorative drawing costs more than the drawing earns.
 */
const BENTO_META: {
  key: ProjectKey;
  cls: string;
  eyebrow: string;
  summaryKey: keyof Strings;
  plan?: boolean;
}[] = [
  { key: 'crowd', cls: 'sal-bento-a', eyebrow: 'Deep Learning', summaryKey: 'crowdSummary', plan: true },
  { key: 'iotbay', cls: 'sal-bento-b', eyebrow: 'Enterprise Platform', summaryKey: 'iotbaySummary' },
  { key: 'farm', cls: 'sal-bento-c', eyebrow: 'Graphics', summaryKey: 'farmSummary' },
  { key: 'gundam', cls: 'sal-bento-d', eyebrow: 'Full-Stack · Solo', summaryKey: 'gundamSummary' },
  { key: 'ephemeral', cls: 'sal-bento-f', eyebrow: 'Computational Design', summaryKey: 'ephemeralSummary' },
];

/** Same A-100 series the sheet index points at and ProjectDetail stamps. */
const sheetNo = (key: ProjectKey) => `A-1${String(PROJECT_ORDER.indexOf(key) + 1).padStart(2, '0')}`;

export const ProjectsBento = memo(function ProjectsBento({ t, revealed, revealRef, onOpenProject }: ProjectsBentoProps) {
  // The card's own rect is where the overlay grows from — keyboard opens get
  // it too, so Enter and a click read the same.
  const open = (key: ProjectKey) => (e: React.MouseEvent<HTMLElement>) =>
    onOpenProject(key, e.currentTarget.getBoundingClientRect());
  const openKey = (key: ProjectKey) => (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpenProject(key, e.currentTarget.getBoundingClientRect());
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
        {BENTO_META.map(({ key, cls, eyebrow, summaryKey, plan }) => {
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
                <span className="sal-eyebrow">
                  <span className="sal-bento-sheet">{sheetNo(key)}</span>
                  {eyebrow}
                </span>
                <span className="sal-badge">{m.badge}</span>
              </div>
              {/* The building this case study is, drawn small. Opening the card
                  is a zoom into it — same geometry, same axonometric. */}
              {plan && <KeyPlan layers={project.layers} arch={project.arch} scale={0.62} />}
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
              {cls === 'sal-bento-a' && (
                <div className="sal-bento-stats">
                  {project.results.slice(0, 4).map((r) => (
                    <span key={r}>{r}</span>
                  ))}
                </div>
              )}
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
            <h3 style={{ margin: 0, fontFamily: "'Inter', var(--font-cjk), sans-serif", fontWeight: 700, fontSize: 20, color: 'var(--c-text)' }}>
              More on GitHub
            </h3>
            <p style={{ margin: 0, fontFamily: "'Inter', var(--font-cjk), sans-serif", fontSize: '13.5px', color: 'var(--c-text-muted)', lineHeight: 1.55 }}>
              {t.githubTile}
            </p>
          </div>
          <span className="sal-case-study-link">github.com/salieri009 ↗</span>
        </a>
      </div>
    </section>
  );
});
