# 📸 Instruções para Capturas de Tela

Este diretório contém as imagens do projeto Pixel Paladins. Siga os passos abaixo para adicionar capturas de tela reais:

## 🎯 Imagens Necessárias

### 1. **header-screenshot.png**
- **Onde:** `./doc/images/header-screenshot.png`
- **Descrição:** Captura da tela inicial do jogo mostrando a vila e o HUD
- **Tamanho recomendado:** 1200x600px
- **Momento ideal:** Tela principal com personagem visível

### 2. **village-overview.png**
- **Onde:** `./doc/images/village-overview.png`
- **Descrição:** Vista ampla da vila mostrando múltiplos NPCs e ambiente
- **Tamanho recomendado:** 800x600px
- **Momento ideal:** Posição elevada mostrando vários personagens

### 3. **dialog-interface.png**
- **Onde:** `./doc/images/dialog-interface.png`
- **Descrição:** Interface de diálogo aberta com NPC
- **Tamanho recomendado:** 800x500px
- **Momento ideal:** Durante uma conversa, mostrando mensagem e resposta

### 4. **characters-showcase.png**
- **Onde:** `./doc/images/characters-showcase.png`
- **Descrição:** Vários NPCs reunidos mostrando diversidade de personagens
- **Tamanho recomendado:** 1000x400px
- **Momento ideal:** Todos os NPCs visíveis na mesma tela

### 5. **explore.png**
- **Onde:** `./doc/images/explore.png`
- **Descrição:** Cena de exploração mostrando movimento e navegação
- **Tamanho recomendado:** 800x600px
- **Momento ideal:** Personagem em movimento pela vila

### 6. **chat.png**
- **Onde:** `./doc/images/chat.png`
- **Descrição:** Detalhe do sistema de chat com mensagens
- **Tamanho recomendado:** 800x500px
- **Momento ideal:** Conversa com múltiplas mensagens visíveis

### 7. **npcs.png**
- **Onde:** `./doc/images/npcs.png`
- **Descrição:** Close-up dos NPCs mostrando detalhes de design
- **Tamanho recomendado:** 1000x400px
- **Momento ideal:** NPCs parados, bem visíveis

## 📸 Como Capturar

### Método 1: Ferramenta Nativa do Windows
1. Abra o jogo no navegador
2. Pressione `Windows + Shift + S`
3. Selecione a área desejada
4. Cole em um editor de imagem e salve

### Método 2: Ferramenta de Captura
1. Abra a "Ferramenta de Captura" (Search no menu Iniciar)
2. Clique em "Novo"
3. Selecione a área da tela
4. Salve como PNG

### Método 3: Extensão do Browser
- Use extensões como "Lightshot" ou "Nimbus Screenshot"

## 🎨 Otimização de Imagens

Após capturar, otimize as imagens:

```bash
# Instale imagemoptim (se necessário)
npm install -g imageoptim-cli

# Otimize as imagens
imageoptim ./doc/images/*.png
```

Ou use ferramentas online:
- [TinyPNG](https://tinypng.com/)
- [Squoosh](https://squoosh.app/)

## ✅ Checklist

- [ ] Todas as 7 imagens foram capturadas
- [ ] Imagens estão em formato PNG
- [ ] Imagens foram otimizadas (tamanho < 500KB cada)
- [ ] Imagens têm resolução adequada (mínimo 800px de largura)
- [ ] Imagens mostram o projeto de forma clara e atraente

## 🔄 Atualização

Se o projeto mudar significativamente, atualize as imagens:
1. Capture novas screenshots
2. Substitua os arquivos antigos
3. Verifique se os links no README.md ainda funcionam

---

**Nota:** As imagens são essenciais para atrair usuários e mostrar o projeto. Invista tempo em capturas de qualidade!
