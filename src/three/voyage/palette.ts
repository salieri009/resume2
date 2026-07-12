import * as THREE from 'three';
import type { Theme } from '../../data/types';
import type { IslandPaletteKey } from '../../data/voyage';

export interface VoyagePalette {
  accent: THREE.Color;
  bg: THREE.Color;
  horizon: THREE.Color;
  waterDeep: THREE.Color;
  waterShallow: THREE.Color;
  /** Ink tone for inverted-hull outlines. */
  outline: number;
  sand: number;
  reef: number;
  rock: number;
  wood: number;
  stone: number;
  trim: number;
  deck: number;
  foliage: number;
  terrain: Record<IslandPaletteKey, number>;
}

export function readCssColor(varName: string, fallback: string): THREE.Color {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  try {
    return new THREE.Color(raw || fallback);
  } catch {
    return new THREE.Color(fallback);
  }
}

/**
 * Scene palette: live CSS theme tokens (accent, bg — effect re-runs on theme
 * change) plus fixed desaturated diorama tones tuned per theme.
 */
export function makePalette(theme: Theme): VoyagePalette {
  const dark = theme === 'dark';
  const accent = readCssColor('--c-accent', dark ? '#ff4d5e' : '#c81e30');
  const bg = readCssColor('--c-bg', dark ? '#0a0b0d' : '#f5f4f1');
  const horizon = bg.clone().lerp(new THREE.Color(0x4a6a8a), 0.35);
  // Dark theme: sea derived from the page tone. Light theme: fixed paper-chart
  // blues — deriving from the bright bg just washes the water out to grey.
  const waterDeep = dark
    ? bg.clone().lerp(new THREE.Color(0x0f2a42), 0.55)
    : new THREE.Color(0x7ba2bb);
  const waterShallow = dark
    ? waterDeep.clone().lerp(new THREE.Color(0x1e4a62), 0.35)
    : new THREE.Color(0xa9c8d8);
  return {
    accent,
    bg,
    horizon,
    waterDeep,
    waterShallow,
    outline: dark ? 0x05070a : 0x2c3138,
    sand: dark ? 0xd6c69e : 0xcdb98c,
    reef: dark ? 0x2a5a72 : 0x3f7a94,
    rock: dark ? 0x707a74 : 0x8a938c,
    wood: dark ? 0x7d6650 : 0x8a7158,
    stone: dark ? 0xe2e6ec : 0xf0f2f5,
    trim: dark ? 0x32363e : 0x3d424b,
    deck: dark ? 0xe8eaed : 0xf4f5f7,
    foliage: dark ? 0x4d7d5c : 0x4f8a5f,
    terrain: {
      arid: dark ? 0xc9b488 : 0xbfa878,
      lush: dark ? 0x5d8262 : 0x5f8f66,
      urban: dark ? 0x7d858e : 0x9aa2ab,
      port: dark ? 0x8d939b : 0xa8aeb6,
      signal: dark ? 0x64788c : 0x7b90a4,
    },
  };
}

export function hashSeed(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}
