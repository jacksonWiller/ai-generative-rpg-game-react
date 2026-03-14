import { useState, useEffect, useCallback, useRef } from 'react';
import { Position, SOLID_TILES, ChatMessage } from './types';
import { getMapTiles, NPCS, MAP_WIDTH, MAP_HEIGHT } from './mapData';

const tiles = getMapTiles();

function isSolid(x: number, y: number): boolean {
  if (x < 0 || y < 0 || x >= MAP_WIDTH || y >= MAP_HEIGHT) return true;
  return SOLID_TILES.includes(tiles[y][x]);
}

function isNPCAt(x: number, y: number, activeNpcId?: string): boolean {
  return NPCS.some(n => n.position.x === x && n.position.y === y);
}

function distance(a: Position, b: Position): number {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

export function useGameLoop() {
  const [playerPos, setPlayerPos] = useState<Position>({ x: 13, y: 12 });
  const [activeNPC, setActiveNPC] = useState<string | null>(null);
  const [chatHistories, setChatHistories] = useState<Record<string, ChatMessage[]>>({});
  const [isThinking, setIsThinking] = useState(false);
  const playerPosRef = useRef(playerPos);
  playerPosRef.current = playerPos;

  const nearbyNPC = NPCS.find(n => distance(playerPosRef.current, n.position) <= 2);

  const move = useCallback((dx: number, dy: number) => {
    if (activeNPC) return;
    setPlayerPos(prev => {
      const nx = prev.x + dx;
      const ny = prev.y + dy;
      if (isSolid(nx, ny) || isNPCAt(nx, ny)) return prev;
      return { x: nx, y: ny };
    });
  }, [activeNPC]);

  const interact = useCallback(() => {
    if (activeNPC) return;
    const npc = NPCS.find(n => distance(playerPosRef.current, n.position) <= 2);
    if (npc) setActiveNPC(npc.id);
  }, [activeNPC]);

  const closeDialog = useCallback(() => {
    setActiveNPC(null);
  }, []);

  const sendMessage = useCallback(async (message: string) => {
    if (!activeNPC) return;
    const npc = NPCS.find(n => n.id === activeNPC);
    if (!npc) return;

    const prev = chatHistories[activeNPC] || [];
    const userMsg: ChatMessage = { role: 'user', content: message };
    const updated = [...prev, userMsg];
    setChatHistories(h => ({ ...h, [activeNPC]: updated }));

    setIsThinking(true);

    // Simulated AI response (will be replaced with real AI)
    await new Promise(r => setTimeout(r, 800 + Math.random() * 1200));

    const responses = [
      npc.greeting,
      'Hmm, que interessante... Me conta mais sobre isso.',
      'Sabe, eu estava pensando exatamente nisso hoje cedo.',
      'Cada dia na vila traz uma nova surpresa, não é?',
      'Isso me lembra de uma história antiga...',
      'Você tem um jeito especial de ver as coisas.',
    ];
    const aiMsg: ChatMessage = {
      role: 'assistant',
      content: responses[Math.floor(Math.random() * responses.length)],
    };

    setChatHistories(h => ({
      ...h,
      [activeNPC]: [...(h[activeNPC] || []), userMsg, aiMsg],
    }));
    // Fix: we already added userMsg above, just add aiMsg
    setChatHistories(h => {
      const current = h[activeNPC] || [];
      // Avoid duplicates - only add aiMsg to the list that already has userMsg
      if (current[current.length - 1]?.role === 'user') {
        return { ...h, [activeNPC]: [...current, aiMsg] };
      }
      return h;
    });
    setIsThinking(false);
  }, [activeNPC, chatHistories]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (activeNPC) return; // dialog handles its own keys
      switch (e.key.toLowerCase()) {
        case 'w': case 'arrowup': move(0, -1); break;
        case 's': case 'arrowdown': move(0, 1); break;
        case 'a': case 'arrowleft': move(-1, 0); break;
        case 'd': case 'arrowright': move(1, 0); break;
        case 'e': interact(); break;
      }
    };
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
    tiles,
  };
}
