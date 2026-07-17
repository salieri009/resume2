import { Line } from '@react-three/drei';
import { useMemo } from 'react';
import * as THREE from 'three';
import { usePalette } from '../palette';
import { BlobShadow, CaptionPlate, FlowTrace, InkEdges, Plinth } from '../primitives';
import type { RoomBlockProps } from './types';

const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

/**
 * A-101 · The Crowd Observatory (bible 04/L2-LAB-CROWD, concept sheet dims).
 * Three registers on a plinth: infrastructure plate, services (gateway + eye),
 * interface (React mass + alert emitter) — and the training annex outside the
 * boundary, connected to nothing. Blue never reaches the annex.
 */
export function CrowdObservatory({ hover, entered, reducedMotion, onClick, onHover }: RoomBlockProps) {
  const pal = usePalette();
  // Signal path runs in diagram order: React UI → Spring Boot gateway →
  // FastAPI·YOLO eye → Proximity Alerts. Containment risers stay graphite.
  const restRuns = useMemo(
    () => [
      [v(0.3, 1.14, 0.3), v(0.3, 1.06, 0.3), v(0.35, 1.06, 0.4)],
      [v(-0.4, 0.86, -0.2), v(-0.4, 1.14, -0.2), v(-0.55, 1.14, 0.05)],
      [v(0.125, 0.45, 0.4), v(0.02, 0.45, 0.4), v(0.02, 0.45, -0.2), v(-0.1, 0.45, -0.2)],
      [v(0.575, 0.5, 0.4), v(0.575, 0.16, 0.4)],
      [v(-0.7, 0.42, -0.2), v(-0.7, 0.16, -0.2)],
    ],
    [],
  );
  const signalPath = useMemo(
    () => [
      v(0.3, 1.24, 0.3),
      v(0.3, 1.06, 0.3),
      v(0.35, 1.06, 0.4),
      v(0.35, 0.45, 0.4),
      v(0.02, 0.45, 0.4),
      v(0.02, 0.45, -0.2),
      v(-0.4, 0.45, -0.2),
      v(-0.4, 0.86, -0.2),
      v(-0.4, 1.14, -0.2),
      v(-0.55, 1.14, 0.05),
      v(-0.55, 1.23, 0.05),
    ],
    [],
  );

  return (
    <group>
      <Plinth width={3.2} depth={2.4} hover={hover} onHover={onHover} onClick={onClick}>
        {/* Authored model-shadows — reading order in shadow: tallest palest */}
        <BlobShadow position={[0, 0.045, 0.05]} width={2.2} depth={1.5} opacity={0.12} />
        <BlobShadow position={[0.35, 0.046, 0.4]} width={0.75} depth={0.7} opacity={0.2} />
        <BlobShadow position={[-0.4, 0.046, -0.2]} width={0.95} depth={0.8} opacity={0.18} />
        <BlobShadow position={[0.3, 0.047, 0.3]} width={1.05} depth={0.55} opacity={0.1} />
        <BlobShadow position={[-0.55, 0.047, 0.05]} width={0.55} depth={0.4} opacity={0.09} />

        {/* Infrastructure register — the Docker containment plate */}
        <mesh position={[0, 0.1, 0.05]}>
          <boxGeometry args={[1.9, 0.12, 1.2]} />
          <meshStandardMaterial color={pal.alum} roughness={0.5} metalness={0.1} />
          <InkEdges />
        </mesh>

        {/* Services register — the gateway, square-shouldered and foremost */}
        <mesh position={[0.35, 0.61, 0.4]}>
          <boxGeometry args={[0.45, 0.9, 0.45]} />
          <meshStandardMaterial color={pal.alum} roughness={0.45} metalness={0.1} />
          <InkEdges />
        </mesh>
        {/* — and the inference eye, aimed along the plinth's long axis */}
        <mesh position={[-0.4, 0.51, -0.2]}>
          <boxGeometry args={[0.6, 0.7, 0.5]} />
          <meshStandardMaterial color={pal.alum} roughness={0.45} metalness={0.1} />
          <InkEdges />
        </mesh>
        {/* The slit aperture — a rectangle of held shade, not a glow —
            with its engraved reveal: the eye's frame (bible 10 punch list) */}
        <mesh position={[-0.09, 0.61, -0.2]}>
          <boxGeometry args={[0.02, 0.04, 0.5]} />
          <meshStandardMaterial color={pal.shade} roughness={1} metalness={0} />
        </mesh>
        <Line
          points={[
            v(-0.098, 0.57, -0.47),
            v(-0.098, 0.65, -0.47),
            v(-0.098, 0.65, 0.07),
            v(-0.098, 0.57, 0.07),
            v(-0.098, 0.57, -0.47),
          ]}
          color={pal.graphite}
          lineWidth={0.7}
        />

        {/* Interface register — slender, lifted where a face would meet it */}
        <mesh position={[0.3, 1.24, 0.3]}>
          <boxGeometry args={[0.7, 0.2, 0.15]} />
          <meshStandardMaterial color={pal.alum} roughness={0.45} metalness={0.1} />
          <InkEdges />
        </mesh>
        <mesh position={[-0.55, 1.23, 0.05]}>
          <boxGeometry args={[0.3, 0.18, 0.15]} />
          <meshStandardMaterial color={pal.alum} roughness={0.45} metalness={0.1} />
          <InkEdges />
        </mesh>

        {/* The flows — graphite at rest; the blue current under attention */}
        <FlowTrace
          restRuns={restRuns}
          path={signalPath}
          active={hover}
          reducedMotion={reducedMotion}
        />
      </Plinth>

      {/* The training annex — deliberately, measurably off the plinth.
          No riser, no conduit: training happens elsewhere, on rented ground. */}
      <group>
        <BlobShadow position={[-2.05, -0.038, -1.5]} width={0.6} depth={0.6} opacity={0.15} />
        <mesh position={[-2.05, 0.085, -1.5]}>
          <boxGeometry args={[0.4, 0.25, 0.4]} />
          <meshStandardMaterial color={pal.alum} roughness={0.5} metalness={0.1} />
          <InkEdges />
        </mesh>
        {entered && (
          <>
            <Line
              points={[v(-2.05, 0.215, -1.5), v(-2.05, 0.42, -1.5), v(-1.75, 0.42, -1.5)]}
              color={pal.graphite}
              lineWidth={0.75}
            />
            <CaptionPlate
              position={[-1.7, 0.42, -1.5]}
              lines={['TRAINING', 'JRDB → DVC → SAGEMAKER g5 → best.pt → CONTAINER']}
            />
          </>
        )}
      </group>
    </group>
  );
}
