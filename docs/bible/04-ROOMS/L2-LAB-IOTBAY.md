# Room · L2 / A-102 — The Order Warehouse

> Visual Design Bible · SITE 009 · Chapter 04 · Zone L2 · Tag `A-102 · IOTBAY`
> Camera station: LAB IOTBAY — the mirror of the crowd station across the building's short axis (nominal −4.5, 5.5, 6.5 · zoom 72 · gaze at the racking midline, 1.4 m up)
> Typology: **warehouse** · Exhibit: Project 02 — *IoTBay*

## Program

A-102 is a warehouse because IoTBay is a warehouse: a system whose whole
dignity is throughput — catalog in, orders through, shipments out — built
by a shift of eight workers who could only avoid colliding because the
aisles were drawn before the stock arrived. Where the observatory next door
is about one eye watching, this room is about many hands moving, and its
architecture must carry the two things the project actually proved: that
explicit boundaries let eight people work one floor, and that a gate which
inspects everything leaving the building turns accidents into red stamps
instead of broken deliveries.

## Walking In

The approach is the standard intimate shot — 1.35 seconds, the zoom
doubling — but where the crowd lab arrives at a workbench, this one arrives
at a *floor*: the frame fills with the longest plinth in the building, its
proportions unmistakably logistical, long axis running with the building's
grid. On it, the exhibit reads instantly as racking — parallel rows of
aluminum shelving drawn at model scale, their uprights on strict meter
centers, their long lanes open so the orthographic eye can see straight
down the aisles. The room asks to be read the way a warehouse manager reads
a floor: rows first, routes second, gates last.

## The Racking

The system's three tiers stand as three parallel racks, and their order
across the floor is the order of the MVC section: nearest the viewer the
**interface rack** (the JSP views — a long, low shelf face, the surface
customers actually touch), behind it the **logic rack** (Servlet
controllers shoulder to shoulder with the service layer — the tallest row,
mid-floor, where every decision in the building is made), and deepest the
**data rack** (the DAO units, one bay per entity — eight identical bays
drawn with identical hairline dividers, the architecture's one visible
insistence that every entity got the same contract — with the SQLite mass
behind them, a single flat slab, the store everything finally rests on).

A picking route threads the racks: a graphite conduit at hairline weight
that enters at the interface face, rises through the logic rack, crosses to
the DAO bays, and lands on the store — the exact walk of one request, JSP
to Servlet to Service to DAO to SQLite. Under the visitor's hover the route
takes the heavy signal blue and runs its length in order, one picker
walking one order through the building. It is the same spectacle grammar as
the observatory's flow-trace, retold in the warehouse's dialect: there the
blue was a gaze; here it is a route.

Off the racking, near the interface row but connected to nothing, sits a
small flat plate: the Tailwind block, styling only, no riser. The warehouse
keeps its paint station off the picking route, and the missing line is the
telling detail — presentation never touches the flow of goods.

## The Inspection Gate

The warehouse's second machine stands at the plinth's dispatch end,
perpendicular to the racks: the CI gantry. It is drawn as a gate the way
container ports draw them — two aluminum uprights and a beam across — and
its meaning is the project's proudest number: nothing leaves this building
unexamined. A caption line beneath it reads the conveyor in shipping order:
`CI · push → GH ACTIONS → 118 E2E → DOCKER IMAGE → GHCR`. Just past the
gate, at the plinth's very edge, one container-proportioned block of
aluminum sits as the shipped artifact — the image that cleared inspection,
resting at the dock. Inside the gate's frame, drawn small in the graphite
of a checker's tally, a second figure: the fourteen security boundary tests,
the bonded-cage count, the warehouse admitting it also inspects for theft.

## Light

The one sky rakes the racking lengthwise, and the composition is built to
use it: the key from high south-east runs down the aisles so each rack
throws a soft, short shadow onto the next row's lane, a rhythm of pale
bands that gives the floor its logistical texture. The cool fill keeps the
deep data rack legible. The CI gantry, standing perpendicular, takes the
key across its beam and drops the longest shadow in the room — the gate is
the darkest line on the floor, as a threshold should be. The Tailwind plate,
flat and low, barely shadows at all: decoration travels light.

## The Specification Plate

The label opens with the file line — `case_studies/02_iotbay` · `02 ·
Enterprise Platform` — then the title **IoTBay**, the summary beneath, and
the vitals block: role (*Team contributor — 8-person squad, 297 commits
total*), team (*8*), period (*2025 S1 · Autumn*), outcome (*118 E2E tests
passing · CI/CD to Docker/GHCR*). The tool rack lists the eight-name stack
from Java Servlets to Docker/GHCR in flat graphite tags.

The narrative section tells the warehouse's two war stories as
problem-and-answer pairs: eight contributors colliding on one codebase,
answered by the strict layering and the all-tests-on-every-push discipline;
and the security review's CSRF, injection, and XSS findings, answered with
tokens, prepared statements, output encoding, an access log — and then
fourteen boundary tests *to keep it that way*, the label quoting the
builder's own resolve. The three decisions (one DAO interface per entity,
SQLite over a server RDBMS, Selenium E2E over unit-heavy testing) and the
two roads not taken (Spring, a client-side SPA) are set at full size with
their reasons — the trade-offs here are unusually candid about course scope
and team reality, and that candor is the label's character. The results
band stamps four receipts (`118 E2E tests green`, `297 commits · 8 devs`,
`14 security boundary tests`, `CI/CD → Docker/GHCR`); lessons and future
work close in the builder's voice; and the plate's last line is the
repository door with its live pull-request receipts — this room's
provenance runs through PRs, the paper trail of an eight-person floor.

## Interaction

A-102 answers in the site's one language: crosshair over the exhibit,
boundary line to heavy signal blue, leader note `ROOM · L2 · PROJECT 02 ·
IOTBAY`, and the picking-route trace on hover. One addition earns its
place here and nowhere else: hovering the CI gantry runs the blue along
the conveyor caption instead — push to GHCR — because this room genuinely
has two flows, the request and the release, and an engineer will want to
read both. Nothing idles; no simulated orders cross the floor; the ban on
fake telemetry keeps every moving thing in this warehouse an answer to the
visitor's own hand.

## The Flat Projection

In the 2D plan journey, A-102 is a racking plan: three rows in plan with
the DAO bays individually ruled, the picking route dashed through them in
drawing order, the Tailwind plate outside the route with no connector, and
the CI gantry drawn as a gate symbol at the dispatch edge with its conveyor
caption. The full specification plate sets beside it unabridged.

## Content Binding

| Surface described above | Data key (`src/data/projects.ts` → `PROJECTS.iotbay` unless noted) |
|---|---|
| File line | `.crumb`, `.category` |
| Title / summary | `.title`, `.summary` |
| Vitals block | `.role`, `.teamSize`, `.period`, `.outcome` |
| Tool rack | `.stack` |
| Overview / role detail | `.overview`, `.roleDetail` |
| Problems ↔ answers | `.problems[].p` / `.problems[].s` |
| Decisions / trade-offs | `.decisions[]`, `.tradeoffs[]` |
| Results band | `.results[]` |
| Lessons / future | `.lessons[]`, `.future[]` |
| Repository door | `.github`; live receipts via `getReceipts(PROJECTS.iotbay)` (`.receipts`: prs only) |
| Racking rows | `.layers[]` (data / logic / interface blocks) |
| Picking route | `.flows.risers[]`, `.flows.conduits[]`, ordered by `.diagram[]` (JSP Views → Servlet Controllers → Service Layer → DAO per Entity → SQLite) |
| CI gantry caption | `.shipping` (label `CI`; ports push → GH Actions → 118 E2E → Docker image → GHCR) |
| Typology | `.arch` (`'warehouse'`) |
| Localized label text | `getLocalizedProject('iotbay', lang)` overlays for KO / JA |

## Critique

**The Awwwards juror** warned that a warehouse of gray racks is the least
photogenic room in the set, and demanded its signature be structural, not
cosmetic. The answer: the *two-flow* room — the only lab where hover tells
two different stories (request route, release conveyor) — and the
eight-bay DAO rack as a visible ethic of teamwork. The juror accepted that
this room's beauty is bureaucratic on purpose.

**Ando's chair** cut a proposed mezzanine and admin office (the dashboard
features do not need a diorama); the floor's rhythm of rack shadows was
promoted instead — light across repetition is the room's whole atmosphere.

**Rams' chair** enforced identical bays for the DAO units — sameness *is*
the design statement — and moved the security figure inside the gate
rather than giving it a separate cage prop; a number set where inspection
happens says more than a fence.

**The director** ordered the picking route to run in strict `diagram[]`
order and made the gantry's shadow the darkest line in the room, so the
frame has a threshold the eye must cross exactly where the system has one.

**The curator** audited the label: this room's provenance is pull requests
(no releases receipt exists, and the binding table says so honestly), the
trade-off entries carry the course-reality candor verbatim from data, and
the fourteen boundary tests appear once, in the gate, where they are
architecture rather than a boast.
