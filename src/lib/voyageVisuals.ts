/**
 * Shared voyage math — deliberately free of runtime `three` imports so the
 * eagerly-loaded SVG fallback (VoyageChart) never pulls Three.js into the
 * main bundle. THREE-dependent route helpers live in src/three/voyage/route.ts,
 * which only the lazy WebGL chunk imports.
 */

/** Heading (Y rotation) for hull built with bow along +X. */
export function voyageShipYaw(tangent: { x: number; z: number }): number {
  return Math.atan2(-tangent.z, tangent.x);
}

/** Shortest signed delta between two angles (radians). */
export function shortestAngleDelta(from: number, to: number): number {
  let d = to - from;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return d;
}

/**
 * Wave spectrum shared between the CPU (ship bobbing/tilt, below) and the GPU
 * water shader (src/three/voyage/water.ts generates GLSL from this same table)
 * — a single source of truth so the hull can never drift off the water surface.
 * Each term contributes `trig(x·kx + z·kz + time·kt) · amp`.
 */
export const WAVE_TERMS = [
  { trig: 'sin', kx: 0.35, kz: 0, kt: 0.0011, amp: 0.045 },
  { trig: 'cos', kx: 0, kz: 0.28, kt: 0.0008, amp: 0.03 },
  { trig: 'sin', kx: 0.18, kz: 0.18, kt: 0.0014, amp: 0.022 },
  { trig: 'cos', kx: 0.12, kz: -0.22, kt: 0.0009, amp: 0.013 },
] as const;

/** Shared wave height — used by ship bobbing and the GPU water displacement. */
export function waveHeight(x: number, z: number, time: number): number {
  let h = 0;
  for (const w of WAVE_TERMS) {
    const phase = x * w.kx + z * w.kz + time * w.kt;
    h += (w.trig === 'sin' ? Math.sin(phase) : Math.cos(phase)) * w.amp;
  }
  return h;
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
