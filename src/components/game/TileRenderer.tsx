import { TileType, TILE_SIZE } from './types';

const tileStyles: Record<TileType, { bg: string; content?: string; extra?: string }> = {
  grass: { bg: 'bg-village-grass' },
  grass_dark: { bg: 'bg-village-grass-dark' },
  path: { bg: 'bg-village-path' },
  path_dark: { bg: 'bg-village-path-dark' },
  floor: { bg: 'bg-village-floor' },
  wall: { bg: 'bg-village-wall', extra: 'border-b-2 border-foreground/20' },
  wall_top: { bg: 'bg-village-wall-top', extra: 'border-b-4 border-foreground/30' },
  wall_left: { bg: 'bg-village-wall', extra: 'border-r-2 border-foreground/20' },
  wall_right: { bg: 'bg-village-wall', extra: 'border-l-2 border-foreground/20' },
  water: { bg: 'bg-village-water', content: '~', extra: 'text-blue-300 font-pixel text-xl animate-pulse-soft' },
  sand: { bg: 'bg-village-sand' },
  door: { bg: 'bg-village-path-dark', extra: 'border-t-2 border-foreground/10' },
  tree: { bg: 'bg-village-grass', content: '🌳' },
  flower_red: { bg: 'bg-village-grass', content: '🌺' },
  flower_blue: { bg: 'bg-village-grass', content: '💐' },
  flower_yellow: { bg: 'bg-village-grass', content: '🌻' },
  bush: { bg: 'bg-village-grass', content: '🌿' },
  rock: { bg: 'bg-village-grass', content: '🪨' },
  table: { bg: 'bg-village-floor', content: '🪑' },
  chair: { bg: 'bg-village-floor', content: '💺' },
  bookshelf: { bg: 'bg-village-floor', content: '📚' },
  bed: { bg: 'bg-village-floor', content: '🛏️' },
  stove: { bg: 'bg-village-floor', content: '🍳' },
  counter: { bg: 'bg-village-floor', content: '🧱' },
  rug: { bg: 'bg-village-floor', extra: 'bg-primary/20' },
  piano: { bg: 'bg-village-floor', content: '🎹' },
  chest: { bg: 'bg-village-floor', content: '📦' },
};

interface Props {
  tiles: TileType[][];
}

export default function TileRenderer({ tiles }: Props) {
  return (
    <>
      {tiles.map((row, y) =>
        row.map((tile, x) => {
          const style = tileStyles[tile] || tileStyles.grass;
          return (
            <div
              key={`${x}-${y}`}
              className={`absolute flex items-center justify-center select-none ${style.bg} ${style.extra || ''}`}
              style={{
                left: x * TILE_SIZE,
                top: y * TILE_SIZE,
                width: TILE_SIZE,
                height: TILE_SIZE,
                fontSize: TILE_SIZE * 0.6,
                lineHeight: 1,
              }}
            >
              {style.content && <span className="image-rendering-pixelated">{style.content}</span>}
            </div>
          );
        })
      )}
    </>
  );
}
