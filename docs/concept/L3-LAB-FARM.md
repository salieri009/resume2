# Concept Sheet · L3 / A-103 — The Greenhouse

> SITE 009 · Stage 2 concept art document · derived from
> [`docs/bible/04-ROOMS/L3-LAB-FARM.md`](../bible/04-ROOMS/L3-LAB-FARM.md) — no redesign, only fixation.
> Station: LAB FARM (the crowd diagonal raised one plate · gaze at the bed line). Tone scale 0–10.

## Composition

Raised diagonal from the south-east, elevation ≈ 33 degrees. The glass
house fills the frame's center — a simple gabled volume, ridge running
left-to-right, drawn against clear paper above. Through one layer of
tint, the two beds read side by side; the aurora specimen plate stands
at the far gable end; the weather vane breaks the ridge line as the
composition's only silhouette against the void, its dashed drop-line
falling to the beds. The eye enters at the vane (highest contrast
against paper), slides down the dashed line into the house, reads the
beds front to back, and lands on the specimen plate.

## Architecture

Plinth 2.2 × 2.0 m. Glass house: gabled volume 1.8 × 1.6 m in plan,
eaves at 0.9 m, ridge at 1.3 m; roof as two glass planes, gable ends
open; glazing bars 20 mm aluminum on 0.45 m centers along the roof.
**Scene bed** (left): React plate 0.5 × 0.1 × 0.3 at its head, Three.js
mass 0.45 × 0.45 × 0.4 at heart, WebGL slab 0.7 × 0.15 × 0.5 at base.
**Weather bed** (right): controls plate 0.3 × 0.08 × 0.2, the seedling
tray — 24 identical 60 mm cubes in a strict 6 × 4 grid on a 0.7 × 0.5
tray — and the GLSL block 0.5 × 0.15 × 0.4 at base. Aurora specimen
plate: resin, 0.5 × 0.7 m standing at the far end, etched hairline
waveform, caption `AURORA · CUSTOM GLSL · ONE DRAW CALL`. Vane: 0.25 m
aluminum pointer on a 0.3 m mast at the ridge; dashed hairline drop to
the weather bed, captioned `OPTIONAL · OPENWEATHERMAP → WEATHER SYNC →
SCENE STATE`.

## Light

The roof's glazing bars rule pale shadow lines across both beds — the
greenhouse's daily geometry, tone 8.5 stripes on tone 9 beds. Light
inside is one filter softer than the site's key: masses tone 7,
shadows softened one register. The seedling tray is the light's best
moment: 24 identical minute shadows, a texture like frost. The
specimen plate stands in flat, even tone 9 — a document, unlit by
drama. The vane catches the key full-strength above the glass, the
brightest metal in frame.

## Mood

Climate as craft — a sealed world whose gardener tends systems, not
plants. Earned by the ruled shadows (architecture doing the
atmosphere), the frost of identical seedlings (instancing shown, not
told), and the refusal at the heart of the room: the aurora present
only as an etched specimen, its light declined.

## Interaction States — Three Plates

**Plate 1 · Resting.** All graphite and glass; dashed vane line clearly
dashed; no blue.

**Plate 2 · Hover — watering.** Boundary heavy signal; both beds trace
downward simultaneously (React → Three.js → WebGL; Controls → Particles
→ GLSL) in render order. Leader note `ROOM · L2 · A-103 · FARM`. The
vane line stays graphite-dashed.

**Plate 3 · Hover — the vane.** The dashed drop runs signal from
pointer to bed — the optional integration momentarily real — while the
beds rest. The plate's caption reads beneath.

## References

Glasshouse sections from botanical garden drawings (Kew's ridge-and-
furrow, simplified to one gable); seed-tray photography for the
instanced grid; scientific specimen boards for the aurora plate;
weather-station instruments (drawn silhouette) for the vane. Light:
ruled glazing shadows in Barragán greenhouse photographs.
