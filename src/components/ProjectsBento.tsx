import { memo } from 'react';
import type { ProjectKey, Strings } from '../data/types';

interface ProjectsBentoProps {
  t: Strings;
  revealed: boolean;
  revealRef: (el: HTMLElement | null) => void;
  onOpenProject: (key: ProjectKey) => void;
}

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
        <article
          className="sal-bento-card sal-bento-a sal-focus"
          role="button"
          tabIndex={0}
          aria-label="Open case study: Crowd Detection and Accessibility Navigation"
          onClick={open('crowd')}
          onKeyDown={openKey('crowd')}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
            <span className="sal-eyebrow">WP-01 · Deep Learning</span>
            <span className="sal-badge">v2.6.0 · live</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <h3>
              Crowd Detection &amp;
              <br />
              Accessibility Navigation
            </h3>
            <p>{t.crowdSummary}</p>
            <div className="sal-tag-row">
              {['YOLOv8', 'FastAPI', 'Spring Boot', 'React', 'SageMaker'].map((tag) => (
                <span key={tag} className="sal-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="sal-bento-a-footer">
            <span>Lead — training &amp; inference · 97% commits</span>
            <span className="sal-case-study-link">Open →</span>
          </div>
        </article>

        <article
          className="sal-bento-card sal-bento-b sal-focus"
          role="button"
          tabIndex={0}
          aria-label="Open case study: IoTBay"
          onClick={open('iotbay')}
          onKeyDown={openKey('iotbay')}
        >
          <span className="sal-eyebrow">WP-02 · Enterprise Platform</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <h3>IoTBay</h3>
            <p>{t.iotbaySummary}</p>
          </div>
          <span className="sal-case-study-link">Open →</span>
        </article>

        <article
          className="sal-bento-card sal-bento-c sal-focus"
          role="button"
          tabIndex={0}
          aria-label="Open case study: Animal Farm Simulator"
          onClick={open('farm')}
          onKeyDown={openKey('farm')}
        >
          <span className="sal-eyebrow">WP-03 · Graphics</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <h3>Animal Farm Simulator</h3>
            <p>{t.farmSummary}</p>
          </div>
          <span className="sal-case-study-link">Open →</span>
        </article>

        <article
          className="sal-bento-card sal-bento-d sal-focus"
          role="button"
          tabIndex={0}
          aria-label="Open case study: Gundam Board"
          onClick={open('gundam')}
          onKeyDown={openKey('gundam')}
        >
          <span className="sal-eyebrow">WP-04 · Full-Stack · Solo</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <h3>Gundam Board</h3>
            <p>{t.gundamSummary}</p>
          </div>
          <span className="sal-case-study-link">Open →</span>
        </article>

        <article
          className="sal-bento-card sal-bento-f sal-focus"
          role="button"
          tabIndex={0}
          aria-label="Open case study: EphemeralTime"
          onClick={open('ephemeral')}
          onKeyDown={openKey('ephemeral')}
        >
          <span className="sal-eyebrow">WP-05 · Computational Design</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <h3>EphemeralTime</h3>
            <p>{t.ephemeralSummary}</p>
          </div>
          <span className="sal-case-study-link">Open →</span>
        </article>

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
