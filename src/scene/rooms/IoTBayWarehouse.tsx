import { useEffect, useMemo, useState } from 'react';
import * as THREE from 'three';
import { usePalette } from '../palette';
import { BlobShadow, CaptionPlate, FlowTrace, InkEdges, Plinth } from '../primitives';
import { gridTexture, labelTexture } from '../textures';
import type { RoomBlockProps } from './types';

const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

/**
 * A-102 · The Order Warehouse (bible 04/L2-LAB-IOTBAY, concept sheet dims).
 * Three parallel racks (interface / logic / data with eight identical DAO
 * bays), the picking route, and the CI gantry at the dispatch end — the
 * building's only two-flow room: hover the racks for the request, hover the
 * gantry for the release. The Tailwind plate sits off-route, unconnected.
 */
export function IoTBayWarehouse({ hover, entered, reducedMotion, onClick, onHover }: RoomBlockProps) {
  const pal = usePalette();
  const [gantryHover, setGantryHover] = useState(false);

  // Picking route in diagram order: JSP → Servlets → Services → DAO → SQLite.
  const pickingPath = useMemo(
    () => [
      v(-0.3, 0.2, 0.6),
      v(-0.3, 0.5, 0.6),
      v(-0.7, 0.5, 0.05),
      v(-0.7, 0.34, 0.05),
      v(0.3, 0.34, 0.05),
      v(0.3, 0.34, -0.35),
      v(-0.01, 0.3, -0.35),
      v(-0.01, 0.3, -0.7),
      v(-0.1, 0.3, -0.7),
    ],
    [],
  );
  // Release conveyor: push → GH Actions → 118 E2E → Docker image → GHCR.
  const conveyorPath = useMemo(
    () => [v(1.5, 0.7, -0.6), v(1.5, 0.7, 0.35), v(1.72, 0.7, 0.55), v(1.72, 0.32, 0.55)],
    [],
  );
  const restRuns = useMemo(() => [pickingPath, conveyorPath], [pickingPath, conveyorPath]);

  const bays = useMemo(
    () => Array.from({ length: 8 }, (_, i) => -1.29 + i * 0.32),
    [],
  );

  // The gantry's engraved tally — inspection counted on the beam (bible 10).
  const tallyMap = useMemo(
    () => labelTexture(['118 E2E · 14 SEC'], { paper: pal.alum, ink: pal.graphite }, { size: 30, w: 512, h: 96 }),
    [pal.alum, pal.graphite],
  );
  // One engraving across the DAO rack face — eight ruled cells (bible 10).
  const bayGrid = useMemo(() => gridTexture(8, 1, pal.graphite), [pal.graphite]);
  useEffect(
    () => () => {
      tallyMap.dispose();
      bayGrid.dispose();
    },
    [tallyMap, bayGrid],
  );

  return (
    <group>
      <Plinth width={3.6} depth={1.9} hover={hover} onHover={onHover} onClick={onClick}>
        <BlobShadow position={[-0.2, 0.045, 0.05]} width={2.9} depth={1.1} opacity={0.12} />
        <BlobShadow position={[1.5, 0.046, 0]} width={0.7} depth={1.3} opacity={0.16} />

        {/* Interface rack — the long low shelf face customers touch */}
        <mesh position={[-0.3, 0.16, 0.6]}>
          <boxGeometry args={[2.6, 0.12, 0.35]} />
          <meshStandardMaterial color={pal.alum} roughness={0.5} metalness={0.1} />
          <InkEdges />
        </mesh>

        {/* Logic rack — Servlets shoulder to shoulder with Services, tallest row */}
        <mesh position={[-0.7, 0.34, 0.05]}>
          <boxGeometry args={[0.5, 0.6, 0.4]} />
          <meshStandardMaterial color={pal.alum} roughness={0.45} metalness={0.1} />
          <InkEdges />
        </mesh>
        <mesh position={[0.3, 0.29, 0.05]}>
          <boxGeometry args={[0.4, 0.5, 0.4]} />
          <meshStandardMaterial color={pal.alum} roughness={0.45} metalness={0.1} />
          <InkEdges />
        </mesh>

        {/* Data rack — eight identical DAO bays on strict centers; every bay
            carries its edge, so sameness reads as ruled dividers */}
        {bays.map((x) => (
          <mesh key={x} position={[x, 0.24, -0.35]}>
            <boxGeometry args={[0.28, 0.4, 0.3]} />
            <meshStandardMaterial color={pal.alum} roughness={0.5} metalness={0.1} />
            <InkEdges />
          </mesh>
        ))}
        {/* Hairline dividers — one engraving, eight ruled cells across the bay face */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-0.17, 0.445, -0.35]}>
          <planeGeometry args={[2.52, 0.26]} />
          <meshBasicMaterial map={bayGrid} transparent depthWrite={false} />
        </mesh>
        {/* — and the SQLite store everything finally rests on */}
        <mesh position={[-0.1, 0.19, -0.7]}>
          <boxGeometry args={[2.4, 0.3, 0.4]} />
          <meshStandardMaterial color={pal.alum} roughness={0.55} metalness={0.1} />
          <InkEdges />
        </mesh>

        {/* Tailwind plate — styling only, no riser, off the picking route */}
        <mesh position={[-1.5, 0.07, 0.72]}>
          <boxGeometry args={[0.35, 0.06, 0.35]} />
          <meshStandardMaterial color={pal.resin} roughness={0.7} />
          <InkEdges />
        </mesh>

        {/* The CI gantry — nothing leaves this building unexamined */}
        <group
          onPointerOver={(e) => {
            e.stopPropagation();
            setGantryHover(true);
          }}
          onPointerOut={() => setGantryHover(false)}
        >
          <mesh position={[1.5, 0.59, -0.55]}>
            <boxGeometry args={[0.15, 1.1, 0.15]} />
            <meshStandardMaterial
              color={gantryHover ? pal.signal : pal.alum}
              roughness={0.45}
              metalness={0.1}
            />
            <InkEdges />
          </mesh>
          <mesh position={[1.5, 0.59, 0.55]}>
            <boxGeometry args={[0.15, 1.1, 0.15]} />
            <meshStandardMaterial
              color={gantryHover ? pal.signal : pal.alum}
              roughness={0.45}
              metalness={0.1}
            />
            <InkEdges />
          </mesh>
          <mesh position={[1.5, 1.16, 0]}>
            <boxGeometry args={[0.18, 0.12, 1.25]} />
            <meshStandardMaterial
              color={gantryHover ? pal.signal : pal.alum}
              roughness={0.45}
              metalness={0.1}
            />
            <InkEdges />
          </mesh>
          {/* The inspection tally, engraved on the beam's inner face */}
          <mesh position={[1.408, 1.16, 0]} rotation={[0, -Math.PI / 2, 0]}>
            <planeGeometry args={[0.9, 0.1]} />
            <meshStandardMaterial map={tallyMap} roughness={0.6} toneMapped={false} />
          </mesh>
        </group>

        {/* The shipped artifact — one container that cleared inspection;
            its edge may be firm (bible 10: medium weight) */}
        <mesh position={[1.72, 0.165, 0.55]}>
          <boxGeometry args={[0.3, 0.25, 0.25]} />
          <meshStandardMaterial color={pal.alum} roughness={0.5} metalness={0.1} />
          <InkEdges />
        </mesh>

        {/* Two flows, never both at once: the route, or the release */}
        <FlowTrace
          restRuns={restRuns}
          path={gantryHover ? conveyorPath : pickingPath}
          active={hover}
          reducedMotion={reducedMotion}
        />
      </Plinth>

      {entered && (
        <>
          <CaptionPlate
            position={[1.6, 1.4, 0]}
            lines={['CI', 'PUSH → GH ACTIONS → 118 E2E → DOCKER IMAGE → GHCR']}
          />
          <CaptionPlate position={[-1.75, 0.28, 0.72]} lines={['TAILWIND · STYLING ONLY · NO RISER']} />
        </>
      )}
    </group>
  );
}
