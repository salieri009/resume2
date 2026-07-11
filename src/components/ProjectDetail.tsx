import { useEffect, useRef, useState } from 'react';
import type { Lang, ProjectKey } from '../data/types';
import { getLocalizedProject } from '../data/projects';
import type { ScrollControl } from '../hooks/useSmoothScroll';

interface ProjectDetailProps {
  projectKey: ProjectKey;
  lang: Lang;
  reducedMotion: boolean;
  scrollControl: ScrollControl;
  onClose: () => void;
  onNext: () => void;
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function ProjectDetail({ projectKey, lang, reducedMotion, scrollControl, onClose, onNext }: ProjectDetailProps) {
  const project = getLocalizedProject(projectKey, lang);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const [explode, setExplode] = useState(0);

  // Freeze the page behind the overlay: native overflow AND the Lenis engine.
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    scrollControl.stop();
    return () => {
      document.body.style.overflow = '';
      scrollControl.start();
    };
  }, [scrollControl]);

  // Focus trap: move focus in, cycle Tab inside, restore focus on close.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !dialogRef.current) return;
      const focusables = dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || active === dialogRef.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      previouslyFocused?.focus();
    };
  }, [onClose]);

  useEffect(() => {
    setExplode(0);
    if (dialogRef.current) dialogRef.current.scrollTop = 0;
  }, [projectKey]);

  const handleScroll = () => {
    const el = dialogRef.current;
    if (!el) return;
    const p = Math.min(1, el.scrollTop / 500);
    const rounded = Math.round(p * 50) / 50;
    setExplode((prev) => (prev !== rounded ? rounded : prev));
  };

  const ex = reducedMotion ? 1 : 0.25 + explode * 0.75;
  const diagramNodes = project.diagram.map((label, i, arr) => ({
    label,
    arrow: i < arr.length - 1 ? '→' : '',
  }));

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Case study detail"
      className="sal-overlay"
      tabIndex={-1}
      onScroll={handleScroll}
    >
      <div className="sal-overlay-header">
        <div className="sal-overlay-header-inner">
          <button type="button" onClick={onClose} className="sal-back-btn sal-focus">
            ← Back
          </button>
          <span className="sal-eyebrow">{project.crumb}</span>
        </div>
      </div>

      <div className="sal-detail-split">
        <div className="sal-detail-left">
          <span className="sal-detail-category">{project.category}</span>
          <h1 className="sal-detail-title">{project.title}</h1>
          <p className="sal-detail-summary">{project.summary}</p>
          <div className="sal-tag-row">
            {project.stack.map((chip) => (
              <span key={chip} className="sal-tag">
                {chip}
              </span>
            ))}
          </div>

          <div className="sal-detail-meta">
            <div className="sal-detail-meta-item">
              <div className="sal-detail-meta-label">Role</div>
              <div className="sal-detail-meta-value">{project.role}</div>
            </div>
            <div className="sal-detail-meta-item">
              <div className="sal-detail-meta-label">Outcome</div>
              <div className="sal-detail-meta-value">{project.outcome}</div>
            </div>
            <div className="sal-detail-meta-row">
              <div className="sal-detail-meta-item">
                <div className="sal-detail-meta-label">Period</div>
                <div className="sal-detail-meta-value">{project.period}</div>
              </div>
              <div className="sal-detail-meta-item">
                <div className="sal-detail-meta-label">Team</div>
                <div className="sal-detail-meta-value">{project.teamSize}</div>
              </div>
            </div>
            <div className="sal-detail-meta-item">
              <div className="sal-detail-meta-label">Links</div>
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="sal-link sal-focus">
                GitHub ↗
              </a>
            </div>
          </div>
        </div>

        <div className="sal-detail-right">
          <div className="sal-detail-block">
            <div className="sal-detail-block-heading">
              <span className="sal-detail-letter">a.</span>
              <h2>Overview</h2>
            </div>
            <p>{project.overview}</p>
          </div>

          <div className="sal-detail-block">
            <div className="sal-detail-block-heading">
              <span className="sal-detail-letter">b.</span>
              <h2>System Diagram</h2>
            </div>
            <div className="sal-diagram-panel">
              <div className="sal-diagram-nodes">
                {diagramNodes.map((node) => (
                  <div key={node.label} className="sal-diagram-node-group">
                    <span className="sal-diagram-node">{node.label}</span>
                    {node.arrow && <span className="sal-diagram-arrow">{node.arrow}</span>}
                  </div>
                ))}
              </div>
              <div className="sal-diagram-note">$ {project.diagramNote}</div>

              <div className="sal-detail-axono" aria-hidden="true">
                <div className="sal-detail-axono-stage">
                  <div
                    className="sal-detail-axono-scene"
                    style={
                      {
                        '--axstack': String(
                          Math.round((project.layers.length - 1) * (28 + ex * 58) + 44),
                        ),
                      } as React.CSSProperties
                    }
                  >
                    <div className="sal-detail-axono-ground" />

                    {[
                      { left: 0, top: 0 },
                      { left: 180, top: 0 },
                      { left: 0, top: 180 },
                      { left: 180, top: 180 },
                    ].map((p) => (
                      <div
                        key={`pl-${p.left}-${p.top}`}
                        className="sal-axono-pline"
                        style={{ left: p.left, top: p.top }}
                      />
                    ))}

                    {project.layers.map((layer, i) => (
                      <div
                        key={layer.label}
                        className="sal-detail-axono-floor"
                        style={{ transform: `translateZ(${Math.round(i * (28 + ex * 58))}px)` }}
                      >
                        <div className="sal-detail-axono-slab">
                          <div className="sal-detail-axono-slab-top">
                            <span className="sal-axono-level">{`L${i}`}</span>
                            <span className="sal-axono-layer-label">{layer.label}</span>
                            <div className="sal-axono-layer-items">
                              {layer.items.map((it) => (
                                <span key={it} className="sal-axono-layer-tag">
                                  {it}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="sal-detail-axono-slab-front" />
                          <div className="sal-detail-axono-slab-right" />
                        </div>
                      </div>
                    ))}

                    <div
                      className="sal-detail-axono-roofplate"
                      style={{
                        transform: `translateZ(${Math.round((project.layers.length - 1) * (28 + ex * 58) + 36)}px)`,
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="sal-detail-axono-caption">
                exploded axonometric — scroll to separate the layers
              </div>
            </div>
          </div>

          <div className="sal-detail-block">
            <div className="sal-detail-block-heading">
              <span className="sal-detail-letter">c.</span>
              <h2>My Role</h2>
            </div>
            <p>{project.roleDetail}</p>
          </div>

          <div className="sal-detail-block">
            <div className="sal-detail-block-heading">
              <span className="sal-detail-letter">d.</span>
              <h2>Problems &amp; Solutions</h2>
            </div>
            {project.problems.map((ps) => (
              <div key={ps.p} className="sal-problem-card">
                <div className="sal-problem-row">
                  <span className="sal-pill-accent">Problem</span>
                  <p>{ps.p}</p>
                </div>
                <div className="sal-problem-row sal-solution-row">
                  <span className="sal-pill-muted">Solution</span>
                  <p>{ps.s}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="sal-detail-block">
            <div className="sal-detail-block-heading">
              <span className="sal-detail-letter">e.</span>
              <h2>Technical Decisions</h2>
            </div>
            {project.decisions.map((d) => (
              <div key={d.choice} className="sal-decision-card">
                <p>{d.choice}</p>
                <div className="sal-problem-row">
                  <span className="sal-pill-accent">why</span>
                  <p style={{ fontWeight: 400, fontSize: '14.5px', color: 'var(--c-text-muted)', lineHeight: 1.65 }}>
                    {d.why}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="sal-detail-block">
            <div className="sal-detail-block-heading">
              <span className="sal-detail-letter">f.</span>
              <h2>Trade-offs</h2>
            </div>
            {project.tradeoffs.map((to) => (
              <div key={to.rejected} className="sal-tradeoff-card">
                <div className="sal-problem-row">
                  <span className="sal-pill-muted">skipped</span>
                  <p className="sal-tradeoff-rejected">{to.rejected}</p>
                </div>
                <p className="sal-tradeoff-why">{to.why}</p>
              </div>
            ))}
          </div>

          <div className="sal-detail-block">
            <div className="sal-detail-block-heading">
              <span className="sal-detail-letter">g.</span>
              <h2>Results</h2>
            </div>
            <div className="sal-results-row">
              {project.results.map((r) => (
                <span key={r} className="sal-result-chip">
                  {r}
                </span>
              ))}
            </div>
          </div>

          <div className="sal-detail-block">
            <div className="sal-detail-block-heading">
              <span className="sal-detail-letter">h.</span>
              <h2>Lessons &amp; Next</h2>
            </div>
            <div className="sal-lessons">
              {project.lessons.map((l) => (
                <p key={l}>— {l}</p>
              ))}
            </div>
            <div className="sal-next-row">
              <span className="sal-next-label">$ next:</span>
              {project.future.map((fu) => (
                <span key={fu} className="sal-next-chip">
                  {fu}
                </span>
              ))}
            </div>
          </div>

          <div className="sal-detail-footer-nav">
            <button type="button" onClick={onClose} className="sal-close-btn sal-focus">
              ← All projects
            </button>
            <button type="button" onClick={onNext} className="sal-next-project-btn sal-focus">
              Next project →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
