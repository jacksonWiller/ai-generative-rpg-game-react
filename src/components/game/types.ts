export type TileType = 
  | 'grass' | 'grass_dark' | 'path' | 'path_dark'
  | 'floor' | 'wall' | 'wall_top' | 'wall_left' | 'wall_right'
  | 'water' | 'sand' | 'door'
  | 'tree' | 'flower_red' | 'flower_blue' | 'flower_yellow'
  | 'bush' | 'rock'
  | 'table' | 'chair' | 'bookshelf' | 'bed' | 'stove' | 'counter'
  | 'rug' | 'piano' | 'chest';

export interface Position {
  x: number;
  y: number;
}

export interface NPCData {
  id: string;
  name: string;
  personality: string;
  tag: string;
  color: string;
  position: Position;
  sprite: string;
  systemPrompt: string;
  greeting: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export type Direction = 'left' | 'right';

export const TILE_SIZE = 48;

export const SOLID_TILES: TileType[] = [
  'wall', 'wall_top', 'wall_left', 'wall_right',
  'water', 'tree', 'rock',
  'table', 'bookshelf', 'bed', 'stove', 'counter', 'piano', 'chest'
];
