# The Architecture of Software

> **Software is not written. It is constructed.**
>
> Single source of truth for Siteline / SITE 009. Implementers follow this document.

## Identity

| Layer | Value |
|---|---|
| Title | The Architecture of Software |
| Call sign | SALIERI |
| Site code | 009 |
| Stamp | REVISION A |
| Mode | ORTHOGRAPHIC MODE |

## Opening (non-negotiable)

1. Empty white void. No sound. Light only.
2. One thin graphite line draws like a CAD Line tool → building footprint.
3. Micro labels: `SITE 009` / `SALIERI` / `ORTHOGRAPHIC MODE` / `REVISION A`
4. Footprint extrudes: walls, columns, slabs. Materials: concrete, white resin, brushed aluminum, glass — never a photoreal city.
5. The building is **software architecture made spatial**, not a real building.

## Camera / Cursor

- Orthographic only (Rhino / Revit / Blender CAD view). **No perspective camera.**
- No orbit tumble. Travel = parallel dolly / pan / zoom.
- Cursor on drawing surfaces = CAD crosshair; hover = signal-blue edge + annotation (`ROOM` / `L2` / project id).

## Program map (content binding)

| Zone | Content source |
|---|---|
| Lobby L0 | `strings.tagline`, PROFILE, about |
| Labs L2–L3 | `PROJECTS` ×5 |
| Timeline L1 | `SEMESTER_WAYPOINTS` / degree as construction sequence |
| Core B1 | skills as risers / pipes |
| Server B2 | GitHub link (no fake contribution graph) |
| Archive L4 | `CREDENTIALS` |
| Library L4 | Blog link |
| Roof R | Contact + `LINKS` |
| DOC | PrintSet R-001 / R-002 |

## Room grammar

- Labs: typology spaces (observatory, warehouse, greenhouse, housing, pavilion) — blueprint lines, not neon.
- Skills: infrastructure core; signal current on hover.
- GitHub: underground racks — no contribution heatmap.
- Experience: construction stages, not résumé cards.
- Contact: white fog rooftop + identity plate — no city/sky tropes.
- Exit: solid → wireframe → blueprint → single line → void.

## Hard bans

No glassmorphism UI, neon cyberpunk, SaaS dashboard, hero avatar, floating cards, endless scroll landing, perspective camera, fake telemetry, Contribution Graph cliché.

## Motion voice

Single ease `cubic-bezier(0.22, 1, 0.36, 1)`. Grammar: ink-on, extrude, ortho dolly, assemble, isolate, cut-reveal. No bounce. `prefers-reduced-motion` → jump to final pose + SpecPanel.

## Color (screen experience)

| Token | Hex | Role |
|---|---|---|
| `--paper` | `#F2F1ED` | void / walls |
| `--concrete` | `#C8C4BC` | mass fill |
| `--graphite` | `#2A2C2E` | lines / body |
| `--ink` | `#0E0F10` | titles |
| `--blueprint` | `#1E3A5F` | rare annotation |
| `--steel` | `#8B9198` | metal |
| `--signal` | `#2F6BFF` | interaction only |

Print R-series may retain existing drawing-set ink; the live experience uses the tokens above.

## First ship scope

Boot → Lobby → Floor rail → **Lab: crowd** + SpecPanel + Print drawer.  
Deferred: labs 2–5, timeline hall, skills core, server/archive/library/roof polish, sound, exit teardown.
