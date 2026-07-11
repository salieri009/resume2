# Salieri — Resume Site

Personal resume / portfolio site, built with Vite + React + TypeScript. Implements the "Voyage" design
as a deployable codebase: hero with **exploded axonometric degree stack** (UTS transcript storytelling),
nautical-chart backdrop, project case studies, semester timeline, skills arsenal, an interactive
**Voyage Chart** (project archipelago + real IoTBay CI/CD route), about, and contact lighthouse —
with English/Korean/Japanese localization and a light/dark theme.

Smooth scrolling via Lenis; Hero axonometric + Voyage Chart scrub via GSAP ScrollTrigger; desktop Voyage
map via Three.js (WebGL) with SVG fallback for reduced-motion / no-WebGL / mobile.

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build   # type-checks and outputs to dist/
npm run preview # serve the production build locally
```

## Structure

- `src/data/` — content and shared types: `academic.ts` (transcript highlights), `projects.ts` (case
  studies), `voyage.ts` (Voyage Chart islands + CI/CD route), `strings.ts` (EN/KO/JA i18n), `types.ts`
- `src/hooks/` — `useScrollProgress`, `useSectionSpy`, `useReveal` (reveal-on-scroll), `useTypewriter`,
  `useReducedMotion`, `useSmoothScroll` (Lenis)
- `src/components/` — layout chrome (`Nav`, `CourseLine`, `Footer`, `BackToTop`, `Icons`) and page
  sections (`Hero` + `HeroAxono`, `ProjectsBento`, `Experience`, `Skills`, `VoyageChart` + `VoyageScene`
  + `NauticalBg`, `About`, `Contact`), plus the project case-study overlay (`ProjectDetail`)
- `src/lib/` — `webgl.ts` (capability check for graceful fallback), `voyageVisuals.ts` (GSAP ScrollTrigger
  wiring for the Hero axonometric and Voyage Chart scrub)
- `src/index.css` — theme tokens (CSS variables, swapped via `data-theme` on `<html>`) and all styling

## Notes

- The header/hero "Download Résumé" links point to `/resume.pdf`, which is not included — drop a PDF at
  `public/resume.pdf` to make that link work.
- Public site shows GPA / WAM / 144 CP / Complete only — **student number is never displayed**.
- Hero axonometric floors map Foundations → Systems → Algorithms & Graphics → Production from the
  UTS Online Student Record (printed 29 Jun 2026). Timeline expands the same arc by semester.
- Voyage Chart islands open the same case-study overlay as the bento grid. The CI/CD strip mirrors the
  real IoTBay pipeline (push → Actions → E2E → Docker → GHCR) — no unshipped tech (e.g. Kubernetes).
- Three.js scene is procedural (ocean, ship, five project islands, lighthouse) — no external glTF required.
