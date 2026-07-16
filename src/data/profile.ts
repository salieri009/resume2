/** Ship's papers — identity, registry, and what the vessel carries. */
export const PROFILE = {
  /** Call sign painted on the bow. */
  alias: 'SALIERI',
  /** Registered name in the ship's papers — matches LinkedIn /in/jungwookvan. */
  name: 'Jungwook Van',
  githubUser: 'salieri009',
} as const;

/**
 * Public registry — one source for every URL the site links or prints.
 * The résumé is no longer a PDF waiting to be uploaded: printing the site
 * emits the drawing set itself (see PrintSet), so the old RESUME_PDF flag
 * is gone for good.
 */
export const LINKS = {
  email: 'kordalek@naver.com',
  github: 'https://github.com/salieri009',
  linkedin: 'https://www.linkedin.com/in/jungwookvan/',
  blog: 'https://igewaedam630.tistory.com',
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
 * Engineering proof chips. The Microsoft showcase claim is localized
 * (t.heroProofMicrosoft) and stamped above these, not chipped alongside them.
 */
export const HERO_PROOFS = [
  '118 E2E · CI → GHCR',
  'v2.6.0 · live demo',
  '97% commits · ML lead',
] as const;
