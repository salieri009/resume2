import { SHEETS } from '../data/sheets';
import type { SheetId } from '../data/sheets';
import type { Strings } from '../data/types';

interface CourseLineProps {
  t: Strings;
  scrollP: number;
  activeSection: string;
  reducedMotion: boolean;
}

/**
 * Sheet index for the drawing set — a set has one, and this is where the
 * A-series numbering becomes a system rather than a label on a modal.
 * The numbering itself lives in data/sheets.ts, shared with the printed set.
 */
export function CourseLine({ t, scrollP, activeSection, reducedMotion }: CourseLineProps) {
  const titles: Record<SheetId, string> = {
    top: t.courseTop,
    projects: t.sectionProjects,
    experience: t.sectionExperience,
    skills: t.sectionSkills,
    voyage: t.voyageTitle,
    about: t.sectionAbout,
    contact: t.navContact,
  };

  return (
    <nav className="sal-course" aria-label="Sheet index">
      <div className="sal-course-track">
        <div className="sal-course-dashes" />
        <div className="sal-course-fill" style={{ height: `${scrollP * 100}%` }} />
        {/* Datum mark — reads the elevation of the sheet you're on. */}
        <div
          className={`sal-course-datum${reducedMotion ? ' is-static' : ''}`}
          style={{ top: `${scrollP * 100}%` }}
          aria-hidden="true"
        >
          ▽
        </div>
        <div className="sal-course-dots">
          {SHEETS.map((s, i) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              /* The dot carries no text, so without this the link has no
                 accessible name at all — it announced as "link" before. */
              aria-label={`${s.no} — ${titles[s.id]}`}
              style={{ '--sheet-i': i } as React.CSSProperties}
              className={`sal-course-dot sal-focus${activeSection === s.id ? ' is-active' : ''}`}
            >
              <span className="sal-course-tick" aria-hidden="true" />
              <span className="sal-course-no" aria-hidden="true">
                {s.no}
              </span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
