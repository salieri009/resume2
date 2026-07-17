import { OrthographicCamera } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import type { RoomId } from '../building/program';
import { DUR, EASE_SITE } from '../scene/motion';

export type ViewPreset =
  | 'boot'
  | 'lobby'
  | 'crowd'
  | 'iotbay'
  | 'farm'
  | 'gundam'
  | 'ephemeral'
  | 'timeline'
  | 'core'
  | 'server'
  | 'archive'
  | 'library'
  | 'roof';

const PRESETS: Record<
  ViewPreset,
  { position: [number, number, number]; lookAt: [number, number, number]; zoom: number }
> = {
  // Zooms are px-per-meter against drei's pixel frustum; values are tuned to
  // the concept-sheet compositions (composition wins over coordinates).
  boot: { position: [18, 22, 18], lookAt: [0, 1, 0], zoom: 28 },
  lobby: { position: [14, 10, 14], lookAt: [0, 1.4, 0], zoom: 55 },
  // Laboratory stations (bible 05 relationships: iotbay mirrors crowd,
  // farm/gundam raised diagonals, ephemeral the one frontal presentation).
  crowd: { position: [4.5, 4.5, 6.5], lookAt: [0, 1.25, -1.2], zoom: 280 },
  iotbay: { position: [-4.5, 4.0, 6.5], lookAt: [0, 1.05, 1.35], zoom: 230 },
  farm: { position: [6.2, 6.0, 6.5], lookAt: [1.7, 2.8, -1.0], zoom: 260 },
  gundam: { position: [-6.2, 6.0, 6.5], lookAt: [-1.9, 2.75, -0.9], zoom: 300 },
  ephemeral: { position: [-0.1, 4.8, 9.5], lookAt: [-0.1, 2.8, 1.3], zoom: 270 },
  // The one frontal hall — subStop pans it in hard stops (bible 05).
  timeline: { position: [0, 3.2, 14], lookAt: [0, 0.95, 0], zoom: 240 },
  // Below grade, into the opened poché.
  core: { position: [6, -0.2, 6], lookAt: [0, -1.2, -0.5], zoom: 150 },
  // Deeper still — twice-diminished light, one aisle.
  server: { position: [6, -1.6, 6], lookAt: [-0.2, -1.5, -1.2], zoom: 165 },
  // The records floor, and its one pan west to the reading desk.
  archive: { position: [4.5, 4.9, 7], lookAt: [0.4, 2.75, -0.5], zoom: 240 },
  library: { position: [2.5, 4.6, 7], lookAt: [-1.7, 2.5, 0.7], zoom: 290 },
  // High frontal: the building below the frame's waist, fog above.
  roof: { position: [0, 7.5, 11], lookAt: [0, 4.1, 0], zoom: 190 },
};

/** Timeline hall stop centers (matches STAGE_X in the hall block). */
const TIMELINE_STOPS = [-2.7, -0.9, 0.9, 2.7];


interface OrthoRigProps {
  preset: ViewPreset;
  reducedMotion: boolean;
  /** Lateral-pan stop index for stop-reading rooms. */
  subStop?: number;
}

/**
 * Orthographic-only camera travel. Parallel dolly / zoom — never perspective.
 */
export function OrthoRig({ preset, reducedMotion, subStop = 0 }: OrthoRigProps) {
  const camRef = useRef<THREE.OrthographicCamera>(null);
  const look = useRef(new THREE.Vector3(...PRESETS.boot.lookAt));
  const prevPreset = useRef<ViewPreset>('boot');
  const { size, invalidate } = useThree();

  useEffect(() => {
    const cam = camRef.current;
    if (!cam) return;
    const base = PRESETS[preset];
    // Stop-reading rooms slide the whole station laterally, hard stops only.
    const stopX = preset === 'timeline' ? TIMELINE_STOPS[Math.min(subStop, TIMELINE_STOPS.length - 1)] : 0;
    const target = {
      position: [base.position[0] + stopX, base.position[1], base.position[2]] as const,
      lookAt: [base.lookAt[0] + stopX, base.lookAt[1], base.lookAt[2]] as const,
      zoom: base.zoom,
    };
    // Frustum stays drei's pixel-based default (left/right/top/bottom from
    // viewport size); station zooms are calibrated in px-per-meter against it.

    if (reducedMotion) {
      cam.position.set(...target.position);
      cam.zoom = target.zoom;
      look.current.set(...target.lookAt);
      cam.lookAt(look.current);
      cam.updateProjectionMatrix();
      invalidate();
      return;
    }

    const from = {
      x: cam.position.x,
      y: cam.position.y,
      z: cam.position.z,
      zoom: cam.zoom,
      lx: look.current.x,
      ly: look.current.y,
      lz: look.current.z,
    };
    const tween = gsap.to(from, {
      x: target.position[0],
      y: target.position[1],
      z: target.position[2],
      zoom: target.zoom,
      lx: target.lookAt[0],
      ly: target.lookAt[1],
      lz: target.lookAt[2],
      // A stop hop inside the same room reads sideways (civic); entering a
      // room crosses a threshold; the roof ascent is the journey's longest
      // single move (bible 05's duration menu).
      duration:
        preset === 'roof'
          ? DUR.roofAscent
          : preset === prevPreset.current || preset === 'boot' || preset === 'lobby'
            ? DUR.civic
            : DUR.threshold,
      ease: EASE_SITE,
      onUpdate: () => {
        cam.position.set(from.x, from.y, from.z);
        cam.zoom = from.zoom;
        look.current.set(from.lx, from.ly, from.lz);
        cam.lookAt(look.current);
        cam.updateProjectionMatrix();
        invalidate();
      },
    });
    prevPreset.current = preset;
    return () => {
      tween.kill();
    };
  }, [preset, reducedMotion, size.width, size.height, invalidate, subStop]);

  useFrame(() => {
    const cam = camRef.current;
    if (!cam) return;
    cam.lookAt(look.current);
  });

  return (
    <OrthographicCamera
      ref={camRef}
      makeDefault
      position={PRESETS.boot.position}
      zoom={PRESETS.boot.zoom}
      near={0.1}
      far={200}
    />
  );
}

export function presetForRoom(room: RoomId, phase: string): ViewPreset {
  if (phase === 'boot') return 'boot';
  if (phase === 'room' && room in PRESETS) return room as ViewPreset;
  return 'lobby';
}
