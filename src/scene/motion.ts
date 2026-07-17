import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(CustomEase);

// Timelines run on the wall clock, not the frame clock. With lag smoothing,
// a throttled tab (backgrounded mid-boot, embedded pane) advances ~33 ms per
// rare tick and the boot crawls in slow motion; with it off, returning to the
// tab jumps to the true elapsed pose — the 08 doctrine's cut, not a replay.
gsap.ticker.lagSmoothing(0);

/**
 * Motion law (bible Chapter 05): one ease for camera and masses —
 * the constitution's cubic-bezier(0.22, 1, 0.36, 1) — plus the single
 * sanctioned exception, ink-on, which moves like a drawing hand.
 */
CustomEase.create('site', '0.22, 1, 0.36, 1');
export const EASE_SITE = 'site';

/** Ink-on draws like a hand: symmetric, slowing into corners (05's sole exception). */
export const EASE_INK = 'power2.inOut';

/** Duration menu — chosen by meaning, never by distance (Chapter 05). */
export const DUR = {
  /** Crossing a hall: boot→lobby, floor→floor, leaving a room. */
  civic: 1.1,
  /** Entering a room: the extra quarter-second is the doorway. */
  threshold: 1.35,
  /** A within-room build move — the timeline stage assembling home (ink ease). */
  assemble: 1.2,
  /** The journey's longest single move. */
  roofAscent: 1.6,
  /** Boot ink stroke. */
  ink: 1.4,
  /** Boot extrusion. */
  extrude: 1.8,
  /** The held stillness after the boot. */
  bootHold: 0.35,
} as const;
