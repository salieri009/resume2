import { FLOORS, SHIPPED_ROOMS, projectKeyOf, tagOf, type RoomId } from '../building/program';
import { useSite } from '../building/SiteContext';
import { STRINGS } from '../data/strings';
import { PROFILE, LINKS } from '../data/profile';
import { getLocalizedProject, getReceipts } from '../data/projects';
import { DEGREE, SEMESTER_WAYPOINTS, formatDegreePlate } from '../data/academic';
import { getLocalizedCredentials } from '../data/credentials';
import type { Lang } from '../data/types';

/**
 * 2D plan fallback when WebGL fails, reduced-motion prefers list, or mobile.
 * Cover sheet on lobby; off-lobby = floor index + wall-label facts (Ch.03/08 parity).
 */
export function PlanFallback({ reason }: { reason: 'webgl' | 'mobile' | 'reduced' }) {
  const { goTo, returnLobby, floor, room, phase, lang, setPrintOpen } = useSite();
  const t = STRINGS[lang];
  /* Phase is authoritative — do not keep the cover just because room===lobby
     after a hard-refresh race (L0 → L1/timeline must clear the thesis plate). */
  const showCover = phase === 'lobby' || phase === 'boot';
  const moreLabel = t.readMore;

  return (
    <div className="site-plan">
      {showCover && (
        <header className="site-plan-head">
          <p className="site-plan-kicker">SITE 009 · {PROFILE.alias} · PLAN VIEW</p>
          <h1>The Architecture of Software</h1>
          <p className="site-plan-sub">Software is not written. It is constructed.</p>
          <p className="site-lobby-role">{t.roleLine}</p>
          <p className="site-plan-reason">
            {reason === 'webgl'
              ? 'WebGL unavailable — orthographic plan mode.'
              : reason === 'reduced'
                ? 'Reduced motion — final poses only.'
                : 'Compact viewport — plan index.'}
          </p>
          <p className="site-plan-tag">{t.tagline}</p>
          <details className="site-plan-more">
            <summary>{moreLabel}</summary>
            <p className="site-plan-about">{t.aboutStory}</p>
          </details>
          <p className="site-plan-name">
            {PROFILE.name} · {t.majorLine}
          </p>
          <div className="site-plan-actions">
            <button type="button" className="site-btn" onClick={() => setPrintOpen(true)}>
              {t.navDownload}
            </button>
            <a className="site-btn site-btn-ghost" href={LINKS.github} target="_blank" rel="noreferrer">
              GITHUB
            </a>
            <a className="site-btn site-btn-ghost" href={LINKS.linkedin} target="_blank" rel="noreferrer">
              LINKEDIN
            </a>
            <a className="site-btn site-btn-ghost" href={`mailto:${LINKS.email}`}>
              {t.navContact.toUpperCase()}
            </a>
          </div>
        </header>
      )}

      {!showCover && (
        <PlanRoomSheet
          room={room}
          lang={lang}
          onLobby={returnLobby}
          onPrint={() => setPrintOpen(true)}
        />
      )}

      <nav className="site-plan-index" aria-label="Floor index">
        <p className="site-plan-index-label">
          {t.floorIndex}
        </p>
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
      </nav>
    </div>
  );
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
  let bullets: string[] = [];
  let links: { label: string; href: string }[] = [];

  if (projectKey) {
    const p = getLocalizedProject(projectKey, lang);
    title = p.title;
    lead = p.summary;
    bullets = [p.stack.join(' · '), `${p.role} · ${p.period}`, ...p.results.slice(0, 3)];
    links = getReceipts(p).map((r) => ({ label: r.label, href: r.url }));
    links.push({ label: 'GitHub', href: p.github });
  } else if (room === 'timeline') {
    title = `${DEGREE.institution} · ${DEGREE.award}`;
    lead = formatDegreePlate(lang);
    bullets = SEMESTER_WAYPOINTS.map((wp) => `${wp.session} · ${wp.highlights[0]?.short ?? ''}`);
  } else if (room === 'core') {
    title = t.sectionSkills;
    lead = t.skillsIntro;
    bullets = [t.skillA, t.skillB, t.skillC, t.skillD, t.skillE];
  } else if (room === 'server') {
    title = PROFILE.githubUser;
    lead = t.serverLead;
    links = [{ label: `github.com/${PROFILE.githubUser}`, href: LINKS.github }];
  } else if (room === 'archive') {
    title = t.archiveTitle;
    bullets = getLocalizedCredentials(lang).map((c) => `${c.issuer} — ${c.title}`);
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
      {bullets.length > 0 && (
        <ul className="site-spec-bullets">
          {bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      )}
      {links.length > 0 && (
        <div className="site-spec-receipts">
          <p className="site-spec-label">Doors</p>
          <ul>
            {links.map((l) => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noreferrer">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      <footer className="site-spec-actions">
        <button type="button" className="site-btn site-btn-ghost" onClick={onPrint}>
          {t.navDownload}
        </button>
      </footer>
    </section>
  );
}
