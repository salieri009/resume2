import { Line } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  AXONO_LAYERS,
  SEMESTER_WAYPOINTS,
  formatMark,
  type SemesterWaypoint,
} from '../../data/academic';
import { DUR, EASE_INK } from '../motion';
import { usePalette } from '../palette';
import { BlobShadow, CaptionPlate, InkEdges, Plinth } from '../primitives';
import { labelTexture } from '../textures';

const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

/** Sheet-coordinate → meters (concept: axono blocks at 1:160 of their px coords). */
const S = 1 / 160;
const STAGE_X = [-2.7, -0.9, 0.9, 2.7];
/** How many lifts stand at each stop (exempt base always present). */
const LIFTS_AT = [1, 2, 2, 3];
/** Vertical throw per lift when a stage is exploded apart into an assembly drawing. */
const EXPLODE_GAP = 0.28;
const ARTIFACT_AT: Record<number, string> = { 1: 'THE FIVE FLOORS', 2: 'LE-RESTAURANT', 3: 'STEVTECH' };

type LabelMaps = Map<string, THREE.CanvasTexture>;
type Palette = ReturnType<typeof usePalette>;

interface TimelineHallProps {
  reducedMotion: boolean;
  subStop: number;
  onSelectStage: (i: number) => void;
}

interface AssemblyStageProps {
  index: number;
  x: number;
  wp: SemesterWaypoint;
  lifts: number;
  artifact?: string;
  active: boolean;
  hover: boolean;
  reducedMotion: boolean;
  onHover: (h: boolean) => void;
  onSelect: () => void;
  pal: Palette;
  labelMaps: LabelMaps;
  /** One engraving per highlight — stamped on the top lift's +Z faces. */
  faceMarks: THREE.CanvasTexture[];
  exemptColor: string;
}

/**
 * One stage of the degree-building, read as an exploded axonometric assembly
 * (bible 04/L1-TIMELINE, Direction B). At rest the semester floor-plates stand
 * pulled apart up the assembly axis, joined to their seated slots by dashed
 * graphite leaders; when the stage is focused (active) or hovered they slide
 * home on the ink ease and the leaders retract. The exempt base is found
 * structure — it never assembles.
 */
function AssemblyStage({
  index,
  x,
  wp,
  lifts,
  artifact,
  active,
  hover,
  reducedMotion,
  onHover,
  onSelect,
  pal,
  labelMaps,
  faceMarks,
  exemptColor,
}: AssemblyStageProps) {
  const invalidate = useThree((s) => s.invalidate);
  // Assemble progress: 0 = exploded (parts apart), 1 = seated (built).
  const [p, setP] = useState(active ? 1 : 0);
  const pRef = useRef(active ? 1 : 0);

  useEffect(() => {
    const target = active || hover ? 1 : 0;
    if (reducedMotion) {
      pRef.current = target;
      setP(target);
      invalidate();
      return;
    }
    const o = { v: pRef.current };
    const tw = gsap.to(o, {
      v: target,
      duration: DUR.assemble,
      ease: EASE_INK,
      onUpdate: () => {
        pRef.current = o.v;
        setP(o.v);
        invalidate();
      },
    });
    return () => {
      tw.kill();
    };
  }, [active, hover, reducedMotion, invalidate]);

  const seated = p > 0.98;
  const attention = hover || active;
  const markLines = wp.highlights.map(
    (h) => `${h.short} · ${formatMark(h.mark, h.grade, 'en')}`.toUpperCase(),
  );

  return (
    <group position={[x, 0, 0]}>
      <Plinth
        width={1.2}
        depth={1.2}
        hover={hover}
        onHover={onHover}
        onClick={onSelect}
      >
        <BlobShadow position={[0.12 * (index + 1), 0.045, 0.1]} width={0.8 + 0.14 * index} depth={0.7} opacity={0.14} />

        {/* Exempt base — existing structure, retained; half-sunk, unstamped, never assembled */}
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

        {/* The lifts — exploded apart at rest, sliding home as p → 1; top faces stamped */}
        {AXONO_LAYERS.slice(1, 1 + lifts).map((layer, k) => {
          const dy = (1 - p) * EXPLODE_GAP * (k + 1);
          const isTopLift = k === lifts - 1;
          return (
            <group key={layer.id} position={[0, 0.16 + k * 0.34 + dy, 0]}>
              {/* Assembly leader — the dashed centre-line back to the seated slot */}
              {!seated && (
                <Line
                  points={[v(0, 0, 0), v(0, -dy, 0)]}
                  color={pal.graphite}
                  lineWidth={0.6}
                  dashed
                  dashSize={0.05}
                  gapSize={0.03}
                />
              )}
              {layer.blocks.map((b, bi) => {
                const hw = (b.size * S) / 2;
                const hh = (b.height * S) / 2;
                /* Mark stamps live on the camera-facing (+Z) face, proud of the
                   mass — never buried behind sibling boxes (bible 10 · L1). */
                const showFaceMark = attention && isTopLift && faceMarks[bi];
                return (
                  <group
                    key={b.label}
                    position={[(b.left + b.size / 2) * S - 0.55, 0, (b.top + b.size / 2) * S - 0.55]}
                  >
                    <mesh position={[0, hh, 0]}>
                      <boxGeometry args={[b.size * S, b.height * S, b.size * S]} />
                      <meshStandardMaterial color={pal.resin} roughness={0.72} />
                      <InkEdges />
                    </mesh>
                    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, b.height * S + 0.002, 0]}>
                      <planeGeometry args={[b.size * S * 0.92, (b.size * S * 0.92) / 2]} />
                      <meshStandardMaterial
                        map={labelMaps.get(b.label) ?? null}
                        roughness={0.75}
                        toneMapped={false}
                      />
                    </mesh>
                    {showFaceMark && (
                      <mesh position={[0, hh, hw + 0.006]}>
                        <planeGeometry args={[b.size * S * 0.9, Math.min(hh * 1.4, 0.12)]} />
                        <meshStandardMaterial
                          map={faceMarks[bi]}
                          roughness={0.75}
                          toneMapped={false}
                          depthTest
                          polygonOffset
                          polygonOffsetFactor={-1}
                          polygonOffsetUnits={-1}
                        />
                      </mesh>
                    )}
                  </group>
                );
              })}
            </group>
          );
        })}

        {/* Delivered fixture — nameplate reads once the stage is assembled */}
        {artifact && p > 0.6 && (
          <mesh position={[0.63, 0.3 + 0.18 * index, 0.2]}>
            <boxGeometry args={[0.03, 0.07, 0.24]} />
            <meshStandardMaterial color={pal.alum} roughness={0.4} metalness={0.1} />
            <InkEdges />
          </mesh>
        )}
      </Plinth>

      {/* Session datum, ruled above the stage */}
      <CaptionPlate position={[-0.3, 1.62, 0]} lines={[wp.session]} />

      {/* Grade schedule — Html plate clear of the mass so boxes cannot occlude it */}
      {attention && (
        <CaptionPlate position={[0.95, 1.15, 0.45]} lines={markLines} note={hover} wrap />
      )}

      {artifact && attention && (
        <CaptionPlate position={[0.7, 0.35 + 0.18 * index, 0.2]} lines={[artifact]} />
      )}
    </group>
  );
}

/**
 * L1 · The Construction Hall (bible 04/L1-TIMELINE, concept sheet dims).
 * One degree-building aging across four plinths: the exempt base half-sunk and
 * unstamped, and — Direction B — each stage's lifts standing as an exploded
 * axonometric that assembles home under attention, artifact nameplates on the
 * flanks, and the completion plate hung over the topped-out stage.
 */
export function TimelineHall({ subStop, onSelectStage, reducedMotion }: TimelineHallProps) {
  const pal = usePalette();
  const [hovered, setHovered] = useState<number | null>(null);
  const exemptColor = useMemo(
    () => '#' + new THREE.Color(pal.concrete).multiplyScalar(0.82).getHexString(),
    [pal.concrete],
  );
  // Block top-face stamps (bible 10 · first engravings): one texture per
  // unique label, shared across all four stages; regenerated per print.
  const labelMaps = useMemo(() => {
    const m: LabelMaps = new Map();
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
  // Per-highlight face stamps for the top lift (bible 10 · L1 mark stamps)
  const faceMarkSets = useMemo(
    () =>
      SEMESTER_WAYPOINTS.map((wp) =>
        wp.highlights.map((h) =>
          labelTexture(
            [`${h.short} · ${formatMark(h.mark, h.grade, 'en')}`],
            { paper: pal.resin, ink: pal.graphite },
            { w: 512, h: 96, size: 26 },
          ),
        ),
      ),
    [pal.resin, pal.graphite],
  );
  useEffect(
    () => () => {
      labelMaps.forEach((t) => t.dispose());
      completionMap.dispose();
      faceMarkSets.forEach((set) => set.forEach((t) => t.dispose()));
    },
    [labelMaps, completionMap, faceMarkSets],
  );

  return (
    <group position={[0, 0.15, 0]}>
      {/* The datum — one hairline tying all four stages */}
      <Line
        points={[v(-3.6, 1.55, 0), v(3.6, 1.55, 0)]}
        color={pal.graphite}
        lineWidth={0.6}
      />

      {STAGE_X.map((x, i) => (
        <AssemblyStage
          key={SEMESTER_WAYPOINTS[i].id}
          index={i}
          x={x}
          wp={SEMESTER_WAYPOINTS[i]}
          lifts={LIFTS_AT[i]}
          artifact={ARTIFACT_AT[i]}
          active={subStop === i}
          hover={hovered === i}
          reducedMotion={reducedMotion}
          onHover={(h) => setHovered(h ? i : null)}
          onSelect={() => onSelectStage(i)}
          pal={pal}
          labelMaps={labelMaps}
          faceMarks={faceMarkSets[i]!}
          exemptColor={exemptColor}
        />
      ))}

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
