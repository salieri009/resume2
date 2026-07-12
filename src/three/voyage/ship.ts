import * as THREE from 'three';
import type { VoyagePalette } from './palette';
import { addOutline, toonMat } from './materials';

export function makeShip(palette: VoyagePalette): THREE.Group {
  const g = new THREE.Group();
  const hullMat = toonMat(palette.accent);
  const deckMat = toonMat(palette.deck);
  const trimMat = toonMat(palette.trim);

  const hull = new THREE.Mesh(new THREE.BoxGeometry(1.55, 0.32, 0.62), hullMat);
  hull.position.y = 0.12;
  addOutline(hull, palette.outline);
  g.add(hull);

  const bow = new THREE.Mesh(new THREE.ConeGeometry(0.32, 0.62, 4), hullMat);
  bow.rotation.z = -Math.PI / 2;
  bow.position.set(0.95, 0.14, 0);
  g.add(bow);

  const stern = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.28, 0.62), trimMat);
  stern.position.set(-0.72, 0.18, 0);
  g.add(stern);

  const cabin = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.32, 0.46), deckMat);
  cabin.position.set(-0.12, 0.42, 0);
  addOutline(cabin, palette.outline);
  g.add(cabin);

  const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.04, 0.95, 6), trimMat);
  mast.position.set(0.18, 0.88, 0);
  g.add(mast);

  const flag = new THREE.Mesh(new THREE.PlaneGeometry(0.22, 0.14), toonMat(palette.accent, { side: THREE.DoubleSide }));
  flag.position.set(0.29, 1.18, 0);
  flag.rotation.y = Math.PI / 2;
  g.add(flag);

  const stack = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.075, 0.38, 8), trimMat);
  stack.position.set(-0.02, 0.68, 0);
  g.add(stack);

  const rail = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.04, 0.64), trimMat);
  rail.position.set(0.05, 0.3, 0);
  g.add(rail);

  return g;
}
