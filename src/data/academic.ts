/** Public academic highlights from UTS Online Student Record (29 Jun 2026). Student number omitted. */

import type { Lang } from './types';

export const DEGREE = {
  institution: 'University of Technology Sydney',
  award: 'Bachelor of Information Technology',
  code: 'C10148',
  status: 'Complete',
  major: 'Enterprise Software Development',
  subMajor: 'Computer Graphics and Animation',
  creditPoints: 144,
  gpa: '6.00',
  wam: '80.31',
  startYear: 2023,
  completedYear: 2026,
} as const;

/**
 * Chronological spine — verified against UTS Online Student Record (29 Jun 2026).
 * Waypoint ids align with Experience semester cards; layer ids with HeroAxono floors.
 */
export const TIMELINE_SPINE = [
  { layer: 'L0', session: 'exempt', waypoint: null, span: 'pre-2024' },
  { layer: 'L1', session: '2024 SPR', waypoint: 'spr24', span: '2024' },
  { layer: 'L2', session: '2025', waypoint: 'aut25', span: '2025 AUT → 2025 SPR' },
  { layer: 'L3', session: '2026 AUT', waypoint: 'aut26', span: '2026' },
] as const;

export type GradeBand = 'HD' | 'D' | 'C' | 'P';

export interface CourseHighlight {
  code: string;
  name: string;
  short: string;
  session: string;
  mark: number;
  grade: GradeBand;
  credit: number;
}

/** High-signal completed subjects for timeline / skills proof. */
export const COURSE_HIGHLIGHTS: CourseHighlight[] = [
  { code: '41113', name: 'Software Development Studio', short: 'Soft Dev Studio', session: '2026 AUT', mark: 95, grade: 'HD', credit: 6 },
  { code: '31251', name: 'Data Structures and Algorithms', short: 'Data Structures', session: '2025 AUT', mark: 92, grade: 'HD', credit: 6 },
  { code: '41025', name: 'Introduction to Software Development', short: 'Intro Soft Dev', session: '2025 AUT', mark: 90, grade: 'HD', credit: 6 },
  { code: '41026', name: 'Advanced Software Development', short: 'Adv Soft Dev', session: '2025 SPR', mark: 87, grade: 'HD', credit: 6 },
  { code: '41001', name: 'Cloud Computing and Software as a Service', short: 'Cloud/SaaS', session: '2024 SPR', mark: 86, grade: 'HD', credit: 6 },
  { code: '31080', name: 'Interactive Media', short: 'Interactive Media', session: '2025 SPR', mark: 82, grade: 'D', credit: 6 },
  { code: '31264', name: 'Computer Graphics', short: 'Computer Graphics', session: '2025 AUT', mark: 81, grade: 'D', credit: 6 },
  { code: '41082', name: 'Introduction to Data Engineering', short: 'Data Engineering', session: '2026 AUT', mark: 81, grade: 'D', credit: 6 },
  { code: '48433', name: 'Software Architecture', short: 'Soft Architecture', session: '2024 SPR', mark: 80, grade: 'D', credit: 6 },
  { code: '42028', name: 'Deep Learning and Convolutional Neural Network', short: 'Deep Learning', session: '2026 AUT', mark: 68, grade: 'C', credit: 6 },
  { code: '31263', name: 'Introduction to Computer Game Development', short: 'Intro Game Dev', session: '2024 SPR', mark: 66, grade: 'C', credit: 6 },
  { code: '31262', name: 'Game Design Methodologies', short: 'Game Design Meth', session: '2025 AUT', mark: 64, grade: 'P', credit: 6 },
];

export type SemesterId = 'spr24' | 'aut25' | 'spr25' | 'aut26';

export interface SemesterHighlight {
  short: string;
  mark: number;
  grade: GradeBand;
}

/** Shipped artifact or industry partner tied to a subject in that semester. */
export interface SemesterArtifact {
  label: string;
  subject: string;
  url: string;
}

export interface SemesterWaypoint {
  id: SemesterId;
  session: string;
  highlights: SemesterHighlight[];
  artifacts?: SemesterArtifact[];
}

export const SEMESTER_WAYPOINTS: SemesterWaypoint[] = [
  {
    id: 'spr24',
    session: '2024 SPR',
    highlights: [
      { short: 'Cloud/SaaS', mark: 86, grade: 'HD' },
      { short: 'Soft Architecture', mark: 80, grade: 'D' },
      { short: 'Comm for IT', mark: 70, grade: 'C' },
      { short: 'Intro Game Dev', mark: 66, grade: 'C' },
    ],
  },
  {
    id: 'aut25',
    session: '2025 AUT',
    highlights: [
      { short: 'Data Structures', mark: 92, grade: 'HD' },
      { short: 'Intro Soft Dev', mark: 90, grade: 'HD' },
      { short: 'Computer Graphics', mark: 81, grade: 'D' },
      { short: 'Game Design Meth', mark: 64, grade: 'P' },
    ],
    artifacts: [
      {
        label: 'The Five Floors',
        subject: 'Game Design Methodologies',
        url: 'https://salierix009.itch.io/the-five-floors',
      },
    ],
  },
  {
    id: 'spr25',
    session: '2025 SPR',
    highlights: [
      { short: 'Adv Soft Dev', mark: 87, grade: 'HD' },
      { short: 'Interactive Media', mark: 82, grade: 'D' },
      { short: 'Interaction Design', mark: 81, grade: 'D' },
      { short: 'Project Mgmt', mark: 80, grade: 'D' },
    ],
    artifacts: [
      {
        label: 'le-restaurant',
        subject: 'Advanced Software Development',
        url: 'https://github.com/aaronurayan/le-restaurant',
      },
    ],
  },
  {
    id: 'aut26',
    session: '2026 AUT',
    highlights: [
      { short: 'Soft Dev Studio', mark: 95, grade: 'HD' },
      { short: 'Data Engineering', mark: 81, grade: 'D' },
      { short: 'TD: Shaping tech', mark: 82, grade: 'D' },
      { short: 'Deep Learning', mark: 68, grade: 'C' },
    ],
    artifacts: [
      {
        label: 'StevTech',
        subject: 'Software Development Studio · industry partner',
        url: 'https://stevtech.com.au/',
      },
    ],
  },
];

export interface AxonoLayerDef {
  id: string;
  /** Level datum on the architectural caption — matches TIMELINE_SPINE sessions. */
  session: string;
  blocks: { label: string; size: number; height: number; left: number; top: number }[];
}

/**
 * Exploded axonometric floors — degree building metaphor, bottom = oldest.
 * Blocks are index-aligned vertical stacks (0: Prog→Cloud→DSA→Studio,
 * 1: DB→Arch→GLSL→CI/CD, 2: Net→Game→Media→Data); HeroAxono derives its
 * logic-flow risers and conduits from that ordering, so keep it stable.
 */
export const AXONO_LAYERS: AxonoLayerDef[] = [
  {
    id: 'l0',
    session: 'exempt',
    blocks: [
      { label: 'Prog', left: 36, top: 40, size: 56, height: 36 },
      { label: 'DB', left: 120, top: 70, size: 48, height: 28 },
      { label: 'Net', left: 70, top: 140, size: 44, height: 24 },
    ],
  },
  {
    id: 'l1',
    session: '2024 SPR',
    blocks: [
      { label: 'Cloud', left: 40, top: 42, size: 60, height: 40 },
      { label: 'Arch', left: 128, top: 88, size: 48, height: 30 },
      { label: 'Game', left: 72, top: 148, size: 42, height: 22 },
    ],
  },
  {
    id: 'l2',
    session: '2025',
    blocks: [
      { label: 'DSA', left: 34, top: 36, size: 58, height: 42 },
      { label: 'GLSL', left: 126, top: 72, size: 46, height: 28 },
      { label: 'Media', left: 68, top: 142, size: 50, height: 32 },
    ],
  },
  {
    id: 'l3',
    session: '2026 AUT',
    blocks: [
      { label: 'Studio', left: 38, top: 38, size: 62, height: 44 },
      { label: 'CI/CD', left: 130, top: 78, size: 46, height: 28 },
      { label: 'Data', left: 70, top: 145, size: 48, height: 30 },
    ],
  },
];

/**
 * Grade localization. Facts (mark, UTS grade band) are frozen — only the
 * presentation changes: KO/JA readers get a familiar equivalence in brackets.
 * UTS bands: HD 85+, D 75-84, C 65-74, P 50-64.
 */
const GRADE_EQUIV_KO: Record<GradeBand, string> = {
  HD: 'A+ 상당',
  D: 'A 상당',
  C: 'B 상당',
  P: '합격',
};

const GRADE_EQUIV_JA: Record<GradeBand, string> = {
  HD: '秀相当',
  D: '優相当',
  C: '良相当',
  P: '可相当',
};

export function formatMark(mark: number, grade: GradeBand, lang: Lang): string {
  if (lang === 'ko') return `${mark}점 ${grade}(${GRADE_EQUIV_KO[grade]})`;
  if (lang === 'ja') return `${mark}点 ${grade}(${GRADE_EQUIV_JA[grade]})`;
  return `${mark} ${grade}`;
}

export function formatGpaWam(lang: Lang): string {
  if (lang === 'ko') return `GPA ${DEGREE.gpa}/7.0 · WAM ${DEGREE.wam}/100`;
  if (lang === 'ja') return `GPA ${DEGREE.gpa}/7.0 · WAM ${DEGREE.wam}/100`;
  return `GPA ${DEGREE.gpa} / 7.0 · WAM ${DEGREE.wam}`;
}

export function formatDegreePlate(lang: Lang): string {
  if (lang === 'ko') return `UTS BIT · 이수 완료 · GPA ${DEGREE.gpa}/7.0 · WAM ${DEGREE.wam}/100 · 144 CP`;
  if (lang === 'ja') return `UTS BIT · 修了 · GPA ${DEGREE.gpa}/7.0 · WAM ${DEGREE.wam}/100 · 144 CP`;
  return `UTS BIT · ${DEGREE.status} · GPA ${DEGREE.gpa}/7.0 · WAM ${DEGREE.wam} · ${DEGREE.creditPoints} CP`;
}

export interface SkillProof {
  short: string;
  mark: number;
  grade: GradeBand;
}

export const SKILL_PROOFS: Record<'enterprise' | 'cloud' | 'graphics' | 'interactive' | 'ai', SkillProof> = {
  enterprise: { short: 'Soft Dev Studio', mark: 95, grade: 'HD' },
  cloud: { short: 'Cloud/SaaS', mark: 86, grade: 'HD' },
  graphics: { short: 'Computer Graphics', mark: 81, grade: 'D' },
  interactive: { short: 'Interactive Media', mark: 82, grade: 'D' },
  ai: { short: 'Deep Learning', mark: 68, grade: 'C' },
};

export function formatProof(proof: SkillProof, lang: Lang): string {
  return `${proof.short} · ${formatMark(proof.mark, proof.grade, lang)}`;
}
