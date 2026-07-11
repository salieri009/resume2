import { memo } from 'react';
import { NauticalBg } from './NauticalBg';
import { HeroAxono } from './HeroAxono';
import { formatDegreePlate } from '../data/academic';
import { useTypewriter } from '../hooks/useTypewriter';
import type { Lang, Strings } from '../data/types';

interface HeroProps {
  t: Strings;
  lang: Lang;
  reducedMotion: boolean;
}

/**
 * Typewriter state lives here (not in App) so its 28ms ticks
 * re-render only the hero, not the whole tree.
 */
export const Hero = memo(function Hero({ t, lang, reducedMotion }: HeroProps) {
  const { typed, done: typingDone } = useTypewriter(t.tagline, reducedMotion);

  return (
    <section id="top" className="sal-hero-section">
      <div className="sal-hero-grid-bg" aria-hidden="true" />
      <NauticalBg />

      <div className="sal-hero-layout">
        <div className="sal-hero-inner">
          <div className="sal-hero-eyebrow">
            <span>&gt;</span>
            <span>{t.heroEyebrow}</span>
          </div>

          <h1 className="sal-hero-title">SALIERI</h1>

          <p className="sal-hero-tagline">
            <span className="sal-typed">{typed}</span>
            <span className="sal-hero-cursor" style={{ display: typingDone ? 'none' : 'inline' }}>
              ▌
            </span>
          </p>

          <p className="sal-hero-subtag">{t.subTagline}</p>

          <p className="sal-sr-only">{t.heroSrStory}</p>

          <div className="sal-hero-actions">
            <a href="#projects" className="sal-btn-primary sal-focus">
              {t.heroCtaPrimary}
            </a>
            <a href="/resume.pdf" className="sal-btn-secondary sal-focus">
              {t.heroCtaSecondary}
            </a>
          </div>

          <p className="sal-degree-plate">{formatDegreePlate(lang)}</p>
        </div>

        <HeroAxono t={t} reducedMotion={reducedMotion} />
      </div>
    </section>
  );
});
