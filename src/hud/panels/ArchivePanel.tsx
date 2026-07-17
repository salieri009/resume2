import { getLocalizedCredentials } from '../../data/credentials';
import { LINKS } from '../../data/profile';
import { STRINGS } from '../../data/strings';
import { useSite } from '../../building/SiteContext';

/**
 * L4 · the records label — the archive's letters read one at a time,
 * and the library's single catalogued entry (bible 04/L4-ARCHIVE-LIBRARY).
 */
export function ArchivePanel() {
  const { room, phase, lang, goTo, returnLobby, setPrintOpen } = useSite();
  const t = STRINGS[lang];
  const isArchive = room === 'archive';
  const isLibrary = room === 'library';

  if (phase !== 'room' || (!isArchive && !isLibrary)) return null;

  const credentials = getLocalizedCredentials(lang);

  return (
    <aside className="site-spec site-spec--archive" aria-label="Archive and library">
      <header className="site-spec-head">
        <div>
          <p className="site-spec-sheet">{isArchive ? 'ARC · L4' : 'LIB · L4'}</p>
          <h2 className="site-spec-title">
            {isArchive ? t.archiveTitle : t.libraryTitle}
          </h2>
        </div>
        <button type="button" className="site-spec-close" onClick={returnLobby}>
          {t.backToLobby}
        </button>
      </header>

      {isArchive && (
        <div className="site-spec-cards" role="list">
          {credentials.map((c) => (
            <article key={c.id} className="site-spec-card" role="listitem">
              <p className="site-spec-card-trade">{c.seal.replace('\n', ' ')}</p>
              <p className="site-spec-card-body">
                {c.issuer} — {c.title}
              </p>
              <p className="site-spec-card-meta">{c.detail}</p>
            </article>
          ))}
        </div>
      )}

      {isLibrary && (
        <>
          <p className="site-spec-lead">350+ ESSAYS · KO · EN · JA</p>
          <p className="site-spec-overview">{t.libraryLead}</p>
        </>
      )}

      <footer className="site-spec-actions">
        {isArchive ? (
          <button type="button" className="site-btn" onClick={() => goTo('L4', 'library')}>
            {t.westLibrary}
          </button>
        ) : (
          <>
            <a className="site-btn" href={LINKS.blog} target="_blank" rel="noreferrer">
              {t.openShelves} ↗
            </a>
            <button type="button" className="site-btn site-btn-ghost" onClick={() => goTo('L4', 'archive')}>
              {t.eastArchive}
            </button>
          </>
        )}
        <button type="button" className="site-btn site-btn-ghost" onClick={() => setPrintOpen(true)}>
          {t.navDownload}
        </button>
      </footer>
    </aside>
  );
}
