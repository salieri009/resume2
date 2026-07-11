import type { Lang, Strings } from './types';

export const STRINGS: Record<Lang, Strings> = {
  en: {
    tagline: 'Enterprise Software Developer — deep learning theory × production infra.',
    subTagline: 'Restrained Passion / Intellectual Perfectionism',
    skillsIntro:
      'Every capability below is backed by a shipped project or a graded result — claims a recruiter can verify in two clicks.',
    skillA: 'Backend engineering with production discipline — layered architecture, testing, CI/CD.',
    skillB: 'From CNN theory to fine-tuned models serving live inference.',
    skillC: 'Containerize it, deploy it, version the data it learned from.',
    skillD: 'Real-time 3D and hand-written shaders, running in the browser.',
    skillE: 'React interfaces wired to real backends — not mockups.',
    crowdSummary:
      'Real-time crowd & proximity alerts for mobility-impaired travellers — YOLOv8 fine-tuned on JRDB, served through a React → Spring Boot → FastAPI pipeline.',
    iotbaySummary: 'IoT e-commerce hardened against CSRF/SQLi/XSS — 118 E2E tests, CI/CD to Docker/GHCR.',
    farmSummary: 'Browser 3D farm sim — real-time seasons, weather, and a custom GLSL aurora shader.',
    gundamSummary: 'Full-stack CRUD board — Google OAuth, JWT, Next.js on serverless AWS Chalice + PostgreSQL.',
    githubTile: "Coursework, toy projects, and 350+ essays' worth of curiosity in code form.",
    ephemeralSummary:
      'Generative art engineered like a product — time as a fluid, shaped by your attention. p5.js, zero assets.',
    growthIntro:
      "The arc: an Army interpreter's discipline, applied to enterprise software, aimed at deep learning. Each stage kept the habit and raised the stakes.",
    aboutStory:
      'I treat software like proof-writing: state the invariants, eliminate ambiguity, then let the interesting part — the chaos of a genuinely new idea — happen inside a structure that can hold it. That is also why computational design keeps pulling me back: when the rules are strict enough, surprise becomes possible. Mathematical rigor gives creative chaos somewhere safe to land.',
    aboutHobbies:
      'Off the keyboard: I write (350+ posts and counting), lift, meet people, and collect languages — Korean, English, Japanese, and German so far.',
    growthUts:
      "Grew from following briefs to leading them — by final year, running the ML side of a team capstone at 97% of commits.",
    growthArmy:
      'Where the discipline comes from: translating under pressure, where a wrong word is not an option. The same standard now applies to code.',
    contactTitle: 'Ready to initiate?',
    contactSub: 'Open to graduate roles bridging deep learning and production infrastructure.',
  },
  ko: {
    tagline: '엔터프라이즈 소프트웨어 개발자 — 딥러닝 이론 × 프로덕션 인프라.',
    subTagline: '절제된 열정 / 지적 완벽주의',
    skillsIntro: '아래 역량은 전부 직접 만든 프로젝트나 성적표로 증명됩니다. 채용 담당자가 두 번만 클릭하면 확인할 수 있게 해뒀어요.',
    skillA: '레이어드 아키텍처, 테스트, CI/CD까지 — 프로덕션의 규율을 지키는 백엔드 엔지니어링.',
    skillB: 'CNN 이론에서 시작해, 파인튜닝한 모델이 실제 추론을 서빙까지',
    skillC: '컨테이너에 담고, 배포하고, \n학습에 쓴 데이터까지 버전으로 관리',
    skillD: '브라우저에서 돌아가는 \n실시간 3D와 직접 쓴 셰이더.',
    skillE: '목업이 아니라, \n진짜 백엔드에 연결된 \nReact 인터페이스.',
    crowdSummary:
      '이동이 불편한 여행자를 위한 실시간 혼잡·근접 경보 — JRDB로 파인튜닝한 YOLOv8을 React → Spring Boot → FastAPI 파이프라인으로 서빙합니다.',
    iotbaySummary: 'CSRF/SQLi/XSS를 막아낸 IoT 이커머스 — E2E 테스트 118개, Docker/GHCR로 CI/CD.',
    farmSummary: '브라우저 3D 농장 시뮬레이터 — 실시간 계절과 날씨, 직접 쓴 GLSL 오로라 셰이더.',
    gundamSummary: '풀스택 CRUD 게시판 — Google OAuth, JWT, 서버리스 AWS Chalice + PostgreSQL 위의 Next.js.',
    githubTile: '과제, 토이 프로젝트, 그리고 350편 넘는 글에서 나온 호기심이 코드로 쌓여 있습니다.',
    ephemeralSummary:
      '프로덕트처럼 설계한 제너러티브 아트 — 시간은 유체가 되고, 당신의 주의(注意)가 그 흐름을 바꿉니다. p5.js, 에셋 제로.',
    growthIntro: '성장의 궤적: 육군 통역병의 규율을 엔터프라이즈 소프트웨어에 적용하고, 딥러닝으로 조준했습니다. 단계마다 습관은 유지하고 판돈만 키웠습니다.',
    aboutStory:
      '저는 소프트웨어를 증명 쓰듯 다룹니다. 불변항을 먼저 정하고 모호함을 걷어낸 다음, 그 단단한 구조 안에서 진짜 새로운 생각이 마음껏 흐트러지게 둡니다. 컴퓨테이셔널 디자인에 자꾸 끌리는 것도 그래서예요 — 규칙이 엄격할수록 놀라움이 가능해지니까요. 수학적 엄밀함은 창조적 혼돈이 안전하게 착지할 자리를 마련해줍니다.',
    aboutHobbies: '키보드 밖에서는 글을 쓰고(어느새 350편이 넘었습니다), 운동하고, 사람을 만나고, 언어를 배웁니다 — 한국어, 영어, 일본어, 그리고 독일어까지.',
    growthUts: '브리프를 따라가던 학생에서 브리프를 이끄는 사람으로 — 마지막 해에는 팀 캡스톤의 ML 파트를 커밋 97%로 이끌었습니다.',
    growthArmy: '규율의 출처: 단어 하나 틀리면 안 되는 압박 속의 통역. 그 기준을 지금은 코드에 적용합니다.',
    contactTitle: '시작해볼까요?',
    contactSub: '딥러닝과 프로덕션 인프라를 잇는 신입 포지션을 찾고 있습니다.',
  },
  ja: {
    tagline: 'エンタープライズ・ソフトウェア開発者 — 深層学習の理論 × プロダクションインフラ。',
    subTagline: '抑制された情熱 / 知的完璧主義',
    skillsIntro: '以下のスキルはすべて、実際に作ったプロジェクトか成績で裏付けられています。2クリックで確認できます。',
    skillA: 'レイヤードアーキテクチャ、テスト、CI/CD — 本番の規律を守るバックエンド開発。',
    skillB: 'CNNの理論から、ファインチューニング済みモデルのライブ推論まで。',
    skillC: 'コンテナ化して、デプロイして、学習データまでバージョン管理。',
    skillD: 'ブラウザで動くリアルタイム3Dと、手書きのシェーダー。',
    skillE: 'モックではなく、実際のバックエンドにつながったReact UI。',
    crowdSummary:
      '移動が不自由な旅行者のためのリアルタイム混雑・近接アラート — JRDBでファインチューニングしたYOLOv8を React → Spring Boot → FastAPI で提供。',
    iotbaySummary: 'CSRF/SQLi/XSS対策済みのIoT eコマース — E2Eテスト118件、Docker/GHCRへCI/CD。',
    farmSummary: 'ブラウザ3D農場シム — リアルタイムの季節と天気、自作GLSLオーロラシェーダー。',
    gundamSummary: 'フルスタックCRUD掲示板 — Google OAuth、JWT、サーバーレスAWS Chalice + PostgreSQL上のNext.js。',
    githubTile: '課題、トイプロジェクト、350本超のエッセイから生まれた好奇心がコードになっています。',
    ephemeralSummary:
      'プロダクトのように設計したジェネラティブアート — 時間は流体になり、あなたの注意がその流れを変えます。p5.js、アセットゼロ。',
    growthIntro: '成長の軌跡：陸軍通訳の規律をエンタープライズソフトウェアに適用し、深層学習へ照準。各段階で習慣は保ち、賭け金だけ上げてきました。',
    aboutStory:
      'ソフトウェアは証明を書くように扱います。まず不変条件を決め、曖昧さを取り除き、その堅い構造の中で本当に新しい発想を自由に暴れさせる。コンピュテーショナルデザインに惹かれ続けるのもそのためです — ルールが厳密であるほど、驚きが可能になるから。数学的厳密さは、創造的な混沌が安全に着地する場所をつくります。',
    aboutHobbies: 'キーボードの外では、文章を書き（気づけば350本以上）、体を鍛え、人に会い、言語を学んでいます — 韓国語、英語、日本語、そしてドイツ語。',
    growthUts: 'ブリーフに従う側から導く側へ — 最終学年ではチームキャップストーンのML側をコミット97%で牽引。',
    growthArmy: '規律の源：一語の誤りも許されない通訳の現場。その基準を今はコードに適用しています。',
    contactTitle: 'はじめましょうか？',
    contactSub: '深層学習とプロダクションインフラをつなぐ新卒ポジションを探しています。',
  },
};
