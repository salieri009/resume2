import type { ArchTypology } from '../data/types';

/**
 * Typology-specific structures layered onto the detail axono so each project
 * reads as a different building: observatory (crowd), warehouse (iotbay),
 * greenhouse (farm), housing (gundam), pavilion (ephemeral). Everything is
 * drawn in the scene's 180×180 plan coordinates; z rises off the slab plane.
 * Material hatching lives in the scoped .sal-arch-* CSS — this component only
 * places the massing elements that need per-explode z positions.
 */

interface ArchFeaturesProps {
  typology: ArchTypology;
  /** Current inter-floor gap in scene px (28 + ex * 58). */
  gap: number;
  layerCount: number;
}

export function ArchFeatures({ typology, gap, layerCount }: ArchFeaturesProps) {
  /** Roofplate elevation — same formula as the roofplate transform. */
  const roofZ = (layerCount - 1) * gap + 36;
  /** Top-floor slab surface elevation. */
  const topSlabZ = (layerCount - 1) * gap + 8;

  switch (typology) {
    case 'observatory':
      return (
        <>
          {/* Sensor mast with crossarm on the roof */}
          <div
            className="sal-arch-mast"
            style={{ left: 88, top: 88, height: 28, transform: `translateZ(${roofZ}px) rotateX(90deg)` }}
          />
          <div className="sal-arch-crossarm" style={{ left: 79, top: 87, transform: `translateZ(${roofZ + 22}px)` }} />
          {/* Radar sweep over the top slab — the detector's gaze */}
          <div className="sal-arch-scan-wrap" style={{ left: 29, top: 29, transform: `translateZ(${topSlabZ + 2}px)` }}>
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
              style={{ left: x, top: 24, transform: `translateZ(${roofZ}px) rotateY(-38deg)` }}
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
          <div className="sal-arch-canopy" style={{ left: 34, top: 178, transform: `translateZ(${gap + 10}px)` }} />
        </>
      );

    case 'greenhouse':
      return (
        <>
          {/* A-frame glass roof — eaves pinned at the roofplate, ridge lifted */}
          <div
            className="sal-arch-glass"
            style={{ left: 12, top: 18, width: 156, height: 74, transformOrigin: 'top', transform: `translateZ(${roofZ}px) rotateX(38deg)` }}
          />
          <div
            className="sal-arch-glass"
            style={{ left: 12, top: 90, width: 156, height: 74, transformOrigin: 'bottom', transform: `translateZ(${roofZ}px) rotateX(-38deg)` }}
          />
          {/* Weather vane on the roof corner */}
          <div
            className="sal-arch-mast"
            style={{ left: 20, top: 20, height: 20, transform: `translateZ(${roofZ}px) rotateX(90deg)` }}
          />
          <div className="sal-arch-vane-wrap" style={{ left: 20, top: 20, transform: `translateZ(${roofZ + 18}px)` }}>
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
            style={{ left: 148, top: 26, height: 24, transform: `translateZ(${roofZ}px) rotateX(90deg)` }}
          />
          <div className="sal-arch-clock-anchor" style={{ left: 148, top: 26, transform: `translateZ(${roofZ + 24}px)` }}>
            <div className="sal-arch-clock" />
          </div>
        </>
      );

    default:
      return null;
  }
}
