/** Ship's papers — identity, registry, and what the vessel carries. */
export const PROFILE = {
  /** Call sign painted on the bow. */
  alias: 'SALIERI',
  /** Registered name in the ship's papers — matches LinkedIn /in/jungwookvan. */
  name: 'Jungwook Van',
  githubUser: 'salieri009',
} as const;

/** Flip `available` to true the moment public/resume.pdf exists — nothing else to change. */
export const RESUME_PDF = {
  available: false as boolean,
  href: '/resume.pdf',
} as const;

/** Hero cargo manifest — the 3-second skill read. Tech labels stay English. */
export const HERO_CARGO = [
  'Java',
  'Python',
  'TypeScript',
  'React',
  'Spring Boot',
  'AWS',
  'Docker',
  'Three.js',
] as const;

/**
 * Harbor log — engineering proof chips. The Microsoft showcase chip is
 * localized (t.heroProofMicrosoft) and rendered before these.
 */
export const HERO_PROOFS = [
  '118 E2E · CI → GHCR',
  'v2.6.0 · live demo',
  '97% commits · ML lead',
] as const;
