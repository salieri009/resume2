import { Line } from '@react-three/drei';
import { useMemo, useState } from 'react';
import * as THREE from 'three';
import { LINKS } from '../../data/profile';
import { usePalette } from '../palette';
import { CaptionPlate, SoftPatch } from '../primitives';

const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

/**
 * B2 · The Server Room (bible 04/B2-SERVER, concept sheet dims).
 * The building's lowest floor and shortest sentence: four cabinets, one
 * answering door to the repository, and — where other sites hang the
 * heatmap — a bare rectangle of slightly lighter concrete, uncaptioned.
 */
export function ServerRoom() {
  const pal = usePalette();
  const [doorHover, setDoorHover] = useState(false);
  const dim = useMemo(
    () => '#' + new THREE.Color(pal.concrete).multiplyScalar(0.45).getHexString(),
    [pal.concrete],
  );
  const dimmer = useMemo(
    () => '#' + new THREE.Color(pal.concrete).multiplyScalar(0.35).getHexString(),
    [pal.concrete],
  );
  const patch = useMemo(
    () => '#' + new THREE.Color(pal.concrete).multiplyScalar(0.55).getHexString(),
    [pal.concrete],
  );

  return (
    <group>
      {/* The deepest chamber — twice-diminished light */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.2, -0.5]}>
        <planeGeometry args={[6.5, 5]} />
        <meshStandardMaterial color={dim} roughness={0.95} />
      </mesh>
      <mesh position={[0, -1.1, -2.9]}>
        <boxGeometry args={[6.5, 2.3, 0.1]} />
        <meshStandardMaterial color={dimmer} roughness={0.95} />
      </mesh>
      <mesh position={[-3.2, -1.1, -0.5]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[4.8, 2.3, 0.1]} />
        <meshStandardMaterial color={dimmer} roughness={0.95} />
      </mesh>
      <SoftPatch position={[0.8, -2.19, 0.2]} width={3.2} depth={2.4} opacity={0.14} />

      {/* The aisle — four cabinets, three of them the past tense */}
      {[-1.5, -0.5, 0.5, 1.5].map((x, i) => {
        const named = i === 1;
        return (
          <group key={x}>
            <mesh
              position={[x, -1.65, -1.9]}
              onPointerOver={
                named
                  ? (e) => {
                      e.stopPropagation();
                      document.body.style.cursor = 'crosshair';
                      setDoorHover(true);
                    }
                  : undefined
              }
              onPointerOut={
                named
                  ? () => {
                      document.body.style.cursor = '';
                      setDoorHover(false);
                    }
                  : undefined
              }
              onClick={
                named
                  ? (e) => {
                      e.stopPropagation();
                      window.open(LINKS.github, '_blank', 'noopener');
                    }
                  : undefined
              }
            >
              <boxGeometry args={[0.5, 1.1, 0.35]} />
              <meshStandardMaterial color={pal.alum} roughness={0.5} metalness={0.1} />
            </mesh>
            {named && (
              <>
                {/* The one door in the cellar — the deepest blue the site allows */}
                <Line
                  points={[
                    v(x - 0.25, -2.2, -1.72),
                    v(x + 0.25, -2.2, -1.72),
                    v(x + 0.25, -1.1, -1.72),
                    v(x - 0.25, -1.1, -1.72),
                    v(x - 0.25, -2.2, -1.72),
                  ]}
                  color={doorHover ? pal.signal : pal.graphite}
                  lineWidth={doorHover ? 2 : 1}
                />
                <CaptionPlate
                  position={[x - 0.25, -1.0, -1.7]}
                  lines={['SYS · SALIERI009', 'GITHUB.COM/SALIERI009']}
                  note={doorHover}
                />
              </>
            )}
          </group>
        );
      })}

      {/* The bare patch — binds to nothing; that is the point */}
      <mesh position={[-3.14, -1.2, -0.2]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[1.2, 0.7]} />
        <meshStandardMaterial color={patch} roughness={0.95} />
      </mesh>
    </group>
  );
}
