# Salieri — Resume Site

Personal resume / portfolio site, built with Vite + React + TypeScript. Implements the "Voyage" design
(`Salieri Resume v2.dc.html`) as a real, deployable codebase: hero, project case studies with detail
overlays, experience timeline, skills, about, and contact — with English/Korean/Japanese localization
and a light/dark theme.

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

- `src/data/` — content (project case studies, i18n strings) and shared types
- `src/hooks/` — scroll progress, section spy, reveal-on-scroll, typewriter, reduced-motion
- `src/components/` — page sections (`Hero`, `ProjectsBento`, `Experience`, `Skills`, `About`,
  `Contact`) and the project case-study overlay (`ProjectDetail`)
- `src/index.css` — theme tokens (CSS variables, swapped via `data-theme` on `<html>`) and all styling

## Notes

- The header/hero "Download Résumé" links point to `/resume.pdf`, which is not included — drop a PDF at
  `public/resume.pdf` to make that link work.
- Accent color, hero backdrop, and layout density were exposed as design-tool props in the original
  prototype; this build ships with their defaults (red accent, full backdrop, comfortable density) since
  there's no in-app UI to change them.
