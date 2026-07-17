import { STRINGS } from '../data/strings';
import { LINKS, PROFILE } from '../data/profile';
import { useSite } from '../building/SiteContext';
import { parseHash } from '../building/program';

/** Lobby thesis wall — cover-sheet hierarchy: kicker → title → one line → CTA. */
export function LobbyPanel() {
  const { phase, room, floor, lang, prefer2d, setPrintOpen, goTo } = useSite();
  const t = STRINGS[lang];

  /* PlanFallback is the cover sheet on compact / 2D — avoid stacked duplicate thesis. */
  if (prefer2d) return null;
  /* Hard refresh / late boot callbacks must not leave this plate up in a room. */
  if (phase !== 'lobby' || room !== 'lobby' || floor !== 'L0') return null;
  /* Hash is authoritative during goTo races — never show thesis over #/L1/…. */
  const hashRoom = parseHash(typeof window !== 'undefined' ? window.location.hash : '#/L0').room;
  if (hashRoom !== 'lobby') return null;

  const moreLabel = t.readMore;

  return (
    <div className="site-lobby" data-plate="lobby-thesis">
      <p className="site-lobby-kicker">SITE 009 · {PROFILE.alias}</p>
      <h1 className="site-lobby-title">The Architecture of Software</h1>
      <p className="site-lobby-sub">Software is not written. It is constructed.</p>
      <p className="site-lobby-role">{t.roleLine}</p>
      <p className="site-lobby-tag">{t.tagline}</p>
      <details className="site-lobby-more">
        <summary>{moreLabel}</summary>
        <p className="site-lobby-about">{t.aboutStory}</p>
      </details>
      <p className="site-lobby-name">
        {PROFILE.name} · {t.majorLine}
      </p>
      <div className="site-lobby-actions">
        <button type="button" className="site-btn" onClick={() => setPrintOpen(true)}>
          {t.navDownload}
        </button>
        <a className="site-btn site-btn-ghost" href={LINKS.github} target="_blank" rel="noreferrer">
          GITHUB
        </a>
        <a className="site-btn site-btn-ghost" href={LINKS.linkedin} target="_blank" rel="noreferrer">
          LINKEDIN
        </a>
        <button type="button" className="site-btn site-btn-ghost" onClick={() => goTo('R', 'roof')}>
          {t.navContact.toUpperCase()}
        </button>
      </div>
    </div>
  );
}
