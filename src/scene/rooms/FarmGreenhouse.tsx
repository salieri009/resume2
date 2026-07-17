import { Line } from '@react-three/drei';
import { useEffect, useMemo, useState } from 'react';
import * as THREE from 'three';
import { usePalette } from '../palette';
import { BlobShadow, CaptionPlate, FlowTrace, InkEdges, InstancedBlanks, Plinth } from '../primitives';
import { gridTexture, waveformTexture } from '../textures';
import type { RoomBlockProps } from './types';

const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
const SLOPE = Math.atan2(0.4, 0.8); // gable: eaves 0.9, ridge 1.3, half-span 0.8

/**
 * A-103 · The Greenhouse (bible 04/L3-LAB-FARM, concept sheet dims).
 * A gabled glass house over two beds — the scene pipeline and the weather
 * pipeline — with the instanced seedling tray, the aurora archived as an
 * etched specimen plate, and the weather vane on a dashed (optional) drop.
 */
export function FarmGreenhouse({ hover, entered, reducedMotion, onClick, onHover }: RoomBlockProps) {
  const pal = usePalette();
  const [vaneHover, setVaneHover] = useState(false);

  // Watering traces, render order: React → Three.js → WebGL / Controls → Particles → GLSL.
  const sceneBed = useMemo(() => [v(-0.45, 0.78, 0.3), v(-0.45, 0.42, 0.15), v(-0.45, 0.16, 0)], []);
  const weatherBed = useMemo(() => [v(0.45, 0.72, 0.3), v(0.45, 0.36, 0.15), v(0.45, 0.16, -0.15)], []);
  const vaneDrop = useMemo(() => [v(0, 1.5, 0), v(0, 0.9, 0), v(0.45, 0.74, 0.3)], []);
  const restRuns = useMemo(() => [sceneBed, weatherBed], [sceneBed, weatherBed]);

  const bars = useMemo(() => [-0.675, -0.225, 0.225, 0.675], []);

  // Etched engravings (bible 10): the aurora waveform on the specimen plate,
  // the seed tray's scribed 6×4 grid. Regenerated per print, disposed after.
  const auroraMap = useMemo(
    () => waveformTexture({ paper: pal.resin, ink: pal.graphite }),
    [pal.resin, pal.graphite],
  );
  const trayGrid = useMemo(() => gridTexture(6, 4, pal.graphite), [pal.graphite]);
  useEffect(
    () => () => {
      auroraMap.dispose();
      trayGrid.dispose();
    },
    [auroraMap, trayGrid],
  );

  return (
    <group>
      <Plinth width={2.2} depth={2.0} hover={hover} onHover={onHover} onClick={onClick}>
        <BlobShadow position={[0, 0.045, 0]} width={2.0} depth={1.7} opacity={0.1} />

        {/* Corner posts */}
        {[
          [-0.9, -0.8],
          [0.9, -0.8],
          [-0.9, 0.8],
          [0.9, 0.8],
        ].map(([x, z]) => (
          <mesh key={`${x}${z}`} position={[x, 0.49, z]}>
            <boxGeometry args={[0.05, 0.9, 0.05]} />
            <meshStandardMaterial color={pal.alum} roughness={0.45} metalness={0.1} />
            <InkEdges />
          </mesh>
        ))}

        {/* Gabled glass roof — two planes, ridge along x */}
        <mesh position={[0, 1.1, -0.4]} rotation={[SLOPE, 0, 0]}>
          <boxGeometry args={[1.8, 0.02, 0.9]} />
          <meshStandardMaterial color={pal.glass} transparent opacity={0.3} roughness={0.15} />
        </mesh>
        <mesh position={[0, 1.1, 0.4]} rotation={[-SLOPE, 0, 0]}>
          <boxGeometry args={[1.8, 0.02, 0.9]} />
          <meshStandardMaterial color={pal.glass} transparent opacity={0.3} roughness={0.15} />
        </mesh>
        {/* Meter-ruled glazing bars */}
        {bars.map((x) => (
          <group key={x}>
            <mesh position={[x, 1.11, -0.4]} rotation={[SLOPE, 0, 0]}>
              <boxGeometry args={[0.025, 0.03, 0.9]} />
              <meshStandardMaterial color={pal.alum} roughness={0.45} metalness={0.1} />
            </mesh>
            <mesh position={[x, 1.11, 0.4]} rotation={[-SLOPE, 0, 0]}>
              <boxGeometry args={[0.025, 0.03, 0.9]} />
              <meshStandardMaterial color={pal.alum} roughness={0.45} metalness={0.1} />
            </mesh>
          </group>
        ))}

        {/* Ruled glazing-bar shadows — the greenhouse's daily geometry */}
        {bars.map((x) => (
          <mesh key={`rule${x}`} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.048, 0]}>
            <planeGeometry args={[0.028, 1.7]} />
            <meshBasicMaterial color={pal.graphite} transparent opacity={0.1} depthWrite={false} />
          </mesh>
        ))}

        {/* Scene bed — React plate / Three.js mass / WebGL slab */}
        <mesh position={[-0.45, 0.73, 0.3]}>
          <boxGeometry args={[0.5, 0.1, 0.3]} />
          <meshStandardMaterial color={pal.alum} roughness={0.45} metalness={0.1} />
          <InkEdges />
        </mesh>
        <mesh position={[-0.45, 0.4, 0.15]}>
          <boxGeometry args={[0.45, 0.45, 0.4]} />
          <meshStandardMaterial color={pal.alum} roughness={0.45} metalness={0.1} />
          <InkEdges />
        </mesh>
        <mesh position={[-0.45, 0.12, 0]}>
          <boxGeometry args={[0.7, 0.15, 0.5]} />
          <meshStandardMaterial color={pal.alum} roughness={0.55} metalness={0.1} />
          <InkEdges />
        </mesh>

        {/* Weather bed — controls / the instanced seedling tray / GLSL ground */}
        <mesh position={[0.45, 0.68, 0.3]}>
          <boxGeometry args={[0.3, 0.08, 0.2]} />
          <meshStandardMaterial color={pal.alum} roughness={0.45} metalness={0.1} />
          <InkEdges />
        </mesh>
        <mesh position={[0.45, 0.24, 0.15]}>
          <boxGeometry args={[0.7, 0.04, 0.5]} />
          <meshStandardMaterial color={pal.resin} roughness={0.7} />
          <InkEdges />
        </mesh>
        {/* The tray's scribed cells — instancing shown twice over */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.45, 0.262, 0.15]}>
          <planeGeometry args={[0.62, 0.42]} />
          <meshBasicMaterial map={trayGrid} transparent depthWrite={false} />
        </mesh>
        <InstancedBlanks
          count={24}
          cols={6}
          size={0.06}
          spacing={0.1}
          position={[0.45, 0.3, 0.15]}
          color={pal.alum}
        />
        <mesh position={[0.45, 0.12, -0.2]}>
          <boxGeometry args={[0.5, 0.15, 0.4]} />
          <meshStandardMaterial color={pal.alum} roughness={0.55} metalness={0.1} />
          <InkEdges />
        </mesh>

        {/* The aurora, archived: an etched specimen plate, its light declined —
            now carrying its waveform engraving (bible 10 punch list) */}
        <group position={[-0.95, 0.42, -0.75]} rotation={[0, Math.PI / 5, 0]}>
          <mesh>
            <boxGeometry args={[0.5, 0.7, 0.03]} />
            <meshStandardMaterial color={pal.resin} roughness={0.75} />
            <InkEdges />
          </mesh>
          <mesh position={[0, 0, 0.017]}>
            <planeGeometry args={[0.44, 0.62]} />
            <meshStandardMaterial map={auroraMap} roughness={0.78} toneMapped={false} />
          </mesh>
        </group>

        {/* The weather vane — outside the sealed climate, optionally connected */}
        <group
          onPointerOver={(e) => {
            e.stopPropagation();
            setVaneHover(true);
          }}
          onPointerOut={() => setVaneHover(false)}
        >
          <mesh position={[0, 1.45, 0]}>
            <boxGeometry args={[0.03, 0.3, 0.03]} />
            <meshStandardMaterial
              color={vaneHover ? pal.signal : pal.alum}
              roughness={0.45}
              metalness={0.1}
            />
          </mesh>
          <mesh position={[0.06, 1.56, 0]}>
            <boxGeometry args={[0.22, 0.03, 0.03]} />
            <meshStandardMaterial
              color={vaneHover ? pal.signal : pal.alum}
              roughness={0.45}
              metalness={0.1}
            />
          </mesh>
        </group>
        {/* The dashed drop — a solid line would be a lie */}
        <Line points={vaneDrop} color={vaneHover ? pal.signal : pal.graphite} lineWidth={0.9} dashed dashSize={0.06} gapSize={0.05} />

        {/* Watering — both beds trace at once, downward, in render order */}
        <FlowTrace restRuns={restRuns} path={sceneBed} active={hover && !vaneHover} reducedMotion={reducedMotion} />
        <FlowTrace restRuns={[]} path={weatherBed} active={hover && !vaneHover} reducedMotion={reducedMotion} />
      </Plinth>

      {entered && (
        <>
          <CaptionPlate position={[-1.1, 0.9, -0.75]} lines={['AURORA · CUSTOM GLSL · ONE DRAW CALL']} />
          <CaptionPlate
            position={[0.15, 1.7, 0]}
            lines={['OPTIONAL', 'OPENWEATHERMAP → WEATHER SYNC → SCENE STATE']}
          />
        </>
      )}
    </group>
  );
}
