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
  diagramNote: string;
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
}
