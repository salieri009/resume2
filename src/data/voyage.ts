import type { ProjectKey } from './types';

/** One island on the voyage chart — positions shared by SVG fallback and Three.js scene. */
export interface VoyageIsland {
  key: ProjectKey;
  /** Chronological visit order (1 = earliest). */
  order: number;
  /** Short period label shown in tooltips / mobile cards. */
  period: string;
  label: string;
  stack: string;
  svg: { cx: number; cy: number; r: number };
  pos3d: { x: number; z: number };
}

/** Map 3D chart coordinates (x, z) onto the SVG viewBox (720 × 360). */
export function voyageToSvg(x: number, z: number): { cx: number; cy: number } {
  return { cx: 360 + x * 19, cy: 188 - z * 11.5 };
}

function islandSvg(x: number, z: number, r: number) {
  const { cx, cy } = voyageToSvg(x, z);
  return { cx, cy, r };
}

/**
 * Ship channel — water waypoints only (not island centres).
 * Centripetal Catmull-Rom through these points keeps the hull on the dashed line.
 */
export const VOYAGE_ROUTE_3D: ReadonlyArray<{ x: number; z: number }> = [
  { x: 15, z: 11 }, // chart entry — NE
  { x: 11.5, z: 9 },
  { x: 9.5, z: 7 }, // approach ephemeral
  { x: 10.5, z: 2.5 }, // channel E → farm
  { x: 12.5, z: -1.5 }, // approach farm
  { x: 5, z: 2 }, // channel farm → gundam
  { x: -4.5, z: 5.5 }, // approach gundam
  { x: 1, z: -1.5 }, // channel gundam → iotbay
  { x: 3, z: -8.5 }, // approach iotbay
  { x: -4, z: -6.5 }, // channel iotbay → crowd
  { x: -10.5, z: -5.5 }, // approach crowd
  { x: -15, z: -10 }, // chart exit — SW
];

/**
 * Islands ordered by ship visit = project chronology (oldest → newest).
 * Placed beside the channel so the route passes the pier, not through the hill.
 */
export const VOYAGE_ISLANDS: VoyageIsland[] = [
  {
    key: 'ephemeral',
    order: 1,
    period: '2025',
    label: 'EphemeralTime',
    stack: 'p5.js · Perlin · Audio',
    pos3d: { x: 10.5, z: 6 },
    svg: islandSvg(10.5, 6, 32),
  },
  {
    key: 'farm',
    order: 2,
    period: '2025 CG',
    label: 'Farm Simulator',
    stack: 'Three.js · GLSL',
    pos3d: { x: 13.5, z: -3.5 },
    svg: islandSvg(13.5, -3.5, 34),
  },
  {
    key: 'gundam',
    order: 3,
    period: '2025 summer',
    label: 'Gundam Board',
    stack: 'Next.js · Chalice · JWT',
    pos3d: { x: -6.5, z: 4.5 },
    svg: islandSvg(-6.5, 4.5, 34),
  },
  {
    key: 'iotbay',
    order: 4,
    period: '2025 AUT',
    label: 'IoTBay',
    stack: 'Java · Selenium · Docker/GHCR',
    pos3d: { x: 4.5, z: -10 },
    svg: islandSvg(4.5, -10, 36),
  },
  {
    key: 'crowd',
    order: 5,
    period: '2026 AUT',
    label: 'Crowd Detection',
    stack: 'YOLOv8 · FastAPI · SageMaker',
    pos3d: { x: -12, z: -7 },
    svg: islandSvg(-12, -7, 38),
  },
];

/** SVG route sampled from {@link VOYAGE_ROUTE_3D} (centripetal Catmull-Rom, 56 pts). */
export const VOYAGE_ROUTE_SVG =
  'M645.0 61.5 L623.6 68.5 L602.1 75.4 L581.4 83.2 L561.8 91.9 L544.6 102.2 L539.1 116.3 L543.4 130.7 L550.8 144.8 L559.1 158.6 L569.7 171.8 L582.6 184.4 L595.0 197.0 L588.1 205.6 L565.5 199.9 L544.0 193.1 L522.6 186.0 L501.3 178.9 L479.8 172.0 L457.8 165.7 L435.5 159.9 L413.2 153.9 L391.0 147.9 L368.7 142.0 L346.3 136.2 L323.7 130.7 L300.6 125.8 L276.8 123.8 L282.8 136.1 L298.8 147.3 L315.4 158.0 L332.1 168.8 L348.4 179.8 L363.8 191.2 L377.4 203.4 L388.2 216.5 L398.2 230.0 L407.4 243.6 L415.2 257.6 L420.6 271.9 L416.6 286.0 L393.2 286.7 L370.0 282.1 L347.4 276.7 L324.9 271.1 L302.0 265.9 L278.6 262.0 L255.1 258.2 L231.7 254.2 L208.0 250.8 L183.8 249.3 L159.9 251.4 L138.9 258.7 L121.5 269.0 L106.1 280.4 L91.1 292.0 L75.0 303.0';

/** Indices into {@link VOYAGE_ROUTE_3D} where the ship passes each island pier. */
export const VOYAGE_DOCK_INDICES = [2, 4, 6, 8, 10] as const;

/* ------------------------------------------------------------------------ *
 * Island recipes — "Life Archipelago": each island's terrain and structures
 * echo its project's character. Consumed by src/three/voyage/islands.ts.
 * ------------------------------------------------------------------------ */

export type IslandPaletteKey = 'arid' | 'lush' | 'urban' | 'port' | 'signal';
export type IslandTerrain = 'dune' | 'terraced' | 'plateau' | 'quay' | 'twin';
export type TreeKind = 'palm' | 'pine' | 'round';

export type IslandStructure =
  | 'sundial'
  | 'orbs'
  | 'standingStones'
  | 'windmill'
  | 'barn'
  | 'paddock'
  | 'cropRows'
  | 'hangar'
  | 'mecha'
  | 'antenna'
  | 'torii'
  | 'containers'
  | 'crane'
  | 'warehouse'
  | 'watchtower'
  | 'sensorMasts'
  | 'figures';

export interface IslandStructurePlacement {
  kind: IslandStructure;
  /** Offset from island origin; y = platform height the piece stands on. */
  x: number;
  y: number;
  z: number;
  rot?: number;
  s?: number;
}

export interface IslandRecipe {
  terrain: IslandTerrain;
  paletteKey: IslandPaletteKey;
  structures: IslandStructurePlacement[];
  trees: { count: number; kind: TreeKind };
  rocks: number;
}

export const VOYAGE_RECIPES: Record<ProjectKey, IslandRecipe> = {
  // Tide-Glass Isle — p5.js / Perlin / audio: quiet arid origin, time motifs.
  ephemeral: {
    terrain: 'dune',
    paletteKey: 'arid',
    structures: [
      { kind: 'sundial', x: 0, y: 0.42, z: 0.05 },
      { kind: 'orbs', x: -0.5, y: 0.42, z: -0.38 },
      { kind: 'standingStones', x: 0.52, y: 0.42, z: -0.42 },
    ],
    trees: { count: 1, kind: 'palm' },
    rocks: 2,
  },
  // Terrace Isle — Three.js/GLSL farm sim: stacked paddies, windmill, barn.
  farm: {
    terrain: 'terraced',
    paletteKey: 'lush',
    structures: [
      { kind: 'windmill', x: 0, y: 0.88, z: 0 },
      { kind: 'barn', x: 0.6, y: 0.36, z: -0.38 },
      { kind: 'paddock', x: -0.62, y: 0.36, z: 0.38 },
      { kind: 'cropRows', x: 0.12, y: 0.62, z: 0.42 },
    ],
    trees: { count: 2, kind: 'round' },
    rocks: 1,
  },
  // Hangar Isle — Next.js full-stack solo: machined plateau, mecha, torii.
  gundam: {
    terrain: 'plateau',
    paletteKey: 'urban',
    structures: [
      { kind: 'hangar', x: -0.38, y: 0.6, z: -0.28, rot: 0.35 },
      { kind: 'mecha', x: 0.38, y: 0.6, z: 0.22 },
      { kind: 'antenna', x: -0.08, y: 0.6, z: 0.52 },
      { kind: 'torii', x: 0.95, y: 0.1, z: 0.5, rot: -0.35 },
    ],
    trees: { count: 0, kind: 'palm' },
    rocks: 1,
  },
  // Container Port Isle — Java/Docker/GHCR: flat quay, containers, crane.
  iotbay: {
    terrain: 'quay',
    paletteKey: 'port',
    structures: [
      { kind: 'containers', x: 0.4, y: 0.38, z: -0.32 },
      { kind: 'crane', x: -0.28, y: 0.38, z: 0.18, rot: 0.15 },
      { kind: 'warehouse', x: -0.58, y: 0.38, z: -0.48 },
      { kind: 'containers', x: 0.22, y: 0.38, z: 0.46, rot: 0.9, s: 0.8 },
    ],
    trees: { count: 0, kind: 'palm' },
    rocks: 0,
  },
  // Watchtower Isle — YOLOv8 crowd detection: twin peaks, scan light, figures.
  crowd: {
    terrain: 'twin',
    paletteKey: 'signal',
    structures: [
      { kind: 'watchtower', x: -0.42, y: 1.0, z: -0.22 },
      { kind: 'sensorMasts', x: 0.48, y: 0.78, z: 0.28 },
      { kind: 'figures', x: 0.05, y: 0.42, z: 0.05 },
    ],
    trees: { count: 2, kind: 'pine' },
    rocks: 2,
  },
};
