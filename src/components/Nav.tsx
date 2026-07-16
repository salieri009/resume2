import { memo } from 'react';
import type { Lang, Strings, Theme } from '../data/types';
import { SunIcon, MoonIcon, MenuIcon, CloseIcon } from './Icons';

const NAV_IDS = ['projects', 'experience', 'skills', 'voyage', 'about', 'contact'] as const;

const NAV_LABEL_KEYS: Record<(typeof NAV_IDS)[number], keyof Strings> = {
  projects: 'navProjects',
  experience: 'navExperience',
  skills: 'navSkills',
  voyage: 'navVoyage',
  about: 'navAbout',
  contact: 'navContact',
};

interface NavProps {
  t: Strings;
  activeSection: string;
  theme: Theme;
  toggleTheme: () => void;
  lang: Lang;
  setLang: (lang: Lang) => void;
  mobileOpen: boolean;
  toggleMobile: () => void;
  /** Prints the two-page R-series résumé (PrintSet). */
  onPrint: () => void;
}

export const Nav = memo(function Nav({
  t,
  activeSection,
  theme,
  toggleTheme,
  lang,
  setLang,
  mobileOpen,
  toggleMobile,
  onPrint,
}: NavProps) {
  const isDark = theme === 'dark';

  return (
    <header className="sal-header">
      <div className="sal-header-inner">
        <a href="#top" className="sal-logo sal-focus">
          Salieri_<span style={{ color: 'var(--c-accent-text)' }}>|</span>
        </a>

        <nav className="sal-desktop-nav" aria-label="Primary">
          {NAV_IDS.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className={`sal-nav-link sal-focus${activeSection === id ? ' is-active' : ''}`}
            >
              {t[NAV_LABEL_KEYS[id]]}
            </a>
          ))}
        </nav>

        <div className="sal-header-actions">
          <div role="group" aria-label="Language" className="sal-lang-group">
            {(['en', 'ko', 'ja'] as const).map((code) => (
              <button
                key={code}
                type="button"
                className={`sal-lang-btn sal-focus${lang === code ? ' is-active' : ''}`}
                onClick={() => setLang(code)}
              >
                {code === 'en' ? 'EN' : code === 'ko' ? '한' : '日'}
              </button>
            ))}
          </div>

          <button
            type="button"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={toggleTheme}
            className="sal-icon-btn sal-focus"
          >
            {isDark ? <MoonIcon /> : <SunIcon />}
          </button>

          <button
            type="button"
            onClick={onPrint}
            className="sal-download-btn sal-desktop-nav sal-focus"
          >
            {t.navDownload}
          </button>

          <button
            type="button"
            className="sal-hamburger sal-focus"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={toggleMobile}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="sal-mobile-nav">
          {NAV_IDS.map((id) => (
            <a key={id} href={`#${id}`} onClick={toggleMobile}>
              {t[NAV_LABEL_KEYS[id]]}
            </a>
          ))}
          <button type="button" onClick={onPrint} className="sal-download-btn">
            {t.navDownload}
          </button>
        </nav>
      )}
    </header>
  );
});
