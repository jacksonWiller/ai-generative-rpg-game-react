import { TileType, NPCData } from './types';

// Map is 30 wide x 22 tall
// Legend: g=grass, G=grass_dark, p=path, P=path_dark, f=floor, w=wall, W=wall_top
// t=tree, F=flower, b=bush, r=rock, d=door, s=sand, a=water
// Furniture: T=table, C=chair, B=bookshelf, E=bed, S=stove, K=counter, R=rug, I=piano, H=chest

const mapKey: Record<string, TileType> = {
  'g': 'grass', 'G': 'grass_dark', 'p': 'path', 'P': 'path_dark',
  'f': 'floor', 'w': 'wall', 'W': 'wall_top', 'L': 'wall_left', 'R': 'wall_right',
  't': 'tree', '1': 'flower_red', '2': 'flower_blue', '3': 'flower_yellow',
  'b': 'bush', 'r': 'rock', 'd': 'door', 's': 'sand', 'a': 'water',
  'T': 'table', 'C': 'chair', 'B': 'bookshelf', 'E': 'bed',
  'S': 'stove', 'K': 'counter', 'U': 'rug', 'I': 'piano', 'H': 'chest',
};

const rawMap = [
  'tttggg1ggtttggggggggttttggggttt',
  'tgggggggggtg2gggggggttggggggbgt',
  'gg1gWWWWWWggggWWWWWWWWWWggggggG',
  'gggwLfffffffwwLfffffffffffwggggg',
  'gggwLfBffEffwwLfffffffBffBwgg1gg',
  'gggwLfBffEffwwLffTCffffBffwggggg',
  'gggwLffffffffwLffTCfffffffw2gggg',
  'gggwLfSKfffffwLffffffIffCfwggggg',
  'gggwLfffffCTfwLfffffffCTffwggggg',
  'ggGwwwwdwwwwwwwwwwdwwwwwwwwwgggg',
  'gggggggpggggggggggpgggggggggg1gg',
  'gg2ggg1pgggggrggggpggg3gggggggG',
  'gggggggpppppppppppppgggggggggggG',
  'ggGggggggggggpgggggggggggbgggggg',
  'ggggg3gggggg1pggg2gggggggggggggg',
  'gggggggggggggpggggggggggg3ggggGg',
  'gg1ggggbggggGpggggrggggggggggggg',
  'ggggggggggg3gpgggggggggbggggg2gg',
  'ssssssssssssppsssssssssssssssssss',
  'sssssssssssssssssssssssssssssssss',
  'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
  'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
];

export const MAP_WIDTH = 30;
export const MAP_HEIGHT = 22;

export function getMapTiles(): TileType[][] {
  return rawMap.map(row => {
    const tiles: TileType[] = [];
    for (let i = 0; i < MAP_WIDTH; i++) {
      const char = row[i] || 'g';
      tiles.push(mapKey[char] || 'grass');
    }
    return tiles;
  });
}

export const NPCS: NPCData[] = [
  {
    id: 'flora',
    name: 'Flora',
    personality: 'Uma jardineira sábia e calma que ama a natureza.',
    tag: 'MENTORA',
    color: 'npc-friendly',
    position: { x: 5, y: 6 },
    sprite: '🧑‍🌾',
    look: { hair: '#8B4513', skin: '#DEB887', shirt: '#228B22', pants: '#556B2F', hairStyle: 'long', accessory: 'scarf' },
    systemPrompt: 'Você é Flora, uma jardineira sábia de 60 anos que vive na vila. Você fala com calma, usa metáforas sobre plantas e natureza. Você é mentora e guia. Responda em português, de forma curta e poética.',
    greeting: 'As raízes mais profundas são as que não se veem...',
  },
  {
    id: 'rex',
    name: 'Rex',
    personality: 'Um inventor excêntrico e engraçado.',
    tag: 'INVENTOR',
    color: 'npc-merchant',
    position: { x: 18, y: 5 },
    sprite: '🧑‍🔬',
    look: { hair: '#FF6347', skin: '#FFDAB9', shirt: '#4169E1', pants: '#2F4F4F', hairStyle: 'spiky', accessory: 'glasses' },
    systemPrompt: 'Você é Rex, um inventor maluco de 35 anos. Você está sempre trabalhando em invenções estranhas. Fala rápido, faz piadas e pede ajuda para seus projetos. Responda em português, curto e engraçado.',
    greeting: 'Ei! Segura essa engrenagem enquanto eu ajusto o fluxo de capacitância!',
  },
  {
    id: 'luna',
    name: 'Luna',
    personality: 'Misteriosa e filosófica, fala em enigmas.',
    tag: 'MISTÉRIO',
    color: 'npc-mystery',
    position: { x: 22, y: 7 },
    sprite: '🧙‍♀️',
    look: { hair: '#6A0DAD', skin: '#F5DEB3', shirt: '#483D8B', pants: '#2E0854', hairStyle: 'hood' },
    systemPrompt: 'Você é Luna, uma figura misteriosa que apareceu na vila há pouco tempo. Ninguém sabe de onde veio. Você fala em enigmas e metáforas, às vezes cita filosofia. Responda em português, de forma enigmática e curta.',
    greeting: 'O tempo é um rio que corre para trás quando ninguém olha...',
  },
  {
    id: 'bento',
    name: 'Bento',
    personality: 'Cozinheiro animado, adora comida e festas.',
    tag: 'COZINHEIRO',
    color: 'npc-merchant',
    position: { x: 5, y: 8 },
    sprite: '👨‍🍳',
    look: { hair: '#2C2C2C', skin: '#D2B48C', shirt: '#FFFAF0', pants: '#1C1C1C', hairStyle: 'hat', accessory: 'beard' },
    systemPrompt: 'Você é Bento, o cozinheiro da vila. Você é super animado, adora cozinhar e falar sobre receitas. Sempre oferece comida para quem passa. Responda em português, de forma calorosa e curta.',
    greeting: 'Chegou na hora certa! O ensopado de abóbora está quase pronto!',
  },
  {
    id: 'aria',
    name: 'Aria',
    personality: 'Jovem artista sonhadora que toca piano.',
    tag: 'ARTISTA',
    color: 'npc-mentor',
    position: { x: 20, y: 8 },
    sprite: '🧑‍🎨',
    look: { hair: '#FF69B4', skin: '#FFE4C4', shirt: '#DA70D6', pants: '#4B0082', hairStyle: 'long', accessory: 'earring' },
    systemPrompt: 'Você é Aria, uma jovem artista e musicista de 22 anos. Você é sonhadora, sensível e toca piano. Fala sobre arte, música e sentimentos. Responda em português, de forma delicada e curta.',
    greeting: 'Sabe aquela melodia que fica na cabeça? Estou tentando transformá-la em cores...',
  },
  {
    id: 'gael',
    name: 'Gael',
    personality: 'Explorador aventureiro, conta histórias de viagens.',
    tag: 'EXPLORADOR',
    color: 'npc-friendly',
    position: { x: 14, y: 15 },
    sprite: '🧭',
    look: { hair: '#DAA520', skin: '#CD853F', shirt: '#8B4513', pants: '#556B2F', hairStyle: 'short', accessory: 'scarf' },
    systemPrompt: 'Você é Gael, um explorador aventureiro que já viajou o mundo. Você conta histórias de viagens, ruínas antigas e criaturas fantásticas. Responda em português, de forma empolgante e curta.',
    greeting: 'Já te contei sobre as cavernas de cristal ao norte? Um dia desses eu te levo!',
  },
];
