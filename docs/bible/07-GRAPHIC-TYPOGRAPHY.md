# Chapter 07 — Graphic Language & Typography

> Visual Design Bible · SITE 009 · The Architecture of Software
> Governed by the constitution: [`docs/ARCHITECTURE_OF_SOFTWARE.md`](../ARCHITECTURE_OF_SOFTWARE.md)
> This chapter codifies everything lettered, ruled, and stamped: the drawing conventions, the type system, and the HUD that wraps the model.

## The Drawing Office Voice

All graphics in SITE 009 descend from one source: the working drawing.
The site does not have a "UI style"; it has drafting conventions, applied
without irony. Lines have weights because weights mean things. Text comes
in stamps, labels, and notes because those are the registers a sheet
knows. The corners hold a title block because every sheet has one. When a
new graphic element is proposed, the test is the constitution's: *would
this survive in a working drawing?* — and the corollary from Chapter 01:
if it exists only to impress, it is ornament, and the answer is no.

## Line

The line-weight hierarchy is the site's deepest graphic law, identical in
the model, the HUD, and the flat projection:

| Weight | Where | Color |
|---|---|---|
| Hairline (~0.5) | survey grid, conduits, extension lines, drawer schedules | grid gray / graphite |
| Medium (~1.5) | footprints, resting edges, exhibit boundaries, rules in panels | graphite |
| Heavy (~2+) | the active edge — hovered, focused, selected | signal, and only signal |

Three marks complete the vocabulary. **The leader** — a thin line with a
short horizontal landing — ties every annotation to the thing it names;
annotations never float unanchored. **The dimension string** — extension
lines, ticks, centered figure — may answer a spatial question on hover
and is otherwise absent. **The hatch** — fine diagonals at 45° — means
one thing only: sectioned solid. It appears at the basement cut, in the
exempt foundation of the timeline hall, and in the exit sequence's
blueprint register, and nowhere decorative, so the mark keeps its meaning
for the moments that need it.

## Type

Two voices, and no third. The **drafting voice** — a monospaced hand —
does everything a pen does on a sheet: stamps, room tags, leader notes,
dimension figures, captions, gauges, seals, the `A-101 · CROWD` register.
It is always set small, always uppercase for stamps and tags, tracked
wide (+8–12%) so it reads as lettering rather than words, and always in
graphite (or paper-white in the INK theme). The **reading voice** — a
quiet grotesque — carries what a visitor actually reads: the thesis
wall's tagline and story, specification-plate paragraphs, decisions and
trade-offs. It is set at generous line-height, never justified, never
tracked, in graphite with `--ink` reserved for titles.

The scale is short and absolute: **stamp** (the smallest legible — corner
stamps, tags, figures) < **label** (leader notes, vitals, tool racks) <
**body** (paragraphs) < **title** (room titles, and the one inscription
on the thesis wall — the largest text in the building). Nothing else
exists; if a text cannot find its size in four steps, the text is wrong.
All numerals are tabular — marks, gauges, coordinates, and dates align
like a schedule, because half this site's poetry is numbers and numbers
deserve columns.

The building speaks three languages, and the type system carries Korean
and Japanese as first citizens: the reading voice's CJK companions are
chosen for the same quietness, line-heights loosen a step for hangul and
kanji, and the drafting voice's stamps remain English everywhere — as
seals, codes, and title blocks do on real drawings that travel between
offices. Localized text re-letters in place with no layout motion; every
surface is proportioned for its longest tenant.

## The Stamp System

Identity appears only as stamps: `SITE 009` · `SALIERI` · `ORTHOGRAPHIC
MODE` · `REVISION A` in the sheet's corners, `REVISION A · END OF SET` at
the roof, `EXEMPT · EXISTING STRUCTURE, RETAINED` in the hall, `SYS ·
SALIERI009` in the cellar. A stamp is short, uppercase, monospaced,
unpunctuated except for the interpunct, and never explains itself. The
interpunct (`·`) is the site's one connective — it joins fields the way a
title block ruling does — and lists, captions, and tags use it instead of
commas wherever the drafting voice speaks. The circular seals of the
archive are the stamp system's ceremonial tier: embossed, English,
line-broken as their sources break them (`EIGHTH / ARMY`), and never
reproduced at reduced solemnity elsewhere.

## The HUD

The HUD is not an overlay on the drawing; it *is* the sheet's furniture,
and it holds exactly four fixtures. **The title block** — the corner
chrome: stamps in two corners; language (`EN · KO · JA`) and theme
(`INK / PAPER`) controls and the `DOC` print control in the others, each
drawn as a stamp that answers (signal on hover, current selection at full
graphite, alternatives at half). **The key plan** — the floor rail along
the left edge: the building's section as an index, floors in section
order (R down to B2), rooms unfolding as A-series tags, the current
location at heavy weight, unbuilt floors listed at half strength and
honest about it. **The wall label** — the specification panel, whose
reading order is fixed law: identification (crumb, category, title,
summary) → vitals (role · team · period · outcome, one ruled block) →
tool rack → narrative (overview, problems↔answers, decisions,
trade-offs at full size) → results band (stamped chips) → lessons &
future → the door (repository link and live receipts last, where a
catalogue number belongs). **The leader note** — the floating annotation
(`ROOM · L2 · PROJECT 01 · CROWD`) that names whatever the crosshair
rests on, anchored by its leader line, one at a time, never stacking.

Nothing else may join the HUD. There is no breadcrumb (the leader note
and rail already say where you are), no progress indicator (a building is
not a form), no toast, no badge, no floating action button. The cursor
itself is HUD: the CAD crosshair over any answering surface, the system
arrow elsewhere — the oldest status indicator in drafting, and the only
one this site needs.

## The Flat Projection's Graphics

The 2D plan journey and the print set are the same conventions with
gravity reversed: line weights identical, stamps in the same corners,
leader notes become printed annotations, and every room's plan or section
uses the marks this chapter defines (hatch for cut, dashed for optional
or ghosted, circled symbols for risers). The R-series print keeps its own
committed ink per the constitution; the conventions travel, the exact
pigment need not.

## Critique

**The Awwwards juror** asked where the personality lives in a system this
strict, and the answer is the interpunct and the stamps — a site that
says `1 / 620` and `END OF SET` in the same breath as `A-101` has a voice
no logotype could give it. The juror endorsed banning the breadcrumb and
badge tier outright rather than styling it.

**Ando's chair** kept the HUD at four fixtures and insisted the leader
note appear one at a time — annotation is attention, and attention is
singular. A proposed persistent room-title header was struck; the wall
label already names the room, once, properly.

**Rams' chair** cut the type scale to four steps and two voices, made
tabular numerals a law rather than a preference, and required the
half-strength treatment for unbuilt floors — honest scaffolding is a
graphic obligation, not a styling choice.

**The director** fixed the wall label's reading order as a shot list
(identification before vitals before story before receipts before door)
so every room presents in the same rhythm, and gave the crosshair its
role as the site's only cursor-borne status.

**The curator** verified the stamp inventory against the room chapters,
ruled that seals never appear outside the archive at reduced solemnity,
and confirmed the CJK first-citizen clause matches the data layer's
actual localization design (EN base, KO/JA overlays, English seals and
codes throughout).
