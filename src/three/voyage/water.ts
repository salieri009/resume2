import * as THREE from 'three';
import { WAVE_TERMS } from '../../lib/voyageVisuals';
import type { VoyagePalette } from './palette';
import { getToonGradient } from './materials';

/** Water plane footprint — inset into the chart table slab (see table.ts). */
export const WATER_W = 44;
export const WATER_D = 32;

export interface WaterHandle {
  mesh: THREE.Mesh;
  update(now: number): void;
}

const f = (n: number) => {
  const s = String(n);
  return s.includes('.') || s.includes('e') ? s : `${s}.0`;
};

/** GLSL twin of lib/voyageVisuals.waveHeight, generated from WAVE_TERMS. */
function waveGLSL(): string {
  const sum = WAVE_TERMS
    .map((w) => `${w.trig}(p.x * ${f(w.kx)} + p.y * ${f(w.kz)} + t * ${f(w.kt)}) * ${f(w.amp)}`)
    .join(' + ');
  return `float voyWave(vec2 p, float t) { return ${sum}; }`;
}

function inject(src: string, anchor: string, replacement: string): string {
  if (!src.includes(anchor)) {
    throw new Error(`[voyage] shader anchor missing in three chunk: ${anchor}`);
  }
  return src.replace(anchor, replacement);
}

/**
 * Stylized toon water with GPU waves — displacement and shading run entirely
 * on the GPU (replaces the old per-frame CPU vertex loop + normal recompute).
 * MeshToonMaterial + onBeforeCompile keeps lighting/shadow-receiving for free.
 */
export function makeWater(
  palette: VoyagePalette,
  islands: ReadonlyArray<{ x: number; z: number }>,
): WaterHandle {
  const geo = new THREE.PlaneGeometry(WATER_W, WATER_D, 88, 64);
  const mat = new THREE.MeshToonMaterial({ color: palette.waterShallow, gradientMap: getToonGradient() });

  const uTime = { value: 0 };
  const uShallow = { value: palette.waterShallow.clone() };
  const uDeep = { value: palette.waterDeep.clone() };
  const uFoam = { value: new THREE.Color(0xe8f0f5) };
  const uIslands = {
    value: islands.map((i) => new THREE.Vector3(i.x, i.z, 1.6)), // (x, z, foam-ring radius)
  };

  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = uTime;
    shader.uniforms.uShallow = uShallow;
    shader.uniforms.uDeep = uDeep;
    shader.uniforms.uFoam = uFoam;
    shader.uniforms.uIslands = uIslands;

    shader.vertexShader = inject(
      shader.vertexShader,
      '#include <common>',
      `#include <common>
uniform float uTime;
varying vec3 vVoyWorld;
${waveGLSL()}`,
    );
    // Plane is rotated -90° about X: local (x, y) → world (x, -z), local +Z → world +Y.
    shader.vertexShader = inject(
      shader.vertexShader,
      '#include <begin_vertex>',
      `#include <begin_vertex>
transformed.z += voyWave(vec2(position.x, -position.y), uTime);
vVoyWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;`,
    );

    shader.fragmentShader = inject(
      shader.fragmentShader,
      '#include <common>',
      `#include <common>
uniform float uTime;
uniform vec3 uShallow;
uniform vec3 uDeep;
uniform vec3 uFoam;
uniform vec3 uIslands[${uIslands.value.length}];
varying vec3 vVoyWorld;`,
    );
    shader.fragmentShader = inject(
      shader.fragmentShader,
      '#include <color_fragment>',
      `#include <color_fragment>
{
  // Radial depth gradient — shallow chart-centre, deeper toward the rim.
  float depth = smoothstep(4.0, 18.0, length(vVoyWorld.xz));
  diffuseColor.rgb = mix(uShallow, uDeep, depth);
  // Animated shore foam rings around each island.
  float foam = 0.0;
  for (int i = 0; i < ${uIslands.value.length}; i++) {
    float dist = distance(vVoyWorld.xz, uIslands[i].xy);
    float ringR = uIslands[i].z + 0.22 + sin(uTime * 0.002 + dist * 3.0) * 0.09;
    foam += smoothstep(0.14, 0.02, abs(dist - ringR));
  }
  diffuseColor.rgb = mix(diffuseColor.rgb, uFoam, clamp(foam, 0.0, 1.0) * 0.45);
}`,
    );
  };

  const mesh = new THREE.Mesh(geo, mat);
  mesh.rotation.x = -Math.PI / 2;
  mesh.receiveShadow = true;

  return {
    mesh,
    update(now: number) {
      uTime.value = now;
    },
  };
}
