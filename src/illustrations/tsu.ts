// つ (tsu) illustration: a tsunami wave curling over. Tsu as in tsunami.
// The wave is breaking towards the left, and the stroke runs round the inside of its curl:
// from the tip of the lip hanging over on the left, under the crest, down the back of the hollow
// and along to where the wave meets the sea. Parts are layered back to front and bloom in one by one.
import type { Draw } from './types';

const WATER = '#3B83C4', SHADE = '#2A649E', LIGHT = '#7FB6E0', FOAM = '#F4FAFD';

// the wave: lip tip, over the top of the crest, down its back and along the sea,
// then back up round the inside of the curl along the stroke
const WAVE =
  'M13,51.4 C10,46 11.6,39.6 18,35.6 C30,28 46,22 62,21 C80,20 96,27 103,41 C107.4,50 108.4,62 107.6,74 C107,84 105.4,91 102,97 L34,97 C38,94 41.4,90 44.86,85.74 ' +
  'C65.12,82.37 89.69,72.43 89.87,53.66 C89.98,41.66 79.56,34.7 67,34.49 C52.12,34.25 40,37.75 22.12,45.37 C18.68,46.84 15.88,46.37 14,44.75 C13.4,47 13.2,49.2 13,51.4Z';

const draw: Draw = () => [
  // the wave, darker down its back and along its foot
  `<path d="${WAVE}" fill="${WATER}"/>` +
    `<path d="M98,32 C106,42 108.4,58 107.6,74 C107,84 105.4,91 102,97 L80,97 C94,90 102,78 103,62 C104,50 102,40 98,32Z" fill="${SHADE}"/>`,
  // the shadowed wall of the hollow, just inside the curl
  `<path d="M44.86,85.74 C65.12,82.37 89.69,72.43 89.87,53.66 C89.98,41.66 79.56,34.7 67,34.49 C52.12,34.25 40,37.75 22.12,45.37 C34,41.6 48,38.8 60,39 C74,39.2 84.6,44 85,55 C85.4,68 70,78.6 44.86,85.74Z" fill="${SHADE}"/>`,
  // swirl of lighter water rolling round the curl
  `<path d="M60,91.6 C74,89 92,80 96.4,56 C99,40 88,29 70,27.6 C58,26.8 46,29.6 36,33.6" fill="none" stroke="${LIGHT}" stroke-width="2.4" stroke-linecap="round"/>`,
  // foam riding the crest and spilling off the lip in claws
  `<path d="M13,51.4 C10,46 11.6,39.6 18,35.6 C30,28 46,22 62,21 C74,20.4 86,23.6 95,31 C86,27.6 78,26.4 70,26.6 C73,27.6 75,29 75.6,30.6 C68,28.6 60,28.4 52,29.8 C54.6,30.6 56,31.8 56.4,33.2 C46,32.6 34,36 24,40.6 C19.6,42.6 16,45.6 13,51.4Z" fill="${FOAM}"/>` +
    `<path d="M13,51.4 C14.6,54 14.4,57 12.4,59 C12.8,56.4 12,54.2 10.4,53Z M18.6,46.6 C20.6,48.8 20.8,51.6 19,53.6 C19.2,51 18.2,49 16.6,48Z M25,44 C26.8,46 27,48.4 25.4,50.2 C25.4,48 24.6,46.2 23.2,45.2Z" fill="${FOAM}"/>`,
  // foam where the wave meets the sea
  `<path d="M32,97 C32,93.6 36,91 40.6,90.6 C42,88.8 43.4,87 44.86,85.74 C46,89 49,91 53,91.4 C57,91.8 59,94 58.4,97Z" fill="${FOAM}"/>`,
  // highlight on the crest
  `<path d="M22,36.6 C32,30.6 44,26 56,24.2" fill="none" stroke="#fff" stroke-width="1.1" stroke-linecap="round"/>`,
];

export default draw;
