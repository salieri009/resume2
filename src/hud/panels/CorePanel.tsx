import { SKILL_PROOFS, formatProof } from '../../data/academic';
import { LINKS } from '../../data/profile';
import { STRINGS } from '../../data/strings';
import { useSite } from '../../building/SiteContext';
import type { FloorId, RoomId } from '../../building/program';

const CARDS: {
  trade: string;
  key: keyof typeof SKILL_PROOFS;
  desc: 'skillA' | 'skillB' | 'skillC' | 'skillD' | 'skillE';
  tools: string;
  serves: { floor: FloorId; room: RoomId; label: string };
  extra?: string;
}[] = [
  {
    trade: 'A · ENTERPRISE',
    key: 'enterprise',
    desc: 'skillA',
    tools: 'Java · Python · C# · C++',
    serves: { floor: 'L2', room: 'iotbay', label: 'A-102 · IOTBAY' },
  },
  {
    trade: 'B · AI / DEEP LEARNING',
    key: 'ai',
    desc: 'skillB',
    tools: 'Neural Nets · CNN · YOLOv8 · PyTorch',
    serves: { floor: 'L2', room: 'crowd', label: 'A-101 · CROWD' },
    extra: 'SageMaker',
  },
  {
    trade: 'C · CLOUD & DATA',
    key: 'cloud',
    desc: 'skillC',
    tools: 'AWS · Docker · Data Engineering · PostgreSQL',
    serves: { floor: 'L2', room: 'gundam', label: 'A-104 · GUNDAM' },
  },
  {
    trade: 'D · GRAPHICS',
    key: 'graphics',
    desc: 'skillD',
    tools: 'Three.js · GLSL · WebGL',
    serves: { floor: 'L2', room: 'farm', label: 'A-103 · FARM' },
  },
  {
    trade: 'E · FRONTEND',
    key: 'interactive',
    desc: 'skillE',
    tools: 'HTML/CSS · JavaScript · React · Next.js',
    serves: { floor: 'L2', room: 'crowd', label: 'A-101 · CROWD' },
  },
];

/**
 * B1 · the plant room's schedule — riser cards with real gauges and
 * destinations (bible 04/B1-CORE): every pipe goes somewhere, and the C
 * reads at the same size as the HDs.
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
          {lang === 'ko' ? '로비로' : lang === 'ja' ? 'ロビーへ' : 'Lobby'}
        </button>
      </header>

      <div className="site-spec-cards">
        {CARDS.map((c) => (
          <article key={c.trade} className="site-spec-card">
            <p className="site-spec-card-trade">{c.trade}</p>
            <p className="site-spec-card-body">{t[c.desc]}</p>
            <p className="site-spec-card-meta">
              {c.tools}
              {c.extra ? ` · ${c.extra}` : ''}
            </p>
            <p className="site-spec-card-gauge">{formatProof(SKILL_PROOFS[c.key], lang)}</p>
            <button
              type="button"
              className="site-spec-serve"
              onClick={() => goTo(c.serves.floor, c.serves.room)}
            >
              SERVES · {c.serves.label}
            </button>
          </article>
        ))}
        <article className="site-spec-card">
          <p className="site-spec-card-trade">F · INTERCOM</p>
          <p className="site-spec-card-body">
            한국어 · Native — English · Fluent — 日本語 · Learning — Deutsch · Learning
          </p>
          <p className="site-spec-card-meta">ROK Army · Interpreter</p>
          <a className="site-spec-serve" href={LINKS.blog} target="_blank" rel="noreferrer">
            SERVES · L4 LIBRARY ↗
          </a>
        </article>
      </div>

      <footer className="site-spec-actions">
        <button type="button" className="site-btn site-btn-ghost" onClick={() => setPrintOpen(true)}>
          {t.navDownload}
        </button>
      </footer>
    </aside>
  );
}
