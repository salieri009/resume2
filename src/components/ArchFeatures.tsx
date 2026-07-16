import type { ArchTypology } from '../data/types';

/**
 * Typology-specific structures layered onto the detail axono so each project
 * reads as a different building: observatory (crowd), warehouse (iotbay),
 * greenhouse (farm), housing (gundam), pavilion (ephemeral). Everything is
 * drawn in the scene's 180×180 plan coordinates; z rises off the slab plane.
 * Material hatching lives in the scoped .sal-arch-* CSS — this component only
 * places the massing elements that need per-explode z positions.
 *
 * Explode-dependent elevations come from the scene's CSS custom properties
 * (--axgap / --axroof / --axtopslab, set by ProjectDetail), so scrolling the
 * overlay never re-renders this component.
 */

/** Roofplate elevation — same var the roofplate transform uses. */
const ROOF = 'var(--axroof)';
/** Top-floor slab surface elevation. */
const TOP_SLAB = 'var(--axtopslab)';

const z = (expr: string) => `translateZ(calc((${expr}) * 1px))`;

interface ArchFeaturesProps {
  typology: ArchTypology;
}

export function ArchFeatures({ typology }: ArchFeaturesProps) {
  switch (typology) {
    case 'observatory':
      return (
        <>
          {/* Sensor mast with crossarm on the roof */}
          <div
            className="sal-arch-mast"
            style={{ left: 88, top: 88, height: 28, transform: `${z(ROOF)} rotateX(90deg)` }}
          />
          <div className="sal-arch-crossarm" style={{ left: 79, top: 87, transform: z(`${ROOF} + 22`) }} />
          {/* Radar sweep over the top slab — the detector's gaze */}
          <div className="sal-arch-scan-wrap" style={{ left: 29, top: 29, transform: z(`${TOP_SLAB} + 2`) }}>
            <div className="sal-arch-scan" />
          </div>
        </>
      );

    case 'warehouse':
      return (
        <>
          {/* Sawtooth roof monitors */}
          {[18, 70, 122].map((x) => (
            <div
              key={`saw-${x}`}
              className="sal-arch-saw"
              style={{ left: x, top: 24, transform: `${z(ROOF)} rotateY(-38deg)` }}
            />
          ))}
          {/* Container stack on the apron — image out to the registry */}
          <div className="sal-arch-container" style={{ left: -38, top: 144, width: 28, height: 28, transform: 'translateZ(-10px)' }}>
            <div className="sal-axono-top sal-arch-corrugated" style={{ transform: 'translateZ(13px)' }} />
            <div className="sal-axono-side-front" style={{ height: 13 }} />
            <div className="sal-axono-side-right" style={{ width: 13 }} />
          </div>
          <div className="sal-arch-container" style={{ left: -35, top: 148, width: 22, height: 22, transform: 'translateZ(3px)' }}>
            <div className="sal-axono-top sal-arch-corrugated" style={{ transform: 'translateZ(11px)' }} />
            <div className="sal-axono-side-front" style={{ height: 11 }} />
            <div className="sal-axono-side-right" style={{ width: 11 }} />
          </div>
          {/* Loading-dock canopy cantilevered off the front */}
          <div className="sal-arch-canopy" style={{ left: 34, top: 178, transform: z('var(--axgap) + 10') }} />
        </>
      );

    case 'greenhouse':
      return (
        <>
          {/* A-frame glass roof — eaves pinned at the roofplate, ridge lifted */}
          <div
            className="sal-arch-glass"
            style={{ left: 12, top: 18, width: 156, height: 74, transformOrigin: 'top', transform: `${z(ROOF)} rotateX(38deg)` }}
          />
          <div
            className="sal-arch-glass"
            style={{ left: 12, top: 90, width: 156, height: 74, transformOrigin: 'bottom', transform: `${z(ROOF)} rotateX(-38deg)` }}
          />
          {/* Weather vane on the roof corner */}
          <div
            className="sal-arch-mast"
            style={{ left: 20, top: 20, height: 20, transform: `${z(ROOF)} rotateX(90deg)` }}
          />
          <div className="sal-arch-vane-wrap" style={{ left: 20, top: 20, transform: z(`${ROOF} + 18`) }}>
            <div className="sal-arch-vane" />
          </div>
        </>
      );

    case 'housing':
      return (
        <>
          {/* Gatehouse at the entry — the JWT checkpoint */}
          <div className="sal-arch-container sal-arch-gatehouse" style={{ left: -32, top: 114, width: 24, height: 24, transform: 'translateZ(-10px)' }}>
            <div className="sal-axono-top" style={{ transform: 'translateZ(15px)' }} />
            <div className="sal-axono-side-front" style={{ height: 15 }} />
            <div className="sal-axono-side-right" style={{ width: 15 }} />
          </div>
          {/* External stair ladder up the building corner */}
          <div className="sal-arch-stair" style={{ left: 170, top: 42, transform: 'translateZ(8px) rotateX(90deg)' }} />
        </>
      );

    case 'pavilion':
      return (
        <>
          {/* Cymatic ripples spreading across the ground plane */}
          {[0, 1].map((i) => (
            <div key={`rip-${i}`} className="sal-arch-ripple-wrap" style={{ left: 70, top: 70, transform: 'translateZ(-9px)' }}>
              <div className="sal-arch-ripple" style={{ animationDelay: `${i * 2.6}s` }} />
            </div>
          ))}
          {/* Clock mast — the piece's actual subject, kept ticking */}
          <div
            className="sal-arch-mast"
            style={{ left: 148, top: 26, height: 24, transform: `${z(ROOF)} rotateX(90deg)` }}
          />
          <div className="sal-arch-clock-anchor" style={{ left: 148, top: 26, transform: z(`${ROOF} + 24`) }}>
            <div className="sal-arch-clock" />
          </div>
        </>
      );

    default:
      return null;
  }
}
