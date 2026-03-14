import { motion } from 'framer-motion';
import { Position, Direction, TILE_SIZE } from './types';
import PixelCharacter from './PixelCharacter';

interface Props {
  position: Position;
  direction: Direction;
}

export default function PlayerSprite({ position, direction }: Props) {
  return (
    <motion.div
      className="absolute z-20"
      animate={{
        left: position.x * TILE_SIZE,
        top: position.y * TILE_SIZE,
      }}
      transition={{ type: 'tween', duration: 0.12 }}
      style={{ width: TILE_SIZE, height: TILE_SIZE }}
    >
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-full bg-black/25 blur-[1px]"
        style={{ width: TILE_SIZE * 0.45, height: 5, bottom: 1 }}
      />
      <motion.div
        className="flex items-end justify-center w-full h-full"
        animate={{ y: [0, -1.5, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <PixelCharacter spriteKey="player" direction={direction} size={TILE_SIZE * 0.7} />
      </motion.div>
    </motion.div>
  );
}
