import { STRINGS } from '../data/strings';
import { LINKS, PROFILE } from '../data/profile';
import { useSite } from '../building/SiteContext';

/**
 * Title block — the architect field of the sheet. Real drawings name who drew
 * them and how to reach them; this one does too, from the first painted frame
 * (no phase gate — the boot must not be identity-dead). Unlike BootLabels this
 * is real content, never aria-hidden, and sits first in reading order.
 */
export function TitleBlock() {
  const { phase, bootDone, lang } = useSite();
  const t = STRINGS[lang];

  return (
    <header className={`site-titleblock${phase === 'boot' && !bootDone ? ' is-inking' : ''}`}>
      <p className="site-titleblock-name">{PROFILE.name}</p>
      <p className="site-titleblock-role">{t.roleLine}</p>
      <p className="site-titleblock-links">
        <a href={`mailto:${LINKS.email}`}>{LINKS.email}</a>
        <a href={LINKS.github} target="_blank" rel="noreferrer">
          GITHUB
        </a>
        <a href={LINKS.linkedin} target="_blank" rel="noreferrer">
          LINKEDIN
        </a>
      </p>
    </header>
  );
}
