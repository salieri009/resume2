# Room · B1 — The Mechanical Core

> Visual Design Bible · SITE 009 · Chapter 04 · Zone B1 · Tag `MECH · CORE`
> Camera station: CORE — low and oblique, looking into the opened ground (nominal 6, 0.5, 6 · zoom 64 · gaze below the slab line)
> Exhibit: skills as risers

## Program

B1 is the floor visitors are never shown, shown. Every building runs on a
mechanical level nobody photographs — the risers, the manifolds, the
labeled pipes — and every engineer runs on one too: the competencies that
carry load up into the visible rooms. SITE 009 exhibits its skills here,
below grade, as building services, under the constitution's rule for this
zone: *skills as risers and pipes, signal current on hover*. The room's
argument is disciplinary: a skill is not a badge; it is a pipe, and a pipe
is only real if it *goes somewhere*. Every riser in this room terminates
in a room above. A skill that reached no room would have no pipe — and
there is no such pipe here.

## Walking In

The descent is the site's one act of surgery on itself: the paper sheet
cuts away. As the camera drops below the slab line, the ground plane opens
along a drawn cut — its edges hatched in the fine diagonal of sectioned
solid, the drawing convention for *sliced* made literal — and the basement
reads inside the opened poché. Light does not follow the visitor down; it
leans in through the cut above, a borrowed wash from the one sky, brightest
at the opening and falling to the room's dim, legible edges. The air of
B1 is the air of every plant room: cool, still, and humming with implied
purpose. Its walls are raw concrete; its ceiling is the underside of the
lobby's slab, and knowing what stands on it is part of the room's weight.

## The Risers

Five vertical runs of pipe rise through the room on meter centers — brushed
aluminum, model-scaled, each seated in a concrete thimble at the floor and
passing through a sleeved penetration in the slab above. They are labeled
the way services are labeled, stencil-style, a letter and a trade:

**Riser a — ENTERPRISE.** The heaviest gauge in the room. Its stencil
carries the trade's tools — Java, Python, C#, C++ — and its pressure
gauge, a small dial plate fixed at reading height, is stamped with the
proof mark `SOFT DEV STUDIO · 95 HD`. The pipe penetrates the slab toward
the warehouse: its destination plate reads `SERVES · A-102 IOTBAY`.

**Riser b — AI / DEEP LEARNING.** Stenciled Neural Nets, CNN, YOLOv8,
PyTorch; gauge stamped `DEEP LEARNING · 68 C · SAGEMAKER`. It serves the
observatory — `SERVES · A-101 CROWD` — and its gauge is the room's honesty
test: a C, exhibited at the same size as the HDs, because a mechanical
floor does not curate its readings. The pipe's destination — the strongest
room in the building — says what the gauge alone cannot: the mark was a
beginning, not a ceiling.

**Riser c — CLOUD & DATA.** AWS, Docker, Data Engineering, PostgreSQL;
gauge `CLOUD/SAAS · 86 HD`; destination `SERVES · A-104 GUNDAM`.

**Riser d — GRAPHICS.** Three.js, GLSL, WebGL; gauge `COMPUTER GRAPHICS ·
81 D`; destination `SERVES · A-103 FARM`.

**Riser e — FRONTEND.** HTML/CSS, JavaScript, React, Next.js; gauge
`INTERACTIVE MEDIA · 82 D`; destination `SERVES · A-101 CROWD` — the
second pipe into the observatory, which is what a full-stack room looks
like from the basement.

Along the wall, apart from the five trades, runs a thinner conduit of a
different kind: **line f — INTERCOM**, the building's communication run.
Its stencil reads the human languages — Korean native, English fluent,
Japanese and German learning — and its gauge is not a course but a
commission: `ROK ARMY · INTERPRETER`. Its destination plate points to the
library above (`SERVES · L4 LIBRARY`), where three hundred and fifty
essays prove the line carries signal. The building speaks three languages
to its visitors; this is the pipe that makes that possible, and it is
exhibited as infrastructure, because that is what a language is.

## The Current

At rest the room is metal and stencil, the stillest exhibit in the
building. Under attention it becomes the constitution's promised spectacle:
hover a riser and the signal current runs it — the heavy blue tracing the
pipe from thimble to slab penetration and *through*, a pulse of current
leaving for the room it serves, while the riser's intro line surfaces as a
leader note: each line ties to a project shipped or a subject on the
transcript. The current always exits upward. Nothing circulates idly;
no flow animates unbidden; the plant room runs only when the inspector
lays a hand on it.

## The Flat Projection

In the 2D plan journey, B1 is a services plan: five circled riser symbols
on the grid with their trade letters, tag lines listing tools, gauge
readings as text, and destination arrows to the rooms served — plus the
intercom run along the wall. It is the drawing a services engineer would
actually produce, and it loses nothing the model has except the dark.

## Content Binding

| Surface described above | Data key |
|---|---|
| Riser trades a–e (names) | fixed labels matching the skill taxonomy (a. Enterprise … e. Frontend) |
| Stenciled tools per riser | skill tag sets (Java/Python/C#/C++ · Neural Nets/CNN/YOLOv8/PyTorch · AWS/Docker/Data Engineering/PostgreSQL · Three.js/GLSL/WebGL · HTML/CSS/JavaScript/React/Next.js) |
| Pressure gauges | `SKILL_PROOFS` (`src/data/academic.ts`) via `formatProof(proof, lang)` — enterprise 95 HD · ai 68 C · cloud 86 HD · graphics 81 D · interactive 82 D |
| Destination plates | proof-project mapping (iotbay · crowd · gundam · farm · crowd) |
| Room intro leader note | `STRINGS[lang].skillsIntro`; per-riser descriptions `.skillA`–`.skillE` (`src/data/strings.ts`) |
| Intercom line f | language set (KO native · EN fluent · JA/DE learning) · `ROK Army · Interpreter` · destination L4 Library (`LINKS.blog`) |
| Grade localization | `formatMark` KO/JA equivalence via `formatProof` |

## Critique

**The Awwwards juror** called skills sections the most lied-about surface
on the web and accepted this room on its two refusals: no proficiency
bars, no percentages — gauges stamped with real course marks including the
C — and the rule that every pipe must terminate in a real room. The
destination plates are the signature.

**Ando's chair** kept the dark: light enters only through the hatched cut,
and the room's far corners stay dim on purpose. A proposed second cut for
more light was struck — a basement that is fully lit is a showroom.

**Rams' chair** deleted a sixth and seventh decorative pipe (return runs
with no meaning), fixed the gauge as the one unit of proof, and demanded
the C be set at identical size to the HDs — the room's credibility is
priced in that single dial.

**The director** choreographed the current to always exit upward through
the slab — attention becomes supply, the basement feeding the rooms — and
gave the intercom line a separate, thinner voice so the human languages
read as a different trade, not a sixth skill.

**The curator** verified all five gauges against `SKILL_PROOFS`, the
destinations against the proof buttons of the existing skills exhibit, and
the intercom's commission against the credential record upstairs — then
required the b-riser's destination plate to do the interpretive work of
the C mark, rather than any apologetic caption.
