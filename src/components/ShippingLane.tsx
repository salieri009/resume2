import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface ShippingLaneProps {
  /** Localized lane heading, e.g. "shipping route". */
  laneTitle: string;
  /** Leg name from project data, e.g. "Training" — stays English. */
  label: string;
  /** 3–5 port names along the route. */
  ports: string[];
  reducedMotion: boolean;
}

const Y = 26;
const X0 = 36;
const X1 = 524;

/**
 * Deployment-as-shipping: the project's pipeline drawn as a port-to-port
 * nautical lane. Visually rhymes with the degree voyage log strip in
 * VoyageChart (kept as parallel markup on purpose — that strip is welded to
 * Strings-driven milestones and page-level ScrollTrigger scrub).
 */
export function ShippingLane({ laneTitle, label, ports, reducedMotion }: ShippingLaneProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const routeRef = useRef<SVGPathElement | null>(null);
  const shipRef = useRef<SVGGElement | null>(null);

  const xs = ports.map((_, i) => X0 + (i * (X1 - X0)) / (ports.length - 1));

  // One-shot voyage on first reveal; re-arms when ports change (Next project).
  useEffect(() => {
    if (reducedMotion) return;
    const host = hostRef.current;
    const route = routeRef.current;
    const ship = shipRef.current;
    if (!host || !route || !ship) return;

    const len = route.getTotalLength();
    gsap.set(route, { strokeDasharray: len, strokeDashoffset: len });
    ship.setAttribute('transform', `translate(${X0} ${Y})`);
    const proxy = { p: 0 };
    let played = false;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || played) return;
        played = true;
        io.disconnect();
        gsap.to(route, { strokeDashoffset: 0, duration: 1.4, ease: 'power1.inOut' });
        gsap.to(proxy, {
          p: 1,
          duration: 1.4,
          ease: 'power1.inOut',
          onUpdate: () => {
            const pt = route.getPointAtLength(proxy.p * len);
            ship.setAttribute('transform', `translate(${pt.x} ${pt.y})`);
          },
        });
      },
      { threshold: 0.4 },
    );
    io.observe(host);
    return () => {
      io.disconnect();
      gsap.killTweensOf(route);
      gsap.killTweensOf(proxy);
    };
  }, [reducedMotion, ports]);

  const shipX = reducedMotion ? X1 : X0;

  return (
    <div
      ref={hostRef}
      className="sal-shiplane"
      role="img"
      aria-label={`${laneTitle} — ${label}: ${ports.join(' → ')}`}
    >
      <div className="sal-shiplane-header">
        <span className="sal-skill-label">{laneTitle}</span>
        <span className="sal-eyebrow">{label}</span>
      </div>
      <svg viewBox="0 0 560 72" className="sal-shiplane-svg" aria-hidden="true">
        {/* Nautical dashed guide (always visible) */}
        <path
          d={`M${X0} ${Y} H${X1}`}
          fill="none"
          stroke="var(--c-border-strong)"
          strokeWidth="1"
          strokeDasharray="4 5"
          opacity="0.5"
        />
        {/* Solid accent route — drawn on via dashoffset */}
        <path
          ref={routeRef}
          d={`M${X0} ${Y} H${X1}`}
          fill="none"
          stroke="var(--c-accent)"
          strokeWidth="2"
          opacity="0.8"
          strokeDasharray={reducedMotion ? undefined : 0}
        />

        {ports.map((port, i) => {
          const x = xs[i];
          const first = i === 0;
          const last = i === ports.length - 1;
          return (
            <g key={port}>
              {last && (
                <circle
                  cx={x}
                  cy={Y}
                  r="10"
                  fill="none"
                  stroke="var(--c-accent-text)"
                  strokeWidth="0.75"
                  strokeDasharray="2 3"
                />
              )}
              <circle cx={x} cy={Y} r="6.5" fill="var(--c-panel)" stroke="var(--c-accent-text)" strokeWidth="1.5" />
              {first && <circle cx={x} cy={Y} r="2.5" fill="var(--c-accent)" />}
              <text
                x={first ? x - 10 : last ? x + 10 : x}
                y={52}
                textAnchor={first ? 'start' : last ? 'end' : 'middle'}
                fontSize="9.5"
                fontFamily="IBM Plex Mono, monospace"
                fill="var(--c-text-muted)"
              >
                {port}
              </text>
            </g>
          );
        })}

        {/* Ship glyph (paths from Icons.tsx ShipMarker), centered on the line */}
        <g ref={shipRef} transform={`translate(${shipX} ${Y})`}>
          <g transform="translate(-7 -8)">
            <path d="M7 1 L10 8 L7 7 L4 8 Z" fill="var(--c-accent)" />
            <path d="M2 10 L7 9 L12 10 L11 12 L3 12 Z" fill="var(--c-accent-text)" opacity="0.85" />
          </g>
        </g>
      </svg>
    </div>
  );
}
