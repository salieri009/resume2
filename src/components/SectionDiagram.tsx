import { useId, useState } from 'react';
import type { SectionNote } from '../lib/sectionNotes';

interface SectionDiagramProps {
  /** Architecture nodes, top floor first — data enters at the top and descends. */
  nodes: string[];
  ariaLabel: string;
  /** Design notes per node (index-aligned). Floors with notes become interactive. */
  notes?: SectionNote[][];
  /** Localized hint under the drawing when nothing is focused. */
  notesHint?: string;
}

const W = 560;
const TOP = 34;
const FLOOR_H = 58;
const BX = 120;
const BW = 320;
const FOUND_H = 16;
/** Storey height used for the elevation annotations (metres). */
const STOREY_M = 2.9;

/**
 * Architectural section drawing (단면도) of a project's system: each diagram
 * node is a building floor and the data flow descends like gravity. The
 * geometry never animates — a drawing is a document — but floors that carry
 * design notes (decisions/rejected alternatives naming that component) can be
 * hovered or focused to read them, the way a set gets read with a finger on
 * the sheet. All colors come from CSS theme vars.
 */
export function SectionDiagram({ nodes, ariaLabel, notes, notesHint }: SectionDiagramProps) {
  const uid = useId().replace(/:/g, '');
  const gridId = `secgrid-${uid}`;
  const hatchId = `sechatch-${uid}`;
  const arrowId = `secarrow-${uid}`;
  const [active, setActive] = useState(-1);

  const n = nodes.length;
  const groundY = TOP + n * FLOOR_H;
  const H = groundY + FOUND_H + 24;
  const flowX = 404;

  const slabYs = Array.from({ length: n + 1 }, (_, i) => TOP + i * FLOOR_H);
  const activeNotes = active >= 0 ? (notes?.[active] ?? []) : [];

  return (
    <>
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={ariaLabel}>
      <defs>
        <pattern id={gridId} width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M28 0 H0 V28" fill="none" stroke="var(--c-accent-dim)" strokeWidth="1" />
        </pattern>
        <pattern id={hatchId} width="8" height="8" patternUnits="userSpaceOnUse">
          <path d="M0 8 L8 0" stroke="var(--c-accent-dim)" strokeWidth="1" />
        </pattern>
        <marker id={arrowId} viewBox="0 0 8 8" refX="6" refY="4" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L8 4 L0 8 Z" fill="var(--c-accent)" />
        </marker>
      </defs>

      {/* Blueprint grid backdrop */}
      <rect x="60" y="16" width="440" height={groundY - 8} fill={`url(#${gridId})`} opacity="0.5" />

      {/* Roof band — echo of the axono roofplate hatch */}
      <rect
        x={BX}
        y={TOP - 8}
        width={BW}
        height="8"
        fill={`url(#${hatchId})`}
        stroke="var(--c-accent)"
        strokeWidth="1"
        opacity="0.7"
      />

      {/* Section-cut walls (poché: double line) */}
      <rect
        x={BX}
        y={TOP}
        width={BW}
        height={n * FLOOR_H}
        fill="var(--c-panel-2)"
        stroke="var(--c-border-strong)"
        strokeWidth="1.5"
      />
      <line x1={BX + 6} y1={TOP} x2={BX + 6} y2={groundY} stroke="var(--c-border)" strokeWidth="0.75" />
      <line x1={BX + BW - 6} y1={TOP} x2={BX + BW - 6} y2={groundY} stroke="var(--c-border)" strokeWidth="0.75" />

      {/* Floors: slab lines, labels, floor tags, note hit-areas */}
      {nodes.map((label, i) => {
        const yTop = TOP + i * FLOOR_H;
        const level = n - 1 - i;
        const floorNotes = notes?.[i] ?? [];
        const hasNotes = floorNotes.length > 0;
        return (
          <g key={label}>
            {active === i && hasNotes && (
              <rect x={BX} y={yTop} width={BW} height={FLOOR_H} fill="var(--c-accent-dim)" />
            )}
            <line
              x1={BX - 8}
              y1={yTop}
              x2={BX + BW + 8}
              y2={yTop}
              stroke="var(--c-border-strong)"
              strokeWidth={i === 0 ? 2 : 1.5}
            />
            <text
              x={280}
              y={yTop + FLOOR_H / 2 + 4}
              textAnchor="middle"
              fontSize="12.5"
              fontFamily="IBM Plex Mono, monospace"
              fill="var(--c-text)"
            >
              {label}
            </text>
            <text
              x={BX + 12}
              y={yTop + 14}
              fontSize="8.5"
              fontFamily="IBM Plex Mono, monospace"
              fill="var(--c-text-faint)"
            >
              {`FL ${level}`}
            </text>
            {hasNotes && (
              <>
                <text
                  x={BX + BW - 12}
                  y={yTop + 14}
                  textAnchor="end"
                  fontSize="8.5"
                  fontFamily="IBM Plex Mono, monospace"
                  fill="var(--c-accent-text)"
                >
                  {`◆ ${floorNotes.length}`}
                </text>
                {/* Transparent hit-area over the whole storey. Keyboard gets the
                    same disclosure as hover: focus shows the notes. */}
                <rect
                  x={BX}
                  y={yTop}
                  width={BW}
                  height={FLOOR_H}
                  fill="transparent"
                  className="sal-secdwg-hit sal-focus"
                  tabIndex={0}
                  aria-label={`${label} — ${floorNotes.length} design notes`}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive((prev) => (prev === i ? -1 : prev))}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive((prev) => (prev === i ? -1 : prev))}
                />
              </>
            )}
          </g>
        );
      })}

      {/* Elevation datum column (right): ▽ L{k} +{elev} per slab, GL at grade */}
      {slabYs.map((y, i) => {
        const level = n - 1 - i;
        const isGround = i === n;
        const elev = (level + 1) * STOREY_M;
        return (
          <g key={`datum-${y}`}>
            <line x1={BX + BW + 8} y1={y} x2={470} y2={y} stroke="var(--c-border)" strokeWidth="0.75" />
            <path
              d={`M470 ${y - 7} L482 ${y - 7} L476 ${y} Z`}
              fill="none"
              stroke="var(--c-accent-text)"
              strokeWidth="1"
            />
            <text x={488} y={y - 2} fontSize="9.5" fontFamily="IBM Plex Mono, monospace" fill="var(--c-accent-text)">
              {isGround ? 'GL' : `L${level + 1}`}
              <tspan dx="4" fontSize="8" fill="var(--c-text-faint)">
                {isGround ? '±0.00' : `+${elev.toFixed(1)}`}
              </tspan>
            </text>
          </g>
        );
      })}

      {/* Gravity data flow: dashed guide + per-gap arrows */}
      <line
        x1={flowX}
        y1={TOP + FLOOR_H / 2}
        x2={flowX}
        y2={groundY - FLOOR_H / 2}
        stroke="var(--c-accent)"
        strokeWidth="1"
        strokeDasharray="3 4"
        opacity="0.35"
      />
      {nodes.slice(0, -1).map((_, i) => (
        <line
          key={`flow-${i}`}
          x1={flowX}
          y1={TOP + (i + 0.5) * FLOOR_H + 12}
          x2={flowX}
          y2={TOP + (i + 1.5) * FLOOR_H - 12}
          stroke="var(--c-accent)"
          strokeWidth="1.25"
          markerEnd={`url(#${arrowId})`}
        />
      ))}

      {/* Dimension line (left) with 45° ticks and rotated label */}
      <line x1={84} y1={TOP} x2={84} y2={groundY} stroke="var(--c-text-faint)" strokeWidth="0.75" />
      {slabYs.map((y) => (
        <line
          key={`tick-${y}`}
          x1={80}
          y1={y + 4}
          x2={88}
          y2={y - 4}
          stroke="var(--c-text-faint)"
          strokeWidth="0.75"
        />
      ))}
      <text
        transform={`rotate(-90 70 ${(TOP + groundY) / 2})`}
        x={70}
        y={(TOP + groundY) / 2}
        textAnchor="middle"
        fontSize="8.5"
        fontFamily="IBM Plex Mono, monospace"
        letterSpacing="0.1em"
        fill="var(--c-text-faint)"
      >
        {`${n} FL — DATA ↓`}
      </text>

      {/* Grade line + hatched foundation */}
      <line x1={60} y1={groundY} x2={500} y2={groundY} stroke="var(--c-border-strong)" strokeWidth="2" />
      {[64, 78, 92, 106, 454, 468, 482, 496].map((x) => (
        <line
          key={`grade-${x}`}
          x1={x}
          y1={groundY + 7}
          x2={x + 7}
          y2={groundY}
          stroke="var(--c-border)"
          strokeWidth="0.75"
        />
      ))}
      <rect
        x={108}
        y={groundY}
        width={344}
        height={FOUND_H}
        fill={`url(#${hatchId})`}
        stroke="var(--c-border)"
        strokeWidth="0.75"
        opacity="0.6"
      />
    </svg>

    {/* Notes ledger under the sheet. Fixed min-height so disclosure never
        shifts the layout; aria-live announces the change to screen readers. */}
    {notes && (
      <div className="sal-secdwg-notes" aria-live="polite">
        {activeNotes.length > 0 ? (
          activeNotes.map((note) => (
            <div key={note.title} className="sal-secdwg-note">
              <span className={`sal-secdwg-note-kind${note.kind === 'tradeoff' ? ' is-rejected' : ''}`}>
                {note.kind === 'tradeoff' ? 'REJECTED' : 'DECISION'}
              </span>
              <span className="sal-secdwg-note-title">{note.title}</span>
              <span className="sal-secdwg-note-body">{note.body}</span>
            </div>
          ))
        ) : (
          <span className="sal-secdwg-notes-hint">{notesHint}</span>
        )}
      </div>
    )}
    </>
  );
}
