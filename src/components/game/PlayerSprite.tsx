import { motion } from 'framer-motion';
import { Position, TILE_SIZE } from './types';

interface Props {
  position: Position;
}

export default function PlayerSprite({ position }: Props) {
  return (
    <motion.div
      className="absolute z-20 flex flex-col items-center"
      animate={{
        left: position.x * TILE_SIZE,
        top: position.y * TILE_SIZE,
      }}
      transition={{ type: 'tween', duration: 0.12 }}
      style={{ width: TILE_SIZE, height: TILE_SIZE }}
    >
      <div
        className="flex items-center justify-center image-rendering-pixelated"
        style={{ fontSize: TILE_SIZE * 0.7 }}
      >
        🧑
      </div>
    </motion.div>
  );
}
