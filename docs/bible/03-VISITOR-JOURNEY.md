# Chapter 03 — The Visitor Journey

> Visual Design Bible · SITE 009 · The Architecture of Software
> Governed by the constitution: [`docs/ARCHITECTURE_OF_SOFTWARE.md`](../ARCHITECTURE_OF_SOFTWARE.md)

## Arrival — the Empty Sheet

The site opens on nothing, and the nothing is deliberate. A warm white
field fills the frame — not a loading screen, not a splash, but a sheet of
paper seen from above and slightly aside, lit and waiting. There is no
sound, and there will never be sound the visitor did not cause. For a
breath, nothing happens. That breath matters: it is the pause of a drafter
squaring up to a fresh sheet, and it tells the visitor the pace of this
place before a single element appears. In the corners, almost too small to
notice, the stamps fade in — `SITE 009`, `SALIERI`, `ORTHOGRAPHIC MODE`,
`REVISION A` — the way a title block is already printed on the sheet before
the first line is drawn.

## The Boot — Ink, then Mass

Then the line. From one corner of an invisible rectangle, a single graphite
stroke begins to travel — along eight meters, a hard turn, along six, and
around — drawing the building's footprint in one continuous pass, 1.4
seconds end to end, easing through its middle like a hand that accelerates
across the open stretch and slows into the corners. This is the CAD Line
tool made ceremonial: the visitor watches the exact gesture every drawing
begins with, at a speed slow enough to savor and fast enough to promise
this site respects their time.

The moment the stroke closes its loop, the drawing stands up. The footprint
extrudes — ground slab first as a plinth of concrete, then the four walls
rising together, the resin plate lifting through them, the aluminum columns
landing 0.4 meters inside the corners, the glass curtain condensing across
the south face, the roof plate settling last like a lid checked twice. The
whole raising takes 1.8 seconds on the site's single ease — fast out of the
ground, gently decelerating into place, no bounce, no overshoot; a
building, not a jack-in-the-box. Then 0.35 seconds of stillness, held on
purpose: the model complete, the shadow soft on the paper, the site letting
the visitor look. Precision first, then wonder; the order is never
reversed.

## The Camera — Stations, not Wandering

The camera of SITE 009 does not wander and cannot be steered off course. It
moves between **stations** — fixed orthographic viewpoints, each one a
drawing in the set — the way an architect flips between named views, except
that here the flip is a continuous parallel dolly and the sheet never
leaves the visitor's hands.

The first station is **BOOT**: high and diagonal, out at (18, 22, 18)
looking to the building's heart, zoomed wide so the structure sits small
and whole on its paper, a maquette on a table seen standing. The second is
**LOBBY**: the same diagonal family, drawn in to (14, 16, 14) with the zoom
tightened a third, close enough that the glass curtain, the thesis wall
through it, and the floor rail of the interface all become legible — the
station of reading. Each room adds its own station; the Crowd laboratory's
sits low and near at (4.5, 5.5, 6.5), zoom doubled again, the aerial view
giving way to something like standing at the lab's threshold.

Travel between stations is one grammar with no exceptions: position, look
target, and zoom tween together on `cubic-bezier(0.22, 1, 0.36, 1)` — 1.1
seconds for the civic moves (boot to lobby, floor to floor), 1.35 seconds
for the intimate one (lobby into a room), the extra quarter-second being
the difference between crossing a hall and crossing a threshold. Because
the projection is parallel, these moves feel like nothing else on the web:
no perspective rush, no fisheye swim — the world slides and scales like a
drawing under a camera stand, and the visitor's inner ear stays level. The
camera never orbits for pleasure, never idles, never breathes fake life.
When it moves, it moves because the visitor asked; when it arrives, it
stops completely.

## Entering — the Lobby

The dolly from BOOT to LOBBY is the entrance sequence. As the building
grows in frame, its labels grow into legibility with it — the floor rail
resolves along the left edge like a section keyed to the sheet, and the
lobby's glass face catches the key light. The visitor is not teleported
indoors; the orthographic camera honors the model by never clipping through
its walls. Instead, arrival at the lobby station *is* entry: at this zoom,
through that glass, the thesis wall reads plainly, and the lobby's panel of
text (Chapter 04 · L0) takes the foreground. The visitor has walked up to
the model close enough to read its ground floor, and the ground floor was
built to be read at exactly this distance.

## Moving Between Floors

The floor rail is the visitor's key plan: floors stacked in section order —
R at the top, L4, L2·L3, L1, L0, then B1, B2 below — each labeled with its
code and program. Choosing a floor is choosing a drawing: the camera dollies
to that floor's station, and floors that are not yet built (this is a
working site; `REVISION A` promises revisions) are listed but disabled,
their labels at half strength — honest scaffolding, never hidden. When a
floor holds several rooms, its rooms unfold beneath it in the rail as
A-series tags, and the hover language is everywhere the same: crosshair
cursor over anything answerable, signal-blue heavy edge on the answering
thing, a micro annotation naming what the eye is on — `ROOM · L2 ·
PROJECT 01 · CROWD` — set like a leader note pointing off a detail.

## Entering a Room

A room entry is the intimate move, and it is choreographed as one shot with
three beats. First, *commitment*: the visitor clicks the hovered mass; its
signal edge holds. Second, *approach*: the 1.35-second dolly-and-zoom, the
building's other masses sliding out of frame edge-on, the chosen room
growing until its plinth and instruments compose the whole view — the
orthographic equivalent of stepping through a door, achieved without a
door. Third, *presentation*: as the camera settles, the room's
specification panel takes its wall of the frame — title, role, period,
stack, outcome, decisions, receipts — the museum label at full size beside
the exhibit. Leaving reverses the shot to the lobby station in 1.1 seconds;
the building reassembles around the visitor's retreat, and nothing they did
inside is left glowing.

## The Print Threshold

One door in the building leads to paper. The `DOC` control opens the print
drawer: the same identity in its flat projection — the R-series résumé
sheets, ready to print as a two-page drawing set. The transition is not
spatial but material: the building holds still, and the sheet slides over
it the way a drawing is laid over a model on the same table. Closing the
drawer lifts the sheet away; the model has not moved. The visitor learns
that screen and print are one document, which is the brand's deepest claim
about rigor.

## Leaving — the Teardown

When the visitor exits — the roof's farewell, or the final act of the
journey when it ships — the building does not fade. It is *undrawn*, in the
exact reverse order of its construction, one register at a time: material
surrenders first (concrete, resin, aluminum, glass dissolving to a solid
white massing), then the massing thins to wireframe, the wireframe drops to
blueprint-weight lines on the sheet, the lines retract into the single
footprint stroke, and the stroke un-draws itself back to its first corner.
Each register holds just long enough to be read as a state, the whole
teardown breathing out over roughly four seconds on the single ease. The
stamps are the last to go. Then the sheet is empty again — not blank as in
*nothing happened*, but blank as in *the drawing has been rolled up*. The
site's last image is its first one, and the symmetry is the goodbye.

## The Journey Without Motion

For the visitor who asks for reduced motion, the site does not offer a
degraded film; it offers the drawing set directly. Every sequence above has
a terminal pose, and reduced motion cuts straight to poses: the boot
resolves instantly to the completed building, station changes are cuts
between drawings (as an architect flips sheets), room entry lands
immediately at the room station with the specification panel present. Cuts
are instant, never eased, because a slow fade is still motion. Nothing
informational lives only in the animation; whatever a transition would have
taught, the arrived state teaches standing still.

The same honesty governs the small screen and the machine without WebGL:
the journey collapses into its native projection — the 2D plan. The floor
rail becomes the drawing index, each floor a plan view, each room a
labeled outline that opens its specification panel in place. The plan
journey is not the 3D journey's understudy; it is the same building,
projected flat, with every room, every label, and every receipt intact.

## Critique

**The Awwwards juror** challenged the room-entry shot as the make-or-break
moment — every 3D portfolio has a "zoom into project" move, most of them
mushy. The rewrite fixed it as a three-beat shot (commitment, approach,
presentation) with the quarter-second threshold distinction, so the move
has authored rhythm rather than tweened default.

**Ando's chair** added the held stillnesses — the breath before the first
line and the 0.35-second hold after extrusion were durations in a timeline;
they are now named moments with meaning, and the chapter forbids the camera
to idle or breathe between them.

**Rams' chair** removed a proposed minimap and a proposed scroll-driven
camera path: the floor rail already *is* the key plan, and scroll-hijacked
travel violates the visitor's dignity doctrine of Chapter 01. Navigation
stays one instrument used two ways (rail and direct hover), not three
instruments.

**The director** demanded the teardown be blocked register by register
(material → massing → wireframe → blueprint → line → void) with the stamps
leaving last — the first draft dissolved everything at once, which reads as
a crash, not a farewell. The director also ruled that leaving a room must
reverse the entry shot, because unmatched exits break continuity.

**The curator** insisted the reduced-motion and 2D-plan journeys be written
as first-class exhibitions rather than fallbacks — the section now states
the principle that nothing informational may live only in animation, which
later chapters (and the roadmap) inherit as a testable rule.
