# Room · L2 / A-101 — The Crowd Observatory

> Visual Design Bible · SITE 009 · Chapter 04 · Zone L2 · Tag `A-101 · CROWD`
> Camera station: LAB CROWD (4.5, 5.5, 6.5 · zoom 72 · gaze at the instrument's midline, 1.4 m up, seated toward the room's north)
> Typology: **observatory** · Exhibit: Project 01 — *Crowd Detection & Accessibility Navigation*

## Program

Every laboratory in SITE 009 is a typology space — a room whose architecture
*is* the project's architecture, drawn at model scale. A-101 is an
observatory, because that is what this project is: an instrument that
watches a moving crowd and converts watching into warning. But the type is
inverted with intent. A classical observatory points one great eye at a
still sky; this one points a small, tireless eye at a restless street, on
behalf of the traveller for whom a crowd is an obstacle course — the
visitor with limited mobility whom the system warns before the crowd
closes. The room must carry that double reading: the patience of an
instrument, and the urgency of the person it serves.

## Walking In

Entry is the intimate shot of Chapter 03 at its full length: 1.35 seconds
from the lobby station, the camera dropping low and drawing near as the
zoom doubles, the building's outer walls sliding off the frame's edges
until the laboratory alone composes the view. The arrival reads as a change
of register — from reading a building to standing at a workbench. What
fills the frame is the observatory floor: a paper-white resin plinth, 3.2
by 2.4 meters in plan, thin as a mounting board, its perimeter drawn with a
graphite line at medium weight — the drawn outline that says *exhibit
boundary*, the museum's velvet rope rendered as ink. On the plinth stands
the instrument. Behind and beside it, the room's specification plate takes
the frame's flank like the wall label beside a museum piece. Nothing else
competes. The lab's walls are implied at the frame's edges; the exhibit is
the room.

## The Instrument

The project's running architecture is exhibited as a machine of brushed
aluminum in three registers, stacked the way the system is stacked, so
that reading the object top to bottom *is* reading the deployment diagram.

The **interface register** rides highest: two slender masses — the larger
the React interface, the smaller, set apart, the alert emitter — the parts
of the system a person actually faces, lifted where a face would meet
them. The **services register** carries the middle: two upright aluminum
instruments standing on the plinth's midline like a pair of survey
theodolites — the Spring Boot gateway, square-shouldered and foremost,
because everything entering this system passes its checkpoint; and behind
it the FastAPI·YOLO inference engine, the observatory's true eye, the
deepest mass in the composition, aimed — by nothing more than the grain of
its brushing and the slit aperture drawn across its face — along the
plinth's long axis, as if watching a corridor of arriving people only it
can see. The **infrastructure register** is lowest and widest: a flat
Docker plate under the services, the containment slab everything above it
ships in.

Between the registers run the flows, and the flows are the drawing layer of
the machine: graphite conduits at hairline weight, drawn as straight
orthogonal runs with drafting-elbow turns, never curves. Risers rise —
interface down to services, services down into the containment plate — and
one horizontal conduit crosses between gateway and eye, the corridor where
camera frames are handed to the model. At rest the conduits are ink on
metal, a wiring diagram etched into air. Under the visitor's attention they
become the room's single permitted spectacle: hover the instrument and the
active path takes the signal — a heavy blue current tracing webcam-feed to
interface to gateway to eye to alert, the one moment in A-101 where the
drawing visibly *runs*. The blue exists only while the visitor's attention
does; leave, and the machine returns to graphite patience.

## The Training Annex

Off the plinth — deliberately, measurably off, past the drawn boundary line
at the plinth's far corner — sits a small, low aluminum block with no riser
and no conduit to the machine: the SageMaker training annex. Its
disconnection is the architecture telling the truth: training happens
elsewhere, on rented ground, and nothing at inference time depends on it.
A hairline leader ties it to a micro caption rather than to the machine —
`TRAINING · JRDB → DVC → SAGEMAKER g5 → best.pt → container` — the supply
line by which the eye learned to see, drawn as a shipping note, not a
pipe. Visitors who know MLOps will read the missing riser and smile; that
missing line is the most precise sentence in the room.

## Light

The one sky of SITE 009 serves the observatory unmodified, and the room
earns its mood from what the instrument does with it. The warm key rakes
the aluminum registers lengthwise, drawing a long soft sheen down the
gateway's shoulder and catching the top edge of the inference engine's
slit; the cool fill holds the shadow sides in legible gray. The resin
plinth bounces a pale lift into the machine's undersides, so no face goes
black. Shadows on the plinth are short, soft, and doubled faintly where key
and fill disagree — the shadow signature of a model photographed on a
studio table. The specification plate flanking the exhibit sits in flat,
even light: labels are for reading, not for mood.

## The Specification Plate

The room's wall label follows museum discipline: identification first,
story second, evidence throughout — every claim wearing its receipt.

It opens with the file line — the crumb `case_studies/01_crowd_detection`
and category `01 · Deep Learning`, set as micro caps — then the title at
room scale: **Crowd Detection & Accessibility Navigation**, with the
summary sentence beneath it and the vitals in a single ruled block: role
(*Team lead — YOLO training, inference & alerting, 97% of commits*), team
(*3 — ML lead*), period (*2026 S1 · Autumn*), outcome (*v2.6.0 released
with a live demo*). The stack reads as a tool rack — eight names from
YOLOv8 to DVC, set as flat tags in graphite rule, no logos.

Then the label tells the work the way an exhibition tells a restoration:
the overview paragraph; the three problems each paired with the move that
answered it (dense-crowd accuracy → JRDB fine-tune with a held-out
proximity benchmark; alert latency → the dedicated service split; local
GPU limits → scripted SageMaker runs); the three decisions with their
reasons and the two roads not taken with theirs — the trade-off entries
are the label's most engineer-respecting lines, and they are set at full
size, not folded away. The results band carries the four receipts
(`v2.6.0 · live demo`, `193/199 commits`, `JRDB fine-tune · 8:1:1`,
`Dockerized 3-tier`), each drawn as a stamped chip in hairline rule.
Lessons and future work close the label in the builder's own voice, and
the plate's final line is the door out of the model into the world: the
repository link, plus the live receipts drawn from it — releases and pull
requests — set like the catalogue number that lets a scholar request the
original.

## Interaction

A-101 answers in three places, all in the site's one language. The
instrument answers as a whole — crosshair cursor, boundary line to heavy
signal blue, leader note `ROOM · L2 · PROJECT 01 · CROWD` — and, at this
station, its conduits perform the flow-trace described above. The
specification plate's receipts and repository line answer as links —
signal-blue underline on hover, nothing louder. The floor rail remains at
the frame's edge for the walk back; leaving reverses the entry shot in 1.1
seconds, and the observatory's blue dies the moment attention withdraws.
The room never moves on its own: no idle rotation, no ambient particle
drift, no simulated crowd — the constitution's ban on fake telemetry
protects precisely this exhibit, whose entire integrity is that every
number on its label is real.

## The Flat Projection

In the 2D plan journey, A-101 is a numbered detail sheet: the plinth
outline in plan with the three registers drawn as nested rectangles, risers
as circled drop symbols, the gateway-to-eye conduit as a dashed run, and
the annex block outside the boundary with its missing-riser truth intact.
The full specification plate sets beside the plan unabridged. The flat
reader gets every fact and the one joke — the unconnected annex — that the
model tells in three dimensions.

## Content Binding

| Surface described above | Data key (`src/data/projects.ts` → `PROJECTS.crowd` unless noted) |
|---|---|
| File line | `.crumb`, `.category` |
| Title / summary | `.title`, `.summary` |
| Vitals block | `.role`, `.teamSize`, `.period`, `.outcome` |
| Tool rack | `.stack` |
| Overview paragraph | `.overview` |
| Role detail | `.roleDetail` |
| Problems ↔ answers | `.problems[].p` / `.problems[].s` |
| Decisions / trade-offs | `.decisions[]`, `.tradeoffs[]` |
| Results band | `.results[]` |
| Lessons / future | `.lessons[]`, `.future[]` |
| Repository door | `.github`; live receipts via `getReceipts(PROJECTS.crowd)` (`.receipts`: releases, prs) |
| Instrument registers | `.layers[]` (infra / services / interface blocks) |
| Risers & conduits | `.flows.risers[]`, `.flows.conduits[]` |
| Flow-trace order | `.diagram[]` (Webcam Feed → React UI → Spring Boot API → FastAPI·YOLOv8 → Proximity Alerts) |
| Training annex caption | `.shipping` (label `Training`; ports JRDB → DVC → SageMaker·g5 → best.pt → container) |
| Typology | `.arch` (`'observatory'`) |
| Localized label text | `getLocalizedProject('crowd', lang)` overlays for KO / JA |

## Critique

**The Awwwards juror** demanded one image no other site has. The room now
has two candidates and keeps both: the hover flow-trace (a wiring diagram
that runs only under attention) and the training annex with its missing
riser — an architectural in-joke that is also a rigorous MLOps statement.
The juror's second note — that "3D diagram of my stack" is a cliché —
is answered by binding every mass to a real `layers[]` block and every line
to a real `flows[]` entry: the object is the deployment, not a sculpture
about it.

**Ando's chair** stripped the room's walls: an early draft gave the
observatory a drawn dome and a star-slit ceiling, which was scenography.
The type is now carried by the instrument's aim and aperture alone, and
the room's emptiness beyond the plinth boundary was made part of the
composition.

**Rams' chair** enforced the register logic — interface above services
above infrastructure, because the object must be *readable as the system*
top to bottom — and deleted a proposed fourth register for the webcam,
which is an input, not a tier; it survives only as the first word of the
flow-trace.

**The director** blocked the entry shot's register change (building →
workbench), set the flow-trace's direction to match the diagram order so
the blue always travels the way the data does, and ruled that the blue
dies instantly on leave — an afterglow would be sentiment the room hasn't
earned.

**The curator** audited the label against museum practice: identification,
vitals, narrative, provenance, catalogue access — all present and each
bound to a named key (table above). The curator also insisted the
trade-offs be set at full size rather than collapsed, because roads not
taken are what distinguish an engineer's label from an advertisement.
