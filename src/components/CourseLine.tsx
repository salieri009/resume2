import { CompassIcon, ShipMarker } from './Icons';
import type { Strings } from '../data/types';

interface CourseLineProps {
  t: Strings;
  scrollP: number;
  activeSection: string;
  reducedMotion: boolean;
}

export function CourseLine({ t, scrollP, activeSection, reducedMotion }: CourseLineProps) {
  const waypoints = [
    { id: 'top', title: t.courseTop },
    { id: 'projects', title: `WP-01 · ${t.sectionProjects}` },
    { id: 'experience', title: `WP-02 · ${t.sectionExperience}` },
    { id: 'skills', title: `WP-03 · ${t.sectionSkills}` },
    { id: 'voyage', title: `WP-04 · ${t.voyageTitle}` },
    { id: 'about', title: `WP-05 · ${t.sectionAbout}` },
    { id: 'contact', title: `WP-06 · ${t.navContact}` },
  ];

  return (
    <nav className="sal-course" aria-label="Section waypoints">
      <CompassIcon />
      <div className="sal-course-track">
        <div className="sal-course-dashes" />
        <div className="sal-course-fill" style={{ height: `${scrollP * 100}%` }} />
        <div
          className={`sal-course-ship${reducedMotion ? ' is-static' : ''}`}
          style={{ top: `${scrollP * 100}%` }}
        >
          <ShipMarker />
        </div>
        <div className="sal-course-dots">
          {waypoints.map((wp) => (
            <a
              key={wp.id}
              href={`#${wp.id}`}
              title={wp.title}
              className={`sal-course-dot sal-focus${activeSection === wp.id ? ' is-active' : ''}`}
            />
          ))}
        </div>
      </div>
    </nav>
  );
}
