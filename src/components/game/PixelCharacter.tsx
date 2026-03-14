import { useMemo, memo } from 'react';
import { SPRITES } from './sprites';

interface Props {
  spriteKey: string;
  direction?: 'left' | 'right';
  size?: number;
}

function PixelCharacterInner({ spriteKey, direction = 'right', size = 36 }: Props) {
  const sprite = SPRITES[spriteKey];

  const svgData = useMemo(() => {
    if (!sprite) return null;
    const rows = sprite.pixels.length;
    const cols = sprite.pixels[0].length;
    const rects: { x: number; y: number; fill: string }[] = [];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const ch = sprite.pixels[r][c];
        if (ch !== '.' && sprite.palette[ch]) {
          rects.push({ x: c, y: r, fill: sprite.palette[ch] });
        }
      }
    }
    return { rects, rows, cols };
  }, [sprite]);

  if (!svgData) return null;

  const { rects, rows, cols } = svgData;

  return (
    <svg
      viewBox={`0 0 ${cols} ${rows}`}
      width={size}
      height={size * (rows / cols)}
      shapeRendering="crispEdges"
      className="character-outline"
      style={{
        transform: direction === 'left' ? 'scaleX(-1)' : undefined,
        display: 'block',
      }}
    >
      {rects.map((r, i) => (
        <rect key={i} x={r.x} y={r.y} width={1} height={1} fill={r.fill} />
      ))}
    </svg>
  );
}

const PixelCharacter = memo(PixelCharacterInner);
export default PixelCharacter;
