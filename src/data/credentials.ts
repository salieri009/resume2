import type { Lang } from './types';

/**
 * Letters of commendation — stamped at port. Rendered in the Experience
 * timeline under the Prior Service row. Localized with the same in-file
 * L10N pattern as projects.ts (EN base + ko/ja overrides).
 */

export type CredentialId = 'eusa' | 'rokbg' | 'msshowcase' | 'build';

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
      'Awarded by the Eighth Army Chief of Staff (Lieutenant General) for two years of ROK–US liaison and interpretation duty. The citation spelled my name right — most Americans never managed to say it.',
  },
  {
    id: 'rokbg',
    seal: 'ROK\nARMY',
    issuer: 'Republic of Korea Army',
    title: 'Certificate of Appreciation',
    detail: 'Awarded by Brigadier General Kim for liaison and interpretation support to the command.',
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
];

type CredentialL10N = Partial<Pick<Credential, 'issuer' | 'title' | 'detail'>>;

const CREDENTIALS_L10N: Record<Exclude<Lang, 'en'>, Record<CredentialId, CredentialL10N>> = {
  ko: {
    eusa: {
      issuer: '미 제8군 — 한미연합',
      title: 'Certificate of Achievement (공로상)',
      detail:
        '한미 연락·통역 임무 2년에 대해 미 8군 참모장(중장) 명의로 수여. 상장에는 내 이름이 정확히 적혀 있었다 — 대부분의 미군은 끝내 제대로 발음하지 못했지만.',
    },
    rokbg: {
      issuer: '대한민국 육군',
      title: '표창장 — 준장 표창',
      detail: '연락 및 통역 지원 공로로 김 준장 명의의 표창을 받았다.',
    },
    msshowcase: {
      issuer: 'UTS × Microsoft Sydney',
      title: 'Certificate of Achievement — “Shaping Technologies that Shape Us”',
      detail:
        '620명 규모 코호트에서 선발되어 Microsoft Sydney에서 AI의 사회적 영향에 관한 융합 프로젝트를 발표했다. Microsoft와 업계 전문가들이 함께한 쇼케이스.',
    },
    build: {
      issuer: 'UTS BUILD 프로그램',
      title: '글로벌 리더십 프로그램',
      detail: '학위 밖 비교과 리더십 프로그램 — 글로벌 시민의식, 문화 간 이해, 리더십 워크숍.',
    },
  },
  ja: {
    eusa: {
      issuer: '米第8軍 — 米韓連合',
      title: 'Certificate of Achievement（功労賞）',
      detail:
        '韓米間の連絡・通訳任務2年に対し、米第8軍参謀長（中将）名義で授与。賞状には名前が正しく綴られていた — 発音できた米兵はほとんどいなかったが。',
    },
    rokbg: {
      issuer: '大韓民国陸軍',
      title: '感謝状 — 准将表彰',
      detail: '連絡・通訳支援の功績により、金准将名義の表彰を受けた。',
    },
    msshowcase: {
      issuer: 'UTS × Microsoft Sydney',
      title: 'Certificate of Achievement — “Shaping Technologies that Shape Us”',
      detail:
        '620名のコホートから選抜され、Microsoft SydneyでAIの社会的影響に関する学際プロジェクトを発表。Microsoftと業界の専門家とともに登壇した。',
    },
    build: {
      issuer: 'UTS BUILDプログラム',
      title: 'グローバルリーダーシップ・プログラム',
      detail: '学位外の課外リーダーシップ・プログラム — グローバル市民意識、異文化理解、リーダーシップ研修。',
    },
  },
};

export function getLocalizedCredentials(lang: Lang): Credential[] {
  if (lang === 'en') return CREDENTIALS;
  return CREDENTIALS.map((c) => ({ ...c, ...CREDENTIALS_L10N[lang][c.id] }));
}
