import * as THREE from 'three';
import { VOYAGE_RECIPES, type IslandRecipe, type TreeKind, type VoyageIsland } from '../../data/voyage';
import { hashSeed, type VoyagePalette } from './palette';
import { addOutline, toonMat } from './materials';
import { makeStructure, type StructureAnim } from './structures';
import { makePeriodLabel } from './labels';

/** Ambient-animation hooks VoyageScene drives each frame. */
export interface IslandAnim {
  spinners: Array<{ obj: THREE.Object3D; speed: number; axis: 'y' | 'z' }>;
  blinkMats: THREE.MeshToonMaterial[];
}

function jitterVertices(geo: THREE.CylinderGeometry, seed: number, amount: number): void {
  const pos = geo.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i);
    if (y > 0.02) {
      let h = seed + i * 97;
      h = (h * 1664525 + 1013904223) >>> 0;
      const nudge = (((h % 200) - 100) / 100) * amount;
      pos.setX(i, pos.getX(i) * (1 + nudge));
      pos.setZ(i, pos.getZ(i) * (1 + nudge * 0.8));
    }
  }
  geo.computeVertexNormals();
}

function shade(hex: number, factor: number): number {
  return new THREE.Color(hex).multiplyScalar(factor).getHex();
}

/* ---- terrain variants ----------------------------------------------------- */

function terrainDune(g: THREE.Group, p: VoyagePalette, tone: number, seed: number): void {
  const duneGeo = new THREE.CylinderGeometry(1.02, 1.28, 0.32, 10, 1);
  jitterVertices(duneGeo, seed, 0.09);
  const dune = new THREE.Mesh(duneGeo, toonMat(tone, { flatShading: true }));
  dune.position.y = 0.26;
  addOutline(dune, p.outline);
  g.add(dune);
  // Concentric tide rings — the Perlin/clock motif drawn in the sand.
  [0.42, 0.68].forEach((r) => {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(r, 0.018, 4, 28), toonMat(shade(tone, 0.82)));
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.425;
    g.add(ring);
  });
}

function terrainTerraced(g: THREE.Group, p: VoyagePalette, tone: number): void {
  const levels = [
    { rt: 1.12, rb: 1.24, y: 0.23, f: 0.8 },
    { rt: 0.8, rb: 0.9, y: 0.49, f: 0.95 },
    { rt: 0.48, rb: 0.58, y: 0.75, f: 1.1 },
  ];
  levels.forEach((l, i) => {
    const step = new THREE.Mesh(
      new THREE.CylinderGeometry(l.rt, l.rb, 0.26, 12),
      toonMat(shade(tone, l.f)),
    );
    step.position.y = l.y;
    if (i === 0) addOutline(step, p.outline);
    g.add(step);
  });
}

function terrainPlateau(g: THREE.Group, p: VoyagePalette, tone: number): void {
  const plateau = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 1.12, 0.5, 8), toonMat(tone));
  plateau.position.y = 0.35;
  addOutline(plateau, p.outline);
  g.add(plateau);
  const band = new THREE.Mesh(new THREE.CylinderGeometry(1.13, 1.15, 0.06, 8), toonMat(p.trim));
  band.position.y = 0.13;
  g.add(band);
}

function terrainQuay(g: THREE.Group, p: VoyagePalette, tone: number): void {
  const quay = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.28, 1.6), toonMat(tone));
  quay.position.y = 0.24;
  addOutline(quay, p.outline);
  g.add(quay);
  const apron = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.1, 1.8), toonMat(shade(tone, 0.85)));
  apron.position.y = 0.12;
  g.add(apron);
  // Second pier — the busiest port on the chart.
  const pier2 = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.06, 0.2), toonMat(p.wood));
  pier2.position.set(-1.25, 0.1, -0.3);
  pier2.rotation.y = 0.25;
  g.add(pier2);
}

function terrainTwin(g: THREE.Group, p: VoyagePalette, tone: number, seed: number): void {
  const peakA = new THREE.CylinderGeometry(0.28, 0.66, 0.9, 9, 1);
  jitterVertices(peakA, seed, 0.07);
  const a = new THREE.Mesh(peakA, toonMat(tone, { flatShading: true }));
  a.position.set(-0.42, 0.55, -0.22);
  addOutline(a, p.outline);
  g.add(a);
  const peakB = new THREE.CylinderGeometry(0.22, 0.52, 0.68, 9, 1);
  jitterVertices(peakB, seed * 7 + 3, 0.07);
  const b = new THREE.Mesh(peakB, toonMat(shade(tone, 0.9), { flatShading: true }));
  b.position.set(0.48, 0.44, 0.28);
  g.add(b);
  // Saddle plaza between the peaks — where the crowd gathers.
  const plaza = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.32, 0.52), toonMat(shade(tone, 1.12)));
  plaza.position.set(0.05, 0.26, 0.05);
  g.add(plaza);
}

/* ---- props ----------------------------------------------------------------- */

function makeTree(p: VoyagePalette, kind: TreeKind, x: number, z: number, scale: number): THREE.Group {
  const g = new THREE.Group();
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.04 * scale, 0.06 * scale, 0.22 * scale, 5),
    toonMat(p.wood),
  );
  trunk.position.y = 0.11 * scale;
  g.add(trunk);

  if (kind === 'pine') {
    [0.3, 0.46].forEach((y, i) => {
      const tier = new THREE.Mesh(
        new THREE.ConeGeometry((0.17 - i * 0.05) * scale, 0.26 * scale, 6),
        toonMat(shade(p.foliage, 0.85)),
      );
      tier.position.y = y * scale;
      g.add(tier);
    });
  } else if (kind === 'round') {
    const crown = new THREE.Mesh(new THREE.SphereGeometry(0.16 * scale, 8, 8), toonMat(p.foliage));
    crown.scale.y = 0.9;
    crown.position.y = 0.36 * scale;
    g.add(crown);
  } else {
    const crown = new THREE.Mesh(new THREE.ConeGeometry(0.16 * scale, 0.38 * scale, 6), toonMat(p.foliage));
    crown.position.y = 0.38 * scale;
    g.add(crown);
  }

  g.position.set(x, 0, z);
  return g;
}

const TREE_SPOTS = [
  { x: -0.95, z: 0.42, s: 1 },
  { x: -0.5, z: -0.95, s: 0.85 },
  { x: 0.2, z: -1.05, s: 0.7 },
];

const ROCK_SPOTS = [
  { x: 0.55, z: 0.38 },
  { x: -0.72, z: -0.52 },
];

/* ---- island assembly -------------------------------------------------------- */

export function makeIsland(spec: VoyageIsland, palette: VoyagePalette): THREE.Group {
  const g = new THREE.Group();
  const seed = hashSeed(spec.key);
  const recipe: IslandRecipe = VOYAGE_RECIPES[spec.key];
  const tone = palette.terrain[recipe.paletteKey];
  const anim: IslandAnim = { spinners: [], blinkMats: [] };

  const reef = new THREE.Mesh(
    new THREE.CylinderGeometry(2.05, 2.2, 0.06, 12),
    toonMat(palette.reef, { transparent: true, opacity: 0.42 }),
  );
  reef.position.y = -0.04;
  g.add(reef);

  const foam = new THREE.Mesh(
    new THREE.TorusGeometry(1.42, 0.06, 6, 24),
    toonMat(0xf0f4f8, { transparent: true, opacity: 0.35 }),
  );
  foam.rotation.x = Math.PI / 2;
  foam.position.y = 0.03;
  g.add(foam);

  const beach = new THREE.Mesh(
    new THREE.CylinderGeometry(1.38, 1.48, 0.1, 10),
    toonMat(palette.sand),
  );
  beach.position.y = 0.05;
  g.add(beach);

  switch (recipe.terrain) {
    case 'dune':
      terrainDune(g, palette, tone, seed);
      break;
    case 'terraced':
      terrainTerraced(g, palette, tone);
      break;
    case 'plateau':
      terrainPlateau(g, palette, tone);
      break;
    case 'quay':
      terrainQuay(g, palette, tone);
      break;
    case 'twin':
      terrainTwin(g, palette, tone, seed);
      break;
  }

  recipe.structures.forEach((s) => {
    const { group, anim: sAnim } = makeStructure(s.kind, palette);
    group.position.set(s.x, s.y, s.z);
    if (s.rot) group.rotation.y = s.rot;
    if (s.s) group.scale.setScalar(s.s);
    g.add(group);
    collectAnim(anim, sAnim);
  });

  for (let i = 0; i < recipe.trees.count && i < TREE_SPOTS.length; i++) {
    const t = TREE_SPOTS[i];
    const tree = makeTree(palette, recipe.trees.kind, t.x, t.z, t.s);
    tree.position.y = 0.1;
    g.add(tree);
  }

  for (let i = 0; i < recipe.rocks && i < ROCK_SPOTS.length; i++) {
    const r = ROCK_SPOTS[i];
    const rock = new THREE.Mesh(
      new THREE.DodecahedronGeometry(0.16, 0),
      toonMat(palette.rock, { flatShading: true }),
    );
    rock.position.set(r.x, 0.14, r.z);
    rock.rotation.set(0.4, (seed % 7) + i, 0.2);
    g.add(rock);
  }

  const pier = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.06, 0.22), toonMat(palette.wood));
  pier.position.set(1.15, 0.08, 0.15);
  pier.rotation.y = -0.35;
  g.add(pier);

  const buoyMat = toonMat(palette.accent, { emissive: palette.accent, emissiveIntensity: 0.15 });
  const buoy = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.11, 0.42, 8), buoyMat);
  buoy.position.set(1.35, 0.22, 0.2);
  g.add(buoy);

  const buoyCap = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 8), toonMat(0xfff5e0));
  buoyCap.position.set(1.35, 0.48, 0.2);
  g.add(buoyCap);

  // Timeline chip — each island announces its place in the dev chronology.
  const label = makePeriodLabel(`${spec.period} · WP-0${spec.order}`);
  label.position.set(0.25, 2.0, 0);
  g.add(label);

  g.position.set(spec.pos3d.x, 0, spec.pos3d.z);
  g.userData = {
    key: spec.key,
    label: spec.label,
    stack: spec.stack,
    period: spec.period,
    order: spec.order,
    pulseMats: [buoyMat],
    foam,
    anim,
  };
  return g;
}

function collectAnim(into: IslandAnim, from?: StructureAnim): void {
  if (!from) return;
  if (from.spinners) into.spinners.push(...from.spinners);
  if (from.blinkMats) into.blinkMats.push(...from.blinkMats);
}
