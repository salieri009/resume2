import { FLOORS, SHIPPED_ROOMS, projectKeyOf, tagOf, type RoomId } from '../building/program';
import { useSite } from '../building/SiteContext';
import { STRINGS } from '../data/strings';
import { PROFILE, LINKS } from '../data/profile';
import { getLocalizedProject, getReceipts } from '../data/projects';
import { AXONO_LAYERS, DEGREE, SEMESTER_WAYPOINTS, formatDegreePlate, formatMark } from '../data/academic';
import { CORE_RISERS, RISER_DESC } from '../data/skills';
import { getLocalizedCredentials } from '../data/credentials';
import type { Lang } from '../data/types';

const REASON: Record<'webgl' | 'mobile' | 'reduced', string> = {
  webgl: 'WEBGL UNAVAILABLE · ORTHOGRAPHIC PLAN MODE',
  reduced: 'REDUCED MOTION · FINAL POSES ONLY',
  mobile: 'COMPACT VIEWPORT · PLAN INDEX',
};

/**
 * 2D plan fallback — the same building, projected flat, for mobile / no-WebGL /
 * reduced-motion. Redesigned per Hallmark within the SITE 009 system: a title
 * block, a tabular spec, and an index-style key plan. No side-stripes, no
 * invented facts, signal on interaction only.
 */
export function PlanFallback({ reason }: { reason: 'webgl' | 'mobile' | 'reduced' }) {
  const { goTo, returnLobby, floor, room, phase, lang, setPrintOpen } = useSite();
  const t = STRINGS[lang];
  /* Phase is authoritative — do not keep the cover just because room===lobby
     after a hard-refresh race (L0 → L1/timeline must clear the thesis plate). */
  const showCover = phase === 'lobby' || phase === 'boot';

  return (
    <div className="site-plan">
      {showCover ? (
        <header className="site-plan-mast">
          <p className="site-plan-kicker">SITE 009 · {PROFILE.alias} · REVISION A · PLAN VIEW</p>
          <h1 className="site-plan-title">The Architecture of Software</h1>
          <p className="site-plan-thesis">Software is not written. It is constructed.</p>

          <dl className="site-plan-spec">
            <div>
              <dt>WHO</dt>
              <dd>{PROFILE.name} · {t.roleLine}</dd>
            </div>
            <div>
              <dt>DEGREE</dt>
              <dd>{DEGREE.award} · {DEGREE.institution}</dd>
            </div>
            <div>
              <dt>RECORD</dt>
              <dd>
                GPA {DEGREE.gpa}/7.0 · WAM {DEGREE.wam} · {DEGREE.creditPoints} CP ·{' '}
                {DEGREE.status.toUpperCase()}
              </dd>
            </div>
            <div>
              <dt>CONTACT</dt>
              <dd>
                <a href={`mailto:${LINKS.email}`}>{LINKS.email}</a> ·{' '}
                <a href={LINKS.github} target="_blank" rel="noreferrer">
                  GITHUB
                </a>{' '}
                ·{' '}
                <a href={LINKS.linkedin} target="_blank" rel="noreferrer">
                  LINKEDIN
                </a>
              </dd>
            </div>
            <div>
              <dt>MODE</dt>
              <dd>{REASON[reason]}</dd>
            </div>
          </dl>

          <div className="site-plan-actions">
            <button type="button" className="site-btn" onClick={() => goTo('L2', 'crowd')}>
              {t.enterLabs}
            </button>
            <button type="button" className="site-btn site-btn-ghost" onClick={() => setPrintOpen(true)}>
              {t.navDownload}
            </button>
          </div>

          <details className="site-plan-more">
            <summary>{t.readMore}</summary>
            <p className="site-plan-about">{t.tagline}</p>
            <p className="site-plan-about">{t.aboutStory}</p>
            <p className="site-plan-about">{t.majorLine}</p>
          </details>
        </header>
      ) : (
        <PlanRoomSheet room={room} lang={lang} onLobby={returnLobby} onPrint={() => setPrintOpen(true)} />
      )}

      <nav className="site-plan-index" aria-label="Floor index — key plan">
        <p className="site-plan-index-label">{t.floorIndex}</p>
        <div className="site-plan-key">
          {FLOORS.map((f) => (
            <section key={f.id} className={`site-plan-key-floor${floor === f.id ? ' is-active' : ''}`}>
              <button
                type="button"
                className="site-plan-key-head"
                onClick={() => {
                  if (f.id === 'L0') returnLobby();
                  const first = f.rooms.find((r) => SHIPPED_ROOMS.includes(r.id));
                  if (first && f.id !== 'L0') goTo(f.id, first.id);
                }}
              >
                <span className="site-plan-key-id">{f.id}</span>
                <span className="site-plan-key-label">{f.label}</span>
              </button>
              <ul className="site-plan-key-rooms">
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
                        <span className="site-plan-key-tag">{r.tag}</span>
                        {!ok && r.id !== 'lobby' ? <span className="site-plan-key-tbd">TBD</span> : null}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </nav>
    </div>
  );
}

interface SpecRow {
  k: string;
  v: string;
}

function PlanRoomSheet({
  room,
  lang,
  onLobby,
  onPrint,
}: {
  room: RoomId;
  lang: Lang;
  onLobby: () => void;
  onPrint: () => void;
}) {
  const t = STRINGS[lang];
  const sheet = tagOf(room);
  const projectKey = projectKeyOf(room);

  let title = sheet;
  let lead = '';
  let rows: SpecRow[] = [];
  let links: { label: string; href: string }[] = [];

  if (projectKey) {
    const p = getLocalizedProject(projectKey, lang);
    title = p.title;
    lead = p.summary;
    rows = [
      { k: 'STACK', v: p.stack.join(' · ') },
      { k: 'ROLE', v: `${p.role} · ${p.period}` },
      ...p.results.slice(0, 3).map((r, i) => ({ k: i === 0 ? 'RESULTS' : '', v: r })),
    ];
    links = getReceipts(p).map((r) => ({ label: r.label, href: r.url }));
    links.push({ label: 'GitHub', href: p.github });
  } else if (room === 'timeline') {
    title = `${DEGREE.institution} · ${DEGREE.award}`;
    lead = formatDegreePlate(lang);
    rows = [
      { k: 'EXEMPT', v: `${AXONO_LAYERS[0].blocks.map((b) => b.label).join(' · ').toUpperCase()} · RETAINED` },
      ...SEMESTER_WAYPOINTS.map((wp) => {
        const top = wp.highlights[0];
        const artifact = wp.artifacts?.[0]?.label;
        const mark = top ? `${top.short} ${formatMark(top.mark, top.grade, lang)}` : '';
        return { k: wp.session, v: `${mark}${artifact ? ` · ▸ ${artifact}` : ''}` };
      }),
    ];
  } else if (room === 'core') {
    title = t.sectionSkills;
    lead = t.skillsIntro;
    rows = CORE_RISERS.map((r) => ({ k: `${r.letter} · ${r.trade}`, v: t[RISER_DESC[r.id]] }));
  } else if (room === 'server') {
    title = PROFILE.githubUser;
    lead = t.serverLead;
    links = [{ label: `github.com/${PROFILE.githubUser}`, href: LINKS.github }];
  } else if (room === 'archive') {
    title = t.archiveTitle;
    rows = getLocalizedCredentials(lang).map((c) => ({ k: c.issuer, v: c.title }));
  } else if (room === 'library') {
    title = t.libraryTitle;
    lead = '350+ ESSAYS · KO · EN · JA';
    links = [{ label: t.openShelves, href: LINKS.blog }];
  } else if (room === 'roof') {
    title = PROFILE.name;
    lead = t.contactTitle;
    links = [
      { label: 'MAIL', href: `mailto:${LINKS.email}` },
      { label: 'GITHUB', href: LINKS.github },
      { label: 'LINKEDIN', href: LINKS.linkedin },
      { label: 'LIBRARY', href: LINKS.blog },
    ];
  }

  return (
    <section className="site-plan-sheet" aria-label="Room wall label">
      <header className="site-plan-sheet-head">
        <div>
          <p className="site-plan-sheet-code">{sheet}</p>
          <h2 className="site-plan-sheet-title">{title}</h2>
          {lead ? <p className="site-plan-sheet-lead">{lead}</p> : null}
        </div>
        <button type="button" className="site-spec-close" onClick={onLobby}>
          {t.backToLobby}
        </button>
      </header>

      {rows.length > 0 && (
        <dl className="site-plan-spec">
          {rows.map((row, i) => (
            <div key={`${row.k}${i}`}>
              <dt>{row.k}</dt>
              <dd>{row.v}</dd>
            </div>
          ))}
        </dl>
      )}

      {links.length > 0 && (
        <div className="site-plan-doors">
          <p className="site-plan-doors-label">Doors</p>
          <ul>
            {links.map((l) => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noreferrer">
                  {l.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <footer className="site-plan-sheet-foot">
        <button type="button" className="site-btn site-btn-ghost" onClick={onPrint}>
          {t.navDownload}
        </button>
      </footer>
    </section>
  );
}
