import type { CSSProperties } from 'react';
import type { ProjectLayer } from '../data/types';

/**
 * Key plan — the collapsed massing of a project, drawn from the same
 * `project.layers` geometry the detail axono expands. The card and the modal
 * must read the same building or the zoom into the drawing is a lie, so this
 * is the one place that geometry gets turned into boxes.
 *
 * Deliberately mute: no labels, leaders, callouts or conduits. At 120px those
 * would be noise, and the point here is the silhouette, not the annotation.
 */

/** Detail-axono slab footprint, in scene units. Blocks are placed inside it. */
const FOOTPRINT = 180;
/** Z-gap between floors when collapsed — the detail axono's `ex = 0` spacing. */
const COLLAPSED_GAP = 28;

interface KeyPlanProps {
  layers: ProjectLayer[];
  /** Typology class (`sal-arch-*`) so the massing wears the project's roof. */
  arch: string;
  /** Scales the whole plan into whatever box the card gives it. */
  scale?: number;
}

export function KeyPlan({ layers, arch, scale = 0.42 }: KeyPlanProps) {
  return (
    <div className="sal-keyplan" aria-hidden="true">
      <div
        className={`sal-keyplan-scene sal-arch-${arch}`}
        style={{ '--kp-scale': String(scale) } as CSSProperties}
      >
        {layers.map((layer, i) => (
          <div
            key={layer.label}
            className="sal-keyplan-floor"
            style={{ transform: `translateZ(${i * COLLAPSED_GAP}px)` }}
          >
            <div className="sal-keyplan-slab">
              <div className="sal-keyplan-slab-top" />
              <div className="sal-keyplan-slab-front" />
              <div className="sal-keyplan-slab-right" />
            </div>

            {layer.blocks.map((b) => (
              <div
                key={b.label}
                className="sal-keyplan-block"
                style={{
                  left: (b.left / FOOTPRINT) * 100 + '%',
                  top: (b.top / FOOTPRINT) * 100 + '%',
                  width: (b.size / FOOTPRINT) * 100 + '%',
                  height: (b.size / FOOTPRINT) * 100 + '%',
                  transform: 'translateZ(8px)',
                }}
              >
                <div className="sal-keyplan-top" style={{ transform: `translateZ(${b.height}px)` }} />
                <div className="sal-keyplan-side-front" style={{ height: b.height }} />
                <div className="sal-keyplan-side-right" style={{ width: b.height }} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
