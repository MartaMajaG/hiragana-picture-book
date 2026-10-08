// め (me) illustration: a big round watermelon. Me as in melon.
// The big loop is the melon, with a wedge cut out of it: the crossing strokes are the two cut edges, meeting at the tip.
// The top of the second stroke is its curly stalk, and the top of the first is a leaf.
// Parts are layered back to front and bloom in one by one.
import type { Draw } from './types';
import { shadow } from './helpers';

const RIND = '#5FA24A', SHADE = '#4A8A3A', STRIPE = '#2F6A2C', LEAF = '#86B94E', LEAF_SHADE = '#6A9C3A', STALK = '#8A7A45';

const RED = '#E8545A', RED_SHADE = '#C93F48', PITH = '#F4F0CC', SEED = '#2E2A22';

const MELON = '<ellipse cx="56" cy="64" rx="39" ry="26" transform="rotate(-15 56 64)"';
// the wedge cut out of the melon: its two cut edges are the crossing strokes, meeting at the tip
const WEDGE = 'M40.4,73.2 C36,67 32.4,57 30.6,48.2 A39,26 -15 0 1 57.5,37.4 C54.6,48 47.6,62 40.4,73.2Z';

const draw: Draw = () => [
  shadow(57, 91, 36),
  // the watermelon, shaded on its lower right, with dark stripes running round it
  `${MELON} fill="${RIND}"/>` +
    `<path d="M92.6,50.6 C97,62 92,78 76,86.4 C66,91.4 52,91.6 42,87 C62,88 84,78 92.6,50.6Z" fill="${SHADE}"/>` +
    `<clipPath id="me-clip">${MELON}/></clipPath>` +
    `<g clip-path="url(#me-clip)" fill="none" stroke="${STRIPE}" stroke-width="3.4" stroke-linecap="round">` +
    `<path d="M24,58 C19,68 22,80 29,86 M68,37 C74,52 72,72 60,92 M82,42 C88,56 86,74 76,88" /></g>`,
  // the wedge cut out, showing the red flesh, the pale rind along the cut edges, and seeds
  `<path d="${WEDGE}" fill="${RED}"/>` +
    `<path d="M40.4,73.2 C42,62 42.6,50 43.4,40.6 A39,26 -15 0 1 57.5,37.4 C54.6,48 47.6,62 40.4,73.2Z" fill="${RED_SHADE}"/>` +
    `<path d="M40.4,73.2 C36,67 32.4,57 30.6,48.2 M40.4,73.2 C47.6,62 54.6,48 57.5,37.4" fill="none" stroke="${PITH}" stroke-width="2.2" stroke-linecap="round"/>` +
    `<path d="M35.8,52 l.9,2.6 M39.4,60 l.7,2.4 M47.4,45.6 l-.4,2.6 M50,53 l-.6,2.4 M44.6,63 l-.4,2.2" stroke="${SEED}" stroke-width="1.5" stroke-linecap="round"/>`,
  // the stalk on top, with a little curl
  `<path d="M57.6,37.6 C59,33 60.4,28 60.4,24 C60.4,21.4 59,19.6 56.6,19.6 C54.6,19.6 54,21.6 55.4,22.8" fill="none" stroke="${STALK}" stroke-width="2.4" stroke-linecap="round"/>`,
  // a leaf lying against the melon, along the top of the first stroke
  `<path d="M30.6,48.6 C23.6,45 21.8,37 27.4,31.6 C33.4,35.6 34.6,43 30.6,48.6Z" fill="${LEAF}"/>` +
    `<path d="M30.6,48.6 C32.8,44 32.6,38 29.8,34 C34,37.8 34.4,44.6 30.6,48.6Z" fill="${LEAF_SHADE}"/>` +
    `<path d="M27.6,32.4 C29.2,37.6 30,43 30.4,48" fill="none" stroke="${LEAF_SHADE}" stroke-width=".9" stroke-linecap="round"/>`,
  // highlights on the rind and leaf
  `<path d="M21.6,72 C20.6,66 22.4,60.6 26,56.4" fill="none" stroke="#FFF4EE" stroke-width="1.6" stroke-linecap="round" opacity=".85"/>` +
    `<path d="M61.6,40.8 C66,39.8 70.6,40 74.4,41.2" fill="none" stroke="#FFF4EE" stroke-width="1.4" stroke-linecap="round" opacity=".7"/>` +
    `<path d="M26,38 C25.6,41 26.2,43.6 27.6,45.6" fill="none" stroke="#FFF4EE" stroke-width=".9" stroke-linecap="round" opacity=".8"/>`,
];

export default draw;
