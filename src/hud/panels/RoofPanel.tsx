import { LINKS, PROFILE } from '../../data/profile';
import { STRINGS } from '../../data/strings';
import { useSite } from '../../building/SiteContext';

const DOORS: { label: string; href: string; external?: boolean }[] = [
  { label: 'MAIL', href: `mailto:${LINKS.email}` },
  { label: 'GITHUB', href: LINKS.github, external: true },
  { label: 'LINKEDIN', href: LINKS.linkedin, external: true },
  { label: 'LIBRARY', href: LINKS.blog, external: true },
];

/**
 * R · schedule index for the engraved plate — not a second business card
 * (bible 04/R-ROOF). Full addresses live on the plaque; doors are labels.
 */
export function RoofPanel() {
  const { room, phase, lang, returnLobby, endSite, setPrintOpen } = useSite();
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
          {t.backToLobby}
        </button>
      </header>

      <p className="site-spec-overview">{t.roofLead}</p>

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
          </a>
        ))}
      </div>

      <footer className="site-spec-actions">
        <button type="button" className="site-btn" onClick={() => setPrintOpen(true)}>
          {t.navDownload}
        </button>
        <button type="button" className="site-btn site-btn-ghost" onClick={endSite}>
          REVISION A · END OF SET
        </button>
      </footer>
    </aside>
  );
}
