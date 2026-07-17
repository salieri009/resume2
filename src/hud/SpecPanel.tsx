import { getLocalizedProject, getReceipts } from '../data/projects';
import { STRINGS } from '../data/strings';
import { projectKeyOf } from '../building/program';
import { useSite } from '../building/SiteContext';

/** Spec sheet for the active lab — fed by PROJECTS.*, not marketing copy. */
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

      <p className="site-spec-lead">{p.summary}</p>
      <p className="site-spec-overview">{p.overview}</p>

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
