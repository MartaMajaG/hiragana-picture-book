// は (ha) illustration: a striped hammock slung between two trees. Ha as in hammock.
// The left stroke is the first trunk (its little hook is where the hammock is tied), the long right stroke is the second trunk,
// the crossbar is its branch, and the loop at the bottom is the hammock sagging between them, the loose rope end hanging off to the right.
// Parts are layered back to front and bloom in one by one.
import type { Draw } from './types';
import { shadow } from './helpers';

const BARK = '#A77A52', BARK_SHADE = '#83593A', LEAF = '#7DB05A', LEAF_SHADE = '#5E9143', ROPE = '#D9B684',
  CLOTH = '#E4644F', CLOTH_SHADE = '#BF4B3A', STRIPE = '#F6E6C8';

const leaf = (x: number, y: number, a: number) =>
  `<path transform="translate(${x} ${y}) rotate(${a})" d="M0,0 C2.5,-3.6 8,-3.8 10.5,0 C8,3.8 2.5,3.6 0,0Z" fill="${LEAF}"/>` +
  `<path transform="translate(${x} ${y}) rotate(${a})" d="M0,0 C3,1.8 7.5,2.6 10.5,0 C8,3.8 2.5,3.6 0,0Z" fill="${LEAF_SHADE}"/>`;

const draw: Draw = () => [
  shadow(50, 98, 40),
  // the two trunks, following the two long strokes
  `<path d="M20,98 C19,85 18.5,72 19.5,60 C20.5,46 23,34 23.5,22 C23.7,16 29.5,16 29.3,22 C29,34 26.5,46 25.5,60 C24.6,72 25,85 26.5,98Z" fill="${BARK}"/>` +
    `<path d="M27.3,17.6 C28.6,18.6 29.4,20 29.3,22 C29,34 26.5,46 25.5,60 C24.6,72 25,85 26.5,98 L23.8,98 C22.8,85 22.6,72 23.4,60 C24.6,44 27,32 27.3,17.6Z" fill="${BARK_SHADE}"/>` +
    `<path d="M69.5,98 C70.3,80 70.6,55 70,22 C69.9,15 76.7,15 76.7,22 C77.4,55 77.7,80 78.5,98Z" fill="${BARK}"/>` +
    `<path d="M75,16.5 C76.2,17.8 76.7,19.6 76.7,22 C77.4,55 77.7,80 78.5,98 L75.6,98 C75,80 74.9,55 75,16.5Z" fill="${BARK_SHADE}"/>`,
  // the branch along the crossbar, with a leaf at each end
  `<path d="M49.6,37.9 C52,39.5 54.5,40 57.4,39.6 C66.8,38.2 74.9,36.7 80.8,35 C83.9,34.2 86.8,33.8 88.6,33.8" fill="none" stroke="${BARK}" stroke-width="3.4" stroke-linecap="round"/>` +
    leaf(50.5, 38.4, -165) + leaf(88, 33.8, 20),
  // the hammock slung between the trunks, sagging along the loop, with stripes running its length
  `<path d="M25,71 C38,77.4 60,77.8 75.4,70.4 C76.8,89 65,96.4 52.4,95.4 C40,94.2 29.4,85 25,71Z" fill="${CLOTH}"/>` +
    `<path d="M28.4,78.6 C40,84.6 60,85.4 75.4,77.8 M33.8,87 C44,92 62,93 73,85" fill="none" stroke="${STRIPE}" stroke-width="2.4" stroke-linecap="round"/>` +
    `<path d="M75.4,70.4 C76.8,89 65,96.4 52.4,95.4 C65.6,92.6 73.4,84 75.4,70.4Z" fill="${CLOTH_SHADE}" opacity=".85"/>` +
    `<path d="M34.6,89.4 l-1,2.6 M40.6,92.6 l-.6,2.8 M46.6,94.6 l-.3,2.6 M53,95.4 l0,2.4 M59.4,95 l.4,2.4 M65.6,93 l.8,2.6" stroke="${STRIPE}" stroke-width="1.2" stroke-linecap="round"/>`,
  // ropes gathering each end round a trunk (the left one at the stroke's hook), the right rope's loose end hanging down the tail
  `<path d="M19.4,72.4 C21.5,74.4 24.5,73.8 26.6,71.2 M19.6,75.6 C21.7,77.6 24.7,77 26.8,74.4" fill="none" stroke="${ROPE}" stroke-width="2.2" stroke-linecap="round"/>` +
    `<path d="M75,73.4 C79.6,76.4 84,81 87,87.6" fill="none" stroke="${ROPE}" stroke-width="1.8" stroke-linecap="round"/>` +
    `<ellipse cx="74.4" cy="71.4" rx="3.6" ry="2.6" fill="${ROPE}"/><ellipse cx="25.4" cy="73" rx="2.6" ry="2.2" fill="${ROPE}"/>`,
  // highlights on the trunks and the hammock's rim
  `<path d="M24.6,26 C24.2,34 22.6,44 21.8,52" stroke="#FFF4EE" stroke-width="1" stroke-linecap="round" opacity=".7" fill="none"/>` +
    `<path d="M71.6,24 L71.8,52" stroke="#FFF4EE" stroke-width="1" stroke-linecap="round" opacity=".7"/>` +
    `<path d="M31,75.4 C37,78 44,79 51,79" fill="none" stroke="#FFF4EE" stroke-width="1.1" stroke-linecap="round" opacity=".85"/>`,
];

export default draw;
