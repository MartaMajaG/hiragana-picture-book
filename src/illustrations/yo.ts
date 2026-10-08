// よ (yo) illustration: a yo-yo doing a loop trick. Yo as in yo-yo.
// The short first stroke is the arm reaching in, and the long second stroke is the string: it drops from the hand,
// swings round in a loop-the-loop and ends at the yo-yo. Parts are layered back to front and bloom in one by one.
import type { Draw } from './types';

const RED = '#E0473C', RED_SHADE = '#B8342C', STRING = '#7A6A5E', SKIN = '#F2C9A5', SKIN_SHADE = '#DDA880',
  SLEEVE = '#5D8FC9', SLEEVE_SHADE = '#4674AA';

const draw: Draw = S => [
  // the string: down from the hand, round the loop, out to the yo-yo
  `<path d="${S[1]}" fill="none" stroke="${STRING}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>`,
  // arm reaching in from the right, along the first stroke
  `<path d="M63,30.4 C72,28.6 84,26.4 111,25.4 L111,34.6 C86,35 74,37 64.6,39.2Z" fill="${SLEEVE}"/>` +
    `<path d="M65.6,36.4 C74,34.6 86,32.6 111,32 L111,34.6 C86,35 74,37 64.6,39.2Z" fill="${SLEEVE_SHADE}"/>` +
    `<path d="M60,31 L65,30.2 L66.4,38.8 L61.4,39.6Z" fill="${SLEEVE_SHADE}"/>`,
  // hand closed round the string
  `<path d="M50.5,27 C50.5,22.4 54,20.2 58,20.2 C63,20.2 66.5,23.5 66.5,29 C66.5,35 63,39.6 58,39.6 C53.6,39.6 50.5,36.5 50.5,32Z" fill="${SKIN}"/>` +
    `<path d="M64.2,24 C66.2,27 66.8,31 65.8,34.5 C64.6,37.6 61.6,39.6 58,39.6 C62.4,36.4 64.8,30.6 64.2,24Z" fill="${SKIN_SHADE}"/>` +
    `<path d="M51,27.6 C53,27.8 54.8,27.6 56,27 M51,32 C53,32.2 54.8,32 56,31.4 M52,36.2 C53.8,36.4 55.2,36 56.2,35.4" fill="none" stroke="${SKIN_SHADE}" stroke-width="1" stroke-linecap="round"/>` +
    `<path d="M54,23.2 C55.6,21.8 57.8,21.4 59.8,22" fill="none" stroke="#FFF4EE" stroke-width="1.1" stroke-linecap="round"/>`,
  // the yo-yo at the end of the string
  `<circle cx="80.5" cy="93.5" r="10" fill="${RED}"/>` +
    `<path d="M88,87 C91.5,92 90.6,99.6 85.4,102.4 C81.4,104.6 76.6,104 73.6,101.6 C79.6,102.4 87.8,98 88,87Z" fill="${RED_SHADE}"/>` +
    `<circle cx="80.5" cy="93.5" r="5.6" fill="none" stroke="${RED_SHADE}" stroke-width="1.2"/>` +
    `<circle cx="80.5" cy="93.5" r="1.9" fill="#F2E3D2"/>`,
  // highlight
  `<path d="M73.4,91.6 C73.8,88.4 75.8,86 78.8,85" fill="none" stroke="#FFF4EE" stroke-width="1.4" stroke-linecap="round"/>`,
];

export default draw;
