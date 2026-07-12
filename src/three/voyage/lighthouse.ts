import * as THREE from 'three';
import type { VoyagePalette } from './palette';
import { addOutline, toonMat } from './materials';

/**
 * The lighthouse marks "now" — the present the ship sails toward, at the
 * SW end of the route. The lamp is purely emissive (no SpotLight): flat
 * diorama shading plus the translucent beam cone reads better and is cheaper.
 */
export function makeLighthouse(palette: VoyagePalette): THREE.Group {
  const g = new THREE.Group();
  const stone = toonMat(palette.stone);

  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.62, 0.35, 10), stone);
  base.position.y = 0.18;
  g.add(base);

  const keeper = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.32, 0.42), stone);
  keeper.position.set(-0.45, 0.16, 0.35);
  g.add(keeper);

  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.4, 2.1, 12), stone);
  body.position.y = 1.35;
  addOutline(body, palette.outline);
  g.add(body);

  const stripe = new THREE.Mesh(
    new THREE.CylinderGeometry(0.31, 0.31, 0.38, 12),
    toonMat(palette.accent),
  );
  stripe.position.y = 1.55;
  g.add(stripe);

  const gallery = new THREE.Mesh(
    new THREE.TorusGeometry(0.38, 0.04, 6, 16),
    toonMat(palette.trim),
  );
  gallery.rotation.x = Math.PI / 2;
  gallery.position.y = 2.45;
  g.add(gallery);

  const lampMat = toonMat(0xfff4d0, { emissive: 0xffaa44, emissiveIntensity: 0.85 });
  const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 12), lampMat);
  lamp.position.y = 2.55;
  g.add(lamp);

  const beamGeo = new THREE.ConeGeometry(0.9, 5.5, 16, 1, true);
  const beamMat = new THREE.MeshBasicMaterial({
    color: 0xffcc66,
    transparent: true,
    opacity: 0.12,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const beam = new THREE.Mesh(beamGeo, beamMat);
  beam.rotation.x = -Math.PI / 2;
  beam.position.set(0, 2.55, 2.2);
  g.add(beam);

  // "Now" — the end of the voyage (route exits SW at −15, −10).
  g.position.set(-16, 0, -11.5);
  g.userData = { lampMat, beam };
  return g;
}
