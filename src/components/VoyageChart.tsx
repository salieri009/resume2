import { lazy, memo, Suspense, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ProjectKey, Strings, Theme } from '../data/types';
import { VOYAGE_ISLANDS, VOYAGE_ROUTE_SVG } from '../data/voyage';
import { islandCoastPath } from '../lib/voyageVisuals';
import { isWebGLAvailable } from '../lib/webgl';

gsap.registerPlugin(ScrollTrigger);

const VoyageScene = lazy(() =>
  import('./VoyageScene').then((m) => ({ default: m.VoyageScene })),
);

const PORTS = [
  { id: 'push', label: 'push', x: 80, y: 40 },
  { id: 'actions', label: 'GitHub Actions', x: 220, y: 40 },
  { id: 'e2e', label: '118 E2E', x: 380, y: 40 },
  { id: 'docker', label: 'Docker', x: 520, y: 40 },
  { id: 'ghcr', label: 'GHCR', x: 640, y: 40 },
] as const;

const CICD_PATH = 'M80 40 H640';

interface VoyageChartProps {
  t: Strings;
  theme: Theme;
  revealed: boolean;
  revealRef: (el: HTMLElement | null) => void;
  onOpenProject: (key: ProjectKey) => void;
  reducedMotion: boolean;
}

const DESKTOP_QUERY = '(min-width: 721px)';

export const VoyageChart = memo(function VoyageChart({
  t,
  theme,
  revealed,
  revealRef,
  onOpenProject,
  reducedMotion,
}: VoyageChartProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const sceneTriggerRef = useRef<HTMLDivElement | null>(null);
  const cicdTriggerRef = useRef<HTMLDivElement | null>(null);
  const routeRef = useRef<SVGPathElement | null>(null);
  const cicdRef = useRef<SVGPathElement | null>(null);
  const shipRef = useRef<SVGCircleElement | null>(null);
  const islandsRef = useRef<(SVGGElement | null)[]>([]);
  const [isDesktop, setIsDesktop] = useState(() => window.matchMedia(DESKTOP_QUERY).matches);
  const [useWebGL, setUseWebGL] = useState(() => window.matchMedia(DESKTOP_QUERY).matches && isWebGLAvailable());

  const setRefs = (el: HTMLElement | null) => {
    sectionRef.current = el;
    revealRef(el);
  };

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const update = () => {
      setIsDesktop(mq.matches);
      setUseWebGL(mq.matches && isWebGLAvailable());
    };
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (reducedMotion || !isDesktop || !sceneTriggerRef.current) return;
    const el = sceneTriggerRef.current;
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 92%',
      end: 'bottom 12%',
      onToggle: (self) => el.classList.toggle('is-chart-active', self.isActive),
    });
    el.classList.toggle('is-chart-active', st.isActive);
    return () => {
      st.kill();
      el.classList.remove('is-chart-active');
    };
  }, [reducedMotion, isDesktop]);

  useEffect(() => {
    if (reducedMotion || useWebGL || !isDesktop || !sceneTriggerRef.current) return;

    const ctx = gsap.context(() => {
      const route = routeRef.current;
      const trigger = sceneTriggerRef.current;
      if (route && trigger) {
        const len = route.getTotalLength();
        gsap.set(route, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(route, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger,
            start: 'top 92%',
            end: 'bottom 12%',
            scrub: 0.85,
          },
        });
      }

      islandsRef.current.forEach((island) => {
        if (!island || !trigger) return;
        gsap.fromTo(
          island,
          { opacity: 0, scale: 0.6, transformOrigin: 'center' },
          {
            opacity: 1,
            scale: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger,
              start: 'top 90%',
              end: 'bottom 15%',
              scrub: 0.85,
            },
          },
        );
      });
    }, sceneTriggerRef);

    return () => ctx.revert();
  }, [reducedMotion, useWebGL, isDesktop]);

  useEffect(() => {
    if (reducedMotion || !isDesktop || !cicdTriggerRef.current) return;

    const ctx = gsap.context(() => {
      const cicd = cicdRef.current;
      const ship = shipRef.current;
      const trigger = cicdTriggerRef.current;
      if (!cicd || !trigger) return;

      const len = cicd.getTotalLength();
      const scrollTrigger = {
        trigger,
        start: 'top 95%',
        end: 'bottom 75%',
        scrub: 0.85,
      };

      gsap.set(cicd, { strokeDasharray: len, strokeDashoffset: len });
      gsap.to(cicd, { strokeDashoffset: 0, ease: 'none', scrollTrigger });

      if (ship) {
        const proxy = { p: 0 };
        gsap.to(proxy, {
          p: 1,
          ease: 'none',
          scrollTrigger,
          onUpdate: () => {
            const pt = cicd.getPointAtLength(proxy.p * len);
            ship.setAttribute('cx', String(pt.x));
            ship.setAttribute('cy', String(pt.y));
          },
        });
      }
    }, cicdTriggerRef);

    return () => ctx.revert();
  }, [reducedMotion, isDesktop]);

  const openKey = (key: ProjectKey) => (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpenProject(key);
    }
  };

  const show3D = useWebGL && !reducedMotion;

  return (
    <section
      id="voyage"
      data-reveal-key="voyage"
      ref={setRefs}
      className={`sal-section${revealed ? ' is-revealed' : ''}`}
    >
      <div className="sal-section-header">
        <span className="sal-section-num">04.</span>
        <h2 className="sal-section-title">{t.voyageTitle}</h2>
        <div className="sal-section-rule" />
      </div>

      <p className="sal-section-intro">{t.voyageIntro}</p>
      <p className="sal-voyage-hint">{t.voyageIslandHint}</p>

      <div className="sal-voyage-chart sal-voyage-desktop">
        <div ref={sceneTriggerRef} className="sal-voyage-scene-host">
          {show3D ? (
            <Suspense fallback={<div className="sal-voyage-scene sal-voyage-scene--loading" aria-hidden="true" />}>
              <VoyageScene chartRef={sceneTriggerRef} theme={theme} onOpenProject={onOpenProject} reducedMotion={reducedMotion} />
            </Suspense>
          ) : (
            <svg viewBox="0 0 720 360" className="sal-voyage-svg" role="img" aria-label={t.voyageTitle}>
            <defs>
              <pattern id="sal-voyage-water" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(12)">
                <path d="M0 6 Q3 3 6 6 T12 6" fill="none" stroke="var(--c-border)" strokeWidth="0.4" opacity="0.35" />
              </pattern>
              <radialGradient id="sal-voyage-depth" cx="50%" cy="55%" r="65%">
                <stop offset="0%" stopColor="var(--c-accent-dim)" stopOpacity="0.08" />
                <stop offset="100%" stopColor="var(--c-bg)" stopOpacity="0.22" />
              </radialGradient>
            </defs>

            <rect x="8" y="8" width="704" height="344" rx="12" fill="var(--c-panel)" stroke="var(--c-border)" />
            <rect x="16" y="16" width="688" height="328" rx="8" fill="url(#sal-voyage-water)" opacity="0.55" />
            <rect x="16" y="16" width="688" height="328" rx="8" fill="url(#sal-voyage-depth)" />

            {Array.from({ length: 8 }, (_, i) => (
              <line
                key={`vg-${i}`}
                x1={40 + i * 90}
                y1={20}
                x2={40 + i * 90}
                y2={340}
                stroke="var(--c-border)"
                strokeWidth={0.5}
                opacity={0.32}
                strokeDasharray="2 6"
              />
            ))}
            {Array.from({ length: 5 }, (_, i) => (
              <line
                key={`hg-${i}`}
                x1={20}
                y1={40 + i * 70}
                x2={700}
                y2={40 + i * 70}
                stroke="var(--c-border)"
                strokeWidth={0.5}
                opacity={0.28}
                strokeDasharray="2 6"
              />
            ))}

            <text x="28" y="34" fontSize="8" fontFamily="JetBrains Mono, monospace" fill="var(--c-text-faint)" opacity={0.7}>
              33°52′S
            </text>
            <text x="640" y="34" fontSize="8" fontFamily="JetBrains Mono, monospace" fill="var(--c-text-faint)" opacity={0.7}>
              151°12′E
            </text>

            <g className="sal-voyage-compass" transform="translate(52 300)" opacity={0.55}>
              <circle r="22" fill="none" stroke="var(--c-border-strong)" strokeWidth="1" />
              <polygon points="0,-18 4,0 0,4 -4,0" fill="var(--c-accent-text)" />
              <text y="32" textAnchor="middle" fontSize="7" fontFamily="JetBrains Mono, monospace" fill="var(--c-text-faint)">
                N
              </text>
            </g>

            <path
              ref={routeRef}
              d={VOYAGE_ROUTE_SVG}
              fill="none"
              stroke="var(--c-accent-text)"
              strokeWidth={1.5}
              strokeDasharray={reducedMotion ? '6 6' : undefined}
              opacity={0.65}
            />

            {VOYAGE_ISLANDS.map((island, i) => (
              <g
                key={island.key}
                ref={(el) => {
                  islandsRef.current[i] = el;
                }}
                className="sal-voyage-island"
                role="button"
                tabIndex={0}
                aria-label={`Open case study: ${island.label} (${island.period})`}
                onClick={() => onOpenProject(island.key)}
                onKeyDown={openKey(island.key)}
                style={reducedMotion ? { opacity: 1 } : undefined}
              >
                <ellipse
                  cx={island.svg.cx}
                  cy={island.svg.cy + 6}
                  rx={island.svg.r + 10}
                  ry={island.svg.r * 0.35}
                  fill="var(--c-accent-dim)"
                  opacity={0.2}
                />
                {[1.35, 1.15, 0.95].map((scale, ci) => (
                  <path
                    key={ci}
                    d={islandCoastPath(island.svg.cx, island.svg.cy, island.svg.r * scale, `${island.key}-c${ci}`)}
                    fill="none"
                    stroke="var(--c-border)"
                    strokeWidth={0.6}
                    opacity={0.25 + ci * 0.08}
                  />
                ))}
                <path
                  d={islandCoastPath(island.svg.cx, island.svg.cy, island.svg.r, island.key)}
                  fill="var(--c-panel-2)"
                  stroke="var(--c-accent)"
                  strokeWidth={1.2}
                />
                <path
                  d={islandCoastPath(island.svg.cx, island.svg.cy, island.svg.r * 0.55, `${island.key}-inner`)}
                  fill="var(--c-accent-dim)"
                  opacity={0.35}
                  stroke="none"
                />
                <circle cx={island.svg.cx + island.svg.r * 0.55} cy={island.svg.cy + 4} r={3} fill="var(--c-accent)" />
                <text
                  x={island.svg.cx}
                  y={island.svg.cy - 10}
                  textAnchor="middle"
                  fontSize={9}
                  fontFamily="JetBrains Mono, monospace"
                  fill="var(--c-text-faint)"
                >
                  {island.period}
                </text>
                <text
                  x={island.svg.cx}
                  y={island.svg.cy + 2}
                  textAnchor="middle"
                  fontSize={10}
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight={700}
                  fill="var(--c-text)"
                >
                  {`WP-0${island.order}`}
                </text>
                <text
                  x={island.svg.cx}
                  y={island.svg.cy + 16}
                  textAnchor="middle"
                  fontSize={8}
                  fontFamily="Inter, sans-serif"
                  fill="var(--c-text-muted)"
                >
                  {island.label.length > 14 ? island.label.slice(0, 12) + '…' : island.label}
                </text>
                <title>{`${island.period} · ${island.label} — ${island.stack}`}</title>
              </g>
            ))}
          </svg>
          )}
        </div>

        <div ref={cicdTriggerRef} className="sal-voyage-cicd">
          <div className="sal-voyage-cicd-header">
            <span className="sal-skill-label">{t.voyageCICDLabel}</span>
            <span className="sal-eyebrow">{t.voyageCICDNote}</span>
          </div>
          <svg viewBox="0 0 720 80" className="sal-voyage-cicd-svg" aria-hidden="true">
            <path ref={cicdRef} d={CICD_PATH} fill="none" stroke="var(--c-accent)" strokeWidth={2} opacity={0.8} />
            {PORTS.map((port, i) => (
              <g key={port.id}>
                <circle
                  cx={port.x}
                  cy={port.y}
                  r={8}
                  fill="var(--c-panel)"
                  stroke="var(--c-accent-text)"
                  strokeWidth={1.5}
                />
                <text
                  x={port.x}
                  y={port.y + 24}
                  textAnchor="middle"
                  fontSize={10}
                  fontFamily="JetBrains Mono, monospace"
                  fill="var(--c-text-muted)"
                >
                  {port.label}
                </text>
                {i < PORTS.length - 1 && (
                  <text
                    x={(port.x + PORTS[i + 1].x) / 2}
                    y={port.y - 10}
                    textAnchor="middle"
                    fontSize={9}
                    fontFamily="JetBrains Mono, monospace"
                    fill="var(--c-accent-text)"
                  >
                    →
                  </text>
                )}
              </g>
            ))}
            <circle
              ref={shipRef}
              cx={PORTS[0].x}
              cy={PORTS[0].y}
              r={5}
              fill="var(--c-accent)"
              className="sal-voyage-cargo"
            />
          </svg>
        </div>
      </div>

      <div className="sal-voyage-mobile">
        {VOYAGE_ISLANDS.map((island) => (
          <button
            key={island.key}
            type="button"
            className="sal-voyage-card sal-focus"
            onClick={() => onOpenProject(island.key)}
          >
            <span className="sal-eyebrow">{`${island.period} · WP-0${island.order}`}</span>
            <strong>{island.label}</strong>
            <span className="sal-voyage-card-stack">{island.stack}</span>
          </button>
        ))}
        <div className="sal-voyage-cicd-mobile">
          <span className="sal-skill-label">{t.voyageCICDLabel}</span>
          <ol className="sal-voyage-ports">
            {PORTS.map((port) => (
              <li key={port.id}>{port.label}</li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
});
