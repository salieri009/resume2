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
    <aside className="site-spec" aria-label="Mechanical core">
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

      <dl className="site-spec-meta">
        {CARDS.map((c) => (
          <div key={c.trade}>
            <dt>{c.trade}</dt>
            <dd>
              {t[c.desc]}
              <br />
              {c.tools}
              <br />
              {formatProof(SKILL_PROOFS[c.key], lang)}
              {c.extra ? ` · ${c.extra}` : ''} ·{' '}
              <button
                type="button"
                className="site-spec-close"
                onClick={() => goTo(c.serves.floor, c.serves.room)}
              >
                SERVES · {c.serves.label}
              </button>
            </dd>
          </div>
        ))}
        <div>
          <dt>F · INTERCOM</dt>
          <dd>
            한국어 · Native — English · Fluent — 日本語 · Learning — Deutsch · Learning
            <br />
            ROK Army · Interpreter ·{' '}
            <a href={LINKS.blog} target="_blank" rel="noreferrer">
              SERVES · L4 LIBRARY ↗
            </a>
          </dd>
        </div>
      </dl>

      <footer className="site-spec-actions">
        <button type="button" className="site-btn site-btn-ghost" onClick={() => setPrintOpen(true)}>
          {t.navDownload}
        </button>
      </footer>
    </aside>
  );
}
