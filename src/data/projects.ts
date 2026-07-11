import type { Project, ProjectKey, Lang } from './types';

export const PROJECT_ORDER: ProjectKey[] = ['crowd', 'iotbay', 'farm', 'gundam', 'ephemeral'];

export const PROJECTS: Record<ProjectKey, Project> = {
  crowd: {
    crumb: 'case_studies/01_crowd_detection',
    category: '01 · Deep Learning',
    title: 'Crowd Detection & Accessibility Navigation',
    summary:
      'Real-time crowd & proximity alerts for mobility-impaired travellers — deep learning theory shipped as production infrastructure.',
    stack: ['YOLOv8', 'PyTorch', 'FastAPI', 'Spring Boot', 'React', 'Docker', 'AWS SageMaker', 'DVC'],
    role: 'Team lead — YOLO training, inference & alerting (97% of commits)',
    outcome: 'v2.6.0 released with an operational live demo',
    github: 'https://github.com/salieri009/DeepLearning42028UTS',
    diagram: ['Webcam Feed', 'React UI', 'Spring Boot API', 'FastAPI · YOLOv8', 'Proximity Alerts'],
    diagramNote: 'Training: JRDB → DVC → SageMaker (ml.g5.xlarge) → best.pt → inference container',
    period: '2026 S1 · Autumn',
    teamSize: '3 — ML lead',
    decisions: [
      {
        choice: 'FastAPI for the inference service',
        why: 'Async I/O and a Python-native runtime next to the model — per-frame latency stays low and the YOLO stack imports cleanly.',
      },
      {
        choice: 'Spring Boot gateway instead of calling inference directly',
        why: 'Auth, rate limits and contract stability live in one place; the inference container stays swappable.',
      },
      {
        choice: 'DVC for dataset versioning',
        why: 'Training runs are only reproducible if the data is — every release pins its exact dataset hash.',
      },
    ],
    tradeoffs: [
      {
        rejected: 'Larger YOLOv8l/x variants',
        why: 'Marginal accuracy gain on JRDB validation, but inference latency broke the real-time alert budget — stayed with yolov8m.',
      },
      {
        rejected: 'WebSocket frame streaming',
        why: 'Per-frame HTTP kept the demo debuggable and fast enough at webcam frame rates; streaming was deferred.',
      },
    ],
    results: ['v2.6.0 · live demo', '193/199 commits', 'JRDB fine-tune · 8:1:1', 'Dockerized 3-tier'],
    lessons: [
      'Release discipline — specs, ADRs, training reports — is what makes ML work reviewable.',
      'Cloud training pays for itself in reproducibility, not just speed.',
    ],
    future: ['Model quantization for edge devices', 'WebSocket frame streaming', 'k8s deployment with autoscaling'],
    layers: [
      { label: 'infra', items: ['Docker', 'SageMaker'] },
      { label: 'services', items: ['Spring Boot', 'FastAPI·YOLO'] },
      { label: 'interface', items: ['React UI', 'Alerts'] },
    ],
    overview:
      'A UTS Deep Learning (42028) capstone that grew into a full product: YOLOv8 person detection combined with bounding-box proximity heuristics warns mobility-impaired travellers about approaching crowds in real time. The model is fine-tuned on JRDB (Stanford JackRabbot data) and served through a three-tier pipeline — React frontend, Spring Boot API, FastAPI inference service — all Dockerized behind docker-compose, with cloud training on AWS SageMaker and datasets versioned via DVC.',
    roleDetail:
      'I led the machine-learning side end to end and owned most of the codebase — 193 of 199 commits. That covered the training pipeline (preprocessing, 8:1:1 splits, transfer-learning runs), the FastAPI inference service and its alerting logic, the SageMaker launch scripts, and the release process from v2.5.0 through v2.6.0, including specs, ADRs and training reports.',
    problems: [
      {
        p: 'Off-the-shelf YOLOv8 underperformed on dense indoor crowds.',
        s: 'Fine-tuned on JRDB with transfer learning and a disciplined 8:1:1 split; each release was validated against a held-out proximity benchmark before shipping.',
      },
      {
        p: 'Webcam-to-alert latency made warnings arrive too late to act on.',
        s: 'Split the system into dedicated services (React → Spring Boot → FastAPI) so per-frame inference runs on its own container, keeping the alert path short and scalable.',
      },
      {
        p: 'Local GPUs could not sustain long training runs.',
        s: 'Moved training to AWS SageMaker (ml.g5.xlarge) behind a scripted launcher, making every run reproducible, resumable and cheap to repeat.',
      },
    ],
  },
  iotbay: {
    crumb: 'case_studies/02_iotbay',
    category: '02 · Enterprise Platform',
    title: 'IoTBay',
    summary:
      'A full-stack e-commerce platform for IoT devices — catalog, checkout, order lifecycle and admin tooling, built to enterprise discipline.',
    stack: ['Java Servlets', 'JSP/JSTL', 'SQLite', 'Tailwind CSS', 'JUnit', 'Selenium', 'GitHub Actions', 'Docker/GHCR'],
    role: 'Team contributor — 8-person squad, 297 commits total',
    outcome: '118 E2E tests passing · CI/CD to Docker/GHCR',
    github: 'https://github.com/salieri009/IoTBay',
    diagram: ['JSP Views', 'Servlet Controllers', 'Service Layer', 'DAO per Entity', 'SQLite'],
    diagramNote: 'CI: push → GitHub Actions → 118 Selenium E2E → Docker image → GHCR',
    period: '2025 S1 · Autumn',
    teamSize: '8',
    decisions: [
      {
        choice: 'Layered MVC with one DAO interface per entity',
        why: 'Eight people can work in parallel only if boundaries are explicit — the interface is the contract.',
      },
      {
        choice: 'SQLite over a server RDBMS',
        why: 'Zero-config for eight laptops and CI; the DAO layer keeps a later PostgreSQL swap contained.',
      },
      {
        choice: 'Selenium E2E over unit-heavy testing',
        why: 'For a JSP UI the risky bugs live in the full request→render loop, so the tests exercise it end to end.',
      },
    ],
    tradeoffs: [
      {
        rejected: 'Spring framework',
        why: 'Course scope and team familiarity — plain Servlets kept everyone productive; the layering preserves the migration path.',
      },
      {
        rejected: 'Client-side SPA frontend',
        why: 'Server-rendered JSP + Tailwind shipped faster with eight contributors of mixed frontend experience.',
      },
    ],
    results: ['118 E2E tests green', '297 commits · 8 devs', '14 security boundary tests', 'CI/CD → Docker/GHCR'],
    lessons: [
      'CI that runs everything on every push turns integration accidents into red builds.',
      'Security is a test suite, not a checklist.',
    ],
    future: ['PostgreSQL migration', 'Session store hardening', 'k8s deployment'],
    layers: [
      { label: 'data', items: ['SQLite', 'DAO'] },
      { label: 'logic', items: ['Servlets', 'Services'] },
      { label: 'interface', items: ['JSP', 'Tailwind'] },
    ],
    overview:
      'The UTS Introduction to Software Development team project: a complete e-commerce platform for IoT devices covering registration, role-based access (Customer/Staff/Admin), full-text product search, persistent carts, multi-step checkout, order lifecycle with shipments, and an admin dashboard with KPI overviews and bulk CSV/JSON export. Architecture is layered MVC — Servlet controllers, a service layer, and a DAO interface per entity over SQLite.',
    roleDetail:
      'I worked as one of eight contributors across the order lifecycle features and the test suite, in a codebase of 111 source files. The team shipped 118 Selenium E2E tests spanning ten feature areas plus dedicated security boundary tests, run on every push through GitHub Actions CI, with deploys published as Docker images to GHCR.',
    problems: [
      {
        p: 'Eight contributors on one codebase kept colliding and breaking each other’s features.',
        s: 'A strict layered architecture (Servlet → Service → DAO, one interface per entity) plus CI running the full 118-test suite on every push turned integration surprises into red builds instead of runtime bugs.',
      },
      {
        p: 'Security review flagged CSRF, SQL injection and XSS vectors.',
        s: 'Added CSRF token validation, prepared statements everywhere, output encoding, an access log for every authenticated action — and 14 security boundary tests to keep it that way.',
      },
    ],
  },
  farm: {
    crumb: 'case_studies/03_farm_simulator',
    category: '03 · Computer Graphics',
    title: 'Animal Farm Simulator',
    summary:
      'A browser-based 3D farm sandbox — four seasons, five weather systems and a hand-written aurora shader, running at interactive frame rates.',
    stack: ['Three.js r182', 'React 19', 'TypeScript 5', 'Vite 7', 'GLSL', 'OpenWeatherMap API'],
    role: 'Graphics developer — Computer Graphics & Animation sub-major',
    outcome: 'Real-time seasons/weather with custom GLSL aurora',
    github: 'https://github.com/salieri009/ThreeJSUTS26-v2',
    diagram: ['React 19', 'Scene Graph', 'Season/Weather Systems', 'GLSL Shaders', 'WebGL'],
    diagramNote: 'Optional: OpenWeatherMap API → live weather sync → scene state',
    period: '2025 — v2 refactor 2026',
    teamSize: 'Team — graphics lead',
    decisions: [
      {
        choice: 'Custom GLSL for the aurora instead of textures',
        why: 'Time-driven noise gives volumetric motion for one draw call; textures looked flat and cost memory.',
      },
      {
        choice: 'Instanced meshes for particles',
        why: 'Thousands of petals and raindrops in one draw call each — the only way to hold 60fps in storms.',
      },
      {
        choice: 'Vite + TypeScript for the v2 rewrite',
        why: 'Fast HMR for shader iteration; types caught scene-graph misuse early.',
      },
    ],
    tradeoffs: [
      {
        rejected: 'Physically-based water & lighting',
        why: 'PBR cost too much frame budget for a stylized farm — flat shading reads better and runs everywhere.',
      },
    ],
    results: ['4 seasons · 5 weather systems', 'Custom GLSL aurora', '60fps under storms', 'Live weather API sync'],
    lessons: [
      'Performance work is design work — instancing changed which effects were even possible.',
      'A rewrite (v2) is worth it when scene composition is the debt.',
    ],
    future: ['Day/night cycle interpolation', 'Save/load farm layouts', 'Mobile touch controls'],
    layers: [
      { label: 'gpu', items: ['WebGL', 'GLSL'] },
      { label: 'scene', items: ['Three.js', 'Particles'] },
      { label: 'interface', items: ['React 19', 'Controls'] },
    ],
    overview:
      'A UTS graphics assignment pushed well past the brief: a 3D farm you build yourself — click to place animals, buildings and props on a snapping grid, expand the terrain, and watch the world react. Four seasons (spring petals, summer fireflies, autumn leaves, winter aurora), five weather states including storms with lightning, a night mode with an orbiting moon, and optional live weather sync from the OpenWeatherMap API.',
    roleDetail:
      'I owned the rendering side: scene architecture, the season and weather particle systems, day/night lighting, and the winter aurora — written as a custom GLSL shader rather than assembled from textures. The v2 repo is a ground-up refactor of the original submission with cleaner scene composition.',
    problems: [
      {
        p: 'Thousands of particles — petals, rain, snow, fireflies — tanked the frame rate.',
        s: 'Moved effects to instanced rendering and GPU-driven particles, capping per-frame simulation work so the scene stays interactive even in storms.',
      },
      {
        p: 'The aurora looked flat and fake when built from textures.',
        s: 'Wrote a custom GLSL fragment shader — layered noise with banded hue shifts driven by time uniforms — for a volumetric-feeling northern-lights effect on a budget of one draw call.',
      },
    ],
  },
  gundam: {
    crumb: 'case_studies/04_gundam_board',
    category: '04 · Full-Stack · Solo',
    title: 'Gundam Board',
    summary: 'A full-stack CRUD board with real auth, built solo over a summer break to learn the serverless stack end to end.',
    stack: ['Next.js', 'AWS Chalice', 'PostgreSQL', 'Google OAuth', 'JWT'],
    role: 'Solo builder — schema to deploy',
    outcome: 'Working OAuth + JWT auth on a serverless backend',
    github: 'https://github.com/salieri009/ToyProject-Gundam',
    diagram: ['Next.js', 'Typed API Client', 'AWS Chalice', 'JWT Middleware', 'PostgreSQL'],
    diagramNote: 'Auth: Google OAuth → server-side verify → short-lived JWT → per-request check',
    period: '2025 · summer break',
    teamSize: 'Solo',
    decisions: [
      {
        choice: 'AWS Chalice (serverless) backend',
        why: 'Zero server management for a solo project — and I wanted to learn IAM/API Gateway by shipping, not reading.',
      },
      {
        choice: 'Stateless JWT over server sessions',
        why: 'Serverless has no natural session store; short-lived tokens fit the platform instead of fighting it.',
      },
    ],
    tradeoffs: [
      {
        rejected: 'DynamoDB',
        why: 'The board domain (posts, comments, users) is relational — PostgreSQL matched the access patterns better than key-value.',
      },
      {
        rejected: 'NextAuth all-in-one',
        why: 'Hand-rolling the OAuth verify + JWT issue path was the point — I wanted to own the auth flow once.',
      },
    ],
    results: ['OAuth + JWT end-to-end', 'Serverless deploy on AWS', 'Typed API contract in one file'],
    lessons: [
      'Auth is ten times clearer after building it once without a library.',
      'Thin typed clients stop backend refactors leaking into UI.',
    ],
    future: ['Refresh-token rotation', 'Terraform for infra', 'GitHub Actions deploy'],
    layers: [
      { label: 'data', items: ['PostgreSQL'] },
      { label: 'api', items: ['Chalice', 'JWT'] },
      { label: 'interface', items: ['Next.js'] },
    ],
    overview:
      'A 2025 summer-vacation project with one rule: no shortcuts on the hard parts. A CRUD board application with Google OAuth sign-in and JWT sessions, a Next.js frontend, and a Python serverless backend on AWS Chalice backed by PostgreSQL — every layer chosen specifically because I had not shipped it before.',
    roleDetail:
      'Everything: database schema, Chalice API routes and middleware, the OAuth flow and JWT issuance/verification, the Next.js frontend, and deployment. Solo projects are where I stress-test how I structure code when no team conventions are holding me accountable.',
    problems: [
      {
        p: 'Session handling on a stateless serverless backend.',
        s: 'Short-lived JWT access tokens issued after server-side verification of the Google identity, checked in Chalice middleware on every request — no server-side session store needed.',
      },
      {
        p: 'First time wiring Next.js to a Python serverless API.',
        s: 'Defined a thin typed API client with the contract in one place, so backend refactors never leaked into UI components.',
      },
    ],
  },
  ephemeral: {
    crumb: 'case_studies/05_ephemeral_time',
    category: '05 · Computational Design',
    title: 'EphemeralTime',
    summary: 'Generative art that treats time as a fluid — attention shapes the flow. Engineered like a product, not a sketch.',
    stack: ['p5.js', 'Perlin Noise', 'Generative Audio', 'IoC Container', 'Object Pool', 'Strategy Pattern'],
    role: 'Solo — concept, simulation, architecture',
    outcome: 'Real-time fluid + audio synthesis, zero assets',
    github: 'https://github.com/salieri009/EphemeralTime',
    diagram: ['Clock Events', 'Perlin Fluid Field', 'Particle Pool', 'Render Strategies', 'Generative Audio'],
    diagramNote: 'Layers: bgLayer (static) → historyLayer (semi-static) → activeLayer (dynamic)',
    period: '2025',
    teamSize: 'Solo',
    decisions: [
      {
        choice: 'Object pool + factory for particles',
        why: 'GC pauses were the artwork’s enemy — pre-allocation cut them 50–70% and kept the pacing meditative.',
      },
      {
        choice: 'Three-layer canvas pipeline',
        why: 'The static background never repaints; each frame redraws only what moved.',
      },
      {
        choice: 'Generative audio with zero assets',
        why: 'Synthesis keeps sound in the same rule system as the visuals — one aesthetic, nothing to download.',
      },
    ],
    tradeoffs: [
      {
        rejected: 'WebGL/shaders for the fluid',
        why: 'p5.js 2D with Perlin fields was enough at target resolution — and kept the code readable as a study piece.',
      },
    ],
    results: ['GC pauses −50~70%', '60fps · thousands of particles', '0 media assets'],
    lessons: [
      'Architecture patterns — IoC, pools, strategies — earn their keep even in art projects.',
      'Constraints like "zero assets" sharpen aesthetics.',
    ],
    future: ['WebGL renderer strategy', 'MIDI input mapping', 'Gallery/installation mode'],
    layers: [
      { label: 'core', items: ['IoC', 'Object Pool'] },
      { label: 'simulation', items: ['Perlin Fluid', 'Clock'] },
      { label: 'canvas', items: ['p5.js', 'Audio'] },
    ],
    overview:
      'An interactive artwork that visualizes time as a "reservoir of attention": leave the canvas calm and time flows slowly and legibly; stir it with fast mouse movement and turbulence corrupts the fluid, saturation, and sound. Every hour a sun drop drifts across the canvas; quarter-hours ring out as cymatic ripples. All audio is synthesized in real time — the project ships zero media assets.',
    roleDetail:
      'Solo work, and deliberately over-engineered as a study: an IoC container with zero globals, an object pool that cut GC pauses by 50–70%, swappable renderer strategies (stamp vs. splatter), and a three-layer graphics pipeline so the static background never repaints. Computational design is where my graphics sub-major and my engineering discipline meet.',
    problems: [
      {
        p: 'Thousands of ink particles caused garbage-collection stutters that broke the meditative pacing.',
        s: 'Replaced per-frame allocation with a pre-allocated object pool and factory — 50–70% fewer GC pauses, and the fluid stays smooth under turbulence.',
      },
      {
        p: 'Full-canvas repaints made layered ink history impossible at 60fps.',
        s: 'Split rendering into three layers — static background, semi-static history, dynamic foreground — so each frame only redraws what actually moved.',
      },
    ],
  },
};

type L10NProjectOverride = Partial<
  Pick<
    Project,
    | 'summary'
    | 'role'
    | 'outcome'
    | 'overview'
    | 'roleDetail'
    | 'problems'
    | 'period'
    | 'teamSize'
    | 'decisions'
    | 'tradeoffs'
    | 'lessons'
    | 'future'
  >
>;

export const L10N: Record<Exclude<Lang, 'en'>, Record<ProjectKey, L10NProjectOverride>> = {
  ko: {
    crowd: {
      summary: '이동이 불편한 여행자를 위한 실시간 혼잡·근접 경보 — 딥러닝 이론을 프로덕션 인프라로 옮긴 프로젝트입니다.',
      role: '팀 리드 — YOLO 학습·추론·알림 담당 (커밋의 97%)',
      outcome: 'v2.6.0 릴리스, 라이브 데모 운영 중',
      overview:
        'UTS 딥러닝(42028) 과제에서 시작해 하나의 프로덕트로 키운 프로젝트입니다. YOLOv8 사람 감지에 바운딩박스 근접 휴리스틱을 얹어, 이동이 불편한 여행자에게 다가오는 인파를 실시간으로 경고합니다. 모델은 JRDB(Stanford JackRabbot 데이터)로 파인튜닝했고, React 프론트 — Spring Boot API — FastAPI 추론 서비스의 3계층 파이프라인을 전부 Docker로 묶었습니다. 학습은 AWS SageMaker, 데이터 버전 관리는 DVC로 했습니다.',
      roleDetail:
        '머신러닝 파트를 처음부터 끝까지 맡았고, 코드베이스 대부분이 제 손을 거쳤습니다 — 199개 커밋 중 193개. 전처리와 8:1:1 분할, 전이학습 런 같은 학습 파이프라인부터 FastAPI 추론 서비스와 알림 로직, SageMaker 실행 스크립트, 그리고 v2.5.0에서 v2.6.0까지의 릴리스 프로세스(스펙, ADR, 학습 리포트)까지 담당했습니다.',
      problems: [
        {
          p: '기본 YOLOv8은 실내 밀집 인파에서 성능이 잘 나오지 않았습니다.',
          s: 'JRDB로 전이학습 파인튜닝을 하고 8:1:1 분할을 지켰습니다. 릴리스마다 별도의 근접 벤치마크로 검증한 뒤에야 배포했습니다.',
        },
        {
          p: '웹캠에서 경보까지의 지연이 커서, 경고가 너무 늦게 도착했습니다.',
          s: '시스템을 React → Spring Boot → FastAPI 서비스로 분리해 프레임 추론을 전용 컨테이너에서 돌리고, 경보 경로를 짧게 유지했습니다.',
        },
        {
          p: '로컬 GPU로는 긴 학습 런을 버틸 수 없었습니다.',
          s: '학습을 AWS SageMaker(ml.g5.xlarge)로 옮기고 스크립트화된 런처를 만들어, 모든 런을 재현·재개 가능하게 했습니다.',
        },
      ],
      period: '2026년 1학기',
      teamSize: '3명 — ML 리드',
      decisions: [
        {
          choice: '추론 서비스에 FastAPI',
          why: '비동기 I/O에 모델 바로 옆의 파이썬 런타임 — 프레임당 지연이 낮고 YOLO 스택이 깔끔하게 붙습니다.',
        },
        {
          choice: '추론을 직접 호출하지 않고 Spring Boot 게이트웨이를 둠',
          why: '인증, 레이트 리밋, 계약 안정성을 한 곳에 모으고, 추론 컨테이너는 언제든 교체 가능하게 유지했습니다.',
        },
        {
          choice: '데이터셋 버전 관리에 DVC',
          why: '데이터가 재현 가능해야 학습도 재현 가능합니다 — 릴리스마다 정확한 데이터셋 해시를 고정합니다.',
        },
      ],
      tradeoffs: [
        {
          rejected: '더 큰 YOLOv8l/x 모델',
          why: 'JRDB 검증에서 정확도 이득은 미미한데 추론 지연이 실시간 경보 예산을 넘겼습니다 — yolov8m을 유지했습니다.',
        },
        {
          rejected: 'WebSocket 프레임 스트리밍',
          why: '웹캠 프레임레이트에서는 프레임당 HTTP로도 충분했고 디버깅이 쉬웠습니다. 스트리밍은 다음으로 미뤘습니다.',
        },
      ],
      lessons: [
        '스펙, ADR, 학습 리포트 같은 릴리스 규율이 ML 작업을 리뷰 가능하게 만듭니다.',
        '클라우드 학습의 진짜 값어치는 속도가 아니라 재현성에 있습니다.',
      ],
      future: ['엣지 디바이스용 모델 양자화', 'WebSocket 프레임 스트리밍', '오토스케일링 붙인 k8s 배포'],
    },
    iotbay: {
      summary: 'IoT 기기 이커머스 플랫폼 — 카탈로그부터 결제, 주문 라이프사이클, 관리자 도구까지 엔터프라이즈 규율로 만들었습니다.',
      role: '팀 기여자 — 8인 팀, 총 297 커밋',
      outcome: 'E2E 테스트 118개 통과 · Docker/GHCR로 CI/CD',
      overview:
        'UTS 소프트웨어 개발 입문 팀 프로젝트입니다. 회원가입, 역할 기반 접근제어(고객/직원/관리자), 상품 전문 검색, 장바구니, 다단계 결제, 배송이 붙은 주문 라이프사이클, KPI 대시보드와 CSV/JSON 일괄 내보내기가 있는 관리자 페이지까지 — 이커머스에 필요한 걸 전부 갖췄습니다. 구조는 레이어드 MVC로, Servlet 컨트롤러 아래 서비스 계층과 엔티티별 DAO 인터페이스를 뒀습니다.',
      roleDetail:
        '소스 파일 111개 규모의 코드베이스에서 8명 중 한 명으로 주문 라이프사이클 기능과 테스트 스위트를 맡았습니다. 팀 전체로는 10개 기능 영역을 덮는 Selenium E2E 테스트 118개에 보안 경계 테스트까지 만들었고, 푸시마다 GitHub Actions CI가 전부 돌립니다. 배포는 Docker 이미지로 GHCR에 올라갑니다.',
      problems: [
        {
          p: '8명이 한 코드베이스에서 작업하다 보니 서로의 기능을 계속 깨뜨렸습니다.',
          s: 'Servlet → Service → DAO로 계층을 엄격히 나누고 엔티티마다 인터페이스를 뒀습니다. 여기에 푸시마다 118개 테스트를 전부 돌리는 CI를 붙이니, 통합 사고가 런타임 버그가 아니라 빨간 빌드로 잡히기 시작했습니다.',
        },
        {
          p: '보안 리뷰에서 CSRF, SQL 인젝션, XSS 취약점이 지적됐습니다.',
          s: 'CSRF 토큰 검증, 모든 쿼리의 prepared statement, 출력 인코딩, 인증된 행동 전체의 접근 로그를 넣었습니다. 그리고 그 상태가 유지되도록 보안 경계 테스트 14개를 남겼습니다.',
        },
      ],
      period: '2025년 1학기',
      teamSize: '8명',
      decisions: [
        {
          choice: '엔티티마다 DAO 인터페이스를 둔 레이어드 MVC',
          why: '8명이 병렬로 일하려면 경계가 명시적이어야 합니다 — 인터페이스가 곧 계약입니다.',
        },
        {
          choice: '서버형 RDBMS 대신 SQLite',
          why: '노트북 8대와 CI에서 설정이 필요 없고, DAO 계층 덕에 나중에 PostgreSQL로 바꾸는 범위도 갇혀 있습니다.',
        },
        {
          choice: '유닛 위주 대신 Selenium E2E',
          why: 'JSP UI에서 위험한 버그는 요청→렌더 전체 루프에 살기 때문에, 테스트도 그 루프를 끝까지 돌립니다.',
        },
      ],
      tradeoffs: [
        {
          rejected: 'Spring 프레임워크',
          why: '과목 범위와 팀 숙련도를 고려해 순수 Servlet을 썼습니다. 계층 구조가 마이그레이션 경로는 남겨둡니다.',
        },
        {
          rejected: '클라이언트 SPA 프론트엔드',
          why: '프론트 경험이 제각각인 8명에게는 서버 렌더링 JSP + Tailwind가 더 빨랐습니다.',
        },
      ],
      lessons: [
        '푸시마다 전부 돌리는 CI는 통합 사고를 런타임 버그가 아니라 빨간 빌드로 바꿔줍니다.',
        '보안은 체크리스트가 아니라 테스트 스위트입니다.',
      ],
      future: ['PostgreSQL 마이그레이션', '세션 스토어 강화', 'k8s 배포'],
    },
    farm: {
      summary: '브라우저에서 돌아가는 3D 농장 샌드박스 — 사계절, 다섯 가지 날씨, 직접 쓴 오로라 셰이더가 인터랙티브 프레임레이트로 돕니다.',
      role: '그래픽스 개발 — 컴퓨터 그래픽스 & 애니메이션 부전공',
      outcome: '실시간 계절/날씨 + 자작 GLSL 오로라',
      overview:
        'UTS 그래픽스 과제를 브리프보다 한참 멀리 끌고 간 프로젝트입니다. 클릭으로 동물, 건물, 소품을 그리드에 배치하고 지형을 넓혀가며 직접 농장을 짓습니다. 사계절(봄 꽃잎, 여름 반딧불, 가을 낙엽, 겨울 오로라), 번개가 치는 폭풍을 포함한 다섯 가지 날씨, 달이 궤도를 도는 밤 모드, OpenWeatherMap API 연동 실시간 날씨까지 들어 있습니다.',
      roleDetail:
        '렌더링 쪽을 전부 맡았습니다 — 씬 아키텍처, 계절·날씨 파티클 시스템, 낮/밤 조명, 그리고 텍스처 조합이 아니라 GLSL 셰이더로 직접 쓴 겨울 오로라까지. v2 저장소는 원래 제출물을 씬 구성부터 갈아엎은 리팩터링 버전입니다.',
      problems: [
        {
          p: '꽃잎, 비, 눈, 반딧불 — 수천 개의 파티클이 프레임레이트를 무너뜨렸습니다.',
          s: '이펙트를 인스턴스드 렌더링과 GPU 파티클로 옮기고 프레임당 시뮬레이션 양에 상한을 뒀습니다. 폭풍 속에서도 씬이 인터랙티브하게 유지됩니다.',
        },
        {
          p: '텍스처로 만든 오로라는 평면적이고 가짜처럼 보였습니다.',
          s: 'GLSL 프래그먼트 셰이더를 직접 썼습니다 — 시간 유니폼으로 움직이는 레이어드 노이즈와 색 밴드로, 드로우콜 하나 예산에서 볼류메트릭한 북극광을 만들었습니다.',
        },
      ],
      period: '2025 — 2026년 v2 리팩터링',
      teamSize: '팀 — 그래픽스 리드',
      decisions: [
        {
          choice: '오로라를 텍스처 대신 GLSL로 직접 작성',
          why: '시간 기반 노이즈는 드로우콜 하나로 볼륨감 있는 움직임을 줍니다. 텍스처는 평면적이고 메모리만 먹었습니다.',
        },
        {
          choice: '파티클에 인스턴스드 메시',
          why: '수천 개의 꽃잎과 빗방울을 각각 드로우콜 하나로 — 폭풍에서 60fps를 지키는 유일한 방법이었습니다.',
        },
        {
          choice: 'v2 재작성에 Vite + TypeScript',
          why: '셰이더 반복 작업에 빠른 HMR, 씬 그래프 오용은 타입이 초기에 잡아줬습니다.',
        },
      ],
      tradeoffs: [
        {
          rejected: '물리 기반 물/조명(PBR)',
          why: '스타일라이즈된 농장에는 프레임 예산 대비 과했습니다 — 플랫 셰이딩이 더 잘 읽히고 어디서나 돌아갑니다.',
        },
      ],
      lessons: [
        '성능 작업이 곧 디자인 작업입니다 — 인스턴싱이 가능한 이펙트의 범위 자체를 바꿨습니다.',
        '씬 구성이 빚이 됐다면 재작성(v2)은 값을 합니다.',
      ],
      future: ['낮/밤 사이클 보간', '농장 배치 저장/불러오기', '모바일 터치 컨트롤'],
    },
    gundam: {
      summary: '진짜 인증이 붙은 풀스택 CRUD 게시판 — 서버리스 스택을 끝까지 배우려고 여름방학에 혼자 만들었습니다.',
      role: '단독 개발 — 스키마부터 배포까지',
      outcome: '서버리스 백엔드 위에서 OAuth + JWT 인증 동작',
      overview:
        '2025년 여름방학 프로젝트인데, 규칙은 하나였습니다: 어려운 부분에서 지름길 없기. Google OAuth 로그인과 JWT 세션이 붙은 CRUD 게시판을, Next.js 프론트와 AWS Chalice 위의 Python 서버리스 백엔드 + PostgreSQL로 만들었습니다. 모든 레이어를 한 번도 배포해본 적 없는 것들로만 골랐습니다.',
      roleDetail:
        '전부 다요. 데이터베이스 스키마, Chalice API 라우트와 미들웨어, OAuth 플로우와 JWT 발급/검증, Next.js 프론트엔드, 배포까지. 혼자 하는 프로젝트는 팀 컨벤션이 붙잡아주지 않을 때 내가 코드를 어떻게 구조화하는지 시험해보는 자리라고 생각합니다.',
      problems: [
        {
          p: '상태가 없는 서버리스 백엔드에서의 세션 처리.',
          s: 'Google 신원을 서버에서 검증한 뒤 짧은 수명의 JWT 액세스 토큰을 발급하고, 매 요청마다 Chalice 미들웨어에서 확인합니다. 서버 쪽 세션 저장소가 필요 없어졌습니다.',
        },
        {
          p: 'Next.js를 Python 서버리스 API에 붙이는 건 처음이었습니다.',
          s: '얇은 타입드 API 클라이언트를 만들어 계약을 한 곳에 모았습니다. 백엔드를 리팩터링해도 UI 컴포넌트로 새지 않습니다.',
        },
      ],
      period: '2025년 여름방학',
      teamSize: '단독',
      decisions: [
        {
          choice: 'AWS Chalice(서버리스) 백엔드',
          why: '혼자 하는 프로젝트에 서버 관리 제로 — 그리고 IAM/API Gateway를 글이 아니라 배포로 배우고 싶었습니다.',
        },
        {
          choice: '서버 세션 대신 무상태 JWT',
          why: '서버리스에는 자연스러운 세션 저장소가 없습니다. 짧은 수명의 토큰이 플랫폼과 싸우지 않는 방법입니다.',
        },
      ],
      tradeoffs: [
        {
          rejected: 'DynamoDB',
          why: '게시판 도메인(글·댓글·사용자)은 관계형입니다 — 키-밸류 접근 패턴보다 PostgreSQL이 맞았습니다.',
        },
        {
          rejected: 'NextAuth 올인원',
          why: 'OAuth 검증 + JWT 발급 경로를 직접 만드는 게 목적이었습니다. 인증 플로우를 한 번은 소유해보고 싶었어요.',
        },
      ],
      lessons: [
        '라이브러리 없이 한 번 만들어보면 인증이 열 배는 선명해집니다.',
        '얇은 타입드 클라이언트가 백엔드 리팩터링이 UI로 새는 걸 막아줍니다.',
      ],
      future: ['리프레시 토큰 로테이션', 'Terraform 도입', 'GitHub Actions 배포'],
    },
    ephemeral: {
      summary: '시간을 유체로 다루는 제너러티브 아트 — 주의(注意)가 흐름을 바꿉니다. 스케치가 아니라 프로덕트처럼 설계했습니다.',
      role: '단독 — 컨셉, 시뮬레이션, 아키텍처',
      outcome: '실시간 유체 + 오디오 합성, 에셋 제로',
      overview:
        '시간을 "주의력의 저수지"로 시각화한 인터랙티브 아트입니다. 캔버스를 가만히 두면 시간이 느리고 또렷하게 흐르고, 마우스를 빠르게 휘저으면 난류가 유체와 채도, 소리까지 흐트러뜨립니다. 매시간 태양 방울이 캔버스를 가로지르고, 15분마다 사이매틱 파문이 울립니다. 오디오는 전부 실시간 합성 — 미디어 에셋이 하나도 없습니다.',
      roleDetail:
        '혼자 만들었고, 일부러 과하게 설계한 습작입니다: 전역 변수 없는 IoC 컨테이너, GC 멈춤을 50–70% 줄인 오브젝트 풀, 교체 가능한 렌더러 전략(스탬프/스플래터), 정적 배경은 다시 그리지 않는 3계층 그래픽 파이프라인. 컴퓨테이셔널 디자인은 제 그래픽스 부전공과 엔지니어링 규율이 만나는 지점입니다.',
      problems: [
        {
          p: '수천 개의 잉크 파티클이 GC 멈춤을 일으켜 명상적인 페이싱을 깨뜨렸습니다.',
          s: '프레임마다 할당하던 걸 사전 할당된 오브젝트 풀과 팩토리로 바꿨습니다. GC 멈춤이 50–70% 줄었고, 난류 속에서도 유체가 매끄럽습니다.',
        },
        {
          p: '전체 캔버스를 다시 그리면 겹겹이 쌓이는 잉크 히스토리를 60fps로 유지할 수 없었습니다.',
          s: '렌더링을 세 층으로 나눴습니다 — 정적 배경, 반정적 히스토리, 동적 전경. 매 프레임 실제로 움직인 것만 다시 그립니다.',
        },
      ],
      period: '2025',
      teamSize: '단독',
      decisions: [
        {
          choice: '파티클에 오브젝트 풀 + 팩토리',
          why: 'GC 멈춤은 작품의 적이었습니다 — 사전 할당으로 50–70% 줄이고 명상적인 페이싱을 지켰습니다.',
        },
        {
          choice: '3계층 캔버스 파이프라인',
          why: '정적 배경은 다시 그리지 않고, 매 프레임 움직인 것만 다시 그립니다.',
        },
        {
          choice: '에셋 제로 제너러티브 오디오',
          why: '합성은 소리를 비주얼과 같은 규칙 체계 안에 둡니다 — 하나의 미학, 다운로드는 없음.',
        },
      ],
      tradeoffs: [
        {
          rejected: '유체에 WebGL/셰이더',
          why: '목표 해상도에서는 p5.js 2D + Perlin 필드로 충분했고, 습작으로서 코드 가독성을 지켰습니다.',
        },
      ],
      lessons: [
        'IoC, 풀, 전략 같은 아키텍처 패턴은 아트 프로젝트에서도 제값을 합니다.',
        '"에셋 제로" 같은 제약이 미학을 벼립니다.',
      ],
      future: ['WebGL 렌더러 전략', 'MIDI 입력 매핑', '갤러리/설치 모드'],
    },
  },
  ja: {
    crowd: {
      summary: '移動が不自由な旅行者のためのリアルタイム混雑・近接アラート — 深層学習の理論をプロダクションインフラとして出荷しました。',
      role: 'チームリード — YOLO学習・推論・アラート担当（コミットの97%）',
      outcome: 'v2.6.0リリース、ライブデモ稼働中',
      overview:
        'UTS深層学習（42028）の課題から一つのプロダクトに育てたプロジェクトです。YOLOv8の人物検出にバウンディングボックスの近接ヒューリスティクスを組み合わせ、接近する人混みをリアルタイムで警告します。モデルはJRDB（Stanford JackRabbotデータ）でファインチューニングし、React → Spring Boot → FastAPIの3層パイプラインをすべてDocker化。学習はAWS SageMaker、データはDVCでバージョン管理しています。',
      roleDetail:
        '機械学習側を最初から最後まで担当し、コードベースの大半を書きました — 199コミット中193。前処理・8:1:1分割・転移学習の学習パイプラインから、FastAPI推論サービスとアラートロジック、SageMaker起動スクリプト、v2.5.0からv2.6.0までのリリースプロセス（仕様書・ADR・学習レポート）まで。',
      problems: [
        {
          p: '素のYOLOv8は屋内の密集した人混みで性能が出ませんでした。',
          s: 'JRDBで転移学習によるファインチューニングを行い、8:1:1分割を徹底。リリースごとに別途の近接ベンチマークで検証してから出荷しました。',
        },
        {
          p: 'Webカメラからアラートまでの遅延が大きく、警告が間に合いませんでした。',
          s: 'システムをReact → Spring Boot → FastAPIのサービスに分離し、フレーム推論を専用コンテナで実行。アラート経路を短く保ちました。',
        },
        {
          p: 'ローカルGPUでは長い学習が持ちませんでした。',
          s: '学習をAWS SageMaker（ml.g5.xlarge）へ移し、スクリプト化したランチャーで全ランを再現・再開可能にしました。',
        },
      ],
      period: '2026年 前期',
      teamSize: '3名 — MLリード',
      decisions: [
        {
          choice: '推論サービスにFastAPI',
          why: '非同期I/Oとモデルの隣にあるPythonランタイム — フレームあたりの遅延を抑え、YOLOスタックが素直に載ります。',
        },
        {
          choice: '推論を直接呼ばずSpring Bootゲートウェイを挟む',
          why: '認証・レート制限・契約の安定性を一箇所に集約し、推論コンテナは差し替え可能なまま。',
        },
        {
          choice: 'データセット管理にDVC',
          why: 'データが再現できて初めて学習も再現できます — リリースごとに正確なデータセットハッシュを固定。',
        },
      ],
      tradeoffs: [
        {
          rejected: 'より大きいYOLOv8l/x',
          why: 'JRDB検証での精度向上はわずかで、推論遅延がリアルタイムアラートの予算を超過 — yolov8mを維持。',
        },
        {
          rejected: 'WebSocketフレームストリーミング',
          why: 'Webカメラのフレームレートではフレーム毎HTTPで十分でデバッグも容易。ストリーミングは先送り。',
        },
      ],
      lessons: [
        '仕様書・ADR・学習レポートというリリース規律が、ML作業をレビュー可能にします。',
        'クラウド学習の本当の価値は速度ではなく再現性。',
      ],
      future: ['エッジ向けモデル量子化', 'WebSocketストリーミング', 'オートスケール付きk8sデプロイ'],
    },
    iotbay: {
      summary: 'IoTデバイスのeコマースプラットフォーム — カタログから決済、注文ライフサイクル、管理ツールまでエンタープライズの規律で構築。',
      role: 'チームメンバー — 8人チーム、計297コミット',
      outcome: 'E2Eテスト118件パス · Docker/GHCRへCI/CD',
      overview:
        'UTSソフトウェア開発入門のチームプロジェクトです。会員登録、ロールベースのアクセス制御（顧客/スタッフ/管理者）、商品全文検索、カート、多段階チェックアウト、配送付きの注文ライフサイクル、KPIダッシュボードとCSV/JSON一括エクスポートを備えた管理画面まで揃えました。構成はレイヤードMVCで、Servletコントローラの下にサービス層とエンティティごとのDAOインターフェースを置いています。',
      roleDetail:
        'ソースファイル111個のコードベースで8人のうちの一人として、注文ライフサイクル機能とテストスイートを担当しました。チーム全体で10の機能領域をカバーするSelenium E2Eテスト118件とセキュリティ境界テストを整備し、プッシュごとにGitHub Actions CIが全件実行します。デプロイはDockerイメージとしてGHCRへ。',
      problems: [
        {
          p: '8人が一つのコードベースで作業し、互いの機能を壊し続けていました。',
          s: 'Servlet → Service → DAOの厳格なレイヤー分けとエンティティごとのインターフェース、そして全118テストを毎プッシュ実行するCIで、統合の事故はランタイムバグではなく赤いビルドとして現れるようになりました。',
        },
        {
          p: 'セキュリティレビューでCSRF・SQLインジェクション・XSSが指摘されました。',
          s: 'CSRFトークン検証、全クエリのprepared statement、出力エンコーディング、認証済み操作のアクセスログを導入。それを維持するために14件のセキュリティ境界テストを残しました。',
        },
      ],
      period: '2025年 前期',
      teamSize: '8名',
      decisions: [
        {
          choice: 'エンティティごとにDAOインターフェースを置くレイヤードMVC',
          why: '8人が並行して動けるのは境界が明示的なときだけ — インターフェースが契約そのものです。',
        },
        {
          choice: 'サーバー型RDBMSではなくSQLite',
          why: 'ノートPC 8台とCIで設定不要。DAO層のおかげで将来のPostgreSQL移行も局所化されます。',
        },
        {
          choice: 'ユニット偏重ではなくSelenium E2E',
          why: 'JSPのUIでは危険なバグはリクエスト→レンダの全ループに潜むため、テストもそこを端から端まで通します。',
        },
      ],
      tradeoffs: [
        {
          rejected: 'Springフレームワーク',
          why: '科目の範囲とチームの習熟度から素のServletを選択。レイヤー構造が移行経路は残します。',
        },
        {
          rejected: 'クライアントSPA',
          why: 'フロント経験がまちまちの8人には、サーバーレンダリングのJSP + Tailwindの方が速かった。',
        },
      ],
      lessons: [
        '毎プッシュ全件実行のCIは、統合事故をランタイムバグではなく赤いビルドに変えます。',
        'セキュリティはチェックリストではなくテストスイート。',
      ],
      future: ['PostgreSQL移行', 'セッションストア強化', 'k8sデプロイ'],
    },
    farm: {
      summary: 'ブラウザで動く3D農場サンドボックス — 四季、5種類の天気、自作オーロラシェーダーがインタラクティブなフレームレートで動きます。',
      role: 'グラフィックス開発 — CG＆アニメーション副専攻',
      outcome: 'リアルタイム季節/天気 + 自作GLSLオーロラ',
      overview:
        'UTSのグラフィックス課題を要件のはるか先まで進めたプロジェクトです。クリックで動物・建物・小物をグリッドに配置し、地形を広げて自分の農場を作ります。四季（春の花びら、夏の蛍、秋の落ち葉、冬のオーロラ）、雷を伴う嵐を含む5種類の天気、月が周回する夜モード、OpenWeatherMap API連携のライブ天気まで入っています。',
      roleDetail:
        'レンダリング側を全て担当しました — シーンアーキテクチャ、季節・天気のパーティクルシステム、昼夜のライティング、そしてテクスチャの組み合わせではなくGLSLで直接書いた冬のオーロラ。v2リポジトリはシーン構成から作り直したリファクタリング版です。',
      problems: [
        {
          p: '花びら・雨・雪・蛍 — 数千のパーティクルがフレームレートを崩壊させました。',
          s: 'エフェクトをインスタンスドレンダリングとGPUパーティクルへ移し、フレームあたりのシミュレーション量に上限を設定。嵐の中でもシーンはインタラクティブなままです。',
        },
        {
          p: 'テクスチャで作ったオーロラは平面的で嘘っぽく見えました。',
          s: 'GLSLフラグメントシェーダーを自作 — 時間ユニフォームで動くレイヤードノイズと色帯で、ドローコール1回の予算でボリューム感のあるオーロラを実現しました。',
        },
      ],
      period: '2025 — 2026年 v2リファクタリング',
      teamSize: 'チーム — グラフィックスリード',
      decisions: [
        {
          choice: 'オーロラはテクスチャではなくGLSLを自作',
          why: '時間駆動のノイズはドローコール1回で立体的な動きを生みます。テクスチャは平面的でメモリも食うだけでした。',
        },
        {
          choice: 'パーティクルにインスタンスドメッシュ',
          why: '数千の花びらや雨粒をそれぞれドローコール1回で — 嵐の中で60fpsを守る唯一の方法。',
        },
        {
          choice: 'v2書き直しにVite + TypeScript',
          why: 'シェーダー反復に速いHMR。シーングラフの誤用は型が早期に検出。',
        },
      ],
      tradeoffs: [
        {
          rejected: '物理ベースの水と照明（PBR）',
          why: 'スタイライズされた農場にはフレーム予算に対して過剰 — フラットシェーディングの方が読みやすく、どこでも動きます。',
        },
      ],
      lessons: [
        'パフォーマンス作業はデザイン作業 — インスタンシングが可能なエフェクトの幅そのものを変えました。',
        'シーン構成が負債になったら、書き直し（v2）は元が取れます。',
      ],
      future: ['昼夜サイクルの補間', '農場レイアウトの保存/読込', 'モバイルタッチ操作'],
    },
    gundam: {
      summary: '本物の認証を備えたフルスタックCRUD掲示板 — サーバーレススタックを端から端まで学ぶため、夏休みに一人で作りました。',
      role: '単独開発 — スキーマからデプロイまで',
      outcome: 'サーバーレス上でOAuth + JWT認証が動作',
      overview:
        '2025年夏休みのプロジェクトで、ルールは一つ：難しい部分でショートカットしない。Google OAuthサインインとJWTセッション付きのCRUD掲示板を、Next.jsフロントとAWS Chalice上のPythonサーバーレスバックエンド + PostgreSQLで構築。全レイヤーを「出荷したことのない技術」だけで選びました。',
      roleDetail:
        '全部です。データベーススキーマ、ChaliceのAPIルートとミドルウェア、OAuthフローとJWTの発行/検証、Next.jsフロントエンド、デプロイまで。ソロプロジェクトは、チームの規約が支えてくれないときに自分がコードをどう構造化するかを試す場だと思っています。',
      problems: [
        {
          p: 'ステートレスなサーバーレスバックエンドでのセッション管理。',
          s: 'Googleの身元をサーバー側で検証した後、短命のJWTアクセストークンを発行し、毎リクエストをChaliceミドルウェアで確認。サーバー側セッションストアが不要になりました。',
        },
        {
          p: 'Next.jsをPythonサーバーレスAPIにつなぐのは初めてでした。',
          s: '薄い型付きAPIクライアントを作り、契約を一箇所に集約。バックエンドをリファクタリングしてもUIコンポーネントに漏れません。',
        },
      ],
      period: '2025年 夏休み',
      teamSize: '単独',
      decisions: [
        {
          choice: 'AWS Chalice（サーバーレス）バックエンド',
          why: 'ソロプロジェクトにサーバー管理ゼロ — そしてIAM/API Gatewayを読むのではなく、出荷して学びたかった。',
        },
        {
          choice: 'サーバーセッションではなくステートレスJWT',
          why: 'サーバーレスに自然なセッションストアはありません。短命トークンがプラットフォームと戦わない方法です。',
        },
      ],
      tradeoffs: [
        {
          rejected: 'DynamoDB',
          why: '掲示板ドメイン（投稿・コメント・ユーザー）はリレーショナル — キーバリューよりPostgreSQLが合っていました。',
        },
        {
          rejected: 'NextAuthオールインワン',
          why: 'OAuth検証 + JWT発行の経路を自作することが目的でした。認証フローを一度は自分の手で。',
        },
      ],
      lessons: [
        'ライブラリなしで一度作ると、認証は十倍クリアになります。',
        '薄い型付きクライアントが、バックエンドの変更がUIへ漏れるのを防ぎます。',
      ],
      future: ['リフレッシュトークンのローテーション', 'Terraform導入', 'GitHub Actionsデプロイ'],
    },
    ephemeral: {
      summary: '時間を流体として扱うジェネラティブアート — 注意が流れを変えます。スケッチではなくプロダクトとして設計。',
      role: '単独 — コンセプト、シミュレーション、アーキテクチャ',
      outcome: 'リアルタイム流体 + 音声合成、アセットゼロ',
      overview:
        '時間を「注意の貯水池」として可視化するインタラクティブアート。キャンバスを静かに保てば時間はゆっくり明瞭に流れ、マウスを速く動かすと乱流が流体・彩度・音まで乱します。毎正時に太陽の雫がキャンバスを横切り、15分ごとにサイマティクスの波紋が鳴ります。音声はすべてリアルタイム合成 — メディアアセットはゼロです。',
      roleDetail:
        '単独制作で、あえて過剰に設計した習作です：グローバル変数ゼロのIoCコンテナ、GC停止を50–70%減らしたオブジェクトプール、差し替え可能なレンダラー戦略（スタンプ/スプラッター）、静的背景を再描画しない3層グラフィックスパイプライン。コンピュテーショナルデザインは、グラフィックス副専攻とエンジニアリングの規律が交わる場所です。',
      problems: [
        {
          p: '数千のインクパーティクルがGC停止を引き起こし、瞑想的なペースを壊していました。',
          s: 'フレームごとの割り当てを事前確保のオブジェクトプールとファクトリに置き換え。GC停止が50–70%減り、乱流の中でも流体は滑らかです。',
        },
        {
          p: '全キャンバス再描画では、重なるインクの履歴を60fpsで維持できませんでした。',
          s: 'レンダリングを3層に分割 — 静的背景・半静的履歴・動的前景。毎フレーム、実際に動いたものだけ再描画します。',
        },
      ],
      period: '2025年',
      teamSize: '単独',
      decisions: [
        {
          choice: 'パーティクルにオブジェクトプール + ファクトリ',
          why: 'GC停止は作品の敵でした — 事前確保で50–70%削減し、瞑想的なペースを守りました。',
        },
        {
          choice: '3層キャンバスパイプライン',
          why: '静的背景は再描画せず、毎フレーム動いたものだけ描き直します。',
        },
        {
          choice: 'アセットゼロの生成音声',
          why: '合成なら音も映像と同じルール体系の中に — 一つの美学、ダウンロードなし。',
        },
      ],
      tradeoffs: [
        {
          rejected: '流体にWebGL/シェーダー',
          why: '目標解像度ではp5.jsの2D + Perlinフィールドで十分 — 習作としてのコードの読みやすさを守りました。',
        },
      ],
      lessons: [
        'IoC・プール・ストラテジーといった設計パターンは、アート作品でも元が取れます。',
        '「アセットゼロ」のような制約が美学を研ぎます。',
      ],
      future: ['WebGLレンダラー戦略', 'MIDI入力マッピング', 'ギャラリー/インスタレーションモード'],
    },
  },
};

export function getLocalizedProject(key: ProjectKey, lang: Lang): Project {
  const base = PROJECTS[key];
  if (lang === 'en') return base;
  const override = L10N[lang][key];
  return { ...base, ...override };
}
