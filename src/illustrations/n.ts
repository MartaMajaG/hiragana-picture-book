// ん (n) illustration: a swan gliding along. ん is the "n" at the end of swan.
// The long diagonal is its neck, from its head down to its chest; the hump is its back and folded wing,
// and the final rise is its tail flicked up. Floating, so no shadow. Parts are layered back to front and bloom in one by one.
import type { Draw } from './types';

const WHITE = '#F7F5F0', SHADE = '#DCD6C9', WING = '#E9E4D8', BEAK = '#F08A3A', INK = '#2E2A22';

const draw: Draw = () => [
  // body, shaded underneath, tail flicked up at the back
  `<path d="M22,78 C24,68 36,62 48,64 C58,65.6 63,72 72,72 C80,72 86,68 90,60 C93.5,68 91,82 80,88.5 C66,95.5 36,95.5 26,88.5 C22.4,85.8 21,81.6 22,78Z" fill="${WHITE}"/>` +
    `<path d="M24,86 C36,93 64,93.5 80,86 C87,82 90.5,76 91.4,69 C92.4,78 88,85 80,88.5 C66,95.5 36,95.5 26,88.5Z" fill="${SHADE}"/>`,
  // folded wing along the back (the hump of the stroke)
  `<path d="M36,72 C44,63 58,64 68,74 C71,77 76,79 81,78 C72,84 56,84 46,80 C41,78 38,75 36,72Z" fill="${WING}"/>` +
    `<path d="M48,76 C54,74.5 60,75.5 66,78 M44,72 C50,69.5 56,70 61,72.5" fill="none" stroke="${SHADE}" stroke-width="1" stroke-linecap="round"/>`,
  // long neck rising from the chest to the head (the diagonal of the stroke)
  `<path d="M27,76 C29,62 38,46 45,35 C49,28.5 51.5,24 53.5,19.5" fill="none" stroke="${WHITE}" stroke-width="6.5" stroke-linecap="round"/>` +
    `<path d="M29.6,74 C32,62 40,48 46.6,37.4" fill="none" stroke="${SHADE}" stroke-width="1.6" stroke-linecap="round"/>`,
  // head and beak
  `<circle cx="55" cy="18.5" r="5.8" fill="${WHITE}"/>` +
    `<path d="M50.4,18 C47,19.6 43.6,22 41.6,24.6 C45.4,24 48.6,22.8 51.6,21.6Z" fill="${BEAK}"/><path d="M50,17 C51.4,16.4 52.6,17.2 52.6,18.6 C52.6,20.4 51.2,21.4 50,21.2Z" fill="${INK}"/>`,
  // eye and highlights
  `<ellipse cx="55.4" cy="17.4" rx="1.2" ry="1.6" fill="${INK}"/><circle cx="55.1" cy="16.9" r=".45" fill="#fff"/>` +
    `<path d="M39,46 C42,40.5 45.5,35 49,29.5" fill="none" stroke="#fff" stroke-width="1.2" stroke-linecap="round"/>` +
    `<path d="M30,72 C34,67.5 40,65 46,65" fill="none" stroke="#fff" stroke-width="1.2" stroke-linecap="round"/>`,
];

export default draw;
