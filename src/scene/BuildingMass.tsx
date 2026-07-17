import { Line } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { useEffect, useMemo, useRef, type ComponentType, type ReactNode } from 'react';
import * as THREE from 'three';
import { SHIPPED_ROOMS, type RoomId } from '../building/program';
import { LAB_ANCHORS, LAB_ORDER } from './anchors';
import { DUR, EASE_INK, EASE_SITE } from './motion';
import { usePalette } from './palette';
import { InkEdges, partialPolyline, SoftPatch } from './primitives';
import { ArchiveLibrary } from './rooms/ArchiveLibrary';
import { CoreRisers } from './rooms/CoreRisers';
import { CrowdObservatory } from './rooms/CrowdObservatory';
import { RoofPlate } from './rooms/RoofPlate';
import { ServerRoom } from './rooms/ServerRoom';
import { EphemeralPavilion } from './rooms/EphemeralPavilion';
import { FarmGreenhouse } from './rooms/FarmGreenhouse';
import { GundamHouse } from './rooms/GundamHouse';
import { IoTBayWarehouse } from './rooms/IoTBayWarehouse';
import { TimelineHall } from './rooms/TimelineHall';
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
  /** Lateral-pan stop for rooms that read in stops (timeline hall). */
  subStop?: number;
  onSubStop?: (i: number) => void;
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
  subStop = 0,
  onSubStop,
}: BuildingMassProps) {
  const pal = usePalette();
  const group = useRef<THREE.Group>(null);
  const wallH = 0.15 + extrude * 3.4;
  // Isolate (bible 05): at a room's own station the selected exhibit holds
  // full presence while the rest of the building thins toward line. The roof
  // is the exception — its exhibit stands ON the solid building (bible R).
  // Keep shell thin enough to read timeline / lab interiors (opaque HUD plates
  // are CSS — do not compensate by keeping the 3D mass near-opaque).
  const shellFade = enteredRoom !== null && enteredRoom !== 'roof';
  const basementCut = enteredRoom === 'core' || enteredRoom === 'server';
  const shellOpacity = shellFade ? 0.14 : 1;
  // B1/B2: paper hatch alone is not enough — the lobby slab still plugs the
  // opened poché. Cut it away with the sheet (bible 03/04 cut-reveal).
  const basementOpen = basementCut;
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
          Unlit: paper is the drawing's ground truth, identical to the void.
          For the basements the paper cuts away — hatched, per convention. */}
      <CutGround open={basementOpen} />

      {enteredRoom === 'timeline' && (
        <TimelineHall
          reducedMotion={reducedMotion}
          subStop={subStop}
          onSelectStage={(i) => onSubStop?.(i)}
        />
      )}
      {enteredRoom === 'core' && <CoreRisers reducedMotion={reducedMotion} />}
      {enteredRoom === 'server' && <ServerRoom />}
      {(enteredRoom === 'archive' || enteredRoom === 'library') && (
        <ArchiveLibrary focus={enteredRoom} reducedMotion={reducedMotion} />
      )}
      {enteredRoom === 'roof' && <RoofPlate />}

      {/* Survey grid — blueprint discipline, fading by design at ±10 m.
          At the roof the fog owns the field: no grid at that height (bible R).
          Over an opened basement the grid would re-lid the hatch. */}
      {enteredRoom !== 'roof' && !basementOpen && <GridLines />}

      {/* Footprint ink */}
      <Line points={footprintPts} color={pal.graphite} lineWidth={1.5} />

      {extrude > 0.02 && (
        <>
          {/* Slabs — ground plate omitted when the basement cut is open so the
              chamber reads through the hatch; mid + roof stay as thinned shell. */}
          {!basementOpen && (
            <mesh position={[0, 0.05, 0]}>
              <boxGeometry args={[FW, 0.1, FD]} />
              <meshStandardMaterial
                color={pal.concrete}
                roughness={0.85}
                transparent
                opacity={shellOpacity}
                depthWrite={!shellFade}
              />
              <InkEdges />
            </mesh>
          )}
          {basementOpen && <SlabCutRim fade={shellFade} opacity={shellOpacity} />}
          <mesh position={[0, wallH * 0.55, 0]}>
            <boxGeometry args={[FW * 0.98, 0.08, FD * 0.98]} />
            <meshStandardMaterial
              color={pal.resin}
              roughness={0.7}
              transparent
              opacity={shellOpacity}
              depthWrite={!shellFade}
            />
            <InkEdges />
          </mesh>
          <mesh position={[0, wallH, 0]}>
            <boxGeometry args={[FW, 0.12, FD]} />
            <meshStandardMaterial
              color={pal.concrete}
              roughness={0.8}
              transparent
              opacity={shellOpacity}
              depthWrite={!shellFade}
            />
            <InkEdges />
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
                transparent
                opacity={shellOpacity}
                depthWrite={!shellFade}
              />
              <InkEdges />
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
              depthWrite={false}
            />
          </mesh>

          {/* Thesis wall — rear, standing proud with a shadow gap */}
          <mesh position={[0, wallH * 0.5, -FD / 2 + 0.08]}>
            <boxGeometry args={[FW * 0.7, wallH * 0.55, 0.06]} />
            <meshStandardMaterial
              color={pal.resin}
              roughness={0.75}
              transparent
              opacity={shellOpacity}
              depthWrite={!shellFade}
            />
            <InkEdges />
          </mesh>

          {/* Light patch — the curtain's admitted sun on the lobby slab (bible L0).
              A drawn patch of sun belongs to the PAPER print only. */}
          {extrude > 0.85 && !shellFade && pal.print === 'paper' && (
            <SoftPatch position={[0, 0.105, 1.6]} width={3.2} depth={2.2} opacity={0.3} />
          )}
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
              {/* Leader line only in-scene — the ROOM label lives in screen-space
                  `.site-anno` so the Html plate never occludes the massing. */}
              {hover && !entered && (
                <Line
                  points={[
                    new THREE.Vector3(anchor.note[0] - 0.3, 0.05, anchor.note[2]),
                    new THREE.Vector3(anchor.note[0] - 0.3, anchor.note[1], anchor.note[2]),
                    new THREE.Vector3(anchor.note[0], anchor.note[1], anchor.note[2]),
                  ]}
                  color={pal.graphite}
                  lineWidth={0.75}
                />
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
        transparent
        opacity={opacity}
        depthWrite={!fade}
      />
      <InkEdges />
    </mesh>
  );
}

/** Lobby slab with a rectangular opening — the cut that lets B1/B2 read
 *  through grade while leaving a sleeved rim (bible 04 · B1 ceiling). */
function SlabCutRim({ fade, opacity }: { fade: boolean; opacity: number }) {
  const pal = usePalette();
  const HOLE_W = 6.6;
  const HOLE_D = 5.2;
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-FW / 2, -FD / 2);
    s.lineTo(FW / 2, -FD / 2);
    s.lineTo(FW / 2, FD / 2);
    s.lineTo(-FW / 2, FD / 2);
    s.closePath();
    const hole = new THREE.Path();
    hole.moveTo(-HOLE_W / 2, -HOLE_D / 2);
    hole.lineTo(HOLE_W / 2, -HOLE_D / 2);
    hole.lineTo(HOLE_W / 2, HOLE_D / 2);
    hole.lineTo(-HOLE_W / 2, HOLE_D / 2);
    hole.closePath();
    s.holes.push(hole);
    return s;
  }, []);
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
      <shapeGeometry args={[shape]} />
      <meshStandardMaterial
        color={pal.concrete}
        roughness={0.85}
        transparent
        opacity={opacity}
        depthWrite={!fade}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/** The sheet, whole — or cut open over the basements with a hatched rim (bible 02/03). */
function CutGround({ open }: { open: boolean }) {
  const pal = usePalette();
  const HOLE_W = 11;
  const HOLE_D = 9;
  const cutShape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-200, -200);
    s.lineTo(200, -200);
    s.lineTo(200, 200);
    s.lineTo(-200, 200);
    s.closePath();
    const hole = new THREE.Path();
    hole.moveTo(-HOLE_W / 2, -HOLE_D / 2);
    hole.lineTo(HOLE_W / 2, -HOLE_D / 2);
    hole.lineTo(HOLE_W / 2, HOLE_D / 2);
    hole.lineTo(-HOLE_W / 2, HOLE_D / 2);
    hole.closePath();
    s.holes.push(hole);
    return s;
  }, []);
  const hatch = useMemo(() => {
    // 45° ticks around the rim — sectioned solid, per convention.
    const runs: THREE.Vector3[][] = [];
    const t = 0.28;
    const step = 0.4;
    for (let x = -HOLE_W / 2; x <= HOLE_W / 2; x += step) {
      runs.push([new THREE.Vector3(x, 0.006, -HOLE_D / 2), new THREE.Vector3(x + t, 0.006, -HOLE_D / 2 - t)]);
      runs.push([new THREE.Vector3(x, 0.006, HOLE_D / 2), new THREE.Vector3(x + t, 0.006, HOLE_D / 2 + t)]);
    }
    for (let z = -HOLE_D / 2; z <= HOLE_D / 2; z += step) {
      runs.push([new THREE.Vector3(-HOLE_W / 2, 0.006, z), new THREE.Vector3(-HOLE_W / 2 - t, 0.006, z + t)]);
      runs.push([new THREE.Vector3(HOLE_W / 2, 0.006, z), new THREE.Vector3(HOLE_W / 2 + t, 0.006, z + t)]);
    }
    return runs;
  }, []);

  if (!open) {
    return (
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[400, 400]} />
        <meshBasicMaterial color={pal.paper} />
      </mesh>
    );
  }
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <shapeGeometry args={[cutShape]} />
        <meshBasicMaterial color={pal.paper} side={THREE.DoubleSide} />
      </mesh>
      {hatch.map((run, i) => (
        <Line key={i} points={run} color={pal.graphite} lineWidth={0.7} />
      ))}
    </group>
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
  const onCompleteRef = useRef(onComplete);
  const onExtrudeRef = useRef(onExtrude);
  const onInkRef = useRef(onInk);
  onCompleteRef.current = onComplete;
  onExtrudeRef.current = onExtrude;
  onInkRef.current = onInk;

  useEffect(() => {
    if (done.current) return;
    if (reducedMotion) {
      done.current = true;
      onInkRef.current(1);
      onExtrudeRef.current(1);
      onCompleteRef.current();
      invalidate();
      return;
    }
    const state = { ink: 0, extrude: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        if (!done.current) {
          done.current = true;
          onCompleteRef.current();
        }
      },
    });
    tl.to(state, {
      ink: 1,
      duration: DUR.ink,
      ease: EASE_INK,
      onUpdate: () => {
        onInkRef.current(state.ink);
        invalidate();
      },
    })
      .to(state, {
        extrude: 1,
        duration: DUR.extrude,
        ease: EASE_SITE,
        onUpdate: () => {
          onExtrudeRef.current(state.extrude);
          invalidate();
        },
      })
      .to({}, { duration: DUR.bootHold });
    return () => {
      tl.kill();
    };
    // Callbacks via refs so StrictMode / invalidate churn cannot restart boot
    // and fire a late finishBoot after the visitor has already left the lobby.
  }, [reducedMotion, invalidate]);

  return <>{children}</>;
}

/** The exit (bible 03): construction reversed — mass sinks to the footprint,
    the line un-draws, the sheet is empty. The stamps go last (handled above
    the canvas). Registers beyond solid→line→void are a fidelity backlog note. */
export function TeardownController({
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
      onInk(0);
      onExtrude(0);
      onComplete();
      invalidate();
      return;
    }
    const state = { ink: 1, extrude: 1 };
    const tl = gsap.timeline({
      onComplete: () => {
        if (!done.current) {
          done.current = true;
          onComplete();
        }
      },
    });
    tl.to(state, {
      extrude: 0,
      duration: 2.2,
      ease: EASE_SITE,
      onUpdate: () => {
        onExtrude(state.extrude);
        invalidate();
      },
    })
      .to(state, {
        ink: 0,
        duration: 1.4,
        ease: EASE_INK,
        onUpdate: () => {
          onInk(state.ink);
          invalidate();
        },
      })
      .to({}, { duration: 0.4 });
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
