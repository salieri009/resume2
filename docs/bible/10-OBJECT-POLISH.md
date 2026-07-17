# Chapter 10 — Object Polish

> Visual Design Bible · SITE 009 · The Architecture of Software
> Stage 3.5 artifact, authored under Prompt C discipline: this chapter does
> not redesign anything. It raises the *drawn density* of every object the
> earlier chapters already specified, room by room, against the concept
> sheets' plates. The constitution and Chapters 05–08 remain law.

## The Principle — Detail Is Drawn, Not Modeled

SITE 009's objects are maquette masses on a paper sheet. Their detail
therefore comes from the three instruments a drawing has — **line, mark,
and shadow** — and never from geometric complexity. No bevels, no filleted
corners, no imported meshes, no normal maps pretending at relief. When an
object needs more presence, it earns it the way a drawing does: a firmer
edge, an engraved label, a truer shadow. This keeps the model honest
(Chapter 01), the budget flat (Chapter 09 §4), and the INK print free —
every drawn detail inverts automatically with the palette.

Three techniques carry the whole chapter:

**① Edge ink.** Every mass receives its resting edge as a drawn line —
`drei <Edges>` line segments in the palette's graphite at hairline-to-medium
weight, computed once per geometry (threshold ≈ 15°, static). This is the
line-weight hierarchy of Chapter 07 extended into the third dimension: the
survey grid stays hairline, mass edges read medium, the active boundary
alone goes heavy signal. Under isolate, the mass fades but **its edges
hold** — "the rest of the building thins toward line" (Chapter 05) becomes
literal: the ghost shell is line surviving mass.

**② Engraving.** Any text or graphic that lives ON a surface — a stamp on a
block face, a seal on a drawer, a waveform on a specimen plate — is a
canvas-texture engraving, the technique proven by the roof's identity
plaque (`RoofPlate.tsx`): draw once to a canvas in palette colors,
`CanvasTexture` with `SRGBColorSpace`, `toneMapped={false}`, dispose on
unmount. Engravings replace floating `CaptionPlate` chips wherever the
text belongs to the object rather than to the air beside it; captions
remain for leader-notes and annex-style annotations. Engravings re-render
on language/theme change — but stamps stay English (Chapter 07), so most
engrave once.

**③ The shadow catalogue.** Chapter 06 names every meaningful shadow; each
room's punch list below closes its gaps with authored `BlobShadow`/gradient
planes — never runtime shadow maps.

A fourth instrument — **brushing sheen** (a lengthwise roughness-gradient
map on aluminum) — is sanctioned but deferred to a later wave; it is the
only texture that simulates material rather than drawing, and it must be
subtle enough to survive the working-drawing test.

## Global Passes (wave one — this revision)

1. **`InkEdges`** primitive: a palette-aware `<Edges>` wrapper (graphite,
   lineWidth ~1, threshold 15°). Applied to: shell walls, slabs, columns,
   thesis wall; every exhibit's primary masses (plinths already carry their
   drawn boundary — plinth slabs get edges, boundary line stays the hover
   surface).
2. **`textures.ts`**: shared engraving kit — `makeEngraving(draw, w, h)`
   plus ready-made `labelTexture(lines)` (drafting mono block) and
   `sealTexture(text)` (the archive's circular embossed seal: double ring,
   uppercase mono around the center, palette resin ground and graphite
   ink).
3. **First engravings** (highest value): the construction hall's block
   top-face labels (`AXONO_LAYERS[].blocks[].label` — Prog, Cloud, DSA,
   Studio…), and the archive drawers' circular seals replacing their flat
   caption chips.

## Per-Room Punch Lists (wave two — issues)

Each item cites its concept sheet; acceptance is that sheet's plates.

**A-101 Crowd** — slit aperture gains a 20 mm engraved reveal line around
it (the eye's frame); register masses get InkEdges; gateway shoulder sheen
waits for the brushing wave.

**A-102 IoTBay** — hairline dividers engraved between the eight DAO bays
(one engraving across the rack face, eight ruled cells); the gantry beam
gets a small engraved tally `118 E2E · 14 SEC`; container block edge ink at
medium weight (it cleared inspection; it may be firm).

**A-103 Farm** — the aurora specimen plate's etched waveform (engraving:
layered hairline sine bands, graphite on resin — the room's strongest
pending image); glazing-bar shadows as thin gradient strips ruled across
both beds (the concept's tone-8.5 stripes); seedling tray cells scribed as
a 6 × 4 engraved grid on the tray plate.

**A-104 Gundam** — the top story's scored opening deepens: engrave a
door-leaf outline and threshold tick inside the shade rectangle; the
floating gap's shadow becomes one crisp dark rule (gradient strip under
the Chalice floor); lockset gets edge ink so the held beat has a drawn
target.

**A-105 Ephemeral** — the Perlin mass's combed flow-field (engraving:
short curved strokes bending across the top face, hairline); the middle
roof's historyLayer mottling (a faint speckle engraving at 8 % opacity);
pool blanks stay unmarked — waiting pieces carry no ink.

**L1 Timeline** — block top labels (wave one); mark stamps engraved on
block faces at the hovered stage (replacing part of the caption load);
the completion plate becomes a proper engraving in the RoofPlate manner.

**B1 Core** — gauge plates become engravings (trade letter, stencil
tools, proof mark, destination — four ruled lines on the resin plate);
riser sleeves get edge ink; the stencil voice belongs ON the metal, so
riser trade letters engrave onto the pipe faces at reading height.

**B2 Server** — the named cabinet's stencil engraves onto its door
(`SYS · SALIERI009` and the address line), replacing the floating chip;
the three blank cabinets stay blank; the bare patch stays uncaptioned
forever.

**L4 Archive/Library** — circular seals (wave one); the opened drawer
gains a document engraving (issuer/title ruled lines) on its tray floor;
the library desk top gets a faint writing-patch engraving where the light
falls.

**R Roof** — reference implementation; only InkEdges on posts and plate.

## Budget & Conduct

Edges geometries are computed once per geometry instance and shared where
geometry repeats (bays, blanks); engraving canvases are ≤ 512 px on their
long side, disposed on unmount, and regenerated only on language or theme
change. Nothing animates that did not animate before; `frameloop` stays
`demand`; the doctrine spot-checks (no rest-state saturation, no idle
motion) remain the fastest failing tests. Any punch-list item that cannot
be achieved by line, mark, or shadow returns to the bible for an amendment
before it returns to code.

## Critique

**The Awwwards juror** endorsed the constraint as the signature: a 3D site
whose detail pass adds *no geometry* is a claim nobody else is making —
and the ghost-shell-as-surviving-line reading turns the isolate verb into
the site's best screenshot.

**Ando's chair** kept the pool blanks unmarked and the bare patch
uncaptioned — polish must know where to stop — and moved the brushing
sheen to a later wave: material simulation is the slipperiest slope this
site walks.

**Rams' chair** demanded the engraving kit be one utility with two
presets, not five bespoke canvases, and capped canvas sizes; it also
insisted repeated geometry share its edge geometry.

**The director** ordered the wave split: line and label first (they change
every frame of the film), room-specific marks second — and fixed the
acceptance authority as the concept sheets' plates, not taste.

**The curator** verified every engraving in the punch lists binds to data
that already exists (`AXONO_LAYERS` labels, `CREDENTIALS.seal`,
`SKILL_PROOFS`, the IoTBay results), so the polish wave adds ink, never
copy.
