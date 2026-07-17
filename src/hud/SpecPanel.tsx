import { getLocalizedProject, getReceipts } from '../data/projects';
import { STRINGS } from '../data/strings';
import { projectKeyOf } from '../building/program';
import { useSite } from '../building/SiteContext';

/**
 * Spec sheet for the active lab — Ch.07 reading order:
 * identification → vitals → narrative → results → door.
 */
export function SpecPanel() {
  const { room, lang, phase, returnLobby, setPrintOpen } = useSite();
  const t = STRINGS[lang];

  const projectKey = projectKeyOf(room);
  if (phase !== 'room' || !projectKey) return null;

  const p = getLocalizedProject(projectKey, lang);
  const receipts = getReceipts(p);

  return (
    <aside className="site-spec" aria-label="Room specification">
      <header className="site-spec-head">
        <div>
          <p className="site-spec-sheet">{p.category}</p>
          <h2 className="site-spec-title">{p.title}</h2>
          <p className="site-spec-sub">{p.manifest.footer}</p>
        </div>
        <button type="button" className="site-spec-close" onClick={returnLobby}>
          {lang === 'ko' ? '로비로' : lang === 'ja' ? 'ロビーへ' : 'Lobby'}
        </button>
      </header>

      <dl className="site-spec-meta">
        <div>
          <dt>Stack</dt>
          <dd>{p.stack.join(' · ')}</dd>
        </div>
        <div>
          <dt>Role</dt>
          <dd>{p.role}</dd>
        </div>
        <div>
          <dt>Period</dt>
          <dd>
            {p.period} · {p.teamSize}
          </dd>
        </div>
        <div>
          <dt>Outcome</dt>
          <dd>{p.outcome}</dd>
        </div>
      </dl>

      <p className="site-spec-lead">{p.summary}</p>
      <p className="site-spec-overview">{p.overview}</p>

      {/* Engineering narrative (bible 04 wall-label order): the sections a
          technical interviewer actually reads — problems, decisions, refusals. */}
      {p.problems.length > 0 && (
        <div className="site-spec-narrative">
          <p className="site-spec-label">Problems → Answers</p>
          <ul className="site-spec-pairs">
            {p.problems.map((pr) => (
              <li key={pr.p}>
                <span className="site-spec-pair-p">{pr.p}</span>
                <span className="site-spec-pair-s">{pr.s}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {p.decisions.length > 0 && (
        <div className="site-spec-narrative">
          <p className="site-spec-label">Decisions</p>
          <ul className="site-spec-pairs">
            {p.decisions.map((d) => (
              <li key={d.choice}>
                <span className="site-spec-pair-p">{d.choice}</span>
                <span className="site-spec-pair-s">{d.why}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {p.tradeoffs.length > 0 && (
        <div className="site-spec-narrative">
          <p className="site-spec-label">Trade-offs</p>
          <ul className="site-spec-pairs">
            {p.tradeoffs.map((d) => (
              <li key={d.rejected}>
                <span className="site-spec-pair-p">✕ {d.rejected}</span>
                <span className="site-spec-pair-s">{d.why}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {(p.lessons.length > 0 || p.future.length > 0) && (
        <div className="site-spec-narrative">
          <p className="site-spec-label">Lessons · Next</p>
          <ul className="site-spec-bullets">
            {p.lessons.map((l) => (
              <li key={l}>{l}</li>
            ))}
            {p.future.map((f) => (
              <li key={f} className="site-spec-next">
                → {f}
              </li>
            ))}
          </ul>
        </div>
      )}

      {p.results.length > 0 && (
        <ul className="site-spec-bullets">
          {p.results.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      )}

      {receipts.length > 0 && (
        <div className="site-spec-receipts">
          <p className="site-spec-label">Receipts</p>
          <ul>
            {receipts.map((r) => (
              <li key={r.label}>
                <a href={r.url} target="_blank" rel="noreferrer">
                  {r.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <footer className="site-spec-actions">
        <a className="site-btn" href={p.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <button type="button" className="site-btn site-btn-ghost" onClick={() => setPrintOpen(true)}>
          {t.navDownload}
        </button>
      </footer>
    </aside>
  );
}
