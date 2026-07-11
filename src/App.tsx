import { useCallback, useLayoutEffect, useState } from 'react';
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

const REVEAL_KEYS = ['projects', 'experience', 'skills', 'voyage', 'about', 'contact'] as const;

export default function App() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [lang, setLang] = useState<Lang>('en');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<ProjectKey | null>(null);

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
  }, [theme]);

  const toggleTheme = useCallback(() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark')), []);
  const toggleMobile = useCallback(() => setMobileOpen((prev) => !prev), []);
  const openProject = useCallback((key: ProjectKey) => setActiveProject(key), []);
  const closeProject = useCallback(() => setActiveProject(null), []);
  const nextProject = useCallback(() => {
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
      />

      <Hero t={t} lang={lang} reducedMotion={reducedMotion} />

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

      {activeProject && (
        <ProjectDetail
          projectKey={activeProject}
          lang={lang}
          reducedMotion={reducedMotion}
          scrollControl={scrollControl}
          onClose={closeProject}
          onNext={nextProject}
        />
      )}
    </div>
  );
}
