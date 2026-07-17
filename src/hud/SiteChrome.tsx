import type { Lang, Theme } from '../data/types';
import { useSite } from '../building/SiteContext';

export function SiteChrome() {
  const { lang, setLang, theme, setTheme, setPrintOpen } = useSite();

  return (
    <div className="site-chrome">
      <div className="site-chrome-langs" role="group" aria-label="Language">
        {(['en', 'ko', 'ja'] as Lang[]).map((l) => (
          <button
            key={l}
            type="button"
            className={lang === l ? 'is-active' : ''}
            aria-pressed={lang === l}
            onClick={() => setLang(l)}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="site-chrome-theme"
        onClick={() => setTheme((theme === 'light' ? 'dark' : 'light') as Theme)}
        aria-label="Toggle theme"
      >
        {theme === 'light' ? 'INK' : 'PAPER'}
      </button>
      <button
        type="button"
        className="site-chrome-print"
        aria-label="Open document — résumé sheets"
        onClick={() => setPrintOpen(true)}
      >
        DOC
      </button>
    </div>
  );
}
