# Room · L1 — The Construction Hall

> Visual Design Bible · SITE 009 · Chapter 04 · Zone L1 · Tag `CUT · HALL`
> Camera station: TIMELINE — frontal to the building's long face, at hall height (nominal 0, 4.5, 12 · zoom 56 · gaze along the bay line), with a lateral pan reserved for walking the stages
> Exhibit: the degree as a construction sequence

## Program

L1 is the hall where time is exhibited as what this site believes time is:
a construction sequence. A résumé lists semesters; a building *is built* in
them. The hall therefore shows one small building — the degree — four times
over, at four moments of its own raising, the way an architect pins phase
drawings side by side: footings, structure, enclosure, topping-out. The
visitor walks past four states of the same object and reads three years of
work as a single continuous act of construction, which is the truest thing
the transcript has to say. The constitution's rule for this floor — 
*construction stages, not résumé cards* — is not a styling note; it is the
exhibit's entire logic.

## Walking In

The camera arrives frontal — the only hall met in elevation, because a
sequence reads left to right and the station honors reading. The hall runs
the building's long axis: a resin gallery floor, and on it, four plinths in
a strict row on meter centers, each carrying the degree-building at one
stage of its construction. Above each plinth, a session datum is ruled on
the wall the way level lines are ruled on a section — `2024 SPR`, `2025
AUT`, `2025 SPR`, `2026 AUT` — and the row is read beneath a single long
hairline that ties all four, the project timeline drawn as an actual line.
The lateral pan is this room's one extra camera word: the visitor may slide
along the row, dolly parallel to the wall, the stages passing like frames
on a light table. The pan snaps to plinth centers; the hall has stops, not
scroll.

## The Four Stages

The degree-building is a small axonometric massing — three block-stacks to
a floor, floors added as the semesters pass — and its stages are cast in
the palette's materials with a builder's honesty about what each moment
knew. Each stage is drawn the way a shop drawing draws a thing to be built:
**exploded**. At rest its floor-plates stand pulled apart up the assembly
axis, each joined to its seated slot by a dashed graphite leader — the
centre-line convention of an assembly sheet — so a resting stage reads as
parts waiting, not a finished pile. Only the exempt base holds its place;
found structure does not assemble.

**Stage zero stands under the first stage, not beside it.** Before the
first session plinth, half-sunk into the gallery floor, lies the exempt
layer: the three lowest blocks — programming, databases, networks —
rendered in concrete a shade darker than everything above, their edges
drawn but their faces unstamped. The plinth's caption reads `EXEMPT ·
EXISTING STRUCTURE, RETAINED`. This is the site's most honest architectural
sentence about a transcript: credit granted for prior knowledge is
foundation found on site — load-bearing, pre-dating the drawings, kept.

**Stage one — `2024 SPR` — is footings and first floor.** On the exempt
base, the first three blocks land: cloud, architecture, game development,
white resin, freshly struck. Each block carries its mark stamped small on
its face in graphite — `Cloud/SaaS · 86 HD`, `Soft Architecture · 80 D` —
grades set as material test results, because that is what they are.

**Stage two — `2025 AUT` and `2025 SPR` — is structure.** The massing
doubles: data structures, graphics, media rise as the second lift, and the
first delivered fixtures appear — small aluminum plates fixed to the
massing's flank, each stamped with a shipped artifact and standing proud of
the surface like a nameplate: `THE FIVE FLOORS` on the autumn face,
`LE-RESTAURANT` on the spring face. Artifacts are the difference between a
course attended and a thing delivered, and the hall mounts only the
delivered.

**Stage three — `2026 AUT` — is topping-out.** The final lift: studio,
CI/CD, data engineering, and on its face the highest stamp in the hall —
`Soft Dev Studio · 95 HD` — with the industry plate `STEVTECH` fixed
beside it. The massing is complete, and above the fourth plinth, alone,
hangs the hall's terminal document: the completion plate, a single resin
sheet ruled like a certificate — `UTS BIT · COMPLETE · GPA 6.00/7.0 ·
WAM 80.31 · 144 CP` — the building signed off.

## Light

The one sky enters this hall along its length, and the four stages wear it
differently by nothing but their own mass: stage one throws a short, low
shadow; each later stage throws a longer one, so the floor itself records
progress as a lengthening of shadows down the row — time made visible twice,
once in the massings and once in what they cast. The exempt layer, half
below floor line, catches almost no key at all and sits in the cool of the
fill; foundations live in shade. The completion plate is set where the key
strikes cleanest, the brightest small surface in the hall, unlit by
anything but position.

## Interaction

The hall speaks the site's one language at two scales. Each stage answers
as a whole — crosshair, boundary to heavy signal blue, leader note
`ROOM · L1 · TIMELINE · <session>` — and within a hovered stage, each
block answers individually with its course line (full name, mark, grade,
localized equivalence for Korean and Japanese readers), a dimension string
of learning. The artifact plates answer as doors: signal underline, then
out — to the game, to the repository, to the partner. Hovering the exempt
layer yields its one caption and no marks; found structure has no test
certificates, and the hall does not invent them. Focusing a stage — by pan
or by hover — is the hall's build command: its exploded plates slide home
on the ink ease, the leaders retracting to nothing, the mark stamps landing
on their faces and the artifact plate reading only once the stage stands
assembled. Leaving it lets the plates lift apart again. The pan between
stages runs on the single ease, 1.1 seconds plinth to plinth; the assembly
moves on the ink ease, the one sanctioned drawing-hand exception; reduced
motion cuts between poses — the focused stage seated, the rest exploded.

## The Flat Projection

In the 2D plan journey, the hall becomes what it always secretly was: a
phasing sheet — read top to bottom, the reading order the lateral pan drew
in space. The completion plate is the sheet's title block; the exempt base
is named once at its head, retained beneath all that follows; and each stage
is a stamped row carrying its top mark as a material test result and its
delivered artifact as a leader-noted tag (`▸`). The exploded assembly needs
no motion to survive the flattening: a phasing sheet is already parts laid
out apart, which is the same honesty by another projection.

## Content Binding

| Surface described above | Data key (`src/data/academic.ts` unless noted) |
|---|---|
| Session datums / spans | `TIMELINE_SPINE[]` (layer, session, span) |
| Stage massings (blocks per floor) | `AXONO_LAYERS[]` (id, session, blocks with label/size/position) |
| Exempt base | `TIMELINE_SPINE[0]` (session `'exempt'`), `AXONO_LAYERS[0]` (Prog / DB / Net) |
| Mark stamps per block | `SEMESTER_WAYPOINTS[].highlights[]` (short, mark, grade) via `formatMark(mark, grade, lang)` |
| Course lines on hover | `COURSE_HIGHLIGHTS[]` (code, name, session, mark, grade) |
| Artifact plates | `SEMESTER_WAYPOINTS[].artifacts[]` (The Five Floors · le-restaurant · StevTech, each with url) |
| Completion plate | `DEGREE` via `formatDegreePlate(lang)` |
| Grade localization | `formatMark` KO/JA equivalence tables |

## Critique

**The Awwwards juror** feared a timeline is where every portfolio goes to
die, and accepted the room only when the sequence became *one object aging*
rather than events on a line — four states of the same massing, with the
lengthening shadows as the signature no screenshot of a timeline component
could fake.

**Ando's chair** placed the exempt layer half below the floor and darkened
it — prior knowledge as buried foundation is the room's gravity — and
struck a proposed crane silhouette over stage three: the hall implies
construction; it does not play at a site.

**Rams' chair** ruled that marks be stamped as material test results (data,
small, on the face) rather than badges, that only *delivered* artifacts get
plates, and that the completion certificate appear exactly once, at the
end, unrepeated.

**The director** gave the hall its lateral pan with hard stops at plinth
centers — the one room whose camera reads like a rostrum shot across
drawings — and set the leader note to carry the hovered session so the
visitor always knows which year they are standing in. Granted the stages
their second motion word: at rest they stand exploded, and focus assembles
them home on the ink ease — the camera never moves for it, so the build
reads as the drawing's, not the lens's.

**The curator** verified every stamp against the record: stage massings
from `AXONO_LAYERS`, marks from `SEMESTER_WAYPOINTS`, the three artifact
plates with their live URLs, the completion plate's figures from `DEGREE` —
and insisted the exempt layer carry no invented marks, because an archive
that decorates its gaps cannot be trusted at its peaks.
