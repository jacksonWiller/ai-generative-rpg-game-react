# Arquitetura Técnica - Pixel Paladins

## 🏗️ Visão Geral da Arquitetura

Este documento descreve a arquitetura técnica do projeto **Pixel Paladins**, incluindo detalhes de implementação, padrões de design e decisões arquiteturais.

---

## � Capturas de Tela

### Arquitetura do Sistema

![Pixel Paladins - Arquitetura do Sistema](./Captura de tela 2026-04-20 171144.png)

*Visualização do mundo do jogo e componentes de UI*

![Pixel Paladins - Sistema de Diálogo](./Captura de tela 2026-04-20 171445.png)

*Componente de diálogo e gerenciamento de chat*

---

## �📐 Arquitetura do Sistema

### Diagrama de Componentes

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND (React)                      │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   GameWorld  │  │   GameHUD    │  │  DialogPanel │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
│         │                 │                  │               │
│  ┌──────▼─────────────────▼──────────────────▼───────┐      │
│  │              useGameLoop (Custom Hook)             │      │
│  │  - Player movement                                 │      │
│  │  - Collision detection                             │      │
│  │  - NPC proximity                                   │      │
│  │  - Chat management                                 │      │
│  └───────────────────────────────────────────────────┘      │
│                              │                               │
│  ┌───────────────────────────▼───────────────────────────┐  │
│  │                   Game State Management                │  │
│  │  - playerPos: Position                                 │  │
│  │  - activeNPC: string | null                            │  │
│  │  - chatHistories: Record<string, ChatMessage[]>       │  │
│  │  - isThinking: boolean                                 │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    AI INTEGRATION LAYER                      │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────┐  │
│  │  CURRENT: Simulated AI (Mock responses)              │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  FUTURE: LLM API Integration                         │  │
│  │  - Context builder                                   │  │
│  │  - Prompt engineering                                │  │
│  │  - Response processing                               │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎮 Game Loop Architecture

### Fluxo do Game Loop

```typescript
// Arquivo: src/components/game/useGameLoop.ts

┌─────────────────────────────────────────────────────────────┐
│                    useGameLoop Hook                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. STATE INITIALIZATION                                    │
│     ├─ playerPos: Position                                  │
│     ├─ activeNPC: string | null                             │
│     ├─ chatHistories: Record<string, ChatMessage[]>        │
│     └─ isThinking: boolean                                  │
│                                                              │
│  2. HELPER FUNCTIONS                                        │
│     ├─ isSolid(x, y): boolean                               │
│     ├─ isNPCAt(x, y): boolean                               │
│     └─ distance(a, b): number                               │
│                                                              │
│  3. MOVEMENT LOGIC                                          │
│     └─ move(dx, dy): void                                   │
│         ├─ Check bounds                                     │
│         ├─ Check collision (tiles)                          │
│         └─ Check collision (NPCs)                           │
│                                                              │
│  4. INTERACTION LOGIC                                       │
│     └─ interact(): void                                     │
│         └─ Find NPC within range (2 tiles)                  │
│                                                              │
│  5. DIALOG MANAGEMENT                                       │
│     ├─ sendMessage(message): void                           │
│     │   ├─ Add user message to history                      │
│     │   ├─ Set isThinking = true                          │
│     │   ├─ Call AI API (future)                             │
│     │   ├─ Wait for response                                │
│     │   └─ Add AI response to history                       │
│     └─ closeDialog(): void                                  │
│                                                              │
│  6. KEYBOARD CONTROLS                                       │
│     └─ useEffect with keydown listener                       │
│         ├─ W/↑: move(0, -1)                                 │
│         ├─ S/↓: move(0, 1)                                  │
│         ├─ A/←: move(-1, 0)                                 │
│         ├─ D/→: move(1, 0)                                  │
│         └─ E: interact()                                    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Collision Detection

```typescript
// Sistema de colisão baseado em grid

function isSolid(x: number, y: number): boolean {
  // Verifica limites do mapa
  if (x < 0 || y < 0 || x >= MAP_WIDTH || y >= MAP_HEIGHT) return true;
  // Verifica se o tile é sólido
  return SOLID_TILES.includes(tiles[y][x]);
}

function isNPCAt(x: number, y: number): boolean {
  // Verifica se há um NPC na posição
  return NPCS.some(n => n.position.x === x && n.position.y === y);
}

// Movimento com verificação de colisão
const move = useCallback((dx: number, dy: number) => {
  if (activeNPC) return; // Bloqueia movimento durante diálogo
  setPlayerPos(prev => {
    const nx = prev.x + dx;
    const ny = prev.y + dy;
    if (isSolid(nx, ny) || isNPCAt(nx, ny)) return prev;
    return { x: nx, y: ny };
  });
}, [activeNPC]);
```

---

## 🤖 Sistema de IA - Arquitetura Futura

### Interface de Integração com IA

```typescript
// Arquivo: src/components/game/AIService.ts (Futuro)

interface AIConfig {
  apiKey: string;
  model: string;
  temperature: number;
  maxTokens: number;
  systemPrompt: string;
}

interface AIContext {
  npcId: string;
  npcPersonality: string;
  npcGreeting: string;
  conversationHistory: ChatMessage[];
  playerContext: {
    location: Position;
    nearbyNPCs: string[];
    recentInteractions: string[];
  };
  currentSituation: {
    timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
    weather: 'sunny' | 'rainy' | 'cloudy';
    event?: string;
  };
}

interface AIResponse {
  content: string;
  metadata?: {
    emotion?: 'happy' | 'sad' | 'angry' | 'excited' | 'calm';
    action?: string;
    duration?: number; // ms para animação
  };
}

class AIService {
  private config: AIConfig;
  private cache: Map<string, AIResponse>;

  constructor(config: AIConfig) {
    this.config = config;
    this.cache = new Map();
  }

  async generateResponse(
    context: AIContext
  ): Promise<AIResponse> {
    // 1. Construir prompt completo
    const prompt = this.buildPrompt(context);
    
    // 2. Verificar cache (opcional)
    const cacheKey = this.generateCacheKey(prompt);
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    // 3. Chamar API do LLM
    const response = await this.callLLM(prompt);
    
    // 4. Processar resposta
    const processed = this.processResponse(response);
    
    // 5. Cache da resposta
    this.cache.set(cacheKey, processed);
    
    return processed;
  }

  private buildPrompt(context: AIContext): string {
    return `
${context.npcPersonality}

Current conversation:
${context.conversationHistory.map(msg => 
  `${msg.role}: ${msg.content}`
).join('\n')}

Current situation:
- Location: (${context.playerContext.location.x}, ${context.playerContext.location.y})
- Nearby NPCs: ${context.playerContext.nearbyNPCs.join(', ')}
- Time: ${context.currentSituation.timeOfDay}

Respond as ${context.npcId} in character. Keep responses short and natural.
`.trim();
  }

  private async callLLM(prompt: string): Promise<string> {
    // Implementação da chamada à API
    const response = await fetch('https://api.example.com/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.config.apiKey}`
      },
      body: JSON.stringify({
        model: this.config.model,
        messages: [
          { role: 'system', content: this.config.systemPrompt },
          { role: 'user', content: prompt }
        ],
        temperature: this.config.temperature,
        max_tokens: this.config.maxTokens
      })
    });
    
    const data = await response.json();
    return data.choices[0].message.content;
  }

  private processResponse(rawResponse: string): AIResponse {
    // Processar metadados, emoções, etc.
    return {
      content: rawResponse,
      metadata: {
        emotion: this.detectEmotion(rawResponse),
        action: this.detectAction(rawResponse)
      }
    };
  }
}
```

### Sistema de Contexto para NPCs

```typescript
// Arquivo: src/components/game/AIContextBuilder.ts (Futuro)

class AIContextBuilder {
  private npcRepository: NPCRepository;
  private conversationRepository: ConversationRepository;

  async buildForNPC(npcId: string, playerId: string): Promise<AIContext> {
    const npc = await this.npcRepository.getById(npcId);
    const conversations = await this.conversationRepository.getForNPC(npcId);
    const player = await this.playerRepository.getById(playerId);

    return {
      npcId: npc.id,
      npcPersonality: npc.personality,
      npcGreeting: npc.greeting,
      systemPrompt: npc.systemPrompt,
      conversationHistory: conversations.slice(-10), // Últimas 10 mensagens
      playerContext: {
        location: player.position,
        nearbyNPCs: this.getNearbyNPCs(player.position),
        recentInteractions: this.getRecentInteractions(playerId),
        reputation: player.reputation[npcId] || 0
      },
      currentSituation: {
        timeOfDay: this.getTimeOfDay(),
        weather: this.getWeather(),
        event: this.getCurrentEvent()
      }
    };
  }

  private getNearbyNPCs(playerPos: Position): string[] {
    return NPCS
      .filter(npc => this.distance(playerPos, npc.position) <= 5)
      .map(npc => npc.id);
  }

  private getRecentInteractions(playerId: string): string[] {
    // Retornar últimas 5 interações do jogador
    return [];
  }

  private getTimeOfDay(): 'morning' | 'afternoon' | 'evening' | 'night' {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 18) return 'afternoon';
    if (hour >= 18 && hour < 21) return 'evening';
    return 'night';
  }

  private distance(a: Position, b: Position): number {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  }
}
```

---

## 🗺️ Sistema de Mapa

### Estrutura de Dados

```typescript
// Arquivo: src/components/game/mapData.ts

interface MapData {
  width: number;
  height: number;
  tiles: TileType[][];
  npcs: NPCData[];
}

// Representação do mapa
const rawMap: string[] = [
  'tttggg1ggtttggggggggttttggggttt',
  'tgggggggggtg2gggggggttggggggbgt',
  // ... mais linhas
];

// Conversão para grid de tiles
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
```

### Tile Renderer

```typescript
// Arquivo: src/components/game/TileRenderer.tsx

interface TileRendererProps {
  tiles: TileType[][];
}

const TileRenderer: React.FC<TileRendererProps> = ({ tiles }) => {
  return (
    <>
      {tiles.map((row, y) =>
        row.map((tile, x) => (
          <div
            key={`${x}-${y}`}
            className="absolute"
            style={{
              left: x * TILE_SIZE,
              top: y * TILE_SIZE,
              width: TILE_SIZE,
              height: TILE_SIZE,
            }}
          >
            <TileSprite type={tile} />
          </div>
        ))
      )}
    </>
  );
};
```

---

## 🎨 Componentes React

### Hierarquia de Componentes

```
App
├── GameWorld
│   ├── GameHUD
│   ├── TileRenderer
│   │   └── TileSprite (renderizado N vezes)
│   ├── NPCSprite (renderizado para cada NPC)
│   │   ├── PixelCharacter
│   │   └── NameBubble
│   ├── PlayerSprite
│   │   └── PixelCharacter
│   └── DialogPanel
│       ├── MessageList
│       ├── MessageItem
│       └── ChatInput
```

### Padrões de Componentes

#### 1. Componentes de Sprite

```typescript
// Padrão para todos os sprites
interface SpriteProps {
  position: Position;
  size?: number;
  animation?: boolean;
}

const SpriteComponent: React.FC<SpriteProps> = ({ 
  position, 
  size = TILE_SIZE,
  animation = true 
}) => {
  return (
    <motion.div
      className="absolute"
      style={{
        left: position.x * TILE_SIZE,
        top: position.y * TILE_SIZE,
        width: size,
        height: size,
      }}
      animate={animation ? { y: [0, -2, 0] } : {}}
      transition={{ duration: 2, repeat: Infinity }}
    >
      {/* Sprite content */}
    </motion.div>
  );
};
```

#### 2. Componentes de Diálogo

```typescript
// Padrão para painéis de diálogo
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

  // Auto-focus no input
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Auto-scroll para mensagens
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth'
    });
  }, [messages]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      {/* Dialog content */}
    </motion.div>
  );
};
```

---

## 📊 Gerenciamento de Estado

### Estado Global vs Local

```typescript
// Estado GLOBAL (GameWorld)
const GameWorld = () => {
  const gameState = useGameLoop(); // Custom hook
  
  return (
    <GameWorldContext.Provider value={gameState}>
      {/* Componentes filhos */}
    </GameWorldContext.Provider>
  );
};

// Estado LOCAL (DialogPanel)
const DialogPanel = () => {
  const [input, setInput] = useState(''); // Local
  const { sendMessage } = useGameLoop(); // Global
};
```

### Custom Hooks

#### useGameLoop

```typescript
export const useGameLoop = () => {
  // Estado principal
  const [playerPos, setPlayerPos] = useState<Position>({ x: 13, y: 12 });
  const [activeNPC, setActiveNPC] = useState<string | null>(null);
  const [chatHistories, setChatHistories] = useState<Record<string, ChatMessage[]>>({});
  const [isThinking, setIsThinking] = useState(false);

  // Refs para evitar stale closures
  const playerPosRef = useRef(playerPos);
  playerPosRef.current = playerPos;

  // Funções de movimento
  const move = useCallback((dx: number, dy: number) => { /* ... */ }, [activeNPC]);
  
  // Funções de interação
  const interact = useCallback(() => { /* ... */ }, [activeNPC]);
  
  // Funções de diálogo
  const sendMessage = useCallback(async (message: string) => { /* ... */ }, [activeNPC]);
  const closeDialog = useCallback(() => { setActiveNPC(null); }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { /* ... */ };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [move, interact, activeNPC]);

  return {
    playerPos,
    activeNPC,
    nearbyNPC,
    chatHistories,
    isThinking,
    sendMessage,
    closeDialog,
    tiles
  };
};
```

---

## 🎬 Animações com Framer Motion

### Padrões de Animação

#### 1. Camera Follow

```typescript
<motion.div
  className="absolute"
  animate={{
    x: -playerPos.x * TILE_SIZE + window.innerWidth / 2 - TILE_SIZE / 2,
    y: -playerPos.y * TILE_SIZE + window.innerHeight / 2 - TILE_SIZE / 2,
  }}
  transition={{ type: 'tween', duration: 0.15 }}
  style={{ width: mapPxW, height: mapPxH }}
>
  {/* Game world */}
</motion.div>
```

#### 2. NPC Zoom on Interaction

```typescript
<motion.div
  animate={isActive ? { scale: 1.15, y: -4 } : {}}
  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
>
  <PixelCharacter look={npc.look} />
</motion.div>
```

#### 3. Thinking Indicator

```typescript
<div className="flex gap-0.5">
  {[0, 1, 2].map(i => (
    <motion.span
      key={i}
      className="w-1.5 h-1.5 rounded-full bg-primary"
      animate={{ y: [0, -6, 0] }}
      transition={{
        duration: 0.6,
        repeat: Infinity,
        delay: i * 0.1,
      }}
    />
  ))}
</div>
```

---

## 🔐 Segurança e Performance

### Otimizações Implementadas

1. **Memoization**
   ```typescript
   const activeNPCData = useMemo(
     () => NPCS.find(n => n.id === activeNPC),
     [activeNPC]
   );
   ```

2. **Debounce para movimentos**
   ```typescript
   // Implementar se necessário para mobile
   const moveDebounced = debounce(move, 100);
   ```

3. **Virtualização de tiles** (Futuro)
   ```typescript
   // Renderizar apenas tiles visíveis na tela
   const visibleTiles = useMemo(() => {
     const viewport = getViewportTiles();
     return tiles.filter(tile => viewport.includes(tile));
   }, [tiles]);
   ```

### Segurança

1. **Input sanitization**
   ```typescript
   // Sanitizar input do usuário
   const sanitizeInput = (input: string): string => {
     return input
       .replace(/[<>]/g, '') // Remover HTML tags
       .trim()
       .slice(0, 500); // Limite de caracteres
   };
   ```

2. **Rate limiting** (Futuro para IA)
   ```typescript
   // Limitar chamadas à API
   const rateLimiter = new RateLimiter({ max: 10, window: 60000 });
   ```

---

## 🧪 Testes

### Estrutura de Testes

```
test/
├── setup.ts              # Configuração do ambiente de teste
├── example.test.ts       # Exemplo de teste
└── game/
    ├── useGameLoop.test.ts
    ├── mapData.test.ts
    └── collision.test.ts
```

### Exemplo de Teste

```typescript
// test/game/useGameLoop.test.ts

describe('useGameLoop', () => {
  it('should move player when key is pressed', () => {
    // Setup
    const { result } = renderHook(() => useGameLoop());
    
    // Action
    fireEvent.keyDown(window, { key: 'w' });
    
    // Assert
    expect(result.current.playerPos).toEqual({ x: 13, y: 11 });
  });

  it('should not move through walls', () => {
    // Setup
    const { result } = renderHook(() => useGameLoop());
    
    // Action
    fireEvent.keyDown(window, { key: 'w' });
    
    // Assert
    expect(result.current.playerPos.x).toBe(13); // Não mudou
  });
});
```

---

## 📦 Build e Deploy

### Vite Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    target: 'esnext',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['@radix-ui/react-dialog'],
        },
      },
    },
  },
});
```

### Environment Variables

```bash
# .env.example
VITE_AI_API_KEY=your_api_key_here
VITE_AI_MODEL=gpt-4
VITE_AI_BASE_URL=https://api.example.com
```

---

## 📚 Referências

### Documentação de Bibliotecas

- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Docs](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [shadcn/ui](https://ui.shadcn.com)

### Padrões de Design

- **Custom Hooks**: Para lógica reutilizável
- **Compound Components**: Para componentes complexos
- **Render Props**: Para lógica compartilhada
- **State Reducers**: Para controle flexível de estado

---

**Esta documentação é um guia vivo e deve ser atualizada conforme o projeto evolui.**
