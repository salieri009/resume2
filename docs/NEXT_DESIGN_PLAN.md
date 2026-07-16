# 다음 설계 계획 — 도면집 v2

> 작성: 2026-07-16. 도면집(drawing set) 1차 개편(토큰/히어로/CJK/시트 인덱스/모바일 axono/카드 도면/전환) 완료 직후.
> 전제: 1차 개편이 육안 확인·커밋된 상태에서 시작한다.

## ⚡ 실행 결과 (2026-07-16, `redesign/drawing-set` 브랜치)

v1 + N0·N1·N2·N4·N5 착지, 각각 독립 커밋. **N3(Flip 재평가)만 계획대로 육안 확인 후 판단 대기.**

| 단계 | 커밋 | 비고 |
|---|---|---|
| v1 전체 | `9bbb7aa` | 19파일 |
| N0 마감 | `8e73af5` | GitHub CTA 폴백 · ko/ja `navigator.language` 감지+지속(실측: ko 브라우저 첫 방문 한국어 확인) · explode → `--axgap` 단일 변수(setProperty 1회에 층·루프·pline·ArchFeatures 전부 갱신 실측, ArchFeatures는 prop 제거) |
| N1 크로스헤어 | `7792b09` | `DrawingCursor.tsx` — 밴드 히트테스트(투영 rect, 겹침 시 상부층=페인트 순서), 히어로+상세 배선, fine-pointer 게이트 실측. 라인 이동은 rAF라 육안 대상 |
| N2 단면도 노트 | `7d028e8` | `sectionNotes.ts` 문자 그대로 언급 매칭 — 5개 프로젝트 전부 1~4층 인터랙티브(KO 로케일에서 실측: JSP Views → DECISION+REJECTED 취소선 콜아웃 동작). focus() 미발화는 hidden 탭의 focus 이벤트 생략 — focusin 수동 발화로 React 경로 검증 |
| N4 패럴랙스 | `f7fbc31` | 그리드 0.12x drift, imperative(Hero memo 보존), 160px 블리드. 육안 대상 |
| N5 절반 | `f1177e9` | 시트 인덱스 순차 점등(CSS-only — 파싱 실패 시 그냥 보이는 안전한 실패 모드). 그리드 draw-in은 육안 없이 리스크라 보류 |

**육안 확인 필요(모션 전부):** v1 목록 + N1 크로스헤어 추적/리드아웃, N2 hover 감각, N4 drift 강도(0.12 조정 여지), N5 스태거 타이밍.

## ⚡ v4 실행 결과 (2026-07-16, 같은 브랜치)

이력서 2장(R-001/R-002) 기본 인쇄 + `?sheets` 부록은 `5899012`에서 착지. **디자인 폴리시 #1·#2도 같은 패스에서 마감:**

1. **Soft glow 제거 (Mormal #10)** — `--c-glow` 토큰·CTA/내비/타임라인/비콘/voyage `box-shadow`·`drop-shadow`·beacon sweep·status pulse 전부 삭제. 도면 슬래브 fill만 `--c-accent-wash`로 rename (잉크 워시, glow 어휘 퇴출). Hover는 `background: var(--c-accent-hover)` + 기존 `translateY` — Snellenberg(#8) 단일 전이 규칙과 맞춤.
2. **전이 토큰화** — `.sal-root`의 `0.3s ease`는 이미 `var(--dur-base) var(--ease-out)`였음. 잔여 glow hover의 `box-shadow` 전이를 `background`/`transform`으로 교체해 전이 어휘 통일 확인.
3. 밀도 검증(`?sheets=r` ≤990px)은 빌드 게이트 직후 실측.

**레퍼런스 캐논:** §0의 10사이트. 원문 원칙은 "사이트마다 딱 한 가지만 훔침" — 표면 형식(3D 월드 탐험·전체화면 커서·풀스크린 인트로·사진 WebGL)은 §2 기각 목록 유지.

## v4 계획 — 이력서 2장 규격 + 디자인 폴리시 (2026-07-16 승인, 실행 완료)

**문제:** v3의 인쇄물이 12장이다. 도면집으로는 옳지만 **이력서로는 틀렸다** — 서양 리크루팅 관례는 1~2장이고, 12장짜리 문서는 읽히지 않는다.

**해법 — 이력서와 도면집을 분리하되 한 시스템으로:**
- **기본 인쇄(버튼·Ctrl+P) = R-시리즈 이력서 2장.** R-001(논제·스탬프·학력·스킬 매트릭스) + R-002(선별 작업 5건 압축·복무·연락처). 서양 이력서의 정보 위계를 따르되 조판은 도면 타이틀블록 그대로 — 컨셉은 밀도로 증명한다.
- **전체 도면집(A-000~A-600 12장)은 부록으로 강등**: `?sheets` 프리뷰에서 보고, 그 URL에서 인쇄하면 전체 세트가 나온다. `?sheets=r`은 이력서 프리뷰.
- **상호참조 규칙:** R-시트의 proof는 `A-1xx` 시트 번호를 유지하되, 각주 범례로 해석 경로를 준다: "sheet refs → full set at {origin}/?sheets". 종이만 든 리크루터도 잃지 않고, 컨셉도 잃지 않는다.
- 콘텐츠 소스는 전부 기존 로컬라이즈 데이터: `t.*Summary`(5건), `p.role`/`results[0]`/`manifest.badge`, `skillMatrix()` 재사용, `formatDegreePlate`. **신규 Strings 키 0.**
- PDF 파일명 분기: 이력서 인쇄 = "Jungwook Van — Résumé", 전체 세트 = 기존 타이틀.

**폴리시 항목:**
1. ~~`.sal-glow-bg` / residual soft glow 제거~~ — **완료.** `--c-glow` 삭제, 도면 fill은 `--c-accent-wash`.
2. ~~`.sal-root` transition 토큰화~~ — **완료** (`--dur-base` / `--ease-out`; glow hover 잔여분도 정리).
3. 이력서 2장 밀도 검증: `?sheets=r` — **완료 (en/ko/ja).** R-001/R-002 `scrollHeight` 989px ≤ 990px 게이트 (preview `min-height: 262mm` 근사).

**검증:** 빌드·린트 게이트, `?sheets=r`/`?sheets` 두 변형 DOM 실측, beforeprint 수명주기 재확인(변형 분기 포함). 실제 인쇄 미리보기는 사용자 육안 게이트.

## v5 계획 — 도면집 밤티 제거 (상세, 2026-07-16)

> **범위:** 디자인만. 커밋 / main 머지 / Vercel은 사용자가 처리 (자동 배포 전제).
> **전제:** v4 soft-glow 패스 완료.
> **원칙 렌즈 (v5′):** Rams (Honest / as little design) · Tufte (data-ink) · Swiss 위계 · truth to materials · Norman (라벨=동작) · 10사이트 캐논 · 히어로 fold 예산.

### ⚡ v5′ 실행 결과 (2026-07-16)

원칙 재검토안(A→E) 착지. soft optionality 제거 · Hero fold 격상 · CTA 정직화 포함.

| Phase | 내용 | 상태 |
|---|---|---|
| A Honesty | axono node glow 삭제 · Contact lighthouse 전체 제거 · Nav Online 필 제거 · arch scan 정적 dish · Print CTA → `Print résumé` / `이력서 인쇄` / `履歴書を印刷` · lighthouse/navOnline Strings 키 삭제 | 완료 |
| B Hierarchy | Hero fold = eyebrow·h1·registry·subtag·stamp·CTA·axono · proof chips → `.sal-hero-below-fold` · degree/cargo → `.sal-hero-drawing` 캡션 | 완료 |
| C Motion | axono conduit/riser infinite 삭제 · arch vane/ripple/clock infinite 삭제 · `pulse-dot` 키프레임·voyage loading pulse 삭제 | 완료 |
| D Ink chrome | header/overlay/cursor/back-to-top blur 삭제 · nav-bg alpha↑ · voyage chips opaque `--radius-sm` · vignette 단순화 · SVG flat panel · pills → `--radius-sm` · bento hover = border/wash only | 완료 |
| E Verify | 본 기록 · `npm run build` + `npm run lint` | 게이트 |

**제외 (의도):** WebGL emissive · N3 Flip · N5 grid draw-in · 폰트/`--c-accent` rename · three 업그레이드.

### 밤티 판정 기준

| 밤티 (죽임) | 도면 언어 (살림) |
|---|---|
| Soft outer glow / neon halo | 솔리드 accent, hatch / `--c-accent-wash` |
| 가짜 텔레메트리 (online / uptime / sparkline) | 실제 데이터만 |
| 3색 이상 (녹색 status) | 빨강 + 뉴트럴만 (Mormal #10) |
| Ambient infinite 장식 | 스크롤/hover/1회 전이만 (Snellenberg #8) |
| Glassmorphism HUD | 불투명 패널 + 보더 |
| Pill + card float+shadow | `--radius-sm/md`, hover = border/fill |
| 첫 viewport 칩/스탯 줄 | 타이틀블록 + 논제 + CTA + axono |
| CTA 라벨 ≠ 동작 | `Print résumé` = `window.print()` → R-시리즈 |

**절대 안 건드림:** DrawingCursor, axono/KeyPlan/preserve-3d, `--c-accent`/`--c-bg` 이름, PrintSet/R-시리즈, N2, N4, 인쇄 프리뷰 종이 그림자, three 업그레이드.

---
## ⚡ v3 실행 결과 (2026-07-16, 같은 브랜치)

**"사이트 = 문서"** 착지: 인쇄하면 실제 A-000~A-600 도면집 12장이 나온다. `a1f56cc`(골격+표제+CTA 배선) → `9cf3e73`(시트 11장) → `163abfb`(voyage→측량도 재포장). 검증: `?sheets` 프리뷰로 12장·시트 참조(A-400 측량 테이블→A-1xx)·en/ko 실측, beforeprint/afterprint 수명주기 시뮬레이션(동기 12장 마운트 + 타이틀 스왑 + 완전 정리). **사용자 육안 게이트: 실제 Ctrl+P 인쇄 미리보기(페이지 나눔·잉크·PDF 파일명).** N3(Flip 재평가)은 여전히 육안 후 판단.

---

## 0. 레퍼런스 링크 검증 결과

소스: "보는 순간 압도되는 포트폴리오 사이트 10개" 모음 — **사이트마다 한 가지만 훔친다.** 아래 URL은 그 목록과 동일. 도면집 번역은 §1·§2.

10개 전부 WebFetch로 확인 (2026-07-16). 대부분 WebGL 사이트라 서버 렌더 텍스트가 얕음 — "제한적"은 사이트가 죽었다는 뜻이 아니라 JS 없이 볼 수 있는 게 적다는 뜻.

| # | 사이트 | URL | 상태 |
|---|---|---|---|
| 1 | SMSY Gen-02 | samsy.ninja | ✅ 살아있음 — "Award Winning Creative Graphics Engineer" |
| 2 | Toshihito Endo | game-like-portfolio.com | ✅ 살아있음 — 타이틀 "3D Game-Like Portfolio" |
| 3 | Bruno Simon | bruno-simon.com | ✅ 살아있음 — Three.js+WebGPU, 소스 MIT 공개. (점수 저장 서버는 오프라인) |
| 4 | Robin Noguier | robin-noguier.com | ✅ 살아있음 — 콘텐츠는 JS 동적 로드 |
| 5 | Merouane Bali | merodev.net | ✅ 살아있음 — 최소 텍스트만 노출 |
| 6 | Jordan Delcros | jordan-delcros.com | ✅ 살아있음 — freelance creative developer |
| 7 | Olha Lazarieva | olhalazarieva.com | ✅ 살아있음 |
| 8 | Dennis Snellenberg | dennissnellenberg.com | ✅ 살아있음 — 풀 포트폴리오 확인됨 |
| 9 | Niccolò Miranda | niccolomiranda.com | ✅ 살아있음 — 풀 포트폴리오 확인됨 |
| 10 | Camille Mormal | camillemormal.com | ⚠️ **HTTP 503** — 일시 장애로 추정(유명 실존 사이트). 참고 시 재시도 |

## 1. 이미 훔친 것 / 남은 것

1차 개편에서 이미 소화한 레퍼런스:

| 레퍼런스 | 훔친 것 | 어디에 |
|---|---|---|
| Miranda (#9) | 컨셉 하나로 전체 스토리텔링 | **"도면집"** — 시트 번호 A-000~A-600/A-1xx, 데이텀 ▽, Rev A 스탬프 |
| Lazarieva (#7) | 큰 타이포 + 여백 히어로 | 논제 h1 + fold 통제 |
| Noguier (#4) | 진입 전환 = 경험 (v1) | 카드→모달 clip 줌인 (배선 완료, 육안 검증 대기) |
| Snellenberg (#8) | 마이크로 인터랙션 일관성 | 인터랙티브 전이 전부 `--ease-out`/`--dur-*` 단일 규칙 |
| Mormal (#10) | 2컬러 절제 | 빨강+뉴트럴 유지, accent 그라디언트 워시 제거 |
| Bruno Simon (#3) | 시그니처 하나를 끝까지 | axono — 모바일까지 생존시킴 |

**남은 4개가 v2의 재료다:** SMSY(#1 첫 장면 각인), Endo(#2 과정을 인터랙션으로), Bali(#5 스크롤 깊이감 한 곳), Delcros(#6 숨은 발견 디테일).

---

## 2. v2 백로그 (우선순위순)

### N0 — 1차 잔여 마감 (반나절, 신규 디자인 아님)

v1에서 확인됐지만 미해결인 것들. v2 시작 전에 끝낸다.

1. **이력서 CTA.** `RESUME_PDF.available === false`라 히어로에 버튼이 하나뿐. `public/resume.pdf`를 넣고 `profile.ts:12`를 `true`로 — 이력서 사이트에서 이력서를 못 받는 상태 해소. PDF가 준비 안 됐으면 secondary "GitHub ↗"라도.
2. **언어 지속 + 감지.** 테마는 지속되는데 언어는 리로드마다 EN으로 리셋. 테마와 같은 패턴: localStorage(`sal-lang`) → `navigator.language` 프리픽스 매칭(ko/ja) → EN. **제품 결정 필요**: 첫 방문 한국어 리크루터에게 KO를 먼저 보여줄 것인가. 권장: 감지한다 — KO/JA 카피에 이미 커밋 3개를 썼다.
3. **ProjectDetail explode 리팩토링.** `ProjectDetail.tsx:73-81`이 스크롤마다 400줄 JSX를 50단계 재렌더. v1 계획의 "동시 수정"이었으나 미착수. HeroAxono 패턴(GSAP 프록시 + `--axstack`/`--axrise`에 imperative `setProperty`, React 상태 0)으로 전환. **N2(단면도 인터랙션)의 성능 전제조건.**
4. **P2/P6 모션 육안 검증 잔여분** — v1 커밋 시점에 확인 안 된 것이 있으면 여기서 정리.

### N1 — Delcros: CAD 크로스헤어 (숨은 발견 디테일) — v2의 핵심 한 수

v1에서 "preserve-3d 히트테스트 복잡도" 때문에 보류한 것. **히트테스트를 우회하는 설계**로 다시 정의한다.

- **원칙 유지:** 전체 화면 커서 금지(가짜 좌표 = 신뢰 전략 위반, `cursor:pointer` 10곳과 충돌). 도면 표면(`.sal-axono`, `.sal-detail-axono`, `.sal-secdwg`)에서만.
- **히트테스트 우회:** 3D 투영 역산 대신 **수평 밴드 방식**. 크로스헤어의 세로선은 마우스 X를 그대로 따라가고, 리드아웃은 마우스 Y가 속한 **층 밴드**(층 캡션의 `getBoundingClientRect()` Y 범위 — 이미 2D 요소라 투영 문제 없음)로 결정. 표시 데이터는 전부 실제: `AXONO_LAYERS[i].session`(`▽ 2025 AUT`), 층 이름, 블록 라벨 목록. 블록 단위 정밀 히트는 하지 않는다 — 층 단위면 CAD 리드아웃으로 충분히 읽히고 수학이 없다.
- **게이트:** `@media (hover: hover) and (pointer: fine)` + `useMediaQuery` 재사용. `prefers-reduced-motion`에선 크로스헤어 라인 이동을 transition 없이.
- **성능:** mousemove는 rAF 스로틀, 크로스헤어는 `transform`만 변경(레이아웃 무효화 금지). 리스너는 도면 컨테이너에만.
- 파일: `HeroAxono.tsx`(또는 새 `DrawingCursor.tsx` 공유 컴포넌트), `index.css`.
- 검증: `(hover:none)` 에뮬 → 부착 안 됨. Tab 순회 → 포커스 링 무영향. mousemove 중 long task 없음.

### N2 — Endo: 과정을 인터랙션으로 (단면도 스크럽)

ProjectDetail의 `SectionDiagram`은 지금 "a drawing is a document"라며 정적. 결과 나열 대신 **과정을 조작하게** 만든다.

- 데이터는 이미 있다: `decisions[]`, `tradeoffs[]`(rejected/why), `problems[]`, `results[]` — 전부 `projects.ts`에. 새 콘텐츠 작성 불필요, **기존 데이터의 접점만 재설계.**
- 단면도의 시스템 노드(층)에 hover/focus → 해당 층의 결정·트레이드오프가 도면 옆 **콜아웃 패널**로. "기각한 대안(rejected)과 이유(why)"가 도면 언어(리비전 클라우드/취소선)로 표기되면 Endo의 "체험" + 이 사이트의 "영수증" 규율이 한 번에.
- 단계 스크럽(파이프라인 스테이지 통과)은 2단계로: 먼저 hover 콜아웃만(정적, 검증 쉬움) → 반응 좋으면 GSAP 스크럽.
- **전제: N0-3 (explode 리팩토링).** 지금 상태로 인터랙션을 얹으면 재렌더 폭탄.
- 접근성: hover 전용 금지 — 노드는 `button`으로 focusable, 콜아웃 내용은 aria로 연결.
- 파일: `SectionDiagram.tsx`, `ProjectDetail.tsx`, `index.css`, (콜아웃 카피가 새 문구를 요구하면) `strings.ts` 3개 국어.

### N3 — Noguier v2: Flip 요소 매칭 재평가

v1 clip 줌인을 실제 브라우저에서 본 **다음** 판단. v1 결론 유지 가정: "scale 변화가 착시의 전부, 픽셀 단위 대응은 방문자가 인지 못 한다." clip 줌인이 충분히 읽히면 **이 항목은 폐기**하고 N4로 시간을 옮긴다. 부족할 때만: 2D 프록시 래퍼(`.sal-detail-axono-stage` 바깥)에 Flip — preserve-3d 안 건드리는 유일한 경로. `App.tsx`의 `{activeProject && …}`는 이미 `closing` 상태로 해결돼 있음.

### N4 — Bali: 스크롤 깊이감, 딱 한 곳

레퍼런스의 교훈 자체가 "한 곳만". 후보 비교 후 하나만:

| 후보 | 비용 | 컨셉 부합 |
|---|---|---|
| **히어로 그리드 배경 미세 패럴랙스** (`.sal-hero-grid-bg`를 scrollP로 0.9~1.0 이동) | 최저 — 요소 이미 있음, transform만 | 도면지가 살짝 뜨는 느낌 — 부합 |
| Experience 타임라인 깊이 | 중 | 애매 |
| 상세 axono 마우스 기울임 | 중 — 매 프레임 transform 쓰는 JS와 경합 | 위험 |

권장: 첫 번째. `useScrollProgress`가 이미 rAF 스로틀된 `scrollP`를 제공 — 소비만 하면 됨. `prefers-reduced-motion`에서 정지.

### N5 — SMSY: 타이틀 시트 인트로 (선택, 가장 신중히)

"첫 장면 각인"의 도면집 번역: 사이트 로드 = **도면 세트를 여는 것**. 후보: (a) 히어로 그리드가 0.4초간 그려지며 등장(P2 자가작도와 타이밍 연결), (b) 시트 인덱스 레일이 A-000부터 순차 점등, (c) 풀스크린 인트로 오버레이 — **(c)는 기각**: 로딩 게이트는 "3초 안에 논제" 목표와 정면 충돌. (a)+(b)만, 합계 0.6초 이내, 텍스트 렌더를 절대 막지 않는 장식 레이어로.

### 명시적으로 안 하는 것

- **3D 월드 탐험 전환** (SMSY/Endo/Bruno의 표면 형식) — v1 결론 유지: 지는 싸움. 이 사이트의 시그니처는 탐험이 아니라 도면.
- **전체 화면 커스텀 커서** — N1의 스코프 원칙으로 대체.
- **사진 인터랙션** (Mormal) — 이 사이트엔 사진이 없음. 해당 없음.

---

## 3. 이월 제약 (v1에서 검증된 것, v2에도 그대로)

- `--c-accent`/`--c-bg` rename 금지 — `three/voyage/palette.ts`가 `getComputedStyle`로 읽음.
- `three` 버전 드라이브바이 업그레이드 금지 — `water.ts:30` 셰이더 청크 문자열 매칭 throw.
- `AXONO_LAYERS[].blocks` 순서 변경 금지(append만) — riser 수직 정렬이 index 파생.
- 새 `Strings` 키 = 3개 국어 필수 (`tsc -b`가 게이트).
- **preserve-3d 요소에 opacity < 1 금지** — `transform-style`이 flat으로 강제되어 3D 붕괴. (v1 P2에서 실제로 밟을 뻔한 함정.)
- GSAP from-상태로 시그니처를 opacity 0에서 시작 금지 — GSAP 실패 시 빈 화면. 구조는 `apply()`로, 페이드는 3D 씬 밖 요소만.
- 모달 언마운트를 애니메이션 `onComplete`에만 걸지 말 것 — 폴백 타이머 필수 (v1 P6 패턴 유지).
- 도면 chrome에 가짜 데이터 금지 — 리드아웃·라벨은 `AXONO_LAYERS`/`projects.ts`의 실제 값만.

## 4. 검증 방법 (환경 제약 포함)

- 공통 게이트: `npm run build`(tsc) + `npm run lint`.
- 지오메트리/스타일: preview(4173) + `getComputedStyle`/`getBoundingClientRect` 실측 — hidden 페인에서도 신뢰 가능.
- **모션은 이 환경에서 검증 불가** (Browser 페인 `visibilityState: hidden` → rAF 동결 → GSAP/IO/ScrollTrigger 정지). N1·N2·N4·N5 전부 모션 포함 — **각 단계 착지마다 사용자 육안 확인을 게이트로 명시**하고, 코드 쪽은 "애니메이션이 안 돌아도 깨지지 않는 상태"(v1 P2/P6 패턴)를 항상 보장한다.
- 커밋 단위: N0 / N1 / N2 / (N3) / N4 / N5 각각 독립 커밋. main 직행 대신 브랜치 권장.

## 5. 순서 요약

```
N0 잔여 마감 (resume CTA · lang 지속/감지 · explode 리팩토링)
 → N1 크로스헤어 (밴드 방식, 도면 표면만)
 → N2 단면도 인터랙션 (hover 콜아웃 먼저)
 → N3 Flip 재평가 (clip 줌인 육안 후 — 폐기 가능성 높음)
 → N4 깊이감 한 곳 (히어로 그리드 패럴랙스)
 → N5 타이틀 시트 인트로 (선택)
```
