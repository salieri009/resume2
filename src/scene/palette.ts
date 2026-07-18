import { createContext, useContext } from 'react';

/**
 * Scene color law — single enforcement point for the constitution's token
 * table (docs/ARCHITECTURE_OF_SOFTWARE.md) and Chapter 06 derivatives.
 * Scene components read the active palette via usePalette(); the PAPER print
 * is the canonical one, the INK print is the same drawing as a negative
 * (bible 06: "a blueprint's ancestor, not a cyberpunk poster").
 */
export interface ScenePalette {
  /** Which print this is — PAPER (canonical) or INK (negative). */
  print: 'paper' | 'ink';
  /** The sheet / void — also the WebGL clear color. */
  paper: string;
  concrete: string;
  resin: string;
  /** Resting lines and lettering. */
  graphite: string;
  /** Graphite's quiet companion — secondary lettering (mirrors --graphite-mute). */
  mute: string;
  ink: string;
  alum: string;
  glass: string;
  /** The checker's pen — rare blueprint note; also the exit's blueprint register. */
  blueprint: string;
  /** Interaction only — identical in both prints (constitution: #2F6BFF). */
  signal: string;
  /** Survey grid — a derivative of the sheet, not a token. */
  grid: string;
  /** Tone-4 held shade — apertures and slits. */
  shade: string;
}

export const PAPER_PRINT: ScenePalette = {
  print: 'paper',
  paper: '#F2F1ED',
  concrete: '#C8C4BC',
  resin: '#E8E6E1',
  graphite: '#2A2C2E',
  mute: '#5A5D61',
  ink: '#0E0F10',
  // A half-step above the steel token — reads as finished metal without an
  // environment map (see bible 06 Wave-1 revision note).
  alum: '#B6BBC2',
  glass: '#B8C4D4',
  blueprint: '#1E3A5F',
  signal: '#2F6BFF',
  grid: '#D0CEC8',
  shade: '#565A5F',
};

/** The negative print: lines turn paper-white, masses sit barely off the ink ground. */
export const INK_PRINT: ScenePalette = {
  print: 'ink',
  paper: '#0E0F10',
  concrete: '#3A3C40',
  resin: '#1A1B1D',
  graphite: '#E6E4DF',
  mute: '#A8AAAE',
  ink: '#F2F1ED',
  alum: '#6A7078',
  glass: '#33404E',
  blueprint: '#5B82BC',
  signal: '#2F6BFF',
  grid: '#2A2C2E',
  shade: '#08090A',
};

export function getScenePalette(theme: 'light' | 'dark'): ScenePalette {
  return theme === 'dark' ? INK_PRINT : PAPER_PRINT;
}

const PaletteContext = createContext<ScenePalette>(PAPER_PRINT);
export const PaletteProvider = PaletteContext.Provider;

/** Active print for scene components (SiteContext does not cross the Canvas root). */
export function usePalette(): ScenePalette {
  return useContext(PaletteContext);
}

// Light-print constants for non-reactive call sites (print-agnostic geometry, tests).
export const PAPER = PAPER_PRINT.paper;
export const CONCRETE = PAPER_PRINT.concrete;
export const RESIN = PAPER_PRINT.resin;
export const GRAPHITE = PAPER_PRINT.graphite;
export const MUTE = PAPER_PRINT.mute;
export const INK = PAPER_PRINT.ink;
export const ALUM = PAPER_PRINT.alum;
export const GLASS = PAPER_PRINT.glass;
export const SIGNAL = PAPER_PRINT.signal;
export const GRID = PAPER_PRINT.grid;
export const SHADE = PAPER_PRINT.shade;
