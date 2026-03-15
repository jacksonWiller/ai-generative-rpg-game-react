import { useState, useEffect, useCallback, useRef } from 'react';
import { Position, Direction, SOLID_TILES, ChatMessage, NPCAction } from './types';
import { getMapTiles, NPCS, MAP_WIDTH, MAP_HEIGHT } from './mapData';
import { sendNPCMessage, parseNPCActions } from './chatService';

const tiles = getMapTiles();

function isSolid(x: number, y: number): boolean {
  if (x < 0 || y < 0 || x >= MAP_WIDTH || y >= MAP_HEIGHT) return true;
  return SOLID_TILES.includes(tiles[y][x]);
}

function isNPCAt(x: number, y: number, npcPositions: Record<string, Position>, excludeId?: string): boolean {
  return NPCS.some(n => {
    if (n.id === excludeId) return false;
    const pos = npcPositions[n.id] || n.position;
    return pos.x === x && pos.y === y;
  });
}

function distance(a: Position, b: Position): number {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function directionToDelta(dir: string): { dx: number; dy: number } {
  switch (dir) {
    case 'cima': return { dx: 0, dy: -1 };
    case 'baixo': return { dx: 0, dy: 1 };
    case 'esquerda': return { dx: -1, dy: 0 };
    case 'direita': return { dx: 1, dy: 0 };
    default: return { dx: 0, dy: 0 };
  }
}

export function useGameLoop() {
  const [playerPos, setPlayerPos] = useState<Position>({ x: 13, y: 12 });
  const [playerDir, setPlayerDir] = useState<Direction>('right');
  const [activeNPC, setActiveNPC] = useState<string | null>(null);
  const [chatHistories, setChatHistories] = useState<Record<string, ChatMessage[]>>({});
  const [isThinking, setIsThinking] = useState(false);
  const [npcPositions, setNpcPositions] = useState<Record<string, Position>>(() => {
    const positions: Record<string, Position> = {};
    for (const npc of NPCS) {
      positions[npc.id] = { ...npc.position };
    }
    return positions;
  });
  const playerPosRef = useRef(playerPos);
  playerPosRef.current = playerPos;
  const npcPositionsRef = useRef(npcPositions);
  npcPositionsRef.current = npcPositions;

  const getNpcPos = useCallback((id: string) => npcPositionsRef.current[id] || NPCS.find(n => n.id === id)?.position || { x: 0, y: 0 }, []);

  const nearbyNPC = NPCS.find(n => distance(playerPosRef.current, getNpcPos(n.id)) <= 2);

  const move = useCallback((dx: number, dy: number) => {
    if (activeNPC) return;
    setPlayerPos(prev => {
      const nx = prev.x + dx;
      const ny = prev.y + dy;
      if (isSolid(nx, ny) || isNPCAt(nx, ny, npcPositionsRef.current)) return prev;
      return { x: nx, y: ny };
    });
    if (dx < 0) setPlayerDir('left');
    else if (dx > 0) setPlayerDir('right');
  }, [activeNPC]);

  const executeNpcActions = useCallback(async (npcId: string, actions: NPCAction[]) => {
    for (const action of actions) {
      if (action.type === 'move') {
        const { dx, dy } = directionToDelta(action.direction);
        for (let step = 0; step < action.steps; step++) {
          await new Promise(resolve => setTimeout(resolve, 250));
          setNpcPositions(prev => {
            const current = prev[npcId];
            if (!current) return prev;
            const nx = current.x + dx;
            const ny = current.y + dy;
            if (isSolid(nx, ny)) return prev;
            if (playerPosRef.current.x === nx && playerPosRef.current.y === ny) return prev;
            if (isNPCAt(nx, ny, prev, npcId)) return prev;
            return { ...prev, [npcId]: { x: nx, y: ny } };
          });
        }
      }
    }
  }, []);

  const interact = useCallback(() => {
    if (activeNPC) return;
    const npc = NPCS.find(n => distance(playerPosRef.current, getNpcPos(n.id)) <= 2);
    if (npc) setActiveNPC(npc.id);
  }, [activeNPC, getNpcPos]);

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

    try {
      const aiContent = await sendNPCMessage(npc, prev, message);
      const { cleanText, actions } = parseNPCActions(aiContent);
      const aiMsg: ChatMessage = { role: 'assistant', content: cleanText };

      setChatHistories(h => ({
        ...h,
        [activeNPC]: [...(h[activeNPC] || []), aiMsg],
      }));

      if (actions.length > 0) {
        executeNpcActions(activeNPC, actions);
      }
    } catch (err) {
      console.error('AI response error:', err);
      const fallbackMsg: ChatMessage = {
        role: 'assistant',
        content: npc.greeting,
      };
      setChatHistories(h => ({
        ...h,
        [activeNPC]: [...(h[activeNPC] || []), fallbackMsg],
      }));
    }

    setIsThinking(false);
  }, [activeNPC, chatHistories, executeNpcActions]);

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
    playerDir,
    activeNPC,
    nearbyNPC,
    chatHistories,
    isThinking,
    npcPositions,
    sendMessage,
    closeDialog,
    tiles,
  };
}
