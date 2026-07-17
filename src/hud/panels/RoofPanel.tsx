import { LINKS, PROFILE } from '../../data/profile';
import { STRINGS } from '../../data/strings';
import { useSite } from '../../building/SiteContext';

const DOORS: { label: string; href: string; external?: boolean }[] = [
  { label: 'MAIL', href: `mailto:${LINKS.email}` },
  { label: 'GITHUB', href: LINKS.github, external: true },
  { label: 'LINKEDIN', href: LINKS.linkedin, external: true },
  { label: 'LIBRARY', href: LINKS.blog, external: true },
];

function doorDisplay(href: string) {
  return href.replace(/^https?:\/\//, '').replace(/^mailto:/, '');
}

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
    <aside className="site-spec site-spec--roof" aria-label="Roof — contact">
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

      <div className="site-spec-cards" role="list">
        {DOORS.map((d) => (
          <a
            key={d.label}
            className="site-spec-card site-spec-card--door"
            role="listitem"
            href={d.href}
            {...(d.external ? { target: '_blank', rel: 'noreferrer' } : {})}
          >
            <p className="site-spec-card-trade">{d.label}</p>
            <p className="site-spec-card-body">{doorDisplay(d.href)}</p>
          </a>
        ))}
      </div>

      <footer className="site-spec-actions">
        <button type="button" className="site-btn site-btn-ghost" onClick={endSite}>
          REVISION A · END OF SET
        </button>
      </footer>
    </aside>
  );
}
