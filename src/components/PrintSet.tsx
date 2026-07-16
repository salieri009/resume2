import type { ReactNode } from 'react';
import { STRINGS } from '../data/strings';
import { formatDegreePlate } from '../data/academic';
import { HERO_CARGO, HERO_PROOFS, LINKS, PROFILE } from '../data/profile';
import type { Lang } from '../data/types';

/**
 * The drawing set, for paper: printing the site emits real A-000–A-600
 * sheets instead of a screenshot of the screen. This is the résumé — always
 * as current as the site, in whatever language the visitor is reading.
 *
 * Mounted on demand (App listens to beforeprint; the résumé buttons just call
 * window.print()) because the case-study content otherwise only exists inside
 * the modal. `?sheets` renders it on screen for inspection — the only way to
 * verify the sheets without a print dialog.
 *
 * Print rules: no CSS 3D (preserve-3d print output is engine-dependent) —
 * sheets carry SVG drawings and typeset data only. Cross-references are sheet
 * numbers, not hyperlinks; URLs appear as plain text, as a printed document
 * demands.
 */

/** Issue date on the title block — real data, stamped at print time. */
const issued = () => new Date().toISOString().slice(0, 10);

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

interface PrintSetProps {
  lang: Lang;
  /** True when shown via ?sheets — adds the on-screen preview frame. */
  preview: boolean;
}

export function PrintSet({ lang, preview }: PrintSetProps) {
  const t = STRINGS[lang];

  return (
    <div className={`sal-print${preview ? ' is-preview' : ''}`} aria-hidden="true">
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
    </div>
  );
}
