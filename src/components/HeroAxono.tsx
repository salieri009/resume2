import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AXONO_LAYERS, DEGREE } from '../data/academic';
import type { Strings } from '../data/types';

gsap.registerPlugin(ScrollTrigger);

/** Distance between floor plates when fully exploded (scene px along Z). */
const LAYER_GAP = 110;
/** Corner column height above the slab. */
const COLUMN_H = 16;

const CAPTION_KEYS = ['axonoL0', 'axonoL1', 'axonoL2', 'axonoL3'] as const;
const CAPTION_SUB_KEYS = ['axonoL0Sub', 'axonoL1Sub', 'axonoL2Sub', 'axonoL3Sub'] as const;

const CAPTION_BASE_TOP = 375;

const COLUMN_POSITIONS = [
  { left: 14, top: 14 },
  { left: 209, top: 14 },
  { left: 14, top: 209 },
  { left: 209, top: 209 },
];

const PLINE_POSITIONS = [
  { left: 0, top: 0 },
  { left: 230, top: 0 },
  { left: 0, top: 230 },
  { left: 230, top: 230 },
];

function captionSpacing(explode: number): number {
  // Collapsed floors would stack the annotations on top of each other,
  // so spacing interpolates 74px → 100px as the building pulls apart.
  const norm = Math.min(1, Math.max(0, (explode - 0.2) / 0.8));
  return 74 + norm * 26;
}

interface HeroAxonoProps {
  t: Strings;
  reducedMotion: boolean;
}

export function HeroAxono({ t, reducedMotion }: HeroAxonoProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const floorRefs = useRef<(HTMLDivElement | null)[]>([]);
  const roofRef = useRef<HTMLDivElement | null>(null);
  const captionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const root = rootRef.current;
    const scene = sceneRef.current;
    if (!root || !scene) return;

    const apply = (explode: number, rot: number) => {
      floorRefs.current.forEach((el, i) => {
        if (el) el.style.transform = `translateZ(${i * LAYER_GAP * explode}px)`;
      });
      // Roof clearance scales with the explosion so it hugs the stack when collapsed.
      const roofZ = 3 * LAYER_GAP * explode + 40 * explode + 18;
      if (roofRef.current) {
        roofRef.current.style.transform = `translateZ(${roofZ}px)`;
      }
      scene.style.setProperty('--axstack', String(roofZ + 16));
      const spacing = captionSpacing(explode);
      captionRefs.current.forEach((el, i) => {
        if (el) el.style.top = `${CAPTION_BASE_TOP - i * spacing}px`;
      });
      scene.style.transform = `rotateX(58deg) rotateZ(${rot}deg)`;
    };

    if (reducedMotion) {
      apply(1, -36);
      return;
    }

    const ctx = gsap.context(() => {
      const proxy = { explode: 0.2, rot: -45 };
      apply(proxy.explode, proxy.rot);

      gsap.to(proxy, {
        explode: 1,
        rot: -28,
        ease: 'none',
        scrollTrigger: {
          trigger: root.closest('.sal-hero-section') ?? root,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.55,
        },
        onUpdate: () => apply(proxy.explode, proxy.rot),
      });
    }, root);

    return () => ctx.revert();
  }, [reducedMotion]);

  const captions = CAPTION_KEYS.map((key, i) => ({
    label: t[key],
    sub: t[CAPTION_SUB_KEYS[i]],
    session: AXONO_LAYERS[i].session,
  }));

  return (
    <>
      <div ref={rootRef} className="sal-axono" aria-hidden="true">
        <div ref={sceneRef} className="sal-axono-scene">
          {/* Site plate — the ground the building sits on */}
          <div className="sal-axono-ground">
            <span className="sal-axono-ground-label">{`SITE · UTS ${DEGREE.startYear}–${DEGREE.completedYear}`}</span>
          </div>

          {/* Corner projection lines tying the exploded floors together */}
          {PLINE_POSITIONS.map((p) => (
            <div key={`pl-${p.left}-${p.top}`} className="sal-axono-pline" style={{ left: p.left, top: p.top }} />
          ))}

          {/* Floors, oldest at the bottom — L0 exemptions → L3 capstone */}
          {AXONO_LAYERS.map((layer, i) => (
            <div
              key={layer.id}
              className="sal-axono-floor"
              ref={(el) => {
                floorRefs.current[i] = el;
              }}
            >
              <div className="sal-axono-slab">
                <div className="sal-axono-slab-top">
                  <span className="sal-axono-level">{`L${i} · ${layer.session}`}</span>
                </div>
                <div className="sal-axono-slab-front" />
                <div className="sal-axono-slab-right" />
              </div>

              {COLUMN_POSITIONS.map((c) => (
                <div
                  key={`col-${c.left}-${c.top}`}
                  className="sal-axono-col"
                  style={{ left: c.left, top: c.top }}
                >
                  <div className="sal-axono-col-top" style={{ transform: `translateZ(${COLUMN_H}px)` }} />
                  <div className="sal-axono-side-front" style={{ height: COLUMN_H }} />
                  <div className="sal-axono-side-right" style={{ width: COLUMN_H }} />
                </div>
              ))}

              {layer.blocks.map((block) => (
                <div
                  key={block.label}
                  className="sal-axono-block"
                  style={{ left: block.left, top: block.top, width: block.size, height: block.size }}
                >
                  <div className="sal-axono-top" style={{ transform: `translateZ(${block.height}px)` }}>
                    {block.label}
                  </div>
                  <div className="sal-axono-side-front" style={{ height: block.height }} />
                  <div className="sal-axono-side-right" style={{ width: block.height }} />
                </div>
              ))}
            </div>
          ))}

          {/* Roof plate hovering above the top floor */}
          <div ref={roofRef} className="sal-axono-roofplate" />
        </div>

        {/* Architectural annotations: datum mark, level name, leader line */}
        {captions.map((c, i) => (
          <div
            key={c.label}
            className="sal-axono-caption"
            ref={(el) => {
              captionRefs.current[i] = el;
            }}
            style={{ top: CAPTION_BASE_TOP - i * 95 }}
          >
            <span className="sal-axono-caption-datum">{`▽ ${c.session}`}</span>
            {c.label}
            <br />
            <span>{c.sub}</span>
          </div>
        ))}
        <div className="sal-axono-roof">{t.axonoRoof}</div>
      </div>

      {/* Mobile / narrow: flattened stack so the story survives without 3D */}
      <div className="sal-axono-mobile" aria-hidden="true">
        {CAPTION_KEYS.map((key, i) => (
          <div key={key} className="sal-axono-mobile-row">
            <span className="sal-axono-mobile-label">
              {t[key]} <span className="sal-axono-mobile-session">▽ {AXONO_LAYERS[i].session}</span>
            </span>
            <span className="sal-axono-mobile-sub">{t[CAPTION_SUB_KEYS[i]]}</span>
            <div className="sal-axono-mobile-chips">
              {AXONO_LAYERS[i].blocks.map((b) => (
                <span key={b.label} className="sal-tag">
                  {b.label}
                </span>
              ))}
            </div>
          </div>
        ))}
        <div className="sal-axono-mobile-roof">{t.axonoRoof}</div>
      </div>
    </>
  );
}
