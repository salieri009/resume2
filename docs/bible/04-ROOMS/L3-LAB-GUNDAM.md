# Room · L3 / A-104 — The House

> Visual Design Bible · SITE 009 · Chapter 04 · Zone L2–L3 (rail: Laboratories) · Tag `A-104 · GUNDAM`
> Camera station: LAB GUNDAM — the iotbay diagonal raised one plate (nominal −4.5, 8.5, 6.5 · zoom 72 · gaze at the door line)
> Typology: **housing** · Exhibit: Project 04 — *Gundam Board*

## Program

A-104 is a house because the project is one: small, complete, and built by
a single pair of hands in a summer, with one rule — no shortcuts on the
hard parts. Among the laboratories it is the domestic type: not an
instrument, not a floor of racking, but a dwelling whose entire drama is
its front door. The project's substance is authentication — who may enter,
how entry is proven, how every interior door re-checks the key — and so
the room's architecture is organized around the thing houses have always
been organized around: the threshold. The visitor should read this room in
one glance as *modest*, and in the second glance as *rigorous*, because
that is the project's exact character.

## Walking In

The approach lands at the smallest plinth of the five laboratories, and
the smallness is kept deliberately: a house at model scale, alone on its
ground, with air around it. The exhibit is a single vertical composition —
a three-story tower of the palette's materials, narrow in plan, read from
foundation to roof exactly as the stack reads from data to interface. No
outbuildings, no garden walls, no scenography. A house built by one person
carries no wings.

## The House

The **foundation** is the PostgreSQL mass: the widest, lowest element, a
plain concrete-gray slab half-sunk into the plinth, because the board's
domain — posts, comments, users — is relational and the builder chose to
rest it on the oldest, most load-bearing kind of ground. The **middle
story** is the Chalice floor, brushed aluminum, and it is drawn with a
model-maker's honesty about serverlessness: the floor plate *floats*, held
off the foundation by a visible shadow gap with no posts beneath it — a
story with no basement stairs, no boiler room, no server to manage. The
gap is the room's first architectural joke that is also a fact. The **top
story** is the Next.js volume, white resin, the lived-in floor with the
one wide opening that faces the visitor.

The request spine runs the tower's height as a single graphite riser —
Next.js down to Chalice down to PostgreSQL — the simplest flow diagram in
the building, because the builder kept it that way on purpose. And on that
spine, at the Chalice floor, sits the room's centerpiece: the **lockset**.
The JWT middleware is drawn as a small aluminum block mounted *on the
conduit itself* — not beside the path but astride it, the way a lock is
not furniture in a room but hardware on a door. Every request passes
through its body. A hairline caption beneath the door line reads the entry
sequence in shipping order: `AUTH · GOOGLE OAUTH → SERVER VERIFY →
SHORT-LIVED JWT → REQUEST CHECK`. The house has exactly one way in, and
the drawing makes the checking of the key the most legible event on the
spine.

## Light

The one sky treats the tower kindly and plainly. The key from high
south-east models the three stories in three distinct values — resin top
brightest, aluminum middle carrying its lengthwise sheen, foundation
holding the deepest flat gray — so the stack reads as a stack even in
silhouette. The floating gap under the Chalice floor is the light's best
work in this room: a thin, continuous line of shadow with no post
interrupting it, legible from the station as a dark rule across the
tower's base. The cool fill keeps the tower's far face from vanishing.
Around the house, the plinth stays bright and bare; a small building needs
generous ground.

## The Specification Plate

The label opens with `case_studies/04_gundam_board` · `04 · Full-Stack ·
Solo`, the title **Gundam Board**, summary, and vitals: role (*Solo builder
— schema to deploy*), team (*Solo*), period (*2025 · summer break*),
outcome (*OAuth + JWT auth running on a serverless backend*). The tool
rack is the shortest in the building — five names, Next.js to JWT — and
its shortness is presented as a fact, not padded.

The narrative tells the two problems a first-time serverless builder
actually hits: session handling with no session store, answered by
short-lived tokens issued after server-side identity checks and verified
on every request; and wiring a typed frontend to a Python serverless API,
answered with a thin typed client holding the contract in one file. The
two decisions (Chalice, stateless JWT) and the two refusals (DynamoDB —
the domain is relational; NextAuth — *I wanted to own the OAuth verify and
JWT issue path once, without wrapping it in a library*) are set at full
size; the second refusal is the label's character line and the room's
reason for existing. The results band stamps `OAuth + JWT from login to
request`, `Serverless deploy on AWS`, `Typed API contract in one file`;
the lessons close in the builder's voice — auth makes more sense after you
build it once without a library — and the repository door ends the plate,
alone, without receipt chips: a solo summer house's provenance is the
house itself.

## Interaction

The one language: crosshair over the tower, its outline to heavy signal
blue, leader note `ROOM · L2 · PROJECT 04 · GUNDAM`. The hover trace runs
the spine top to bottom — and pauses. At the lockset the blue current
holds for a readable beat before continuing to the foundation: the request
is being checked, and the trace performs the check by waiting. It is the
smallest choreography in the five laboratories, one held note in a single
descending line, and it teaches the project's entire thesis without a
word. The caption line answers hover separately, running the auth sequence
left to right. Nothing else moves. A house should be still.

## The Flat Projection

In the 2D plan journey, A-104 is a section, not a plan — the one room
whose truth is vertical. The three stories draw as a stacked section with
the floating gap hatched void beneath the middle floor, the spine as a
single riser line with the lockset drawn as a lock symbol astride it, and
the auth caption beneath the door line. The full specification plate sets
beside the section.

## Content Binding

| Surface described above | Data key (`src/data/projects.ts` → `PROJECTS.gundam` unless noted) |
|---|---|
| File line | `.crumb`, `.category` |
| Title / summary | `.title`, `.summary` |
| Vitals block | `.role`, `.teamSize`, `.period`, `.outcome` |
| Tool rack | `.stack` |
| Overview / role detail | `.overview`, `.roleDetail` |
| Problems ↔ answers | `.problems[].p` / `.problems[].s` |
| Decisions / refusals | `.decisions[]`, `.tradeoffs[]` |
| Results band | `.results[]` |
| Lessons / future | `.lessons[]`, `.future[]` |
| Repository door | `.github` (no `.receipts` — door only) |
| The three stories | `.layers[]` (data / api / interface blocks; JWT block in the api layer) |
| The spine & lockset | `.flows.risers[]` (Next.js → Chalice → PostgreSQL), `.flows.conduits[]` (Chalice ↔ JWT, middleware on the request path) |
| Spine reading order | `.diagram[]` (Next.js → Typed API Client → AWS Chalice → JWT Middleware → PostgreSQL) |
| Auth caption | `.shipping` (label `Auth`; ports Google OAuth → server verify → short-lived JWT → request check) |
| Typology | `.arch` (`'housing'`) |
| Localized label text | `getLocalizedProject('gundam', lang)` overlays for KO / JA |

## Critique

**The Awwwards juror** asked whether the smallest project deserves a room
at all, and the chapter's answer became its program: smallness *presented*
as rigor — the shortest stack in the building set without padding, the
one-beat hover pause at the lockset as a signature no bigger room could
wear. The juror ruled the floating serverless floor the room's screenshot.

**Ando's chair** insisted on the air: the house must sit alone with
generous bare plinth around it, and a proposed fence of auth-flow arrows
circling the building was struck — one spine, one lock, stillness.

**Rams' chair** enforced the lockset's placement *on* the conduit rather
than beside it (hardware, not furniture), kept the tool rack honestly
short, and deleted a decorative Gundam figure on sight — the name is a
file line, not a mascot.

**The director** invented the held beat: the trace pausing at the JWT
block turns middleware into drama at the cost of a quarter-second, and the
director set the pause's length to be read, not felt as lag. The flat
projection was switched from plan to section at the director's call — the
room's story is vertical.

**The curator** confirmed the label quotes the builder's refusal of
NextAuth verbatim as its character line, verified door-only provenance is
stated rather than disguised, and checked that the floating gap is
captioned nowhere — some facts are for the visitor who already knows, and
the room trusts them.
