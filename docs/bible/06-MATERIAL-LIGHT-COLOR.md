# Chapter 06 — Material, Light & Color

> Visual Design Bible · SITE 009 · The Architecture of Software
> Governed by the constitution: [`docs/ARCHITECTURE_OF_SOFTWARE.md`](../ARCHITECTURE_OF_SOFTWARE.md)
> This chapter codifies the physical world the room chapters inhabit. The constitution's token table is the color law; this chapter gives each token its material body and its behavior under the site's one sky.

## The Palette as Law

Seven tokens, and the whole world made from them:

| Token | Hex | Body |
|---|---|---|
| `--paper` | `#F2F1ED` | the sheet, the void, resin's cousin |
| `--concrete` | `#C8C4BC` | mass fill — walls, slabs, foundations |
| `--graphite` | `#2A2C2E` | every resting line, every annotation, body text |
| `--ink` | `#0E0F10` | titles and the deepest text only |
| `--blueprint` | `#1E3A5F` | the checker's pen — rare emphatic notes, never surfaces |
| `--steel` | `#8B9198` | metal's color family (scene aluminum sits nearby at `#A8ADB4`) |
| `--signal` | `#2F6BFF` | interaction, and interaction only |

Two working values extend the family without joining the law: **resin**
`#E8E6E1` (paper's solid form — plates, plinths, the thesis wall) and the
**survey grid** `#D0CEC8` (the sheet ruled a half-step darker than
itself). Both are derivatives of `--paper`, not new colors. Nothing else
may be mixed. There is no accent color, no success green, no warning
amber; the site has exactly one saturated hue and it answers to the
visitor alone.

> Implementation note (Wave 1): the built scene currently carries signal
> as `#1A6BFF`; the constitution says `#2F6BFF`. The constitution wins —
> the scene constant is to be corrected, not the law.

## The Four Materials

**Concrete** — `#C8C4BC`, roughness 0.85–0.92, metalness 0. The voice of
permanence. It takes the key light flatly, refuses highlights, and holds
shadow without approaching black; its darkest legitimate value is a
mid-gray, because the site's darkness budget belongs to line, not to mass.
Concrete is never textured with noise or grain at model scale — a cast
maquette wall is smooth — and never polished.

**White resin** — `#E8E6E1`, roughness 0.70–0.80. The voice of the model:
floor plates, plinths, the thesis wall, the identity plate, drawer faces.
A half-step warmer and brighter than concrete, with a slightly softer
roll-off at its highlight — the difference between cast mineral and cast
polymer, legible only where they meet, which is exactly where it should
be legible. Resin carries all text and all exhibits; it is the site's
paper made solid, and engraving on it reads graphite-dark, as ink on
paper does.

**Brushed aluminum** — `#A8ADB4`, roughness 0.45–0.50, metalness
0.30–0.35, brushing always along the member's long axis. The voice of the
machine: columns, instruments, racks, risers, pulls, posts. Its sheen is
a soft lengthwise gradient under the key — never a hotspot, never a
mirror; environment reflection is capped low enough that the metal reads
as *finished*, not *chromed*. Wherever aluminum appears, something works
there; the material is a functional claim and must not be spent on
decoration.

**Glass** — `#B8C4D4`, opacity ≈ 0.35, roughness ≈ 0.15. The voice of
invitation: the lobby curtain, the greenhouse envelope, the pavilion's
three roofs. Glass is a *plane with a tint* — one honest transmission
step, softening what lies behind it by exactly one register — and never a
blur, never frost-as-effect, never refraction theater. Its opacity may
step down in laminations (the pavilion's three roofs run one half-step
apart) but each pane remains a readable plane.

## The One Sky

The site is lit once, for everything. A warm **key** from high south-east
(scene direction ≈ [8, 14, 6], intensity ≈ 0.85) models every mass; a
cool **fill** from the north-west (≈ [−6, 8, −4], ≈ 0.25) keeps shadowed
faces legible; a generous ambient (≈ 0.72) holds the world's floor of
brightness high, because a drawing is never underexposed. There are no
other lights — no spotlights, no rim lights, no colored light, no
per-room rigs — and the sun never moves. Rooms differ by *architecture*:
what their walls admit, block, filter, and bounce.

The sky's derived conditions, codified from the room chapters: **borrowed
light** in the basements — illumination arriving only through the hatched
cut, brightest at the opening, falling to legible dim at the edges; B2
receives it twice-diminished. **Filtered light** wherever glass
intervenes — one register of softening per pane, three in the pavilion's
lantern-glow. **Even light** for documents — the archive wall and every
specification plate sit in flat, unraking brightness, because labels are
for reading. **Merged light** on the roof — with nothing left to shade,
key and fill fuse into sourceless white, and the void becomes fog by
running out of references.

## Shadow

Shadow in SITE 009 is drawn, not dramatized. Every shadow is soft-edged,
pale, and short — the shadow of a model on a studio table under diffuse
skylights — and the doubled edge where key and fill disagree is welcome:
it is the signature of the two-source truth. Shadows never approach
black; their floor is a graphite-tinted gray. The catalogue of meaningful
shadows the rooms rely on: the shadow gap (the model-maker's reveal,
outlining every plate and plinth), the column diagonals on the lobby
floor, the rack-row rhythm in the warehouse, the lengthening stage
shadows of the timeline hall, the gantry's threshold line, the floating
gap under the serverless floor, and the three parallel hairlines of the
pavilion's lamination. How shadows are achieved is the roadmap's problem
(baked, blob, or mapped); how they *read* is fixed here.

## The Ink Theme

The site ships a second state — INK — toggled from the chrome, and it is
not a "dark mode": it is the same drawing printed as a negative. The
sheet turns to deep ink (`--ink` family), lines and lettering turn to
paper-white, the grid persists a half-step lighter than the ground, and
the masses drop to their line-and-value skeletons: concrete and resin
read as tones barely off the ground, aluminum keeps a whisper of sheen,
glass a whisper of tint. Signal blue stays signal blue in *hue* across
both prints, because the visitor's attention does not change color at
night — though on the INK ground it may lift to a lighter tint of the
same hue (`#4D8DFF`) so text-scale signal passes Chapter 08's contrast
law. *(Revision note, Wave 1: amended from "exactly signal blue" when
implementation showed `#2F6BFF` on `#0E0F10` fails legibility at label
sizes; per Chapter 09's deviation protocol, this chapter changed before
the code did.)* The INK state must never introduce glow, bloom,
or neon grammar; it is a blueprint's ancestor, not a cyberpunk poster.
Print (the R-series) is exempt from both themes and keeps its own
committed drawing-set ink, per the constitution.

## Color Conduct

Rules the rooms already obey, stated once: signal appears only as a
consequence of attention and dies with it. Blueprint ink writes rare
checker's notes and never fills a surface. Grades, marks, and receipts
carry no evaluative color — a C is graphite like an HD, and there is no
red, no green, no gold anywhere in the building. Seals emboss; they do
not gild. The one number set in `1 / 620` is set in the same graphite as
everything else, and it needs nothing more.

## Critique

**The Awwwards juror** called the palette's poverty its luxury and asked
that the chapter say so operationally — hence the "darkness budget
belongs to line" rule and the no-evaluative-color law, which together are
why the site cannot drift toward dashboard idiom even under feature
pressure.

**Ando's chair** wrote the sky's derived conditions into law (borrowed,
filtered, even, merged) so that atmosphere is always earned by
architecture, and struck a proposed per-room exposure tweak — one sun,
one exposure, rooms differ by what they build.

**Rams' chair** demanded numbers on every material (roughness, metalness,
opacity bands), capped aluminum's reflectivity at "finished, not
chromed", and confined resin and grid to derivative status so the token
law stays seven lines long.

**The director** shaped the INK theme's doctrine — a negative print, not
a night scene — and kept signal blue invariant across themes, because
the visitor's attention is the one thing the site never restyles.

**The curator** collected the shadow catalogue from the room chapters so
implementation can treat each named shadow as an acceptance item, and
flagged the built scene's `#1A6BFF` signal against the constitution's
`#2F6BFF` as this chapter's one standing correction (noted above).
