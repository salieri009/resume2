import type { FloorId, RoomId } from '../building/program';
import type { SKILL_PROOFS } from './academic';

/**
 * The five trades of the B1 mechanical core (bible 04/B1-CORE) — the single
 * source of truth for both the 3D risers (CoreRisers) and the HUD schedule
 * (CorePanel). Each skill is a pipe, and a pipe is only real if it goes
 * somewhere: every riser terminates in a room it serves.
 */
export interface CoreRiser {
  /** Keys the gauge reading in SKILL_PROOFS. */
  id: keyof typeof SKILL_PROOFS;
  /** Stencil letter — A…E. */
  letter: string;
  /** Trade name, stencilled uppercase. */
  trade: string;
  /** The stencilled tools, in reading order (bible content binding). */
  tools: string[];
  /** The room this riser serves — the pipe's destination plate. */
  serves: { floor: FloorId; room: RoomId; tag: string };
  /** An extra fitting noted on the gauge (e.g. a managed service). */
  extra?: string;
}

export const CORE_RISERS: CoreRiser[] = [
  {
    id: 'enterprise',
    letter: 'A',
    trade: 'ENTERPRISE',
    tools: ['Java', 'Python', 'C#', 'C++'],
    serves: { floor: 'L2', room: 'iotbay', tag: 'A-102 · IOTBAY' },
  },
  {
    id: 'ai',
    letter: 'B',
    trade: 'AI / DEEP LEARNING',
    tools: ['Neural Nets', 'CNN', 'YOLOv8', 'PyTorch'],
    serves: { floor: 'L2', room: 'crowd', tag: 'A-101 · CROWD' },
    extra: 'SageMaker',
  },
  {
    id: 'cloud',
    letter: 'C',
    trade: 'CLOUD & DATA',
    tools: ['AWS', 'Docker', 'Data Engineering', 'PostgreSQL'],
    serves: { floor: 'L2', room: 'gundam', tag: 'A-104 · GUNDAM' },
  },
  {
    id: 'graphics',
    letter: 'D',
    trade: 'GRAPHICS',
    tools: ['Three.js', 'GLSL', 'WebGL'],
    serves: { floor: 'L2', room: 'farm', tag: 'A-103 · FARM' },
  },
  {
    id: 'interactive',
    letter: 'E',
    trade: 'FRONTEND',
    tools: ['HTML/CSS', 'JavaScript', 'React', 'Next.js'],
    serves: { floor: 'L2', room: 'crowd', tag: 'A-101 · CROWD' },
  },
];

/**
 * Per-trade pipe gauge in meters (bible: Enterprise is "the heaviest gauge in
 * the room"). A gentle descending gradient reads as five different services,
 * not five clones. Scene-only — a visual property, not content.
 */
export const RISER_GAUGE: Record<CoreRiser['id'], number> = {
  enterprise: 0.17,
  cloud: 0.14,
  ai: 0.13,
  interactive: 0.12,
  graphics: 0.11,
};

/** The description key per riser in STRINGS (the intro leader note). */
export const RISER_DESC: Record<CoreRiser['id'], 'skillA' | 'skillB' | 'skillC' | 'skillD' | 'skillE'> = {
  enterprise: 'skillA',
  ai: 'skillB',
  cloud: 'skillC',
  graphics: 'skillD',
  interactive: 'skillE',
};
