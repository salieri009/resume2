import { memo, useEffect, useRef } from 'react';
import { HeroAxono } from './HeroAxono';
import { formatDegreePlate } from '../data/academic';
import { HERO_CARGO, HERO_PROOFS, PROFILE, RESUME_PDF } from '../data/profile';
import type { Lang, Strings } from '../data/types';

interface HeroProps {
  t: Strings;
  lang: Lang;
  reducedMotion: boolean;
}

/**
 * The title block of the drawing set: who drew it, what it argues, and the
 * one stamp worth reading before the CTA. Everything here is static text —
 * the only motion in the first screen is the axonometric assembling itself.
 */
export const Hero = memo(function Hero({ t, lang, reducedMotion }: HeroProps) {
  const gridRef = useRef<HTMLDivElement | null>(null);

  // The graph paper scrolls a shade slower than the content, so the sheet
  // reads as sitting behind the drawing. The one scroll-depth cue on the
  // site, kept imperative: piping scrollP through props would defeat this
  // component's memo and re-render the whole hero every frame.
  useEffect(() => {
    if (reducedMotion) return;
    const grid = gridRef.current;
    if (!grid) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        // Past the first viewport the hero is gone; stop writing.
        if (y < window.innerHeight * 1.2) {
          grid.style.transform = `translateY(${y * 0.12}px)`;
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reducedMotion]);

  return (
    <section id="top" className="sal-hero-section">
      <div ref={gridRef} className="sal-hero-grid-bg" aria-hidden="true" />

      <div className="sal-hero-layout">
        <div className="sal-hero-inner">
          <div className="sal-hero-eyebrow">
            <span className="sal-hero-mark">{PROFILE.alias}</span>
            <span aria-hidden="true">·</span>
            <span className="sal-hero-role">{t.heroEyebrow}</span>
          </div>

          <h1 className="sal-hero-title">{t.tagline}</h1>

          <p className="sal-hero-registry">
            <span className="sal-hero-registry-name">{PROFILE.name}</span>
            <span aria-hidden="true">—</span>
            <span>{t.heroRegistryLine}</span>
          </p>

          <p className="sal-hero-subtag">{t.subTagline}</p>

          <p className="sal-sr-only">{t.heroSrStory}</p>

          {/* Revision stamp — pulled out of the chip row. "1 of 620" is the
              claim that stops a reader, and it does not belong at 11px. */}
          <p className="sal-hero-stamp">
            <span className="sal-hero-stamp-rev" aria-hidden="true">
              Rev A
            </span>
            <span>{t.heroProofMicrosoft}</span>
          </p>

          <div className="sal-hero-actions">
            <a href="#projects" className="sal-btn-primary sal-focus">
              {t.heroCtaPrimary}
            </a>
            {/* A lone primary button under the thesis reads unfinished, so the
                row always gets a second anchor: the résumé once it exists,
                GitHub until then. */}
            {RESUME_PDF.available ? (
              <a href={RESUME_PDF.href} className="sal-btn-secondary sal-focus">
                {t.heroCtaSecondary}
              </a>
            ) : (
              <a
                href={`https://github.com/${PROFILE.githubUser}`}
                target="_blank"
                rel="noopener noreferrer"
                className="sal-btn-secondary sal-focus"
              >
                GitHub ↗
              </a>
            )}
          </div>

          {/* Engineering proofs a recruiter can verify. The Microsoft one is
              stamped above; these are the supporting receipts. */}
          <div className="sal-proof-row" role="list" aria-label="Selected proof points">
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
