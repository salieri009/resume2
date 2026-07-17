import { LINKS, PROFILE } from '../../data/profile';
import { STRINGS } from '../../data/strings';
import { useSite } from '../../building/SiteContext';

/**
 * B2 · the cellar's label — one identification, one door (bible 04/B2-SERVER).
 * The labs cite receipts; this is where the citations resolve.
 */
export function ServerPanel() {
  const { room, phase, lang, returnLobby, setPrintOpen } = useSite();
  const t = STRINGS[lang];

  if (phase !== 'room' || room !== 'server') return null;

  return (
    <aside className="site-spec" aria-label="Server room">
      <header className="site-spec-head">
        <div>
          <p className="site-spec-sheet">SYS · GITHUB · B2</p>
          <h2 className="site-spec-title">{PROFILE.githubUser}</h2>
          <p className="site-spec-sub">{t.serverLead}</p>
        </div>
        <button type="button" className="site-spec-close" onClick={returnLobby}>
          {t.backToLobby}
        </button>
      </header>

      <footer className="site-spec-actions">
        <a className="site-btn" href={LINKS.github} target="_blank" rel="noreferrer">
          github.com/{PROFILE.githubUser}
        </a>
        <button type="button" className="site-btn site-btn-ghost" onClick={() => setPrintOpen(true)}>
          {t.navDownload}
        </button>
      </footer>
    </aside>
  );
}
