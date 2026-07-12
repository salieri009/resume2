import * as THREE from 'three';

/**
 * Fixed axonometric view shared with the CSS-transform components:
 * CSS `rotateX(58deg) rotateZ(-45deg)` (HeroAxono / ProjectDetail) is the same
 * projection as a camera at elevation 90° − 58° = 32°, azimuth 45°.
 */
export const AXO_ELEV = THREE.MathUtils.degToRad(32);
export const AXO_AZIM = THREE.MathUtils.degToRad(45);

const CAM_DIST = 60;
/** World units visible vertically at zoom 1. */
const VIEW_HEIGHT = 21;

/** Unit direction from target to camera. */
export const CAM_DIR = new THREE.Vector3(
  Math.cos(AXO_ELEV) * Math.sin(AXO_AZIM),
  Math.sin(AXO_ELEV),
  Math.cos(AXO_ELEV) * Math.cos(AXO_AZIM),
);

export function makeAxoCamera(aspect: number): THREE.OrthographicCamera {
  const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 160);
  sizeFrustum(cam, aspect);
  return cam;
}

export function sizeFrustum(cam: THREE.OrthographicCamera, aspect: number): void {
  const halfH = VIEW_HEIGHT / 2;
  const halfW = halfH * aspect;
  cam.left = -halfW;
  cam.right = halfW;
  cam.top = halfH;
  cam.bottom = -halfH;
  cam.updateProjectionMatrix();
}

/** Orthographic pan/zoom follow — replaces the old perspective dolly. */
export function placeCamera(cam: THREE.OrthographicCamera, target: THREE.Vector3, zoom: number): void {
  cam.position.copy(target).addScaledVector(CAM_DIR, CAM_DIST);
  cam.zoom = zoom;
  cam.updateProjectionMatrix();
  cam.lookAt(target);
}
