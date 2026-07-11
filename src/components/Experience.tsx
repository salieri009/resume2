import type { Strings } from '../data/types';

interface ExperienceProps {
  t: Strings;
  revealed: boolean;
  revealRef: (el: HTMLElement | null) => void;
}

const UTS_COURSES = [
  'Software Dev Studio · 95 HD',
  'Data Structures · 92 HD',
  'Intro Software Dev · 90 HD',
  'Advanced Software Dev · 87 HD',
  'Cloud/SaaS · 86 HD',
];

export function Experience({ t, revealed, revealRef }: ExperienceProps) {
  return (
    <section
      id="experience"
      data-reveal-key="experience"
      ref={revealRef}
      className={`sal-section${revealed ? ' is-revealed' : ''}`}
    >
      <div className="sal-section-header">
        <span className="sal-section-num">02.</span>
        <h2 className="sal-section-title">Timeline</h2>
        <div className="sal-section-rule" />
      </div>

      <p className="sal-section-intro">{t.growthIntro}</p>

      <div className="sal-timeline">
        <div className="sal-timeline-row">
          <div className="sal-timeline-rail">
            <div className="sal-timeline-dot is-current" />
            <div className="sal-timeline-line" />
          </div>
          <div className="sal-timeline-body">
            <div className="sal-timeline-meta">
              <span className="sal-mono" style={{ fontSize: 12, color: 'var(--c-accent-text)' }}>
                2023 — 2026
              </span>
              <span className="sal-badge">Complete · 144 CP</span>
            </div>
            <h3 className="sal-timeline-h3">University of Technology Sydney</h3>
            <p className="sal-timeline-p1">Bachelor of Information Technology</p>
            <p className="sal-timeline-p2">
              Major: Enterprise Software Development · Sub-major: Computer Graphics &amp; Animation · GPA 6.00 / WAM
              80.31
            </p>
            <p className="sal-timeline-p3">{t.growthUts}</p>
            <div className="sal-tag-row">
              {UTS_COURSES.map((c) => (
                <span key={c} className="sal-pill-outline">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="sal-timeline-row">
          <div className="sal-timeline-rail">
            <div className="sal-timeline-dot is-past" />
          </div>
          <div>
            <span className="sal-mono" style={{ fontSize: 12, color: 'var(--c-accent-text)' }}>
              Prior Service
            </span>
            <h3 className="sal-timeline-h3">Republic of Korea Army</h3>
            <p className="sal-timeline-p1">Interpreter / Translator — English liaison duties.</p>
            <p style={{ margin: 0, fontFamily: "'Inter', sans-serif", fontSize: 14, lineHeight: 1.6, color: 'var(--c-text-muted)' }}>
              {t.growthArmy}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
