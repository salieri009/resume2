import { useMemo, useState } from 'react';
import * as THREE from 'three';
import { SKILL_PROOFS, formatProof } from '../../data/academic';
import { usePalette } from '../palette';
import { CaptionPlate, FlowTrace, SoftPatch } from '../primitives';

const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

/** The five trades — full schedule lives in CorePanel; one hover note at a time. */
const RISERS = [
  {
    x: -2,
    letter: 'A · ENTERPRISE',
    proof: formatProof(SKILL_PROOFS.enterprise, 'en'),
    serves: 'SERVES · A-102 IOTBAY',
  },
  {
    x: -1,
    letter: 'B · AI / DEEP LEARNING',
    proof: `${formatProof(SKILL_PROOFS.ai, 'en')} · SAGEMAKER`,
    serves: 'SERVES · A-101 CROWD',
  },
  {
    x: 0,
    letter: 'C · CLOUD & DATA',
    proof: formatProof(SKILL_PROOFS.cloud, 'en'),
    serves: 'SERVES · A-104 GUNDAM',
  },
  {
    x: 1,
    letter: 'D · GRAPHICS',
    proof: formatProof(SKILL_PROOFS.graphics, 'en'),
    serves: 'SERVES · A-103 FARM',
  },
  {
    x: 2,
    letter: 'E · FRONTEND',
    proof: formatProof(SKILL_PROOFS.interactive, 'en'),
    serves: 'SERVES · A-101 CROWD',
  },
] as const;

/**
 * B1 · The Mechanical Core (bible 04/B1-CORE, concept sheet dims).
 * Skills as building services below the opened ground: five risers on meter
 * centers. Full trade / gauge / destination text is the CorePanel schedule —
 * only one in-scene Html caption mounts at a time so plates never stack.
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

  const active = hovered !== null ? RISERS[hovered] : null;

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
      <SoftPatch position={[0.5, -2.19, -0.3]} width={4.5} depth={3.2} opacity={0.22} />

      {RISERS.map((r, i) => {
        const hover = hovered === i;
        return (
          <group
            key={r.letter}
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
            <mesh position={[r.x, -2.12, -0.5]}>
              <boxGeometry args={[0.25, 0.15, 0.25]} />
              <meshStandardMaterial color={dim} roughness={0.9} />
            </mesh>
            <mesh position={[r.x, -1.0, -0.5]}>
              <boxGeometry args={[0.12, 2.1, 0.12]} />
              <meshStandardMaterial color={pal.alum} roughness={0.45} metalness={0.1} />
            </mesh>
            <mesh position={[r.x, -0.02, -0.5]}>
              <boxGeometry args={[0.2, 0.08, 0.2]} />
              <meshStandardMaterial color={pal.alum} roughness={0.4} metalness={0.1} />
            </mesh>
            <mesh position={[r.x, -1.1, -0.34]}>
              <boxGeometry args={[0.3, 0.18, 0.02]} />
              <meshStandardMaterial color={pal.resin} roughness={0.75} />
            </mesh>

            <FlowTrace
              restRuns={[[v(r.x, -2.05, -0.5), v(r.x, 0.35, -0.5)]]}
              path={[v(r.x, -2.05, -0.5), v(r.x, 0.35, -0.5)]}
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
          position={[active.x + 0.35, -0.15, -0.15]}
          lines={[active.letter, active.proof.toUpperCase(), active.serves]}
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
