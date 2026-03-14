import { useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { TILE_SIZE } from './types';
import { NPCS, MAP_WIDTH, MAP_HEIGHT } from './mapData';
import TileRenderer from './TileRenderer';
import PlayerSprite from './PlayerSprite';
import NPCSprite from './NPCSprite';
import DialogPanel from './DialogPanel';
import GameHUD from './GameHUD';
import { useGameLoop } from './useGameLoop';

export default function GameWorld() {
  const {
    playerPos,
    playerDir,
    activeNPC,
    nearbyNPC,
    chatHistories,
    isThinking,
    sendMessage,
    closeDialog,
    tiles,
  } = useGameLoop();

  const activeNPCData = useMemo(
    () => NPCS.find(n => n.id === activeNPC),
    [activeNPC]
  );

  // Camera follows player
  const mapPxW = MAP_WIDTH * TILE_SIZE;
  const mapPxH = MAP_HEIGHT * TILE_SIZE;

  return (
    <div className="w-screen h-screen overflow-hidden bg-village-grass relative">
      <GameHUD />

      {/* Viewport with camera */}
      <motion.div
        className="absolute"
        animate={{
          x: -playerPos.x * TILE_SIZE + window.innerWidth / 2 - TILE_SIZE / 2,
          y: -playerPos.y * TILE_SIZE + window.innerHeight / 2 - TILE_SIZE / 2,
        }}
        transition={{ type: 'tween', duration: 0.15 }}
        style={{ width: mapPxW, height: mapPxH }}
      >
        {/* Focus blur when dialog active */}
        <div
          className={`transition-all duration-300 ${
            activeNPC ? 'saturate-50 blur-[2px]' : ''
          }`}
          style={{ width: mapPxW, height: mapPxH, position: 'relative' }}
        >
          <TileRenderer tiles={tiles} />

          {NPCS.map(npc => (
            <NPCSprite
              key={npc.id}
              npc={npc}
              isNearby={nearbyNPC?.id === npc.id}
              isActive={activeNPC === npc.id}
              isThinking={isThinking && activeNPC === npc.id}
              playerPos={playerPos}
            />
          ))}

          <PlayerSprite position={playerPos} direction={playerDir} />
        </div>
      </motion.div>

      {/* Dialog */}
      <AnimatePresence>
        {activeNPCData && (
          <DialogPanel
            npc={activeNPCData}
            messages={chatHistories[activeNPCData.id] || []}
            isThinking={isThinking}
            onSend={sendMessage}
            onClose={closeDialog}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
