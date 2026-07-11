import type { Lang, Theme } from '../data/types';
import { SunIcon, MoonIcon, MenuIcon, CloseIcon } from './Icons';

const NAV_ITEMS = [
  { id: 'projects', label: 'projects' },
  { id: 'experience', label: 'experience' },
  { id: 'skills', label: 'skills' },
  { id: 'about', label: 'about' },
  { id: 'contact', label: 'contact' },
] as const;

interface NavProps {
  activeSection: string;
  theme: Theme;
  toggleTheme: () => void;
  lang: Lang;
  setLang: (lang: Lang) => void;
  mobileOpen: boolean;
  toggleMobile: () => void;
}

export function Nav({ activeSection, theme, toggleTheme, lang, setLang, mobileOpen, toggleMobile }: NavProps) {
  const isDark = theme === 'dark';

  return (
    <header className="sal-header">
      <div className="sal-header-inner">
        <a href="#top" className="sal-logo sal-focus">
          Salieri_<span style={{ color: 'var(--c-accent-text)' }}>|</span>
        </a>

        <nav className="sal-desktop-nav" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`sal-nav-link sal-focus${activeSection === item.id ? ' is-active' : ''}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="sal-header-actions">
          <div className="sal-nav-pill sal-desktop-nav">
            <span className="sal-status-dot" />
            <span className="sal-status-text">System: Online</span>
          </div>

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

          <a href="/resume.pdf" className="sal-download-btn sal-desktop-nav sal-focus">
            Download Résumé
          </a>

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
          {NAV_ITEMS.map((item) => (
            <a key={item.id} href={`#${item.id}`} onClick={toggleMobile}>
              {item.label}
            </a>
          ))}
          <a href="/resume.pdf" className="sal-download-btn">
            Download Résumé
          </a>
        </nav>
      )}
    </header>
  );
}
