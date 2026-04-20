# 🛡️ Pixel Paladins

## O Futuro dos NPCs com Inteligência Artificial

<div align="center">

![Pixel Paladins Header](./doc/images/header-screenshot.png)

**Um simulador social onde cada NPC é uma mente única, alimentada por IA**

[![TypeScript](https://img.shields.io/badge/TypeScript-50%20%2B-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18%2B-61DAFB?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-Next%20Gen-646CFF?logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

</div>

---

## 🎯 O Que É o Pixel Paladins?

**Pixel Paladins** é um laboratório de pesquisa em **IA Social para Jogos**, onde personagens não-jogáveis (NPCs) ganham vida através de modelos de linguagem avançados. Cada NPC possui personalidade única, memória de interações e capacidade de diálogo natural.

### 🚀 Inovação Principal

> **NPCs que realmente conversam** — não com scripts pré-definidos, mas com inteligência artificial que gera respostas únicas, contextualizadas e personalizadas para cada jogador.

---

## ✨ Recursos Principais

### 🤖 NPCs Impulsionados por IA

| Característica | Descrição |
|----------------|-----------|
| **Personalidades Únicas** | Cada NPC tem um "system prompt" que define quem é, como fala e o que sabe |
| **Diálogos Naturais** | Conversas geradas em tempo real, sem roteiros pré-escritos |
| **Contexto Rico** | NPCs consideram hora do dia, localização, histórico e relações |
| **Memória de Interações** | Lembram de conversas anteriores e evoluem com o tempo |
| **Reações Dinâmicas** | Comportamentos que variam conforme o contexto emocional |

### 🎮 Experiência de Jogo

- **Mundo Pixel Art Imersivo** — Estética retrô com profundidade emocional
- **Exploração Livre** — Navegue por uma vila viva e reativa
- **Interações Significativas** — Cada conversa conta uma história única
- **Interface Intuitiva** — Diálogos elegantes com feedback visual

---

## 📸 Demonstração Visual

### 🏘️ A Vila

![A Vila](./doc/images/village-overview.png)

*Explorando a vila pixelada — cada canto tem histórias para contar*

### 💬 Sistema de Diálogo

![Interface de Diálogo](./doc/images/dialog-interface.png)

*Conversas em tempo real com NPCs impulsionados por IA*

### 👥 Personagens

![Personagens Únicos](./doc/images/characters-showcase.png)

*Cada NPC com personalidade, aparência e comportamento próprios*

---

## 🎭 Personagens da Vila

| Personagem | Papel | Personalidade |
|------------|-------|---------------|
| **Flora** 🧑 | Mentora | Sábia, calma, usa metáforas sobre natureza |
| **Rex** 🧑‍🔬 | Inventor | Excêntrico, engraçado, sempre com ideias malucas |
| **Luna** 🧙‍♀️ | Mistério | Enigmática, filosófica, ninguém sabe de onde veio |
| **Bento** 👨🍳 | Cozinheiro | Animado, caloroso, adora cozinhar |
| **Aria** 🧑‍🎨 | Artista | Sonhadora, sensível, toca piano |
| **Gael** 🧭 | Explorador | Aventureiro, conta histórias de viagens |

> Cada personagem é definido por um **system prompt** personalizado que guia seu comportamento, tom de voz, conhecimento e reações emocionais.

---

## 🏗️ Arquitetura Técnica

### Como Funciona o Sistema de IA

```mermaid
graph LR
    A[Jogador digita] --> B[Coleta de Contexto]
    B --> C[Construção do Prompt]
    C --> D[LLM GPT-4/Claude]
    D --> E[Processamento]
    E --> F[Resposta Personalizada]
    F --> G[UI com Animações]
```

### Pipeline Completo

1. **📊 Coleta de Contexto**
   - Identidade do NPC (personalidade, conhecimento, histórico)
   - Contexto ambiental (hora, localização, NPCs próximos)
   - Histórico da conversa atual

2. **📝 Construção do Prompt**
   - Template dinâmico com todas as variáveis
   - Instruções de comportamento e tom
   - Restrições de segurança e conteúdo

3. **🧠 Processamento pela IA**
   - Envio para LLM (GPT-4, Claude, ou similar)
   - Análise de emoção e intenção
   - Geração de resposta natural

4. **✨ Exibição na UI**
   - Animações de "pensando"
   - Feedback visual de carregamento
   - Transições suaves

### Stack Tecnológico

| Categoria | Tecnologias |
|-----------|-------------|
| **Frontend** | React 18+, TypeScript, Vite |
| **Estilização** | Tailwind CSS, Framer Motion |
| **Componentes** | shadcn/ui |
| **Roteamento** | React Router v6 |
| **Estado** | TanStack Query |
| **Testes** | Vitest, Playwright |
| **Linting** | ESLint, Prettier |

---

## 🎮 Como Jogar

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

### Gameplay

```mermaid
sequenceDiagram
    participant J as Jogador
    participant G como Jogo
    participant NPC as NPC
    participant AI as IA

    J->>G: Move-se com WASD
    G->>G: Detecta proximidade do NPC
    J->>G: Pressiona E
    G->>NPC: Abre painel de diálogo
    J->>G: Digita mensagem
    G->>AI: Envia contexto + mensagem
    AI-->>G: Resposta gerada
    G->>NPC: Exibe resposta com animação
```

1. **Explore** a vila movendo-se com **WASD**
2. **Aproxime-se** de um NPC (o nome aparecerá no HUD)
3. **Pressione E** para iniciar uma conversa
4. **Digite** sua mensagem e pressione **ENTER**
5. **Observe** a IA "pensar" (indicador de carregamento)
6. **Leia** a resposta única e contextualizada
7. **Continue** a conversa ou explore outros NPCs

---

## 🚀 Instalação e Execução

### Pré-requisitos

- **Node.js** ≥ 18.x
- **npm** ou **yarn**
- **Git**

### Configuração Rápida

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/pixel-paladins.git
cd pixel-paladins

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

### Acesse o Projeto

Abra seu navegador em: **`http://localhost:5173`**

---

## 📁 Estrutura do Projeto

```
pixel-paladins/
├── src/
│   ├── components/
│   │   ├── game/              # Lógica principal do jogo
│   │   │   ├── GameWorld.tsx       # Renderização do mundo
│   │   │   ├── GameHUD.tsx         # Interface do usuário
│   │   │   ├── PlayerSprite.tsx    # Personagem do jogador
│   │   │   ├── NPCSprite.tsx       # Renderização de NPCs
│   │   │   ├── PixelCharacter.tsx  # Estilização de personagens
│   │   │   ├── TileRenderer.tsx    # Tiles do mapa
│   │   │   ├── mapData.ts          # Dados do mapa e NPCs
│   │   │   ├── types.ts            # Definições TypeScript
│   │   │   └── useGameLoop.ts      # Game loop principal
│   │   └── ui/                 # Componentes shadcn/ui
│   ├── pages/                  # Páginas da aplicação
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utilitários e helpers
│   └── App.tsx                 # App principal
├── doc/                        # Documentação detalhada
│   ├── AI_SYSTEM.md           # Sistema de IA
│   ├── PROJECT_DOCUMENTATION.md # Docs completos
│   └── TECHNICAL_ARCHITECTURE.md # Arquitetura técnica
├── public/                     # Assets estáticos
└── test/                       # Testes automatizados
```

---

## 🎨 Screenshots

<div align="center">

| Exploração da Vila | Sistema de Diálogo | Personagens |
|--------------------|--------------------|-------------|
| ![Exploração](./doc/images/explore.png) | ![Diálogo](./doc/images/chat.png) | ![Personagens](./doc/images/npcs.png) |
| *Navegue livremente pelo mundo* | *Converse com NPCs em tempo real* | *Cada um com personalidade única* |

</div>

---

## 💡 Por Que Este Projeto?

### Objetivos de Pesquisa

1. **🤖 Integração de IA em Jogos**
   - Como LLMs podem criar NPCs mais realistas e envolventes?
   - Balanceamento entre qualidade da resposta e tempo de latência

2. **🏗️ Arquitetura de Software**
   - Padrões de design para aplicações complexas com IA
   - Separação de responsabilidades entre UI, lógica e IA

3. **🎭 Experiência do Usuário**
   - Interfaces naturais para interação com IA
   - Feedback visual durante processamento
   - Transições suaves entre estados

4. **⚡ Performance**
   - Otimização de chamadas à IA
   - Cache de respostas contextuais
   - Previsão de ações do jogador

---

## 📚 Documentação

- **[Documentação do Projeto](./doc/PROJECT_DOCUMENTATION.md)** — Visão geral completa
- **[Sistema de IA](./doc/AI_SYSTEM.md)** — Detalhes técnicos dos NPCs
- **[Arquitetura Técnica](./doc/TECHNICAL_ARCHITECTURE.md)** — Design de sistemas

---

## 🤝 Contribuindo

Este projeto é um experimento em desenvolvimento. Contribuições são bem-vindas!

### Como Contribuir

1. Fork o repositório
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto é licenciado sob a Licença MIT — veja o arquivo [LICENSE](LICENSE) para detalhes.

---

## 🙏 Agradecimentos

- **Comunidade shadcn/ui** — Componentes UI incríveis
- **React Team** — Framework que torna tudo possível
- **OpenAI / Anthropic** — Modelos de IA que tornam os NPCs possíveis

---

<div align="center">

**Feito com ❤️ e IA**

[GitHub](https://github.com/seu-usuario/pixel-paladins) • [Documentação](./doc/README.md) • [Issues](https://github.com/seu-usuario/pixel-paladins/issues)

</div>
