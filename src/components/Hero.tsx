import { memo } from 'react';
import { NauticalBg } from './NauticalBg';
import { HeroAxono } from './HeroAxono';
import { formatDegreePlate } from '../data/academic';
import { HERO_CARGO, HERO_PROOFS, PROFILE, RESUME_PDF } from '../data/profile';
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

          <h1 className="sal-hero-title">{PROFILE.alias}</h1>

          {/* Ship's registry — call sign on the bow, registered name in the papers. */}
          <p className="sal-hero-registry">
            <span className="sal-hero-registry-name">{PROFILE.name}</span>
            <span aria-hidden="true">—</span>
            <span>{t.heroRegistryLine}</span>
          </p>

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
            {RESUME_PDF.available && (
              <a href={RESUME_PDF.href} className="sal-btn-secondary sal-focus">
                {t.heroCtaSecondary}
              </a>
            )}
          </div>

          {/* Harbor log — proof points a recruiter can verify. */}
          <div className="sal-proof-row" role="list" aria-label="Selected proof points">
            <span role="listitem" className="sal-proof-chip sal-proof-chip--flag">
              {t.heroProofMicrosoft}
            </span>
            {HERO_PROOFS.map((p) => (
              <span role="listitem" key={p} className="sal-proof-chip">
                {p}
              </span>
            ))}
          </div>

          <div className="sal-degree-plate">
            <span>{formatDegreePlate(lang)}</span>
            <span className="sal-cargo-line">
              <span className="sal-cargo-label">cargo</span>
              {HERO_CARGO.join(' · ')}
            </span>
          </div>
        </div>

        <HeroAxono t={t} reducedMotion={reducedMotion} />
      </div>
    </section>
  );
});
