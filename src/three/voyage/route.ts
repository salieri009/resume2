import * as THREE from 'three';
import { VOYAGE_ROUTE_3D } from '../../data/voyage';

/** Shared centripetal route — 3D scene samples the same curve as the SVG dashed line. */
export function buildVoyageCurve(): THREE.CatmullRomCurve3 {
  const pts = VOYAGE_ROUTE_3D.map((w) => new THREE.Vector3(w.x, 0.35, w.z));
  return new THREE.CatmullRomCurve3(pts, false, 'centripetal', 0.42);
}

/** Position + unit tangent at parameter u along the route curve. */
export function samplePath(
  curve: THREE.CatmullRomCurve3,
  u: number,
): { pos: THREE.Vector3; velocity: THREE.Vector3 } {
  const clamped = Math.min(1, Math.max(0, u));
  const pos = curve.getPointAt(clamped);
  const aheadU = Math.min(1, clamped + 0.005);
  const velocity = new THREE.Vector3().subVectors(curve.getPointAt(aheadU), pos);
  if (velocity.lengthSq() < 1e-8) {
    velocity.subVectors(pos, curve.getPointAt(Math.max(0, clamped - 0.005)));
  }
  velocity.normalize();
  return { pos, velocity };
}
