import { memo } from 'react';
import { DEGREE, SEMESTER_WAYPOINTS, formatGpaWam, formatMark } from '../data/academic';
import { getLocalizedCredentials } from '../data/credentials';
import type { Lang, Strings } from '../data/types';

interface ExperienceProps {
  t: Strings;
  lang: Lang;
  revealed: boolean;
  revealRef: (el: HTMLElement | null) => void;
}

const SEMESTER_COPY: Record<
  (typeof SEMESTER_WAYPOINTS)[number]['id'],
  { title: keyof Strings; body: keyof Strings }
> = {
  spr24: { title: 'semesterSpr24Title', body: 'semesterSpr24Body' },
  aut25: { title: 'semesterAut25Title', body: 'semesterAut25Body' },
  spr25: { title: 'semesterSpr25Title', body: 'semesterSpr25Body' },
  aut26: { title: 'semesterAut26Title', body: 'semesterAut26Body' },
};

export const Experience = memo(function Experience({ t, lang, revealed, revealRef }: ExperienceProps) {
  return (
    <section
      id="experience"
      data-reveal-key="experience"
      ref={revealRef}
      className={`sal-section${revealed ? ' is-revealed' : ''}`}
    >
      <div className="sal-section-header">
        <span className="sal-section-num">02.</span>
        <h2 className="sal-section-title">{t.sectionExperience}</h2>
        <div className="sal-section-rule" />
      </div>

      <p className="sal-section-intro">{t.growthIntro}</p>

      <div className="sal-timeline">
        <div className="sal-timeline-row">
          <div className="sal-timeline-rail">
            <div className="sal-timeline-dot is-current" />
            <div className="sal-timeline-line" />
          </div>
          <div className="sal-timeline-body">
            <div className="sal-timeline-meta">
              <span className="sal-mono" style={{ fontSize: 12, color: 'var(--c-accent-text)' }}>
                {DEGREE.startYear} — {DEGREE.completedYear}
              </span>
              <span className="sal-badge">
                {DEGREE.status} · {DEGREE.creditPoints} CP
              </span>
            </div>
            <h3 className="sal-timeline-h3">{DEGREE.institution}</h3>
            <p className="sal-timeline-p1">{DEGREE.award}</p>
            <p className="sal-timeline-p2">
              {t.majorLine} · {formatGpaWam(lang)}
            </p>
            <p className="sal-timeline-p3">{t.growthUts}</p>
            <p className="sal-timeline-foundations">{t.timelineFoundations}</p>
            <p className="sal-eyebrow" style={{ marginTop: 8 }}>
              {t.exemptionsNote}
            </p>
          </div>
        </div>

        {SEMESTER_WAYPOINTS.map((wp, idx) => {
          const copy = SEMESTER_COPY[wp.id];
          const isLast = idx === SEMESTER_WAYPOINTS.length - 1;
          return (
            <div key={wp.id} className="sal-timeline-row">
              <div className="sal-timeline-rail">
                <div className={`sal-timeline-dot${isLast ? ' is-current' : ' is-past'}`} />
                {!isLast && <div className="sal-timeline-line" />}
              </div>
              <div className="sal-timeline-body">
                <div className="sal-timeline-meta">
                  <span className="sal-mono" style={{ fontSize: 12, color: 'var(--c-accent-text)' }}>
                    {wp.session}
                  </span>
                  <span className="sal-badge">WP-0{idx + 1}</span>
                </div>
                <h3 className="sal-timeline-h3">{t[copy.title]}</h3>
                <p className="sal-timeline-p3">{t[copy.body]}</p>
                <div className="sal-tag-row">
                  {wp.highlights.map((h) => (
                    <span key={h.short} className="sal-pill-outline">
                      {h.short} · {formatMark(h.mark, h.grade, lang)}
                    </span>
                  ))}
                  {wp.artifacts?.map((a) => (
                    <a
                      key={a.url}
                      href={a.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sal-artifact-chip sal-focus"
                      title={a.subject}
                    >
                      {a.label} ↗
                    </a>
                  ))}
                </div>
              </div>
            </div>
          );
        })}

        <div className="sal-timeline-row">
          <div className="sal-timeline-rail">
            <div className="sal-timeline-dot is-past" />
          </div>
          <div>
            <span className="sal-mono" style={{ fontSize: 12, color: 'var(--c-accent-text)' }}>
              {t.priorService}
            </span>
            <h3 className="sal-timeline-h3">{t.armyName}</h3>
            <p className="sal-timeline-p1">{t.armyRole}</p>
            <p
              style={{
                margin: 0,
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                lineHeight: 1.6,
                color: 'var(--c-text-muted)',
              }}
            >
              {t.growthArmy}
            </p>
          </div>
        </div>
      </div>

      {/* Letters of commendation — the military ones sit right under Prior Service. */}
      <div className="sal-cred-block">
        <div className="sal-cred-heading">
          <span className="sal-eyebrow" style={{ color: 'var(--c-accent-text)' }}>
            {t.credentialsNote}
          </span>
          <h3 className="sal-timeline-h3">{t.credentialsTitle}</h3>
        </div>
        <div className="sal-cred-grid">
          {getLocalizedCredentials(lang).map((c) => (
            <article key={c.id} className="sal-cred-card">
              <span className="sal-cred-seal" aria-hidden="true">
                {c.seal}
              </span>
              <span className="sal-eyebrow">{c.issuer}</span>
              <h4 className="sal-cred-title">{c.title}</h4>
              <p className="sal-cred-detail">{c.detail}</p>
            </article>
          ))}
        </div>
      </div>

      <p className="sal-full-record">{t.fullRecordNote}</p>
    </section>
  );
});
