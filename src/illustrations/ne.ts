// ね (ne) illustration: a chick in a nest at the end of a branch. Ne as in nest.
// The first stroke is the little tree's trunk; the second stroke's zigzag is two twigs, its long arch is the branch
// bending over to the right, and the loop at the end is the nest, with the branch tip poking out.
// Parts are layered back to front and bloom in one by one.
import type { Draw } from './types';
import { shadow } from './helpers';

const BARK = '#8A5A3B', BARK_SHADE = '#6B4229', LEAF = '#6FA84F', LEAF_SHADE = '#4F8638',
  STRAW = '#D9A85B', STRAW_SHADE = '#B7853F', CHICK = '#F6CE45', INK = '#2E2A22';

// The second stroke, split into its twigs (zigzag) and the long branch (arch and loop).
const TWIGS = 'M17.2,37.9 C18.8,38.8 20.4,39.3 22.8,38.6 C24.9,38.1 30.6,36.3 35.1,34.6 C41.4,32.2 42,33.1 38.3,38.2 C32.7,45.8 25.2,55.6 19.8,65 C17.5,69 16.6,71 17.2,71.3';
const BRANCH = 'M21.8,68 C40.9,49.4 60.3,28.9 75.9,28.9 C87.3,28.9 88.8,40.1 88.8,61.4 C88.8,90 58.6,86.3 58.6,77.6 C58.6,68 77.3,69.8 86.7,75.8 C89.4,77.5 92.5,80.6 94.2,82.5';

/** A leaf at (x,y) pointing at angle a (degrees), with its lower half in shade. */
const leaf = (x: number, y: number, a: number, s = 1) =>
  `<g transform="translate(${x} ${y}) rotate(${a}) scale(${s})"><path d="M0,0 C3,-3.6 8,-3.6 11,0 C8,3.6 3,3.6 0,0Z" fill="${LEAF}"/><path d="M0,0 C3,3.6 8,3.6 11,0Z" fill="${LEAF_SHADE}"/></g>`;

const draw: Draw = () => [
  shadow(33, 96, 16),
  // twigs off the trunk (the zigzag), with leaves at their ends
  `<path d="${TWIGS}" fill="none" stroke="${BARK}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>` +
    leaf(18, 38, 172) + leaf(18, 70, 125, .95) + leaf(19, 66, 200, .85),
  // the long branch arching over to the right and curling round under the nest
  `<path d="${BRANCH}" fill="none" stroke="${BARK}" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/>` +
    `<path d="M80,31 C86,35 88,45 88.6,58" fill="none" stroke="${BARK_SHADE}" stroke-width="1.6" stroke-linecap="round"/>` +
    leaf(54, 39, -70, .9) + leaf(66, 30, -95, .85) + leaf(93.5, 82, 20, .9),
  // the trunk (first stroke), with a little tuft of leaves on top
  `<path d="M31.8,15 C33,12.6 35.8,13 36.4,16.5 C37,30 36.4,60 36.2,82 C36.2,88 37.5,92 40.5,96 L24.5,96 C27.5,92 29,88 29,82 C29.2,60 30.5,30 31.8,15Z" fill="${BARK}"/>` +
    `<path d="M34.4,15 C36,15.5 36.6,20 36.4,26 C36,50 35.8,70 36.2,84 C36.4,89 37.8,93 40.5,96 L36.4,96 C34.5,92 33.9,88 33.9,82 C34,60 34.6,32 34.4,15Z" fill="${BARK_SHADE}"/>` +
    leaf(33.5, 14, -120, .9) + leaf(34.5, 14, -60, .9),
  // the nest, sitting in the loop at the end of the branch
  `<ellipse cx="74" cy="71" rx="17.5" ry="4.5" fill="${STRAW_SHADE}"/>`,
  // a chick peeping out of the nest, beak open
  `<circle cx="72" cy="65" r="7.5" fill="${CHICK}"/><path d="M77.6,60.5 C80,63 80,68 77,71 C75,70 73.5,69 73,67.5 C75.5,66.5 77,64 77.6,60.5Z" fill="#E0AE2A"/>` +
    `<path d="M65.5,62 L60,60 L65,64.8Z" fill="#E8833A"/><path d="M65.5,65.2 L60.8,66.4 L65.8,67Z" fill="#C9642A"/>` +
    `<ellipse cx="68.6" cy="62.6" rx="1.3" ry="1.7" fill="${INK}"/><circle cx="68.3" cy="62" r=".45" fill="#fff"/><circle cx="71" cy="67.5" r="1.6" fill="#F2A7A0" opacity=".8"/>` +
    `<path d="M71,57.5 C71.5,55.5 73,54.8 74.5,55" fill="none" stroke="${CHICK}" stroke-width="1.2" stroke-linecap="round"/>`,
  // front of the nest, woven straw
  `<path d="M56.2,71 C56.5,83 64,90 74,90 C84,90 91.5,83 91.8,71 C87,75 80,76.5 74,76.5 C68,76.5 61,75 56.2,71Z" fill="${STRAW}"/>` +
    `<path d="M84,86 C89,82 91.5,77 91.8,71 C90,73 88.5,74 86.5,74.8 C86.5,79 85.8,83 84,86Z" fill="${STRAW_SHADE}"/>` +
    `<path d="M58,75 C64,80 72,80.5 80,78.5 M66,77.5 C72,84 80,85 88,80 M59.5,80 C64,86 70,88 76,87.5 M77,77.5 C83,79 87,77.5 90.5,74.5 M62,84.5 C67,84 71,82 73.5,79" fill="none" stroke="${STRAW_SHADE}" stroke-width=".9" stroke-linecap="round"/>` +
    `<path d="M56.2,71 C53.5,69.5 52,70.5 51,69 M91.8,71 C94,69 95.5,69.5 97,68 M57.5,72.5 C63,76 70,77 76,76.8 C82,76.6 88,75.5 91,72.5" fill="none" stroke="${STRAW}" stroke-width="1.3" stroke-linecap="round"/>`,
  // highlights
  `<path d="M58.2,75 C59,78.5 60.5,81 62.5,83" fill="none" stroke="#FFF4EE" stroke-width="1.2" stroke-linecap="round" opacity=".8"/>` +
    `<path d="M31.4,24 C31,34 30.7,46 30.5,56" fill="none" stroke="#FFF4EE" stroke-width="1" stroke-linecap="round" opacity=".5"/>`,
];

export default draw;
