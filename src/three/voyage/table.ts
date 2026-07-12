import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import type { VoyagePalette } from './palette';
import { toonMat } from './materials';
import { WATER_W, WATER_D } from './water';

/**
 * Finite diorama base — the sea sits inset on a rounded "chart table" slab
 * (map-on-a-table), replacing the old infinite plane + fog horizon.
 */
export function makeChartTable(palette: VoyagePalette): THREE.Group {
  const g = new THREE.Group();

  const slabTone = palette.bg.clone().lerp(new THREE.Color(0x88919d), 0.28);
  // Top sits at −0.13: just under the water plane at 0 so wave troughs
  // (≈ −0.11 with the shared WAVE_TERMS amplitudes) never dip through it.
  const slab = new THREE.Mesh(
    new RoundedBoxGeometry(WATER_W + 2, 1.4, WATER_D + 2, 2, 0.5),
    toonMat(slabTone),
  );
  slab.position.y = -0.83;
  slab.receiveShadow = true;
  g.add(slab);

  // Accent trim loop on the visible slab margin — the chart border.
  const hx = WATER_W / 2 + 0.55;
  const hz = WATER_D / 2 + 0.55;
  const trim = new THREE.LineLoop(
    new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-hx, -0.1, -hz),
      new THREE.Vector3(hx, -0.1, -hz),
      new THREE.Vector3(hx, -0.1, hz),
      new THREE.Vector3(-hx, -0.1, hz),
    ]),
    new THREE.LineBasicMaterial({ color: palette.accent.getHex(), transparent: true, opacity: 0.5 }),
  );
  g.add(trim);

  // Chart grid printed over the water (crests stay below y = 0.14).
  const gridMat = new THREE.LineBasicMaterial({
    color: palette.accent.getHex(),
    transparent: true,
    opacity: 0.13,
  });
  const gridY = 0.14;
  const gxMax = WATER_W / 2 - 1;
  const gzMax = WATER_D / 2 - 0.5;
  const grid = new THREE.Group();
  for (let x = -gxMax; x <= gxMax + 0.01; x += 2.4) {
    grid.add(
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(x, gridY, -gzMax),
          new THREE.Vector3(x, gridY, gzMax),
        ]),
        gridMat,
      ),
    );
  }
  for (let z = -gzMax; z <= gzMax + 0.01; z += 2.4) {
    grid.add(
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(-gxMax, gridY, z),
          new THREE.Vector3(gxMax, gridY, z),
        ]),
        gridMat,
      ),
    );
  }
  g.add(grid);

  g.add(makeCompassRose(palette));
  return g;
}

/** Flat compass rose printed on the chart, clear of islands and route. */
function makeCompassRose(palette: VoyagePalette): THREE.Group {
  const g = new THREE.Group();
  const lineMat = new THREE.LineBasicMaterial({
    color: palette.accent.getHex(),
    transparent: true,
    opacity: 0.55,
  });

  const circlePts: THREE.Vector3[] = [];
  for (let i = 0; i <= 32; i++) {
    const a = (i / 32) * Math.PI * 2;
    circlePts.push(new THREE.Vector3(Math.cos(a) * 1.15, 0, Math.sin(a) * 1.15));
  }
  g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(circlePts), lineMat));

  const cross = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, -1.5),
    new THREE.Vector3(0, 0, 1.5),
    new THREE.Vector3(-1.5, 0, 0),
    new THREE.Vector3(1.5, 0, 0),
  ]);
  g.add(new THREE.LineSegments(cross, lineMat));

  // North needle — small flat accent diamond pointing −z (chart north).
  const needle = new THREE.Mesh(
    new THREE.ConeGeometry(0.16, 0.85, 4),
    toonMat(palette.accent, { emissive: palette.accent, emissiveIntensity: 0.2 }),
  );
  needle.rotation.x = -Math.PI / 2;
  needle.position.set(0, 0.02, -0.55);
  g.add(needle);

  g.position.set(18.2, 0.2, -9.2);
  return g;
}
