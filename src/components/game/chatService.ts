import { OpenRouter } from '@openrouter/sdk';
import type { NPCData, ChatMessage } from './types';

const openRouter = new OpenRouter({
  apiKey: import.meta.env.VITE_OPENROUTER_API_KEY ?? '',
});

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

  const messages: { role: 'system' | 'user' | 'assistant'; content: string }[] = [
    { role: 'system', content: systemPrompt },
    ...history.map(m => ({ role: m.role as 'user' | 'assistant', content: m.content })),
    { role: 'user' as const, content: userMessage },
  ];

  const completion = await openRouter.chat.send({
    model: 'deepseek/deepseek-chat-v3-0324',
    messages,
    stream: false,
    max_tokens: 200,
    temperature: 0.85,
  });

  const choice = completion.choices?.[0];
  if (choice && 'message' in choice && choice.message?.content) {
    return choice.message.content;
  }

  return npc.greeting;
}
