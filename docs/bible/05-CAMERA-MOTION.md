# Chapter 05 — Camera & Motion

> Visual Design Bible · SITE 009 · The Architecture of Software
> Governed by the constitution: [`docs/ARCHITECTURE_OF_SOFTWARE.md`](../ARCHITECTURE_OF_SOFTWARE.md)
> This chapter codifies the camera and motion rules the room chapters (04) use in prose. Where a room chapter and this chapter disagree on a number, this chapter wins; where either disagrees with the constitution, the constitution wins.

## The Projection

One camera, orthographic, always. Its frustum is fixed at a half-height of
twelve world-meters (width following the viewport's aspect), near plane at
0.1, far at 200. Depth of view never changes; *zoom* is the orthographic
kind — a change of scale, not of lens — and it is the only "focal" word in
the site's vocabulary. There is no perspective camera anywhere, in any
state, for any effect, including transitions: the constitution's ban is
total, and the reason is doctrinal (Chapter 01): parallel projection is
testimony. Consequences the whole design leans on: nothing foreshortens, a
meter reads as a meter at any distance, overlap and shadow carry all depth,
and a camera move feels like a drawing sliding under a camera stand —
which is exactly the feeling the site wants.

## The Stations

The camera does not roam; it *resolves* — always at one of the named
stations, or traveling between two of them. Each station is a drawing in
the set: a fixed position, gaze target, and zoom, composed once and never
improvised. The canon:

| Station | Position (x, y, z) | Gaze | Zoom | Note |
|---|---|---|---|---|
| BOOT | 18, 22, 18 | 0, 1, 0 | 28 | the maquette whole, high diagonal |
| LOBBY | 14, 16, 14 | 0, 1.2, 0 | 36 | the reading distance; glass and thesis wall legible |
| LAB CROWD | 4.5, 5.5, 6.5 | 0, 1.4, −2 | 72 | the workbench register |
| LAB IOTBAY | −4.5, 5.5, 6.5 | mirrored gaze | 72 | crowd's mirror across the short axis |
| LAB FARM | 4.5, 8.5, 6.5 | one plate up | 72 | the greenhouse, raised diagonal |
| LAB GUNDAM | −4.5, 8.5, 6.5 | one plate up | 72 | the house, raised mirror |
| LAB EPHEMERAL | 0, 8.5, 7.5 | frontal | 72 | the one frontal lab — gallery presentation |
| TIMELINE | 0, 4.5, 12 | along the bay line | 56 | frontal elevation; lateral pan with stops |
| CORE | 6, 0.5, 6 | below the slab line | 64 | into the opened poché |
| SERVER | 6, −1.5, 6 | the aisle line | 68 | deepest station |
| ARCHIVE / LIBRARY | 4.5, 11, 6.5 | the drawer line | 66 | one westward pan between the two rooms |
| ROOF | 0, 14, 9 | the plate line | 56 | building below the frame's waist |

Positions for rooms not yet built are nominal — the composition each room
chapter describes is the binding truth, and the roadmap may adjust
coordinates to achieve it — but the *relationships* are law: labs share
the intimate zoom (72); mirrored labs mirror; EPHEMERAL alone is frontal;
descent stations sit low and oblique; TIMELINE and ROOF are the two civic
frontal views.

## Travel

All travel is one grammar: position, gaze, and zoom tween together on the
single ease `cubic-bezier(0.22, 1, 0.36, 1)` — fast out, long soft
arrival, no bounce, no overshoot, ever. Durations are a fixed menu, chosen
by the *meaning* of the move, never by its distance:

| Move | Duration | Meaning |
|---|---|---|
| Civic dolly (boot→lobby, floor→floor) | 1.1 s | crossing a hall |
| Threshold dolly (lobby→room) | 1.35 s | entering a room; the extra quarter-second is the doorway |
| Leaving a room (room→lobby) | 1.1 s | the reverse shot, always retracing the entry |
| Lateral pan (timeline stops, archive→library) | 1.1 s | reading sideways; hard stops, never free scroll |
| The roof ascent (L4→R) | 1.6 s | the journey's longest single move; quiet must be earned |

Two rules bind the menu. **Reversibility:** every entry has an exit that
retraces it — unmatched exits break continuity and are forbidden.
**Arrival:** when a move ends, it ends completely; the camera never idles,
drifts, breathes, or parallaxes at rest. A resting frame in SITE 009 is as
still as a printed sheet, and that stillness is what makes the next move
legible.

## The Motion Grammar

Everything that moves in the building moves in one of six verbs, all eased
by the single curve unless the verb itself is a drawing act:

**Ink-on** — a line drawing itself along its true length (the boot
footprint, 1.4 s; flow-traces; leader lines). Ink-on is not motion but
*drawing*: it moves like a hand, symmetric, accelerating across open
stretches and slowing into corners. This is the grammar's sole departure
from the single ease, permitted because the subject is the stroke, not
the camera or a mass — and it is the only one.

**Extrude** — mass rising from a drawn footprint (the boot's 1.8 s
raising; any future assembly of a room's exhibit). Extrusion is fast out
of the ground and settles like poured work finding level.

**Ortho dolly** — station-to-station travel, per the menu above.

**Assemble** — parts arriving into a composed whole (plates, labels, and
panels taking their places on arrival at a station; 0.3–0.5 s, staggered
at most 80 ms apart, never cascading longer than half a second in total).

**Isolate** — the future floor-focus move: the selected floor holding
full presence while the rest of the building thins toward line. Isolation
is a change of line weight and opacity, not of position — nothing flies
apart.

**Cut-reveal** — the section acts: the paper cutting away for the
basements, hatched edges appearing at the cut. Cut-reveal is the only verb
that removes matter, and it removes it the way a drafter erases: cleanly,
along a rule.

Micro-choreography inherits the verbs: the archive drawer slides a hand's
width (ortho dolly at furniture scale, 0.4 s); the Gundam trace holds one
readable beat (~0.25 s) at the lockset before continuing; the signal
current dies instantly on attention's exit everywhere, and *most* instantly
at the pavilion, where stillness is the exhibit's subject.

## What Motion May Not Do

No bounce, spring, elastic, or overshoot — the ease menu is closed. No
idle loops: nothing rotates on a turntable, no light breathes, no particles
drift while the visitor rests. No scroll-driven camera: travel is chosen,
not accumulated. No motion whose absence loses information: every animated
sequence terminates in a pose that teaches the same facts standing still —
this is the reduced-motion contract, and it is testable.

## Reduced Motion

`prefers-reduced-motion` converts the site from film to sheet set: every
travel becomes a hard cut to the destination station's final pose; the
boot resolves instantly to the completed building with labels placed; the
flow-traces render as fully-drawn signal lines while hovered instead of
animating; the drawer opens open. Cuts are instant — a slow fade is still
motion. Nothing is omitted, nothing is substituted; the visitor flips
drawings instead of watching dollies, and the set was designed to be read
both ways from the start.

## Critique

**The Awwwards juror** pressed on sameness — twelve stations and one ease
risk monotony — and the chapter answers with the duration menu keyed to
meaning (a threshold costs more than a hall; the roof costs most) and the
two frontal exceptions (TIMELINE, EPHEMERAL) placed where frontality *is*
the meaning. Variety lives in composition, not in easing.

**Ando's chair** contributed the arrival rule: complete stillness at rest,
stated as the condition that makes movement legible. The chair also struck
a proposed slow ambient zoom at the boot's end — the model holds still,
and the visitor looks.

**Rams' chair** closed the ease menu — one curve, one exception (ink-on),
both justified by subject rather than taste — and collapsed a draft's
nine verbs into six by deleting synonyms. It also demanded the stagger cap
(80 ms) on assemble, because uncapped cascades are decoration.

**The director** built the reversibility law (exits retrace entries),
priced the roof ascent at 1.6 seconds so the ending's quiet is bought with
travel time, and ruled that pans have hard stops — a reading camera, like
a reading eye, lands on lines, not between them.

**The curator** verified the station table against every room chapter's
header, confirmed the nominal-coordinates caveat points authority at the
compositions rather than the numbers, and endorsed the reduced-motion
contract's phrasing as a testable acceptance rule for the roadmap.
