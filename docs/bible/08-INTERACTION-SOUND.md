# Chapter 08 — Interaction, Sound & Access

> Visual Design Bible · SITE 009 · The Architecture of Software
> Governed by the constitution: [`docs/ARCHITECTURE_OF_SOFTWARE.md`](../ARCHITECTURE_OF_SOFTWARE.md)
> This chapter codifies how the building answers — cursor, keyboard, and ear — and who it answers: everyone.

## The One Language

Every interactive surface in SITE 009 speaks a single hover language,
learned once in the lobby and never contradicted: the cursor becomes the
CAD crosshair; the surface's edge takes the heavy signal line; a leader
note names what the eye is on. Three words — crosshair, signal, note —
and their converse is equally law: whatever does not answer shows none of
the three. There are no secret hotspots, no surprise affordances, no
hover states invented per room. What varies by room is only the *dialect*
— what the signal does after the language is spoken:

| Room | Dialect on attention |
|---|---|
| A-101 Crowd | flow-trace runs the conduits in diagram order |
| A-102 IoTBay | two traces: picking route, or CI conveyor at the gantry |
| A-103 Farm | render-order trace down both beds; the vane's dashed drop |
| A-104 Gundam | spine trace with the held beat (~0.25 s) at the lockset |
| A-105 Ephemeral | both courts trace; instant stillness on exit |
| L1 Timeline | stage-level then block-level notes; artifact plates as doors |
| B1 Core | the current runs the riser and exits upward through the slab |
| B2 Server | one door outline, the deepest blue in the building |
| L4 Archive | the drawer slides a hand's width; one open at a time |
| R Roof | four engraved lines underline as doors |

Attention's end is as codified as its start: the signal dies immediately
when the cursor leaves — no afterglow, no fade-out longer than perception
— because lingering blue is sentiment, and the site spends none.

## Doors

Every outbound link is architecturally a **door**, and doors have one
grammar: signal underline (or door-outline) on hover, leader note naming
the destination's register (`SYS · GITHUB`, an artifact's label, an
address on the roof plate), and an honest exit — new context, no modal
interception, no "are you sure". The building's doors: the repository
doors on every specification plate, the artifact plates in the hall, the
library desk, the cellar's cabinet, and the roof's four engraved lines.
The print drawer (`DOC`) is the one interior door — it opens paper over
the model rather than leaving, and closes the same way.

## Choice and Route

Navigation is two instruments, no more. **The rail** — the key plan —
moves between floors and rooms by name; it is the deliberate instrument.
**Direct attention** — hovering and clicking the model itself — is the
curious one. Both arrive at the same stations by the same dollies, and
both write the same address: every location in the building has a hash
(`#/L2/crowd`), so any room can be linked, bookmarked, shared, and
arrived at directly, with the journey resuming from there. The back
gesture is honored: leaving retraces, floor by floor, exactly as Chapter
05's reversibility law requires. Unbuilt floors appear in the rail at
half strength and refuse politely — visible scaffolding, never a 404,
never a teaser.

One-at-a-time is the site's arithmetic of attention: one leader note, one
open drawer, one traced flow, one entered room. Nothing queues, nothing
stacks, and no interaction ever spawns a second thing to dismiss.

## Sound

SITE 009 ships silent, and the silence is a decision, not an absence: the
site opens on *no sound* by constitutional order, and REVISION A keeps
that state throughout. Silence is the acoustic form of the paper void —
the room tone of a drawing office after hours — and against it, the
visitor's own environment becomes the soundtrack, which is the most
honest ambience a document can have.

If a future revision adds sound, this chapter binds it in advance to the
signal rules: **caused, never ambient** — sound may occur only as the
immediate consequence of the visitor's act, exactly as blue may appear
only under attention; no music, no loops, no room tone, no idle hum, not
even in the basements, where the hum is *implied* by architecture and
must stay implied. The sanctioned palette is the drawing office's:
graphite tick for ink-on, a dry paper slide for the drawer and the print
sheet, a single soft contact for a dolly's arrival, felt more than heard.
Every sound must pass the working-drawing test in acoustic form: would a
drafter's room produce it? A default-muted state and a stamp-sized
control in the title block are mandatory if sound ever ships; the
silent building remains the canonical one.

## Access

The building is built for every visitor the same way it is built for
every language: as a first citizen, not a fallback.

**Keyboard.** Focus is attention, and it speaks the one language: tabbing
to any answering surface shows the same crosshair-signal-note grammar as
hover — the signal edge doubles as the focus ring (with sufficient
contrast on both themes), Enter is the click, Escape is the retreat
(closing the drawer, leaving the room, exactly one step at a time). The
rail is fully traversable in section order; the model's own surfaces
are reachable in a sensible reading order per station. Nothing is
mouse-only; the flow-traces run for a focused instrument exactly as for
a hovered one.

**Reading order.** The plan fallback is not only the low-power view — it
is the site's semantic skeleton. Every room exists as structured
document content (headings, lists, links) in the same reading order the
wall labels prescribe, so a screen reader walks the building the way the
flat projection draws it: floor by floor, room by room, identification
before vitals before narrative before receipts before door. The 3D model
is presentation; the document is always underneath, complete.

**Contrast and size.** Graphite on paper and its INK-theme negative both
hold body text at WCAG AA or better; the stamp tier — the smallest type —
never carries information that exists nowhere else (a stamp is always a
compression of something readable at label size or bound in data). Signal
blue on both grounds passes for the heavy line weights it is used at.

**Motion and WebGL.** `prefers-reduced-motion` receives the cut-based
sheet set of Chapter 05, at full information parity. No WebGL, small
screens, and low power receive the plan journey — same rooms, same
labels, same doors, same hashes. The three renderings (film, sheet set,
plan) are one building; the acceptance test for any new feature is that
it lands in all three or it does not ship.

## Critique

**The Awwwards juror** judged the dialect table the chapter's spine — one
language, ten dialects is a claim of coherence most sites cannot make —
and endorsed shipping silent as a stance: in a medium of autoplaying
ambience, a confident silence *is* the sound design.

**Ando's chair** wrote the silence section's meaning (the visitor's own
room as soundtrack) and held the line on the basements: the hum stays
implied. The chair also gave Escape its dignity — retreat is one step at
a time, never a teleport to nowhere.

**Rams' chair** enforced one-at-a-time as arithmetic, banned the modal
interception on doors, and required that any future sound arrive
default-muted with a stamp-sized control — a feature that announces
itself has already failed the working-drawing test.

**The director** made focus a first-class actor (the traces perform for
keyboard as for mouse) and set the signal's death to immediate on
attention's exit everywhere, with the pavilion's instant stillness as the
rule's showcase rather than its exception.

**The curator** bound the accessibility clauses to testable form — the
document-under-the-model as semantic skeleton, the three-renderings
acceptance test, the stamp-tier redundancy rule — so the roadmap can
inherit them as checks rather than sentiments.
