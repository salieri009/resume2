# Room · L3 / A-105 — The Pavilion

> Visual Design Bible · SITE 009 · Chapter 04 · Zone L2–L3 (rail: Laboratories) · Tag `A-105 · EPHEMERAL`
> Camera station: LAB EPHEMERAL — front-center of the upper plate, slightly nearer than the other labs (nominal 0, 8.5, 7.5 · zoom 72 · gaze at the roof line)
> Typology: **pavilion** · Exhibit: Project 05 — *EphemeralTime*

## Program

A-105 is a pavilion because the project is one: a light structure on the
grounds, built for no program but attention itself. EphemeralTime is the
portfolio's art piece — time rendered as a fluid that calms when you leave
it alone and roils when you stir it — but its label tells the deeper story:
it was *built as a small product, not a sketch*, with inversion-of-control,
object pools, and swappable render strategies holding up what looks like
weather. The room must therefore perform a double reading in one structure:
from the station it is the most delicate object in the building; one look
closer and it is the most rigorously framed. A folly, engineered.

## Walking In

The approach is the frontal one — the only lab the camera meets head-on,
centered, the pavilion presented like a piece on a gallery floor rather
than a bench in a workshop. The plinth is nearly square and mostly empty.
On it stands the lightest structure in SITE 009: an open pavilion with no
walls at all, its members the thinnest aluminum sections the model allows,
carrying a roof of three stacked translucent planes. Around it, space; the
pavilion is mostly air, and the composition gives it the whole frame so
the air counts.

## The Three Roofs

The roof is the architecture's translation of the project's shrewdest
engineering. EphemeralTime holds sixty frames by never repainting what has
not changed — a three-layer canvas where the background is drawn once, the
ink's history accumulates slowly, and only the live foreground moves. The
pavilion's roof states this exactly: three glass planes stacked with
visible air between them, each a half-step less opaque than the one below.
The lowest plane is fixed and fully frosted — `bgLayer · static`, the
painting that never repaints. The middle plane — `historyLayer` — carries
a faint etched mottling, the sediment of ink remembered. The top plane —
`activeLayer` — is the clearest, the surface where the present happens. A
micro caption at the eave reads them in order: `LAYERS · BGLAYER STATIC ·
HISTORYLAYER · ACTIVELAYER`. Visitors who build canvases will read the
roof and grin; everyone else sees a beautiful lamination and is not wrong.

## The Undercroft

Beneath the roof, the pavilion shelters its machinery, arranged as two
small courts. The **fluid court**: the p5.js plate at the fore, the Perlin
fluid field behind it as a low, wide mass whose top face is etched with a
hairline flow-field — dozens of short strokes bending across it like
combed grain, a frozen chart of the noise that moves the ink — and behind
that, the object pool: a rack of small identical blanks in strict rows,
pre-cast pieces waiting to be ink, the room's monument to the allocation
that never happens. The **clock court**: the audio block and the clock
block side by side, with the IoC container beneath them as the plain base
everything is wired through. A conduit crosses between the courts at the
fluid-clock line — the piece's secret, attention scaling time — and the
caption under the clock reads the hours' ritual: a sun drop every hour,
cymatic rings at the quarters, all of it synthesized, `0 ASSETS`.

## Light

The one sky makes this room's weather. The key passes through three
successive translucencies and arrives on the undercroft as the softest
light in the building — triple-filtered, almost shadowless, the glow of a
paper lantern at noon. Each roof plane lays its own faint edge-shadow on
the plane below, three parallel hairlines of shade that read as the
lamination's section. The pool's rack of blanks catches the diffuse light
evenly — no glints; these are pieces in waiting, not treasure — and the
etched flow-field on the fluid mass shows only as a change of sheen until
the visitor's eye is close. The pavilion's floor holds the pale pooled
brightness of light that has been strained three times. Nothing in the
building is lit more gently, and nothing needs to be.

## The Specification Plate

The label opens with `case_studies/05_ephemeral_time` · `05 ·
Computational Design`, the title **EphemeralTime**, summary, and vitals:
role (*Solo — concept, simulation, architecture*), team (*Solo*), period
(*2025*), outcome (*Real-time fluid + audio synthesis, zero assets*). The
tool rack is the strangest in the building and is set proudly: p5.js,
Perlin noise, generative audio — then three architecture patterns, IoC
container, object pool, strategy pattern, listed as tools because in this
project they were.

The narrative tells the two performance stories: garbage-collection
stutters breaking the pacing, answered by the pre-allocated pool and
factory that cut pauses by half to two-thirds; and full-canvas repaints
making layered ink impossible, answered by the three-layer pipeline the
roof above is built from. The three decisions (pool + factory, the
three-layer canvas, synthesis over assets) and the one refusal (WebGL
shaders — p5.js stayed readable as a study piece) carry their reasons; the
results band stamps `GC pauses −50~70%`, `60fps · thousands of particles`,
`0 media assets`; the lessons close with the line that could caption the
whole portfolio — *architecture patterns still earn their keep in art
projects* — and the repository door ends the plate, door only, no receipt
chips: a folly's provenance is the folly.

## Interaction

The one language, at its quietest and most fitting: crosshair over the
pavilion, its eave line to heavy signal blue, leader note `ROOM · L2 ·
PROJECT 05 · EPHEMERAL`. The hover trace is this room's poem: the piece
itself converts attention into turbulence, and the site's grammar already
does exactly that — blue current only while attention rests. On hover the
trace runs both courts (p5.js down through the fluid to the pool; clock
down to the IoC base) and the cross-conduit between them carries the beat:
attention reaching the clock, time quickening. The roof planes do not
answer separately; their caption does. When attention leaves, the pavilion
returns to stillness faster than any room — instantly — because stillness
is what this exhibit is *about*. The site never simulates the artwork's
fluid on the plinth: the ban on fake telemetry protects the piece's
integrity, and the live thing is one click away behind the door.

## The Flat Projection

In the 2D plan journey, A-105 is a roof plan with a ghost: the three roof
planes drawn as nested outlines at three line weights (heaviest the static
base, lightest the active top), the two courts in dashed plan beneath
them, the pool's rack as a ruled grid of identical cells, and the layer
caption at the eave. The full specification plate sets beside it.

## Content Binding

| Surface described above | Data key (`src/data/projects.ts` → `PROJECTS.ephemeral` unless noted) |
|---|---|
| File line | `.crumb`, `.category` |
| Title / summary | `.title`, `.summary` |
| Vitals block | `.role`, `.teamSize`, `.period`, `.outcome` |
| Tool rack | `.stack` |
| Overview / role detail | `.overview`, `.roleDetail` |
| Problems ↔ answers | `.problems[].p` / `.problems[].s` |
| Decisions / refusal | `.decisions[]`, `.tradeoffs[]` |
| Results band | `.results[]` |
| Lessons / future | `.lessons[]`, `.future[]` |
| Repository door | `.github` (no `.receipts` — door only) |
| The two courts | `.layers[]` (core / simulation / canvas blocks) |
| Court traces & cross-beat | `.flows.risers[]`, `.flows.conduits[]` (Perlin Fluid ↔ Clock: attention scales sim speed) |
| Trace reading order | `.diagram[]` (Clock Events → Perlin Fluid Field → Particle Pool → Render Strategies → Generative Audio) |
| Roof caption | `.shipping` (label `Layers`; ports bgLayer · static → historyLayer → activeLayer) |
| Typology | `.arch` (`'pavilion'`) |
| Localized label text | `getLocalizedProject('ephemeral', lang)` overlays for KO / JA |

## Critique

**The Awwwards juror** called this the room most likely to win the site an
audience and most at risk of kitsch, and drew the line precisely: the
pavilion may *be* beautiful but must never *perform* — no ambient ink, no
idle ripples. The three-roof lamination and the instant return to
stillness were judged the signature; the juror also kept the refusal to
simulate the artwork on the plinth as a stated principle, not a limitation.

**Ando's chair** did its deepest work here: light strained through three
translucencies, members at minimum section, and most of the plinth left as
air. A proposed reflecting pool under the pavilion was struck — water is
scenography; the piece's fluid lives behind the door.

**Rams' chair** demanded the object pool be depicted as identical blanks
in rows (pre-allocation shown, not told), set the three architecture
patterns in the tool rack as tools without apology, and cut a proposed
kinetic clock hand — the clock court is blocks and caption, and the ritual
lives in text.

**The director** found the room's poem — the site's own hover grammar
mirrors the artwork's thesis (attention becomes motion) — and built the
interaction section around that rhyme: cross-conduit as the beat, instant
stillness on exit, the fastest cooldown in the building as a directed
choice.

**The curator** verified the roof caption, the courts, and the cross-beat
against `shipping`, `layers[]`, and `flows[]` respectively; confirmed
door-only provenance; and ruled that "0 assets" appears exactly twice —
once in the clock caption, once in the results band — the room's one
number worth repeating.
