import { motion } from 'framer-motion';

export interface CharacterLook {
  hair: string;
  skin: string;
  shirt: string;
  pants: string;
  hairStyle: 'short' | 'long' | 'spiky' | 'bald' | 'hat' | 'hood';
  accessory?: 'glasses' | 'earring' | 'scarf' | 'beard';
}

interface Props {
  look: CharacterLook;
  size?: number;
  animate?: boolean;
  direction?: 'down' | 'up' | 'left' | 'right';
}

const PX = (size: number, n: number) => Math.round(size * n);

export default function PixelCharacter({ look, size = 40, animate = true, direction = 'down' }: Props) {
  const p = (n: number) => PX(size, n);
  const unit = size / 16; // base unit

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      className="image-rendering-pixelated"
      style={{ imageRendering: 'pixelated' }}
      animate={animate ? { y: [0, -1, 0] } : {}}
      transition={animate ? { duration: 1.5, repeat: Infinity, ease: 'easeInOut' } : {}}
    >
      {/* Shadow */}
      <ellipse cx="8" cy="15" rx="4" ry="1" fill="rgba(0,0,0,0.15)" />

      {/* Hair back (for long hair) */}
      {look.hairStyle === 'long' && (
        <rect x="5" y="2" width="6" height="8" rx="0" fill={look.hair} />
      )}
      {look.hairStyle === 'hood' && (
        <rect x="4" y="1" width="8" height="9" rx="1" fill={look.hair} />
      )}

      {/* Body / Shirt */}
      <rect x="5" y="8" width="6" height="4" fill={look.shirt} />
      {/* Shirt detail */}
      <rect x="7" y="8" width="2" height="3" fill={darken(look.shirt, 20)} />

      {/* Arms */}
      <rect x="3" y="8" width="2" height="3" fill={look.shirt} />
      <rect x="11" y="8" width="2" height="3" fill={look.shirt} />
      {/* Hands */}
      <rect x="3" y="11" width="2" height="1" fill={look.skin} />
      <rect x="11" y="11" width="2" height="1" fill={look.skin} />

      {/* Pants / Legs */}
      <rect x="5" y="12" width="3" height="2" fill={look.pants} />
      <rect x="8" y="12" width="3" height="2" fill={look.pants} />
      {/* Shoes */}
      <rect x="4" y="14" width="3" height="1" fill={darken(look.pants, 40)} />
      <rect x="9" y="14" width="3" height="1" fill={darken(look.pants, 40)} />

      {/* Head */}
      <rect x="5" y="2" width="6" height="6" fill={look.skin} />

      {/* Eyes */}
      {direction === 'down' && (
        <>
          <rect x="6" y="5" width="1" height="1" fill="#222" />
          <rect x="9" y="5" width="1" height="1" fill="#222" />
          {/* Mouth */}
          <rect x="7" y="7" width="2" height="0.5" rx="0.25" fill={darken(look.skin, 30)} />
        </>
      )}
      {direction === 'up' && (
        <>
          {/* Back of head, no face */}
          <rect x="5" y="2" width="6" height="6" fill={look.skin} />
        </>
      )}
      {direction === 'left' && (
        <>
          <rect x="5" y="5" width="1" height="1" fill="#222" />
          <rect x="5" y="7" width="1.5" height="0.5" rx="0.25" fill={darken(look.skin, 30)} />
        </>
      )}
      {direction === 'right' && (
        <>
          <rect x="10" y="5" width="1" height="1" fill="#222" />
          <rect x="9.5" y="7" width="1.5" height="0.5" rx="0.25" fill={darken(look.skin, 30)} />
        </>
      )}

      {/* Hair */}
      {look.hairStyle === 'short' && (
        <>
          <rect x="5" y="1" width="6" height="2" fill={look.hair} />
          <rect x="4" y="2" width="1" height="2" fill={look.hair} />
          <rect x="11" y="2" width="1" height="2" fill={look.hair} />
        </>
      )}
      {look.hairStyle === 'long' && (
        <>
          <rect x="4" y="1" width="8" height="2" fill={look.hair} />
          <rect x="4" y="2" width="1" height="6" fill={look.hair} />
          <rect x="11" y="2" width="1" height="6" fill={look.hair} />
        </>
      )}
      {look.hairStyle === 'spiky' && (
        <>
          <rect x="5" y="1" width="6" height="2" fill={look.hair} />
          <rect x="5" y="0" width="2" height="1" fill={look.hair} />
          <rect x="8" y="0" width="2" height="1" fill={look.hair} />
          <rect x="11" y="1" width="1" height="2" fill={look.hair} />
        </>
      )}
      {look.hairStyle === 'hat' && (
        <>
          <rect x="3" y="1" width="10" height="1" fill={look.hair} />
          <rect x="5" y="0" width="6" height="2" fill={look.hair} />
          <rect x="5" y="2" width="6" height="1" fill={darken(look.hair, 15)} />
        </>
      )}
      {look.hairStyle === 'hood' && (
        <>
          <rect x="4" y="0" width="8" height="3" fill={look.hair} />
          <rect x="4" y="2" width="1" height="4" fill={look.hair} />
          <rect x="11" y="2" width="1" height="4" fill={look.hair} />
        </>
      )}
      {look.hairStyle === 'bald' && null}

      {/* Accessories */}
      {look.accessory === 'glasses' && (
        <>
          <rect x="5.5" y="4.5" width="2" height="1.5" rx="0.3" fill="none" stroke="#444" strokeWidth="0.4" />
          <rect x="8.5" y="4.5" width="2" height="1.5" rx="0.3" fill="none" stroke="#444" strokeWidth="0.4" />
          <line x1="7.5" y1="5" x2="8.5" y2="5" stroke="#444" strokeWidth="0.3" />
        </>
      )}
      {look.accessory === 'scarf' && (
        <rect x="5" y="7.5" width="6" height="1.5" rx="0.3" fill="#e74c3c" />
      )}
      {look.accessory === 'beard' && (
        <>
          <rect x="5" y="7" width="6" height="2" fill={darken(look.hair, 10)} />
          <rect x="6" y="9" width="4" height="1" fill={darken(look.hair, 10)} />
        </>
      )}
      {look.accessory === 'earring' && (
        <circle cx="4.5" cy="5.5" r="0.5" fill="#ffd700" />
      )}
    </motion.svg>
  );
}

function darken(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, (num >> 16) - amount);
  const g = Math.max(0, ((num >> 8) & 0xff) - amount);
  const b = Math.max(0, (num & 0xff) - amount);
  return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
}
