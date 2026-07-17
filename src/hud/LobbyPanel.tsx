import { STRINGS } from '../data/strings';
import { PROFILE } from '../data/profile';
import { useSite } from '../building/SiteContext';
import { parseHash } from '../building/program';

/**
 * Lobby thesis wall — cover-sheet hierarchy only:
 * kicker → title → one thesis line → role stamp → CTA pair.
 * Long copy lives in details; outbound links live on the roof / rail.
 */
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

  return (
    <div className="site-lobby" data-plate="lobby-thesis">
      <p className="site-lobby-kicker">SITE 009 · {PROFILE.alias} · REVISION A</p>
      <h1 className="site-lobby-title">The Architecture of Software</h1>
      <p className="site-lobby-sub">Software is not written. It is constructed.</p>
      <p className="site-lobby-role">
        {PROFILE.name} · {t.roleLine}
      </p>
      <div className="site-lobby-actions">
        <button type="button" className="site-btn" onClick={() => goTo('L2', 'crowd')}>
          {t.enterLabs}
        </button>
        <button type="button" className="site-btn site-btn-ghost" onClick={() => setPrintOpen(true)}>
          {t.navDownload}
        </button>
      </div>
      <details className="site-lobby-more">
        <summary>{t.readMore}</summary>
        <p className="site-lobby-about">{t.tagline}</p>
        <p className="site-lobby-about">{t.aboutStory}</p>
        <p className="site-lobby-name">{t.majorLine}</p>
      </details>
    </div>
  );
}
