import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import type { Lang, ProjectKey, Theme } from './data/types';
import { PROJECT_ORDER } from './data/projects';
import { STRINGS } from './data/strings';
import { useReducedMotion } from './hooks/useReducedMotion';
import { useScrollProgress } from './hooks/useScrollProgress';
import { useSectionSpy } from './hooks/useSectionSpy';
import { useReveal } from './hooks/useReveal';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { Nav } from './components/Nav';
import { CourseLine } from './components/CourseLine';
import { Hero } from './components/Hero';
import { ProjectsBento } from './components/ProjectsBento';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { VoyageChart } from './components/VoyageChart';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { ProjectDetail } from './components/ProjectDetail';
import { PrintSet } from './components/PrintSet';

const REVEAL_KEYS = ['projects', 'experience', 'skills', 'voyage', 'about', 'contact'] as const;

const THEME_KEY = 'sal-theme';

/** Page background per theme, mirrored into <meta name="theme-color"> so mobile
 *  browser chrome matches the page instead of staying dark in light mode. */
const THEME_COLOR: Record<Theme, string> = { dark: '#0a0b0d', light: '#f4f5f6' };

/**
 * The boot script in index.html already resolved this before first paint
 * (stored choice, else OS preference). Adopt its answer instead of deciding
 * twice — two decision points would eventually disagree.
 */
function initialTheme(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

const LANG_KEY = 'sal-lang';

/**
 * Stored choice wins; otherwise a ko/ja browser gets its own language on
 * first visit — the KO/JA copy was written for exactly that recruiter, and
 * greeting them in English wastes it. Everyone else gets English.
 */
const PRINT_TITLE = 'Jungwook Van — Résumé · Drawing Set A-000–A-600';

/** `?sheets` shows the print set on screen — the only way to inspect the
 *  sheets without a print dialog, for development and for the curious. */
function sheetsPreviewRequested(): boolean {
  return new URLSearchParams(window.location.search).has('sheets');
}

function initialLang(): Lang {
  try {
    const stored = localStorage.getItem(LANG_KEY);
    if (stored === 'en' || stored === 'ko' || stored === 'ja') return stored;
  } catch {
    /* Private mode — fall through to detection. */
  }
  const nav = (navigator.language || '').toLowerCase();
  if (nav.startsWith('ko')) return 'ko';
  if (nav.startsWith('ja')) return 'ja';
  return 'en';
}

export default function App() {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [lang, setLang] = useState<Lang>(initialLang);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<ProjectKey | null>(null);
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);
  const [closing, setClosing] = useState(false);
  const [printing, setPrinting] = useState(false);
  const [sheetsPreview] = useState(sheetsPreviewRequested);

  // The print set mounts on demand — the case-study sheets otherwise only
  // exist inside the modal. beforeprint fires synchronously inside
  // window.print(), so flushSync guarantees the sheets are in the DOM before
  // the dialog snapshots the page. This one listener covers both the résumé
  // buttons (which just call window.print()) and a bare Ctrl+P.
  useEffect(() => {
    let screenTitle = document.title;
    const before = () => {
      screenTitle = document.title;
      document.title = PRINT_TITLE; // becomes the suggested PDF filename
      flushSync(() => setPrinting(true));
    };
    const after = () => {
      document.title = screenTitle;
      setPrinting(false);
    };
    window.addEventListener('beforeprint', before);
    window.addEventListener('afterprint', after);
    return () => {
      window.removeEventListener('beforeprint', before);
      window.removeEventListener('afterprint', after);
    };
  }, []);

  const printResume = useCallback(() => window.print(), []);

  const reducedMotion = useReducedMotion();
  const scrollControl = useSmoothScroll(reducedMotion);

  const t = STRINGS[lang];
  const { scrollP } = useScrollProgress(reducedMotion);
  const activeSection = useSectionSpy();
  const { revealed, refs } = useReveal(REVEAL_KEYS);

  // Layout effect so CSS variables are updated before children's passive
  // effects (VoyageScene samples them when rebuilding for a theme change).
  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme]);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      /* Private mode or blocked storage — the toggle still works this session. */
    }
  }, [theme]);

  // Keep <html lang> in sync so :lang(ko) CSS (keep-all word breaking, the
  // CJK font pick) and assistive tech track the active language.
  useLayoutEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch {
      /* Private mode — the choice still holds for this session. */
    }
  }, [lang]);

  const toggleTheme = useCallback(() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark')), []);
  const toggleMobile = useCallback(() => setMobileOpen((prev) => !prev), []);

  // `origin` is the rect of the card that was clicked; the overlay grows out
  // of it. Skills and the voyage chart open the same case studies without one,
  // so it's optional and the overlay just fades in that case.
  const openProject = useCallback((key: ProjectKey, origin?: DOMRect) => {
    setOriginRect(origin ?? null);
    setClosing(false);
    setActiveProject(key);
  }, []);

  // Closing is a two-step: ask, animate, then unmount. Rendering the overlay
  // on `activeProject` alone meant it vanished the instant state cleared and
  // no exit animation was possible.
  const closeProject = useCallback(() => setClosing(true), []);
  const finishClose = useCallback(() => {
    setClosing(false);
    setActiveProject(null);
    setOriginRect(null);
  }, []);

  const nextProject = useCallback(() => {
    setOriginRect(null);
    setActiveProject((prev) => {
      if (!prev) return prev;
      const idx = PROJECT_ORDER.indexOf(prev);
      return PROJECT_ORDER[(idx + 1) % PROJECT_ORDER.length];
    });
  }, []);

  return (
    <div className="sal-root">
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: 2,
          width: `${scrollP * 100}%`,
          background: 'var(--c-accent)',
          boxShadow: '0 0 8px var(--c-glow)',
          zIndex: 300,
          pointerEvents: 'none',
        }}
      />

      <CourseLine t={t} scrollP={scrollP} activeSection={activeSection} reducedMotion={reducedMotion} />

      <div className="sal-glow-bg" aria-hidden="true" />

      <Nav
        t={t}
        activeSection={activeSection}
        theme={theme}
        toggleTheme={toggleTheme}
        lang={lang}
        setLang={setLang}
        mobileOpen={mobileOpen}
        toggleMobile={toggleMobile}
        onPrint={printResume}
      />

      <Hero t={t} lang={lang} reducedMotion={reducedMotion} onPrint={printResume} />

      <ProjectsBento t={t} revealed={revealed.projects} revealRef={refs.projects} onOpenProject={openProject} />

      <Experience t={t} lang={lang} revealed={revealed.experience} revealRef={refs.experience} />

      <Skills t={t} lang={lang} revealed={revealed.skills} revealRef={refs.skills} onOpenProject={openProject} />

      <VoyageChart
        t={t}
        theme={theme}
        revealed={revealed.voyage}
        revealRef={refs.voyage}
        onOpenProject={openProject}
        reducedMotion={reducedMotion}
      />

      <About t={t} revealed={revealed.about} revealRef={refs.about} />

      <Contact t={t} revealed={revealed.contact} revealRef={refs.contact} />

      <Footer />

      <BackToTop visible={scrollP > 0.5} label={t.backToTop} />

      {(printing || sheetsPreview) && <PrintSet lang={lang} preview={sheetsPreview} />}

      {activeProject && (
        <ProjectDetail
          projectKey={activeProject}
          lang={lang}
          reducedMotion={reducedMotion}
          scrollControl={scrollControl}
          origin={originRect}
          closing={closing}
          onClosed={finishClose}
          onClose={closeProject}
          onNext={nextProject}
        />
      )}
    </div>
  );
}
