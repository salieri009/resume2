# Room · L0 — The Lobby

> Visual Design Bible · SITE 009 · Chapter 04 · Zone L0 · Tag `ENTRANCE`
> Camera station: LOBBY (14, 16, 14 · zoom 36 · gaze at the building's heart, 1.2 m above the slab)

## Program

The lobby is the building's argument, delivered once, standing still. It
holds no project and sells nothing; it exists to do what a great lobby does
— establish who built this place and on what conviction, in the time it
takes to cross the floor. Every other room presents evidence. The lobby
presents the *thesis*, and its architecture is arranged so that thesis and
person arrive in a single view.

## Walking In

The visitor arrives on the 1.1-second dolly from the boot station: the
building slides nearer and grows a third in zoom, and what was a maquette
becomes a room being read through its own glass. The south curtain fills
the near face of the frame — a cool, blue-gray plane, one-third opaque,
seated on the concrete ground slab and stopping short of the roof plate so
a band of wall carries the load above it. Through the glass, softened by
exactly one layer of its tint, the lobby's depth opens: six meters of resin
floor plate, the four aluminum columns marking the bay, and at the far
side, flat to the north wall, the thesis wall — a plate of white resin,
70 percent of the facade in width, standing off the concrete behind it by a
shadow gap that draws a thin dark outline around its whole silhouette. It
is lit like the one artwork in the room, which it is: the warm key from
high south-east rakes it gently, the cool fill keeps its shadowed edge from
dying, and its face is the brightest broad surface in the frame. The eye
lands there before the visitor knows they were aimed.

The floor itself stays nearly empty. Emptiness is the lobby's luxury — an
eight-by-six room holding one wall of words and nothing to trip over. The
resin plate carries only its own reveal lines and, near the glass, the
pale soft rhomb of light the curtain admits, an orthographic patch of sun
that slides imperceptibly nowhere: this building has one fixed sky, and its
stillness is part of the calm.

## The Thesis Wall

The wall reads top to bottom in the order a title block reads — smallest
truth first, largest claim in the middle, signature at the base.

At the top, in micro caps tracked wide, the kicker: `SITE 009 · SALIERI` —
site number and call sign, graphite on resin, the size of a stamp. Below
it, the title in the ink of the palette (#0E0F10), the largest text in the
building: **The Architecture of Software**. Directly under the title, at
half its visual weight, the doctrine set as a sub-line: *Software is not
written. It is constructed.* These two lines are the site's fixed
inscription — carved, as it were, into the building itself, identical in
every language the building speaks.

Beneath the inscription the wall turns personal, and the language switches
to the visitor's own (the building speaks English, Korean, and Japanese;
the thesis wall re-letters itself when the language chrome is touched, with
no layout drama — the wall was proportioned for its longest tenant). First
the tagline, one sentence naming the builder's double life — coursework on
one side, production infrastructure on the other. Then, in the smallest
running text on the wall, the about-story: a short paragraph in the
builder's voice, the sound of a person rather than a plaque. And at the
base, the signature line: the registered name beside the degree line,
set the way an architect's name and license sit at the bottom of a sheet —
`Jungwook Van · <degree line>` — small, factual, closing the wall.

Below the signature, one object: a single button drawn as a drawing-office
control, rectangular, hairline-ruled, labeled with the download word in the
visitor's language. It opens the print drawer — the same identity laid flat
(Chapter 03, *The Print Threshold*). One action, because the lobby asks the
visitor to do exactly one thing besides read: take the document with them.

## Light, Material, Shadow

Three materials meet in this room and each keeps its voice. The concrete
walls hold the room's edges in flat mid-gray, brightest where the key
strikes the west return, falling to a soft unlit calm on the east. The
resin — floor plate and thesis wall — lifts a half-step brighter and
warmer, so the room appears to glow slightly from its own surfaces rather
than from any visible source. The aluminum columns run their vertical sheen
quietly at the four corners of the bay, catching just enough key to read as
metal. Shadows are few and all soft: the columns lay short pale diagonals
across the floor plate; the thesis wall's shadow gap draws its outline; the
glass casts almost nothing, only deepening the floor's tone by a breath
where its tint intervenes. Nothing in the lobby is dark. Its lowest value
is the graphite of its letters.

## Interaction

The lobby's answering surfaces follow the site's single hover language. The
floor rail along the frame's left edge offers the building's section; the
thesis wall itself is calm — text is text, and it does not glow, tilt, or
follow the cursor, because the hard bans of the constitution are most
easily broken in a lobby and this one refuses. What answers here: the rail
entries (crosshair, signal edge on the active floor line), the language and
theme chrome in the frame's corners (micro controls, drawn as stamps), and
the one button on the wall. When the visitor hovers the visible laboratory
mass on the floor above — reachable directly from this station, since an
orthographic view keeps the whole model in frame — the standard leader note
appears (`ROOM · L2 · PROJECT 01 · CROWD`) and the lab's outline takes the
heavy blue line. The lobby thereby performs its final duty: from the place
of the thesis, the first piece of evidence is already visible, already
answering, one click away.

## The Flat Projection

In the 2D plan journey, the lobby is the cover sheet: the footprint drawn
at medium weight, the room labeled `L0 · ENTRANCE`, and the thesis wall's
full text set beside the plan in the same top-to-bottom order — kicker,
title, doctrine, tagline, story, signature, one button. Nothing the wall
says in three dimensions is withheld from the flat reader.

## Content Binding

| Surface described above | Data key |
|---|---|
| Kicker call sign | `PROFILE.alias` (`src/data/profile.ts`) |
| Title inscription | fixed site copy — "The Architecture of Software" |
| Doctrine sub-line | fixed site copy — "Software is not written. It is constructed." |
| Tagline | `STRINGS[lang].tagline` (`src/data/strings.ts`) |
| About-story paragraph | `STRINGS[lang].aboutStory` |
| Signature name | `PROFILE.name` |
| Signature degree line | `STRINGS[lang].majorLine` |
| Print button label | `STRINGS[lang].navDownload` |
| Language / theme chrome | site chrome (Chapter 07 owns its grammar) |

## Critique

**The Awwwards juror** asked what stops this from being a hero section with
extra steps. The answer now built into the room: the thesis wall is an
object *inside the model* with a shadow gap and a lighting condition, not a
text layer over a canvas — and the lobby's one-glance link to the first
laboratory makes it a place in a building rather than a landing screen.

**Ando's chair** claimed the floor: an earlier draft placed a reception
plinth and a second exhibit in the lobby; both were removed. The room now
owns its emptiness, and the light patch on the resin floor was added as the
kind of quiet event Ando would keep.

**Rams' chair** cut the wall's contents to seven lines and one button,
rejecting proposals to add proof chips and skill tags at the base — the
manifest belongs to print and to the labs; a thesis wall that also
advertises is neither thesis nor wall.

**The director** ordered the reading sequence — the eye must land on the
title, drop through doctrine to tagline to story to name, and end at the
single button — and required that the language switch re-letter the wall
without layout motion, so the calm never breaks.

**The curator** verified every line of the wall against a real data key
(table above), flagged the two fixed inscriptions as deliberate exceptions
(they are the site's identity, not content), and confirmed the flat
projection carries the full text so the plan reader loses nothing.
