import { STRINGS } from '../../data/strings';
import { LINKS, PROFILE } from '../../data/profile';
import { RESUME, RESUME_FACTS } from '../../data/resume';
import { ResumePage } from './ResumePage';
import { ProjectEntry, Section, SkillList, displayUrl } from './ResumeBits';

/**
 * JA hybrid: page 1 is a 履歴書 (JIS-like bordered tables, 編年体 学歴・職歴,
 * 免許・資格, 自己PR — no photo or 生年月日 by design: this is a web-generated
 * document), page 2 is a 職務経歴書 (職務要約 + per-project blocks with
 * 開発環境/担当業務).
 */
export function ResumeJA() {
  const t = STRINGS.ja;
  const c = RESUME.ja;
  const now = new Date();
  const dateLine = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日現在`;
  const origin = typeof window !== 'undefined' ? window.location.origin : '';

  return (
    <>
      <ResumePage id="ja/1" pageLabel="1 / 2">
        <div className="resume-ja-doc-head">
          <h1 className="resume-ja-title">履歴書</h1>
          <span className="resume-ja-date">{dateLine}</span>
        </div>

        <section className="resume-section">
          <table className="resume-ja-table">
            <tbody>
              <tr>
                <th className="resume-ja-ym">ふりがな</th>
                <td>{RESUME_FACTS.furigana}</td>
              </tr>
              <tr>
                <th>氏名</th>
                <td>
                  <span className="resume-ja-name">{RESUME_FACTS.hanjaName}</span>
                  {`（${PROFILE.name}）`}
                </td>
              </tr>
              <tr>
                <th>現住所</th>
                <td>{c.location}</td>
              </tr>
              <tr>
                <th>連絡先</th>
                <td>{LINKS.email}</td>
              </tr>
              <tr>
                <th>GitHub / ブログ</th>
                <td>{`${displayUrl(LINKS.github)} · ${displayUrl(LINKS.blog)}`}</td>
              </tr>
              <tr>
                <th>LinkedIn</th>
                <td>{displayUrl(LINKS.linkedin)}</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="resume-section">
          <table className="resume-ja-table">
            <thead>
              <tr>
                <th className="resume-ja-ym">年月</th>
                <th>学歴・職歴</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={2} className="resume-ja-center">
                  <strong>学歴</strong>
                </td>
              </tr>
              {c.jaEducationRows?.map((r) => (
                <tr key={r.ym + r.event}>
                  <td className="resume-ja-ym">{r.ym}</td>
                  <td>{r.event}</td>
                </tr>
              ))}
              <tr>
                <td colSpan={2} className="resume-ja-center">
                  <strong>職歴</strong>
                </td>
              </tr>
              {c.jaCareerRows?.map((r) => (
                <tr key={r.ym + r.event}>
                  <td className="resume-ja-ym">{r.ym}</td>
                  <td>{r.event}</td>
                </tr>
              ))}
              <tr>
                <td />
                <td className="resume-ja-right">以上</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="resume-section">
          <table className="resume-ja-table">
            <thead>
              <tr>
                <th className="resume-ja-ym">年月</th>
                <th>免許・資格・表彰</th>
              </tr>
            </thead>
            <tbody>
              {c.jaLicenses?.map((r) => (
                <tr key={r.name}>
                  <td className="resume-ja-ym">{r.ym}</td>
                  <td>{r.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <Section title="自己PR">
          <p className="resume-summary">{c.summary}</p>
        </Section>

        <section className="resume-section">
          <table className="resume-ja-table">
            <tbody>
              <tr>
                <th className="resume-ja-ym">本人希望記入欄</th>
                <td>{t.contactSub}</td>
              </tr>
            </tbody>
          </table>
        </section>
      </ResumePage>

      <ResumePage id="ja/2" pageLabel="2 / 2">
        <div className="resume-ja-doc-head">
          <h1 className="resume-ja-title">職務経歴書</h1>
          <span className="resume-ja-date">{`${RESUME_FACTS.hanjaName}（${PROFILE.name}） · ${dateLine}`}</span>
        </div>

        <Section title="職務要約">
          <p className="resume-summary">{c.jaSummaryOfWork}</p>
        </Section>

        <Section title="テクニカルスキル">
          <SkillList groups={c.skillGroups} />
        </Section>

        <Section title="開発プロジェクト">
          {c.projects.map((e) => (
            <ProjectEntry key={e.key} entry={e} lang="ja" stackLabel="開発環境：" />
          ))}
        </Section>

        <Section title="語学">
          <p className="resume-line">{t.languagesLine}</p>
        </Section>

        <p className="resume-foot">
          {`各プロジェクトの詳細資料と本書はポートフォリオサイトから生成されています: ${origin || displayUrl(LINKS.github)}`}
        </p>
      </ResumePage>
    </>
  );
}
