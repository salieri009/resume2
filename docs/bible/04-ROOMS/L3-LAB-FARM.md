# Room · L3 / A-103 — The Greenhouse

> Visual Design Bible · SITE 009 · Chapter 04 · Zone L2–L3 (rail: Laboratories) · Tag `A-103 · FARM`
> Camera station: LAB FARM — the crowd station's diagonal raised one plate (nominal 4.5, 8.5, 6.5 · zoom 72 · gaze at the bed line, one level up)
> Typology: **greenhouse** · Exhibit: Project 03 — *Animal Farm Simulator*

## Program

A-103 is a greenhouse because the project is one: a sealed glass world with
its own climate — four seasons, five weathers, a night with an orbiting
moon — where the gardener's real work is not the plants but the *systems
that grow them*. This is the graphics room, the sub-major's home ground,
and the temptation it must resist is written into the constitution: no
neon, no spectacle for its own sake. The project itself supplies the
discipline — its builder rejected physically-based gloss because flat
shading reads better and runs everywhere — and the room honors that
decision by being the most transparent space in the building and still the
most restrained.

## Walking In

The intimate shot climbs here: the 1.35-second approach rises one plate
higher than the L2 labs, and the visitor arrives at the only lab with a
roof of its own. Over the plinth stands a glass house at model scale — a
simple gabled volume of the palette's cool blue-gray glass, one-third
opaque, its panes ruled by aluminum glazing bars on meter centers. It is
the one place in the building where the glass material speaks at length,
and the composition frames it against the paper void so its transparency
reads as lightness, not effect. Through the glass, softened once by the
tint, the exhibit shows as rows.

## The Beds

Inside the glass house the system stands as two planted columns — the two
render pipelines of the project, set side by side like raised beds. The
**scene bed** is the taller: the React interface plate at its head, the
Three.js scene-graph mass at its heart, and beneath it the WebGL slab —
the soil every frame finally roots in. The **weather bed** runs beside it:
the controls plate small at its head, the particle system below it drawn as
a tray of identical seedlings — dozens of tiny instanced masses in strict
rows, the room's quiet monument to the decision that made storms possible
at sixty frames — and at its base the GLSL block, the shader ground the
particles grow from. A cross-conduit ties scene to particles mid-height,
and a second ties WebGL to GLSL at the soil line, where shaders are
compiled into the pipeline.

Under the visitor's hover, the blue current runs the beds in render order —
React down through Three.js to WebGL, controls down through particles to
GLSL — the day's watering traced in signal. The aurora, the project's one
piece of showmanship, is *not* performed. It is archived: a single plate
of white resin standing at the beds' far end like a botanical
specimen board, etched with a hairline waveform — layered noise, banded —
and captioned `AURORA · CUSTOM GLSL · ONE DRAW CALL`. The room states the
spectacle's engineering and declines to imitate its light; the visitor who
wants the aurora itself is one click from the live repository. This is the
constitution's no-neon rule applied at the exact point of maximum
temptation, and it is the room's strongest sentence.

## The Weather Vane

On the glass house's ridge, outside the sealed climate, sits the smallest
apparatus in the building: a weather vane of brushed aluminum. From it a
*dashed* hairline drops to the weather bed — dashed, because the connection
is optional: the project can sync its sky to the real one through
OpenWeatherMap, or run its own. The caption reads `OPTIONAL ·
OPENWEATHERMAP → WEATHER SYNC → SCENE STATE`. A solid line would be a lie;
the drawing convention for "provisional" carries the exact truth of the
integration, and the vane gives the greenhouse its one silhouette against
the void.

## Light

The one sky does double duty here, because the room's subject *is* sky.
The warm key passes through the gabled glass and lands on the beds as a
softened wash, each glazing bar laying a pale ruled shadow across the
trays — the greenhouse's daily geometry. The cool fill, entering the open
gable end, keeps the deep GLSL blocks from sinking. The instanced seedling
tray is the light's best moment: dozens of identical small masses each
throwing the same minute shadow, a texture of repetition reading like
frost. Nothing glows. The aurora plate stays resin-white under the same
sun as everything else.

## The Specification Plate

The label opens with `case_studies/03_farm_simulator` · `03 · Computer
Graphics`, the title **Animal Farm Simulator**, summary, and vitals: role
(*Graphics developer — Computer Graphics & Animation sub-major*), team
(*Team — graphics lead*), period (*2025 — v2 refactor 2026*), outcome
(*Real-time seasons/weather with custom GLSL aurora*). The tool rack runs
Three.js r182 to the OpenWeatherMap API.

The narrative carries the two graphics war stories: thousands of particles
tanking the frame rate, answered with instanced rendering and capped
per-frame simulation; and the aurora looking flat when built from
textures, answered with the custom fragment shader — layered noise, banded
hue shifts, time uniforms, one draw call that reads as volume. The three
decisions (custom GLSL over textures, instanced meshes, the Vite +
TypeScript v2 rewrite) and the single road not taken (PBR water and
lighting, rejected for frame budget and stylized honesty) are set with
their reasons. The results band stamps `4 seasons · 5 weather systems`,
`Custom GLSL aurora`, `60fps under storms`, `Live weather API sync`;
lessons close with the line that names the room's ethic — *performance
work is design work* — and the repository door ends the plate. This
project keeps no release or PR receipts on the plate; its provenance is
the repository itself, and the label says so by offering the door alone.

## Interaction

The site's one language, in this room's dialect: crosshair over the glass
house, its ridge line and boundary to heavy signal blue, leader note
`ROOM · L2 · PROJECT 03 · FARM`, the render-order trace on hover. The
weather vane answers separately — hover runs the blue down its dashed line
to the beds, the optional integration momentarily made real, which is the
most charming true sentence the room can speak. No weather plays on its
own; no seasons cycle idly. The greenhouse holds still, like every room,
until asked.

## The Flat Projection

In the 2D plan journey, A-103 is a glasshouse plan: the gabled outline with
glazing bars ruled, two beds in plan with the seedling tray hatched as
repeated units, the aurora specimen plate at the far end, and the vane on
the ridge with its dashed drop — dashed in flat projection too, keeping
the optional truth. The full specification plate sets beside it.

## Content Binding

| Surface described above | Data key (`src/data/projects.ts` → `PROJECTS.farm` unless noted) |
|---|---|
| File line | `.crumb`, `.category` |
| Title / summary | `.title`, `.summary` |
| Vitals block | `.role`, `.teamSize`, `.period`, `.outcome` |
| Tool rack | `.stack` |
| Overview / role detail | `.overview`, `.roleDetail` |
| Problems ↔ answers | `.problems[].p` / `.problems[].s` |
| Decisions / trade-off | `.decisions[]`, `.tradeoffs[]` |
| Results band | `.results[]` |
| Lessons / future | `.lessons[]`, `.future[]` |
| Repository door | `.github` (no `.receipts` — door only, stated honestly) |
| The two beds | `.layers[]` (gpu / scene / interface blocks) |
| Watering trace | `.flows.risers[]`, `.flows.conduits[]`, ordered by `.diagram[]` (React 19 → Scene Graph → Season/Weather Systems → GLSL Shaders → WebGL) |
| Weather vane caption | `.shipping` (label `Optional`; ports OpenWeatherMap → weather sync → scene state) |
| Aurora specimen caption | `.results[]` / `.problems[1]` (custom GLSL, one draw call) |
| Typology | `.arch` (`'greenhouse'`) |
| Localized label text | `getLocalizedProject('farm', lang)` overlays for KO / JA |

## Critique

**The Awwwards juror** expected this room to break the palette — a
graphics project begs for its own fireworks — and judged the refusal the
right call only if it is *visible*: hence the aurora as an etched specimen
plate with its engineering caption, restraint performed rather than merely
observed. The juror kept the dashed weather-vane line as the room's
memorable image.

**Ando's chair** owned the glass: one gable, meter-ruled bars, no
curvature, and the instruction that the room's atmosphere come from ruled
shadows on the beds rather than from any rendered weather. A proposed
snow-dusted state was struck — one sky, always.

**Rams' chair** reduced the beds to two columns exactly matching the two
render pipelines in the data, deleted a decorative animal figure (the farm
is the system, not the sheep), and required the seedling tray's masses be
literally identical — instancing depicted by instancing.

**The director** set the watering trace to run downward — interface to
soil — in both beds simultaneously, because render order is the shot's
subject, and gave the vane's hover its own beat so the optional line gets
read rather than skimmed.

**The curator** flagged the missing receipts honestly (door only, no
release/PR chips), verified the aurora caption quotes the data's own
language (one draw call, layered noise), and kept the "performance work is
design work" lesson as the label's closing line — it is the room's thesis
in the builder's voice.
