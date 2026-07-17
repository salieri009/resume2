import { Line } from '@react-three/drei';
import { useMemo } from 'react';
import * as THREE from 'three';
import { usePalette } from '../palette';
import { BlobShadow, CaptionPlate, FlowTrace, InkEdges, Plinth } from '../primitives';
import type { RoomBlockProps } from './types';

const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

/**
 * A-104 · The House (bible 04/L3-LAB-GUNDAM, concept sheet dims).
 * A three-story tower alone on generous ground: PostgreSQL foundation
 * half-sunk, the Chalice floor floating with nothing beneath it (serverless
 * shown, not told), the Next.js top in resin — and the JWT lockset astride
 * the single request spine, where the trace holds one readable beat.
 */
export function GundamHouse({ hover, entered, reducedMotion, onClick, onHover }: RoomBlockProps) {
  const pal = usePalette();

  // One spine, top to foundation. The held beat sits at the lockset:
  // (1.09 − 0.5) / (1.09 − 0.23) ≈ 0.69 of the descent.
  const spine = useMemo(() => [v(0, 1.09, 0.23), v(0, 0.23, 0.23)], []);

  return (
    <group>
      <Plinth width={1.6} depth={1.6} hover={hover} onHover={onHover} onClick={onClick}>
        <BlobShadow position={[-0.15, 0.045, -0.12]} width={1.0} depth={0.85} opacity={0.16} />

        {/* Foundation — PostgreSQL, half-sunk: relational, load-bearing ground */}
        <mesh position={[0, 0.105, 0]}>
          <boxGeometry args={[0.7, 0.25, 0.55]} />
          <meshStandardMaterial color={pal.concrete} roughness={0.85} />
          <InkEdges />
        </mesh>
        {/* The floating gap's crisp rule — the shadow of a floor no post holds */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.2331, 0]}>
          <planeGeometry args={[0.5, 0.4]} />
          <meshBasicMaterial color={pal.graphite} transparent opacity={0.22} depthWrite={false} />
        </mesh>

        {/* Middle story — Chalice, floating: a story with no basement stairs */}
        <mesh position={[0, 0.465, 0]}>
          <boxGeometry args={[0.55, 0.35, 0.45]} />
          <meshStandardMaterial color={pal.alum} roughness={0.45} metalness={0.1} />
          <InkEdges />
        </mesh>

        {/* Top story — Next.js, the lived-in floor */}
        <mesh position={[0, 0.865, 0]}>
          <boxGeometry args={[0.5, 0.45, 0.4]} />
          <meshStandardMaterial color={pal.resin} roughness={0.72} />
          <InkEdges />
        </mesh>
        {/* Its one wide opening, scored on the south face — with the leaf and
            threshold tick drawn inside the shade (bible 10 punch list) */}
        <mesh position={[0, 0.82, 0.201]}>
          <boxGeometry args={[0.3, 0.22, 0.01]} />
          <meshStandardMaterial color={pal.shade} roughness={1} metalness={0} />
        </mesh>
        <Line
          points={[
            v(-0.1, 0.725, 0.208),
            v(-0.1, 0.915, 0.208),
            v(0.1, 0.915, 0.208),
            v(0.1, 0.725, 0.208),
          ]}
          color={pal.graphite}
          lineWidth={0.7}
        />
        <Line
          points={[v(-0.03, 0.716, 0.208), v(0.03, 0.716, 0.208)]}
          color={pal.graphite}
          lineWidth={1.2}
        />

        {/* The lockset — hardware on the door, astride the spine */}
        <mesh position={[0, 0.5, 0.24]}>
          <boxGeometry args={[0.09, 0.06, 0.05]} />
          <meshStandardMaterial color={pal.alum} roughness={0.4} metalness={0.1} />
          <InkEdges />
        </mesh>

        {/* The checked descent — pauses at the lock, then continues */}
        <FlowTrace
          restRuns={[spine]}
          path={spine}
          active={hover}
          reducedMotion={reducedMotion}
          heldBeatAt={0.69}
        />
      </Plinth>

      {entered && (
        <CaptionPlate
          position={[0.35, 1.25, 0.3]}
          lines={['AUTH', 'GOOGLE OAUTH → SERVER VERIFY → SHORT-LIVED JWT → REQUEST CHECK']}
        />
      )}
    </group>
  );
}
