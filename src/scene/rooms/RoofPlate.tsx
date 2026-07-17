import { PROFILE } from '../../data/profile';
import { usePalette } from '../palette';
import { BlobShadow, CaptionPlate } from '../primitives';

/**
 * R · The Roof (bible 04/R-ROOF, concept sheet dims).
 * White air and one object: the identity plate on two short posts — the
 * building's dedication plaque. The interactive schedule (the four doors)
 * lives in the RoofPanel; the plate carries the engraved identity and the
 * set's closing stamp. Nothing else stands on the lid.
 */
export function RoofPlate() {
  const pal = usePalette();
  return (
    <group position={[0, 3.61, 0]}>
      <BlobShadow position={[0, 0.012, 0.15]} width={1.4} depth={0.6} opacity={0.12} />
      {/* Two short posts */}
      <mesh position={[-0.4, 0.15, 0]}>
        <boxGeometry args={[0.04, 0.3, 0.04]} />
        <meshStandardMaterial color={pal.alum} roughness={0.45} metalness={0.1} />
      </mesh>
      <mesh position={[0.4, 0.15, 0]}>
        <boxGeometry args={[0.04, 0.3, 0.04]} />
        <meshStandardMaterial color={pal.alum} roughness={0.45} metalness={0.1} />
      </mesh>
      {/* The plate — door proportions, plumb, facing the station */}
      <mesh position={[0, 1.0, 0]}>
        <boxGeometry args={[1.05, 1.45, 0.06]} />
        <meshStandardMaterial color={pal.resin} roughness={0.72} />
      </mesh>
      <CaptionPlate
        position={[-0.42, 1.45, 0.06]}
        lines={[`${PROFILE.alias} · SITE 009`, PROFILE.name.toUpperCase()]}
      />
      <CaptionPlate position={[-0.42, 0.42, 0.06]} lines={['REVISION A · END OF SET']} />
    </group>
  );
}
