import { STRINGS } from '../data/strings';
import { PROFILE } from '../data/profile';
import { useSite } from '../building/SiteContext';
import { parseHash } from '../building/program';

/** Lobby thesis wall — cover-sheet hierarchy: kicker → title → one line → CTA. */
export function LobbyPanel() {
  const { phase, room, floor, lang, prefer2d, setPrintOpen } = useSite();
  const t = STRINGS[lang];

  /* PlanFallback is the cover sheet on compact / 2D — avoid stacked duplicate thesis. */
  if (prefer2d) return null;
  /* Hard refresh / late boot callbacks must not leave this plate up in a room. */
  if (phase !== 'lobby' || room !== 'lobby' || floor !== 'L0') return null;
  /* Hash is authoritative during goTo races — never show thesis over #/L1/…. */
  const hashRoom = parseHash(typeof window !== 'undefined' ? window.location.hash : '#/L0').room;
  if (hashRoom !== 'lobby') return null;

  const moreLabel = lang === 'ko' ? '더 읽기' : lang === 'ja' ? '続き' : 'Read more';

  return (
    <div className="site-lobby" data-plate="lobby-thesis">
      <p className="site-lobby-kicker">SITE 009 · {PROFILE.alias}</p>
      <h1 className="site-lobby-title">The Architecture of Software</h1>
      <p className="site-lobby-sub">Software is not written. It is constructed.</p>
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
      </div>
    </div>
  );
}
