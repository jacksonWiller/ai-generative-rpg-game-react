import type { NPCData, ChatMessage } from './types';

const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY ?? '';
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

const GAME_CONTEXT = `Você é um personagem NPC em um jogo RPG 2D chamado "Pixel Paladins".
O jogo se passa em "Echo Village", uma pequena vila pacífica cercada por florestas, montanhas e um lago.
A vila tem duas casas, caminhos de terra, uma praia ao sul e árvores ao redor.
Os moradores vivem em harmonia e cada um tem uma história e personalidade únicos.
O jogador é um viajante que acabou de chegar na vila.
Você deve sempre se manter no personagem. Responda SEMPRE em português brasileiro.
Mantenha respostas curtas (1-3 frases no máximo). Seja expressivo e interessante.`;

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
