import { useEffect, useState } from 'react';
import type { Lang, ProjectKey, Theme } from './data/types';
import { PROJECT_ORDER } from './data/projects';
import { STRINGS } from './data/strings';
import { useReducedMotion } from './hooks/useReducedMotion';
import { useTypewriter } from './hooks/useTypewriter';
import { useScrollProgress } from './hooks/useScrollProgress';
import { useSectionSpy } from './hooks/useSectionSpy';
import { useReveal } from './hooks/useReveal';
import { Nav } from './components/Nav';
import { CourseLine } from './components/CourseLine';
import { Hero } from './components/Hero';
import { ProjectsBento } from './components/ProjectsBento';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProjectDetail } from './components/ProjectDetail';

const REVEAL_KEYS = ['projects', 'experience', 'skills', 'about', 'contact'] as const;

export default function App() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [lang, setLang] = useState<Lang>('en');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<ProjectKey | null>(null);

  const reducedMotion = useReducedMotion();
  const t = STRINGS[lang];
  const { typed, done: typingDone } = useTypewriter(t.tagline, reducedMotion);
  const { scrollP, parallax } = useScrollProgress(reducedMotion);
  const activeSection = useSectionSpy();
  const { revealed, refs } = useReveal(REVEAL_KEYS);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  const toggleMobile = () => setMobileOpen((prev) => !prev);
  const openProject = (key: ProjectKey) => setActiveProject(key);
  const closeProject = () => setActiveProject(null);
  const nextProject = () => {
    if (!activeProject) return;
    const idx = PROJECT_ORDER.indexOf(activeProject);
    setActiveProject(PROJECT_ORDER[(idx + 1) % PROJECT_ORDER.length]);
  };

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

      <CourseLine scrollP={scrollP} activeSection={activeSection} />

      <div className="sal-glow-bg" aria-hidden="true" />

      <Nav
        activeSection={activeSection}
        theme={theme}
        toggleTheme={toggleTheme}
        lang={lang}
        setLang={setLang}
        mobileOpen={mobileOpen}
        toggleMobile={toggleMobile}
      />

      <Hero
        t={t}
        typed={typed}
        typingDone={typingDone}
        scrollP={scrollP}
        parallax={parallax}
        reducedMotion={reducedMotion}
      />

      <ProjectsBento t={t} revealed={revealed.projects} revealRef={refs.projects} onOpenProject={openProject} />

      <Experience t={t} revealed={revealed.experience} revealRef={refs.experience} />

      <Skills t={t} revealed={revealed.skills} revealRef={refs.skills} onOpenProject={openProject} />

      <About t={t} revealed={revealed.about} revealRef={refs.about} />

      <Contact t={t} revealed={revealed.contact} revealRef={refs.contact} />

      <Footer />

      {activeProject && (
        <ProjectDetail
          projectKey={activeProject}
          lang={lang}
          reducedMotion={reducedMotion}
          onClose={closeProject}
          onNext={nextProject}
        />
      )}
    </div>
  );
}
