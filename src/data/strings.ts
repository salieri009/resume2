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
    armyRole: 'Interpreter / Translator — English liaison duties.',
    majorLine: 'Major: Enterprise Software Development · Sub-major: Computer Graphics and Animation',
    exemptionsNote:
      'Exemptions already covered Programming 1–2, Databases, Networks, Web Systems, Business Requirements, and Intro to IS.',
    voyageTitle: 'Voyage Chart',
    voyageIntro:
      'Five projects as islands on one chart — oldest to newest along the dashed route. Trace the voyage, then the IoTBay CI/CD line that actually went to GHCR.',
    voyageCICDLabel: 'IoTBay deployment route',
    voyageCICDNote: 'push → GitHub Actions → 118 E2E tests → Docker image → GHCR',
    voyageIslandHint: 'Click an island for the case study',
    lighthouseStatus: 'status: operational',
    lighthouseUptime: 'done for now · systems look fine',
    backToTop: 'Back to top',
    heroEyebrow: 'voyage log · UTS BIT complete',
    heroCtaPrimary: 'Start Voyage →',
    heroCtaSecondary: 'Download Résumé',
    heroSrStory:
      'An exploded axonometric of the degree: Foundations from exemptions, Systems through Cloud and Architecture, Algorithms and Graphics as the sub-major, Production through Software Development Studio. UTS Bachelor of Information Technology complete — GPA 6.00 out of 7.0, WAM 80.31, 144 credit points.',
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
      'Exemptions covered Programming, Databases, Networks, Web Systems, and more. That meant I could start mid-stream instead of from scratch.',
    semesterSpr24Title: 'Cloud & Architecture',
    semesterSpr24Body:
      'Cloud Computing and SaaS came in at 86 HD, Software Architecture at 80 D. Intro to Computer Game Development started the games track on the side. That semester taught me to think in services, not just assignments.',
    semesterAut25Title: 'Algorithms & Graphics',
    semesterAut25Body:
      'Data Structures hit 92 HD. Intro to Software Development 90 HD. Computer Graphics 81 D. Game Design Methodologies shipped The Five Floors at 64 P — a Unity WebGL psychological puzzle built with a team of four, live on itch.io.',
    semesterSpr25Title: 'Enterprise craft',
    semesterSpr25Body:
      'Advanced Software Development at 87 HD came with a real artifact: le-restaurant, a five-person Spring Boot + React restaurant platform deployed to Azure. Interaction Design, Interactive Media, and Project Management sat around it.',
    semesterAut26Title: 'Capstone harbour',
    semesterAut26Body:
      'Software Development Studio closed at 95 HD, run with industry partner StevTech. Data Engineering and TD sat beside it. Deep Learning landed at 68 C — the coursework grade — and the production follow-through is the Crowd Detection case study.',
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
    armyRole: '통역병 — 영어 연락 업무 담당.',
    majorLine: '전공: Enterprise Software Development · 서브메이저: Computer Graphics and Animation',
    exemptionsNote:
      'Programming 1–2, Databases, Networks, Web Systems, Business Requirements, Intro to IS는 면제로 이미 인정된 과목입니다.',
    voyageTitle: '항해도',
    voyageIntro:
      '프로젝트 다섯 개를 섬처럼 한 지도에 올려 뒀어요. 점선 항로는 오래된 것부터 최신 순서입니다. 섬을 따라가다 보면, 실제로 GHCR까지 간 IoTBay CI/CD 항로도 보입니다.',
    voyageCICDLabel: 'IoTBay 배포 항로',
    voyageCICDNote: 'push → GitHub Actions → E2E 118 → Docker 이미지 → GHCR',
    voyageIslandHint: '섬을 누르면 케이스 스터디가 열려요',
    lighthouseStatus: 'status: operational',
    lighthouseUptime: '일단 여기까지 · 시스템 정상',
    backToTop: '맨 위로',
    heroEyebrow: 'voyage log · UTS BIT complete',
    heroCtaPrimary: '항해 시작 →',
    heroCtaSecondary: '이력서 다운로드',
    heroSrStory:
      '학위를 층으로 분해한 악소노메트릭입니다. Foundations는 면제, Systems는 Cloud와 Architecture, Algorithms·Graphics는 서브메이저, Production은 Soft Dev Studio. UTS 정보기술 학사 이수 완료 — GPA 6.00/7.0 만점, WAM 80.31/100, 144 CP(UTS 학점).',
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
      'Programming, DB, Networks, Web Systems 같은 과목은 면제로 이미 채워져 있었어요. 그래서 처음부터가 아니라 중간 지점에서 시작할 수 있었습니다.',
    semesterSpr24Title: 'Cloud & Architecture',
    semesterSpr24Body:
      'Cloud Computing and SaaS는 86점 HD(A+ 상당), Software Architecture는 80점 D(A 상당)였습니다. Intro to Computer Game Development로 게임 트랙도 이때 시작했어요. 과제가 아니라 서비스 단위로 생각하는 버릇이 생긴 학기입니다.',
    semesterAut25Title: 'Algorithms & Graphics',
    semesterAut25Body:
      'Data Structures 92점 HD(A+ 상당), Intro Soft Dev 90점 HD, Computer Graphics 81점 D(A 상당). Game Design Methodologies에서는 64점 P(합격)로 The Five Floors를 4인 팀이 itch.io에 공개했습니다.',
    semesterSpr25Title: 'Enterprise craft',
    semesterSpr25Body:
      'Adv Soft Dev 87점 HD(A+ 상당)에는 실물이 붙어 있습니다 — 5인 팀이 Spring Boot + React로 만들어 Azure에 배포한 le-restaurant. Interaction Design, Interactive Media, Project Management가 그 옆에 있었어요.',
    semesterAut26Title: 'Capstone harbour',
    semesterAut26Body:
      'Soft Dev Studio는 95점 HD(A+ 상당)로 끝났고, 산업 파트너 StevTech와 함께 진행했습니다. Data Engineering과 TD가 옆에 있었고, Deep Learning은 68점 C(B 상당) — 수업 성적 그대로이고, 프로덕션으로 이어진 이야기는 Crowd Detection 케이스에 있습니다.',
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
    armyRole: '通訳兵 — 英語リエゾン業務担当。',
    majorLine: '専攻: Enterprise Software Development · 副専攻: Computer Graphics and Animation',
    exemptionsNote:
      'Programming 1–2、Databases、Networks、Web Systems、Business Requirements、Intro to ISは免除として認定済みです。',
    voyageTitle: '航海図',
    voyageIntro:
      'プロジェクトを島として一枚の図に並べました。破線の航路は古いものから新しいものへの順序です。島をたどった先に、実際にGHCRまで届いたIoTBayのCI/CD航路があります。',
    voyageCICDLabel: 'IoTBay デプロイ航路',
    voyageCICDNote: 'push → GitHub Actions → E2E 118 → Docker image → GHCR',
    voyageIslandHint: '島をクリックするとケーススタディが開きます',
    lighthouseStatus: 'status: operational',
    lighthouseUptime: 'ひとまずここまで · システム正常',
    backToTop: '一番上へ',
    heroEyebrow: 'voyage log · UTS BIT complete',
    heroCtaPrimary: '航海を始める →',
    heroCtaSecondary: '履歴書をダウンロード',
    heroSrStory:
      '学位を層に分解したアクソノメトリックです。Foundationsは免除、SystemsはCloudとArchitecture、AlgorithmsとGraphicsは副専攻、ProductionはSoft Dev Studio。UTS情報技術学士修了 — GPA 6.00/7.0満点、WAM 80.31/100、144 CP（UTS単位）。',
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
      'Programming、DB、Networks、Web Systemsなどは免除で埋まっていました。最初からではなく、途中から始められた理由です。',
    semesterSpr24Title: 'Cloud & Architecture',
    semesterSpr24Body:
      'Cloud Computing and SaaSは86点 HD（秀相当）、Software Architectureは80点 D（優相当）。Intro to Computer Game Developmentでゲームのトラックもここから始まりました。課題ではなくサービス単位で考える癖がついた学期です。',
    semesterAut25Title: 'Algorithms & Graphics',
    semesterAut25Body:
      'Data Structures 92点 HD（秀相当）、Intro Soft Dev 90点 HD、Computer Graphics 81点 D（優相当）。Game Design Methodologiesは64点 P（可相当）で、4人チームの The Five Floors を itch.io に公開しました。',
    semesterSpr25Title: 'Enterprise craft',
    semesterSpr25Body:
      'Adv Soft Dev 87点 HD（秀相当）には実物が付いています — 5人チームでSpring Boot + Reactで作り、Azureにデプロイした le-restaurant。Interaction Design、Interactive Media、Project Managementがその隣にありました。',
    semesterAut26Title: 'Capstone harbour',
    semesterAut26Body:
      'Soft Dev Studioは95点 HD（秀相当）で終わり、産業パートナーのStevTechと進めました。Data EngineeringとTDが隣にあり、Deep Learningは68点 C（良相当）— 授業の成績そのもので、本番への続きはCrowd Detectionのケースにあります。',
    fullRecordNote: '全記録: 144 CP（UTS単位） · GPA 6.00/7.0 · WAM 80.31/100 · 2026 修了',
  },
} as const;

export const STRINGS: Record<Lang, Strings> = {
  en: {
    tagline: 'Enterprise software developer. Deep learning on one side, production infra on the other.',
    subTagline: 'Restrained passion · intellectual perfectionism',
    skillsIntro:
      'Each line below ties to a shipped project or a graded subject. You can check either in a couple of clicks.',
    skillA: 'Backend work with layered architecture, tests, and CI/CD — the boring parts that keep systems honest.',
    skillB: 'CNN theory through to fine-tuned models that serve live inference.',
    skillC: 'Containerize it, deploy it, and version the data it learned from.',
    skillD: 'Real-time 3D and shaders I wrote myself, running in the browser.',
    skillE: 'React UIs wired to real backends — not mockups.',
    crowdSummary:
      'Real-time crowd and proximity alerts for travellers with limited mobility. YOLOv8 fine-tuned on JRDB, served through React → Spring Boot → FastAPI.',
    iotbaySummary: 'IoT e-commerce hardened against CSRF, SQLi, and XSS — 118 E2E tests, CI/CD out to Docker/GHCR.',
    farmSummary: 'A browser 3D farm sim with seasons, weather, and a custom GLSL aurora.',
    gundamSummary: 'Full-stack CRUD board with Google OAuth and JWT. Next.js on serverless AWS Chalice plus PostgreSQL.',
    githubTile: 'Coursework, side projects, and whatever curiosity spilled out of 350+ essays.',
    ephemeralSummary:
      'Generative art treated like a product. Time as a fluid that responds to attention. p5.js, no media assets.',
    growthIntro:
      "Army interpreter discipline, then enterprise software, then deep learning. At UTS the load climbed each semester — Cloud, Algorithms, Craft, Capstone — and then Complete.",
    aboutStory:
      "I write software the way I write a proof. Nail the invariants, strip the ambiguity, then let the new idea thrash around inside a frame that can hold it. Computational design keeps pulling me back for the same reason: when the rules are tight enough, surprise has somewhere to land.",
    aboutHobbies:
      'Away from the keyboard I write (350+ posts so far), lift, meet people, and collect languages — Korean, English, Japanese, German.',
    growthUts:
      'I went from following briefs to running them. Last stop: Software Development Studio at 95 HD, ML lead on a team capstone with 97% of the commits.',
    growthArmy:
      'The habit comes from interpreting under pressure. One wrong word was not an option. I hold code to the same bar.',
    contactTitle: 'Want to talk?',
    contactSub: 'Looking for graduate roles that sit between deep learning and production infrastructure.',
    ...SHARED.en,
  },
  ko: {
    tagline: '엔터프라이즈 소프트웨어 개발자. 한쪽엔 딥러닝, 다른 쪽엔 프로덕션 인프라.',
    subTagline: '절제된 열정 · 지적 완벽주의',
    skillsIntro: '아래 항목은 전부 제가 만든 프로젝트나 성적표로 뒷받침됩니다. 두 번만 누르면 확인할 수 있게 해 뒀어요.',
    skillA: '레이어드 아키텍처, 테스트, CI/CD — 시스템을 정직하게 유지하는 쪽의 백엔드 작업.',
    skillB: 'CNN 이론에서 시작해, 파인튜닝한 모델이 실제 추론을 서빙하기까지.',
    skillC: '컨테이너에 담고, 배포하고, 학습에 쓴 데이터까지 버전으로 관리합니다.',
    skillD: '브라우저에서 돌아가는 실시간 3D, 그리고 제가 직접 쓴 셰이더.',
    skillE: '목업이 아니라 실제 백엔드에 붙은 React UI.',
    crowdSummary:
      '이동이 불편한 여행자를 위한 실시간 혼잡·근접 경보. JRDB로 파인튜닝한 YOLOv8을 React → Spring Boot → FastAPI로 서빙합니다.',
    iotbaySummary: 'CSRF·SQLi·XSS를 막아 둔 IoT 이커머스. E2E 테스트 118개, Docker/GHCR로 CI/CD.',
    farmSummary: '브라우저 3D 농장 시뮬레이터. 계절과 날씨, 직접 쓴 GLSL 오로라.',
    gundamSummary: 'Google OAuth와 JWT가 붙은 풀스택 CRUD 게시판. Next.js, 서버리스 AWS Chalice, PostgreSQL.',
    githubTile: '과제, 사이드 프로젝트, 그리고 350편이 넘는 글에서 흘러나온 호기심.',
    ephemeralSummary:
      '프로덕트처럼 다룬 제너러티브 아트. 시간은 유체고, 주의가 흐름을 바꿉니다. p5.js, 미디어 에셋 없음.',
    growthIntro:
      '육군 통역 규율에서 시작해 엔터프라이즈 소프트웨어로, 다시 딥러닝으로 옮겼습니다. UTS에서는 학기마다 무게가 늘었고 — Cloud, Algorithms, Craft, Capstone — 끝에 Complete가 왔습니다.',
    aboutStory:
      '소프트웨어는 증명 쓰듯 다룹니다. 불변항을 먼저 잡고 모호함을 걷어낸 다음, 새 생각이 그 구조 안에서 마음껏 움직이게 둡니다. 컴퓨테이셔널 디자인에 자꾸 끌리는 이유도 같아요. 규칙이 단단할수록 놀라움이 착지할 자리가 생깁니다.',
    aboutHobbies:
      '키보드 밖에서는 글을 쓰고(어느새 350편이 넘었습니다), 운동하고, 사람을 만나고, 언어를 배웁니다 — 한국어, 영어, 일본어, 독일어.',
    growthUts:
      '브리프를 따라가던 쪽에서, 브리프를 이끄는 쪽으로 옮겼습니다. 마지막은 Soft Dev Studio 95 HD, 팀 캡스톤 ML을 커밋 97%로.',
    growthArmy:
      '습관의 출처는 압박 속 통역입니다. 단어 하나 틀리면 안 되는 자리였어요. 그 기준을 지금은 코드에 적용합니다.',
    contactTitle: '이야기해 볼까요?',
    contactSub: '딥러닝과 프로덕션 인프라 사이에 있는 신입 포지션을 찾고 있습니다.',
    ...SHARED.ko,
  },
  ja: {
    tagline: 'エンタープライズ・ソフトウェア開発者。片側に深層学習、もう片側にプロダクションインフラ。',
    subTagline: '抑制された情熱 · 知的完璧主義',
    skillsIntro: '下の項目はすべて、自分で作ったプロジェクトか成績で裏付けています。2クリックで確認できるようにしてあります。',
    skillA: 'レイヤードアーキテクチャ、テスト、CI/CD — システムを正直に保つ側のバックエンド作業。',
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
      'プロダクトとして扱ったジェネラティブアート。時間は流体で、注意が流れを変えます。p5.js、メディアアセットなし。',
    growthIntro:
      '陸軍通訳の規律からエンタープライズソフトウェアへ、さらに深層学習へ移りました。UTSでは学期ごとに負荷が増え — Cloud、Algorithms、Craft、Capstone — 最後にCompleteが来ました。',
    aboutStory:
      'ソフトウェアは証明を書くように扱います。まず不変条件を決め、曖昧さを削ぎ、その枠の中で新しい発想を動かします。コンピュテーショナルデザインに惹かれるのも同じ理由です。ルールが硬いほど、驚きの着地点ができます。',
    aboutHobbies:
      'キーボードの外では文章を書き（気づけば350本以上）、体を鍛え、人と会い、言語を学んでいます — 韓国語、英語、日本語、ドイツ語。',
    growthUts:
      'ブリーフに従う側から、ブリーフを導く側へ移りました。最後は Soft Dev Studio 95 HD、チームキャップストーンのMLをコミット97%で。',
    growthArmy:
      '習慣の源は、プレッシャー下の通訳です。一語の誤りが許されない場でした。その基準を今はコードに当てています。',
    contactTitle: '話しましょうか？',
    contactSub: '深層学習とプロダクションインフラのあいだにある新卒ポジションを探しています。',
    ...SHARED.ja,
  },
};
