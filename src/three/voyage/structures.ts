import * as THREE from 'three';
import type { IslandStructure } from '../../data/voyage';
import type { VoyagePalette } from './palette';
import { addOutline, toonMat } from './materials';

/**
 * Animation hooks a structure can expose; islands.ts collects these into the
 * island group's userData and VoyageScene drives them in the ambient loop.
 */
export interface StructureAnim {
  /** Objects rotated continuously (windmill hub, scan beam...). */
  spinners?: Array<{ obj: THREE.Object3D; speed: number; axis: 'y' | 'z' }>;
  /** Emissive materials pulsed on a slow blink. */
  blinkMats?: THREE.MeshToonMaterial[];
}

export interface StructureHandle {
  group: THREE.Group;
  anim?: StructureAnim;
}

export function makeStructure(kind: IslandStructure, palette: VoyagePalette): StructureHandle {
  switch (kind) {
    case 'sundial':
      return sundial(palette);
    case 'orbs':
      return orbs(palette);
    case 'standingStones':
      return standingStones(palette);
    case 'windmill':
      return windmill(palette);
    case 'barn':
      return barn(palette);
    case 'paddock':
      return paddock(palette);
    case 'cropRows':
      return cropRows(palette);
    case 'hangar':
      return hangar(palette);
    case 'mecha':
      return mecha(palette);
    case 'antenna':
      return antenna(palette);
    case 'torii':
      return torii(palette);
    case 'containers':
      return containers(palette);
    case 'crane':
      return crane(palette);
    case 'warehouse':
      return warehouse(palette);
    case 'watchtower':
      return watchtower(palette);
    case 'sensorMasts':
      return sensorMasts(palette);
    case 'figures':
      return figures(palette);
  }
}

/* ---- ephemeral — Tide-Glass Isle ---------------------------------------- */

function sundial(p: VoyagePalette): StructureHandle {
  const g = new THREE.Group();
  const plate = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.33, 0.05, 12), toonMat(p.stone));
  plate.position.y = 0.025;
  g.add(plate);
  const gnomon = new THREE.Mesh(new THREE.ConeGeometry(0.045, 0.34, 4), toonMat(p.trim));
  gnomon.position.set(0, 0.18, 0.02);
  gnomon.rotation.x = -0.5;
  g.add(gnomon);
  return { group: g };
}

function orbs(p: VoyagePalette): StructureHandle {
  const g = new THREE.Group();
  const mats: THREE.MeshToonMaterial[] = [];
  const spots = [
    { x: 0, z: 0, h: 0.32 },
    { x: 0.22, z: -0.12, h: 0.22 },
    { x: -0.16, z: 0.16, h: 0.26 },
  ];
  spots.forEach((s) => {
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, s.h, 5), toonMat(p.trim));
    pole.position.set(s.x, s.h / 2, s.z);
    g.add(pole);
    const mat = toonMat(0xfff2cd, { emissive: 0xffc46b, emissiveIntensity: 0.5 });
    mats.push(mat);
    const orb = new THREE.Mesh(new THREE.SphereGeometry(0.055, 10, 10), mat);
    orb.position.set(s.x, s.h + 0.05, s.z);
    g.add(orb);
  });
  return { group: g, anim: { blinkMats: mats } };
}

function standingStones(p: VoyagePalette): StructureHandle {
  const g = new THREE.Group();
  for (let i = 0; i < 5; i++) {
    const a = -0.6 + i * 0.55;
    const h = 0.14 + (i % 3) * 0.05;
    const stone = new THREE.Mesh(new THREE.BoxGeometry(0.07, h, 0.1), toonMat(p.rock, { flatShading: true }));
    stone.position.set(Math.cos(a) * 0.32, h / 2, Math.sin(a) * 0.32);
    stone.rotation.y = a;
    g.add(stone);
  }
  return { group: g };
}

/* ---- farm — Terrace Isle ------------------------------------------------- */

function windmill(p: VoyagePalette): StructureHandle {
  const g = new THREE.Group();
  const tower = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.16, 0.55, 8), toonMat(p.stone));
  tower.position.y = 0.275;
  addOutline(tower, p.outline);
  g.add(tower);
  const cap = new THREE.Mesh(new THREE.ConeGeometry(0.13, 0.14, 8), toonMat(p.accent));
  cap.position.y = 0.62;
  g.add(cap);
  const hub = new THREE.Group();
  hub.position.set(0, 0.52, 0.14);
  for (let i = 0; i < 4; i++) {
    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.34, 0.015), toonMat(p.deck));
    blade.position.y = 0.17;
    const arm = new THREE.Group();
    arm.rotation.z = (i / 4) * Math.PI * 2;
    arm.add(blade);
    hub.add(arm);
  }
  g.add(hub);
  return { group: g, anim: { spinners: [{ obj: hub, speed: 0.0011, axis: 'z' }] } };
}

function barn(p: VoyagePalette): StructureHandle {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.2, 0.24), toonMat(0x9c4f45));
  body.position.y = 0.1;
  addOutline(body, p.outline);
  g.add(body);
  const roof = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.2, 0.18, 4, 1), toonMat(p.deck));
  roof.position.y = 0.28;
  roof.rotation.y = Math.PI / 4;
  roof.scale.set(1.35, 1, 0.95);
  g.add(roof);
  return { group: g };
}

function paddock(p: VoyagePalette): StructureHandle {
  const g = new THREE.Group();
  const postMat = toonMat(p.wood);
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.08, 4), postMat);
    post.position.set(Math.cos(a) * 0.26, 0.04, Math.sin(a) * 0.22);
    g.add(post);
  }
  const rail = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.008, 4, 16), postMat);
  rail.rotation.x = Math.PI / 2;
  rail.position.y = 0.07;
  rail.scale.set(1, 0.85, 1);
  g.add(rail);
  const blobMat = toonMat(0xf2f0ea);
  [
    { x: -0.06, z: 0.03 },
    { x: 0.09, z: -0.06 },
  ].forEach((b) => {
    const blob = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 8), blobMat);
    blob.scale.set(1.3, 0.85, 1);
    blob.position.set(b.x, 0.045, b.z);
    g.add(blob);
  });
  return { group: g };
}

function cropRows(p: VoyagePalette): StructureHandle {
  const g = new THREE.Group();
  const soil = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.03, 0.34), toonMat(0x5c4a3a));
  soil.position.y = 0.015;
  g.add(soil);
  const cropMat = toonMat(p.foliage);
  for (let r = 0; r < 3; r++) {
    const row = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.045, 0.05), cropMat);
    row.position.set(0, 0.05, -0.1 + r * 0.1);
    g.add(row);
  }
  return { group: g };
}

/* ---- gundam — Hangar Isle ------------------------------------------------ */

function hangar(p: VoyagePalette): StructureHandle {
  const g = new THREE.Group();
  const shell = new THREE.Mesh(
    new THREE.CylinderGeometry(0.18, 0.18, 0.44, 12, 1, false, 0, Math.PI),
    toonMat(p.terrain.urban),
  );
  shell.rotation.z = Math.PI / 2;
  shell.position.y = 0.02;
  addOutline(shell, p.outline);
  g.add(shell);
  const back = new THREE.Mesh(new THREE.CircleGeometry(0.18, 12, 0, Math.PI), toonMat(p.trim));
  back.position.set(-0.22, 0.02, 0);
  back.rotation.y = -Math.PI / 2;
  g.add(back);
  const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.015, 0.03), toonMat(p.accent));
  stripe.position.y = 0.2;
  g.add(stripe);
  return { group: g };
}

function mecha(p: VoyagePalette): StructureHandle {
  const g = new THREE.Group();
  const legMat = toonMat(p.deck);
  [-0.05, 0.05].forEach((x) => {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.16, 0.08), legMat);
    leg.position.set(x, 0.08, 0);
    g.add(leg);
  });
  const torso = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.16, 0.12), legMat);
  torso.position.y = 0.24;
  addOutline(torso, p.outline);
  g.add(torso);
  const chest = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.07, 0.02), toonMat(p.accent));
  chest.position.set(0, 0.25, 0.065);
  g.add(chest);
  [-0.12, 0.12].forEach((x) => {
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.15, 0.07), legMat);
    arm.position.set(x, 0.24, 0);
    g.add(arm);
  });
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.07, 0.08), legMat);
  head.position.y = 0.36;
  g.add(head);
  const crest = new THREE.Mesh(new THREE.ConeGeometry(0.012, 0.09, 4), toonMat(p.accent, { emissive: p.accent, emissiveIntensity: 0.3 }));
  crest.position.y = 0.43;
  g.add(crest);
  return { group: g };
}

function antenna(p: VoyagePalette): StructureHandle {
  const g = new THREE.Group();
  const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.03, 0.5, 5), toonMat(p.trim));
  mast.position.y = 0.25;
  g.add(mast);
  const tipMat = toonMat(p.accent, { emissive: p.accent, emissiveIntensity: 0.6 });
  const tip = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 8), tipMat);
  tip.position.y = 0.52;
  g.add(tip);
  return { group: g, anim: { blinkMats: [tipMat] } };
}

function torii(p: VoyagePalette): StructureHandle {
  const g = new THREE.Group();
  const mat = toonMat(p.accent);
  [-0.11, 0.11].forEach((x) => {
    const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.025, 0.26, 6), mat);
    pillar.position.set(x, 0.13, 0);
    g.add(pillar);
  });
  const lintel = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.03, 0.05), mat);
  lintel.position.y = 0.27;
  g.add(lintel);
  const beam = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.022, 0.04), mat);
  beam.position.y = 0.2;
  g.add(beam);
  return { group: g };
}

/* ---- iotbay — Container Port Isle ---------------------------------------- */

function containers(p: VoyagePalette): StructureHandle {
  const g = new THREE.Group();
  const tones = [p.accent.getHex(), p.trim, 0x4f7a8c, p.accent.getHex(), p.rock];
  const spots = [
    { x: 0, z: 0, y: 0.045 },
    { x: 0.15, z: 0.02, y: 0.045 },
    { x: -0.15, z: -0.02, y: 0.045 },
    { x: 0.07, z: 0, y: 0.135 },
    { x: -0.08, z: -0.01, y: 0.135 },
  ];
  spots.forEach((s, i) => {
    const c = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.09, 0.09), toonMat(tones[i % tones.length]));
    c.position.set(s.x, s.y, s.z);
    if (i === 0) addOutline(c, p.outline);
    g.add(c);
  });
  return { group: g };
}

function crane(p: VoyagePalette): StructureHandle {
  const g = new THREE.Group();
  const mat = toonMat(p.accent);
  [-0.14, 0.14].forEach((x) => {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.34, 0.035), mat);
    leg.position.set(x, 0.17, 0);
    g.add(leg);
  });
  const beam = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.04, 0.05), mat);
  beam.position.y = 0.36;
  g.add(beam);
  const cable = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.12, 4), toonMat(p.trim));
  cable.position.set(0.16, 0.3, 0);
  g.add(cable);
  const box = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.07, 0.07), toonMat(0x4f7a8c));
  box.position.set(0.16, 0.2, 0);
  g.add(box);
  return { group: g };
}

function warehouse(p: VoyagePalette): StructureHandle {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.14, 0.24), toonMat(p.terrain.port));
  body.position.y = 0.07;
  addOutline(body, p.outline);
  g.add(body);
  const roof = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.03, 0.26), toonMat(p.trim));
  roof.position.y = 0.155;
  g.add(roof);
  const door = new THREE.Mesh(new THREE.BoxGeometry(0.01, 0.09, 0.1), toonMat(p.accent));
  door.position.set(0.2, 0.05, 0);
  g.add(door);
  return { group: g };
}

/* ---- crowd — Watchtower Isle ---------------------------------------------- */

function watchtower(p: VoyagePalette): StructureHandle {
  const g = new THREE.Group();
  const legMat = toonMat(p.trim);
  [
    [-0.07, -0.07],
    [0.07, -0.07],
    [-0.07, 0.07],
    [0.07, 0.07],
  ].forEach(([x, z]) => {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.02, 0.3, 5), legMat);
    leg.position.set(x, 0.15, z);
    g.add(leg);
  });
  const cabin = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.12, 0.22), toonMat(p.stone));
  cabin.position.y = 0.36;
  addOutline(cabin, p.outline);
  g.add(cabin);
  const roof = new THREE.Mesh(new THREE.ConeGeometry(0.17, 0.1, 4), toonMat(p.accent));
  roof.position.y = 0.47;
  roof.rotation.y = Math.PI / 4;
  g.add(roof);
  // Sweeping scan beam — the YOLO "detector" watching the plaza.
  const scan = new THREE.Group();
  scan.position.y = 0.38;
  const beam = new THREE.Mesh(
    new THREE.ConeGeometry(0.22, 1.1, 12, 1, true),
    new THREE.MeshBasicMaterial({
      color: p.accent.getHex(),
      transparent: true,
      opacity: 0.14,
      side: THREE.DoubleSide,
      depthWrite: false,
    }),
  );
  beam.rotation.x = -Math.PI / 2 - 0.42;
  beam.position.set(0, -0.12, 0.5);
  scan.add(beam);
  g.add(scan);
  return { group: g, anim: { spinners: [{ obj: scan, speed: 0.00042, axis: 'y' }] } };
}

function sensorMasts(p: VoyagePalette): StructureHandle {
  const g = new THREE.Group();
  [
    { x: 0, z: 0, h: 0.34 },
    { x: 0.16, z: 0.1, h: 0.26 },
  ].forEach((s) => {
    const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.02, s.h, 5), toonMat(p.trim));
    mast.position.set(s.x, s.h / 2, s.z);
    g.add(mast);
    const dish = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.04, 8), toonMat(p.deck));
    dish.rotation.z = Math.PI / 2.4;
    dish.position.set(s.x + 0.03, s.h, s.z);
    g.add(dish);
  });
  return { group: g };
}

function figures(p: VoyagePalette): StructureHandle {
  const g = new THREE.Group();
  const spots = [
    { x: 0, z: 0, boxed: true },
    { x: 0.14, z: -0.08, boxed: false },
    { x: -0.13, z: 0.09, boxed: false },
    { x: 0.06, z: 0.15, boxed: true },
    { x: -0.16, z: -0.11, boxed: false },
    { x: 0.22, z: 0.06, boxed: false },
    { x: -0.04, z: -0.17, boxed: false },
  ];
  const bodyMat = toonMat(p.deck);
  spots.forEach((s) => {
    const person = new THREE.Mesh(new THREE.CapsuleGeometry(0.022, 0.06, 2, 6), bodyMat);
    person.position.set(s.x, 0.055, s.z);
    g.add(person);
    if (s.boxed) {
      // YOLO nod — accent wireframe bounding box around detected figures.
      const bbox = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.BoxGeometry(0.09, 0.13, 0.09)),
        new THREE.LineBasicMaterial({ color: p.accent.getHex(), transparent: true, opacity: 0.85 }),
      );
      bbox.position.set(s.x, 0.065, s.z);
      g.add(bbox);
    }
  });
  return { group: g };
}
