import { motion } from 'framer-motion';
import { Position, TILE_SIZE } from './types';
import PixelCharacter, { CharacterLook } from './PixelCharacter';

const PLAYER_LOOK: CharacterLook = {
  hair: '#3B3024',
  skin: '#FDDCB5',
  shirt: '#3498db',
  pants: '#2c3e50',
  hairStyle: 'short',
};

interface Props {
  position: Position;
}

export default function PlayerSprite({ position }: Props) {
  return (
    <motion.div
      className="absolute z-20 flex flex-col items-center justify-center"
      animate={{
        left: position.x * TILE_SIZE,
        top: position.y * TILE_SIZE,
      }}
      transition={{ type: 'tween', duration: 0.12 }}
      style={{ width: TILE_SIZE, height: TILE_SIZE }}
    >
      <PixelCharacter look={PLAYER_LOOK} size={TILE_SIZE * 0.85} animate={false} />
    </motion.div>
  );
}
