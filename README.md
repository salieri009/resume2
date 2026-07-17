# The Architecture of Software — SITE 009

Personal portfolio of **Jungwook Van (SALIERI)**, built with Vite + React + TypeScript and
React Three Fiber. The thesis is one line — *"Software is not written. It is constructed."* — and the
site takes it literally: instead of a page you scroll, the portfolio is a small **orthographic building**
you visit. A service boundary is a load-bearing wall; a training pipeline is a mechanical riser; the
degree is exhibited as a construction sequence; the résumé is the building lying back down onto paper.

Codename **Siteline / SITE 009**. Three languages (EN · KO · JA), a light **PAPER** print and a dark
**INK** print (the same drawing as a negative), and a 2D plan fallback that is the same building projected
flat — for reduced-motion, no-WebGL, and compact viewports.

## Develop

```bash
npm install
npm run dev        # vite dev server (5173)
```

## Build

```bash
npm run build      # tsc -b && vite build → dist/
npm run preview    # serve the production build (4173)
npm run lint       # oxlint
```

## The building

Floors stack in section order; the left-edge floor rail is the key plan. URL hashes deep-link rooms
(`#/L2/crowd`).

| Floor | Rooms | Content |
|---|---|---|
| **R** — Roof | `roof` | Contact + identity plate, white air |
| **L4** — Archive | `archive`, `library` | Credentials (embossed seals) + writing |
| **L2/L3** — Laboratories | `crowd`, `iotbay`, `farm`, `gundam`, `ephemeral` | The five projects, each a typology space |
| **L1** — Timeline | `timeline` | The degree as an exploded construction sequence |
| **L0** — Lobby | `lobby` | Thesis wall + about |
| **B1** — Infrastructure | `core` | Skills as risers and pipes |
| **B2** — Server | `server` | GitHub, as underground racks |

## Structure

- `src/app/` — `SitelineApp` (root, HUD wiring), `SiteRoot` (the R3F `<Canvas>`, boot / teardown)
- `src/scene/` — `BuildingMass` + `rooms/*` (one scene component per room), `primitives.tsx`
  (plinths, edge ink, authored shadows/ground), `textures.ts` (canvas engraving kit), `palette.ts`
  (the 7-token color law), `motion.ts` (one ease, a duration menu)
- `src/camera/` — `OrthoRig` (orthographic-only travel between fixed stations)
- `src/hud/` — the sheet's furniture: `SiteChrome` (title block), `FloorRail` (key plan),
  `panels/*` + `SpecPanel` (wall labels), `PlanFallback` (the flat projection)
- `src/building/` — `program.ts` (the floor/room map) and `SiteContext` (navigation, theme, language)
- `src/data/` — `academic.ts` (transcript), `projects.ts`, `credentials.ts`, `profile.ts`,
  `strings.ts` (EN/KO/JA), `types.ts`
- `src/components/` — the print set: `PrintSet`, `SectionDiagram`, `ShippingLane` (R-series résumé
  sheets, opened by the **DOC** control)
- `src/styles/siteline.css` — the HUD design system (CSS tokens, swapped via `data-theme`)
- `scripts/gen-og.mjs` — regenerates the `public/og.png` share card

## Design system

The visual language is governed, not improvised. The constitution is
[`docs/ARCHITECTURE_OF_SOFTWARE.md`](docs/ARCHITECTURE_OF_SOFTWARE.md); the Visual Design Bible in
[`docs/bible/`](docs/bible) carries a chapter per concern (camera, material/light/color, typography,
interaction) and a spec sheet per room. Two binding commitments: the camera is **orthographic only**
("parallel projection is testimony"), and the model always admits it is a model — it stands on an
infinite paper sheet, never a photoreal city.

## Notes

- The public site shows **GPA / WAM / 144 CP / Complete only — the student number is never displayed.**
- The **DOC** control prints the R-series résumé sheets; figures come from the UTS Online Student Record.
- The scene uses no photoreal shadows: presence is drawn — edge ink, on-surface engraving, and authored
  shadow/ground planes only.
- Deployed on Vercel.
