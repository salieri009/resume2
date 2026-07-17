import type { Lang } from './types';

/**
 * Letters of commendation — stamped at port. Rendered in the Experience
 * timeline under the Prior Service row. Localized with the same in-file
 * L10N pattern as projects.ts (EN base + ko/ja overrides).
 */

export type CredentialId = 'eusa' | 'rokbg' | 'msshowcase' | 'build' | 'bit';

export interface Credential {
  id: CredentialId;
  /** Short mono stamp text inside the circular seal — stays English. */
  seal: string;
  issuer: string;
  title: string;
  detail: string;
}

export const CREDENTIALS: Credential[] = [
  {
    id: 'eusa',
    seal: 'EIGHTH\nARMY',
    issuer: 'US Eighth Army — ROK/US Combined',
    title: 'Certificate of Achievement',
    detail:
      'Awarded by the Eighth Army Chief of Staff (Lieutenant General) for two years of ROK–US liaison and interpretation duty.',
  },
  {
    id: 'rokbg',
    seal: 'ROK\nARMY',
    issuer: 'Republic of Korea Army',
    title: 'Certificate of Appreciation',
    detail:
      'Served through two ROK–US Combined Command Post Training (CCPT) exercises — in the office early translating briefing materials, consecutive interpretation in coordination meetings, and the everyday office talk in between. Commended by Brigadier General Kim.',
  },
  {
    id: 'msshowcase',
    seal: '1 / 620',
    issuer: 'UTS × Microsoft Sydney',
    title: 'Certificate of Achievement — “Shaping Technologies that Shape Us”',
    detail:
      'Selected from a cohort of 620 students to showcase cross-disciplinary work on AI’s societal impact at Microsoft Sydney, alongside Microsoft and industry professionals.',
  },
  {
    id: 'build',
    seal: 'UTS\nBUILD',
    issuer: 'UTS BUILD Program',
    title: 'Global Leadership Program',
    detail:
      'Extra-curricular leadership program beyond the degree — global citizenship, intercultural understanding, leadership workshops.',
  },
  {
    id: 'bit',
    seal: 'UTS\nBIT',
    issuer: 'University of Technology Sydney',
    title: 'UTS Bachelor of IT — Graduation Diploma',
    detail:
      'Bachelor of Information Technology (C10148), complete 2026. Major: Enterprise Software Development · Sub-major: Computer Graphics and Animation. GPA 6.00/7.0 · WAM 80.31 · 144 credit points.',
  },
];

type CredentialL10N = Partial<Pick<Credential, 'issuer' | 'title' | 'detail'>>;

const CREDENTIALS_L10N: Record<Exclude<Lang, 'en'>, Record<CredentialId, CredentialL10N>> = {
  ko: {
    eusa: {
      issuer: '미 제8군 — 한미연합',
      title: 'Certificate of Achievement (공로상)',
      detail: '한미 연락·통역 임무 2년에 대해 미 8군 참모장(중장) 명의로 수여.',
    },
    rokbg: {
      issuer: '대한민국 육군',
      title: '표창장 — 준장 표창',
      detail:
        '한미연합 지휘소훈련(CCPT)에 두 차례 참가했습니다. 발표 자료 번역 때문에 아침 일찍 사무실에 나와 통번역을 준비했고, 협조가 필요한 회의에서는 순차 통역을 맡았습니다. 일상 대화와 사무실의 소소한 이야기를 옮기는 것도 제 일이었습니다. 그 공로로 김 준장 명의의 표창을 받았습니다.',
    },
    msshowcase: {
      issuer: 'UTS × Microsoft Sydney',
      title: 'Certificate of Achievement — “Shaping Technologies that Shape Us”',
      detail:
        '620명 규모 코호트에서 선발되어 Microsoft Sydney에서 AI의 사회적 영향에 관한 융합 프로젝트를 발표했습니다. Microsoft와 업계 전문가들이 함께한 쇼케이스입니다.',
    },
    build: {
      issuer: 'UTS BUILD 프로그램',
      title: '글로벌 리더십 프로그램',
      detail: '학위 밖 비교과 리더십 프로그램 — 글로벌 시민의식, 문화 간 이해, 리더십 워크숍.',
    },
    bit: {
      issuer: '시드니공과대학교 (UTS)',
      title: 'UTS Bachelor of IT — 졸업 증서',
      detail:
        '정보기술학사 (C10148), 2026 이수 완료. 전공: Enterprise Software Development · 부전공: Computer Graphics and Animation. GPA 6.00/7.0 · WAM 80.31 · 144학점.',
    },
  },
  ja: {
    eusa: {
      issuer: '米第8軍 — 米韓連合',
      title: 'Certificate of Achievement（功労賞）',
      detail: '韓米間の連絡・通訳任務2年に対し、米第8軍参謀長（中将）名義で授与。',
    },
    rokbg: {
      issuer: '大韓民国陸軍',
      title: '感謝状 — 准将表彰',
      detail:
        '米韓連合指揮所訓練（CCPT）に2回参加しました。発表資料の翻訳のため朝早く事務室に出て通訳・翻訳を準備し、調整が必要な会議では逐次通訳を担当しました。日常会話や事務室のささいなやり取りを訳すのも自分の仕事でした。その功績で金准将名義の表彰を受けました。',
    },
    msshowcase: {
      issuer: 'UTS × Microsoft Sydney',
      title: 'Certificate of Achievement — “Shaping Technologies that Shape Us”',
      detail:
        '620名のコホートから選抜され、Microsoft SydneyでAIの社会的影響に関する学際プロジェクトを発表しました。Microsoftと業界の専門家とともに登壇しています。',
    },
    build: {
      issuer: 'UTS BUILDプログラム',
      title: 'グローバルリーダーシップ・プログラム',
      detail: '学位外の課外リーダーシップ・プログラム — グローバル市民意識、異文化理解、リーダーシップ研修。',
    },
    bit: {
      issuer: 'シドニー工科大学（UTS）',
      title: 'UTS Bachelor of IT — 卒業証書',
      detail:
        '情報技術学士（C10148）、2026年修了。専攻: Enterprise Software Development · 副専攻: Computer Graphics and Animation。GPA 6.00/7.0 · WAM 80.31 · 144単位。',
    },
  },
};

export function getLocalizedCredentials(lang: Lang): Credential[] {
  if (lang === 'en') return CREDENTIALS;
  return CREDENTIALS.map((c) => ({ ...c, ...CREDENTIALS_L10N[lang][c.id] }));
}
