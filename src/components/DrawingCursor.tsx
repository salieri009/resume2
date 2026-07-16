import { useEffect, useRef } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';

/**
 * CAD crosshair for the drawing surfaces — dashed hairlines tracking the
 * pointer, with a readout naming the storey under it. Scoped rules:
 *
 * - Drawing surfaces only, never the page chrome: on a drawing a crosshair is
 *   literally what a CAD cursor is; anywhere else it's a portfolio trope that
 *   fights ten `cursor: pointer` affordances.
 * - The readout shows only real data (level datums, storey names, block
 *   labels from the data layer). This site's credibility strategy is
 *   verifiable receipts; decorative fake coordinates would be the one thing
 *   on the page a skeptical reader could catch being invented.
 * - Band hit-testing, not 3D hit-testing: the storey is picked by whether the
 *   pointer's Y falls inside a floor's *projected* bounding rect. That reads
 *   correctly as "the cursor is at this level" and involves no inverse
 *   projection math against the preserve-3d scene.
 *
 * Mounts inside a positioned host and listens on the parent element, so the
 * host needs no handlers of its own. Renders nothing on coarse pointers.
 */

export interface CursorBand {
  /** Datum text, e.g. "▽ 2025 AUT" or "▽ L2". Must come from real data. */
  datum: string;
  label: string;
  sub?: string;
}

interface DrawingCursorProps {
  /** Elements whose projected rects define the bands; index-aligned with `bands`. */
  bandTargets: () => (HTMLElement | null)[];
  bands: CursorBand[];
}

export function DrawingCursor({ bandTargets, bands }: DrawingCursorProps) {
  const fine = useMediaQuery('(hover: hover) and (pointer: fine)');
  const rootRef = useRef<HTMLDivElement | null>(null);
  const raf = useRef(0);
  const lastBand = useRef(-2);

  useEffect(() => {
    if (!fine) return;
    const root = rootRef.current;
    const host = root?.parentElement;
    if (!root || !host) return;

    const vline = root.querySelector<HTMLElement>('.sal-cursor-v')!;
    const hline = root.querySelector<HTMLElement>('.sal-cursor-h')!;
    const readout = root.querySelector<HTMLElement>('.sal-cursor-readout')!;
    const datumEl = root.querySelector<HTMLElement>('.sal-cursor-datum')!;
    const labelEl = root.querySelector<HTMLElement>('.sal-cursor-label')!;
    const subEl = root.querySelector<HTMLElement>('.sal-cursor-sub')!;

    const onMove = (e: MouseEvent) => {
      if (raf.current) return;
      raf.current = requestAnimationFrame(() => {
        raf.current = 0;
        const hostRect = host.getBoundingClientRect();
        const x = e.clientX - hostRect.left;
        const y = e.clientY - hostRect.top;
        // transform only — the hairlines must never invalidate layout.
        vline.style.transform = `translateX(${x}px)`;
        hline.style.transform = `translateY(${y}px)`;

        // Exploded floors overlap on screen; the later (upper) floor wins,
        // matching paint order.
        const targets = bandTargets();
        let hit = -1;
        for (let i = 0; i < targets.length; i++) {
          const r = targets[i]?.getBoundingClientRect();
          if (r && r.height > 0 && e.clientY >= r.top && e.clientY <= r.bottom) hit = i;
        }
        if (hit !== lastBand.current) {
          lastBand.current = hit;
          const band = hit >= 0 ? bands[hit] : null;
          readout.style.opacity = band ? '1' : '0';
          if (band) {
            datumEl.textContent = band.datum;
            labelEl.textContent = band.label;
            subEl.textContent = band.sub ?? '';
          }
        }
        // Keep the readout inside the host so it never clips at the edges.
        const rx = Math.min(x + 16, hostRect.width - 170);
        const ry = Math.min(Math.max(y + 16, 8), hostRect.height - 56);
        readout.style.transform = `translate(${rx}px, ${ry}px)`;
      });
    };
    const onEnter = () => root.classList.add('is-active');
    const onLeave = () => {
      root.classList.remove('is-active');
      lastBand.current = -2;
    };

    host.addEventListener('mousemove', onMove);
    host.addEventListener('mouseenter', onEnter);
    host.addEventListener('mouseleave', onLeave);
    return () => {
      cancelAnimationFrame(raf.current);
      raf.current = 0;
      host.removeEventListener('mousemove', onMove);
      host.removeEventListener('mouseenter', onEnter);
      host.removeEventListener('mouseleave', onLeave);
    };
  }, [fine, bandTargets, bands]);

  if (!fine) return null;

  return (
    <div ref={rootRef} className="sal-cursor" aria-hidden="true">
      <div className="sal-cursor-v" />
      <div className="sal-cursor-h" />
      <div className="sal-cursor-readout">
        <span className="sal-cursor-datum" />
        <span className="sal-cursor-label" />
        <span className="sal-cursor-sub" />
      </div>
    </div>
  );
}
