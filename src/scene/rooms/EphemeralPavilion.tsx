import { useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { usePalette } from '../palette';
import { BlobShadow, CaptionPlate, FlowTrace, InkEdges, InstancedBlanks, Plinth } from '../primitives';
import { flowFieldTexture, speckleTexture } from '../textures';
import type { RoomBlockProps } from './types';

const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

/**
 * A-105 · The Pavilion (bible 04/L3-LAB-EPHEMERAL, concept sheet dims).
 * The lightest structure in the building: three stacked glass roofs at
 * stepped opacity (the three-layer canvas, stated as lamination), two courts
 * of machinery beneath, the rack of pre-cast blanks, and the fastest
 * stillness in the site — attention leaves, and nothing lingers.
 */
export function EphemeralPavilion({ hover, entered, reducedMotion, onClick, onHover }: RoomBlockProps) {
  const pal = usePalette();

  // Fluid court: p5.js → Perlin field → object pool. Clock court: clock → IoC.
  // The cross-conduit carries the beat: attention scales time.
  const fluidPath = useMemo(
    () => [v(-0.45, 0.52, 0.3), v(-0.45, 0.3, 0.1), v(-0.45, 0.1, -0.4)],
    [],
  );
  const clockPath = useMemo(
    () => [v(0.62, 0.28, 0.15), v(0.62, 0.14, 0.15), v(0.5, 0.14, 0.15)],
    [],
  );
  const cross = useMemo(() => [v(-0.2, 0.3, 0.12), v(0.35, 0.3, 0.14)], []);

  // Etched engravings (bible 10): the combed flow-field on the Perlin mass,
  // the history roof's sediment speckle. Blanks stay unmarked — waiting
  // pieces carry no ink.
  const fieldMap = useMemo(() => flowFieldTexture(pal.graphite), [pal.graphite]);
  const mottleMap = useMemo(() => speckleTexture(pal.graphite), [pal.graphite]);
  useEffect(
    () => () => {
      fieldMap.dispose();
      mottleMap.dispose();
    },
    [fieldMap, mottleMap],
  );

  return (
    <group>
      <Plinth width={2.4} depth={2.2} hover={hover} onHover={onHover} onClick={onClick}>
        <BlobShadow position={[0, 0.045, 0]} width={1.9} depth={1.7} opacity={0.08} />

        {/* The thinnest members in the building */}
        {[
          [-0.8, -0.7],
          [0.8, -0.7],
          [-0.8, 0.7],
          [0.8, 0.7],
        ].map(([x, z]) => (
          <mesh key={`${x}${z}`} position={[x, 0.59, z]}>
            <boxGeometry args={[0.04, 1.1, 0.04]} />
            <meshStandardMaterial color={pal.alum} roughness={0.45} metalness={0.1} />
          </mesh>
        ))}

        {/* Three roofs — bgLayer static, historyLayer, activeLayer */}
        <mesh position={[0, 1.14, 0]}>
          <boxGeometry args={[1.8, 0.015, 1.6]} />
          <meshStandardMaterial color={pal.glass} transparent opacity={0.5} roughness={0.3} />
        </mesh>
        <mesh position={[0, 1.22, 0]}>
          <boxGeometry args={[1.8, 0.015, 1.6]} />
          <meshStandardMaterial color={pal.glass} transparent opacity={0.35} roughness={0.2} />
        </mesh>
        {/* historyLayer's sediment — ink remembered, at whisper opacity */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 1.229, 0]}>
          <planeGeometry args={[1.76, 1.56]} />
          <meshBasicMaterial map={mottleMap} transparent opacity={0.5} depthWrite={false} />
        </mesh>
        <mesh position={[0, 1.3, 0]}>
          <boxGeometry args={[1.8, 0.015, 1.6]} />
          <meshStandardMaterial color={pal.glass} transparent opacity={0.2} roughness={0.12} />
        </mesh>
        {/* Each roof lays a faint shade on the plane below — the lamination
            read as its own section (bible A-105). */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 1.292, 0]}>
          <planeGeometry args={[1.7, 1.5]} />
          <meshBasicMaterial color={pal.graphite} transparent opacity={0.06} depthWrite={false} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 1.212, 0]}>
          <planeGeometry args={[1.72, 1.52]} />
          <meshBasicMaterial color={pal.graphite} transparent opacity={0.05} depthWrite={false} />
        </mesh>

        {/* Fluid court — p5 plate, the combed Perlin field, the waiting blanks */}
        <mesh position={[-0.45, 0.48, 0.3]}>
          <boxGeometry args={[0.4, 0.08, 0.25]} />
          <meshStandardMaterial color={pal.alum} roughness={0.45} metalness={0.1} />
          <InkEdges />
        </mesh>
        <mesh position={[-0.45, 0.23, 0.05]}>
          <boxGeometry args={[0.6, 0.18, 0.45]} />
          <meshStandardMaterial color={pal.alum} roughness={0.5} metalness={0.1} />
          <InkEdges />
        </mesh>
        {/* The frozen chart of the noise that moves the ink */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-0.45, 0.3211, 0.05]}>
          <planeGeometry args={[0.56, 0.41]} />
          <meshBasicMaterial map={fieldMap} transparent depthWrite={false} />
        </mesh>
        <InstancedBlanks
          count={18}
          cols={6}
          size={0.05}
          spacing={0.09}
          position={[-0.45, 0.065, -0.5]}
          color={pal.alum}
        />

        {/* Clock court — audio and clock on the IoC base */}
        <mesh position={[0.5, 0.1, 0.15]}>
          <boxGeometry args={[0.6, 0.12, 0.4]} />
          <meshStandardMaterial color={pal.alum} roughness={0.55} metalness={0.1} />
          <InkEdges />
        </mesh>
        <mesh position={[0.38, 0.26, 0.15]}>
          <boxGeometry args={[0.25, 0.2, 0.2]} />
          <meshStandardMaterial color={pal.alum} roughness={0.45} metalness={0.1} />
          <InkEdges />
        </mesh>
        <mesh position={[0.62, 0.285, 0.15]}>
          <boxGeometry args={[0.25, 0.25, 0.2]} />
          <meshStandardMaterial color={pal.alum} roughness={0.45} metalness={0.1} />
          <InkEdges />
        </mesh>

        {/* Attention becomes motion — both courts, the cross-beat between */}
        <FlowTrace restRuns={[fluidPath, clockPath, cross]} path={fluidPath} active={hover} reducedMotion={reducedMotion} />
        <FlowTrace restRuns={[]} path={cross} active={hover} reducedMotion={reducedMotion} duration={0.6} />
        <FlowTrace restRuns={[]} path={clockPath} active={hover} reducedMotion={reducedMotion} />
      </Plinth>

      {entered && (
        <>
          <CaptionPlate
            position={[0.95, 1.45, 0.8]}
            lines={['LAYERS · BGLAYER STATIC · HISTORYLAYER · ACTIVELAYER']}
          />
          <CaptionPlate
            position={[0.75, 0.55, 0.75]}
            lines={['HOURS · SUN DROP · QUARTERS · CYMATIC RINGS · 0 ASSETS']}
          />
        </>
      )}
    </group>
  );
}
