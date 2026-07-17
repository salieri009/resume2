import { Line } from '@react-three/drei';
import { useEffect, useMemo, useState } from 'react';
import * as THREE from 'three';
import { AXONO_LAYERS, SEMESTER_WAYPOINTS, formatMark } from '../../data/academic';
import { usePalette } from '../palette';
import { BlobShadow, CaptionPlate, InkEdges, Plinth } from '../primitives';
import { labelTexture } from '../textures';

const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

/** Sheet-coordinate → meters (concept: axono blocks at 1:160 of their px coords). */
const S = 1 / 160;
const STAGE_X = [-2.7, -0.9, 0.9, 2.7];
/** How many lifts stand at each stop (exempt base always present). */
const LIFTS_AT = [1, 2, 2, 3];
const ARTIFACT_AT: Record<number, string> = { 1: 'THE FIVE FLOORS', 2: 'LE-RESTAURANT', 3: 'STEVTECH' };

interface TimelineHallProps {
  reducedMotion: boolean;
  subStop: number;
  onSelectStage: (i: number) => void;
}

/**
 * L1 · The Construction Hall (bible 04/L1-TIMELINE, concept sheet dims).
 * One degree-building aging across four plinths: the exempt base half-sunk
 * and unstamped, lifts added stage by stage, artifact nameplates on the
 * flanks, and the completion plate hung over the topped-out stage.
 */
export function TimelineHall({ subStop, onSelectStage }: TimelineHallProps) {
  const pal = usePalette();
  const [hovered, setHovered] = useState<number | null>(null);
  const exemptColor = useMemo(
    () => '#' + new THREE.Color(pal.concrete).multiplyScalar(0.82).getHexString(),
    [pal.concrete],
  );
  // Block top-face stamps (bible 10 · first engravings): one texture per
  // unique label, shared across all four stages; regenerated per print.
  const labelMaps = useMemo(() => {
    const m = new Map<string, THREE.CanvasTexture>();
    for (const layer of AXONO_LAYERS.slice(1)) {
      for (const b of layer.blocks) {
        if (!m.has(b.label)) {
          m.set(b.label, labelTexture([b.label], { paper: pal.resin, ink: pal.graphite }, { size: 44, h: 128, w: 256 }));
        }
      }
    }
    return m;
  }, [pal.resin, pal.graphite]);
  const completionMap = useMemo(
    () =>
      labelTexture(
        ['UTS BIT · COMPLETE', 'GPA 6.00/7.0 · WAM 80.31 · 144 CP'],
        { paper: pal.resin, ink: pal.graphite },
        { w: 512, h: 140, size: 30 },
      ),
    [pal.resin, pal.graphite],
  );
  useEffect(
    () => () => {
      labelMaps.forEach((t) => t.dispose());
      completionMap.dispose();
    },
    [labelMaps, completionMap],
  );

  return (
    <group position={[0, 0.15, 0]}>
      {/* The datum — one hairline tying all four stages */}
      <Line
        points={[v(-3.6, 1.55, 0), v(3.6, 1.55, 0)]}
        color={pal.graphite}
        lineWidth={0.6}
      />

      {STAGE_X.map((x, i) => {
        const lifts = LIFTS_AT[i];
        const wp = SEMESTER_WAYPOINTS[i];
        const artifact = ARTIFACT_AT[i];
        const active = subStop === i;
        const hover = hovered === i;
        return (
          <group key={wp.id} position={[x, 0, 0]}>
            <Plinth
              width={1.2}
              depth={1.2}
              hover={hover}
              onHover={(h) => setHovered(h ? i : null)}
              onClick={() => onSelectStage(i)}
            >
              <BlobShadow position={[0.12 * (i + 1), 0.045, 0.1]} width={0.8 + 0.14 * i} depth={0.7} opacity={0.14} />

              {/* Exempt base — existing structure, retained; half-sunk, unstamped */}
              {AXONO_LAYERS[0].blocks.map((b) => (
                <mesh
                  key={b.label}
                  position={[(b.left + b.size / 2) * S - 0.55, -0.02 + (b.height * S) / 2, (b.top + b.size / 2) * S - 0.55]}
                >
                  <boxGeometry args={[b.size * S, b.height * S, b.size * S]} />
                  <meshStandardMaterial color={exemptColor} roughness={0.9} />
                  <InkEdges />
                </mesh>
              ))}

              {/* The lifts, poured stage by stage — top faces stamped */}
              {AXONO_LAYERS.slice(1, 1 + lifts).map((layer, k) => (
                <group key={layer.id} position={[0, 0.16 + k * 0.34, 0]}>
                  {layer.blocks.map((b) => (
                    <group
                      key={b.label}
                      position={[(b.left + b.size / 2) * S - 0.55, 0, (b.top + b.size / 2) * S - 0.55]}
                    >
                      <mesh position={[0, (b.height * S) / 2, 0]}>
                        <boxGeometry args={[b.size * S, b.height * S, b.size * S]} />
                        <meshStandardMaterial color={pal.resin} roughness={0.72} />
                        <InkEdges />
                      </mesh>
                      <mesh
                        rotation={[-Math.PI / 2, 0, 0]}
                        position={[0, b.height * S + 0.002, 0]}
                      >
                        <planeGeometry args={[b.size * S * 0.92, (b.size * S * 0.92) / 2]} />
                        <meshStandardMaterial
                          map={labelMaps.get(b.label) ?? null}
                          roughness={0.75}
                          toneMapped={false}
                        />
                      </mesh>
                    </group>
                  ))}
                </group>
              ))}

              {/* Delivered fixtures — nameplates standing proud of the flank */}
              {artifact && (
                <mesh position={[0.63, 0.3 + 0.18 * i, 0.2]}>
                  <boxGeometry args={[0.03, 0.07, 0.24]} />
                  <meshStandardMaterial color={pal.alum} roughness={0.4} metalness={0.1} />
                </mesh>
              )}
            </Plinth>

            {/* Session datum, ruled above the stage */}
            <CaptionPlate position={[-0.3, 1.62, 0]} lines={[wp.session]} />

            {/* Test-result stamps surface under attention */}
            {(hover || active) && (
              <CaptionPlate
                position={[0.7, 1.1, 0.4]}
                lines={wp.highlights.slice(0, 2).map((h) => `${h.short} · ${formatMark(h.mark, h.grade, 'en')}`.toUpperCase())}
                note={hover}
              />
            )}
            {artifact && (hover || active) && (
              <CaptionPlate position={[0.7, 0.35 + 0.18 * i, 0.2]} lines={[artifact]} />
            )}
          </group>
        );
      })}

      {/* Stage zero's confession, written once at the row's head */}
      <CaptionPlate position={[-3.5, 0.12, 0.7]} lines={['EXEMPT · EXISTING STRUCTURE, RETAINED']} />

      {/* The completion plate — the building signed off, properly engraved */}
      <group position={[2.7, 0, 0]}>
        <mesh position={[0, 1.9, 0]}>
          <boxGeometry args={[0.95, 0.3, 0.04]} />
          <meshStandardMaterial color={pal.resin} roughness={0.7} />
          <InkEdges />
        </mesh>
        <mesh position={[0, 1.9, 0.021]}>
          <planeGeometry args={[0.88, 0.24]} />
          <meshStandardMaterial map={completionMap} roughness={0.75} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}
