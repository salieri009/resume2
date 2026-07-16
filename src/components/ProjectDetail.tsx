import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import type { Lang, ProjectKey } from '../data/types';
import { getLocalizedProject, getReceipts, PROJECT_ORDER } from '../data/projects';
import { STRINGS } from '../data/strings';
import { ArchFeatures } from './ArchFeatures';
import { SectionDiagram } from './SectionDiagram';
import { ShippingLane } from './ShippingLane';
import type { ScrollControl } from '../hooks/useSmoothScroll';

interface ProjectDetailProps {
  projectKey: ProjectKey;
  lang: Lang;
  reducedMotion: boolean;
  scrollControl: ScrollControl;
  /** Rect of the card that opened this, if any — the overlay grows out of it. */
  origin: DOMRect | null;
  closing: boolean;
  onClosed: () => void;
  onClose: () => void;
  onNext: () => void;
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const REVEAL_S = 0.55;

/** clip-path inset that frames `rect` within the viewport, in %. */
function insetFor(rect: DOMRect): string {
  const t = (rect.top / window.innerHeight) * 100;
  const r = ((window.innerWidth - rect.right) / window.innerWidth) * 100;
  const b = ((window.innerHeight - rect.bottom) / window.innerHeight) * 100;
  const l = (rect.left / window.innerWidth) * 100;
  return `inset(${t}% ${r}% ${b}% ${l}% round 16px)`;
}

export function ProjectDetail({
  projectKey,
  lang,
  reducedMotion,
  scrollControl,
  origin,
  closing,
  onClosed,
  onClose,
  onNext,
}: ProjectDetailProps) {
  const project = getLocalizedProject(projectKey, lang);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const [explode, setExplode] = useState(0);

  // Zoom into the drawing: the overlay is opaque and fixed, so clipping it back
  // to the card's rect and opening it out reads as the case study growing from
  // where the card was. Flip is deliberately not used — the axono scenes carry
  // rotateX/rotateZ + preserve-3d and have their transform written every frame,
  // so a 2D matrix from Flip would fight them for the same property.
  useLayoutEffect(() => {
    const el = dialogRef.current;
    if (!el || reducedMotion || !origin) return;
    const stage = el.querySelector('.sal-detail-axono-stage');
    const tl = gsap.timeline();
    tl.fromTo(
      el,
      { clipPath: insetFor(origin) },
      { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: REVEAL_S, ease: 'power2.inOut' },
      0,
    );
    if (stage) {
      tl.fromTo(stage, { scale: 0.72 }, { scale: 1, duration: REVEAL_S, ease: 'power2.out' }, 0);
    }
    return () => {
      tl.kill();
      gsap.set(el, { clearProps: 'clipPath' });
    };
    // Enter runs once per mount; `origin` is fixed for the life of the overlay.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Exit. The unmount is owned by whatever finishes first: the tween, or the
  // fallback timer. Without the timer a dropped onComplete — a paused ticker,
  // a GSAP failure — would leave the overlay stuck open over the whole page,
  // which is a far worse bug than a missing animation.
  useEffect(() => {
    if (!closing) return;
    const el = dialogRef.current;
    if (!el || reducedMotion || !origin) {
      onClosed();
      return;
    }
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      onClosed();
    };
    const tl = gsap.timeline({ onComplete: finish });
    tl.to(el, { clipPath: insetFor(origin), duration: 0.4, ease: 'power2.inOut' }, 0);
    const bail = window.setTimeout(finish, 700);
    return () => {
      window.clearTimeout(bail);
      tl.kill();
    };
  }, [closing, reducedMotion, origin, onClosed]);

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
  const t = STRINGS[lang];
  // Sheet within the A-100 case-study series: A-101, A-102, … Numbering runs
  // inside the hundred, not across it — A-201 is the Experience sheet in the
  // index (see CourseLine), so the old A-${n}01 scheme collided with it.
  const sheetNo = `A-1${String(PROJECT_ORDER.indexOf(projectKey) + 1).padStart(2, '0')}`;

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
              <div className="sal-receipt-row">
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="sal-link sal-focus">
                  GitHub ↗
                </a>
                {getReceipts(project).map((r) => (
                  <a
                    key={r.label}
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sal-receipt-link sal-focus"
                  >
                    {r.label} ↗
                  </a>
                ))}
              </div>
              <div className="sal-receipt-note">{t.detailReceiptsNote}</div>
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
              <div className="sal-secdwg">
                <SectionDiagram nodes={project.diagram} ariaLabel={`${project.title} — system section`} />
              </div>
              <div className="sal-secdwg-caption">{t.detailSectionCaption}</div>

              <ShippingLane
                laneTitle={t.detailShippingLabel}
                label={project.shipping.label}
                ports={project.shipping.ports}
                reducedMotion={reducedMotion}
              />

              <div className="sal-detail-axono" aria-hidden="true">
                <div className="sal-detail-axono-stage">
                  <div
                    className={`sal-detail-axono-scene sal-arch-${project.arch}`}
                    style={
                      {
                        '--axstack': String(
                          Math.round((project.layers.length - 1) * (28 + ex * 58) + 44),
                        ),
                        '--axrise': String(28 + ex * 58),
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
                          </div>
                          <div className="sal-detail-axono-slab-front" />
                          <div className="sal-detail-axono-slab-right" />
                        </div>

                        {/* Component cubes — placement mirrors the real architecture,
                            labels go out on drawing-style callouts */}
                        {layer.blocks.map((b) => {
                          const cx = b.left + b.size / 2;
                          const cy = b.top + b.size / 2;
                          const isLeft = cx <= 90;
                          // Right-side leaders run further out so the label
                          // clears the projected silhouette of the floor above.
                          const endX = isLeft ? -24 : 232;
                          return (
                            <Fragment key={b.label}>
                              <div
                                className="sal-axono-block"
                                style={{
                                  left: b.left,
                                  top: b.top,
                                  width: b.size,
                                  height: b.size,
                                  transform: 'translateZ(8px)',
                                }}
                              >
                                <div className="sal-axono-top" style={{ transform: `translateZ(${b.height}px)` }} />
                                <div className="sal-axono-side-front" style={{ height: b.height }} />
                                <div className="sal-axono-side-right" style={{ width: b.height }} />
                              </div>
                              <div
                                className="sal-axono-node"
                                style={{
                                  left: cx - 2.5,
                                  top: cy - 2.5,
                                  transform: `translateZ(${8 + b.height + 1}px)`,
                                }}
                              />
                              <div
                                className="sal-detail-axono-leader"
                                style={{
                                  left: isLeft ? endX : cx,
                                  top: cy,
                                  width: isLeft ? cx - endX : endX - cx,
                                  transform: `translateZ(${8 + b.height}px)`,
                                }}
                              />
                              <div
                                className={`sal-detail-axono-callout${isLeft ? ' is-left' : ''}`}
                                style={{ left: endX, top: cy, transform: `translateZ(${8 + b.height}px)` }}
                              >
                                <span>{b.label}</span>
                              </div>
                            </Fragment>
                          );
                        })}

                        {/* Same-slab conduits — only pairs that actually talk */}
                        {project.flows.conduits
                          .filter(([li]) => li === i)
                          .map(([, from, to]) => {
                            const a = layer.blocks[from];
                            const b = layer.blocks[to];
                            if (!a || !b) return null;
                            const ax = a.left + a.size / 2;
                            const ay = a.top + a.size / 2;
                            const dx = b.left + b.size / 2 - ax;
                            const dy = b.top + b.size / 2 - ay;
                            const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
                            return (
                              <div
                                key={`cd-${i}-${from}-${to}`}
                                className="sal-axono-conduit"
                                style={{
                                  left: ax,
                                  top: ay,
                                  width: Math.hypot(dx, dy),
                                  transform: `translateZ(9px) rotate(${angle}deg)`,
                                }}
                              />
                            );
                          })}

                        {/* Risers — the upper block's call descends into this floor's block */}
                        {project.flows.risers
                          .filter(([lower]) => lower === i)
                          .map(([, lowerIdx, upperIdx]) => {
                            const target = layer.blocks[lowerIdx];
                            const upper = project.layers[i + 1]?.blocks[upperIdx];
                            if (!target || !upper) return null;
                            return (
                              <div
                                key={`rs-${i}-${lowerIdx}-${upperIdx}`}
                                className="sal-axono-riser"
                                style={
                                  {
                                    left: upper.left + upper.size / 2,
                                    top: upper.top + upper.size / 2,
                                    '--bh': String(target.height),
                                    transform: `translateZ(${8 + target.height}px) rotateX(90deg)`,
                                  } as React.CSSProperties
                                }
                              />
                            );
                          })}
                      </div>
                    ))}

                    <div
                      className="sal-detail-axono-roofplate"
                      style={{
                        transform: `translateZ(${Math.round((project.layers.length - 1) * (28 + ex * 58) + 36)}px)`,
                      }}
                    />

                    <ArchFeatures typology={project.arch} gap={28 + ex * 58} layerCount={project.layers.length} />
                  </div>
                </div>

                {/* Drawing-sheet dressing: title block, dimension line, datum */}
                <div className="sal-axono-titleblock">
                  <div>
                    <span>DWG</span>
                    <span>{project.crumb.split('/')[1]}</span>
                  </div>
                  <div>
                    <span>SHEET</span>
                    <span>{sheetNo}</span>
                  </div>
                  <div>
                    <span>SCALE</span>
                    <span>NTS · EXPLODED</span>
                  </div>
                </div>
                <div className="sal-axono-dimline" />
                <span className="sal-axono-dimlabel">{`${project.layers.length} LAYERS`}</span>
                <span className="sal-axono-datum-tag">▽ GL ±0.00</span>
              </div>
              <div className="sal-detail-axono-caption">
                {t.detailAxonoCaption}
                <span className="sal-axono-sheet-ref">{sheetNo}</span>
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
