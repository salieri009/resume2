import type { Strings } from '../data/types';
import { HeroAxono } from './HeroAxono';

interface HeroProps {
  t: Strings;
  typed: string;
  typingDone: boolean;
  scrollP: number;
  parallax: number;
  reducedMotion: boolean;
}

export function Hero({ t, typed, typingDone, scrollP, parallax, reducedMotion }: HeroProps) {
  return (
    <section id="top" className="sal-hero-section">
      <div className="sal-hero-grid-bg" aria-hidden="true" />

      <HeroAxono scrollP={scrollP} parallax={parallax} reducedMotion={reducedMotion} />

      <div className="sal-hero-inner">
        <div className="sal-hero-eyebrow">
          <span>&gt;</span>
          <span>whoami</span>
        </div>

        <h1 className="sal-hero-title">SALIERI</h1>

        <p className="sal-hero-tagline">
          <span className="sal-typed">{typed}</span>
          <span className="sal-hero-cursor" style={{ display: typingDone ? 'none' : 'inline' }}>
            ▌
          </span>
        </p>

        <p className="sal-hero-subtag">{t.subTagline}</p>

        <div className="sal-hero-actions">
          <a href="#projects" className="sal-btn-primary sal-focus">
            View Projects →
          </a>
          <a href="/resume.pdf" className="sal-btn-secondary sal-focus">
            Download Résumé
          </a>
        </div>

        <div className="sal-stat-strip">
          <div className="sal-stat">
            <div className="sal-stat-label">Institution</div>
            <div className="sal-stat-value">UTS BIT · Complete</div>
          </div>
          <div className="sal-stat">
            <div className="sal-stat-label">GPA</div>
            <div className="sal-stat-value">6.00</div>
          </div>
          <div className="sal-stat">
            <div className="sal-stat-label">WAM</div>
            <div className="sal-stat-value">80.31</div>
          </div>
          <div className="sal-stat">
            <div className="sal-stat-label">Graduated</div>
            <div className="sal-stat-value">2026</div>
          </div>
        </div>
      </div>
    </section>
  );
}
