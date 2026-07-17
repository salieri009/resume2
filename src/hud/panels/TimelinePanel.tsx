import { useEffect } from 'react';
import {
  DEGREE,
  SEMESTER_WAYPOINTS,
  formatDegreePlate,
  formatMark,
} from '../../data/academic';
import { STRINGS } from '../../data/strings';
import { useSite } from '../../building/SiteContext';

/**
 * L1 · the hall's wall label — one stage at a time, read in hard stops
 * (bible 04/L1-TIMELINE). ◀ ▶ and arrow keys hop stops; the last stage
 * carries the completion plate.
 */
export function TimelinePanel() {
  const { room, phase, lang, subStop, setSubStop, returnLobby, setPrintOpen } = useSite();
  const t = STRINGS[lang];
  const active = phase === 'room' && room === 'timeline';

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') setSubStop(Math.max(0, subStop - 1));
      if (e.key === 'ArrowRight') setSubStop(Math.min(SEMESTER_WAYPOINTS.length - 1, subStop + 1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, subStop, setSubStop]);

  if (!active) return null;

  const wp = SEMESTER_WAYPOINTS[Math.min(subStop, SEMESTER_WAYPOINTS.length - 1)];
  const last = subStop === SEMESTER_WAYPOINTS.length - 1;

  return (
    <aside className="site-spec" aria-label="Construction sequence">
      <header className="site-spec-head">
        <div>
          <p className="site-spec-sheet">CUT · HALL · L1</p>
          <h2 className="site-spec-title">
            {DEGREE.institution} · {DEGREE.award}
          </h2>
          <p className="site-spec-sub">
            STAGE {'I'.repeat(subStop + 1)} · {wp.session}
          </p>
        </div>
        <button type="button" className="site-spec-close" onClick={returnLobby}>
          {t.backToLobby}
        </button>
      </header>

      <div className="site-spec-actions" role="group" aria-label="Stages">
        <button
          type="button"
          className="site-btn site-btn-ghost"
          disabled={subStop === 0}
          onClick={() => setSubStop(subStop - 1)}
        >
          ◀
        </button>
        <span className="site-spec-label">
          {subStop + 1} / {SEMESTER_WAYPOINTS.length}
        </span>
        <button
          type="button"
          className="site-btn site-btn-ghost"
          disabled={last}
          onClick={() => setSubStop(subStop + 1)}
        >
          ▶
        </button>
      </div>

      <ul className="site-spec-bullets">
        {wp.highlights.map((h) => (
          <li key={h.short}>
            {h.short} · {formatMark(h.mark, h.grade, lang)}
          </li>
        ))}
      </ul>

      {wp.artifacts && wp.artifacts.length > 0 && (
        <div className="site-spec-receipts">
          <p className="site-spec-label">Delivered</p>
          <ul>
            {wp.artifacts.map((a) => (
              <li key={a.label}>
                <a href={a.url} target="_blank" rel="noreferrer">
                  {a.label} — {a.subject}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {last && <p className="site-spec-overview">{formatDegreePlate(lang)}</p>}

      <footer className="site-spec-actions">
        <button type="button" className="site-btn site-btn-ghost" onClick={() => setPrintOpen(true)}>
          {t.navDownload}
        </button>
      </footer>
    </aside>
  );
}
