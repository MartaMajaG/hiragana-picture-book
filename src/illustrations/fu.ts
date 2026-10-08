// ふ (fu) illustration: Mount Fuji with its snowy cap. Fu as in Fuji.
// The little hook at the top is the snowy summit, the long middle stroke is a trail winding down the mountain,
// and the two side strokes are puffs of cloud hugging its left and right slopes. Parts are layered back to front and bloom in one by one.
import type { Draw } from './types';
import { shadow } from './helpers';

const ROCK = '#6F8FB8', ROCK_SHADE = '#56769F', SNOW = '#F7F5F0', SNOW_SHADE = '#D5DDE9', TRAIL = '#A9BEDA', CLOUD = '#FFFFFF', CLOUD_SHADE = '#E1E6EE';

const cloud = (x: number, y: number, s: number) =>
  `<g transform="translate(${x} ${y}) scale(${s})">` +
  `<path d="M-11,3 C-14,3 -14,-2 -10.5,-2 C-10,-6 -5,-7 -3,-4 C-1.5,-9 5.5,-9 6.5,-3.5 C9,-5.5 13,-3 11.5,0 C14,0.5 13.5,3 11,3Z" fill="${CLOUD}"/>` +
  `<path d="M-11,3 C-6,1.6 6,1.6 11,3Z M6.5,-3.5 C9,-5.5 13,-3 11.5,0 C11,-2 9,-3 6.5,-3.5Z" fill="${CLOUD_SHADE}"/></g>`;

const draw: Draw = () => [
  shadow(55, 98, 50),
  // the mountain, with its gently flaring slopes, shaded on the right
  `<path d="M41,17 C45,15.4 55,15.4 60,17 C68,40 82,72 106,97 C107,98.2 106,98.6 105,98.6 L5,98.6 C4,98.6 3,98.2 4,97 C24,72 34,40 41,17Z" fill="${ROCK}"/>` +
    `<path d="M60,17 C68,40 82,72 106,97 C107,98.2 106,98.6 105,98.6 L78,98.6 C74,70 66,40 60,17Z" fill="${ROCK_SHADE}"/>`,
  // the snowy cap with a jagged hem (the top hook sits on the summit)
  `<path d="M41,17 C45,15.4 55,15.4 60,17 C62.5,24.5 65.5,32 68.6,39 L64,36 L61.5,41 L57.5,34.5 L53.5,40.5 L50,34 L45.5,39.5 L42,35 L38,40 L33.8,37.6 C36.5,31 39,24 41,17Z" fill="${SNOW}"/>` +
    `<path d="M60,17 C62.5,24.5 65.5,32 68.6,39 L64,36 L61.5,41 L60,38.6 C60.6,31 60.6,24 60,17Z" fill="${SNOW_SHADE}"/>`,
  // a trail winding down the middle stroke
  `<path d="M43.6,46.9 C45.5,51.5 51.1,56.3 57.9,64.4 C68.5,77.1 58.4,94.4 38.8,86" fill="none" stroke="${TRAIL}" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="4 3"/>`,
  // puffs of cloud hugging the two slopes
  cloud(25.5, 81.5, 1.25) + cloud(86.5, 75, 1.2),
  // highlights down the sunny left slope
  `<path d="M40.5,23 C39,28.5 37.6,32 36.2,35.6" fill="none" stroke="#fff" stroke-width="1.4" stroke-linecap="round"/>` +
    `<path d="M30.6,50 C27,59 22,67 16.4,74" fill="none" stroke="#FFF4EE" stroke-width="1.2" stroke-linecap="round" opacity=".6"/>`,
];

export default draw;
