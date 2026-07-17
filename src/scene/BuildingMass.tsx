import { Line } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { useEffect, useMemo, useRef, type ComponentType, type ReactNode } from 'react';
import * as THREE from 'three';
import { SHIPPED_ROOMS, tagOf, floorOfRoom, type RoomId } from '../building/program';
import { LAB_ANCHORS, LAB_ORDER } from './anchors';
import { DUR, EASE_INK, EASE_SITE } from './motion';
import { usePalette } from './palette';
import { CaptionPlate, partialPolyline } from './primitives';
import { CrowdObservatory } from './rooms/CrowdObservatory';
import { EphemeralPavilion } from './rooms/EphemeralPavilion';
import { FarmGreenhouse } from './rooms/FarmGreenhouse';
import { GundamHouse } from './rooms/GundamHouse';
import { IoTBayWarehouse } from './rooms/IoTBayWarehouse';
import type { RoomBlockProps } from './rooms/types';

const LAB_BLOCKS: Partial<Record<RoomId, ComponentType<RoomBlockProps>>> = {
  crowd: CrowdObservatory,
  iotbay: IoTBayWarehouse,
  farm: FarmGreenhouse,
  gundam: GundamHouse,
  ephemeral: EphemeralPavilion,
};

interface BuildingMassProps {
  /** 0 = footprint line only, 1 = full extrude */
  extrude: number;
  /** 0–1 CAD ink progress for footprint */
  ink?: number;
  /** Show exhibits (false during boot). */
  showLabs: boolean;
  /** The room whose station the visitor occupies, if phase is 'room'. */
  enteredRoom: RoomId | null;
  hoveredRoom: RoomId | null;
  onRoomHover?: (room: RoomId, h: boolean) => void;
  onRoomClick?: (room: RoomId) => void;
  reducedMotion?: boolean;
}

/** Footprint rectangle in XZ (meters — bible 02: 8 × 6). */
const FW = 8;
const FD = 6;

export function BuildingMass({
  extrude,
  ink = 1,
  showLabs,
  enteredRoom,
  hoveredRoom,
  onRoomHover,
  onRoomClick,
  reducedMotion = false,
}: BuildingMassProps) {
  const pal = usePalette();
  const group = useRef<THREE.Group>(null);
  const wallH = 0.15 + extrude * 3.4;
  // Isolate (bible 05): at a room's own station the selected exhibit holds
  // full presence while the rest of the building thins toward line.
  const shellFade = enteredRoom !== null;
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
      {/* Ground plane — the sheet survives any window (bible 02: infinite paper).
          Unlit: paper is the drawing's ground truth, identical to the void. */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[400, 400]} />
        <meshBasicMaterial color={pal.paper} />
      </mesh>

      {/* Survey grid — blueprint discipline, fading by design at ±10 m */}
      <GridLines />

      {/* Footprint ink */}
      <Line points={footprintPts} color={pal.graphite} lineWidth={1.5} />

      {extrude > 0.02 && (
        <>
          {/* Slabs */}
          <mesh position={[0, 0.05, 0]}>
            <boxGeometry args={[FW, 0.1, FD]} />
            <meshStandardMaterial
              color={pal.concrete}
              roughness={0.85}
              transparent={shellFade}
              opacity={shellOpacity}
            />
          </mesh>
          <mesh position={[0, wallH * 0.55, 0]}>
            <boxGeometry args={[FW * 0.98, 0.08, FD * 0.98]} />
            <meshStandardMaterial
              color={pal.resin}
              roughness={0.7}
              transparent={shellFade}
              opacity={shellOpacity}
            />
          </mesh>
          <mesh position={[0, wallH, 0]}>
            <boxGeometry args={[FW, 0.12, FD]} />
            <meshStandardMaterial
              color={pal.concrete}
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
                color={pal.alum}
                roughness={0.45}
                metalness={0.1}
                transparent={shellFade}
                opacity={shellOpacity}
              />
            </mesh>
          ))}

          {/* Glass curtain (lobby front — 55% width, 70% height per bible L0) */}
          <mesh position={[0, wallH * 0.45, FD / 2 - 0.02]}>
            <boxGeometry args={[FW * 0.55, wallH * 0.7, 0.04]} />
            <meshStandardMaterial
              color={pal.glass}
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
              color={pal.resin}
              roughness={0.75}
              transparent={shellFade}
              opacity={shellOpacity}
            />
          </mesh>

          {/* Light patch — the curtain's admitted sun on the lobby slab (bible L0).
              A drawn patch of sun belongs to the PAPER print only. */}
          {extrude > 0.85 && !shellFade && pal.print === 'paper' && <LightPatch />}
        </>
      )}

      {showLabs &&
        extrude > 0.85 &&
        LAB_ORDER.filter((id) => SHIPPED_ROOMS.includes(id)).map((id) => {
          const anchor = LAB_ANCHORS[id];
          const Block = LAB_BLOCKS[id];
          if (!anchor || !Block) return null;
          const entered = enteredRoom === id;
          // When one room is entered, the others slide out of presence
          // (bible 03: "the building's other masses sliding out of frame").
          if (enteredRoom !== null && !entered) return null;
          const hover = hoveredRoom === id;
          return (
            <group key={id} position={anchor.position}>
              <Block
                hover={hover}
                entered={entered}
                reducedMotion={reducedMotion}
                onHover={(h) => onRoomHover?.(id, h)}
                onClick={() => onRoomClick?.(id)}
              />
              {hover && !entered && (
                <>
                  <Line
                    points={[
                      new THREE.Vector3(anchor.note[0] - 0.3, 0.05, anchor.note[2]),
                      new THREE.Vector3(anchor.note[0] - 0.3, anchor.note[1], anchor.note[2]),
                      new THREE.Vector3(anchor.note[0], anchor.note[1], anchor.note[2]),
                    ]}
                    color={pal.graphite}
                    lineWidth={0.75}
                  />
                  <CaptionPlate
                    position={anchor.note}
                    lines={[`ROOM · ${floorOfRoom(id)} · ${tagOf(id)}`]}
                    note
                  />
                </>
              )}
            </group>
          );
        })}
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
  const pal = usePalette();
  return (
    <mesh position={[x, h / 2, z]}>
      <boxGeometry args={[w, h, d]} />
      <meshStandardMaterial
        color={pal.concrete}
        roughness={0.88}
        transparent={fade}
        opacity={opacity}
      />
    </mesh>
  );
}

function GridLines() {
  const pal = usePalette();
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
        <Line key={i} points={p} color={pal.grid} lineWidth={0.5} transparent opacity={0.55} />
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

/** Soft ortho lighting — the one sky (bible 06): key SE, fill NW, high ambient.
    Intensities are balanced for the flat (untone-mapped) pipeline so that
    upward faces sit just under clip and authored values survive to screen. */
export function SiteLights() {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[8, 14, 6]} intensity={0.55} castShadow={false} />
      <directionalLight position={[-6, 8, -4]} intensity={0.22} />
    </>
  );
}
