import type { Lang, Strings } from './types';

const SHARED = {
  en: {
    navProjects: 'projects',
    navExperience: 'experience',
    navSkills: 'skills',
    navVoyage: 'voyage',
    navAbout: 'about',
    navContact: 'contact',
    navDownload: 'Download Résumé',
    navOnline: 'Online',
    sectionProjects: 'Case Studies',
    sectionExperience: 'Timeline',
    sectionSkills: 'Arsenal',
    sectionAbout: 'About',
    courseTop: 'Port — Hero',
    priorService: 'Prior Service',
    armyName: 'Republic of Korea Army',
    armyRole: 'Interpreter / translator. English liaison work.',
    majorLine: 'Major: Enterprise Software Development · Sub-major: Computer Graphics and Animation',
    exemptionsNote:
      'Exemptions already covered Programming 1–2, Databases, Networks, Web Systems, Business Requirements, and Intro to IS.',
    voyageTitle: 'Voyage Chart',
    voyageIntro:
      'Five projects on one chart, oldest to newest on the dashed line. Follow the route, then the IoTBay CI/CD strip that reached GHCR.',
    voyageCICDLabel: 'IoTBay deployment route',
    voyageCICDNote: 'push → GitHub Actions → 118 E2E tests → Docker image → GHCR',
    voyageIslandHint: 'Click an island to open the case study',
    lighthouseStatus: 'status: online',
    lighthouseUptime: 'done for now · systems look fine',
    backToTop: 'Back to top',
    heroEyebrow: 'voyage log · UTS BIT complete',
    heroCtaPrimary: 'Start Voyage →',
    heroCtaSecondary: 'Download Résumé',
    heroSrStory:
      'Degree stack drawn as an exploded axonometric. Foundations from exemptions; Systems via Cloud and Architecture; Algorithms and Graphics for the sub-major; Production in Software Development Studio. UTS Bachelor of Information Technology, complete. GPA 6.00/7.0, WAM 80.31, 144 credit points.',
    axonoL0: 'L0 · Foundations',
    axonoL0Sub: 'Exemptions — Prog, DB, Networks',
    axonoL1: 'L1 · Systems',
    axonoL1Sub: 'Cloud/SaaS 86 HD · Architecture · Intro Game Dev',
    axonoL2: 'L2 · Algorithms & Graphics',
    axonoL2Sub: 'DSA 92 HD · CG · Interactive Media',
    axonoL3: 'L3 · Production',
    axonoL3Sub: 'Studio 95 HD · CI/CD · Data Eng',
    axonoRoof: 'Complete · GPA 6.00/7.0 · WAM 80.31',
    timelineFoundations:
      'Programming, Databases, Networks, Web Systems, and a few more came in through exemptions. I started mid-stream, not from week one.',
    semesterSpr24Title: 'Cloud & Architecture',
    semesterSpr24Body:
      'Cloud Computing and SaaS at 86 HD, Software Architecture at 80 D. Intro to Computer Game Development started the games track. First term I had to think in services instead of one-off assignments.',
    semesterAut25Title: 'Algorithms & Graphics',
    semesterAut25Body:
      'Data Structures at 92 HD, Intro to Software Development at 90 HD, Computer Graphics at 81 D. Game Design Methodologies finished at 64 P with The Five Floors, a Unity WebGL puzzle our team of four put on itch.io.',
    semesterSpr25Title: 'Enterprise semester',
    semesterSpr25Body:
      'Advanced Software Development at 87 HD produced le-restaurant: five of us, Spring Boot + React, on Azure. Interaction Design, Interactive Media, and Project Management ran in the same term.',
    semesterAut26Title: 'Capstone semester',
    semesterAut26Body:
      'Software Development Studio closed at 95 HD with industry partner StevTech. Data Engineering and TD sat next to it. Deep Learning was 68 C on the transcript; the production follow-up is the Crowd Detection case study.',
    fullRecordNote: 'Full record: 144 credit points · GPA 6.00 / 7.0 · WAM 80.31 · Complete 2026',
  },
  ko: {
    navProjects: '프로젝트',
    navExperience: '타임라인',
    navSkills: '스킬',
    navVoyage: '항해도',
    navAbout: '소개',
    navContact: '연락',
    navDownload: '이력서 다운로드',
    navOnline: 'Online',
    sectionProjects: '케이스 스터디',
    sectionExperience: '타임라인',
    sectionSkills: '무기고',
    sectionAbout: '소개',
    courseTop: '출항지 — Hero',
    priorService: '이전 복무',
    armyName: '대한민국 육군',
    armyRole: '통역병. 영어 연락 업무.',
    majorLine: '전공: Enterprise Software Development · 서브메이저: Computer Graphics and Animation',
    exemptionsNote:
      'Programming 1–2, Databases, Networks, Web Systems, Business Requirements, Intro to IS는 면제로 이미 인정된 과목이다.',
    voyageTitle: '항해도',
    voyageIntro:
      '프로젝트 다섯 개를 한 지도에 올렸다. 점선은 오래된 것부터 최신 순서. 항로를 따라가면 GHCR까지 간 IoTBay CI/CD 줄도 보인다.',
    voyageCICDLabel: 'IoTBay 배포 항로',
    voyageCICDNote: 'push → GitHub Actions → E2E 118 → Docker 이미지 → GHCR',
    voyageIslandHint: '섬을 누르면 케이스 스터디가 열린다',
    lighthouseStatus: 'status: online',
    lighthouseUptime: '일단 여기까지 · 시스템 정상',
    backToTop: '맨 위로',
    heroEyebrow: 'voyage log · UTS BIT complete',
    heroCtaPrimary: '항해 시작 →',
    heroCtaSecondary: '이력서 다운로드',
    heroSrStory:
      '학위를 층으로 나눈 악소노메트릭이다. Foundations는 면제, Systems는 Cloud와 Architecture, Algorithms·Graphics는 서브메이저, Production은 Soft Dev Studio. UTS 정보기술 학사 이수. GPA 6.00/7.0, WAM 80.31/100, 144 CP(UTS 학점).',
    axonoL0: 'L0 · Foundations',
    axonoL0Sub: '면제 — Prog, DB, Networks',
    axonoL1: 'L1 · Systems',
    axonoL1Sub: 'Cloud/SaaS 86 HD · Architecture · Intro Game Dev',
    axonoL2: 'L2 · Algorithms & Graphics',
    axonoL2Sub: 'DSA 92 HD · CG · Interactive Media',
    axonoL3: 'L3 · Production',
    axonoL3Sub: 'Studio 95 HD · CI/CD · Data Eng',
    axonoRoof: '이수 완료 · GPA 6.00/7.0 · WAM 80.31',
    timelineFoundations:
      'Programming, DB, Networks, Web Systems는 면제로 이미 채워져 있었다. 1주차가 아니라 중간에서 시작한 셈이다.',
    semesterSpr24Title: 'Cloud & Architecture',
    semesterSpr24Body:
      'Cloud Computing and SaaS 86점 HD(A+ 상당), Software Architecture 80점 D(A 상당). Intro to Computer Game Development로 게임 트랙도 이때 열었다. 과제 단위가 아니라 서비스 단위로 생각하기 시작한 학기다.',
    semesterAut25Title: 'Algorithms & Graphics',
    semesterAut25Body:
      'Data Structures 92점 HD(A+ 상당), Intro Soft Dev 90점 HD, Computer Graphics 81점 D(A 상당). Game Design Methodologies는 64점 P(합격) — The Five Floors를 4인 팀이 itch.io에 올렸다.',
    semesterSpr25Title: 'Enterprise 학기',
    semesterSpr25Body:
      'Adv Soft Dev 87점 HD(A+ 상당)의 결과물이 le-restaurant이다. 5인 팀, Spring Boot + React, Azure 배포. Interaction Design, Interactive Media, Project Management가 같은 학기에 있었다.',
    semesterAut26Title: '캡스톤 학기',
    semesterAut26Body:
      'Soft Dev Studio는 95점 HD(A+ 상당)로 끝났고, 산업 파트너 StevTech와 함께했다. Data Engineering과 TD가 옆에 있었고, Deep Learning은 68점 C(B 상당) — 수업 성적은 그대로이고, 이어진 이야기는 Crowd Detection 케이스에 있다.',
    fullRecordNote: '전체 기록: 144 CP(UTS 학점) · GPA 6.00/7.0 · WAM 80.31/100 · 2026 이수 완료',
  },
  ja: {
    navProjects: 'プロジェクト',
    navExperience: 'タイムライン',
    navSkills: 'スキル',
    navVoyage: '航海図',
    navAbout: '紹介',
    navContact: '連絡',
    navDownload: '履歴書をダウンロード',
    navOnline: 'Online',
    sectionProjects: 'ケーススタディ',
    sectionExperience: 'タイムライン',
    sectionSkills: '武器庫',
    sectionAbout: '紹介',
    courseTop: '出港地 — Hero',
    priorService: '以前の服務',
    armyName: '大韓民国陸軍',
    armyRole: '通訳兵。英語リエゾン業務。',
    majorLine: '専攻: Enterprise Software Development · 副専攻: Computer Graphics and Animation',
    exemptionsNote:
      'Programming 1–2、Databases、Networks、Web Systems、Business Requirements、Intro to ISは免除として認定済みです。',
    voyageTitle: '航海図',
    voyageIntro:
      'プロジェクトを島として一枚に並べました。破線は古いものから新しい順です。航路をたどると、GHCRまで届いたIoTBayのCI/CDラインも見えます。',
    voyageCICDLabel: 'IoTBay デプロイ航路',
    voyageCICDNote: 'push → GitHub Actions → E2E 118 → Docker image → GHCR',
    voyageIslandHint: '島をクリックするとケーススタディが開きます',
    lighthouseStatus: 'status: online',
    lighthouseUptime: 'ひとまずここまで · システム正常',
    backToTop: '一番上へ',
    heroEyebrow: 'voyage log · UTS BIT complete',
    heroCtaPrimary: '航海を始める →',
    heroCtaSecondary: '履歴書をダウンロード',
    heroSrStory:
      '学位を層に分けたアクソノメトリックです。Foundationsは免除、SystemsはCloudとArchitecture、AlgorithmsとGraphicsは副専攻、ProductionはSoft Dev Studio。UTS情報技術学士修了。GPA 6.00/7.0、WAM 80.31/100、144 CP（UTS単位）。',
    axonoL0: 'L0 · Foundations',
    axonoL0Sub: '免除 — Prog, DB, Networks',
    axonoL1: 'L1 · Systems',
    axonoL1Sub: 'Cloud/SaaS 86 HD · Architecture · Intro Game Dev',
    axonoL2: 'L2 · Algorithms & Graphics',
    axonoL2Sub: 'DSA 92 HD · CG · Interactive Media',
    axonoL3: 'L3 · Production',
    axonoL3Sub: 'Studio 95 HD · CI/CD · Data Eng',
    axonoRoof: '修了 · GPA 6.00/7.0 · WAM 80.31',
    timelineFoundations:
      'Programming、DB、Networks、Web Systemsなどは免除で埋まっていました。最初の週からではなく、途中から始めました。',
    semesterSpr24Title: 'Cloud & Architecture',
    semesterSpr24Body:
      'Cloud Computing and SaaSは86点 HD（秀相当）、Software Architectureは80点 D（優相当）。Intro to Computer Game Developmentでゲームのトラックもここから始まりました。課題単位ではなく、サービス単位で考えるようになった学期です。',
    semesterAut25Title: 'Algorithms & Graphics',
    semesterAut25Body:
      'Data Structures 92点 HD（秀相当）、Intro Soft Dev 90点 HD、Computer Graphics 81点 D（優相当）。Game Design Methodologiesは64点 P（可相当）で、4人チームの The Five Floors を itch.io に公開しました。',
    semesterSpr25Title: 'Enterprise 学期',
    semesterSpr25Body:
      'Adv Soft Dev 87点 HD（秀相当）の成果物が le-restaurant です。5人チーム、Spring Boot + React、Azureデプロイ。Interaction Design、Interactive Media、Project Managementが同じ学期にありました。',
    semesterAut26Title: 'キャップストーン学期',
    semesterAut26Body:
      'Soft Dev Studioは95点 HD（秀相当）で終わり、産業パートナーのStevTechと進めました。Data EngineeringとTDが隣にあり、Deep Learningは68点 C（良相当）。授業の成績はそのままで、本番への続きはCrowd Detectionのケースにあります。',
    fullRecordNote: '全記録: 144 CP（UTS単位） · GPA 6.00/7.0 · WAM 80.31/100 · 2026 修了',
  },
} as const;

export const STRINGS: Record<Lang, Strings> = {
  en: {
    tagline: 'Enterprise software developer. Deep learning classwork on one side; production infra on the other.',
    subTagline: 'Cares about correctness. Ships anyway.',
    skillsIntro: 'Each line ties to a project I shipped or a subject on the transcript.',
    skillA: 'Backend work with layered architecture, tests, and CI/CD. The dull parts that keep systems honest.',
    skillB: 'CNN theory through to fine-tuned models serving live inference.',
    skillC: 'Containerize it, deploy it, and version the data it learned from.',
    skillD: 'Real-time 3D and shaders I wrote myself, running in the browser.',
    skillE: 'React UIs wired to real backends, not mockups.',
    crowdSummary:
      'Real-time crowd and proximity alerts for travellers with limited mobility. YOLOv8 fine-tuned on JRDB, served through React → Spring Boot → FastAPI.',
    iotbaySummary: 'IoT e-commerce hardened against CSRF, SQLi, and XSS. 118 E2E tests, CI/CD out to Docker/GHCR.',
    farmSummary: 'A browser 3D farm sim with seasons, weather, and a custom GLSL aurora.',
    gundamSummary: 'Full-stack CRUD board with Google OAuth and JWT. Next.js on serverless AWS Chalice plus PostgreSQL.',
    githubTile: 'Coursework, side projects, and curiosity posts (350+ essays).',
    ephemeralSummary:
      'Generative art treated as a small product. Time behaves like a fluid; attention changes the flow. p5.js only, no media files.',
    growthIntro:
      'Army interpreting first, then enterprise software, then deep learning at UTS. Each semester got heavier until Software Development Studio and Complete.',
    aboutStory:
      'I draft software the way I draft a proof. Lock the invariants, cut the ambiguity, then see what idea still stands. Computational design keeps pulling me back: clear rules leave room for odd ideas.',
    aboutHobbies:
      'Away from the keyboard I write (350+ posts so far), lift, meet people, and collect languages: Korean, English, Japanese, German.',
    growthUts:
      'I went from following briefs to running them. Last stop: Software Development Studio at 95 HD, ML lead on a team capstone with 97% of the commits.',
    growthArmy:
      'The habit comes from interpreting under pressure. Wrong words cost too much. I hold code to the same bar.',
    contactTitle: 'Get in touch',
    contactSub: 'Looking at graduate roles that sit between deep learning and production infrastructure.',
    ...SHARED.en,
  },
  ko: {
    tagline: '엔터프라이즈 소프트웨어 개발자. 한쪽은 딥러닝 수업, 다른 쪽은 프로덕션 인프라.',
    subTagline: '정확함을 중요하게 본다. 그래도 배포는 한다.',
    skillsIntro: '아래 항목은 내가 만든 프로젝트나 성적표와 연결돼 있다.',
    skillA: '레이어드 아키텍처, 테스트, CI/CD. 시스템이 거짓말하지 못하게 붙잡아 두는 백엔드 작업.',
    skillB: 'CNN 이론에서 시작해, 파인튜닝한 모델이 실제 추론을 서빙하기까지.',
    skillC: '컨테이너에 담고, 배포하고, 학습에 쓴 데이터까지 버전으로 관리한다.',
    skillD: '브라우저에서 돌아가는 실시간 3D, 그리고 내가 직접 쓴 셰이더.',
    skillE: '목업이 아니라 실제 백엔드에 붙은 React UI.',
    crowdSummary:
      '이동이 불편한 여행자를 위한 실시간 혼잡·근접 경보. JRDB로 파인튜닝한 YOLOv8을 React → Spring Boot → FastAPI로 서빙한다.',
    iotbaySummary: 'CSRF·SQLi·XSS를 막아 둔 IoT 이커머스. E2E 테스트 118개, Docker/GHCR로 CI/CD.',
    farmSummary: '브라우저 3D 농장 시뮬레이터. 계절과 날씨, 직접 쓴 GLSL 오로라.',
    gundamSummary: 'Google OAuth와 JWT가 붙은 풀스택 CRUD 게시판. Next.js, 서버리스 AWS Chalice, PostgreSQL.',
    githubTile: '과제, 사이드 프로젝트, 350편이 넘는 글에서 나온 호기심.',
    ephemeralSummary:
      '작은 프로덕트처럼 짠 제너러티브 아트. 시간은 유체처럼 움직이고, 주의가 흐름을 바꾼다. p5.js만 썼고 미디어 에셋은 없다.',
    growthIntro:
      '육군 통역에서 시작해 엔터프라이즈 소프트웨어, 그다음 UTS에서 딥러닝. 학기마다 무게가 늘다가 Soft Dev Studio와 Complete로 끝났다.',
    aboutStory:
      '소프트웨어는 증명 초안처럼 다룬다. 불변항을 먼저 잡고 모호함을 걷어낸 다음, 그 안에서 남는 생각을 본다. 컴퓨테이셔널 디자인에 끌리는 이유도 비슷하다 — 규칙이 단단할수록 이상한 아이디어가 설 자리가 생긴다.',
    aboutHobbies:
      '키보드 밖에서는 글을 쓰고(350편 넘음), 운동하고, 사람을 만나고, 언어를 배운다. 한국어, 영어, 일본어, 독일어.',
    growthUts:
      '브리프를 따라가던 쪽에서 브리프를 이끄는 쪽으로 옮겼다. 마지막은 Soft Dev Studio 95 HD — 팀 캡스톤 ML을 커밋 97%로 맡았다.',
    growthArmy:
      '습관은 압박 속 통역에서 왔다. 단어 하나 틀리면 값이 컸다. 그 기준을 코드에도 적용한다.',
    contactTitle: '연락 주세요',
    contactSub: '딥러닝과 프로덕션 인프라 사이에 있는 신입 포지션을 보고 있다.',
    ...SHARED.ko,
  },
  ja: {
    tagline: 'エンタープライズ・ソフトウェア開発者。片側に深層学習の授業、もう片側にプロダクションインフラ。',
    subTagline: '正確さを気にする。それでも出荷はする。',
    skillsIntro: '下の項目は、自分で作ったプロジェクトか成績表につながっています。',
    skillA: 'レイヤードアーキテクチャ、テスト、CI/CD。システムが嘘をつかないようにする、地味なバックエンド作業。',
    skillB: 'CNNの理論から、ファインチューニングしたモデルがライブ推論を出すところまで。',
    skillC: 'コンテナ化して、デプロイして、学習データまでバージョン管理します。',
    skillD: 'ブラウザで動くリアルタイム3Dと、自分で書いたシェーダー。',
    skillE: 'モックではなく、実際のバックエンドにつながったReact UI。',
    crowdSummary:
      '移動が不自由な旅行者向けのリアルタイム混雑・近接アラート。JRDBでファインチューニングしたYOLOv8を React → Spring Boot → FastAPI で提供します。',
    iotbaySummary: 'CSRF・SQLi・XSS対策済みのIoT eコマース。E2Eテスト118件、Docker/GHCRへCI/CD。',
    farmSummary: 'ブラウザ3D農場シム。季節と天気、自作のGLSLオーロラ。',
    gundamSummary: 'Google OAuthとJWT付きのフルスタックCRUD掲示板。Next.js、サーバーレスAWS Chalice、PostgreSQL。',
    githubTile: '課題、サイドプロジェクト、350本超の文章からこぼれた好奇心。',
    ephemeralSummary:
      '小さなプロダクトとして組んだジェネラティブアート。時間は流体のように動き、注意が流れを変えます。p5.jsのみ、メディアアセットなし。',
    growthIntro:
      '陸軍通訳からエンタープライズソフトウェアへ、さらにUTSで深層学習。学期ごとに負荷が増え、Soft Dev StudioとCompleteで終わりました。',
    aboutStory:
      'ソフトウェアは証明の下書きのように扱います。まず不変条件を決め、曖昧さを削ぎ、その枠の中で残る発想を見ます。コンピュテーショナルデザインに惹かれるのも同じ理由です。ルールが硬いほど、変なアイデアの着地点ができます。',
    aboutHobbies:
      'キーボードの外では文章を書き（350本以上）、体を鍛え、人と会い、言語を学んでいます。韓国語、英語、日本語、ドイツ語。',
    growthUts:
      'ブリーフに従う側から、ブリーフを導く側へ移りました。最後は Soft Dev Studio 95 HD。チームキャップストーンのMLをコミット97%で担当。',
    growthArmy:
      '習慣の源は、プレッシャー下の通訳です。一語の誤りが高い場でした。その基準を今はコードに当てています。',
    contactTitle: '連絡ください',
    contactSub: '深層学習とプロダクションインフラのあいだにある新卒ポジションを見ています。',
    ...SHARED.ja,
  },
};
