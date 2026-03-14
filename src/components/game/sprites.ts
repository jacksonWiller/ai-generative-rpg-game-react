export interface CharacterSprite {
  pixels: string[];
  palette: Record<string, string>;
}

// Each character is an 8x12 pixel grid
// '.' = transparent, other chars = palette color keys
export const SPRITES: Record<string, CharacterSprite> = {
  player: {
    pixels: [
      '..hhhh..',
      '.hhhhhh.',
      '.hssssh.',
      '..sees..',
      '..ssss..',
      '...ss...',
      '..cccc..',
      '.cccccc.',
      '.csccsc.',
      '..caac..',
      '..p..p..',
      '.bb..bb.',
    ],
    palette: {
      h: '#5B3A1E', s: '#F0C090', e: '#2B4570',
      c: '#3B6BB5', a: '#C8A830', p: '#4A3726', b: '#3A2515',
    },
  },

  flora: {
    pixels: [
      '...hh...',
      '..hhhh..',
      '.hssssh.',
      '..sees..',
      '..ssss..',
      '...ss...',
      '..cccc..',
      '.caacac.',
      '.caacac.',
      '..cccc..',
      '..cccc..',
      '.bb..bb.',
    ],
    palette: {
      h: '#B0B0B0', s: '#F0C090', e: '#3A7B2A',
      c: '#4A8B4A', a: '#E8DCC8', b: '#6B4E35',
    },
  },

  rex: {
    pixels: [
      '.hh..hh.',
      '.hggggh.',
      '.hssssh.',
      '..sees..',
      '..ssss..',
      '...ss...',
      '..cccc..',
      '.cccccc.',
      '.csccsc.',
      '..cccc..',
      '..p..p..',
      '.bb..bb.',
    ],
    palette: {
      h: '#D4721E', s: '#F0C090', e: '#2B5580',
      c: '#E8E0D0', g: '#B8860B', p: '#5A4A3A', b: '#3A2515',
    },
  },

  luna: {
    pixels: [
      '..cccc..',
      '.cccccc.',
      '.cssssc.',
      '..sees..',
      '..ssss..',
      '..cccc..',
      '.cccccc.',
      'cccccccc',
      '.ccaacc.',
      '..cccc..',
      '..c..c..',
      '.bb..bb.',
    ],
    palette: {
      c: '#6B2D8B', s: '#E8C8A8', e: '#9B59B6',
      a: '#E040A0', b: '#2A1530',
    },
  },

  bento: {
    pixels: [
      '.wwwwww.',
      '.wwwwww.',
      '.hssssh.',
      '..sees..',
      '..ssss..',
      '...ss...',
      '..wwww..',
      '.wccccw.',
      '.wsccws.',
      '..wwww..',
      '..p..p..',
      '.bb..bb.',
    ],
    palette: {
      w: '#F5F5F0', h: '#6B4E35', s: '#D4A574',
      e: '#4A3520', c: '#E8A040', p: '#4A3520', b: '#3A2515',
    },
  },

  aria: {
    pixels: [
      '....aa..',
      '..aahh..',
      '.hhhhhh.',
      '.hssssh.',
      '..sees..',
      '..ssss..',
      '..cccc..',
      '.cccccc.',
      '.csccsc.',
      '..pppp..',
      '..pppp..',
      '.bb..bb.',
    ],
    palette: {
      a: '#D45088', h: '#FFB347', s: '#F0C090',
      e: '#D45088', c: '#E85080', p: '#5B3A8B', b: '#6B4E35',
    },
  },

  gael: {
    pixels: [
      '.aaaaaa.',
      '..aaaa..',
      '.hssssh.',
      '..sees..',
      '..ssss..',
      '...ss...',
      '.dccccd.',
      '.dccccd.',
      '.dsccsd.',
      '..cccc..',
      '..p..p..',
      '.bb..bb.',
    ],
    palette: {
      a: '#8B6635', h: '#445533', s: '#C8A070',
      e: '#3A5530', c: '#6B8B5B', d: '#B84030',
      p: '#5A4A3A', b: '#3A2515',
    },
  },
};
