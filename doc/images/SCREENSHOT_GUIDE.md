# 📸 Instruções para Captura de Screenshots

Este documento ajuda você a capturar e adicionar as imagens reais do projeto ao README.md.

## 🎯 Imagens Necessárias

### 1. **header-screenshot.png** (1200x630px recomendado)
- **Onde:** Captura da tela inicial do jogo
- **O que mostrar:** A vila pixelada com o jogador explorando
- **Dica:** Use uma captura ampla que mostre o ambiente geral

### 2. **village-overview.png** (800x600px)
- **Onde:** Vista panorâmica da vila
- **O que mostrar:** Múltiplos NPCs e construções
- **Dica:** Capture de uma posição elevada se possível

### 3. **dialog-interface.png** (800x600px)
- **Onde:** Durante uma conversa com NPC
- **O que mostrar:** O painel de diálogo aberto com mensagem
- **Dica:** Capture uma conversa interessante ou engraçada

### 4. **characters-showcase.png** (800x600px)
- **Onde:** Com múltiplos NPCs na tela
- **O que mostrar:** Diferentes personagens com suas aparências únicas
- **Dica:** Posicione o jogador perto de vários NPCs

### 5. **gameplay.png** (800x600px)
- **Onde:** Durante a exploração
- **O que mostrar:** Ação de interação ou movimento
- **Dica:** Capture um momento dinâmico do jogo

## 📋 Como Capturar

### Método 1: Ferramenta de Captura do Windows
1. Pressione `Win + Shift + S`
2. Selecione a área da tela
3. Cole em um editor de imagem
4. Ajuste o tamanho e salve

### Método 2: Ferramenta de Captura e Anotação
1. Abra "Captura e Anotação" (Win + Shift + S)
2. Mode "Retangular" ou "Janela"
3. Salve na pasta `doc/images/`

### Método 3: Extensão do VS Code
1. Instale "Screenshot" extension
2. Pressione `F1` → "Screenshot"
3. Capture e salve automaticamente

## 🎨 Formatos Recomendados

- **Formato:** PNG (para melhor qualidade)
- **Tamanho:** Máximo 2MB por imagem
- **Dimensões:** 
  - Header: 1200x630px
  - Demais: 800x600px ou 1200x800px

## 📁 Onde Salvar

Todas as imagens devem ser salvas em:
```
doc/images/
├── header-screenshot.png
├── village-overview.png
├── dialog-interface.png
├── characters-showcase.png
├── gameplay.png
└── explore.png (opcional)
└── chat.png (opcional)
└── npcs.png (opcional)
```

## ✅ Checklist

- [ ] Todas as imagens estão na pasta `doc/images/`
- [ ] Imagens têm tamanho razoável (< 2MB cada)
- [ ] Imagens estão em formato PNG ou JPG
- [ ] Imagens mostram o jogo de forma clara
- [ ] Imagens têm boa qualidade e iluminação
- [ ] Nomes dos arquivos correspondem ao README.md

## 🔧 Otimização de Imagens

Se as imagens estiverem muito grandes, use:

### Ferramenta Online
- [TinyPNG](https://tinypng.com/) - Compressão inteligente
- [Squoosh](https://squoosh.app/) - Controle manual

### Comando PowerShell
```powershell
# Instalar Module (apenas uma vez)
Install-Module -Name ImagemResizer -Scope CurrentUser

# Redimensionar imagens
Resize-Image -Path "doc/images\*.png" -Width 1200
```

## 🎯 Dicas para Boas Capturas

1. **Iluminação:** Jogue durante o dia no jogo para melhor visibilidade
2. **Posição:** Posicione o jogador para mostrar o máximo possível
3. **Momento:** Capture durante interações interessantes
4. **Limpeza:** Remova elementos desnecessários da tela
5. **Consistência:** Mantenha estilo visual similar entre imagens

## 🚀 Próximos Passos

Depois de adicionar as imagens:
1. Teste o README.md localmente
2. Verifique se todas as imagens carregam
3. Commit as imagens no Git
4. Atualize o README.md se necessário

---

**Dica:** Se não tiver como capturar todas as imagens agora, pode usar placeholders temporários e substituir depois!
