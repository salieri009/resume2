import type { ReactNode } from 'react';
import type { Lang } from '../../data/types';
import type { ResumeProjectEntry } from '../../data/resume';
import { getLocalizedProject } from '../../data/projects';

/** 'https://www.github.com/x' → 'github.com/x' — printed documents show plain hosts. */
export function displayUrl(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="resume-section">
      <h2 className="resume-h">{title}</h2>
      {children}
    </section>
  );
}

export function SkillList({ groups }: { groups: { label: string; items: string }[] }) {
  return (
    <dl className="resume-skills">
      {groups.map((g) => (
        <div key={g.label} style={{ display: 'contents' }}>
          <dt>{g.label}</dt>
          <dd>{g.items}</dd>
        </div>
      ))}
    </dl>
  );
}

/** One project entry — title/role/period header, stack line, bullets. */
export function ProjectEntry({
  entry,
  lang,
  stackLabel,
}: {
  entry: ResumeProjectEntry;
  lang: Lang;
  /** JA 職務経歴書 prefixes the stack line with 開発環境. */
  stackLabel?: string;
}) {
  const p = getLocalizedProject(entry.key, lang);
  return (
    <div className="resume-entry">
      <div className="resume-entry-head">
        <span className="resume-entry-title">{p.title}</span>
        <span className="resume-entry-role">{entry.role}</span>
        <span className="resume-entry-period">{entry.period}</span>
      </div>
      <p className="resume-entry-stack">
        {stackLabel ? `${stackLabel}${p.stack.join(' · ')}` : p.stack.join(' · ')}
        {` — ${displayUrl(p.github)}`}
      </p>
      <ul className="resume-bullets">
        {entry.bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    </div>
  );
}
