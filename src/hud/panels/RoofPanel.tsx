import { LINKS, PROFILE } from '../../data/profile';
import { STRINGS } from '../../data/strings';
import { useSite } from '../../building/SiteContext';

/**
 * R · the identity plate's interactive twin — four doors in full text and
 * the farewell (bible 04/R-ROOF). Doors leave the building standing; the
 * farewell rolls the drawing up.
 */
export function RoofPanel() {
  const { room, phase, lang, returnLobby, endSite } = useSite();
  const t = STRINGS[lang];

  if (phase !== 'room' || room !== 'roof') return null;

  return (
    <aside className="site-spec" aria-label="Roof — contact">
      <header className="site-spec-head">
        <div>
          <p className="site-spec-sheet">OBS · R · {PROFILE.alias} · SITE 009</p>
          <h2 className="site-spec-title">{PROFILE.name}</h2>
          <p className="site-spec-sub">{t.contactTitle}</p>
        </div>
        <button type="button" className="site-spec-close" onClick={returnLobby}>
          {lang === 'ko' ? '로비로' : lang === 'ja' ? 'ロビーへ' : 'Lobby'}
        </button>
      </header>

      <p className="site-spec-lead">{t.contactSub}</p>

      <div className="site-spec-receipts">
        <ul>
          <li>
            <a href={`mailto:${LINKS.email}`}>{LINKS.email}</a>
          </li>
          <li>
            <a href={LINKS.github} target="_blank" rel="noreferrer">
              {LINKS.github.replace('https://', '')}
            </a>
          </li>
          <li>
            <a href={LINKS.linkedin} target="_blank" rel="noreferrer">
              {LINKS.linkedin.replace('https://', '')}
            </a>
          </li>
          <li>
            <a href={LINKS.blog} target="_blank" rel="noreferrer">
              {LINKS.blog.replace('https://', '')}
            </a>
          </li>
        </ul>
      </div>

      <footer className="site-spec-actions">
        <button type="button" className="site-btn site-btn-ghost" onClick={endSite}>
          REVISION A · END OF SET
        </button>
      </footer>
    </aside>
  );
}
