import { OrthographicCamera } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import type { RoomId } from '../building/program';
import { DUR, EASE_SITE } from '../scene/motion';

export type ViewPreset = 'boot' | 'lobby' | 'labCrowd';

const PRESETS: Record<
  ViewPreset,
  { position: [number, number, number]; lookAt: [number, number, number]; zoom: number }
> = {
  // Zooms are px-per-meter against drei's pixel frustum; values are tuned to
  // the concept-sheet compositions (composition wins over coordinates).
  boot: { position: [18, 22, 18], lookAt: [0, 1, 0], zoom: 28 },
  lobby: { position: [14, 10, 14], lookAt: [0, 1.4, 0], zoom: 55 },
  labCrowd: { position: [4.5, 5.5, 6.5], lookAt: [0, 1.7, -1.2], zoom: 280 },
};


interface OrthoRigProps {
  preset: ViewPreset;
  reducedMotion: boolean;
}

/**
 * Orthographic-only camera travel. Parallel dolly / zoom — never perspective.
 */
export function OrthoRig({ preset, reducedMotion }: OrthoRigProps) {
  const camRef = useRef<THREE.OrthographicCamera>(null);
  const look = useRef(new THREE.Vector3(...PRESETS.boot.lookAt));
  const { size, invalidate } = useThree();

  useEffect(() => {
    const cam = camRef.current;
    if (!cam) return;
    const target = PRESETS[preset];
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
      duration: preset === 'labCrowd' ? DUR.threshold : DUR.civic,
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
    return () => {
      tween.kill();
    };
  }, [preset, reducedMotion, size.width, size.height, invalidate]);

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
  if (room === 'crowd') return 'labCrowd';
  return 'lobby';
}
