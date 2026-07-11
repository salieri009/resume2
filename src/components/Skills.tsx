import { memo } from 'react';
import type { Lang, ProjectKey, Strings } from '../data/types';
import { SKILL_PROOFS, formatProof } from '../data/academic';

interface SkillsProps {
  t: Strings;
  lang: Lang;
  revealed: boolean;
  revealRef: (el: HTMLElement | null) => void;
  onOpenProject: (key: ProjectKey) => void;
}

export const Skills = memo(function Skills({ t, lang, revealed, revealRef, onOpenProject }: SkillsProps) {
  return (
    <section
      id="skills"
      data-reveal-key="skills"
      ref={revealRef}
      className={`sal-section${revealed ? ' is-revealed' : ''}`}
    >
      <div className="sal-section-header">
        <span className="sal-section-num">03.</span>
        <h2 className="sal-section-title">{t.sectionSkills}</h2>
        <div className="sal-section-rule" />
      </div>

      <p className="sal-section-intro">{t.skillsIntro}</p>

      <div className="sal-skills-grid">
        <div className="sal-skill-card">
          <div className="sal-skill-label">a. Enterprise Software Engineering</div>
          <p className="sal-skill-desc">{t.skillA}</p>
          <div className="sal-skill-tags">
            {['Java', 'Python', 'C#', 'C++'].map((tag) => (
              <span key={tag} className="sal-skill-tag">
                {tag}
              </span>
            ))}
          </div>
          <div className="sal-skill-footer">
            <span className="sal-eyebrow">{formatProof(SKILL_PROOFS.enterprise, lang)}</span>
            <button type="button" className="sal-skill-proof sal-focus" onClick={() => onOpenProject('iotbay')}>
              Proof: IoTBay →
            </button>
          </div>
        </div>

        <div className="sal-skill-card">
          <div className="sal-skill-label">b. AI / Deep Learning</div>
          <p className="sal-skill-desc">{t.skillB}</p>
          <div className="sal-skill-tags">
            {['Neural Nets', 'CNN', 'YOLOv8', 'PyTorch'].map((tag) => (
              <span key={tag} className="sal-skill-tag">
                {tag}
              </span>
            ))}
          </div>
          <div className="sal-skill-footer">
            <span className="sal-eyebrow">{formatProof(SKILL_PROOFS.ai, lang)} · SageMaker</span>
            <button type="button" className="sal-skill-proof sal-focus" onClick={() => onOpenProject('crowd')}>
              Proof: Crowd Detection →
            </button>
          </div>
        </div>

        <div className="sal-skill-card">
          <div className="sal-skill-label">c. Cloud &amp; Data</div>
          <p className="sal-skill-desc">{t.skillC}</p>
          <div className="sal-skill-tags">
            {['AWS', 'Docker', 'Data Engineering', 'PostgreSQL'].map((tag) => (
              <span key={tag} className="sal-skill-tag">
                {tag}
              </span>
            ))}
          </div>
          <div className="sal-skill-footer">
            <span className="sal-eyebrow">{formatProof(SKILL_PROOFS.cloud, lang)}</span>
            <button type="button" className="sal-skill-proof sal-focus" onClick={() => onOpenProject('gundam')}>
              Proof: Gundam Board →
            </button>
          </div>
        </div>

        <div className="sal-skill-card">
          <div className="sal-skill-label">d. Graphics / Game Dev</div>
          <p className="sal-skill-desc">{t.skillD}</p>
          <div className="sal-skill-tags">
            {['Three.js', 'GLSL', 'WebGL'].map((tag) => (
              <span key={tag} className="sal-skill-tag">
                {tag}
              </span>
            ))}
          </div>
          <div className="sal-skill-footer">
            <span className="sal-eyebrow">{formatProof(SKILL_PROOFS.graphics, lang)}</span>
            <button type="button" className="sal-skill-proof sal-focus" onClick={() => onOpenProject('farm')}>
              Proof: Farm Simulator →
            </button>
          </div>
        </div>

        <div className="sal-skill-card">
          <div className="sal-skill-label">e. Frontend</div>
          <p className="sal-skill-desc">{t.skillE}</p>
          <div className="sal-skill-tags">
            {['HTML/CSS', 'JavaScript', 'React', 'Next.js'].map((tag) => (
              <span key={tag} className="sal-skill-tag">
                {tag}
              </span>
            ))}
          </div>
          <div className="sal-skill-footer">
            <span className="sal-eyebrow">{formatProof(SKILL_PROOFS.interactive, lang)}</span>
            <button type="button" className="sal-skill-proof sal-focus" onClick={() => onOpenProject('crowd')}>
              Proof: Detection UI →
            </button>
          </div>
        </div>

        <div className="sal-skill-card">
          <div className="sal-skill-label">f. Human Languages</div>
          <div className="sal-skill-tags">
            {['한국어 · Native', 'English · Fluent', '日本語 · Learning', 'Deutsch · Learning'].map((tag) => (
              <span key={tag} className="sal-skill-tag">
                {tag}
              </span>
            ))}
          </div>
          <div className="sal-skill-footer">
            <span className="sal-eyebrow">ROK Army · Interpreter</span>
            <a
              href="https://igewaedam630.tistory.com"
              target="_blank"
              rel="noopener noreferrer"
              className="sal-skill-proof sal-focus"
            >
              Proof: 350+ essays ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
});
