import { useEffect, useRef, useState } from 'react';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';
import * as THREE from 'three';
import { CREDENTIALS } from '../../data/credentials';
import { LINKS } from '../../data/profile';
import { EASE_SITE } from '../motion';
import { usePalette } from '../palette';
import { CaptionPlate, SoftPatch } from '../primitives';

/**
 * L4 · The Archive & The Library (bible 04/L4-ARCHIVE-LIBRARY, concept dims).
 * A plan chest of flat files — four sealed drawers that open a hand's width,
 * one at a time — and, one pan west, the smallest habitable room: a single
 * desk, a patch of light, and the door to 350+ essays.
 */
export function ArchiveLibrary({ reducedMotion }: { focus: 'archive' | 'library'; reducedMotion: boolean }) {
  const pal = usePalette();
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [deskHover, setDeskHover] = useState(false);
  const drawerRefs = useRef<(THREE.Group | null)[]>([]);
  const invalidate = useThree((s) => s.invalidate);

  // One at a time: each front eases to its open/closed depth (0.4 s, the ease).
  useEffect(() => {
    const tweens = drawerRefs.current.map((g, i) => {
      if (!g) return null;
      const target = openIdx === i ? 0.25 : 0;
      if (reducedMotion) {
        g.position.z = -0.32 + target;
        invalidate();
        return null;
      }
      return gsap.to(g.position, {
        z: -0.32 + target,
        duration: 0.4,
        ease: EASE_SITE,
        onUpdate: invalidate,
      });
    });
    return () => {
      tweens.forEach((t) => t?.kill());
    };
  }, [openIdx, reducedMotion, invalidate]);

  const seals = CREDENTIALS.map((c) => c.seal.replace('\n', ' '));
  const cols = [-0.87, -0.29, 0.29, 0.87];

  return (
    <group position={[0, 2.1, 0]}>
      {/* The plan chest */}
      <mesh position={[0.4, 0.64, -0.6]}>
        <boxGeometry args={[2.4, 1.2, 0.5]} />
        <meshStandardMaterial color={pal.resin} roughness={0.72} />
      </mesh>

      {/* Sealed drawers — service order, left to right */}
      {seals.map((seal, i) => {
        const hover = hoverIdx === i;
        return (
          <group
            key={seal}
            ref={(el) => {
              drawerRefs.current[i] = el;
            }}
            position={[0.4 + cols[i], 0.94, -0.32]}
          >
            <mesh
              onPointerOver={(e) => {
                e.stopPropagation();
                document.body.style.cursor = 'crosshair';
                setHoverIdx(i);
              }}
              onPointerOut={() => {
                document.body.style.cursor = '';
                setHoverIdx((p) => (p === i ? null : p));
              }}
              onClick={(e) => {
                e.stopPropagation();
                setOpenIdx((p) => (p === i ? null : i));
              }}
            >
              <boxGeometry args={[0.52, 0.24, 0.05]} />
              <meshStandardMaterial
                color={hover || openIdx === i ? pal.signal : pal.resin}
                roughness={0.7}
              />
            </mesh>
            {/* Pull */}
            <mesh position={[0, -0.06, 0.035]}>
              <boxGeometry args={[0.14, 0.02, 0.02]} />
              <meshStandardMaterial color={pal.alum} roughness={0.4} metalness={0.1} />
            </mesh>
            {/* The embossed seal — English, always */}
            <CaptionPlate position={[-0.18, 0.06, 0.06]} lines={[seal]} />
          </group>
        );
      })}
      {/* Blank fronts — the registry's future tense */}
      {cols.map((x) => (
        <mesh key={`blank${x}`} position={[0.4 + x, 0.36, -0.32]}>
          <boxGeometry args={[0.52, 0.24, 0.05]} />
          <meshStandardMaterial color={pal.resin} roughness={0.72} />
        </mesh>
      ))}

      {/* The library — one desk, one light, one door */}
      <group position={[-1.7, 0, 0.7]}>
        <mesh
          position={[0, 0.3, 0]}
          onPointerOver={(e) => {
            e.stopPropagation();
            document.body.style.cursor = 'crosshair';
            setDeskHover(true);
          }}
          onPointerOut={() => {
            document.body.style.cursor = '';
            setDeskHover(false);
          }}
          onClick={(e) => {
            e.stopPropagation();
            window.open(LINKS.blog, '_blank', 'noopener');
          }}
        >
          <boxGeometry args={[0.9, 0.5, 0.55]} />
          <meshStandardMaterial color={deskHover ? pal.signal : pal.resin} roughness={0.72} />
        </mesh>
        <SoftPatch position={[0, 0.56, 0]} width={1.1} depth={0.8} opacity={0.35} />
        <CaptionPlate position={[-0.3, 0.75, 0.35]} lines={['350+ ESSAYS · KO · EN · JA']} note={deskHover} />
      </group>
    </group>
  );
}
