import * as THREE from 'three';
import { VOYAGE_ROUTE_3D } from '../data/voyage';

/** Shared centripetal route — 3D scene samples the same curve as the SVG dashed line. */
export function buildVoyageCurve(): THREE.CatmullRomCurve3 {
  const pts = VOYAGE_ROUTE_3D.map((w) => new THREE.Vector3(w.x, 0.35, w.z));
  return new THREE.CatmullRomCurve3(pts, false, 'centripetal', 0.42);
}

/** Heading (Y rotation) for hull built with bow along +X. */
export function voyageShipYaw(tangent: THREE.Vector3): number {
  return Math.atan2(-tangent.z, tangent.x);
}

/** Shortest signed delta between two angles (radians). */
export function shortestAngleDelta(from: number, to: number): number {
  let d = to - from;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return d;
}

/** Shared wave height — used by ship bobbing and shore foam in VoyageScene. */
export function waveHeight(x: number, z: number, time: number): number {
  return (
    Math.sin(x * 0.35 + time * 0.0011) * 0.07 +
    Math.cos(z * 0.28 + time * 0.0008) * 0.05 +
    Math.sin((x + z) * 0.18 + time * 0.0014) * 0.035 +
    Math.cos(x * 0.12 - z * 0.22 + time * 0.0009) * 0.02
  );
}

/** Deterministic coast outline for SVG nautical chart islands. */
export function islandCoastPath(cx: number, cy: number, r: number, seed: string): string {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const pts: string[] = [];
  const n = 10;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    h = (h * 1664525 + 1013904223) >>> 0;
    const jitter = 0.78 + (h % 1000) / 2500;
    const px = cx + Math.cos(a) * r * jitter;
    const py = cy + Math.sin(a) * r * jitter * 0.82;
    pts.push(`${i === 0 ? 'M' : 'L'}${px.toFixed(1)} ${py.toFixed(1)}`);
  }
  return `${pts.join(' ')} Z`;
}
