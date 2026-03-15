import type { NPCData, ChatMessage, NPCAction, MoveDirection } from './types';

const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY ?? '';
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

const VALID_DIRECTIONS: MoveDirection[] = ['cima', 'baixo', 'esquerda', 'direita'];

const GAME_CONTEXT = `Você é um personagem NPC em um jogo RPG 2D chamado "Pixel Paladins".
O jogo se passa em "Echo Village", uma pequena vila pacífica cercada por florestas, montanhas e um lago.
A vila tem duas casas, caminhos de terra, uma praia ao sul e árvores ao redor.
Os moradores vivem em harmonia e cada um tem uma história e personalidade únicos.
O jogador é um viajante que acabou de chegar na vila.
Você deve sempre se manter no personagem. Responda SEMPRE em português brasileiro.
Mantenha respostas curtas (1-3 frases no máximo). Seja expressivo e interessante.

VOCÊ PODE SE MOVER! Quando quiser andar durante a conversa, adicione um comando de movimento no final da sua fala usando este formato:
[MOVER:direção:passos]
Direções possíveis: cima, baixo, esquerda, direita
Passos: 1 a 3 (no máximo)
Exemplo: "Venha, me siga!" [MOVER:esquerda:2]
Use movimentos quando fizer sentido narrativamente: guiar o jogador, mostrar algo, se afastar, dançar, etc.
Não use movimento em toda resposta — apenas quando for natural para a conversa.
O comando deve vir SEMPRE no final da mensagem.`;

export async function sendNPCMessage(
  npc: NPCData,
  history: ChatMessage[],
  userMessage: string,
): Promise<string> {
  const systemPrompt = `${GAME_CONTEXT}\n\n${npc.systemPrompt}\n\nSua primeira fala de apresentação é: "${npc.greeting}"`;

  const messages = [
    { role: 'system', content: systemPrompt },
    ...history.map(m => ({ role: m.role, content: m.content })),
    { role: 'user', content: userMessage },
  ];

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': window.location.origin,
      'X-Title': 'Pixel Paladins',
    },
    body: JSON.stringify({
      model: 'deepseek/deepseek-chat-v3-0324',
      messages,
      max_tokens: 200,
      temperature: 0.85,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`OpenRouter API error ${res.status}: ${errorText}`);
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content;

  return content || npc.greeting;
}

export function parseNPCActions(text: string): { cleanText: string; actions: NPCAction[] } {
  const actions: NPCAction[] = [];
  const cleanText = text.replace(/\[MOVER:(\w+):(\d+)\]/gi, (_, dir, steps) => {
    const direction = dir.toLowerCase() as MoveDirection;
    if (VALID_DIRECTIONS.includes(direction)) {
      const clampedSteps = Math.min(3, Math.max(1, parseInt(steps, 10) || 1));
      actions.push({ type: 'move', direction, steps: clampedSteps });
    }
    return '';
  }).trim();

  return { cleanText, actions };
}
