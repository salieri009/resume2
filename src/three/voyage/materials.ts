import * as THREE from 'three';

/**
 * Shared 3-step toon ramp. Module-level singleton kept for the app lifetime
 * (3 bytes — cheaper than recreating it on every theme-driven scene rebuild),
 * so it is deliberately excluded from scene disposal.
 */
let gradientMap: THREE.DataTexture | null = null;

export function getToonGradient(): THREE.DataTexture {
  if (!gradientMap) {
    // Shallow ramp (150 → 255) so the dark step never goes muddy.
    const tex = new THREE.DataTexture(new Uint8Array([150, 205, 255]), 3, 1, THREE.RedFormat);
    tex.minFilter = THREE.NearestFilter;
    tex.magFilter = THREE.NearestFilter;
    tex.needsUpdate = true;
    gradientMap = tex;
  }
  return gradientMap;
}

type ToonOpts = Omit<THREE.MeshToonMaterialParameters, 'color' | 'gradientMap'> & {
  flatShading?: boolean;
};

/** Flat diorama material — MeshToonMaterial with the shared step ramp. */
export function toonMat(color: THREE.ColorRepresentation, opts: ToonOpts = {}): THREE.MeshToonMaterial {
  const { flatShading, ...params } = opts;
  const mat = new THREE.MeshToonMaterial({ color, gradientMap: getToonGradient(), ...params });
  // Not part of MeshToonMaterialParameters typings, but honored by the
  // renderer (WebGLPrograms reads material.flatShading on all lit materials).
  if (flatShading) (mat as THREE.MeshToonMaterial & { flatShading: boolean }).flatShading = true;
  return mat;
}

/**
 * Inverted-hull silhouette outline — shares the source geometry, renders the
 * back faces slightly scaled up. Tagged so shadow-flag traversals skip it.
 */
export function addOutline(mesh: THREE.Mesh, color: THREE.ColorRepresentation, scale = 1.035): THREE.Mesh {
  const outline = new THREE.Mesh(
    mesh.geometry,
    new THREE.MeshBasicMaterial({ color, side: THREE.BackSide }),
  );
  outline.scale.setScalar(scale);
  outline.userData.isOutline = true;
  mesh.add(outline);
  return outline;
}

/** Enable shadows on every mesh in the group except outline hulls. */
export function enableShadows(root: THREE.Object3D, receive = true): void {
  root.traverse((obj) => {
    if (obj instanceof THREE.Mesh && !obj.userData.isOutline) {
      obj.castShadow = true;
      obj.receiveShadow = receive;
    }
  });
}
