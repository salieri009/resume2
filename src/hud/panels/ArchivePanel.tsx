import { getLocalizedCredentials } from '../../data/credentials';
import { LINKS } from '../../data/profile';
import { STRINGS } from '../../data/strings';
import { useSite } from '../../building/SiteContext';

/**
 * L4 · the records label — the archive's four letters read one at a time,
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
    <aside className="site-spec" aria-label="Archive and library">
      <header className="site-spec-head">
        <div>
          <p className="site-spec-sheet">{isArchive ? 'ARC · L4' : 'LIB · L4'}</p>
          <h2 className="site-spec-title">
            {isArchive
              ? lang === 'ko'
                ? '기록 보관소'
                : lang === 'ja'
                  ? '記録保管室'
                  : 'The Archive'
              : lang === 'ko'
                ? '도서실'
                : lang === 'ja'
                  ? '図書室'
                  : 'The Library'}
          </h2>
        </div>
        <button type="button" className="site-spec-close" onClick={returnLobby}>
          {lang === 'ko' ? '로비로' : lang === 'ja' ? 'ロビーへ' : 'Lobby'}
        </button>
      </header>

      {isArchive && (
        <dl className="site-spec-meta">
          {credentials.map((c) => (
            <div key={c.id}>
              <dt>{c.seal.replace('\n', ' ')}</dt>
              <dd>
                {c.issuer} — {c.title}
                <br />
                {c.detail}
              </dd>
            </div>
          ))}
        </dl>
      )}

      {isLibrary && (
        <>
          <p className="site-spec-lead">350+ ESSAYS · KO · EN · JA</p>
          <p className="site-spec-overview">
            {lang === 'ko'
              ? '글은 이 문 너머의 서가에 있습니다. 여기 있는 것은 습관입니다.'
              : lang === 'ja'
                ? '文章はこの扉の先の書架にあります。ここにあるのは習慣です.'
                : 'The writing lives past this door; what is kept here is the habit.'}
          </p>
        </>
      )}

      <footer className="site-spec-actions">
        {isArchive ? (
          <button type="button" className="site-btn" onClick={() => goTo('L4', 'library')}>
            {lang === 'ko' ? '서쪽으로 · 도서실' : lang === 'ja' ? '西へ · 図書室' : 'West · Library'}
          </button>
        ) : (
          <>
            <a className="site-btn" href={LINKS.blog} target="_blank" rel="noreferrer">
              {lang === 'ko' ? '서가 열기 ↗' : lang === 'ja' ? '書架を開く ↗' : 'Open the shelves ↗'}
            </a>
            <button type="button" className="site-btn site-btn-ghost" onClick={() => goTo('L4', 'archive')}>
              {lang === 'ko' ? '동쪽으로 · 보관소' : lang === 'ja' ? '東へ · 保管室' : 'East · Archive'}
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
