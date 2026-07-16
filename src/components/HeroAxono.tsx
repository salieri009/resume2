import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AXONO_LAYERS, DEGREE } from '../data/academic';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { DrawingCursor } from './DrawingCursor';
import type { Strings } from '../data/types';

gsap.registerPlugin(ScrollTrigger);

/** Below this the drawing is scaled down and shown at rest — see the CSS at
 *  the same width. Keep the two in sync: JS decides whether to scrub, CSS
 *  decides how big, and they must agree on where the change happens. */
const NARROW_QUERY = '(max-width: 1180px)';

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
  // so spacing interpolates 84px → 100px as the building pulls apart.
  // The 84px floor keeps two-line captions clear of the datum below.
  const norm = Math.min(1, Math.max(0, (explode - 0.2) / 0.8));
  return 84 + norm * 16;
}

interface HeroAxonoProps {
  t: Strings;
  reducedMotion: boolean;
}

export function HeroAxono({ t, reducedMotion }: HeroAxonoProps) {
  const narrow = useMediaQuery(NARROW_QUERY);
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
      // Riser span between floors — CSS subtracts each block's own height.
      scene.style.setProperty('--axrise', String(LAYER_GAP * explode));
      const spacing = captionSpacing(explode);
      captionRefs.current.forEach((el, i) => {
        if (el) el.style.top = `${CAPTION_BASE_TOP - i * spacing}px`;
      });
      scene.style.transform = `rotateX(58deg) rotateZ(${rot}deg)`;
    };

    // Narrow viewports get the finished drawing rather than a scrub: on a
    // phone the hero occupies the whole screen, so scrubbing it means the
    // building is still assembling for the entire time anyone looks at it.
    if (reducedMotion || narrow) {
      apply(1, -36);
      return;
    }

    const ctx = gsap.context(() => {
      // Start half-separated and finish exploding by mid-scroll — otherwise
      // the inter-floor risers only gain length after the building has
      // already left the viewport.
      const proxy = { explode: 0.45, rot: -45 };
      apply(proxy.explode, proxy.rot);

      const buildScrollTween = () =>
        gsap.to(proxy, {
          explode: 1,
          rot: -28,
          ease: 'none',
          scrollTrigger: {
            trigger: root.closest('.sal-hero-section') ?? root,
            start: 'top top',
            end: '60% top',
            scrub: 0.55,
          },
          onUpdate: () => apply(proxy.explode, proxy.rot),
        });

      // The drawing assembles itself once, then hands the same proxy to the
      // scroll scrub. The tween is built in onComplete rather than up front:
      // both drive `proxy`, and a scrub attached while the intro is still
      // running would fight it for the same two numbers.
      //
      // Structure animates through apply(), never through per-part opacity.
      // .sal-axono-floor/-slab/-col/-block are all transform-style:preserve-3d,
      // and opacity < 1 forces transform-style to flat — fading them would
      // collapse every cube mid-assembly and pop it back at the end.
      //
      // The drawing itself is never faded either. gsap applies a from-state at
      // creation, so an opacity-0 start means the signature of the whole site
      // is blank until a tween ticks — and it stays blank if GSAP ever fails
      // to run. apply() has already put a visible building on screen above;
      // the intro only rearranges it. Captions are outside the 3D scene and
      // duplicated in the sr-only story, so they can afford to fade.
      const intro = gsap.timeline({ onComplete: buildScrollTween });

      intro
        .fromTo(
          proxy,
          { explode: 0, rot: -54 },
          {
            explode: 0.45,
            rot: -45,
            duration: 1.15,
            ease: 'power2.out',
            onUpdate: () => apply(proxy.explode, proxy.rot),
          },
          0,
        )
        .from(
          captionRefs.current.filter(Boolean),
          { opacity: 0, x: -8, duration: 0.4, stagger: 0.08, ease: 'power1.out' },
          0.55,
        );

      const roofLabel = root.querySelector('.sal-axono-roof');
      if (roofLabel) intro.from(roofLabel, { opacity: 0, duration: 0.4 }, 0.95);
    }, root);

    return () => ctx.revert();
  }, [reducedMotion, narrow]);

  const captions = CAPTION_KEYS.map((key, i) => ({
    label: t[key],
    sub: t[CAPTION_SUB_KEYS[i]],
    session: AXONO_LAYERS[i].session,
  }));

  // CAD-cursor bands: every string here comes from the data layer — the level
  // datum, the localized storey name, and the actual program blocks.
  const cursorBands = captions.map((c, i) => ({
    datum: `▽ ${c.session}`,
    label: c.label,
    sub: AXONO_LAYERS[i].blocks.map((b) => b.label).join(' · '),
  }));

  return (
    <>
      <div className="sal-axono-host">
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

              {/* Logic flow — conduits chaining block centres across the slab */}
              {layer.blocks.slice(0, -1).map((block, j) => {
                const next = layer.blocks[j + 1];
                const ax = block.left + block.size / 2;
                const ay = block.top + block.size / 2;
                const dx = next.left + next.size / 2 - ax;
                const dy = next.top + next.size / 2 - ay;
                const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
                return (
                  <div
                    key={`cd-${layer.id}-${block.label}`}
                    className="sal-axono-conduit"
                    style={{
                      left: ax,
                      top: ay,
                      width: Math.hypot(dx, dy),
                      transform: `translateZ(11px) rotate(${angle}deg)`,
                    }}
                  />
                );
              })}

              {/* Junction nodes on each cube's top face — the riser tap point */}
              {layer.blocks.map((block) => (
                <div
                  key={`nd-${block.label}`}
                  className="sal-axono-node"
                  style={{
                    left: block.left + block.size / 2 - 2.5,
                    top: block.top + block.size / 2 - 2.5,
                    transform: `translateZ(${10 + block.height + 1}px)`,
                  }}
                />
              ))}

              {/* Logic flow — risers climbing to the same stack on the floor above */}
              {i < AXONO_LAYERS.length - 1 &&
                layer.blocks.map((block) => (
                  <div
                    key={`rs-${block.label}`}
                    className="sal-axono-riser"
                    style={
                      {
                        left: block.left + block.size / 2,
                        top: block.top + block.size / 2,
                        '--bh': String(block.height),
                        transform: `translateZ(${10 + block.height}px) rotateX(90deg)`,
                      } as CSSProperties
                    }
                  />
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

        <DrawingCursor bands={cursorBands} bandTargets={() => floorRefs.current} />
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
