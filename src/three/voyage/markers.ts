import * as THREE from 'three';
import { VOYAGE_DOCK_INDICES, VOYAGE_ROUTE_3D } from '../../data/voyage';
import type { VoyagePalette } from './palette';
import { toonMat } from './materials';

export const ROUTE_SEGMENTS = 96;

/** Faint dashed line showing the full planned route. */
export function makeRouteLine(curve: THREE.CatmullRomCurve3, accent: THREE.Color): THREE.Line {
  const routePts = curve.getSpacedPoints(ROUTE_SEGMENTS);
  const routeGeo = new THREE.BufferGeometry().setFromPoints(routePts);
  const routeLine = new THREE.Line(
    routeGeo,
    new THREE.LineDashedMaterial({
      color: accent.getHex(),
      dashSize: 0.3,
      gapSize: 0.22,
      transparent: true,
      opacity: 0.4,
    }),
  );
  routeLine.computeLineDistances();
  return routeLine;
}

/**
 * Solid accent overlay of the same route — VoyageScene extends its draw range
 * with scroll progress so the journey stays lit behind the ship.
 */
export function makeProgressRoute(curve: THREE.CatmullRomCurve3, accent: THREE.Color): THREE.Line {
  const pts = curve.getSpacedPoints(ROUTE_SEGMENTS).map((p) => new THREE.Vector3(p.x, p.y + 0.02, p.z));
  const geo = new THREE.BufferGeometry().setFromPoints(pts);
  geo.setDrawRange(0, 0);
  return new THREE.Line(
    geo,
    new THREE.LineBasicMaterial({ color: accent.getHex(), transparent: true, opacity: 0.9 }),
  );
}

/** Departure flag at the NE chart entry — where the voyage began (2025). */
export function makeStartMarker(palette: VoyagePalette): THREE.Group {
  const g = new THREE.Group();
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.045, 1.1, 6), toonMat(palette.trim));
  pole.position.y = 0.55;
  g.add(pole);
  const flag = new THREE.Mesh(
    new THREE.PlaneGeometry(0.5, 0.3),
    toonMat(palette.accent, { side: THREE.DoubleSide, emissive: palette.accent, emissiveIntensity: 0.15 }),
  );
  flag.position.set(0.27, 0.92, 0);
  g.add(flag);
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.2, 0.1, 8), toonMat(palette.stone));
  base.position.y = 0.05;
  g.add(base);
  g.position.set(15.5, 0, 11.5);
  return g;
}

/** Glowing dock spheres where the ship passes each island pier. */
export function makeDockMarkers(curve: THREE.CatmullRomCurve3, accent: THREE.Color): THREE.Group {
  const g = new THREE.Group();
  VOYAGE_DOCK_INDICES.forEach((dockIdx) => {
    const marker = new THREE.Mesh(
      new THREE.SphereGeometry(0.07, 8, 8),
      toonMat(accent, { emissive: accent, emissiveIntensity: 0.2 }),
    );
    const pt = curve.getPoint(dockIdx / (VOYAGE_ROUTE_3D.length - 1));
    marker.position.set(pt.x, 0.12, pt.z);
    g.add(marker);
  });
  return g;
}
