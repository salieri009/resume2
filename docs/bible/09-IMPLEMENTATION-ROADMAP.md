# Chapter 09 — Implementation Roadmap

> SITE 009 · Stage 3 artifact · authored under Prompt C of [`00-PROMPTS.md`](00-PROMPTS.md)
> The bible (chapters 01–08, rooms 04/\*) is the single source of truth. This document translates;
> it does not design. Priority: **1. Fidelity 2. Performance 3. Accessibility 4. Maintainability.**
> When a step is hard, the answer is a different engineering approach — never a design compromise.
> Deviations require a bible amendment first (edit the chapter, note the revision, then build).

## 0 · The Existing Patterns (extend, never fork)

| Pattern | Where | Extension rule |
|---|---|---|
| Camera stations | `src/camera/OrthoRig.tsx` — `PRESETS` record + `presetForRoom()` | Grow `ViewPreset` to one entry per station in the 05 canon; keep the single tween shape. Station coordinates are nominal until each room's composition (its concept sheet) is achieved on screen — composition wins over coordinates. |
| Room gate | `src/building/program.ts` — `SHIPPED_ROOMS` | The only ship switch. A room enters this array in the same commit that delivers its scene block, SpecPanel binding, PlanFallback parity, and station. |
| Scene massing | `src/scene/BuildingMass.tsx` — `LabCrowdBlock` pattern | One component per room block; shared primitives below. No room invents its own hover/trace plumbing. |
| Wall label | `src/hud/SpecPanel.tsx` | Already binds `getLocalizedProject` + `getReceipts`. Generalize to any `RoomId` with a per-room data adapter; reading order is fixed by Chapter 07 (identification → vitals → rack → narrative → results → lessons → door). |
| Flat projection | `src/hud/PlanFallback.tsx` | Every wave lands its rooms here in the same commit. The plan view is also the semantic skeleton (Chapter 08) — structure it as real document content (headings/lists/links), not divs with drawings. |
| State/routing | `src/building/SiteContext.tsx` | Hash grammar `#/<floor>/<room>` already matches Chapter 08. No new state machinery. |
| Tokens | `src/styles/siteline.css` | All colors via tokens; scene constants read from one shared module (below), not per-file literals. |

## 1 · Cross-cutting corrections (Wave 1, before any new rooms)

1. **Signal color**: `src/scene/BuildingMass.tsx` carries `SIGNAL = '#1A6BFF'`; the constitution and Chapter 06 say `#2F6BFF`. Fix, and hoist all scene color constants into one `src/scene/palette.ts` (paper, concrete, resin, aluminum, glass, graphite, signal, grid) so the token law has one enforcement point. Audit `siteline.css` for the same value.
2. **Ease bookkeeping**: GSAP `power3.out` stands in for `cubic-bezier(0.22, 1, 0.36, 1)`; replace with a `CustomEase` (or `gsap.parseEase` equivalent) defined once in a shared `src/scene/motion.ts` exporting `EASE_SITE`, the duration menu of Chapter 05 (1.1 / 1.35 / 1.6 s), and the ink-on exception (`power2.inOut`, sanctioned by 05).
3. **Frameloop**: switch the Canvas to `frameloop="demand"` and invalidate from GSAP `onUpdate`. Chapter 05's arrival rule (total stillness at rest) makes this free — a resting frame renders zero times per second, which is both the doctrine and the performance budget.
4. **Lighting rig**: keep the current two-directional + ambient rig; it already matches Chapter 06's one sky (key [8,14,6] ≈ 0.85, fill [−6,8,−4] ≈ 0.25, ambient 0.72). Do not add lights per room — rooms differ by architecture only.

## 2 · Shared primitives (build once, in Wave 1)

- **`<Plinth>`** — resin slab + medium-weight boundary `Line`, hover plumbing (crosshair cursor, boundary→signal, `onHover`/`onClick`), leader-note anchor point. Every room block sits on one.
- **`<FlowTrace>`** — the ink-on current: given an ordered list of conduit polylines (from each project's `flows` + `diagram` order), renders graphite hairlines at rest and animates the signal run on hover (drawn-length animation, `power2.inOut`), with per-room dialect knobs: `heldBeatAt` (Gundam's lockset, ~0.25 s), `traceset` (IoTBay's two flows), instant-die on exit (all rooms; the pavilion is just the showcase). Reduced motion: render the completed trace while hovered, no animation.
- **`<LeaderNote>`** — HUD annotation anchored to a 3D point (drei `Html` or projected DOM): hairline leader + landing + drafting-mono label, one instance site-wide (Chapter 07: one at a time).
- **`<CaptionPlate>`** — micro caption in 3D space (drawer captions, annex/shipping lines, gauges): drafting mono, interpunct grammar, graphite.
- **`<CutReveal>`** — the sectioned paper for B1/B2: ground plane with an opening, hatched edge band (45° line pattern), used by the two basement stations.
- **Shadows** — pick the cheapest technique that reads as Chapter 06's soft doubled model-shadows: static gradient "blob" planes under masses (authored per block, zero runtime cost) are sufficient; real shadow-mapping is not required and not worth its budget. The shadow catalogue in 06 is the acceptance list.

## 3 · The Waves

Every wave ships: scene block(s) + station(s) + SpecPanel/panel bindings + `SHIPPED_ROOMS` + FloorRail enablement + PlanFallback parity + reduced-motion poses + concept-sheet screenshot check. A room's concept sheet is written (Prompt B) before its build starts if it doesn't exist yet.

**Wave 1 — Fidelity pass on the shipped slice** (lobby, crowd, boot; concept sheets exist)
- Apply §1 corrections and build §2 primitives by refactoring `LabCrowdBlock` onto them.
- Crowd room to its chapter: three registers with the bible's massing (interface masses lifted on risers, gateway foremost, eye with slit aperture), conduits per `flows`, the **training annex** outside the boundary with `<CaptionPlate>` (`shipping` data), flow-trace dialect, boundary-only hover (blue never reaches the annex).
- Lobby to its chapter: thesis wall as an in-model object (shadow gap), light patch on the floor plate (authored gradient), LobbyPanel reading order confirmed, glass curtain proportions (55 % × 70 %).
- Boot: timings already match 03 (1.4 / 1.8 / 0.35 s); verify stamps fade first and the held stillness lands.
- Acceptance: side-by-side against `docs/concept/L0-LOBBY.md` and `docs/concept/L2-LAB-CROWD.md` plates 1–3.

**Wave 2 — The remaining laboratories** (one room per pass, in order: iotbay → farm → gundam → ephemeral)
- Each is a `<Plinth>` + bespoke massing component + `<FlowTrace>` dialect, all driven by its `PROJECTS.<key>` data (`layers`, `flows`, `diagram`, `shipping`).
- Distinct engineering notes: IoTBay's dual traceset (route vs. gantry conveyor); Farm's instanced seedling tray (`InstancedMesh`, the one place instancing is also the *content*) and dashed vane drop (`Line` dashed); Gundam's floating floor (shadow-gap band, no posts) and held-beat trace; Ephemeral's three-plane roof (three glass materials at stepped opacity) and fastest cooldown.
- SpecPanel adapter covers all four; receipts honesty per binding tables (iotbay PRs only; farm/gundam/ephemeral door-only).

**Wave 3 — Timeline hall + Mechanical core**
- L1: four stage massings from `AXONO_LAYERS` (reuse block-stack rendering logic conceptually from `HeroAxono`, but re-implemented in-scene), exempt base half-sunk and darker, mark stamps via `<CaptionPlate>` + `formatMark`, artifact plates as doors, completion plate via `formatDegreePlate`. New camera word: lateral pan with hard stops (extend station type with `stops[]`).
- B1: `<CutReveal>` + five risers + intercom line; gauges from `SKILL_PROOFS`/`formatProof`; destination plates; current-exits-upward trace variant.
- Panels: these floors need a lighter wall label than SpecPanel (hall: course lines on hover; core: riser cards) — build as variants of the same panel shell, same reading rhythm.

**Wave 4 — Server, Archive/Library, Roof, exit**
- B2: deepest station, four cabinets (one answering), the bare patch (a slightly lighter concrete rectangle — literally one mesh), door to `LINKS.github`.
- L4: drawer mechanism (0.4 s hand's-width slide, one-open-at-a-time in context state), embossed seals (geometry or normal-faked relief — visual test decides), credential documents via `getLocalizedCredentials`; library desk + `LINKS.blog` door; the westward pan.
- R: fog-by-absence (grid fade already exists — extend fade curve with height so no grid is visible at the roof station), identity plate with engraved schedule (`LINKS`, `contactTitle`, `contactSub`), `END OF SET` stamp.
- Exit teardown (03): the five-register undraw (material → massing → wireframe → blueprint → line → void, ~4 s, stamps last) as a GSAP master timeline over shared material/line-weight uniforms; triggered from the roof's farewell; reduced motion cuts to void + a closing plate.
- Sound: none. REVISION A ships silent per Chapter 08.

## 4 · Performance budget

- `frameloop="demand"`; zero renders at rest is the norm, and any idle animation is a bug by doctrine before it is a cost.
- Geometry: boxes, planes, and `Line` — no imported meshes, no postprocessing, no environment maps, no real-time shadow maps. Aluminum's sheen comes from `meshStandardMaterial` under the fixed rig, capped metalness per Chapter 06.
- Instancing where count > ~10 (farm tray, grid lines already batched by drei `Line` segments — consolidate the 42-line grid into one `Line` with segment breaks if draw calls ever matter).
- Text in scene via `<CaptionPlate>` (HTML-projected) — avoid SDF text geometry unless captions must occlude; revisit only if a visual test fails.
- Budget check per wave: scene renders clean on integrated graphics at 1280×800; travel tweens hold 60 fps; resting frame renders 0 fps.

## 5 · Accessibility & parity work items (run through every wave)

- Focus parity: every answering surface reachable by Tab in station reading order; focus triggers the same signal/note/trace grammar; Enter = click, Escape = one-step retreat. Implement once in the `<Plinth>`/door plumbing.
- The document under the model: PlanFallback content structured as headings/lists/links in wall-label order; it must contain every fact the 3D rooms show (three-renderings test, Chapter 08).
- Reduced motion: every new sequence lands as a cut to final pose; `<FlowTrace>` static-while-hovered variant; drawer opens open.
- Localization: all new surfaces bind via existing `STRINGS`/`getLocalized*` paths; stamps and seals stay English; layouts proportioned for the longest tenant (test KO/JA on every panel).

## 6 · Verification (every wave)

1. `npm run build` (tsc + vite) and `npm run lint` clean.
2. `vite preview` on 4173; Browser pane at 1280 width (preview server, not dev, per project memory).
3. Per room: hash route loads directly; station travel and reverse; hover grammar (crosshair, `#2F6BFF` edge, leader note); trace dialect incl. its special beat; SpecPanel/panel binds real data in EN/KO/JA; PlanFallback shows the room; reduced-motion poses; print (R-001/R-002) unchanged.
4. Screenshot at the room's station vs. its concept-sheet plates (resting + hover). File the screenshots with the wave's notes.
5. The two doctrine spot-checks that catch drift fastest: any saturated color outside interaction? any motion while the visitor rests? Either is a failing build.

## 7 · Out of scope / standing cautions

- Old site components (`src/App.tsx` tree) stay untouched; `PrintSet` remains the print drawer's engine. Do not rename `--c-accent`/`--c-bg` (voyage palette reads them); do not upgrade `three` (voyage water shader chunk matching).
- No new dependencies without a fidelity reason stated against a bible chapter.
- `manifest` fields in `PROJECTS` serve print/old views; the building does not use them — do not "find a home" for them.
