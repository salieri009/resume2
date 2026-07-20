import { STRINGS } from '../../data/strings';
import { formatDegreePlate } from '../../data/academic';
import { getLocalizedCredentials } from '../../data/credentials';
import { LINKS, PROFILE } from '../../data/profile';
import { RESUME, RESUME_FACTS, formatRange, topMarks } from '../../data/resume';
import { ResumePage } from './ResumePage';
import { ProjectEntry, Section, SkillList, displayUrl } from './ResumeBits';

/**
 * 점핏/원티드-style free-form developer resume: link-forward header,
 * short intro, grouped stack, project-centric body with quantified
 * bullets, then 학력·병역·수상 on page 2.
 */
export function ResumeKO() {
  const t = STRINGS.ko;
  const c = RESUME.ko;
  const creds = getLocalizedCredentials('ko');
  const ms = creds.find((x) => x.id === 'msshowcase');
  const build = creds.find((x) => x.id === 'build');
  const main = c.projects.filter((p) => !p.compact);
  const tail = c.projects.filter((p) => p.compact);
  const origin = typeof window !== 'undefined' ? window.location.origin : '';

  return (
    <>
      <ResumePage id="ko/1" pageLabel="1 / 2">
        <header className="resume-head">
          <h1 className="resume-name">{`${RESUME_FACTS.koName} (${PROFILE.name})`}</h1>
          <p className="resume-name-sub">{t.roleLine}</p>
          <p className="resume-contact">
            <span>{c.location}</span>
            <span>{LINKS.email}</span>
            <span>{displayUrl(LINKS.github)}</span>
            <span>{displayUrl(LINKS.blog)}</span>
            <span>{displayUrl(LINKS.linkedin)}</span>
          </p>
        </header>

        <Section title="소개">
          <p className="resume-summary">{c.summary}</p>
        </Section>

        {/* 해외 학위는 한국 시장의 차별화 요소 — primacy 슬롯인 1페이지 상단에 배치. */}
        <Section title="학력">
          <div className="resume-entry">
            <div className="resume-entry-head">
              <span className="resume-entry-title">시드니공과대학교 (UTS) — 정보기술학사</span>
              <span className="resume-entry-period">
                {formatRange('ko', RESUME_FACTS.utsFrom, RESUME_FACTS.utsTo)}
              </span>
            </div>
            <p className="resume-line-sub">{formatDegreePlate('ko')}</p>
            <p className="resume-line-sub">{t.majorLine}</p>
            <p className="resume-line-sub">{`주요 성적: ${topMarks('ko')}`}</p>
          </div>
        </Section>

        <Section title="기술 스택">
          <SkillList groups={c.skillGroups} />
        </Section>

        <Section title="프로젝트">
          {main.map((e) => (
            <ProjectEntry key={e.key} entry={e} lang="ko" />
          ))}
        </Section>
      </ResumePage>

      <ResumePage id="ko/2" pageLabel="2 / 2">
        <div className="resume-cont-head">
          <span className="resume-cont-name">{`${RESUME_FACTS.koName} (${PROFILE.name})`}</span>
          <span>{t.roleLine}</span>
        </div>

        <Section title="프로젝트 (계속)">
          {tail.map((e) => (
            <ProjectEntry key={e.key} entry={e} lang="ko" />
          ))}
        </Section>

        <Section title="병역">
          <div className="resume-entry">
            <div className="resume-entry-head">
              <span className="resume-entry-title">{`${t.armyName} — 통역병`}</span>
              <span className="resume-entry-role">만기 전역</span>
              <span className="resume-entry-period">
                {formatRange('ko', RESUME_FACTS.armyFrom, RESUME_FACTS.armyTo)}
              </span>
            </div>
            <ul className="resume-bullets">
              {c.serviceBullets?.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        </Section>

        <Section title="수상 및 기타">
          <ul className="resume-bullets">
            {ms && <li>{`${ms.issuer} — ${ms.title} · 620명 중 선발`}</li>}
            {build && <li>{`${build.issuer} — ${build.title}`}</li>}
            <li>기술 블로그 — 350편 이상의 글 (igewaedam630.tistory.com)</li>
            <li>{t.languagesLine}</li>
          </ul>
        </Section>

        <p className="resume-foot">
          {`상세 프로젝트 문서와 이 이력서는 포트폴리오 사이트에서 생성됩니다: ${origin || displayUrl(LINKS.github)}`}
        </p>
      </ResumePage>
    </>
  );
}
