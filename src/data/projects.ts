import type { Project, ProjectKey, Lang } from './types';
import { PROFILE } from './profile';

export const PROJECT_ORDER: ProjectKey[] = ['crowd', 'iotbay', 'farm', 'gundam', 'ephemeral'];

export const PROJECTS: Record<ProjectKey, Project> = {
  crowd: {
    crumb: 'case_studies/01_crowd_detection',
    category: '01 · Deep Learning',
    title: 'Crowd Detection & Accessibility Navigation',
    summary:
      'Real-time crowd and proximity alerts for travellers with limited mobility. I kept building after the deep learning class deadline.',
    stack: ['YOLOv8', 'PyTorch', 'FastAPI', 'Spring Boot', 'React', 'Docker', 'AWS SageMaker', 'DVC'],
    role: 'Team lead — YOLO training, inference & alerting (97% of commits)',
    outcome: 'v2.6.0 released with a live demo',
    github: 'https://github.com/salieri009/DeepLearning42028UTS',
    diagram: ['Webcam Feed', 'React UI', 'Spring Boot API', 'FastAPI · YOLOv8', 'Proximity Alerts'],
    shipping: { label: 'Training', ports: ['JRDB', 'DVC', 'SageMaker · g5', 'best.pt', 'container'] },
    manifest: {
      badge: 'v2.6.0 · live',
      chips: ['YOLOv8', 'FastAPI', 'Spring Boot', 'React', 'SageMaker'],
      footer: 'Lead — training & inference · 97% commits',
    },
    receipts: { releases: true, prs: true },
    period: '2026 S1 · Autumn',
    teamSize: '3 — ML lead',
    decisions: [
      {
        choice: 'FastAPI for the inference service',
        why: 'Async I/O with Python next to the model. Per-frame latency stays low and YOLO imports cleanly.',
      },
      {
        choice: 'Spring Boot gateway instead of calling inference directly',
        why: 'Auth, rate limits, and API contracts sit in one place. The inference container stays swappable.',
      },
      {
        choice: 'DVC for dataset versioning',
        why: 'Training only reproduces when the data does. Each release pins its dataset hash.',
      },
    ],
    tradeoffs: [
      {
        rejected: 'Larger YOLOv8l/x variants',
        why: 'JRDB validation gained little accuracy, and latency blew the alert budget. Stayed with yolov8m.',
      },
      {
        rejected: 'WebSocket frame streaming',
        why: 'Per-frame HTTP was enough at webcam rates and easier to debug. Streaming stayed on the backlog.',
      },
    ],
    results: ['v2.6.0 · live demo', '193/199 commits', 'JRDB fine-tune · 8:1:1', 'Dockerized 3-tier'],
    lessons: [
      'Specs, ADRs, and training reports make ML work reviewable, not only runnable.',
      'Cloud training paid off more in reproducibility than in raw speed.',
    ],
    future: ['Model quantization for edge devices', 'WebSocket frame streaming', 'k8s deployment with autoscaling'],
    layers: [
      { label: 'infra', items: ['Docker', 'SageMaker'] },
      { label: 'services', items: ['Spring Boot', 'FastAPI·YOLO'] },
      { label: 'interface', items: ['React UI', 'Alerts'] },
    ],
    overview:
      'Started as UTS Deep Learning (42028). YOLOv8 detects people; bounding-box proximity heuristics warn travellers with limited mobility when crowds get close. Fine-tuned on JRDB (Stanford JackRabbot data), served through React, Spring Boot, and FastAPI in Docker. Training on AWS SageMaker; datasets versioned with DVC.',
    roleDetail:
      'ML lead, and most of the repo: 193 of 199 commits. Training pipeline (preprocessing, 8:1:1 splits, transfer-learning runs), FastAPI inference and alerting, SageMaker launch scripts, releases from v2.5.0 through v2.6.0 with specs, ADRs, and training reports.',
    problems: [
      {
        p: 'Off-the-shelf YOLOv8 struggled with dense indoor crowds.',
        s: 'Fine-tuned on JRDB with transfer learning and a strict 8:1:1 split. Each release had to clear a held-out proximity benchmark before shipping.',
      },
      {
        p: 'Webcam-to-alert latency meant warnings arrived too late to act on.',
        s: 'Split into dedicated services (React → Spring Boot → FastAPI) so per-frame inference runs in its own container. Kept the alert path short.',
      },
      {
        p: 'Local GPUs could not sustain long training runs.',
        s: 'Moved training to AWS SageMaker (ml.g5.xlarge) behind a scripted launcher. Runs became reproducible, resumable, and cheap to repeat.',
      },
    ],
  },
  iotbay: {
    crumb: 'case_studies/02_iotbay',
    category: '02 · Enterprise Platform',
    title: 'IoTBay',
    summary:
      'Full-stack IoT e-commerce: catalog, checkout, order lifecycle, admin tooling. Built with the habits an eight-person team needs to ship.',
    stack: ['Java Servlets', 'JSP/JSTL', 'SQLite', 'Tailwind CSS', 'JUnit', 'Selenium', 'GitHub Actions', 'Docker/GHCR'],
    role: 'Team contributor — 8-person squad, 297 commits total',
    outcome: '118 E2E tests passing · CI/CD to Docker/GHCR',
    github: 'https://github.com/salieri009/IoTBay',
    diagram: ['JSP Views', 'Servlet Controllers', 'Service Layer', 'DAO per Entity', 'SQLite'],
    shipping: { label: 'CI', ports: ['push', 'GH Actions', '118 E2E', 'Docker image', 'GHCR'] },
    manifest: {
      badge: '118 E2E · GHCR',
      chips: ['Java Servlets', 'SQLite', 'Selenium', 'GH Actions'],
      footer: 'Team of 8 — orders & tests',
    },
    receipts: { prs: true },
    period: '2025 S1 · Autumn',
    teamSize: '8',
    decisions: [
      {
        choice: 'Layered MVC with one DAO interface per entity',
        why: 'Eight people can work in parallel only if boundaries are explicit. The interface is the contract.',
      },
      {
        choice: 'SQLite over a server RDBMS',
        why: 'Zero config for eight laptops and CI. The DAO layer keeps a later PostgreSQL swap contained.',
      },
      {
        choice: 'Selenium E2E over unit-heavy testing',
        why: 'On a JSP UI, the risky bugs sit in the full request-to-render loop. The suite walks that loop from start to finish.',
      },
    ],
    tradeoffs: [
      {
        rejected: 'Spring framework',
        why: 'Course scope and team familiarity. Plain Servlets kept everyone productive, and the layering still leaves a migration path.',
      },
      {
        rejected: 'Client-side SPA frontend',
        why: 'Server-rendered JSP + Tailwind shipped faster with eight contributors of mixed frontend experience.',
      },
    ],
    results: ['118 E2E tests green', '297 commits · 8 devs', '14 security boundary tests', 'CI/CD → Docker/GHCR'],
    lessons: [
      'CI that runs everything on every push turns integration accidents into red builds, not production bugs.',
      'Security belongs in the test suite, not on a checklist.',
    ],
    future: ['PostgreSQL migration', 'Session store hardening', 'k8s deployment'],
    layers: [
      { label: 'data', items: ['SQLite', 'DAO'] },
      { label: 'logic', items: ['Servlets', 'Services'] },
      { label: 'interface', items: ['JSP', 'Tailwind'] },
    ],
    overview:
      'UTS Introduction to Software Development team project: e-commerce for IoT devices. Registration, role-based access (Customer/Staff/Admin), full-text product search, persistent carts, multi-step checkout, order lifecycle with shipments, and an admin dashboard with KPI overviews and bulk CSV/JSON export. Layered MVC: Servlet controllers, service layer, DAO interface per entity over SQLite.',
    roleDetail:
      'I was one of eight contributors on a codebase of 111 source files, working on order lifecycle features and the test suite. The team shipped 118 Selenium E2E tests across ten feature areas plus dedicated security boundary tests. GitHub Actions runs the full suite on every push; deploys go out as Docker images to GHCR.',
    problems: [
      {
        p: 'Eight contributors on one codebase kept colliding and breaking each other\'s features.',
        s: 'Strict layered architecture (Servlet → Service → DAO, one interface per entity) plus CI running all 118 tests on every push. Integration surprises became red builds instead of runtime bugs.',
      },
      {
        p: 'Security review flagged CSRF, SQL injection, and XSS vectors.',
        s: 'Added CSRF token validation, prepared statements everywhere, output encoding, and an access log for every authenticated action. Then wrote 14 security boundary tests to keep it that way.',
      },
    ],
  },
  farm: {
    crumb: 'case_studies/03_farm_simulator',
    category: '03 · Computer Graphics',
    title: 'Animal Farm Simulator',
    summary:
      'A browser 3D farm sandbox with four seasons, five weather systems, and a custom aurora shader that holds interactive frame rates.',
    stack: ['Three.js r182', 'React 19', 'TypeScript 5', 'Vite 7', 'GLSL', 'OpenWeatherMap API'],
    role: 'Graphics developer — Computer Graphics & Animation sub-major',
    outcome: 'Real-time seasons/weather with custom GLSL aurora',
    github: 'https://github.com/salieri009/ThreeJSUTS26-v2',
    diagram: ['React 19', 'Scene Graph', 'Season/Weather Systems', 'GLSL Shaders', 'WebGL'],
    shipping: { label: 'Optional', ports: ['OpenWeatherMap', 'weather sync', 'scene state'] },
    manifest: {
      badge: '4 seasons · GLSL',
      chips: ['Three.js', 'GLSL', 'React 19'],
      footer: 'Graphics — shaders & particles',
    },
    period: '2025 — v2 refactor 2026',
    teamSize: 'Team — graphics lead',
    decisions: [
      {
        choice: 'Custom GLSL for the aurora instead of textures',
        why: 'Time-driven noise gives volumetric motion in one draw call. Textures looked flat and cost memory.',
      },
      {
        choice: 'Instanced meshes for particles',
        why: 'Thousands of petals and raindrops in one draw call each. That was the only way to hold 60fps in storms.',
      },
      {
        choice: 'Vite + TypeScript for the v2 rewrite',
        why: 'Fast HMR for shader iteration. Types caught scene-graph misuse early.',
      },
    ],
    tradeoffs: [
      {
        rejected: 'Physically-based water & lighting',
        why: 'PBR ate too much frame budget for a stylized farm. Flat shading reads better and runs everywhere.',
      },
    ],
    results: ['4 seasons · 5 weather systems', 'Custom GLSL aurora', '60fps under storms', 'Live weather API sync'],
    lessons: [
      'Performance work is design work. Instancing changed which effects were even possible.',
      'A v2 rewrite made sense once scene composition was the debt.',
    ],
    future: ['Day/night cycle interpolation', 'Save/load farm layouts', 'Mobile touch controls'],
    layers: [
      { label: 'gpu', items: ['WebGL', 'GLSL'] },
      { label: 'scene', items: ['Three.js', 'Particles'] },
      { label: 'interface', items: ['React 19', 'Controls'] },
    ],
    overview:
      'UTS graphics assignment taken further than the brief. Build a 3D farm: place animals, buildings, and props on a snapping grid, expand terrain, watch the world react. Four seasons, five weather states including storms with lightning, night mode with an orbiting moon, optional live weather from OpenWeatherMap.',
    roleDetail:
      'Owned rendering: scene architecture, season and weather particles, day/night lighting, and a winter aurora written as custom GLSL instead of stacked textures. The v2 repo is a ground-up refactor of the original submission with cleaner scene composition.',
    problems: [
      {
        p: 'Thousands of particles (petals, rain, snow, fireflies) tanked the frame rate.',
        s: 'Moved effects to instanced rendering and GPU-driven particles, capping per-frame simulation so the scene stays interactive in storms.',
      },
      {
        p: 'The aurora looked flat and fake when built from textures.',
        s: 'Wrote a custom GLSL fragment shader: layered noise with banded hue shifts driven by time uniforms. One draw call for northern lights that read as volume.',
      },
    ],
  },
  gundam: {
    crumb: 'case_studies/04_gundam_board',
    category: '04 · Full-Stack · Solo',
    title: 'Gundam Board',
    summary: 'Full-stack CRUD board with real auth. Solo summer project to learn the serverless stack by shipping it.',
    stack: ['Next.js', 'AWS Chalice', 'PostgreSQL', 'Google OAuth', 'JWT'],
    role: 'Solo builder — schema to deploy',
    outcome: 'OAuth + JWT auth running on a serverless backend',
    github: 'https://github.com/salieri009/ToyProject-Gundam',
    diagram: ['Next.js', 'Typed API Client', 'AWS Chalice', 'JWT Middleware', 'PostgreSQL'],
    shipping: { label: 'Auth', ports: ['Google OAuth', 'server verify', 'short-lived JWT', 'request check'] },
    manifest: {
      badge: 'OAuth+JWT · serverless',
      chips: ['Next.js', 'AWS Chalice', 'PostgreSQL'],
      footer: 'Solo — schema to deploy',
    },
    period: '2025 · summer break',
    teamSize: 'Solo',
    decisions: [
      {
        choice: 'AWS Chalice (serverless) backend',
        why: 'No server management for a solo project. I wanted to learn IAM and API Gateway by shipping, not reading docs.',
      },
      {
        choice: 'Stateless JWT over server sessions',
        why: 'Serverless has no natural session store. Short-lived tokens fit the platform instead of fighting it.',
      },
    ],
    tradeoffs: [
      {
        rejected: 'DynamoDB',
        why: 'The board domain (posts, comments, users) is relational. PostgreSQL matched the access patterns better than key-value.',
      },
      {
        rejected: 'NextAuth all-in-one',
        why: 'I wanted to own the OAuth verify and JWT issue path once, without wrapping it in a library.',
      },
    ],
    results: ['OAuth + JWT from login to request', 'Serverless deploy on AWS', 'Typed API contract in one file'],
    lessons: [
      'Auth makes more sense after you build it once without a library.',
      'A thin typed client keeps backend refactors from leaking into the UI.',
    ],
    future: ['Refresh-token rotation', 'Terraform for infra', 'GitHub Actions deploy'],
    layers: [
      { label: 'data', items: ['PostgreSQL'] },
      { label: 'api', items: ['Chalice', 'JWT'] },
      { label: 'interface', items: ['Next.js'] },
    ],
    overview:
      '2025 summer project with one rule: no shortcuts on the hard parts. CRUD board with Google OAuth and JWT sessions, Next.js frontend, Python serverless backend on AWS Chalice, PostgreSQL. Layers I had not shipped before.',
    roleDetail:
      'Schema, Chalice routes and middleware, OAuth flow and JWT issuance/verification, Next.js frontend, deployment. Solo work is where I check how I structure code when no team conventions are holding me up.',
    problems: [
      {
        p: 'Session handling on a stateless serverless backend.',
        s: 'Short-lived JWT access tokens after server-side Google identity checks, verified in Chalice middleware on every request. No server-side session store.',
      },
      {
        p: 'First time wiring Next.js to a Python serverless API.',
        s: 'Defined a thin typed API client with the contract in one place so backend refactors stayed out of UI components.',
      },
    ],
  },
  ephemeral: {
    crumb: 'case_studies/05_ephemeral_time',
    category: '05 · Computational Design',
    title: 'EphemeralTime',
    summary: 'Generative art that treats time as a fluid. Attention shapes the flow. Built as a small product, not a sketch.',
    stack: ['p5.js', 'Perlin Noise', 'Generative Audio', 'IoC Container', 'Object Pool', 'Strategy Pattern'],
    role: 'Solo — concept, simulation, architecture',
    outcome: 'Real-time fluid + audio synthesis, zero assets',
    github: 'https://github.com/salieri009/EphemeralTime',
    diagram: ['Clock Events', 'Perlin Fluid Field', 'Particle Pool', 'Render Strategies', 'Generative Audio'],
    shipping: { label: 'Layers', ports: ['bgLayer · static', 'historyLayer', 'activeLayer'] },
    manifest: {
      badge: '60fps · GC −50~70%',
      chips: ['p5.js', 'Object Pool', 'IoC'],
      footer: 'Solo — architecture-first art',
    },
    period: '2025',
    teamSize: 'Solo',
    decisions: [
      {
        choice: 'Object pool + factory for particles',
        why: 'GC pauses were breaking the pacing. Pre-allocation cut them 50–70% and kept the experience smooth.',
      },
      {
        choice: 'Three-layer canvas pipeline',
        why: 'The static background never repaints. Each frame redraws only what moved.',
      },
      {
        choice: 'Generative audio with zero assets',
        why: 'Synthesis keeps sound in the same rule system as the visuals. One aesthetic, nothing to download.',
      },
    ],
    tradeoffs: [
      {
        rejected: 'WebGL/shaders for the fluid',
        why: 'p5.js 2D with Perlin fields was enough at target resolution, and the code stayed readable as a study piece.',
      },
    ],
    results: ['GC pauses −50~70%', '60fps · thousands of particles', '0 media assets'],
    lessons: [
      'Architecture patterns (IoC, pools, strategies) still earn their keep in art projects.',
      'Constraints like "zero assets" sharpen the aesthetic.',
    ],
    future: ['WebGL renderer strategy', 'MIDI input mapping', 'Gallery/installation mode'],
    layers: [
      { label: 'core', items: ['IoC', 'Object Pool'] },
      { label: 'simulation', items: ['Perlin Fluid', 'Clock'] },
      { label: 'canvas', items: ['p5.js', 'Audio'] },
    ],
    overview:
      'Interactive piece that treats time as a "reservoir of attention." Leave the canvas calm and time flows slowly. Stir with fast mouse movement and turbulence hits the fluid, saturation, and sound. Every hour a sun drop drifts across; quarter-hours ring as cymatic ripples. Audio is synthesized live. Zero media assets.',
    roleDetail:
      'Solo, heavy on structure on purpose: IoC with zero globals, object pool that cut GC pauses by 50–70%, swappable renderer strategies (stamp vs. splatter), three-layer graphics pipeline so the static background never repaints.',
    problems: [
      {
        p: 'Thousands of ink particles caused garbage-collection stutters that broke the pacing.',
        s: 'Replaced per-frame allocation with a pre-allocated object pool and factory. 50–70% fewer GC pauses; the fluid stays smooth under turbulence.',
      },
      {
        p: 'Full-canvas repaints made layered ink history impossible at 60fps.',
        s: 'Split rendering into three layers: static background, semi-static history, dynamic foreground. Each frame only redraws what moved.',
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
      summary: '이동이 불편한 여행자를 위한 실시간 혼잡·근접 경보다. 딥러닝 수업이 끝난 뒤에도 계속 만들었다.',
      role: '팀 리드 — YOLO 학습·추론·알림 담당 (커밋의 97%)',
      outcome: 'v2.6.0 릴리스, 라이브 데모 운영 중',
      overview:
        'UTS 딥러닝(42028)에서 시작했다. YOLOv8로 사람을 감지하고, 바운딩박스 근접 휴리스틱으로 다가오는 인파를 경고한다. JRDB로 파인튜닝했고, React·Spring Boot·FastAPI를 Docker로 묶었다. 학습은 SageMaker, 데이터는 DVC.',
      roleDetail:
        'ML을 맡았고 코드 대부분도 내가 썼다 — 199개 커밋 중 193개. 학습 파이프라인, FastAPI 추론·알림, SageMaker 스크립트, v2.5.0~v2.6.0 릴리스(스펙·ADR·학습 리포트 포함)까지.',
      problems: [
        {
          p: '기본 YOLOv8은 실내 밀집 인파에서 성능이 잘 나오지 않았다.',
          s: 'JRDB로 전이학습 파인튜닝하고 8:1:1 분할을 지켰다. 릴리스마다 별도 근접 벤치마크를 통과해야 배포했다.',
        },
        {
          p: '웹캠에서 경보까지 지연이 커서 경고가 너무 늦게 도착했다.',
          s: 'React → Spring Boot → FastAPI로 서비스를 분리해 프레임 추론을 전용 컨테이너에서 돌렸다. 경보 경로를 짧게 유지하는 게 목적이었다.',
        },
        {
          p: '로컬 GPU로는 긴 학습 런을 버틸 수 없었다.',
          s: '학습을 AWS SageMaker(ml.g5.xlarge)로 옮기고 스크립트 런처를 만들었다. 모든 런을 재현하고 재개할 수 있게 했다.',
        },
      ],
      period: '2026년 1학기',
      teamSize: '3명 — ML 리드',
      decisions: [
        {
          choice: '추론 서비스에 FastAPI',
          why: '비동기 I/O에, 모델 바로 옆에 붙는 파이썬 런타임. 프레임당 지연이 낮고 YOLO 스택이 깔끔하게 붙는다.',
        },
        {
          choice: '추론을 직접 호출하지 않고 Spring Boot 게이트웨이를 둠',
          why: '인증, 레이트 리밋, API 계약을 한 곳에 모은다. 추론 컨테이너는 언제든 교체할 수 있다.',
        },
        {
          choice: '데이터셋 버전 관리에 DVC',
          why: '데이터가 재현 가능해야 학습도 재현 가능하다. 릴리스마다 데이터셋 해시를 고정한다.',
        },
      ],
      tradeoffs: [
        {
          rejected: '더 큰 YOLOv8l/x 모델',
          why: 'JRDB 검증에서 정확도 이득은 미미한데 추론 지연이 실시간 경보 예산을 넘겼다. yolov8m을 유지했다.',
        },
        {
          rejected: 'WebSocket 프레임 스트리밍',
          why: '웹캠 프레임레이트에서는 프레임당 HTTP로도 충분했고 디버깅도 쉬웠다. 스트리밍은 백로그로 미뤘다.',
        },
      ],
      lessons: [
        '스펙, ADR, 학습 리포트가 ML 작업을 리뷰 가능하게 만든다. 돌아가는 것만으로는 부족하다.',
        '클라우드 학습의 진짜 가치는 속도보다 재현성에 있다.',
      ],
      future: ['엣지 디바이스용 모델 양자화', 'WebSocket 프레임 스트리밍', '오토스케일링 붙인 k8s 배포'],
    },
    iotbay: {
      summary: 'IoT 이커머스 풀스택이다. 카탈로그, 결제, 주문, 관리자 도구까지. 8인 팀이 배포할 때 필요한 규율로 짰다.',
      role: '팀 기여자 — 8인 팀, 총 297 커밋',
      outcome: 'E2E 테스트 118개 통과 · Docker/GHCR로 CI/CD',
      overview:
        'UTS 소프트웨어 개발 입문 팀 과제다. IoT 기기 이커머스. 회원가입, 역할별 접근, 상품 검색, 장바구니, 결제, 배송 주문, KPI 대시보드와 CSV/JSON 내보내기까지. Servlet·Service·DAO 레이어드 MVC, SQLite.',
      roleDetail:
        '소스 파일 111개짜리 코드베이스에서 8명 중 한 명으로 주문 라이프사이클과 테스트 스위트를 맡았다. 팀은 10개 기능 영역을 덮는 Selenium E2E 118개와 보안 경계 테스트를 만들었고, 푸시마다 GitHub Actions가 전부 돈다. 배포는 Docker 이미지로 GHCR까지.',
      problems: [
        {
          p: '8명이 한 코드베이스에서 작업하다 보니 서로의 기능을 계속 깨뜨렸다.',
          s: 'Servlet → Service → DAO로 계층을 나누고 엔티티마다 인터페이스를 뒀다. 푸시마다 118개 테스트를 돌리는 CI를 붙이니 통합 사고가 런타임 버그 대신 빨간 빌드로 잡혔다.',
        },
        {
          p: '보안 리뷰에서 CSRF, SQL 인젝션, XSS가 지적됐다.',
          s: 'CSRF 토큰 검증, prepared statement, 출력 인코딩, 인증된 행동의 접근 로그를 넣었다. 그 상태를 지키려고 보안 경계 테스트 14개를 남겼다.',
        },
      ],
      period: '2025년 1학기',
      teamSize: '8명',
      decisions: [
        {
          choice: '엔티티마다 DAO 인터페이스를 둔 레이어드 MVC',
          why: '8명이 병렬로 일하려면 경계가 명시적이어야 한다. 인터페이스가 곧 계약이다.',
        },
        {
          choice: '서버형 RDBMS 대신 SQLite',
          why: '노트북 8대와 CI에서 설정이 필요 없다. DAO 계층 덕분에 나중에 PostgreSQL로 바꿀 때도 범위가 갇혀 있다.',
        },
        {
          choice: '유닛 위주 대신 Selenium E2E',
          why: 'JSP UI에서 위험한 버그는 요청→렌더 전체 루프에 있다. 테스트도 그 루프를 끝까지 돈다.',
        },
      ],
      tradeoffs: [
        {
          rejected: 'Spring 프레임워크',
          why: '과목 범위와 팀 숙련도를 고려해 순수 Servlet을 썼다. 계층 구조가 마이그레이션 경로는 남겨둔다.',
        },
        {
          rejected: '클라이언트 SPA 프론트엔드',
          why: '프론트 경험이 제각각인 8명에게는 서버 렌더링 JSP + Tailwind가 더 빨랐다.',
        },
      ],
      lessons: [
        '푸시마다 전부 돌리는 CI는 통합 사고를 런타임 버그 대신 빨간 빌드로 바꾼다.',
        '보안은 체크리스트가 아니라 테스트 스위트에 넣어야 한다.',
      ],
      future: ['PostgreSQL 마이그레이션', '세션 스토어 강화', 'k8s 배포'],
    },
    farm: {
      summary: '브라우저 3D 농장 샌드박스다. 사계절, 다섯 가지 날씨, 직접 쓴 오로라 셰이더가 인터랙티브 프레임레이트로 돈다.',
      role: '그래픽스 개발 — 컴퓨터 그래픽스 & 애니메이션 부전공',
      outcome: '실시간 계절/날씨 + 자작 GLSL 오로라',
      overview:
        'UTS 그래픽스 과제를 브리프보다 멀리 끌고 갔다. 클릭으로 동물·건물·소품을 그리드에 배치하고 지형을 넓힌다. 사계절, 번개 폭풍을 포함한 다섯 가지 날씨, 달이 도는 밤 모드, OpenWeatherMap 연동은 옵션.',
      roleDetail:
        '렌더링을 맡았다. 씬 아키텍처, 계절·날씨 파티클, 낮/밤 조명, 텍스처 조합이 아니라 GLSL로 직접 쓴 겨울 오로라까지. v2 저장소는 원래 제출물을 씬 구성부터 갈아엎은 리팩터링이다.',
      problems: [
        {
          p: '꽃잎, 비, 눈, 반딧불 — 수천 개의 파티클이 프레임레이트를 무너뜨렸다.',
          s: '이펙트를 인스턴스드 렌더링과 GPU 파티클로 옮기고 프레임당 시뮬레이션에 상한을 뒀다. 폭풍 속에서도 씬은 인터랙티브하게 유지된다.',
        },
        {
          p: '텍스처로 만든 오로라는 평면적이고 가짜처럼 보였다.',
          s: 'GLSL 프래그먼트 셰이더를 직접 썼다. 시간 유니폼으로 움직이는 레이어드 노이즈와 색 밴드로, 드로우콜 하나에서 볼륨감 있는 북극광을 만들었다.',
        },
      ],
      period: '2025 — 2026년 v2 리팩터링',
      teamSize: '팀 — 그래픽스 리드',
      decisions: [
        {
          choice: '오로라를 텍스처 대신 GLSL로 직접 작성',
          why: '시간 기반 노이즈는 드로우콜 하나로 볼륨감 있는 움직임을 준다. 텍스처는 평면적이고 메모리만 먹었다.',
        },
        {
          choice: '파티클에 인스턴스드 메시',
          why: '수천 개의 꽃잎과 빗방울을 각각 드로우콜 하나로 처리한다. 폭풍에서 60fps를 지키는 방법이었다.',
        },
        {
          choice: 'v2 재작성에 Vite + TypeScript',
          why: '셰이더 반복에 빠른 HMR. 씬 그래프 오용은 타입이 초기에 잡아줬다.',
        },
      ],
      tradeoffs: [
        {
          rejected: '물리 기반 물/조명(PBR)',
          why: '스타일라이즈된 농장에는 프레임 예산 대비 과했다. 플랫 셰이딩이 더 잘 읽히고 어디서나 돌아간다.',
        },
      ],
      lessons: [
        '성능 작업이 곧 디자인 작업이다. 인스턴싱이 가능한 이펙트의 범위 자체를 바꿨다.',
        '씬 구성이 빚이 됐다면 재작성(v2)은 값을 한다.',
      ],
      future: ['낮/밤 사이클 보간', '농장 배치 저장/불러오기', '모바일 터치 컨트롤'],
    },
    gundam: {
      summary: '인증이 붙은 풀스택 CRUD 게시판. 서버리스 스택을 배우려고 여름에 혼자 만들었다.',
      role: '단독 개발 — 스키마부터 배포까지',
      outcome: '서버리스 백엔드에서 OAuth + JWT 인증 동작',
      overview:
        '2025년 여름방학 프로젝트. 규칙은 하나, 어려운 부분에서 지름길 없기. Google OAuth와 JWT 세션이 붙은 CRUD 게시판을 Next.js 프론트와 AWS Chalice 위 Python 서버리스 백엔드 + PostgreSQL로 만들었다. 한 번도 배포해 본 적 없는 기술만 골랐다.',
      roleDetail:
        '전부 했다. 데이터베이스 스키마, Chalice API 라우트와 미들웨어, OAuth와 JWT 발급/검증, Next.js 프론트엔드, 배포까지. 혼자 하는 프로젝트는 팀 컨벤션이 없을 때 코드를 어떻게 짜는지 시험하는 자리다.',
      problems: [
        {
          p: '상태가 없는 서버리스 백엔드에서의 세션 처리.',
          s: 'Google 신원을 서버에서 검증한 뒤 짧은 수명의 JWT를 발급하고, 매 요청마다 Chalice 미들웨어에서 확인한다. 서버 쪽 세션 저장소가 필요 없어졌다.',
        },
        {
          p: 'Next.js를 Python 서버리스 API에 붙이는 건 처음이었다.',
          s: '얇은 타입드 API 클라이언트를 만들어 계약을 한 곳에 모았다. 백엔드를 리팩터링해도 UI로 새지 않는다.',
        },
      ],
      period: '2025년 여름방학',
      teamSize: '단독',
      decisions: [
        {
          choice: 'AWS Chalice(서버리스) 백엔드',
          why: '혼자 하는 프로젝트에 서버 관리는 제로. IAM/API Gateway를 문서 대신 배포로 배우고 싶었다.',
        },
        {
          choice: '서버 세션 대신 무상태 JWT',
          why: '서버리스에는 자연스러운 세션 저장소가 없다. 짧은 수명의 토큰이 플랫폼과 싸우지 않는 방법이다.',
        },
      ],
      tradeoffs: [
        {
          rejected: 'DynamoDB',
          why: '게시판 도메인(글·댓글·사용자)은 관계형이다. 키-밸류보다 PostgreSQL이 맞았다.',
        },
        {
          rejected: 'NextAuth 올인원',
          why: 'OAuth 검증과 JWT 발급 경로를 직접 만드는 게 목적이었다. 인증 플로우를 한 번은 직접 가져가고 싶었다.',
        },
      ],
      lessons: [
        '라이브러리 없이 한 번 만들어보면 인증이 훨씬 분명해진다.',
        '얇은 타입드 클라이언트가 백엔드 리팩터링이 UI로 새는 걸 막아준다.',
      ],
      future: ['리프레시 토큰 로테이션', 'Terraform 도입', 'GitHub Actions 배포'],
    },
    ephemeral: {
      summary: '시간을 유체로 다루는 제너러티브 아트. 주의가 흐름을 바꾼다. 스케치가 아니라 작은 프로덕트처럼 짰다.',
      role: '단독 — 컨셉, 시뮬레이션, 아키텍처',
      outcome: '실시간 유체 + 오디오 합성, 에셋 제로',
      overview:
        '시간을 "주의력의 저수지"로 시각화한 인터랙티브 아트다. 캔버스를 가만두면 시간이 느리게 흐르고, 마우스를 빠르게 휘저으면 난류가 유체와 채도, 소리까지 흐트러뜨린다. 매시간 태양 방울이 지나가고, 15분마다 사이매틱 파문이 울린다. 오디오는 전부 실시간 합성, 미디어 에셋은 없다.',
      roleDetail:
        '혼자 만들었고, 구조는 일부러 무겁게 잡았다. 전역 변수 없는 IoC, GC 멈춤을 50–70% 줄인 오브젝트 풀, 교체 가능한 렌더러, 정적 배경을 다시 그리지 않는 3계층 파이프라인까지.',
      problems: [
        {
          p: '수천 개의 잉크 파티클이 GC 멈춤을 일으켜 페이싱을 깨뜨렸다.',
          s: '프레임마다 할당하던 걸 사전 할당된 오브젝트 풀과 팩토리로 바꿨다. GC 멈춤이 50–70% 줄었고, 난류 속에서도 유체는 매끄럽다.',
        },
        {
          p: '전체 캔버스를 다시 그리면 겹겹이 쌓이는 잉크 히스토리를 60fps로 유지할 수 없었다.',
          s: '렌더링을 세 층으로 나눴다. 정적 배경, 반정적 히스토리, 동적 전경. 매 프레임 실제로 움직인 것만 다시 그린다.',
        },
      ],
      period: '2025',
      teamSize: '단독',
      decisions: [
        {
          choice: '파티클에 오브젝트 풀 + 팩토리',
          why: 'GC 멈춤이 페이싱을 깨뜨렸다. 사전 할당으로 50–70% 줄이고 흐름을 지켰다.',
        },
        {
          choice: '3계층 캔버스 파이프라인',
          why: '정적 배경은 다시 그리지 않고, 매 프레임 움직인 것만 다시 그린다.',
        },
        {
          choice: '에셋 제로 제너러티브 오디오',
          why: '합성은 소리를 비주얼과 같은 규칙 체계 안에 둔다. 하나의 미학, 다운로드는 없다.',
        },
      ],
      tradeoffs: [
        {
          rejected: '유체에 WebGL/셰이더',
          why: '목표 해상도에서는 p5.js 2D + Perlin 필드로 충분했고, 습작으로서 코드 가독성도 지켰다.',
        },
      ],
      lessons: [
        'IoC, 풀, 전략 같은 아키텍처 패턴은 아트 프로젝트에서도 제값을 한다.',
        '"에셋 제로" 같은 제약이 미학을 더 또렷하게 만든다.',
      ],
      future: ['WebGL 렌더러 전략', 'MIDI 입력 매핑', '갤러리/설치 모드'],
    },
  },
  ja: {
    crowd: {
      summary: '移動が不自由な旅行者向けのリアルタイム混雑・近接アラートです。深層学習の授業の締切を過ぎても作り続けました。',
      role: 'チームリード — YOLO学習・推論・アラート担当（コミットの97%）',
      outcome: 'v2.6.0リリース、ライブデモ稼働中',
      overview:
        'UTS深層学習（42028）から始まりました。YOLOv8で人物を検出し、バウンディングボックスの近接ヒューリスティクスで接近する人混みを警告します。JRDBでファインチューニングし、React・Spring Boot・FastAPIをDocker化。学習はSageMaker、データはDVCです。',
      roleDetail:
        'MLを担当し、コードの大半も書きました。199コミット中193。学習パイプライン、FastAPI推論・アラート、SageMakerスクリプト、v2.5.0〜v2.6.0リリース（仕様・ADR・学習レポート含む）。',
      problems: [
        {
          p: '素のYOLOv8は屋内の密集した人混みで性能が出ませんでした。',
          s: 'JRDBで転移学習によるファインチューニングを行い、8:1:1分割を徹底。リリースごとに別途の近接ベンチマークを通過してから出荷しました。',
        },
        {
          p: 'Webカメラからアラートまでの遅延が大きく、警告が間に合いませんでした。',
          s: 'React → Spring Boot → FastAPIにサービスを分離し、フレーム推論を専用コンテナで実行。アラート経路を短く保つのが目的でした。',
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
          why: '非同期I/Oとモデルの隣にあるPythonランタイム。フレームあたりの遅延を抑え、YOLOスタックが素直に載ります。',
        },
        {
          choice: '推論を直接呼ばずSpring Bootゲートウェイを挟む',
          why: '認証・レート制限・API契約を一箇所に集約。推論コンテナは差し替え可能なままです。',
        },
        {
          choice: 'データセット管理にDVC',
          why: 'データが再現できて初めて学習も再現できます。リリースごとにデータセットハッシュを固定します。',
        },
      ],
      tradeoffs: [
        {
          rejected: 'より大きいYOLOv8l/x',
          why: 'JRDB検証での精度向上はわずかで、推論遅延がリアルタイムアラートの予算を超過。yolov8mを維持しました。',
        },
        {
          rejected: 'WebSocketフレームストリーミング',
          why: 'Webカメラのフレームレートではフレーム毎HTTPで十分で、デバッグも容易。ストリーミングはバックログに回しました。',
        },
      ],
      lessons: [
        '仕様書・ADR・学習レポートがあることで、ML作業はレビュー可能になります。動くだけではありません。',
        'クラウド学習の価値は速度より再現性にあります。',
      ],
      future: ['エッジ向けモデル量子化', 'WebSocketストリーミング', 'オートスケール付きk8sデプロイ'],
    },
    iotbay: {
      summary: 'IoT eコマースのフルスタック。カタログ、決済、注文、管理ツール。8人チームが出荷する前提の規律で組みました。',
      role: 'チームメンバー — 8人チーム、計297コミット',
      outcome: 'E2Eテスト118件パス · Docker/GHCRへCI/CD',
      overview:
        'UTSソフトウェア開発入門のチーム課題です。IoTデバイスのeコマース。会員登録、ロール別アクセス、商品検索、カート、決済、配送付き注文、KPIダッシュボードとCSV/JSON一括エクスポート。Servlet・Service・DAOのレイヤードMVC、SQLite。',
      roleDetail:
        'ソースファイル111個のコードベースで8人のうちの一人として、注文ライフサイクルとテストスイートを担当しました。チームは10機能領域をカバーするSelenium E2E 118件とセキュリティ境界テストを整備し、プッシュごとにGitHub Actionsが全件実行します。デプロイはDockerイメージとしてGHCRへ。',
      problems: [
        {
          p: '8人が一つのコードベースで作業し、互いの機能を壊し続けていました。',
          s: 'Servlet → Service → DAOのレイヤー分けとエンティティごとのインターフェース、全118テストを毎プッシュ実行するCIで、統合の事故はランタイムバグではなく赤いビルドとして現れるようになりました。',
        },
        {
          p: 'セキュリティレビューでCSRF・SQLインジェクション・XSSが指摘されました。',
          s: 'CSRFトークン検証、prepared statement、出力エンコーディング、認証済み操作のアクセスログを導入。それを維持するために14件のセキュリティ境界テストを残しました。',
        },
      ],
      period: '2025年 前期',
      teamSize: '8名',
      decisions: [
        {
          choice: 'エンティティごとにDAOインターフェースを置くレイヤードMVC',
          why: '8人が並行して動けるのは境界が明示的なときだけ。インターフェースが契約そのものです。',
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
        'セキュリティはチェックリストではなくテストスイートに入れるべきです。',
      ],
      future: ['PostgreSQL移行', 'セッションストア強化', 'k8sデプロイ'],
    },
    farm: {
      summary: 'ブラウザで動く3D農場サンドボックスです。四季、5種類の天気、自作オーロラシェーダーがインタラクティブなフレームレートで動きます。',
      role: 'グラフィックス開発 — CG＆アニメーション副専攻',
      outcome: 'リアルタイム季節/天気 + 自作GLSLオーロラ',
      overview:
        'UTSのグラフィックス課題を要件より先まで進めました。クリックで動物・建物・小物をグリッドに配置し、地形を広げます。四季、雷を伴う嵐を含む5種類の天気、月が周回する夜モード、OpenWeatherMap連携は任意です。',
      roleDetail:
        'レンダリングを担当しました。シーンアーキテクチャ、季節・天気のパーティクル、昼夜のライティング、テクスチャの組み合わせではなくGLSLで書いた冬のオーロラ。v2リポジトリはシーン構成から作り直したリファクタリング版です。',
      problems: [
        {
          p: '花びら・雨・雪・蛍 — 数千のパーティクルがフレームレートを崩壊させました。',
          s: 'エフェクトをインスタンスドレンダリングとGPUパーティクルへ移し、フレームあたりのシミュレーション量に上限を設定。嵐の中でもシーンはインタラクティブなままです。',
        },
        {
          p: 'テクスチャで作ったオーロラは平面的で嘘っぽく見えました。',
          s: 'GLSLフラグメントシェーダーを自作。時間ユニフォームで動くレイヤードノイズと色帯で、ドローコール1回の予算でボリューム感のあるオーロラを実現しました。',
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
          why: '数千の花びらや雨粒をそれぞれドローコール1回で処理。嵐の中で60fpsを守る方法でした。',
        },
        {
          choice: 'v2書き直しにVite + TypeScript',
          why: 'シェーダー反復に速いHMR。シーングラフの誤用は型が早期に検出します。',
        },
      ],
      tradeoffs: [
        {
          rejected: '物理ベースの水と照明（PBR）',
          why: 'スタイライズされた農場にはフレーム予算に対して過剰。フラットシェーディングの方が読みやすく、どこでも動きます。',
        },
      ],
      lessons: [
        'パフォーマンス作業はデザイン作業です。インスタンシングが可能なエフェクトの幅を変えました。',
        'シーン構成が負債になったら、書き直し（v2）は元が取れます。',
      ],
      future: ['昼夜サイクルの補間', '農場レイアウトの保存/読込', 'モバイルタッチ操作'],
    },
    gundam: {
      summary: '認証付きフルスタックCRUD掲示板。サーバーレススタックを学ぶために夏に一人で作りました。',
      role: '単独開発 — スキーマからデプロイまで',
      outcome: 'サーバーレス上でOAuth + JWT認証が動作',
      overview:
        '2025年夏休みのプロジェクト。ルールは一つ。難しい部分でショートカットしない。Google OAuthとJWTセッション付きのCRUD掲示板を、Next.jsフロントとAWS Chalice上のPythonサーバーレスバックエンド + PostgreSQLで構築。出荷したことのない技術だけでレイヤーを選びました。',
      roleDetail:
        '全部です。データベーススキーマ、ChaliceのAPIルートとミドルウェア、OAuthフローとJWTの発行/検証、Next.jsフロントエンド、デプロイ。ソロプロジェクトは、チームの規約がないときに自分がコードをどう構造化するかを試す場です。',
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
          why: 'ソロプロジェクトにサーバー管理ゼロ。IAM/API Gatewayを読むのではなく、出荷して学びたかった。',
        },
        {
          choice: 'サーバーセッションではなくステートレスJWT',
          why: 'サーバーレスに自然なセッションストアはありません。短命トークンがプラットフォームと戦わない方法です。',
        },
      ],
      tradeoffs: [
        {
          rejected: 'DynamoDB',
          why: '掲示板ドメイン（投稿・コメント・ユーザー）はリレーショナル。キーバリューよりPostgreSQLが合っていました。',
        },
        {
          rejected: 'NextAuthオールインワン',
          why: 'OAuth検証とJWT発行の経路を自作することが目的でした。認証フローを一度は自分の手で持ちたかった。',
        },
      ],
      lessons: [
        'ライブラリなしで一度作ると、認証の仕組みがずっと分かりやすくなります。',
        '薄い型付きクライアントが、バックエンドの変更がUIへ漏れるのを防ぎます。',
      ],
      future: ['リフレッシュトークンのローテーション', 'Terraform導入', 'GitHub Actionsデプロイ'],
    },
    ephemeral: {
      summary: '時間を流体として扱うジェネラティブアート。注意が流れを変えます。スケッチではなく小さなプロダクトとして組みました。',
      role: '単独 — コンセプト、シミュレーション、アーキテクチャ',
      outcome: 'リアルタイム流体 + 音声合成、アセットゼロ',
      overview:
        '時間を「注意の貯水池」として可視化するインタラクティブアート。キャンバスを静かに保てば時間はゆっくり流れ、マウスを速く動かすと乱流が流体・彩度・音まで乱します。毎正時に太陽の雫が横切り、15分ごとにサイマティクスの波紋が鳴ります。音声はすべてリアルタイム合成。メディアアセットはゼロです。',
      roleDetail:
        '単独制作で、構造は意図的に重めです。グローバル変数ゼロのIoC、GC停止を50–70%減らしたオブジェクトプール、差し替え可能なレンダラー、静的背景を再描画しない3層パイプライン。',
      problems: [
        {
          p: '数千のインクパーティクルがGC停止を引き起こし、ペースを壊していました。',
          s: 'フレームごとの割り当てを事前確保のオブジェクトプールとファクトリに置き換え。GC停止が50–70%減り、乱流の中でも流体は滑らかです。',
        },
        {
          p: '全キャンバス再描画では、重なるインクの履歴を60fpsで維持できませんでした。',
          s: 'レンダリングを3層に分割。静的背景・半静的履歴・動的前景。毎フレーム、実際に動いたものだけ再描画します。',
        },
      ],
      period: '2025年',
      teamSize: '単独',
      decisions: [
        {
          choice: 'パーティクルにオブジェクトプール + ファクトリ',
          why: 'GC停止がペースを壊していました。事前確保で50–70%削減し、流れを維持しました。',
        },
        {
          choice: '3層キャンバスパイプライン',
          why: '静的背景は再描画せず、毎フレーム動いたものだけ描き直します。',
        },
        {
          choice: 'アセットゼロの生成音声',
          why: '合成なら音も映像と同じルール体系の中に。一つの美学、ダウンロードなし。',
        },
      ],
      tradeoffs: [
        {
          rejected: '流体にWebGL/シェーダー',
          why: '目標解像度ではp5.jsの2D + Perlinフィールドで十分。習作としてのコードの読みやすさを守りました。',
        },
      ],
      lessons: [
        'IoC・プール・ストラテジーといった設計パターンは、アート作品でも元が取れます。',
        '「アセットゼロ」のような制約が美学をよりはっきりさせます。',
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

export interface ProjectReceipt {
  label: string;
  url: string;
}

/** Bill of lading — auto-derived GitHub links only, never fabricated deep links. */
export function getReceipts(p: Project): ProjectReceipt[] {
  const out: ProjectReceipt[] = [
    { label: 'commits', url: `${p.github}/commits?author=${PROFILE.githubUser}` },
  ];
  if (p.receipts?.releases) out.push({ label: 'releases', url: `${p.github}/releases` });
  if (p.receipts?.prs) {
    out.push({
      label: 'PRs',
      url: `${p.github}/pulls?q=${encodeURIComponent(`is:pr author:${PROFILE.githubUser}`)}`,
    });
  }
  return out;
}
