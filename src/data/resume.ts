import type { Lang, ProjectKey } from './types';
import { SEMESTER_WAYPOINTS, formatMark } from './academic';

/**
 * Resume-register copy for the printed résumé (ResumeSheets) — the one
 * document on the site written in plain hiring-market prose, not the
 * architectural register. Three markets, three conventions:
 *
 *   en — Australian new-grad two-pager (single column, ATS-safe)
 *   ko — 점핏/원티드-style project-centric developer resume
 *   ja — 履歴書 + 職務経歴書 hybrid (JIS-like tables, 編年体)
 *
 * Facts (degree numbers, links, project stacks, credentials) stay in their
 * source modules and are joined at render time; this file holds only copy
 * that exists nowhere else, plus personal facts the rest of the site
 * deliberately omits.
 */

/** Personal facts that appear only on the printed résumé. */
export const RESUME_FACTS = {
  koName: '반정욱',
  /** Hanja/kanji name used as 氏名 on the JA 履歴書 page. */
  hanjaName: '潘政煜',
  furigana: 'バン・ジョンウク',
  /** ROK Army interpreter service window. */
  armyFrom: { y: 2021, m: 1 },
  armyTo: { y: 2023, m: 4 },
  /** UTS enrolment → graduation. */
  utsFrom: { y: 2024, m: 7 },
  utsTo: { y: 2026, m: 7 },
} as const;

export interface ResumeProjectEntry {
  key: ProjectKey;
  /** Resume-friendly period label (projects.ts periods are session codes). */
  period: string;
  /** Short role line for the entry header. */
  role: string;
  /** Quantified, resume-register bullets. */
  bullets: string[];
  /** Tail projects on page 2 render tighter. */
  compact?: boolean;
}

export interface ResumeCopy {
  /** EN Professional Summary / KO 간단 소개 / JA 自己PR. */
  summary: string;
  location: string;
  skillGroups: { label: string; items: string }[];
  projects: ResumeProjectEntry[];
  /** Army-service bullets for the EN/KO experience sections. */
  serviceBullets?: string[];
  /** JA only — 職務要約 at the top of the 職務経歴書 page. */
  jaSummaryOfWork?: string;
  /** JA only — 学歴 rows for the 編年体 table (履歴書 page). */
  jaEducationRows?: { ym: string; event: string }[];
  /** JA only — 職歴 rows for the 編年体 table (履歴書 page). */
  jaCareerRows?: { ym: string; event: string }[];
  /** JA only — 免許・資格 rows (履歴書 page). */
  jaLicenses?: { ym: string; name: string }[];
}

/** '2021.01' / 'Jan 2021' / '2021年1月' — one date register per market. */
export function formatYm(lang: Lang, d: { y: number; m: number }): string {
  if (lang === 'ko') return `${d.y}.${String(d.m).padStart(2, '0')}`;
  if (lang === 'ja') return `${d.y}年${d.m}月`;
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${MONTHS[d.m - 1]} ${d.y}`;
}

export function formatRange(lang: Lang, from: { y: number; m: number }, to: { y: number; m: number }): string {
  return `${formatYm(lang, from)} – ${formatYm(lang, to)}`;
}

const EN: ResumeCopy = {
  location: 'Sydney, NSW',
  summary:
    'Software engineering graduate (UTS Bachelor of Information Technology, Jul 2026 — GPA 6.00/7.0, WAM 80.31) working across backend systems, cloud/DevOps, and ML infrastructure. Led ML on a three-person capstone (97% of commits, shipped to a live demo) and built order and test tooling on an eight-person e-commerce platform with 118 E2E tests and CI/CD. Selected 1 of 620 students to present at Microsoft Sydney. Formerly a ROK Army interpreter on daily ROK–US liaison duty.',
  skillGroups: [
    { label: 'Languages', items: 'Java · Python · TypeScript · JavaScript · C# · C++ · SQL · GLSL' },
    { label: 'Backend', items: 'Spring Boot · FastAPI · Java Servlets/JSP · AWS Chalice (serverless)' },
    { label: 'Frontend', items: 'React 19 · Next.js · Three.js · Tailwind CSS' },
    { label: 'ML / Data', items: 'PyTorch · YOLOv8 · CNNs · AWS SageMaker · DVC · PostgreSQL · SQLite' },
    { label: 'Cloud & DevOps', items: 'AWS · Docker · GitHub Actions CI/CD · GHCR · Google OAuth/JWT' },
    { label: 'Testing', items: 'JUnit · Selenium (118 E2E) · security boundary testing' },
  ],
  serviceBullets: [
    'Two years of daily ROK–US liaison and interpretation duty; awarded a Certificate of Achievement by the Eighth Army Chief of Staff (Lieutenant General).',
    'Served through two ROK–US Combined Command Post Training (CCPT) exercises — briefing-material translation and consecutive interpretation in coordination meetings; commended by a Brigadier General.',
  ],
  projects: [
    {
      key: 'crowd',
      period: '2026',
      role: 'ML Lead — team of 3',
      bullets: [
        'Led ML on a real-time crowd-proximity alert system for travellers with limited mobility; authored 193 of 199 commits across the training pipeline, FastAPI inference service, and SageMaker launch scripts.',
        'Fine-tuned YOLOv8 on the Stanford JRDB dataset with a strict 8:1:1 split; every release cleared a held-out proximity benchmark before shipping.',
        'Kept webcam-to-alert latency inside the warning budget by splitting the system into React → Spring Boot → FastAPI services, each in its own Docker container.',
        'Shipped releases v2.5.0–v2.6.0 with a live demo, specs, ADRs, and training reports; datasets pinned per release with DVC.',
      ],
    },
    {
      key: 'iotbay',
      period: '2025',
      role: 'Developer — team of 8',
      bullets: [
        'Built order-lifecycle features and the test suite on a 111-file layered MVC codebase (Servlet → Service → DAO, one interface per entity) with eight contributors.',
        'Team shipped 118 Selenium E2E tests across ten feature areas; GitHub Actions runs the full suite on every push and deploys Docker images to GHCR.',
        'Hardened the platform against CSRF, SQL injection, and XSS (token validation, prepared statements, output encoding) and locked it in with 14 security boundary tests.',
      ],
    },
    {
      key: 'farm',
      period: '2025–2026',
      role: 'Graphics Lead — team project',
      bullets: [
        'Owned rendering for a browser 3D farm sandbox: scene architecture, four seasons, five weather systems, and day/night lighting.',
        'Held 60 fps in storm scenes by moving thousands of particles to instanced, GPU-driven rendering; wrote a custom GLSL aurora shader in a single draw call.',
      ],
      compact: true,
    },
    {
      key: 'gundam',
      period: '2025',
      role: 'Solo',
      bullets: [
        'Designed, built, and deployed a serverless CRUD board end-to-end: Next.js frontend, AWS Chalice (Python) API, PostgreSQL.',
        'Implemented Google OAuth verification and short-lived JWT issue/verify in Chalice middleware without an auth library.',
      ],
      compact: true,
    },
    {
      key: 'ephemeral',
      period: '2025',
      role: 'Solo',
      bullets: [
        'Built generative art as a small product: IoC container, swappable renderer strategies, zero media assets (all audio synthesized live).',
        'Cut GC pauses 50–70% with a pre-allocated object pool and held 60 fps with thousands of particles via a three-layer canvas pipeline.',
      ],
      compact: true,
    },
  ],
};

const KO: ResumeCopy = {
  location: '시드니, 호주',
  summary:
    '백엔드·클라우드 인프라와 딥러닝의 접점에서 일하는 신입 개발자입니다. UTS 정보기술학사(GPA 6.00/7.0 · WAM 80.31)를 2026년 7월에 마쳤습니다. 3인 캡스톤에서 ML 리드로 커밋의 97%를 작성해 v2.6.0 라이브 데모까지 배포했고, 8인 팀 이커머스에서는 E2E 테스트 118건과 CI/CD를 지켰습니다. 620명 중 선발되어 Microsoft Sydney 쇼케이스에서 발표했습니다. 정확함에 대한 기준은 한미연합 통역병 시절 — 한 단어의 오역이 큰 대가를 치르는 환경 — 에서 몸에 익혔고, 지금은 같은 기준을 코드와 테스트에 적용합니다.',
  skillGroups: [
    { label: '언어', items: 'Java · Python · TypeScript · JavaScript · C# · C++ · SQL · GLSL' },
    { label: '백엔드', items: 'Spring Boot · FastAPI · Java Servlets/JSP · AWS Chalice(서버리스)' },
    { label: '프론트엔드', items: 'React 19 · Next.js · Three.js · Tailwind CSS' },
    { label: 'ML / 데이터', items: 'PyTorch · YOLOv8 · CNN · AWS SageMaker · DVC · PostgreSQL · SQLite' },
    { label: '클라우드 / DevOps', items: 'AWS · Docker · GitHub Actions CI/CD · GHCR · Google OAuth/JWT' },
    { label: '테스트', items: 'JUnit · Selenium (E2E 118건) · 보안 경계 테스트' },
  ],
  serviceBullets: [
    '2년간 한미 연락·통역 임무 수행 — 미 8군 참모장(중장) 명의 Certificate of Achievement 수상.',
    '한미연합 지휘소훈련(CCPT) 2회 참가 — 브리핑 자료 번역과 협조 회의 순차 통역 담당, 준장 표창 수상.',
  ],
  projects: [
    {
      key: 'crowd',
      period: '2026년 1학기',
      role: 'ML 리드 — 3인 팀',
      bullets: [
        '이동이 어려운 여행자를 위한 실시간 혼잡도·근접 경보 시스템에서 ML을 리드 — 199개 커밋 중 193개 작성(학습 파이프라인, FastAPI 추론 서비스, SageMaker 런처 스크립트).',
        'YOLOv8을 Stanford JRDB 데이터셋으로 파인튜닝(8:1:1 분할 준수), 릴리스마다 별도 근접 벤치마크를 통과한 뒤에만 배포.',
        'React → Spring Boot → FastAPI로 서비스를 분리하고 각각 Docker 컨테이너로 운영해 웹캠→경보 지연을 경보 한계 안으로 유지.',
        'v2.5.0~v2.6.0 릴리스를 스펙·ADR·학습 리포트와 함께 배포, 라이브 데모 운영 — 데이터셋은 DVC로 릴리스마다 고정.',
      ],
    },
    {
      key: 'iotbay',
      period: '2025년 1학기',
      role: '팀 개발자 — 8인 팀',
      bullets: [
        '소스 111개 파일 규모의 계층형 MVC 코드베이스(Servlet → Service → DAO, 엔티티별 인터페이스)에서 주문 흐름 기능과 테스트 스위트 담당.',
        '10개 기능 영역을 덮는 Selenium E2E 118건 구축 — 푸시마다 GitHub Actions가 전체 실행, Docker 이미지를 GHCR로 배포.',
        'CSRF·SQL 인젝션·XSS 방어(토큰 검증, prepared statement, 출력 인코딩)를 넣고 보안 경계 테스트 14건으로 고정.',
      ],
    },
    {
      key: 'farm',
      period: '2025 — 2026 v2',
      role: '그래픽스 리드 — 팀',
      bullets: [
        '브라우저 3D 농장 샌드박스의 렌더링 전담: 씬 구조, 사계절, 다섯 가지 날씨, 낮/밤 조명.',
        '수천 개 파티클을 인스턴스드·GPU 렌더링으로 옮겨 폭풍 씬에서 60fps 유지, 드로우콜 1회짜리 GLSL 오로라 셰이더 직접 작성.',
        'OpenWeatherMap API 연동으로 실제 날씨를 씬에 실시간 반영 — v2는 씬 구성을 처음부터 재설계한 리팩터링.',
      ],
      compact: true,
    },
    {
      key: 'gundam',
      period: '2025년 여름',
      role: '단독',
      bullets: [
        '서버리스 CRUD 게시판을 처음부터 끝까지: Next.js 프론트, AWS Chalice(Python) API, PostgreSQL.',
        '인증 라이브러리 없이 Google OAuth 검증과 짧은 수명 JWT 발급/검증을 Chalice 미들웨어에 직접 구현.',
        '타입 지정 API 클라이언트로 계약을 한 파일에 모아, 백엔드 리팩터링이 UI 컴포넌트로 새지 않게 설계.',
      ],
      compact: true,
    },
    {
      key: 'ephemeral',
      period: '2025',
      role: '단독',
      bullets: [
        '생성형 아트를 작은 제품처럼 구성: IoC 컨테이너, 교체 가능한 렌더러 전략, 미디어 파일 0개(오디오 전량 실시간 합성).',
        '사전 할당 오브젝트 풀로 GC 멈춤 50~70% 감소, 3계층 캔버스 파이프라인으로 수천 파티클에서 60fps 유지.',
        '전역 변수 없는 IoC 구조로 아트 프로젝트에도 제품 수준의 아키텍처 규율 적용.',
      ],
      compact: true,
    },
  ],
};

const JA: ResumeCopy = {
  location: 'オーストラリア・シドニー',
  summary:
    'インフラと深層学習の交点で価値を出す新卒エンジニアです。3人チームのキャップストーンではMLリードとしてコミットの97%を書き、v2.6.0のライブデモまでデプロイしました。正確さへのこだわりは陸軍通訳兵時代 — 一語の誤りが大きな代償を払う環境 — で身につけ、いまはコードとテストに同じ基準を当てています。620名から選抜され、Microsoft Sydneyのショーケースで発表しました。',
  skillGroups: [
    { label: '言語', items: 'Java · Python · TypeScript · JavaScript · C# · C++ · SQL · GLSL' },
    { label: 'バックエンド', items: 'Spring Boot · FastAPI · Java Servlets/JSP · AWS Chalice（サーバーレス）' },
    { label: 'フロントエンド', items: 'React 19 · Next.js · Three.js · Tailwind CSS' },
    { label: 'ML / データ', items: 'PyTorch · YOLOv8 · CNN · AWS SageMaker · DVC · PostgreSQL · SQLite' },
    { label: 'クラウド / DevOps', items: 'AWS · Docker · GitHub Actions CI/CD · GHCR · Google OAuth/JWT' },
    { label: 'テスト', items: 'JUnit · Selenium（E2E 118件）· セキュリティ境界テスト' },
  ],
  jaSummaryOfWork:
    'シドニー工科大学（UTS）情報技術学士を2026年7月に修了（GPA 6.00/7.0 · WAM 80.31 · 144単位）。在学中に深層学習・エンタープライズ・グラフィックス領域で5つのプロジェクトを構築。YOLOv8混雑検出システム（チームリード、コミット97%、ライブデモ稼働）と、8人チームのIoT eコマース（E2Eテスト118件、Docker/GHCRへのCI/CD）を含みます。入学前は大韓民国陸軍の通訳兵として2年間、米韓連合の連絡・通訳業務に従事しました。',
  jaEducationRows: [
    { ym: '2024年7月', event: 'シドニー工科大学（UTS）Bachelor of Information Technology 入学' },
    { ym: '2026年7月', event: '同 卒業（GPA 6.00/7.0 · WAM 80.31 · 144単位）' },
  ],
  jaCareerRows: [
    { ym: '2021年1月', event: '大韓民国陸軍 入隊（通訳兵 — 米韓連合の連絡・通訳業務）' },
    { ym: '2023年4月', event: '大韓民国陸軍 満期除隊' },
  ],
  jaLicenses: [
    { ym: '2021–2023', name: '米第8軍 Certificate of Achievement（功労賞 · 参謀長中将名義）' },
    { ym: '2021–2023', name: '大韓民国陸軍 感謝状（准将表彰 — 米韓連合指揮所訓練 2回）' },
    { ym: '2026年', name: 'UTS × Microsoft Sydney ショーケース選抜（620名中）' },
    { ym: '在学中', name: 'UTS BUILD グローバルリーダーシップ・プログラム修了' },
  ],
  projects: [
    {
      key: 'crowd',
      period: '2026年 前期',
      role: 'MLリード — 3名',
      bullets: [
        '学習パイプライン、FastAPI推論サービス、SageMakerランチャーを担当し、199コミット中193を作成。',
        'YOLOv8をStanford JRDBでファインチューニング（8:1:1分割）。リリースごとに近接ベンチマークを通過してからデプロイ。',
        'React → Spring Boot → FastAPIにサービスを分割し、各コンテナで運用してアラート遅延を予算内に維持。',
        'v2.5.0〜v2.6.0を仕様書・ADR・学習レポート付きでリリースし、ライブデモを稼働。データセットはDVCで固定。',
      ],
    },
    {
      key: 'iotbay',
      period: '2025年 前期',
      role: 'チームメンバー — 8名',
      bullets: [
        'ソース111ファイルの階層型MVC（Servlet → Service → DAO）で注文フロー機能とテストスイートを担当。',
        '10機能領域をカバーするSelenium E2E 118件。プッシュごとにGitHub Actionsが全件実行し、DockerイメージをGHCRへデプロイ。',
        'CSRF・SQLインジェクション・XSS対策を実装し、14件のセキュリティ境界テストで維持。',
      ],
    },
    {
      key: 'farm',
      period: '2025 — 2026 v2',
      role: 'グラフィックスリード',
      bullets: [
        '3D農場サンドボックスのレンダリング全般：シーン構成、四季、五種類の天気、昼夜ライティング。',
        '数千のパーティクルをインスタンスド・GPUレンダリングへ移して嵐でも60fpsを維持。GLSLオーロラシェーダーを自作。',
      ],
      compact: true,
    },
    {
      key: 'gundam',
      period: '2025年 夏',
      role: '単独',
      bullets: [
        'サーバーレスCRUD掲示板を単独で構築・デプロイ：Next.js、AWS Chalice（Python）、PostgreSQL。',
        '認証ライブラリなしでGoogle OAuth検証と短命JWTの発行/検証をChaliceミドルウェアに実装。',
      ],
      compact: true,
    },
    {
      key: 'ephemeral',
      period: '2025年',
      role: '単独',
      bullets: [
        'ジェネレーティブアートをプロダクトとして構成：IoCコンテナ、差し替え可能なレンダラー、メディアファイル0（音声は全てリアルタイム合成）。',
        '事前確保のオブジェクトプールでGC停止を50–70%削減し、3層キャンバスパイプラインで60fpsを維持。',
      ],
      compact: true,
    },
  ],
};

export const RESUME: Record<Lang, ResumeCopy> = { en: EN, ko: KO, ja: JA };

/** HD-grade subjects across all semesters, best first — the education highlight line. */
export function topMarks(lang: Lang): string {
  const hd = SEMESTER_WAYPOINTS.flatMap((w) => w.highlights)
    .filter((h) => h.grade === 'HD')
    .sort((a, b) => b.mark - a.mark);
  return hd.map((h) => `${h.short} ${formatMark(h.mark, h.grade, lang)}`).join(' · ');
}
