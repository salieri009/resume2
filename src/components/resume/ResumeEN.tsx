import { STRINGS } from '../../data/strings';
import { DEGREE } from '../../data/academic';
import { getLocalizedCredentials } from '../../data/credentials';
import { LINKS, PROFILE } from '../../data/profile';
import { RESUME, RESUME_FACTS, formatRange, topMarks } from '../../data/resume';
import { ResumePage } from './ResumePage';
import { ProjectEntry, Section, SkillList, displayUrl } from './ResumeBits';

/**
 * Australian new-grad two-pager: single column, ATS-safe headings, no
 * photo/DOB/nationality (anti-discrimination convention), page 2 carries
 * the name header and page number.
 */
export function ResumeEN() {
  const t = STRINGS.en;
  const c = RESUME.en;
  const creds = getLocalizedCredentials('en');
  const ms = creds.find((x) => x.id === 'msshowcase');
  const build = creds.find((x) => x.id === 'build');
  const main = c.projects.filter((p) => !p.compact);
  const tail = c.projects.filter((p) => p.compact);
  const origin = typeof window !== 'undefined' ? window.location.origin : '';

  return (
    <>
      <ResumePage id="en/1" pageLabel="Page 1 of 2">
        <header className="resume-head">
          <h1 className="resume-name">{PROFILE.name}</h1>
          <p className="resume-name-sub">{t.roleLine}</p>
          <p className="resume-contact">
            <span>{c.location}</span>
            <span>{LINKS.email}</span>
            <span>{displayUrl(LINKS.github)}</span>
            <span>{displayUrl(LINKS.linkedin)}</span>
            <span>{displayUrl(LINKS.blog)}</span>
          </p>
        </header>

        <Section title="Professional Summary">
          <p className="resume-summary">{c.summary}</p>
        </Section>

        {/* Education sits on page 1 for a new grad — the eye-tracking-backed
            convention: the strongest credential must land inside the first
            scan, not mid-page-2. */}
        <Section title="Education">
          <div className="resume-entry">
            <div className="resume-entry-head">
              <span className="resume-entry-title">{DEGREE.award}</span>
              <span className="resume-entry-role">{DEGREE.institution}</span>
              <span className="resume-entry-period">
                {formatRange('en', RESUME_FACTS.utsFrom, RESUME_FACTS.utsTo)}
              </span>
            </div>
            <p className="resume-line-sub">{t.majorLine}</p>
            <p className="resume-line-sub">
              {`GPA ${DEGREE.gpa}/7.0 · WAM ${DEGREE.wam} · ${DEGREE.creditPoints} credit points`}
            </p>
            <p className="resume-line-sub">{`Key results: ${topMarks('en')}`}</p>
          </div>
        </Section>

        <Section title="Technical Skills">
          <SkillList groups={c.skillGroups} />
        </Section>

        <Section title="Projects">
          {main.map((e) => (
            <ProjectEntry key={e.key} entry={e} lang="en" />
          ))}
        </Section>
      </ResumePage>

      <ResumePage id="en/2" pageLabel="Page 2 of 2">
        <div className="resume-cont-head">
          <span className="resume-cont-name">{PROFILE.name}</span>
          <span>{t.roleLine}</span>
        </div>

        <Section title="Projects (continued)">
          {tail.map((e) => (
            <ProjectEntry key={e.key} entry={e} lang="en" />
          ))}
        </Section>

        <Section title="Experience">
          <div className="resume-entry">
            <div className="resume-entry-head">
              <span className="resume-entry-title">Interpreter / Translator</span>
              <span className="resume-entry-role">{t.armyName}</span>
              <span className="resume-entry-period">
                {formatRange('en', RESUME_FACTS.armyFrom, RESUME_FACTS.armyTo)}
              </span>
            </div>
            <ul className="resume-bullets">
              {c.serviceBullets?.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        </Section>

        <Section title="Awards & Certifications">
          <ul className="resume-bullets">
            {ms && <li>{`${ms.issuer} — ${ms.title} · selected 1 of 620`}</li>}
            {build && <li>{`${build.issuer} — ${build.title}`}</li>}
            <li>{`Technical writing — 350+ published essays (${displayUrl(LINKS.blog)})`}</li>
          </ul>
        </Section>

        <Section title="Languages">
          <p className="resume-line">{t.languagesLine}</p>
        </Section>

        <Section title="References">
          <p className="resume-line">Available upon request.</p>
        </Section>

        <p className="resume-foot">
          {`Full project documentation and this résumé are generated from the portfolio: ${origin || displayUrl(LINKS.github)}`}
        </p>
      </ResumePage>
    </>
  );
}
