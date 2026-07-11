interface AxonoBlockSpec {
  left: number;
  top: number;
  size: number;
  height: number;
  label: string;
}

interface AxonoLayerSpec {
  z: number;
  blocks: AxonoBlockSpec[];
}

const LAYERS: AxonoLayerSpec[] = [
  {
    z: 0,
    blocks: [
      { left: 36, top: 40, size: 66, height: 52, label: 'AWS' },
      { left: 134, top: 80, size: 50, height: 36, label: 'docker' },
      { left: 72, top: 148, size: 44, height: 28, label: 'API' },
    ],
  },
  {
    z: 110,
    blocks: [
      { left: 42, top: 46, size: 56, height: 34, label: 'tests' },
      { left: 128, top: 92, size: 48, height: 26, label: 'CI/CD' },
      { left: 76, top: 150, size: 40, height: 20, label: 'DAO' },
    ],
  },
  {
    z: 220,
    blocks: [
      { left: 30, top: 34, size: 62, height: 44, label: 'NN' },
      { left: 132, top: 66, size: 44, height: 30, label: 'GLSL' },
      { left: 66, top: 140, size: 52, height: 36, label: 'proof' },
    ],
  },
];

const CAPTIONS = [
  { top: 350, label: 'L1 · production', sub: '창조적 혼돈의 착지점' },
  { top: 205, label: 'L2 · discipline', sub: '절제된 열정' },
  { top: 60, label: 'L3 · theory', sub: '수학적 엄밀함' },
];

interface HeroAxonoProps {
  scrollP: number;
  parallax: number;
  reducedMotion: boolean;
}

export function HeroAxono({ scrollP, parallax, reducedMotion }: HeroAxonoProps) {
  const sceneStyle: React.CSSProperties = {
    position: 'absolute',
    left: 210,
    top: 150,
    width: 230,
    height: 230,
    transformStyle: 'preserve-3d',
    transform: `rotateX(58deg) rotateZ(${-45 + (reducedMotion ? 0 : scrollP * 40)}deg) translateY(${parallax * 0.4}px)`,
  };

  return (
    <div className="sal-axono" aria-hidden="true">
      <div style={sceneStyle}>
        {LAYERS.map((layer, i) => (
          <div
            key={i}
            className="sal-axono-plane"
            style={i === 0 ? undefined : { transform: `translateZ(${layer.z}px)` }}
          >
            {layer.blocks.map((block, j) => (
              <div
                key={j}
                className="sal-axono-block"
                style={{ left: block.left, top: block.top, width: block.size, height: block.size }}
              >
                <div className="sal-axono-top" style={{ transform: `translateZ(${block.height}px)` }}>
                  {block.label}
                </div>
                <div className="sal-axono-side-front" style={{ height: block.height }} />
                <div className="sal-axono-side-right" style={{ width: block.height }} />
              </div>
            ))}
          </div>
        ))}
        <div className="sal-axono-connector" />
      </div>

      {CAPTIONS.map((c) => (
        <div key={c.label} className="sal-axono-caption" style={{ top: c.top }}>
          {c.label}
          <br />
          <span>{c.sub}</span>
        </div>
      ))}
    </div>
  );
}
