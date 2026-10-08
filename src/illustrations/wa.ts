// わ (wa) illustration: a walrus sitting up and waving. Wa as in walrus.
// The upright stroke is the front of its face and chest. In the second stroke, the short top line is its whiskery snout,
// the zig down is a long tusk, the zag back up is the flipper it waves, and the big round sweep is its back and bottom.
// Parts are layered back to front and bloom in one by one.
import type { Draw } from './types';
import { shadow } from './helpers';

const HIDE = '#B07D5E', SHADE = '#8C5E44', SNOUT = '#DDB795', SNOUT_SHADE = '#C29774', TUSK = '#FBF5E6', TUSK_SHADE = '#E3D5B6', TUSK_LINE = '#C9B48E',
  INK = '#2E2A22';

const draw: Draw = S => [
  shadow(64, 95.4, 34),
  // back flippers, behind the body
  `<path d="M70,90 C80,86.6 92,87 100.4,90.6 C102,92.8 100.4,95.4 96.6,95.2 L70,95.2Z" fill="${SHADE}"/>`,
  // big body: straight chest down the front, round back along the big sweep
  `<path d="M37.5,46 C38,36 50,28 62,30 C72,32 79,38 83,44 C91,50 96,56 95.6,63 C95.2,73 91,80 85.6,82.6 C80,86 76,89 72,91 C70,93 68,94.6 64,94.6 L40,94.6 C35.4,94.6 33.6,91.6 33.8,87 C34,78 33.6,64 35.8,54 C36,51 36.6,48.4 37.5,46Z" fill="${HIDE}"/>` +
    `<path d="M83,44 C91,50 96,56 95.6,63 C95.2,73 91,80 85.6,82.6 C80,86 76,89 72,91 C70,93 68,94.6 64,94.6 L59,94.6 C74,88 88.4,76 88.4,62 C88.4,54 86.4,48 83,44Z" fill="${SHADE}"/>` +
    `<path d="${S[1]}" pathLength="100" stroke-dasharray="13 87" stroke-dashoffset="49" fill="none" stroke="${SHADE}" stroke-width="1.3" stroke-linecap="round"/>`,
  // front flipper waving, along the stroke that zags back up
  `<path d="M44,53 C38,56.4 31.4,60.4 25.4,63.4 C20,63.6 13.6,64.8 11.2,68.8 C9.4,72.2 10.8,77.6 15.6,78.8 C19.8,79.8 24.2,76.4 27.8,73 C33.2,69.6 39,66.4 44.6,64.2Z" fill="${HIDE}"/>` +
    `<path d="M44.4,60.8 C38,64.4 31,68.6 25.6,72 C21.6,75.2 16,77 11.4,75 C12.4,77.2 13.8,78.4 15.6,78.8 C19.8,79.8 24.2,76.4 27.8,73 C33.2,69.6 39,66.4 44.6,64.2Z" fill="${SHADE}"/>` +
    `<path d="M12.6,69.4 L18.2,70.6 M12.2,73 L17.8,72.8" fill="none" stroke="${SHADE}" stroke-width=".9" stroke-linecap="round"/>`,
  // head, sitting on top of the chest
  `<ellipse cx="50.4" cy="31" rx="16" ry="15.4" fill="${HIDE}"/>` +
    `<path d="M61.6,20 C66.6,25 67.8,34.4 63,40.6 C59.6,44.8 54,46.6 49,46 C58,41.6 63.6,31.6 61.6,20Z" fill="${SHADE}"/>`,
  // two long tusks, the near one down the zig of the stroke
  `<path d="M38.8,51 C35.2,58 30.8,65.4 26,72 C32,65.8 37.8,59 43.4,51.6Z" fill="${TUSK_SHADE}" stroke="${TUSK_LINE}" stroke-width=".7" stroke-linejoin="round"/>` +
    `<path d="M30.6,50.4 C26.4,58 21.8,65.6 17.2,73 C24,66.8 30.6,59.2 37.2,51.4Z" fill="${TUSK}" stroke="${TUSK_LINE}" stroke-width=".7" stroke-linejoin="round"/>`,
  // whiskery snout, along the short top line of the stroke
  `<path d="M17,41.4 C17.4,37.8 24,36 31,35.8 C38,35.6 46,35 50.4,38.6 C54,42 52.6,49.6 46,52 C38,54.6 24,54 20,50.6 C17.8,48.8 16.8,45 17,41.4Z" fill="${SNOUT}"/>` +
    `<path d="M51.8,42.6 C52.4,47 50,50.4 46,52 C38,54.6 24,54 20,50.6 C27,52.2 38,51.8 44.6,49 C48,47.4 50.6,45.4 51.8,42.6Z" fill="${SNOUT_SHADE}"/>` +
    `<path d="M24,43 h.1 M28,41.6 h.1 M32,43 h.1 M36,41.6 h.1 M40,43 h.1 M44,41.6 h.1 M26,46.4 h.1 M30,45.2 h.1 M34,46.4 h.1 M38,45.2 h.1 M42,46.4 h.1" stroke="${SNOUT_SHADE}" stroke-width="1.4" stroke-linecap="round"/>`,
  // face and highlights
  `<ellipse cx="45.4" cy="27.6" rx="1.9" ry="2.5" fill="${INK}"/><circle cx="44.9" cy="26.7" r=".65" fill="#fff"/>` +
    `<path d="M40.4,23.4 C42.4,19.4 46.4,17 50.6,16.6" fill="none" stroke="#FFF4EE" stroke-width="1.3" stroke-linecap="round"/>` +
    `<path d="M20.4,40.6 C22.4,38.6 25.6,37.8 29,37.8" fill="none" stroke="#FFF4EE" stroke-width="1.1" stroke-linecap="round" opacity=".8"/>`,
];

export default draw;
