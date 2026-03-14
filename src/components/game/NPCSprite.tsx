import { motion, AnimatePresence } from 'framer-motion';
import { NPCData, TILE_SIZE } from './types';
import PixelCharacter from './PixelCharacter';

interface Props {
  npc: NPCData;
  isNearby: boolean;
  isActive: boolean;
  isThinking: boolean;
}

export default function NPCSprite({ npc, isNearby, isActive, isThinking }: Props) {
  return (
    <div
      className="absolute z-10"
      style={{
        left: npc.position.x * TILE_SIZE,
        top: npc.position.y * TILE_SIZE,
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

      {/* NPC sprite */}
      <motion.div
        className="flex items-center justify-center"
        style={{ width: TILE_SIZE, height: TILE_SIZE }}
        animate={isActive ? { scale: 1.15, y: -4 } : {}}
      >
        <PixelCharacter look={npc.look} size={TILE_SIZE * 0.85} animate={!isActive} />
      </motion.div>
    </div>
  );
}
