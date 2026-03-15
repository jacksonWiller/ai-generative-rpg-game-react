import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NPCData, Position, TILE_SIZE } from './types';
import PixelCharacter from './PixelCharacter';

interface Props {
  npc: NPCData;
  currentPos: Position;
  isNearby: boolean;
  isActive: boolean;
  isThinking: boolean;
  playerPos: Position;
}

export default function NPCSprite({ npc, currentPos, isNearby, isActive, isThinking, playerPos }: Props) {
  const facing = useMemo<'left' | 'right'>(() => {
    if (isNearby || isActive) {
      return playerPos.x < currentPos.x ? 'left' : 'right';
    }
    return 'right';
  }, [isNearby, isActive, playerPos.x, currentPos.x]);

  const animDelay = useMemo(() => {
    let hash = 0;
    for (const ch of npc.id) hash = ((hash << 5) - hash) + ch.charCodeAt(0);
    return (Math.abs(hash) % 1000) / 500;
  }, [npc.id]);

  return (
    <motion.div
      className="absolute z-10"
      animate={{
        left: currentPos.x * TILE_SIZE,
        top: currentPos.y * TILE_SIZE,
      }}
      transition={{ type: 'tween', duration: 0.2 }}
      style={{
        width: TILE_SIZE,
        height: TILE_SIZE,
      }}
    >
      {/* Name bubble */}
      <AnimatePresence>
        {(isNearby || isActive) && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 whitespace-nowrap"
          >
            <div className="bg-bubble pixel-border px-2 py-0.5 flex items-center gap-1.5">
              <span className="font-pixel text-sm text-foreground tracking-wider uppercase">
                {npc.name}
              </span>
              {isThinking ? (
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
              ) : (
                <span className="text-xs">💬</span>
              )}
            </div>
            {/* Bubble pointer */}
            <div className="w-2 h-2 bg-bubble border-r-2 border-b-2 border-bubble-border rotate-45 mx-auto -mt-1" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interaction hint */}
      <AnimatePresence>
        {isNearby && !isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap"
          >
            <span className="font-pixel text-xs text-primary animate-pulse-soft">
              [E]
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NPC shadow */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-full bg-black/20 blur-[1px]"
        style={{ width: TILE_SIZE * 0.45, height: 5, bottom: 1 }}
      />

      {/* NPC sprite */}
      <motion.div
        className="flex items-end justify-center w-full h-full"
        animate={
          isActive
            ? { y: -3, scale: 1.05 }
            : { y: [0, -1.5, 0] }
        }
        transition={
          isActive
            ? { type: 'spring', stiffness: 300, damping: 20 }
            : { duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: animDelay }
        }
        style={npc.id === 'luna' ? { filter: 'drop-shadow(0 0 4px rgba(155, 89, 182, 0.4))' } : undefined}
      >
        <PixelCharacter spriteKey={npc.id} direction={facing} size={TILE_SIZE * 0.7} />
      </motion.div>
    </motion.div>
  );
}
