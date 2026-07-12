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

export interface ProjectLayer {
  label: string;
  items: string[];
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
  navOnline: string;
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
  lighthouseStatus: string;
  lighthouseUptime: string;
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
}
