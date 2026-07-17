import { STRINGS } from '../data/strings';
import { PROFILE } from '../data/profile';
import { useSite } from '../building/SiteContext';

/** Lobby thesis wall — tagline + identity from existing data. */
export function LobbyPanel() {
  const { phase, room, lang, setPrintOpen } = useSite();
  const t = STRINGS[lang];

  if (phase !== 'lobby' || room !== 'lobby') return null;

  return (
    <div className="site-lobby">
      <p className="site-lobby-kicker">SITE 009 · {PROFILE.alias}</p>
      <h1 className="site-lobby-title">The Architecture of Software</h1>
      <p className="site-lobby-sub">Software is not written. It is constructed.</p>
      <p className="site-lobby-tag">{t.tagline}</p>
      <p className="site-lobby-about">{t.aboutStory}</p>
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
