import type { ReactNode } from 'react';
import { STRINGS } from '../data/strings';
import { formatDegreePlate, formatProof, SEMESTER_WAYPOINTS, SKILL_PROOFS } from '../data/academic';
import { CREDENTIALS } from '../data/credentials';
import { HERO_CARGO, HERO_PROOFS, LINKS, PROFILE } from '../data/profile';
import { getLocalizedProject, getReceipts, PROJECT_ORDER } from '../data/projects';
import { VOYAGE_ISLANDS } from '../data/voyage';
import { SHEETS } from '../data/sheets';
import type { SheetId } from '../data/sheets';
import { SectionDiagram } from './SectionDiagram';
import { ShippingLane } from './ShippingLane';
import type { Lang, ProjectKey, Strings } from '../data/types';

/**
 * The full A-000–A-600 drawing set, for paper — the deep-dive companion to
 * the conventional résumé (ResumeSheets), always as current as the site, in
 * whatever language the visitor is reading. `?sheets` renders it on screen
 * for inspection — the only way to verify the sheets without a print dialog.
 *
 * Print rules: no CSS 3D (preserve-3d print output is engine-dependent) —
 * sheets carry SVG drawings and typeset data only. Cross-references are sheet
 * numbers, not hyperlinks; URLs appear as plain text, as a printed document
 * demands.
 */

/** Issue date on the title block — real data, stamped at print time. */
const issued = () => new Date().toISOString().slice(0, 10);

/** Same A-100 series the sheet index and the cards use. */
const projectSheetNo = (key: ProjectKey) =>
  `A-1${String(PROJECT_ORDER.indexOf(key) + 1).padStart(2, '0')}`;

interface SheetProps {
  no: string;
  /** Chrome label, drawing-convention English (TITLE SHEET, CASE STUDY …). */
  kind: string;
  /** Localized subject of the sheet. */
  title: string;
  children: ReactNode;
}

function Sheet({ no, kind, title, children }: SheetProps) {
  return (
    <section className="sal-sheet">
      <header className="sal-sheet-head" aria-hidden="true">
        <span className="sal-sheet-no">{no}</span>
        <span className="sal-sheet-kind">{kind}</span>
        <span className="sal-sheet-title">{title}</span>
        <span className="sal-sheet-meta">{`${PROFILE.name} · ${issued()}`}</span>
      </header>
      <div className="sal-sheet-body">{children}</div>
    </section>
  );
}

function SheetBlock({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="sal-sheet-block">
      <div className="sal-sheet-block-label">{label}</div>
      {children}
    </div>
  );
}

/** A-300 rows mirror the six on-screen skill cards; proofs become sheet refs. */
function skillMatrix(t: Strings, lang: Lang) {
  return [
    { label: 'a. Enterprise Software Engineering', desc: t.skillA, tags: 'Java · Python · C# · C++', proof: formatProof(SKILL_PROOFS.enterprise, lang), ref: projectSheetNo('iotbay') },
    { label: 'b. AI / Deep Learning', desc: t.skillB, tags: 'Neural Nets · CNN · YOLOv8 · PyTorch', proof: `${formatProof(SKILL_PROOFS.ai, lang)} · SageMaker`, ref: projectSheetNo('crowd') },
    { label: 'c. Cloud & Data', desc: t.skillC, tags: 'AWS · Docker · Data Engineering · PostgreSQL', proof: formatProof(SKILL_PROOFS.cloud, lang), ref: projectSheetNo('gundam') },
    { label: 'd. Graphics / Game Dev', desc: t.skillD, tags: 'Three.js · GLSL · WebGL', proof: formatProof(SKILL_PROOFS.graphics, lang), ref: projectSheetNo('farm') },
    { label: 'e. Frontend', desc: t.skillE, tags: 'HTML/CSS · JavaScript · React · Next.js', proof: formatProof(SKILL_PROOFS.interactive, lang), ref: projectSheetNo('crowd') },
    { label: 'f. Human Languages', desc: t.languagesLine, tags: 'ROK Army · Interpreter', proof: '350+ essays', ref: LINKS.blog },
  ];
}

interface PrintSetProps {
  lang: Lang;
  /** True when shown via ?sheets — adds the on-screen preview frame. */
  preview: boolean;
  /**
   * True when the sheets ARE the page (?sheets route) rather than a copy of
   * content that already exists on screen — then they must not be aria-hidden.
   */
  standalone?: boolean;
}

export function PrintSet({ lang, preview, standalone }: PrintSetProps) {
  const t = STRINGS[lang];
  const hidden = standalone ? undefined : true;

  const indexTitles: Record<SheetId, string> = {
    top: t.courseTop,
    projects: t.sectionProjects,
    experience: t.sectionExperience,
    skills: t.sectionSkills,
    voyage: t.voyageTitle,
    about: t.sectionAbout,
    contact: t.navContact,
  };

  return (
    <div className={`sal-print${preview ? ' is-preview' : ''}`} aria-hidden={hidden}>
      {/* A-000 — title sheet: the thesis and the stamps that back it. */}
      <Sheet no="A-000" kind="TITLE SHEET" title={t.courseTop}>
        <p className="sal-sheet-alias">{PROFILE.alias}</p>
        <h1 className="sal-sheet-thesis">{t.tagline}</h1>
        <p className="sal-sheet-registry">
          <strong>{PROFILE.name}</strong> — {t.heroRegistryLine}
        </p>

        <p className="sal-sheet-stamp">
          <span className="sal-sheet-stamp-rev">Rev A</span>
          {t.heroProofMicrosoft}
        </p>

        <ul className="sal-sheet-proofs">
          {HERO_PROOFS.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>

        <div className="sal-sheet-plate">
          <div>{formatDegreePlate(lang)}</div>
          <div>
            <span className="sal-sheet-plate-label">CARGO</span>
            {HERO_CARGO.join(' · ')}
          </div>
        </div>

        <dl className="sal-sheet-links">
          <div>
            <dt>EMAIL</dt>
            <dd>{LINKS.email}</dd>
          </div>
          <div>
            <dt>GITHUB</dt>
            <dd>{LINKS.github}</dd>
          </div>
          <div>
            <dt>LINKEDIN</dt>
            <dd>{LINKS.linkedin}</dd>
          </div>
          <div>
            <dt>BLOG</dt>
            <dd>{LINKS.blog}</dd>
          </div>
        </dl>
      </Sheet>

      {/* A-100 — sheet index + case-study register. One numbering, two media:
          these are the same SHEETS the screen rail lists. */}
      <Sheet no="A-100" kind="SHEET INDEX" title={t.sectionProjects}>
        <table className="sal-sheet-table">
          <thead>
            <tr>
              <th>SHEET</th>
              <th>TITLE</th>
            </tr>
          </thead>
          <tbody>
            {SHEETS.map((s) => (
              <tr key={s.id}>
                <td className="sal-sheet-td-no">{s.no}</td>
                <td>{indexTitles[s.id]}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <table className="sal-sheet-table">
          <thead>
            <tr>
              <th>SHEET</th>
              <th>CASE STUDY</th>
              <th>PERIOD</th>
              <th>STAMP</th>
            </tr>
          </thead>
          <tbody>
            {PROJECT_ORDER.map((key) => {
              const p = getLocalizedProject(key, lang);
              return (
                <tr key={key}>
                  <td className="sal-sheet-td-no">{projectSheetNo(key)}</td>
                  <td>{p.title}</td>
                  <td>{p.period}</td>
                  <td>{p.manifest.badge}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Sheet>

      {/* A-101…A-105 — one case study per sheet, drawn around its section
          drawing (the one drawing that prints exactly as authored). */}
      {PROJECT_ORDER.map((key) => {
        const p = getLocalizedProject(key, lang);
        return (
          <Sheet key={key} no={projectSheetNo(key)} kind="CASE STUDY" title={p.title}>
            <p className="sal-sheet-caseline">
              {`${p.period} · ${p.teamSize} · ${p.role}`}
              <span className="sal-sheet-badge">{p.manifest.badge}</span>
            </p>
            <p className="sal-sheet-prose">{p.overview}</p>

            <div className="sal-sheet-dwg">
              <SectionDiagram nodes={p.diagram} ariaLabel={`${p.title} — system section`} />
            </div>

            <div className="sal-sheet-lane">
              <ShippingLane
                laneTitle={t.detailShippingLabel}
                label={p.shipping.label}
                ports={p.shipping.ports}
                reducedMotion={true}
              />
            </div>

            <div className="sal-sheet-cols">
              <SheetBlock label="TECHNICAL DECISIONS">
                <ul className="sal-sheet-list">
                  {p.decisions.map((d) => (
                    <li key={d.choice}>
                      <strong>{d.choice}</strong> — {d.why}
                    </li>
                  ))}
                </ul>
              </SheetBlock>
              <SheetBlock label="REJECTED ALTERNATIVES">
                <ul className="sal-sheet-list">
                  {p.tradeoffs.map((tr) => (
                    <li key={tr.rejected}>
                      <strong className="sal-sheet-strike">{tr.rejected}</strong> — {tr.why}
                    </li>
                  ))}
                </ul>
              </SheetBlock>
            </div>

            <div className="sal-sheet-cols">
              <SheetBlock label="RESULTS">
                <ul className="sal-sheet-list">
                  {p.results.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </SheetBlock>
              <SheetBlock label="LESSONS · NEXT">
                <ul className="sal-sheet-list">
                  {p.lessons.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                  {p.future.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </SheetBlock>
            </div>

            <SheetBlock label="RECEIPTS">
              <p className="sal-sheet-receipts">
                {p.github}
                {getReceipts(p).map((r) => (
                  <span key={r.label}>
                    <br />
                    {`${r.label}: ${r.url}`}
                  </span>
                ))}
              </p>
            </SheetBlock>
          </Sheet>
        );
      })}

      {/* A-200 — timeline: semesters as a schedule of finishes. */}
      <Sheet no="A-200" kind="SCHEDULE" title={t.sectionExperience}>
        <p className="sal-sheet-prose">{t.timelineFoundations}</p>
        <table className="sal-sheet-table">
          <thead>
            <tr>
              <th>SESSION</th>
              <th>SUBJECTS · MARKS</th>
            </tr>
          </thead>
          <tbody>
            {SEMESTER_WAYPOINTS.map((s) => (
              <tr key={s.id}>
                <td className="sal-sheet-td-no">{s.session}</td>
                <td>{s.highlights.map((h) => `${h.short} ${h.mark} ${h.grade}`).join(' · ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="sal-sheet-prose">{t.fullRecordNote}</p>

        <SheetBlock label={t.priorService.toUpperCase()}>
          <p className="sal-sheet-prose">
            <strong>{t.armyName}</strong> — {t.armyRole}
          </p>
          <ul className="sal-sheet-list">
            {CREDENTIALS.map((c) => (
              <li key={c.title + c.issuer}>
                <strong>{c.title}</strong> — {c.issuer}
              </li>
            ))}
          </ul>
        </SheetBlock>
      </Sheet>

      {/* A-300 — skill matrix; on-screen "Proof →" buttons become sheet refs,
          the printed form of a hyperlink. */}
      <Sheet no="A-300" kind="MATRIX" title={t.sectionSkills}>
        <p className="sal-sheet-prose">{t.skillsIntro}</p>
        <table className="sal-sheet-table sal-sheet-table--skills">
          <thead>
            <tr>
              <th>DISCIPLINE</th>
              <th>SCOPE</th>
              <th>STACK</th>
              <th>PROOF</th>
            </tr>
          </thead>
          <tbody>
            {skillMatrix(t, lang).map((row) => (
              <tr key={row.label}>
                <td>{row.label}</td>
                <td>{row.desc}</td>
                <td>{row.tags}</td>
                <td>{`${row.proof} → ${row.ref}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Sheet>

      {/* A-400 — the survey: the CI/CD voyage as tabulated survey data. */}
      <Sheet no="A-400" kind="SURVEY" title={t.voyageTitle}>
        <p className="sal-sheet-prose">{`${t.voyageStart} → ${t.voyageNow}`}</p>
        <table className="sal-sheet-table">
          <thead>
            <tr>
              <th>№</th>
              <th>STATION</th>
              <th>PERIOD</th>
              <th>STACK</th>
              <th>REF</th>
            </tr>
          </thead>
          <tbody>
            {[...VOYAGE_ISLANDS]
              .sort((a, b) => a.order - b.order)
              .map((isl) => (
                <tr key={isl.key}>
                  <td className="sal-sheet-td-no">{String(isl.order).padStart(2, '0')}</td>
                  <td>{isl.label}</td>
                  <td>{isl.period}</td>
                  <td>{isl.stack}</td>
                  <td className="sal-sheet-td-no">{projectSheetNo(isl.key)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </Sheet>

      {/* A-500 — about. */}
      <Sheet no="A-500" kind="NOTES" title={t.sectionAbout}>
        <p className="sal-sheet-prose">{t.aboutStory}</p>
        <p className="sal-sheet-prose">{t.aboutHobbies}</p>
        <p className="sal-sheet-prose">{t.growthArmy}</p>
      </Sheet>

      {/* A-600 — contact, closing with the issue stamp. */}
      <Sheet no="A-600" kind="CONTACT" title={t.navContact}>
        <p className="sal-sheet-prose">{t.contactSub}</p>
        <dl className="sal-sheet-links">
          <div>
            <dt>EMAIL</dt>
            <dd>{LINKS.email}</dd>
          </div>
          <div>
            <dt>GITHUB</dt>
            <dd>{LINKS.github}</dd>
          </div>
          <div>
            <dt>LINKEDIN</dt>
            <dd>{LINKS.linkedin}</dd>
          </div>
          <div>
            <dt>BLOG</dt>
            <dd>{LINKS.blog}</dd>
          </div>
        </dl>
        <p className="sal-sheet-issue">{`PRINTED FROM ${typeof window !== 'undefined' ? window.location.origin : ''} · ${issued()}`}</p>
      </Sheet>
    </div>
  );
}
