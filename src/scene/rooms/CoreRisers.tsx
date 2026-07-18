import { useEffect, useMemo, useState } from 'react';
import * as THREE from 'three';
import { SKILL_PROOFS, formatProof } from '../../data/academic';
import { CORE_RISERS, RISER_GAUGE, type CoreRiser } from '../../data/skills';
import { usePalette } from '../palette';
import { CaptionPlate, FlowTrace, InkEdges, SoftPatch } from '../primitives';
import { labelTexture } from '../textures';

const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

/** Riser x-centers on the meter line (scene layout, not content). */
const riserX = (i: number) => i - 2;
/** The proof reading stamped on a riser's gauge (with any managed-service fitting). */
const riserProof = (id: (typeof CORE_RISERS)[number]['id'], extra?: string) =>
  formatProof(SKILL_PROOFS[id], 'en') + (extra ? ` · ${extra.toUpperCase()}` : '');

/**
 * Each trade's fitting — the riser reads by its own form, not a bolted plate:
 * Enterprise a heavy bolted flange, AI an instrument dial, Cloud a valve
 * handwheel, Graphics a faceted render-lens, Frontend a wiring junction. All
 * brushed aluminum (the room's one material); only the form changes.
 */
function RiserFitting({
  id,
  x,
  g,
  pal,
}: {
  id: CoreRiser['id'];
  x: number;
  g: number;
  pal: ReturnType<typeof usePalette>;
}) {
  const y = -0.62;
  const zf = -0.5 + g / 2;
  const metal = { color: pal.alum, roughness: 0.4, metalness: 0.12 } as const;
  switch (id) {
    case 'enterprise':
      // A heavy bolted flange — two discs clamping the backbone.
      return (
        <group position={[x, y, -0.5]}>
          <mesh position={[0, 0.055, 0]}>
            <cylinderGeometry args={[g * 0.98, g * 0.98, 0.035, 20]} />
            <meshStandardMaterial {...metal} />
            <InkEdges />
          </mesh>
          <mesh position={[0, -0.055, 0]}>
            <cylinderGeometry args={[g * 0.98, g * 0.98, 0.035, 20]} />
            <meshStandardMaterial {...metal} />
            <InkEdges />
          </mesh>
        </group>
      );
    case 'ai':
      // An instrument dial head, turned to face the aisle.
      return (
        <mesh position={[x, y, zf + 0.028]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.075, 0.075, 0.05, 24]} />
          <meshStandardMaterial color={pal.alum} roughness={0.28} metalness={0.15} />
          <InkEdges />
        </mesh>
      );
    case 'cloud':
      // A valve handwheel on the flank.
      return (
        <mesh position={[x + g / 2 + 0.05, y, -0.5]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.07, 0.014, 10, 24]} />
          <meshStandardMaterial {...metal} />
        </mesh>
      );
    case 'graphics':
      // A faceted render-lens.
      return (
        <mesh position={[x, y, zf + 0.05]} rotation={[0.4, 0.5, 0]}>
          <octahedronGeometry args={[0.07]} />
          <meshStandardMaterial color={pal.alum} roughness={0.22} metalness={0.16} />
          <InkEdges threshold={1} />
        </mesh>
      );
    case 'interactive':
      // A wiring junction box.
      return (
        <mesh position={[x, y, zf + 0.03]}>
          <boxGeometry args={[0.16, 0.11, 0.06]} />
          <meshStandardMaterial {...metal} />
          <InkEdges />
        </mesh>
      );
    default:
      return null;
  }
}

/**
 * B1 · The Mechanical Core (bible 04/B1-CORE, concept sheet dims).
 * Skills as building services below the opened ground: five risers on meter
 * centers, each in its own gauge — Enterprise the heaviest — carrying its
 * trade's tool stencil, proof gauge, and destination plate. Every pipe goes
 * somewhere. Only one in-scene Html caption mounts at a time.
 */
export function CoreRisers({ reducedMotion }: { reducedMotion: boolean }) {
  const pal = usePalette();
  const [hovered, setHovered] = useState<number | null>(null);
  const [intercomHover, setIntercomHover] = useState(false);
  const dim = useMemo(
    () => '#' + new THREE.Color(pal.concrete).multiplyScalar(0.55).getHexString(),
    [pal.concrete],
  );
  const dimmer = useMemo(
    () => '#' + new THREE.Color(pal.concrete).multiplyScalar(0.4).getHexString(),
    [pal.concrete],
  );

  const active = hovered !== null ? CORE_RISERS[hovered] : null;

  // Stencil voice on the metal (bible 10): the big trade letter, the trade's
  // tool list, the proof gauge, and the destination plate — one texture set
  // per riser, disposed on unmount / palette change.
  const letterMaps = useMemo(
    () =>
      CORE_RISERS.map((r) =>
        labelTexture([r.letter], { paper: pal.alum, ink: pal.graphite }, { w: 128, h: 128, size: 72 }),
      ),
    [pal.alum, pal.graphite],
  );
  const gaugeMaps = useMemo(
    () =>
      CORE_RISERS.map((r) =>
        labelTexture(riserProof(r.id, r.extra).split(' · '), { paper: pal.resin, ink: pal.graphite }, { w: 256, h: 160, size: 30 }),
      ),
    [pal.resin, pal.graphite],
  );
  const destMaps = useMemo(
    () =>
      CORE_RISERS.map((r) =>
        labelTexture([`SERVES · ${r.serves.tag}`], { paper: pal.alum, ink: pal.graphite }, { w: 384, h: 84, size: 26 }),
      ),
    [pal.alum, pal.graphite],
  );
  useEffect(
    () => () => {
      [...letterMaps, ...gaugeMaps, ...destMaps].forEach((t) => t.dispose());
    },
    [letterMaps, gaugeMaps, destMaps],
  );

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.2, -0.5]}>
        <planeGeometry args={[6.5, 5]} />
        <meshStandardMaterial color={dim} roughness={0.95} />
      </mesh>
      <mesh position={[0, -1.1, -2.9]}>
        <boxGeometry args={[6.5, 2.3, 0.1]} />
        <meshStandardMaterial color={dimmer} roughness={0.95} />
      </mesh>
      <SoftPatch position={[0.5, -2.19, -0.3]} width={4.5} depth={3.2} opacity={0.28} />

      {CORE_RISERS.map((r, i) => {
        const hover = hovered === i;
        const x = riserX(i);
        const g = RISER_GAUGE[r.id];
        // The pipe's camera-facing face — the big letter stencil rides here.
        const zFace = -0.5 + g / 2 + 0.001;
        return (
          <group
            key={r.id}
            onPointerOver={(e) => {
              e.stopPropagation();
              document.body.style.cursor = 'crosshair';
              setHovered(i);
              setIntercomHover(false);
            }}
            onPointerOut={() => {
              document.body.style.cursor = '';
              setHovered((p) => (p === i ? null : p));
            }}
          >
            {/* Concrete thimble — scaled to the riser's gauge */}
            <mesh position={[x, -2.12, -0.5]}>
              <boxGeometry args={[g + 0.13, 0.15, g + 0.13]} />
              <meshStandardMaterial color={dim} roughness={0.9} />
              <InkEdges />
            </mesh>
            {/* The riser — Enterprise the heaviest gauge (bible B1) */}
            <mesh position={[x, -1.0, -0.5]}>
              <boxGeometry args={[g, 2.1, g]} />
              <meshStandardMaterial color={pal.alum} roughness={0.45} metalness={0.1} />
              <InkEdges />
            </mesh>
            {/* Slab sleeve */}
            <mesh position={[x, -0.02, -0.5]}>
              <boxGeometry args={[g + 0.06, 0.08, g + 0.06]} />
              <meshStandardMaterial color={pal.alum} roughness={0.4} metalness={0.1} />
              <InkEdges />
            </mesh>
            {/* Trade letter, stencilled on the metal near the top */}
            <mesh position={[x, -0.24, zFace]}>
              <planeGeometry args={[g * 0.72, g * 0.72]} />
              <meshStandardMaterial map={letterMaps[i] ?? null} roughness={0.55} toneMapped={false} />
            </mesh>
            {/* The trade's fitting — each riser reads by its own form, not a
                bolted placard (enterprise flange, AI dial, cloud valve, …). */}
            <RiserFitting id={r.id} x={x} g={g} pal={pal} />
            {/* Gauge dial — the proof mark, stamped small on the face */}
            <mesh position={[x, -1.1, -0.34]}>
              <boxGeometry args={[0.3, 0.18, 0.02]} />
              <meshStandardMaterial color={pal.resin} roughness={0.75} />
              <InkEdges />
            </mesh>
            <mesh position={[x, -1.1, -0.328]}>
              <planeGeometry args={[0.28, 0.16]} />
              <meshStandardMaterial map={gaugeMaps[i] ?? null} roughness={0.75} toneMapped={false} />
            </mesh>
            {/* Destination plate — where this riser serves, fixed to the flank */}
            <mesh position={[x, -1.62, -0.34]}>
              <boxGeometry args={[0.5, 0.11, 0.02]} />
              <meshStandardMaterial color={pal.alum} roughness={0.4} metalness={0.1} />
              <InkEdges />
            </mesh>
            <mesh position={[x, -1.62, -0.328]}>
              <planeGeometry args={[0.46, 0.09]} />
              <meshStandardMaterial map={destMaps[i] ?? null} roughness={0.55} toneMapped={false} />
            </mesh>

            <FlowTrace
              restRuns={[[v(x, -2.05, -0.5), v(x, 0.35, -0.5)]]}
              path={[v(x, -2.05, -0.5), v(x, 0.35, -0.5)]}
              active={hover}
              reducedMotion={reducedMotion}
              duration={0.8}
            />
          </group>
        );
      })}

      {active && (
        <CaptionPlate
          /* Near the slab cut so the lifted note stays inside the frame */
          position={[riserX(hovered ?? 0) + 0.35, -0.15, -0.15]}
          lines={[
            `${active.letter} · ${active.trade}`,
            riserProof(active.id, active.extra).toUpperCase(),
            `SERVES · ${active.serves.tag}`,
          ]}
          note
          wrap
        />
      )}

      <group
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'crosshair';
          setIntercomHover(true);
          setHovered(null);
        }}
        onPointerOut={() => {
          document.body.style.cursor = '';
          setIntercomHover(false);
        }}
      >
        <mesh position={[0, -1.45, -2.8]}>
          <boxGeometry args={[5.8, 0.05, 0.05]} />
          <meshStandardMaterial color={pal.alum} roughness={0.5} metalness={0.1} />
        </mesh>
        {intercomHover && (
          <CaptionPlate
            position={[0.2, -0.7, -2.4]}
            lines={[
              'F · INTERCOM',
              'KO NATIVE · EN FLUENT · JA / DE LEARNING',
              'ROK ARMY · INTERPRETER · SERVES · L4 LIBRARY',
            ]}
            note
            wrap
          />
        )}
      </group>
    </group>
  );
}
