# Concept Sheet · L2 / A-101 — The Crowd Observatory

> SITE 009 · Stage 2 concept art document · derived from
> [`docs/bible/04-ROOMS/L2-LAB-CROWD.md`](../bible/04-ROOMS/L2-LAB-CROWD.md) — no redesign, only fixation.
> Station: LAB CROWD (4.5, 5.5, 6.5 · gaze 0, 1.4, −2 · zoom 72). Tone scale 0–10 as in the lobby sheet.

## Composition

The frame is the workbench register: close, low, and intimate. Plan angle
≈ 35 degrees off the south axis, elevation ≈ 35 degrees — lower and more
frontal than the civic views, the angle of leaning over a bench. The
plinth fills the frame's lower two-thirds, its long axis (3.2 m) running
left-to-right with a slight recession to the frame's upper-left; the
instrument stands just left of center, its three registers stacked in
clear silhouette against the paper field, which occupies the frame's
upper third. The specification plate (HUD wall label) takes the frame's
right flank, top to bottom, outside the drawing. The building's outer
walls are *gone* — slid off-frame at this zoom — but the floor plate the
plinth rests on runs to the frame's edges, so the room is implied by
ground, not enclosure.

The eye's route: enter at the instrument's tallest silhouette (the
interface register's larger mass, upper left of center), drop through the
two theodolite masses of the services register — the Spring Boot gateway
foremost, the FastAPI·YOLO eye behind and slightly left, its slit
aperture the route's landing — then follow the plinth's drawn boundary
line right, cross the open plinth, and end at the small disconnected
annex block past the boundary at the lower right, whose isolation should
register a half-second after everything else. That delayed reading *is*
the composition working.

## Architecture

Plinth: 3.2 × 2.4 m in plan, 80 mm thick, resin, sharp-arrised, its
perimeter drawn in a medium-weight graphite boundary line inset 0 mm
(the line is the edge). The instrument's registers, in aluminum: the
**infrastructure plate** (Docker) 1.9 × 1.2 m × 120 mm, lying flat,
centered under the services; the **services register** — the gateway, an
upright mass 0.45 × 0.45 × 0.9 m standing foremost on the plate's
midline, and the inference eye behind it, 0.6 × 0.5 × 0.7 m, its front
face carrying a horizontal slit aperture 40 mm tall across its full
width, aimed along the plinth's long axis; the **interface register** —
two slender masses riding highest: the React mass 0.7 × 0.15 × 0.35 m
lifted 1.1 m on its riser line, and the alert emitter 0.3 × 0.15 ×
0.25 m, set apart from it by a clear 0.4 m. Conduits: hairline runs with
90-degree drafting elbows — two risers dropping from the interface
masses to the services, one riser from each service mass into the Docker
plate, one horizontal gateway-to-eye run at 0.45 m height. The annex:
0.4 × 0.4 × 0.25 m, aluminum, sitting 0.5 m outside the boundary line at
the plinth's far corner, connected to nothing; a hairline leader ties it
to its caption at label size. No other objects exist on the plinth.

## Light

Key from upper left along the view (south-east, high), fill from the
right rear. Tonal plan: paper field 9.5; plinth top 9, its front arris
catching the frame's brightest small edge (9.8, a hairline of light);
plinth side faces 8. Aluminum registers: lit faces 7 with the lengthwise
brushing gradient rising to 8 at top edges; shadowed faces 6; the slit
aperture reads as the instrument's darkest plane, tone 4 — a rectangle
of held shade, not a glow. The gateway's shoulder carries the long soft
sheen described in the bible: a gradient band, never a dot. Shadows on
the plinth: each mass drops a soft short shadow at tone 8, doubled at
the edge; the interface masses, being lifted, throw the longest and
palest (8.5) — reading order in shadow lengths, tallest palest. The
annex, outside the boundary, casts its small shadow onto raw floor
plate, not plinth — a subtle ground-truth that it stands on different
territory. Conduits at rest are graphite hairlines, tone 2, and are the
frame's sharpest darks after text.

## Materials

Resin plinth: matte, warm, edge-lit as above; the boundary line is ink
on its surface, not a groove. Aluminum: brushing along each member's
long axis — vertical on the standing masses, horizontal on the flat
Docker plate — rendered as directional gradient only; reflection budget
zero (no environment, no mirror image of the conduits in the plate). The
slit aperture's interior: flat tone 4, no visible mechanism — the eye is
implied, never illustrated. All text in frame (captions, the boundary
tag) in drafting mono, graphite.

## Mood

An instrument left warm — the patience of a machine that watches so
someone else can move safely. Earned by: the aim (the slit and the
brushing both run the long axis, so the whole object *faces* an unseen
corridor), the stillness (nothing depicted mid-motion; conduits at rest
are pure line), and the one deliberate absence (the annex's missing
riser), which converts the composition from arrangement into statement.

## Interaction States — Three Plates

**Plate 1 · Resting.** As composed above. All conduits graphite
hairlines. Boundary at medium weight, graphite. No blue in frame; the
specification plate's text fully legible at the right; cursor a
crosshair anywhere over the plinth's answering surfaces.

**Plate 2 · Hover — the trace.** The boundary line lifts to heavy weight
in signal `#2F6BFF`, and the flow-trace runs the conduits in diagram
order — the blue entering at the interface mass, dropping to the
gateway, crossing the horizontal run to the eye, rising to the alert
emitter — rendered in this still plate as the *completed* trace: every
conduit on the path at heavy signal weight, off-path conduits (the two
risers into the Docker plate) remaining graphite. Leader note `ROOM ·
L2 · PROJECT 01 · CROWD` extends from the boundary's upper edge. The
annex stays graphite — hover does not reach across the boundary — and
its exclusion from the blue is the plate's quiet second sentence.

**Plate 3 · The annex read (detail plate).** A tighter crop of the
plinth's far corner at the same station and angle: the annex block, its
leader, and its caption `TRAINING · JRDB → DVC → SAGEMAKER g5 → best.pt
→ CONTAINER` set in two ruled lines of drafting mono, with the boundary
line crossing the foreground as a medium-weight rule dividing exhibit
from annex territory. Tone as in the master frame. This plate exists
because the room's most precise sentence is 0.4 meters wide, and the
painter must know it deserves its own sheet.

## References

Instrument massing: survey theodolites (Wild Heerbrugg T2) and the
Greenwich transit instrument — aimed masses on mounts, read in profile.
Product stance: Braun SK4 and T3 (Rams) — the machine as calm rectangle
with one legible aperture. Model photography: Herzog & de Meuron
worklike foam-and-metal study models, shot flat and even. The trace:
railway signal-box block diagrams and London Underground track schematics
— current shown as a lit route through fixed line. The annex's
detachment: services diagrams where training/offline plants are drawn
off-skid, dashed or separated — any honest MLOps architecture sheet. The
plinth and boundary: museum object mounts at the Design Museum /
Vitra — the drawn perimeter as the modern vitrine.
