import { CompassIcon } from './Icons';

const WAYPOINTS = [
  { id: 'top', title: 'Port — Hero' },
  { id: 'projects', title: 'WP-01 · Case Studies' },
  { id: 'experience', title: 'WP-02 · Timeline' },
  { id: 'skills', title: 'WP-03 · Arsenal' },
  { id: 'about', title: 'WP-04 · About' },
  { id: 'contact', title: 'WP-05 · Contact' },
] as const;

interface CourseLineProps {
  scrollP: number;
  activeSection: string;
}

export function CourseLine({ scrollP, activeSection }: CourseLineProps) {
  return (
    <nav className="sal-course" aria-label="Section waypoints">
      <CompassIcon />
      <div className="sal-course-track">
        <div className="sal-course-dashes" />
        <div className="sal-course-fill" style={{ height: `${scrollP * 100}%` }} />
        <div className="sal-course-dots">
          {WAYPOINTS.map((wp) => (
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
