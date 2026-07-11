import { CompassRose } from './Icons';

/** Decorative nautical-chart overlay for the hero — contours, lat/long ticks, compass rose. */
export function NauticalBg() {
  return (
    <div className="sal-nautical" aria-hidden="true">
      <svg className="sal-nautical-svg" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
        {/* Latitude / longitude grid ticks */}
        {Array.from({ length: 13 }, (_, i) => {
          const x = 40 + i * 90;
          return (
            <g key={`lon-${i}`}>
              <line x1={x} y1={20} x2={x} y2={680} stroke="var(--c-border)" strokeWidth={0.5} opacity={0.35} />
              <text x={x} y={16} textAnchor="middle" fontSize={8} fontFamily="JetBrains Mono, monospace" fill="var(--c-text-faint)" opacity={0.5}>
                {`${100 + i * 2}°E`}
              </text>
            </g>
          );
        })}
        {Array.from({ length: 8 }, (_, i) => {
          const y = 40 + i * 80;
          return (
            <g key={`lat-${i}`}>
              <line x1={20} y1={y} x2={1180} y2={y} stroke="var(--c-border)" strokeWidth={0.5} opacity={0.3} />
              <text x={8} y={y + 3} fontSize={8} fontFamily="JetBrains Mono, monospace" fill="var(--c-text-faint)" opacity={0.5}>
                {`${40 - i * 5}°N`}
              </text>
            </g>
          );
        })}

        {/* Contour / isobath curves */}
        <path
          d="M80 520 C220 480, 340 560, 480 500 S720 420, 880 470 S1080 560, 1160 500"
          fill="none"
          stroke="var(--c-accent-dim)"
          strokeWidth={1.2}
          strokeDasharray="6 8"
          opacity={0.7}
        />
        <path
          d="M60 580 C200 540, 360 620, 520 560 S780 480, 940 540 S1100 620, 1180 560"
          fill="none"
          stroke="var(--c-border-strong)"
          strokeWidth={0.9}
          strokeDasharray="3 6"
          opacity={0.55}
        />
        <path
          d="M120 200 C280 160, 420 240, 560 180 S820 120, 980 170 S1120 240, 1180 190"
          fill="none"
          stroke="var(--c-accent-dim)"
          strokeWidth={0.8}
          opacity={0.45}
        />
        <path
          d="M40 320 C180 280, 300 360, 460 300 S700 240, 860 290 S1040 360, 1160 300"
          fill="none"
          stroke="var(--c-border)"
          strokeWidth={0.7}
          strokeDasharray="2 5"
          opacity={0.5}
        />

        {/* Depth annotations */}
        <text x="200" y="500" fontSize={9} fontFamily="JetBrains Mono, monospace" fill="var(--c-text-faint)" opacity={0.4}>
          −12f
        </text>
        <text x="640" y="450" fontSize={9} fontFamily="JetBrains Mono, monospace" fill="var(--c-text-faint)" opacity={0.4}>
          −28f
        </text>
        <text x="980" y="520" fontSize={9} fontFamily="JetBrains Mono, monospace" fill="var(--c-text-faint)" opacity={0.4}>
          −8f
        </text>
      </svg>

      <CompassRose className="sal-nautical-rose" />
    </div>
  );
}
