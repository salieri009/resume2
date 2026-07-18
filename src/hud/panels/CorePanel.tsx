import { SKILL_PROOFS, formatProof } from '../../data/academic';
import { CORE_RISERS, RISER_DESC, RISER_GAUGE } from '../../data/skills';
import { LINKS } from '../../data/profile';
import { STRINGS } from '../../data/strings';
import { useSite } from '../../building/SiteContext';

/** Ring weight tracks the pipe gauge — the heaviest trade draws the boldest symbol. */
const symbolWeight = (id: keyof typeof RISER_GAUGE) =>
  1 + ((RISER_GAUGE[id] - 0.11) / (0.17 - 0.11)) * 1.6;

/**
 * B1 · the plant room's services schedule (bible 04/B1-CORE flat projection):
 * one ruled row per riser — a circled symbol whose weight tracks its gauge,
 * the trade and its tools, the real gauge reading (the C at HD size), and the
 * destination it serves. The drawing a services engineer would actually make.
 */
export function CorePanel() {
  const { room, phase, lang, goTo, returnLobby, setPrintOpen } = useSite();
  const t = STRINGS[lang];

  if (phase !== 'room' || room !== 'core') return null;

  return (
    <aside className="site-spec site-spec--core" aria-label="Mechanical core">
      <header className="site-spec-head">
        <div>
          <p className="site-spec-sheet">MECH · CORE · B1</p>
          <h2 className="site-spec-title">{t.sectionSkills}</h2>
          <p className="site-spec-sub">{t.skillsIntro}</p>
        </div>
        <button type="button" className="site-spec-close" onClick={returnLobby}>
          {t.backToLobby}
        </button>
      </header>

      <div className="site-riser-schedule">
        {CORE_RISERS.map((r) => (
          <div key={r.id} className="site-riser-row">
            <span className="site-riser-symbol" style={{ borderWidth: `${symbolWeight(r.id)}px` }}>
              {r.letter}
            </span>
            <div className="site-riser-main">
              <p className="site-riser-trade">{r.trade}</p>
              <p className="site-riser-desc">{t[RISER_DESC[r.id]]}</p>
              <p className="site-riser-tools">
                {r.tools.join(' · ')}
                {r.extra ? ` · ${r.extra}` : ''}
              </p>
            </div>
            <div className="site-riser-read">
              <p className="site-riser-gauge">{formatProof(SKILL_PROOFS[r.id], lang)}</p>
              <button
                type="button"
                className="site-riser-serve"
                onClick={() => goTo(r.serves.floor, r.serves.room)}
              >
                SERVES · {r.serves.tag} →
              </button>
            </div>
          </div>
        ))}

        <div className="site-riser-row site-riser-row--intercom">
          <span className="site-riser-symbol">F</span>
          <div className="site-riser-main">
            <p className="site-riser-trade">INTERCOM</p>
            <p className="site-riser-desc">{t.languagesLine}</p>
            <p className="site-riser-tools">ROK Army · Interpreter</p>
          </div>
          <div className="site-riser-read">
            <a className="site-riser-serve" href={LINKS.blog} target="_blank" rel="noreferrer">
              SERVES · L4 LIBRARY ↗
            </a>
          </div>
        </div>
      </div>

      <footer className="site-spec-actions">
        <button type="button" className="site-btn site-btn-ghost" onClick={() => setPrintOpen(true)}>
          {t.navDownload}
        </button>
      </footer>
    </aside>
  );
}
