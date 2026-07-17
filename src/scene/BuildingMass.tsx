import { Line } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { useEffect, useMemo, useRef, type ReactNode } from 'react';
import * as THREE from 'three';
import { DUR, EASE_INK, EASE_SITE } from './motion';
import { ALUM, CONCRETE, GLASS, GRAPHITE, GRID, PAPER, RESIN, SHADE } from './palette';
import { BlobShadow, CaptionPlate, FlowTrace, partialPolyline, Plinth } from './primitives';

interface BuildingMassProps {
  /** 0 = footprint line only, 1 = full extrude */
  extrude: number;
  /** 0–1 CAD ink progress for footprint */
  ink?: number;
  showLab: boolean;
  labHover: boolean;
  /** True when the visitor stands at the room's own station (captions legible). */
  labEntered?: boolean;
  onLabClick?: () => void;
  onLabHover?: (h: boolean) => void;
  reducedMotion?: boolean;
}

/** Footprint rectangle in XZ (meters — bible 02: 8 × 6). */
const FW = 8;
const FD = 6;

export function BuildingMass({
  extrude,
  ink = 1,
  showLab,
  labHover,
  labEntered = false,
  onLabClick,
  onLabHover,
  reducedMotion = false,
}: BuildingMassProps) {
  const group = useRef<THREE.Group>(null);
  const wallH = 0.15 + extrude * 3.4;
  // Isolate (bible 05): at a room's own station the selected exhibit holds
  // full presence while the rest of the building thins toward line.
  const shellFade = labEntered;
  const shellOpacity = shellFade ? 0.12 : 1;

  const footprintPts = useMemo(() => {
    const full = [
      new THREE.Vector3(-FW / 2, 0.02, -FD / 2),
      new THREE.Vector3(FW / 2, 0.02, -FD / 2),
      new THREE.Vector3(FW / 2, 0.02, FD / 2),
      new THREE.Vector3(-FW / 2, 0.02, FD / 2),
      new THREE.Vector3(-FW / 2, 0.02, -FD / 2),
    ];
    return partialPolyline(full, ink);
  }, [ink]);

  return (
    <group ref={group}>
      {/* Ground plane — paper sheet */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color={PAPER} roughness={0.92} metalness={0} />
      </mesh>

      {/* Graphite grid — blueprint discipline, not neon */}
      <GridLines />

      {/* Footprint ink */}
      <Line points={footprintPts} color={GRAPHITE} lineWidth={1.5} />

      {extrude > 0.02 && (
        <>
          {/* Slabs */}
          <mesh position={[0, 0.05, 0]}>
            <boxGeometry args={[FW, 0.1, FD]} />
            <meshStandardMaterial color={CONCRETE} roughness={0.85} />
          </mesh>
          <mesh position={[0, wallH * 0.55, 0]}>
            <boxGeometry args={[FW * 0.98, 0.08, FD * 0.98]} />
            <meshStandardMaterial
              color={RESIN}
              roughness={0.7}
              transparent={shellFade}
              opacity={shellOpacity}
            />
          </mesh>
          <mesh position={[0, wallH, 0]}>
            <boxGeometry args={[FW, 0.12, FD]} />
            <meshStandardMaterial
              color={CONCRETE}
              roughness={0.8}
              transparent={shellFade}
              opacity={shellOpacity}
            />
          </mesh>

          {/* Walls */}
          <Wall x={0} z={-FD / 2} w={FW} h={wallH} d={0.12} opacity={shellOpacity} fade={shellFade} />
          <Wall x={0} z={FD / 2} w={FW} h={wallH} d={0.12} opacity={shellOpacity} fade={shellFade} />
          <Wall x={-FW / 2} z={0} w={0.12} h={wallH} d={FD} opacity={shellOpacity} fade={shellFade} />
          <Wall x={FW / 2} z={0} w={0.12} h={wallH} d={FD} opacity={shellOpacity} fade={shellFade} />

          {/* Columns */}
          {[
            [-FW / 2 + 0.4, FD / 2 - 0.4],
            [FW / 2 - 0.4, FD / 2 - 0.4],
            [-FW / 2 + 0.4, -FD / 2 + 0.4],
            [FW / 2 - 0.4, -FD / 2 + 0.4],
          ].map(([cx, cz], i) => (
            <mesh key={i} position={[cx, wallH / 2, cz]}>
              <boxGeometry args={[0.22, wallH, 0.22]} />
              <meshStandardMaterial
                color={ALUM}
                roughness={0.45}
                metalness={0.35}
                transparent={shellFade}
                opacity={shellOpacity}
              />
            </mesh>
          ))}

          {/* Glass curtain (lobby front — 55% width, 70% height per bible L0) */}
          <mesh position={[0, wallH * 0.45, FD / 2 - 0.02]}>
            <boxGeometry args={[FW * 0.55, wallH * 0.7, 0.04]} />
            <meshStandardMaterial
              color={GLASS}
              transparent
              opacity={shellFade ? 0.08 : 0.35}
              roughness={0.15}
              metalness={0.1}
            />
          </mesh>

          {/* Thesis wall — rear, standing proud with a shadow gap */}
          <mesh position={[0, wallH * 0.5, -FD / 2 + 0.08]}>
            <boxGeometry args={[FW * 0.7, wallH * 0.55, 0.06]} />
            <meshStandardMaterial
              color={RESIN}
              roughness={0.75}
              transparent={shellFade}
              opacity={shellOpacity}
            />
          </mesh>

          {/* Light patch — the curtain's admitted sun on the lobby slab (bible L0):
              the floor's only event, and it never moves. */}
          {extrude > 0.85 && !shellFade && <LightPatch />}
        </>
      )}

      {showLab && extrude > 0.85 && (
        <CrowdObservatory
          hover={labHover}
          entered={labEntered}
          reducedMotion={reducedMotion}
          onClick={onLabClick}
          onHover={onLabHover}
        />
      )}
    </group>
  );
}

function Wall({
  x,
  z,
  w,
  h,
  d,
  opacity = 1,
  fade = false,
}: {
  x: number;
  z: number;
  w: number;
  h: number;
  d: number;
  opacity?: number;
  fade?: boolean;
}) {
  return (
    <mesh position={[x, h / 2, z]}>
      <boxGeometry args={[w, h, d]} />
      <meshStandardMaterial color={CONCRETE} roughness={0.88} transparent={fade} opacity={opacity} />
    </mesh>
  );
}

function GridLines() {
  const lines = useMemo(() => {
    const pts: THREE.Vector3[][] = [];
    for (let i = -10; i <= 10; i++) {
      pts.push([new THREE.Vector3(i, 0.005, -10), new THREE.Vector3(i, 0.005, 10)]);
      pts.push([new THREE.Vector3(-10, 0.005, i), new THREE.Vector3(10, 0.005, i)]);
    }
    return pts;
  }, []);
  return (
    <group>
      {lines.map((p, i) => (
        <Line key={i} points={p} color={GRID} lineWidth={0.5} transparent opacity={0.55} />
      ))}
    </group>
  );
}

let lightTex: THREE.CanvasTexture | null = null;
function softLightTexture(): THREE.CanvasTexture {
  if (lightTex) return lightTex;
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const ctx = c.getContext('2d')!;
  const g = ctx.createRadialGradient(64, 64, 12, 64, 64, 64);
  g.addColorStop(0, 'rgba(255, 255, 252, 0.9)');
  g.addColorStop(0.65, 'rgba(255, 255, 252, 0.35)');
  g.addColorStop(1, 'rgba(255, 255, 252, 0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  lightTex = new THREE.CanvasTexture(c);
  return lightTex;
}

function LightPatch() {
  const tex = useMemo(() => softLightTexture(), []);
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.105, 1.6]}>
      <planeGeometry args={[3.2, 2.2]} />
      <meshBasicMaterial map={tex} transparent opacity={0.3} depthWrite={false} />
    </mesh>
  );
}

/**
 * A-101 · The Crowd Observatory (bible 04/L2-LAB-CROWD, concept sheet dims).
 * Three registers on a plinth: infrastructure plate, services (gateway + eye),
 * interface (React mass + alert emitter) — and the training annex outside the
 * boundary, connected to nothing. Blue never reaches the annex.
 */
function CrowdObservatory({
  hover,
  entered,
  reducedMotion,
  onClick,
  onHover,
}: {
  hover: boolean;
  entered: boolean;
  reducedMotion: boolean;
  onClick?: () => void;
  onHover?: (h: boolean) => void;
}) {
  // Conduits — drafting elbows, no curves. Rest runs include the two
  // containment risers (off-path); the signal path runs in diagram order:
  // React UI → Spring Boot gateway → FastAPI·YOLO eye → Proximity Alerts.
  const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
  const restRuns = useMemo(
    () => [
      // interface → services risers
      [v(0.3, 1.14, 0.3), v(0.3, 1.06, 0.3), v(0.35, 1.06, 0.4)],
      [v(-0.4, 0.86, -0.2), v(-0.4, 1.14, -0.2), v(-0.55, 1.14, 0.05)],
      // gateway ↔ eye horizontal run (frames handed to the model)
      [v(0.125, 0.45, 0.4), v(0.02, 0.45, 0.4), v(0.02, 0.45, -0.2), v(-0.1, 0.45, -0.2)],
      // services → containment plate (off the signal path — stay graphite)
      [v(0.575, 0.5, 0.4), v(0.575, 0.16, 0.4)],
      [v(-0.7, 0.42, -0.2), v(-0.7, 0.16, -0.2)],
    ],
    [],
  );
  const signalPath = useMemo(
    () => [
      v(0.3, 1.31, 0.3),
      v(0.3, 1.06, 0.3),
      v(0.35, 1.06, 0.4),
      v(0.35, 0.45, 0.4),
      v(0.02, 0.45, 0.4),
      v(0.02, 0.45, -0.2),
      v(-0.4, 0.45, -0.2),
      v(-0.4, 0.86, -0.2),
      v(-0.4, 1.14, -0.2),
      v(-0.55, 1.14, 0.05),
      v(-0.55, 1.265, 0.05),
    ],
    [],
  );

  return (
    <group position={[0, 1.6, -1.2]}>
      <Plinth width={3.2} depth={2.4} hover={hover} onHover={onHover} onClick={onClick}>
        {/* Authored model-shadows — reading order in shadow: tallest palest */}
        <BlobShadow position={[0, 0.045, 0.05]} width={2.2} depth={1.5} opacity={0.16} />
        <BlobShadow position={[0.35, 0.046, 0.4]} width={0.75} depth={0.7} opacity={0.26} />
        <BlobShadow position={[-0.4, 0.046, -0.2]} width={0.95} depth={0.8} opacity={0.24} />
        <BlobShadow position={[0.3, 0.047, 0.3]} width={1.05} depth={0.55} opacity={0.13} />
        <BlobShadow position={[-0.55, 0.047, 0.05]} width={0.55} depth={0.4} opacity={0.12} />

        {/* Infrastructure register — the Docker containment plate */}
        <mesh position={[0, 0.1, 0.05]}>
          <boxGeometry args={[1.9, 0.12, 1.2]} />
          <meshStandardMaterial color={ALUM} roughness={0.5} metalness={0.3} />
        </mesh>

        {/* Services register — the gateway, square-shouldered and foremost */}
        <mesh position={[0.35, 0.61, 0.4]}>
          <boxGeometry args={[0.45, 0.9, 0.45]} />
          <meshStandardMaterial color={ALUM} roughness={0.45} metalness={0.35} />
        </mesh>
        {/* — and the inference eye, aimed along the plinth's long axis */}
        <mesh position={[-0.4, 0.51, -0.2]}>
          <boxGeometry args={[0.6, 0.7, 0.5]} />
          <meshStandardMaterial color={ALUM} roughness={0.45} metalness={0.35} />
        </mesh>
        {/* The slit aperture — a rectangle of held shade, not a glow */}
        <mesh position={[-0.09, 0.61, -0.2]}>
          <boxGeometry args={[0.02, 0.04, 0.5]} />
          <meshStandardMaterial color={SHADE} roughness={1} metalness={0} />
        </mesh>

        {/* Interface register — lifted where a face would meet it */}
        <mesh position={[0.3, 1.31, 0.3]}>
          <boxGeometry args={[0.7, 0.35, 0.15]} />
          <meshStandardMaterial color={ALUM} roughness={0.45} metalness={0.3} />
        </mesh>
        <mesh position={[-0.55, 1.265, 0.05]}>
          <boxGeometry args={[0.3, 0.25, 0.15]} />
          <meshStandardMaterial color={ALUM} roughness={0.45} metalness={0.3} />
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
        <BlobShadow position={[-2.05, -0.038, -1.5]} width={0.6} depth={0.6} opacity={0.2} />
        <mesh position={[-2.05, 0.085, -1.5]}>
          <boxGeometry args={[0.4, 0.25, 0.4]} />
          <meshStandardMaterial color={ALUM} roughness={0.5} metalness={0.3} />
        </mesh>
        {entered && (
          <>
            <Line
              points={[v(-2.05, 0.215, -1.5), v(-2.05, 0.42, -1.5), v(-1.75, 0.42, -1.5)]}
              color={GRAPHITE}
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

interface BootControllerProps {
  reducedMotion: boolean;
  onComplete: () => void;
  onExtrude: (v: number) => void;
  onInk: (v: number) => void;
  children: ReactNode;
}

/** Drives ink-on → extrude progress for the boot sequence (durations: bible 03/05). */
export function BootController({
  reducedMotion,
  onComplete,
  onExtrude,
  onInk,
  children,
}: BootControllerProps) {
  const done = useRef(false);
  const invalidate = useThree((s) => s.invalidate);

  useEffect(() => {
    if (reducedMotion) {
      onInk(1);
      onExtrude(1);
      onComplete();
      invalidate();
      return;
    }
    const state = { ink: 0, extrude: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        if (!done.current) {
          done.current = true;
          onComplete();
        }
      },
    });
    tl.to(state, {
      ink: 1,
      duration: DUR.ink,
      ease: EASE_INK,
      onUpdate: () => {
        onInk(state.ink);
        invalidate();
      },
    })
      .to(state, {
        extrude: 1,
        duration: DUR.extrude,
        ease: EASE_SITE,
        onUpdate: () => {
          onExtrude(state.extrude);
          invalidate();
        },
      })
      .to({}, { duration: DUR.bootHold });
    return () => {
      tl.kill();
    };
  }, [reducedMotion, onComplete, onExtrude, onInk, invalidate]);

  return <>{children}</>;
}

/** Soft ortho lighting — the one sky (bible 06): key SE, fill NW, high ambient. */
export function SiteLights() {
  return (
    <>
      <ambientLight intensity={0.72} />
      <directionalLight position={[8, 14, 6]} intensity={0.85} castShadow={false} />
      <directionalLight position={[-6, 8, -4]} intensity={0.25} />
    </>
  );
}
