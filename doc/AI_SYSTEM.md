# Sistema de IA e NPCs - Pixel Paladins

## 🤖 Visão Geral do Sistema de IA

Este documento descreve em detalhes o sistema de Inteligência Artificial que dá vida aos NPCs (Non-Player Characters) do **Pixel Paladins**.

---

## 📸 Capturas de Tela

### Sistema de Diálogo com NPCs

![Pixel Paladins - Diálogo com NPC](./Captura de tela 2026-04-20 171445.png)

*Interface de diálogo mostrando o sistema de IA em ação*

---

## 🎭 Filosofia de Design

### Princípios Fundamentais

1. **Personalidade Consistente**: Cada NPC mantém sua personalidade em todas as interações
2. **Contexto Rico**: NPCs consideram ambiente, tempo, relações e histórico
3. **Naturalidade**: Diálogos devem parecer humanos, não robóticos
4. **Imersão**: NPCs reagem ao mundo e às ações do jogador
5. **Surpresa Controlada**: Comportamentos previsíveis mas com variações naturais

---

## 📋 Estrutura de Dados dos NPCs

### Interface NPCData

```typescript
interface NPCData {
  // Identificação
  id: string;
  name: string;
  
  // Personalidade e Comportamento
  personality: string;        // Descrição curta da personalidade
  systemPrompt: string;       // Prompt do sistema para IA
  greeting: string;           // Frase de saudação inicial
  
  // Identificação Visual
  tag: string;                // Categoria (MENTORA, INVENTOR, etc.)
  color: string;              // Classe CSS para cor do NPC
  sprite: string;             // Emoji/ícone representativo
  
  // Posição no Mundo
  position: Position;
  
  // Aparência Visual
  look: CharacterLook;
}
```

### CharacterLook

```typescript
interface CharacterLook {
  // Cores
  hair: string;        // Cor do cabelo (hex)
  skin: string;        // Tom de pele (hex)
  shirt: string;       // Cor da camisa (hex)
  pants: string;       // Cor das calças (hex)
  
  // Estilo
  hairStyle: 'short' | 'long' | 'spiky' | 'bald' | 'hat' | 'hood';
  accessory?: 'glasses' | 'earring' | 'scarf' | 'beard';
}
```

---

## 🧠 Sistema de System Prompts

### O que é um System Prompt?

O `systemPrompt` é a "alma" do NPC. É um texto que define:
- Quem o personagem é
- Como ele fala
- O que ele sabe
- Como ele reage ao mundo

### Estrutura de um System Prompt

```typescript
// Template de System Prompt
Você é [NOME], uma [IDADE] [PROFISSÃO/PAPEL] que [LOCAL]. 
[DESCRIÇÃO DETALHADA DA PERSONALIDADE].

[COMO FALA - tom, vocabulário, estilo]

[CONHECIMENTOS E EXPERIÊNCIAS]

[COMPORTAMENTO EM DIÁLOGO]

Responda em [IDIOMA], de forma [CARACTERÍSTICA].
```

### Exemplos Reais

#### Flora - A Mentora

```typescript
{
  systemPrompt: `Você é Flora, uma jardineira sábia de 60 anos que vive na vila. 
  Você fala com calma, usa metáforas sobre plantas e natureza. 
  Você é mentora e guia. Responda em português, de forma curta e poética.`,
  
  greeting: 'As raízes mais profundas são as que não se veem...'
}
```

**Características:**
- Tom: Calmo, sábio, poético
- Vocabulário: Metáforas naturais
- Respostas: Curtas, reflexivas
- Papel: Guia espiritual

#### Rex - O Inventor

```typescript
{
  systemPrompt: `Você é Rex, um inventor maluco de 35 anos. 
  Você está sempre trabalhando em invenções estranhas. 
  Fala rápido, faz piadas e pede ajuda para seus projetos. 
  Responda em português, curto e engraçado.`,
  
  greeting: 'Ei! Segura essa engrenagem enquanto eu ajusto o fluxo de capacitância!'
}
```

**Características:**
- Tom: Animado, rápido, excêntrico
- Vocabulário: Termos técnicos, gírias
- Respostas: Curtas, engraçadas
- Papel: Alívio cômico

#### Luna - O Mistério

```typescript
{
  systemPrompt: `Você é Luna, uma figura misteriosa que apareceu na vila há pouco tempo. 
  Ninguém sabe de onde veio. Você fala em enigmas e metáforas, 
  às vezes cita filosofia. Responda em português, de forma enigmática e curta.`,
  
  greeting: 'O tempo é um rio que corre para trás quando ninguém olha...'
}
```

**Características:**
- Tom: Misterioso, filosófico
- Vocabulário: Enigmático, poético
- Respostas: Ambíguas, profundas
- Papel: Fonte de mistério

#### Bento - O Cozinheiro

```typescript
{
  systemPrompt: `Você é Bento, o cozinheiro da vila. 
  Você é super animado, adora cozinhar e falar sobre receitas. 
  Sempre oferece comida para quem passa. 
  Responda em português, de forma calorosa e curta.`,
  
  greeting: 'Chegou na hora certa! O ensopado de abóbora está quase pronto!'
}
```

**Características:**
- Tom: Acolhedor, entusiasta
- Vocabulário: Culinário, caloroso
- Respostas: Oferecendo comida
- Papel: Personagem amigável

#### Aria - A Artista

```typescript
{
  systemPrompt: `Você é Aria, uma jovem artista e musicista de 22 anos. 
  Você é sonhadora, sensível e toca piano. 
  Fala sobre arte, música e sentimentos. 
  Responda em português, de forma delicada e curta.`,
  
  greeting: 'Sabe aquela melodia que fica na cabeça? Estou tentando transformá-la em cores...'
}
```

**Características:**
- Tom: Sensível, artístico
- Vocabulário: Metáforas artísticas
- Respostas: Delicadas, emocionais
- Papel: Personagem criativa

#### Gael - O Explorador

```typescript
{
  systemPrompt: `Você é Gael, um explorador aventureiro que já viajou o mundo. 
  Você conta histórias de viagens, ruínas antigas e criaturas fantásticas. 
  Responda em português, de forma empolgante e curta.`,
  
  greeting: 'Já te contei sobre as cavernas de cristal ao norte? Um dia desses eu te levo!'
}
```

**Características:**
- Tom: Empolgado, aventureiro
- Vocabulário: Narrativo, descritivo
- Respostas: Contando histórias
- Papel: Fonte de aventura

---

## 🔄 Pipeline de Processamento de IA

### Fluxo Completo

```
┌─────────────────────────────────────────────────────────────────┐
│                    1. Player Input                               │
│                    "Olá, como vai?"                              │
└──────────────────────────┬──────────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│              2. Context Building (AIContextBuilder)              │
│  ├─ NPC Data (personality, systemPrompt)                        │
│  ├─ Conversation History (últimas 10 mensagens)                  │
│  ├─ Player Context (location, reputation)                       │
│  ├─ World State (time, weather, events)                         │
│  └─ Nearby NPCs (quem está por perto)                           │
└──────────────────────────┬──────────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│              3. Prompt Construction                              │
│  ┌─ System Message (personality + rules)                        │
│  ├─ User Message (conversation history)                         │
│  └─ Context Information (world state)                           │
└──────────────────────────┬──────────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│              4. LLM API Call                                     │
│  ├─ Model Selection (GPT-4, Claude, etc.)                       │
│  ├─ Parameters (temperature, maxTokens)                          │
│  └─ Rate Limiting                                               │
└──────────────────────────┬──────────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│              5. Response Processing                              │
│  ├─ Content Extraction                                          │
│  ├─ Emotion Detection                                           │
│  ├─ Action Detection                                            │
│  └─ Safety Filtering                                            │
└──────────────────────────┬──────────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│              6. UI Update                                        │
│  ├─ Add message to chat history                                 │
│  ├─ Show thinking indicator                                     │
│  ├─ Play NPC animation                                          │
│  └─ Update state                                                │
└─────────────────────────────────────────────────────────────────┘
```

### Código do Pipeline

```typescript
// Arquivo: src/components/game/AIService.ts

class AIService {
  async processMessage(
    npcId: string,
    userMessage: string,
    context: AIContext
  ): Promise<AIResponse> {
    // 1. Build prompt
    const prompt = this.buildPrompt(npcId, userMessage, context);
    
    // 2. Call LLM
    const rawResponse = await this.callLLM(prompt);
    
    // 3. Process response
    const processed = this.processResponse(rawResponse, context);
    
    // 4. Update conversation history
    await this.saveToHistory(npcId, {
      role: 'assistant',
      content: processed.content
    });
    
    return processed;
  }

  private buildPrompt(
    npcId: string,
    userMessage: string,
    context: AIContext
  ): string {
    const npc = NPCS.find(n => n.id === npcId);
    if (!npc) throw new Error(`NPC ${npcId} not found`);

    return `
${npc.systemPrompt}

Current conversation:
${context.conversationHistory.map(msg => 
  `${msg.role === 'user' ? 'Você' : npc.name}: ${msg.content}`
).join('\n')}

Player just said: "${userMessage}"

Respond as ${npc.name} in character. Keep it short and natural.
`.trim();
  }

  private async callLLM(prompt: string): Promise<string> {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.AI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are roleplaying as a character in a pixel art game.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.8,
        max_tokens: 150,
        top_p: 0.9
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;
  }

  private processResponse(
    rawResponse: string,
    context: AIContext
  ): AIResponse {
    // Clean up response
    const content = rawResponse
      .replace(/^["']|["']$/g, '') // Remove quotes
      .trim()
      .slice(0, 500); // Limit length

    // Detect emotion (future enhancement)
    const emotion = this.detectEmotion(content);
    
    // Detect action (future enhancement)
    const action = this.detectAction(content);

    return {
      content,
      metadata: { emotion, action }
    };
  }

  private detectEmotion(text: string): 'happy' | 'sad' | 'excited' | 'calm' | 'curious' {
    // Simple keyword-based detection (improve with ML later)
    const happyWords = ['feliz', 'alegre', 'ótimo', 'maravilhoso'];
    const sadWords = ['triste', 'chateado', 'pena', 'saudade'];
    
    const lowerText = text.toLowerCase();
    if (happyWords.some(word => lowerText.includes(word))) return 'happy';
    if (sadWords.some(word => lowerText.includes(word))) return 'sad';
    return 'calm';
  }

  private detectAction(text: string): string | null {
    // Detect if NPC should perform an action
    if (text.toLowerCase().includes('riso') || text.toLowerCase().includes('ri')) {
      return 'laugh';
    }
    if (text.toLowerCase().includes('pensar') || text.toLowerCase().includes('hmm')) {
      return 'think';
    }
    return null;
  }
}
```

---

## 🧩 Sistema de Contexto

### AIContext Interface

```typescript
interface AIContext {
  // NPC Information
  npcId: string;
  npcPersonality: string;
  npcGreeting: string;
  systemPrompt: string;
  
  // Conversation History
  conversationHistory: ChatMessage[];
  
  // Player Context
  playerContext: {
    location: Position;
    nearbyNPCs: string[];
    recentInteractions: string[];
    reputation: Record<string, number>;
    playerName?: string;
  };
  
  // World State
  currentSituation: {
    timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
    weather: 'sunny' | 'rainy' | 'cloudy' | 'stormy';
    season: 'spring' | 'summer' | 'autumn' | 'winter';
    event?: string;
  };
  
  // Environmental Context
  environment: {
    currentRoom?: string;
    nearbyObjects: string[];
    visibleNPCs: string[];
  };
}
```

### Context Builder

```typescript
// Arquivo: src/components/game/AIContextBuilder.ts

class AIContextBuilder {
  async buildForInteraction(
    npcId: string,
    playerPosition: Position
  ): Promise<AIContext> {
    const npc = NPCS.find(n => n.id === npcId);
    if (!npc) throw new Error('NPC not found');

    return {
      npcId: npc.id,
      npcPersonality: npc.personality,
      npcGreeting: npc.greeting,
      systemPrompt: npc.systemPrompt,
      
      conversationHistory: await this.getConversationHistory(npc.id),
      
      playerContext: {
        location: playerPosition,
        nearbyNPCs: this.getNearbyNPCs(playerPosition),
        recentInteractions: await this.getRecentInteractions(),
        reputation: await this.getPlayerReputation(npc.id)
      },
      
      currentSituation: {
        timeOfDay: this.getTimeOfDay(),
        weather: this.getWeather(),
        season: this.getSeason(),
        event: this.getCurrentEvent()
      },
      
      environment: {
        currentRoom: this.getCurrentRoom(playerPosition),
        nearbyObjects: this.getNearbyObjects(playerPosition),
        visibleNPCs: this.getVisibleNPCs(playerPosition)
      }
    };
  }

  private getTimeOfDay(): 'morning' | 'afternoon' | 'evening' | 'night' {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 18) return 'afternoon';
    if (hour >= 18 && hour < 21) return 'evening';
    return 'night';
  }

  private getNearbyNPCs(playerPos: Position): string[] {
    return NPCS
      .filter(npc => {
        const distance = Math.sqrt(
          Math.pow(npc.position.x - playerPos.x, 2) +
          Math.pow(npc.position.y - playerPos.y, 2)
        );
        return distance <= 5;
      })
      .map(npc => npc.id);
  }

  private getCurrentRoom(playerPos: Position): string | undefined {
    // Check if player is inside a building
    const tile = tiles[playerPos.y][playerPos.x];
    if (tile === 'floor') {
      return this.identifyRoom(playerPos);
    }
    return undefined;
  }

  private identifyRoom(pos: Position): string {
    // Room identification logic
    if (pos.y >= 4 && pos.y <= 8 && pos.x >= 5 && pos.x <= 11) {
      return 'flora_garden_house';
    }
    if (pos.y >= 4 && pos.y <= 8 && pos.x >= 16 && pos.x <= 22) {
      return 'rex_workshop';
    }
    return 'unknown';
  }

  private getNearbyObjects(pos: Position): string[] {
    const objects: string[] = [];
    const range = 2;
    
    for (let dy = -range; dy <= range; dy++) {
      for (let dx = -range; dx <= range; dx++) {
        const x = pos.x + dx;
        const y = pos.y + dy;
        if (tiles[y] && tiles[y][x]) {
          const tile = tiles[y][x];
          if (['table', 'chair', 'bookshelf', 'bed'].includes(tile)) {
            objects.push(tile);
          }
        }
      }
    }
    
    return objects;
  }
}
```

---

## 🎭 Comportamentos dos NPCs

### Estados do NPC

```typescript
enum NPCState {
  IDLE = 'idle',           // Esperando
  THINKING = 'thinking',   // Processando resposta
  TALKING = 'talking',     // Falando
  MOVING = 'moving',       // Movendo-se
  WORKING = 'working',     // Realizando atividade
  REACTING = 'reacting'    // Reagindo ao jogador
}
```

### Comportamentos por NPC

#### Flora - Padrões de Comportamento

```typescript
const floraBehaviors = {
  greetings: [
    'As plantas estão florescendo hoje...',
    'Bom dia, jovem viajante.',
    'Cada dia é uma nova oportunidade de crescer.',
    'A natureza sempre tem algo a nos ensinar.'
  ],
  
  responses: {
    nature: (topic: string) => `Sobre ${topic}... as plantas sabem melhor que nós.`,
    advice: (question: string) => `Deixe-me pensar... como uma árvore responderia?`,
    story: () => 'Deixe-me contar uma história sobre o jardim antigo...'
  },
  
  actions: {
    whenPlayerApproaches: 'water_plants',
    whenPlayerLeaves: 'watch_going',
    whenThinking: 'contemplate_nature'
  }
};
```

#### Rex - Padrões de Comportamento

```typescript
const rexBehaviors = {
  greetings: [
    'Ei! Segura isso!',
    'Você viu minha chave de fenda?',
    'Tenho uma ideia brilhante!',
    'Preciso de um assistente voluntário!'
  ],
  
  responses: {
    invention: (topic: string) => `Essa ${topic}? Já pensei em fazer uma versão automática!`,
    help: () => 'Pode me ajudar? É só apertar esse botão vermelho...',
    joke: () => 'Sabe por que o robô ficou bravo? Porque tinha pouco "torque"! Hahaha!'
  },
  
  actions: {
    whenPlayerApproaches: 'show_invention',
    whenPlayerLeaves: 'wave_excitedly',
    whenThinking: 'tinker_with_gadgets'
  }
};
```

---

## 💾 Memória e Persistência

### Sistema de Conversação

```typescript
interface ConversationRecord {
  id: string;
  npcId: string;
  playerId: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
  metadata: {
    playerReputationChange?: number;
    topicsDiscussed: string[];
    sentiment: 'positive' | 'neutral' | 'negative';
  };
}

class ConversationRepository {
  async getForNPC(npcId: string, playerId?: string): Promise<ChatMessage[]> {
    // Get last 50 messages
    const conversations = await db.conversations.findMany({
      where: { npcId },
      orderBy: { createdAt: 'desc' },
      take: 50
    });
    
    if (playerId) {
      // Filter by player if specified
      return conversations
        .filter(c => c.playerId === playerId)
        .flatMap(c => c.messages);
    }
    
    return conversations.flatMap(c => c.messages);
  }

  async saveMessage(
    npcId: string,
    playerId: string,
    message: ChatMessage
  ): Promise<void> {
    const conversation = await this.getOrCreate(npcId, playerId);
    conversation.messages.push(message);
    conversation.updatedAt = new Date();
    
    // Save to database
    await db.conversations.update({
      where: { id: conversation.id },
      data: conversation
    });
  }
}
```

### Sistema de Reputação

```typescript
interface ReputationSystem {
  getPlayerReputation(playerId: string, npcId: string): number;
  updateReputation(
    playerId: string,
    npcId: string,
    change: number
  ): Promise<void>;
  getReputationHistory(playerId: string, npcId: string): ReputationChange[];
}

class ReputationManager {
  private static WEIGHTS = {
    positiveConversation: 1,
    negativeConversation: -1,
    helpfulAction: 2,
    rudeBehavior: -2,
    frequentInteraction: 0.5
  };

  async updateFromAIResponse(
    npcId: string,
    playerMessage: string,
    aiResponse: string
  ): Promise<number> {
    // Analyze conversation sentiment
    const sentiment = await this.analyzeSentiment(playerMessage, aiResponse);
    
    // Calculate reputation change
    const change = sentiment === 'positive' ? 1 : 
                   sentiment === 'negative' ? -1 : 0;
    
    // Update reputation
    await this.updateReputation(npcId, change);
    
    return change;
  }

  private async analyzeSentiment(
    playerMessage: string,
    aiResponse: string
  ): Promise<'positive' | 'negative' | 'neutral'> {
    // Use AI to analyze sentiment
    const prompt = `
      Analyze the sentiment of this conversation:
      Player: ${playerMessage}
      NPC: ${aiResponse}
      
      Return: positive, negative, or neutral
    `;
    
    const sentiment = await this.callSentimentAPI(prompt);
    return sentiment;
  }
}
```

---

## 🎨 Integração com UI

### Componente DialogPanel com IA

```typescript
// Arquivo: src/components/game/DialogPanel.tsx

const DialogPanel: React.FC<DialogProps> = ({ 
  npc, 
  messages, 
  isThinking,
  onSend,
  onClose 
}) => {
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll para novas mensagens
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth'
    });
  }, [messages, isThinking]);

  // Auto-focus no input
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input.trim() && !isThinking) {
      const message = input.trim();
      setInput('');
      
      // Send to AI service
      await onSend(message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[480px] px-4"
    >
      <div className="bg-bubble pixel-border-strong">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 border-b-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">{npc.sprite}</span>
            <span className="font-pixel text-lg">{npc.name}</span>
            <span className="text-[10px] uppercase bg-muted px-1.5">
              {npc.tag}
            </span>
          </div>
          <button onClick={onClose} className="text-lg">✕</button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="px-4 py-3 max-h-[240px] overflow-y-auto">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`font-pixel text-base ${
                msg.role === 'user'
                  ? 'text-primary pl-4 border-l-2 border-primary/30'
                  : 'text-foreground'
              }`}
            >
              {msg.role === 'user' && (
                <span className="text-xs text-muted-foreground block mb-0.5">
                  Você
                </span>
              )}
              {msg.content}
            </div>
          ))}
          
          {/* Thinking Indicator */}
          {isThinking && (
            <div className="flex items-center gap-1 mt-2">
              {[0, 1, 2].map(i => (
                <motion.span
                  key={i}
                  className="w-2 h-2 rounded-full bg-muted-foreground"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ 
                    duration: 0.6, 
                    repeat: Infinity, 
                    delay: i * 0.1 
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Input */}
        <div className="px-4 py-2 border-t-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleSubmit}
            placeholder="Digite algo..."
            className="w-full bg-transparent outline-none font-pixel"
          />
        </div>
      </div>
    </motion.div>
  );
};
```

---

## 🔒 Segurança e Filtragem

### Content Filtering

```typescript
class ContentFilter {
  private blockedWords: Set<string>;
  private profanityFilter: boolean;
  private spamDetector: SpamDetector;

  constructor() {
    this.blockedWords = new Set([
      // Palavras bloqueadas
    ]);
    this.profanityFilter = true;
    this.spamDetector = new SpamDetector();
  }

  async filterMessage(message: string): Promise<FilteredResult> {
    // Check for blocked words
    if (this.hasBlockedWords(message)) {
      return {
        isValid: false,
        reason: 'blocked_words',
        cleanedMessage: this.replaceBlockedWords(message)
      };
    }

    // Check for spam
    if (this.spamDetector.isSpam(message)) {
      return {
        isValid: false,
        reason: 'spam',
        cleanedMessage: message
      };
    }

    // Send to AI for safety check (future)
    const aiSafetyCheck = await this.aiSafetyCheck(message);
    if (!aiSafetyCheck.isSafe) {
      return {
        isValid: false,
        reason: 'ai_flagged',
        cleanedMessage: message
      };
    }

    return {
      isValid: true,
      reason: null,
      cleanedMessage: message
    };
  }

  private hasBlockedWords(message: string): boolean {
    const lowerMessage = message.toLowerCase();
    return Array.from(this.blockedWords).some(word => 
      lowerMessage.includes(word)
    );
  }

  private replaceBlockedWords(message: string): string {
    return message.replace(
      new RegExp(Array.from(this.blockedWords).join('|'), 'gi'),
      '***'
    );
  }
}

interface FilteredResult {
  isValid: boolean;
  reason: string | null;
  cleanedMessage: string;
}
```

---

## 📊 Analytics e Monitoramento

### Tracking de Interações

```typescript
class InteractionTracker {
  trackInteraction(
    npcId: string,
    playerId: string,
    interactionType: 'greeting' | 'question' | 'story' | 'advice'
  ): void {
    analytics.track('npc_interaction', {
      npc_id: npcId,
      player_id: playerId,
      interaction_type: interactionType,
      timestamp: new Date().toISOString(),
      session_id: this.getSessionId()
    });
  }

  trackConversationLength(npcId: string, messageCount: number): void {
    analytics.track('conversation_length', {
      npc_id: npcId,
      message_count: messageCount,
      duration_seconds: this.calculateDuration()
    });
  }

  trackEmotion(npcId: string, emotion: string): void {
    analytics.track('npc_emotion', {
      npc_id: npcId,
      emotion: emotion,
      timestamp: new Date().toISOString()
    });
  }
}
```

---

## 🚀 Performance e Otimização

### Caching de Respostas

```typescript
class ResponseCache {
  private cache: Map<string, AIResponse>;
  private maxAge: number;

  constructor(maxAge = 3600000) { // 1 hour
    this.cache = new Map();
    this.maxAge = maxAge;
  }

  get(key: string): AIResponse | null {
    const entry = this.cache.get(key);
    if (!entry) return null;
    
    if (Date.now() - entry.timestamp > this.maxAge) {
      this.cache.delete(key);
      return null;
    }
    
    return entry.response;
  }

  set(key: string, response: AIResponse): void {
    this.cache.set(key, {
      response,
      timestamp: Date.now()
    });
    
    // Limit cache size
    if (this.cache.size > 1000) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
  }
}
```

### Rate Limiting

```typescript
class RateLimiter {
  private requests: Map<string, number[]>;
  private maxRequests: number;
  private windowMs: number;

  constructor(maxRequests = 10, windowMs = 60000) {
    this.requests = new Map();
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  isAllowed(userId: string): boolean {
    const now = Date.now();
    const userRequests = this.requests.get(userId) || [];
    
    // Remove old requests
    const recentRequests = userRequests.filter(
      timestamp => now - timestamp < this.windowMs
    );
    
    if (recentRequests.length >= this.maxRequests) {
      this.requests.set(userId, recentRequests);
      return false;
    }
    
    recentRequests.push(now);
    this.requests.set(userId, recentRequests);
    return true;
  }
}
```

---

**Este sistema de IA é um trabalho em andamento e será expandido conforme o projeto evolui.**
