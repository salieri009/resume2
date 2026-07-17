import { usePalette } from '../palette';
import { BlobShadow } from '../primitives';

/**
 * R · The Roof (bible 04/R-ROOF, concept sheet dims).
 * White air and one object: the identity plate on two short posts.
 * Engraved identity + doors live in RoofPanel (document flow) so Html
 * captions never stack over the plate or the HUD.
 */
export function RoofPlate() {
  const pal = usePalette();
  return (
    <group position={[0, 3.61, 0]}>
      <BlobShadow position={[0, 0.012, 0.15]} width={1.4} depth={0.6} opacity={0.12} />
      <mesh position={[-0.4, 0.15, 0]}>
        <boxGeometry args={[0.04, 0.3, 0.04]} />
        <meshStandardMaterial color={pal.alum} roughness={0.45} metalness={0.1} />
      </mesh>
      <mesh position={[0.4, 0.15, 0]}>
        <boxGeometry args={[0.04, 0.3, 0.04]} />
        <meshStandardMaterial color={pal.alum} roughness={0.45} metalness={0.1} />
      </mesh>
      <mesh position={[0, 1.0, 0]}>
        <boxGeometry args={[1.05, 1.45, 0.06]} />
        <meshStandardMaterial color={pal.resin} roughness={0.72} />
      </mesh>
    </group>
  );
}
