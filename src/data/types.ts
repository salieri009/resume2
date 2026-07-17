export interface ProjectDecision {
  choice: string;
  why: string;
}

export interface ProjectTradeoff {
  rejected: string;
  why: string;
}

export interface ProjectProblem {
  p: string;
  s: string;
}

/**
 * One component cube on an exploded-axono floor. Placement is meaningful,
 * not decorative: size = weight in the project, height = rank within the
 * layer, and a cube sits directly above the lower-layer cube it calls so
 * flow risers stay vertical. Coordinates live on a 180×180 slab.
 */
export interface ProjectBlock {
  label: string;
  left: number;
  top: number;
  size: number;
  height: number;
}

export interface ProjectLayer {
  label: string;
  blocks: ProjectBlock[];
}

/**
 * Architectural typology of the detail axono — which building this project
 * is drawn as. Massing, roof, material hatching, and signature animation
 * are keyed off this id (see ArchFeatures.tsx and the .sal-arch-* CSS).
 */
export type ArchTypology = 'observatory' | 'warehouse' | 'greenhouse' | 'housing' | 'pavilion';

/**
 * Explicit data-path edges for the exploded axono — only real call/data
 * paths get drawn (mirrors `diagram` and `decisions`), so off-path
 * components (e.g. a training-only service) keep a node but no riser.
 */
export interface ProjectFlows {
  /** [lowerLayerIdx, lowerBlockIdx, upperBlockIdx] — the upper block (layer+1) descends into the lower block. */
  risers: [number, number, number][];
  /** [layerIdx, fromBlockIdx, toBlockIdx] — same-slab link between blocks that actually talk. */
  conduits: [number, number, number][];
}

/** Bento-card manifest — curated, short; tech labels stay English. */
export interface ProjectManifest {
  /** One-metric stamp shown as sal-badge, ≤ ~24 chars, e.g. '118 E2E · GHCR'. */
  badge: string;
  /** 3–5 curated stack chips for the card (full stack lives in `stack`). */
  chips: string[];
  /** Short role/metric footer line, e.g. 'Solo — schema to deploy'. */
  footer: string;
}

/** Deployment/pipeline leg drawn as a port-to-port shipping lane. */
export interface ProjectShipping {
  /** Leg name shown in the lane header, e.g. 'Training' — stays English. */
  label: string;
  /** 3–5 port names along the route — stay English, keep each ≤ ~16 chars. */
  ports: string[];
}

export interface Project {
  crumb: string;
  category: string;
  title: string;
  summary: string;
  stack: string[];
  role: string;
  outcome: string;
  github: string;
  diagram: string[];
  shipping: ProjectShipping;
  manifest: ProjectManifest;
  /** Which derived GitHub receipt links exist beyond commits. */
  receipts?: { releases?: boolean; prs?: boolean };
  period: string;
  teamSize: string;
  decisions: ProjectDecision[];
  tradeoffs: ProjectTradeoff[];
  results: string[];
  lessons: string[];
  future: string[];
  layers: ProjectLayer[];
  flows: ProjectFlows;
  arch: ArchTypology;
  overview: string;
  roleDetail: string;
  problems: ProjectProblem[];
}

export type ProjectKey = 'crowd' | 'iotbay' | 'farm' | 'gundam' | 'ephemeral';

export type Lang = 'en' | 'ko' | 'ja';

export type Theme = 'dark' | 'light';

export interface Strings {
  navProjects: string;
  navExperience: string;
  navSkills: string;
  navVoyage: string;
  navAbout: string;
  navContact: string;
  navDownload: string;
  sectionProjects: string;
  sectionExperience: string;
  sectionSkills: string;
  sectionAbout: string;
  courseTop: string;
  priorService: string;
  armyName: string;
  armyRole: string;
  majorLine: string;
  exemptionsNote: string;
  /** Role headline on the thesis wall — the recruiter's three-second read. */
  roleLine: string;
  tagline: string;
  subTagline: string;
  skillsIntro: string;
  skillA: string;
  skillB: string;
  skillC: string;
  skillD: string;
  skillE: string;
  crowdSummary: string;
  iotbaySummary: string;
  farmSummary: string;
  gundamSummary: string;
  githubTile: string;
  ephemeralSummary: string;
  growthIntro: string;
  aboutStory: string;
  aboutHobbies: string;
  growthUts: string;
  growthArmy: string;
  contactTitle: string;
  contactSub: string;
  voyageTitle: string;
  voyageIntro: string;
  voyageMilestonesLabel: string;
  voyageMilestonesNote: string;
  voyageDegreeDone: string;
  voyageIslandHint: string;
  voyageStart: string;
  voyageNow: string;
  backToTop: string;
  heroEyebrow: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;
  heroSrStory: string;
  axonoL0: string;
  axonoL0Sub: string;
  axonoL1: string;
  axonoL1Sub: string;
  axonoL2: string;
  axonoL2Sub: string;
  axonoL3: string;
  axonoL3Sub: string;
  axonoRoof: string;
  detailSectionCaption: string;
  sectionNotesHint: string;
  detailShippingLabel: string;
  detailAxonoCaption: string;
  heroRegistryLine: string;
  heroProofMicrosoft: string;
  detailReceiptsNote: string;
  credentialsTitle: string;
  credentialsNote: string;
  timelineFoundations: string;
  semesterSpr24Title: string;
  semesterSpr24Body: string;
  semesterAut25Title: string;
  semesterAut25Body: string;
  semesterSpr25Title: string;
  semesterSpr25Body: string;
  semesterAut26Title: string;
  semesterAut26Body: string;
  fullRecordNote: string;
  /** Site HUD chrome — lobby, floor labels, archive/library. */
  readMore: string;
  backToLobby: string;
  floorIndex: string;
  archiveTitle: string;
  libraryTitle: string;
  libraryLead: string;
  serverLead: string;
  roofLead: string;
  westLibrary: string;
  eastArchive: string;
  openShelves: string;
  languagesLine: string;
  /** Lobby primary CTA — enters L2 laboratories (Norman: label = action). */
  enterLabs: string;
  /** DOC drawer dismiss control. */
  closeDoc: string;
}
