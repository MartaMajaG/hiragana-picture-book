// ち (chi) illustration: a chipmunk cramming an acorn into its hugely stuffed cheek. Chi as in chipmunk.
// The big round curve of the long stroke is the outline of the puffed-out cheek pouch, its little hook the snout;
// the crossbar is the acorn's cap and the short vertical on top is the acorn's stalk,
// with the nut held up to the mouth in the chipmunk's paws.
// Parts are layered back to front and bloom in one by one.
import type { Draw } from './types';
import { shadow } from './helpers';

const FUR = '#C9772E', SHADE = '#9E5523', CREAM = '#F3DDB8', STRIPE = '#4A3226';
const POUCH = '#F2CF9C', POUCH_SHADE = '#E0B47A';
const NUT = '#E0A93E', NUT_SHADE = '#B9832A', CAP = '#7A5233', CAP_SHADE = '#5E3E26', INK = '#2E2A22';

const draw: Draw = () => [
  shadow(70, 98, 34),
  // bushy tail curling up behind the back, with its dark centre stripe
  `<path d="M96,94 C106,88 110,74 108,58 C106,44 102,34 94,28 C90,25 85,27 86,32 C92,38 96,46 96,58 C96,70 92,80 86,88Z" fill="${FUR}"/>` +
    `<path d="M97,88 C103,80 104,68 102.5,57 C101,46 98,39 92,33" fill="none" stroke="${STRIPE}" stroke-width="3" stroke-linecap="round"/>`,
  // the body sitting up behind the head, back stripes curving down to the haunch
  `<path d="M76,50 C88,54 96,66 98,82 C99,90 96,96 90,97 L64,97 C62,90 64,70 70,50Z" fill="${FUR}"/>` +
    `<path d="M92,70 C96,76 98,82 98,86 C98.4,92 95.6,96.4 90,97 L80,97 C90,93 94,84 92,70Z" fill="${SHADE}"/>` +
    `<path d="M80,57 C88,62 93,72 94.6,82 M84.6,55.6 C91,60 95,67 96.6,76" fill="none" stroke="${STRIPE}" stroke-width="2" stroke-linecap="round"/>` +
    `<path d="M82.4,58.6 C89,63.6 92.4,71 93.6,79" fill="none" stroke="${CREAM}" stroke-width="1.3" stroke-linecap="round"/>`,
  // hind foot
  `<ellipse cx="86" cy="97" rx="6" ry="2" fill="${SHADE}"/>`,
  // the head, round behind the cheek, with its ear on top
  `<path d="M69,33 C67.4,26 70.6,21.4 75.4,21.6 C79.6,22 81.2,28 79,34Z" fill="${FUR}"/><path d="M71.4,32.4 C70.6,27.4 72.8,24.6 75.4,24.8 C77.8,25.2 78.4,28.6 77.2,33Z" fill="#F2A7A0"/>` +
    `<path d="M46.6,50 C46.6,37.6 55.6,29.6 66,29.6 C77,29.6 85,37.6 85,48.6 C85,56 82.6,61 79,64 L45,64 C45.6,59 46,54 46.6,50Z" fill="${FUR}"/>` +
    `<path d="M77,32.6 C82,36 85,42 85,48.6 C85,56 82.6,61 79,64 L73,64 C80,56 82,44 77,32.6Z" fill="${SHADE}"/>`,
  // pointed snout poking out at the little hook of the curve
  `<path d="M50,46 C44,49 38,55 34.6,60.8 C33,63 33.4,66.4 36.6,67.4 C40,68.4 44,67 48,66Z" fill="${FUR}"/>`,
  // the face stripes: dark through the eye, cream above it
  `<path d="M39,57.4 C47,51 56,47.4 74,46.6" fill="none" stroke="${STRIPE}" stroke-width="2.2" stroke-linecap="round"/>` +
    `<path d="M47,49 C54,43.6 62,41 72,40.6" fill="none" stroke="${CREAM}" stroke-width="1.6" stroke-linecap="round"/>`,
  // the hugely stuffed cheek pouch, its outline following the big round curve
  `<path d="M38,66.6 C40,66.8 40.6,65 41.2,63.9 C49.5,57.7 61,54.4 69.7,54.4 C78.4,54.4 84.3,60.3 84.2,68.9 C84.1,82.4 67.7,89.5 54.4,92.1 C46,93.6 40.4,88.4 38.6,81 C37.6,76 37.2,71 38,66.6Z" fill="${POUCH}"/>` +
    `<path d="M84,70 C83.4,82.6 69,89.6 54.4,92.1 C69,85.6 79,78 80.6,60.4 C83,62.6 84.2,66 84,70Z" fill="${POUCH_SHADE}"/>` +
    `<path d="M46,62.2 C52,59 58,57.4 63,57" fill="none" stroke="#fff" stroke-width="1.4" stroke-linecap="round"/>` +
    `<circle cx="66" cy="73" r="3.2" fill="#F2A7A0" opacity=".85"/>`,
  // the acorn being crammed into the mouth: round nut, domed cap on the crossbar, stalk on the vertical
  `<path d="M31.6,36.6 C30.6,46 34,55 39.6,58.6 C42,60 44.4,59.4 46.4,57 C52,50.6 55,42 54,32.6Z" fill="${NUT}"/>` +
    `<path d="M50,33.4 C53,42 51.8,50.6 46.4,57 C51.6,52.6 55.4,44 54,32.6Z" fill="${NUT_SHADE}"/>` +
    `<path d="M34.6,41 C35,45 36.2,48.6 38,51" fill="none" stroke="#fff" stroke-width="1.2" stroke-linecap="round"/>` +
    `<path d="M24.5,32.6 C27,38 33.6,40.4 40,39.6 C48,38.6 58,34.6 62.4,30.2 C64,28.6 64.8,27 65,25.4 C60,20 50,18.6 42,20.4 C33.6,22.4 27,27 24.5,32.6Z" fill="${CAP}"/>` +
    `<path d="M27.6,34.6 C32,38.4 38,39.2 44,38.2 C51,37 58,34 62.4,30.2 C58,33.2 51,35.4 44,36.2 C38,37 32,36.6 27.6,34.6Z" fill="${CAP_SHADE}"/>` +
    `<path d="M32,30.6h.1 M38,29.4h.1 M44,28h.1 M50,26.6h.1 M56,25.6h.1 M35,25.6h.1 M41,24h.1 M47,22.8h.1 M53,22.4h.1 M59,22.8h.1 M35,34.6h.1 M41,33.6h.1 M47,32.4h.1 M53,30.6h.1 M59,28.4h.1" stroke="${CAP_SHADE}" stroke-width="1.6" stroke-linecap="round"/>` +
    `<path d="M30,27.6 C33,24.4 37,22.6 41,21.8" fill="none" stroke="#FFF4EE" stroke-width="1.1" stroke-linecap="round" opacity=".7"/>` +
    `<path d="M46.2,21 C46.8,19 46.6,17.4 45.6,15.6" fill="none" stroke="${CAP_SHADE}" stroke-width="2.6" stroke-linecap="round"/>`,
  // little paws gripping the nut on both sides
  `<ellipse cx="32.4" cy="47.4" rx="2.8" ry="2.4" fill="${SHADE}"/>` +
    `<ellipse cx="50.6" cy="50" rx="3.3" ry="2.7" transform="rotate(-30 50.6 50)" fill="${FUR}"/><path d="M48.4,49.6 l1.6,1.6 M49.6,48 l1.6,1.6" stroke="${SHADE}" stroke-width=".7" stroke-linecap="round"/>`,
  // eye and nose
  `<ellipse cx="62" cy="46.4" rx="2.5" ry="3" fill="${INK}"/><circle cx="61.2" cy="45.4" r=".9" fill="#fff"/>` +
    `<ellipse cx="34.8" cy="62" rx="1.7" ry="1.4" fill="#B8505E"/>`,
];

export default draw;
