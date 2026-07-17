import { FLOORS, SHIPPED_ROOMS } from '../building/program';
import { useSite } from '../building/SiteContext';
import { STRINGS } from '../data/strings';
import { PROFILE } from '../data/profile';

/**
 * 2D plan fallback when WebGL fails, reduced-motion prefers list, or mobile.
 * Same SpecPanel / navigation contract — no empty canvas.
 */
export function PlanFallback({ reason }: { reason: 'webgl' | 'mobile' | 'reduced' }) {
  const { goTo, returnLobby, floor, room, phase, lang, setPrintOpen } = useSite();
  const t = STRINGS[lang];
  /* Phase is authoritative — do not keep the cover just because room===lobby
     after a hard-refresh race (L0 → L1/timeline must clear the thesis plate). */
  const showCover = phase === 'lobby' || phase === 'boot';

  return (
    <div className="site-plan">
      {showCover && (
        <header className="site-plan-head">
          <p className="site-plan-kicker">SITE 009 · {PROFILE.alias} · PLAN VIEW</p>
          <h1>The Architecture of Software</h1>
          <p className="site-plan-sub">Software is not written. It is constructed.</p>
          <p className="site-plan-reason">
            {reason === 'webgl'
              ? 'WebGL unavailable — orthographic plan mode.'
              : reason === 'reduced'
                ? 'Reduced motion — final poses only.'
                : 'Compact viewport — plan index.'}
          </p>
          <p className="site-plan-tag">{t.tagline}</p>
          <p className="site-plan-about">{t.aboutStory}</p>
          <p className="site-plan-name">
            {PROFILE.name} · {t.majorLine}
          </p>
        </header>
      )}

      <ul className="site-plan-floors">
        {FLOORS.map((f) => (
          <li key={f.id} className={floor === f.id ? 'is-active' : ''}>
            <button
              type="button"
              className="site-plan-floor"
              onClick={() => {
                if (f.id === 'L0') returnLobby();
                const first = f.rooms.find((r) => SHIPPED_ROOMS.includes(r.id));
                if (first && f.id !== 'L0') goTo(f.id, first.id);
              }}
            >
              <span>{f.id}</span>
              <span>{f.label}</span>
            </button>
            <ul>
              {f.rooms.map((r) => {
                const ok = SHIPPED_ROOMS.includes(r.id);
                return (
                  <li key={r.id}>
                    <button
                      type="button"
                      disabled={!ok}
                      className={room === r.id ? 'is-room-active' : ''}
                      onClick={() => ok && goTo(f.id, r.id)}
                    >
                      {r.tag}
                      {!ok && r.id !== 'lobby' ? ' · TBD' : ''}
                    </button>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>

      {showCover && (
        <button type="button" className="site-btn" onClick={() => setPrintOpen(true)}>
          {t.navDownload}
        </button>
      )}
    </div>
  );
}
