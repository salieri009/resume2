import type { Lang } from '../../data/types';
import { ResumeEN } from './ResumeEN';
import { ResumeKO } from './ResumeKO';
import { ResumeJA } from './ResumeJA';
import '../../styles/resume.css';

/**
 * The printed résumé — exactly two clamped A4 pages, one market-conventional
 * format per language (see resume.css / data/resume.ts). Printing the site
 * emits this; the full A-000–A-600 drawing set stays on PrintSet behind
 * `?sheets`. Same mount contract as PrintSet: hidden until `is-preview`,
 * aria-hidden unless it IS the page (`?sheets=r`).
 */
export function ResumeSheets({
  lang,
  preview,
  standalone,
}: {
  lang: Lang;
  /** True when shown via ?sheets=r or the print drawer — adds the on-screen paper frame. */
  preview: boolean;
  /** True when the sheets ARE the page rather than a copy of on-screen content. */
  standalone?: boolean;
}) {
  const Body = lang === 'ko' ? ResumeKO : lang === 'ja' ? ResumeJA : ResumeEN;
  return (
    <div
      className={`resume-print resume-${lang}${preview ? ' is-preview' : ''}`}
      lang={lang}
      aria-hidden={standalone ? undefined : true}
    >
      <Body />
    </div>
  );
}
