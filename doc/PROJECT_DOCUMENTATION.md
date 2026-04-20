# Pixel Paladins - Social AI Simulator

## 📖 Visão Geral do Projeto

**Pixel Paladins** é um simulador social ambientado em um mundo pixel art, onde jogadores podem interagir com NPCs (personagens não jogáveis) dotados de inteligência artificial. O projeto explora a criação de experiências sociais imersivas em um ambiente de jogo 2D, combinando mecânicas de RPG clássico com conversas naturais mediadas por IA.

### 🎯 Conceito Central

O projeto, também conhecido como **"Echo Village"**, propõe um ambiente onde:
- Jogadores exploram uma vila pixelada
- Interagem com NPCs únicos através de diálogos naturais
- Cada NPC possui personalidade, história e comportamento próprios
- As conversas são simuladas por IA, criando experiências dinâmicas e imprevisíveis

### 💡 Ideias Principais

1. **IA Social em Jogos**: Explorar como IAs podem criar personagens NPCs mais realistas e envolventes
2. **Narrativa Emergente**: Histórias que surgem naturalmente das interações entre jogador e NPCs
3. **Mundo Pixel Art Moderno**: Estética retrô com tecnologia contemporânea
4. **Simulação Social**: Criar uma comunidade virtual onde cada personagem tem agência própria

---

## 📸 Capturas de Tela

### Interface do Jogo

![Pixel Paladins - Interface do Jogo](./Captura de tela 2026-04-20 171144.png)

*Explorando a vila pixelada e interagindo com NPCs*

![Pixel Paladins - Sistema de Diálogo](./Captura de tela 2026-04-20 171445.png)

*Interface de diálogo com NPCs*

---

## ️ Arquitetura do Projeto

### Estrutura de Pastas

```
pixel-paladins/
├── src/
│   ├── components/
│   │   ├── game/              # Componentes principais do jogo
│   │   │   ├── GameWorld.tsx       # Mundo do jogo principal
│   │   │   ├── GameHUD.tsx         # Interface do usuário
│   │   │   ├── PlayerSprite.tsx    # Personagem do jogador
│   │   │   ├── NPCSprite.tsx       # NPCs no mundo
│   │   │   ├── PixelCharacter.tsx  # Renderização de personagens
│   │   │   ├── TileRenderer.tsx    # Renderização do mapa
│   │   │   ├── mapData.ts          # Dados do mapa e NPCs
│   │   │   ├── types.ts            # Tipos TypeScript
│   │   │   └── useGameLoop.ts      # Lógica do jogo
│   │   └── ui/                 # Componentes shadcn/ui
│   ├── pages/                  # Páginas da aplicação
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utilitários
│   └── App.tsx                 # App principal
├── doc/                        # Documentação
├── public/                     # Arquivos estáticos
└── test/                       # Testes
```

---

## 🛠️ Tecnologias Utilizadas

### Frontend

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| **React** | 18+ | Biblioteca JavaScript para interfaces de usuário |
| **TypeScript** | Latest | Superset tipado do JavaScript |
| **Vite** | Latest | Build tool e dev server ultra-rápido |
| **Tailwind CSS** | Latest | Framework CSS utilitário |
| **shadcn/ui** | Latest | Componentes UI reutilizáveis |
| **Framer Motion** | 12+ | Biblioteca de animações |
| **React Router** | Latest | Roteamento para SPAs |
| **TanStack Query** | 5+ | Gerenciamento de estado assíncrono |

### Ferramentas de Desenvolvimento

| Ferramenta | Descrição |
|------------|-----------|
| **ESLint** | Linting para qualidade de código |
| **Vitest** | Framework de testes unitários |
| **Playwright** | Testes E2E |

### Estilização

- **Tailwind CSS**: Para estilização utilitária
- **Framer Motion**: Animações suaves e transições
- **Pixel Art Styling**: Fontes pixeladas e bordas estilizadas

---

## 🎮 Mecânicas do Jogo

### Controles

| Tecla | Ação |
|-------|------|
| **W / ↑** | Mover para cima |
| **S / ↓** | Mover para baixo |
| **A / ←** | Mover para esquerda |
| **D / →** | Mover para direita |
| **E** | Interagir com NPC próximo |
| **ENTER** | Enviar mensagem no diálogo |
| **ESC** | Fechar diálogo |

### Sistema de Interação

1. **Proximidade**: Jogador deve estar a 2 tiles de distância de um NPC
2. **Indicador Visual**: Nome do NPC aparece quando próximo
3. **Tecla de Interação**: Pressionar `E` inicia conversa
4. **Diálogo**: Interface de chat com histórico de mensagens
5. **Feedback Visual**: Indicador de "pensando" quando NPC responde

---

## 🤖 Sistema de IA

### Arquitetura Atual (Simulação)

O sistema de IA atual é **simulado** para fins de desenvolvimento:

```typescript
// Simulated AI response (will be replaced with real AI)
await new Promise(r => setTimeout(r, 800 + Math.random() * 1200));

const responses = [
  npc.greeting,
  'Hmm, que interessante... Me conta mais sobre isso.',
  'Sabe, eu estava pensando exatamente nisso hoje cedo.',
  // ... mais respostas
];
```

### Arquitetura Futura (IA Real)

O plano é substituir a simulação por uma **IA real** usando:

#### Opções de Implementação

1. **API de LLM (Large Language Model)**
   - OpenAI GPT-4/3.5
   - Anthropic Claude
   - Google Gemini
   - Modelos open-source (Llama, Mistral)

2. **Sistema de Contexto**
   ```typescript
   interface AIContext {
     npcId: string;
     personality: string;
     systemPrompt: string;
     conversationHistory: ChatMessage[];
     playerContext: {
       name?: string;
       location: Position;
       recentInteractions: string[];
     };
   }
   ```

3. **Pipeline de Processamento**
   ```
   Player Input → Context Building → LLM API → Response Processing → UI Display
   ```

### System Prompts dos NPCs

Cada NPC possui um `systemPrompt` único que define:

- **Personalidade**: Traços de caráter e comportamento
- **Tom de voz**: Como fala (formal, informal, poético, etc.)
- **Contexto**: História e papel na vila
- **Idioma**: Todas as respostas em português

#### Exemplo: Flora (Mentora)

```typescript
{
  systemPrompt: 'Você é Flora, uma jardineira sábia de 60 anos que vive na vila. Você fala com calma, usa metáforas sobre plantas e natureza. Você é mentora e guia. Responda em português, de forma curta e poética.',
  greeting: 'As raízes mais profundas são as que não se veem...',
}
```

---

## 🗺️ Sistema de Mapa

### Estrutura do Mapa

- **Dimensões**: 30 tiles × 22 tiles
- **Tamanho do Tile**: 48×48 pixels
- **Sistema de Coordenadas**: Grid-based (x, y)

### Tipos de Tiles

#### Terreno
- `grass`, `grass_dark` - Grama
- `path`, `path_dark` - Caminhos
- `water`, `sand` - Água e areia

#### Estruturas
- `wall`, `wall_top`, `wall_left`, `wall_right` - Paredes
- `floor` - Chão interno
- `door` - Portas

#### Decoração
- `tree` - Árvores
- `flower_red`, `flower_blue`, `flower_yellow` - Flores
- `bush`, `rock` - Arbustos e pedras

#### Mobília
- `table`, `chair` - Móveis
- `bookshelf` - Estantes
- `bed` - Camas
- `stove`, `counter` - Cozinha
- `piano` - Piano
- `rug` - Tapetes
- `chest` - Baús

### Tiles Sólidos (Colisão)

```typescript
export const SOLID_TILES: TileType[] = [
  'wall', 'wall_top', 'wall_left', 'wall_right',
  'water', 'tree', 'rock',
  'table', 'bookshelf', 'bed', 'stove', 'counter', 'piano', 'chest'
];
```

---

## 👥 NPCs do Projeto

### Flora - A Mentora 🧑🌾

- **Personalidade**: Jardineira sábia e calma que ama a natureza
- **Tag**: MENTORA
- **Posição**: (5, 6)
- **Características**: Fala com metáforas sobre plantas, guia o jogador
- **Frase de Saudação**: "As raízes mais profundas são as que não se veem..."

### Rex - O Inventor 🧑‍🔬

- **Personalidade**: Inventor excêntrico e engraçado
- **Tag**: INVENTOR
- **Posição**: (18, 5)
- **Características**: Fala rápido, faz piadas, sempre com projetos malucos
- **Frase de Saudação**: "Ei! Segura essa engrenagem enquanto eu ajusto o fluxo de capacitância!"

### Luna - O Mistério 🧙‍♀️

- **Personalidade**: Misteriosa e filosófica, fala em enigmas
- **Tag**: MISTÉRIO
- **Posição**: (22, 7)
- **Características**: Fala em enigmas, cita filosofia, ninguém sabe de onde veio
- **Frase de Saudação**: "O tempo é um rio que corre para trás quando ninguém olha..."

### Bento - O Cozinheiro 👨🍳

- **Personalidade**: Cozinheiro animado, adora comida e festas
- **Tag**: COZINHEIRO
- **Posição**: (5, 8)
- **Características**: Super animado, oferece comida, caloroso
- **Frase de Saudação**: "Chegou na hora certa! O ensopado de abóbora está quase pronto!"

### Aria - A Artista 🧑‍🎨

- **Personalidade**: Jovem artista sonhadora que toca piano
- **Tag**: ARTISTA
- **Posição**: (20, 8)
- **Características**: Sensível, fala sobre arte e música
- **Frase de Saudação**: "Sabe aquela melodia que fica na cabeça? Estou tentando transformá-la em cores..."

### Gael - O Explorador 🧭

- **Personalidade**: Explorador aventureiro, conta histórias de viagens
- **Tag**: EXPLORADOR
- **Posição**: (14, 15)
- **Características**: Viajou o mundo, conta histórias de aventuras
- **Frase de Saudação**: "Já te contei sobre as cavernas de cristal ao norte? Um dia desses eu te levo!"

---

## 🎨 Design de Personagens

### Sistema de Aparência

Cada personagem possui propriedades visuais definidas:

```typescript
interface CharacterLook {
  hair: string;        // Cor do cabelo (hex)
  skin: string;        // Tom de pele (hex)
  shirt: string;       // Cor da camisa (hex)
  pants: string;       // Cor das calças (hex)
  hairStyle: 'short' | 'long' | 'spiky' | 'bald' | 'hat' | 'hood';
  accessory?: 'glasses' | 'earring' | 'scarf' | 'beard';
}
```

### Renderização Pixel Art

- SVG-based rendering
- Escalável via prop `size`
- Animação suave de "respiração"
- Sombra dinâmica
- Direção do personagem (up, down, left, right)

---

## 📊 Estado e Gerenciamento

### Estado do Jogo

```typescript
interface GameState {
  playerPos: Position;
  activeNPC: string | null;
  nearbyNPC: NPCData | null;
  chatHistories: Record<string, ChatMessage[]>;
  isThinking: boolean;
  tiles: TileType[][];
}
```

### Custom Hook: `useGameLoop`

Gerencia:
- Movimento do jogador
- Detecção de NPCs próximos
- Interações
- Diálogos
- Controles de teclado

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- Node.js (versão 18+)
- npm ou yarn

### Instalação

```bash
# Clonar o repositório
git clone <repository-url>
cd pixel-paladins

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

### Comandos Disponíveis

```bash
npm run dev      # Iniciar servidor de desenvolvimento
npm run build    # Build de produção
npm run build:dev # Build de desenvolvimento
npm run lint     # Verificar qualidade de código
npm run test     # Executar testes
npm run preview  # Pré-visualizar build
```

---

## 🧪 Testes

### Testes Unitários

```bash
npm run test
```

### Testes E2E (Playwright)

```bash
npm run test:e2e
```

---

## 📱 Recursos Visuais

### HUD (Heads-Up Display)

- Controles de movimento (WASD)
- Tecla de interação (E)
- Indicador de proximidade com NPCs

### Diálogo

- Painel fixo na parte inferior da tela
- Histórico de mensagens
- Indicador de "pensando" (pontos animados)
- Scroll automático para novas mensagens
- Foco automático no input

### Animações

- **Camera**: Segue o jogador suavemente
- **NPCs**: Zoom quando interagindo
- **Diálogo**: Fade in/out com spring animation
- **Loading**: Indicadores de "pensando" animados

---

## 🔮 Roadmap e Futuro

### Fase 1: IA Real (Atual)
- [x] Estrutura do projeto
- [x] Sistema de movimento
- [x] Sistema de diálogo
- [x] Simulação de IA
- [ ] Integração com API de LLM
- [ ] Contexto persistente de conversas
- [ ] Memória de longo prazo dos NPCs

### Fase 2: Expansão do Mundo
- [ ] Mais NPCs com personalidades únicas
- [ ] Missões e quests
- [ ] Sistema de inventário
- [ ] Itens colecionáveis
- [ ] Mais áreas para explorar

### Fase 3: Mecânicas Avançadas
- [ ] Sistema de reputação com NPCs
- [ ] Relações entre NPCs
- [ ] Eventos dinâmicos na vila
- [ ] Dia/noite ciclo
- [ ] Weather system

### Fase 4: Multiplayer
- [ ] Multiplayer cooperativo
- [ ] Chat entre jogadores
- [ ] Eventos sociais
- [ ] Economia entre jogadores

---

## 📝 Notas de Desenvolvimento

### Decisões de Design

1. **Pixel Art SVG**: Escolhido por ser escalável e leve
2. **React Hooks**: Para gerenciamento de estado declarativo
3. **Tailwind CSS**: Para estilização rápida e consistente
4. **TypeScript**: Para segurança de tipos e melhor DX
5. **Framer Motion**: Para animações suaves sem esforço

### Desafios Técnicos

1. **Performance**: Renderização eficiente de muitos tiles
2. **IA**: Balancear realismo com latência aceitável
3. **Mobile**: Suporte a controles touch (em desenvolvimento)
4. **Acessibilidade**: Navegação por teclado e leitores de tela

### Melhorias Futuras

- [ ] PWA (Progressive Web App)
- [ ] Offline support
- [ ] Internacionalização (i18n)
- [ ] Modos de dificuldade
- [ ] Editor de mapas para usuários

---

## 📄 Licença

Este projeto é um projeto educacional/experimental para explorar integração de IA em jogos.

---

## 👨‍ Contribuição

Para contribuir:

1. Fork o repositório
2. Crie uma branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📞 Contato

Para dúvidas ou sugestões, abra uma issue no repositório.

---

**Pixel Paladins** - Onde a IA encontra a magia dos jogos pixel art! 🎮✨
