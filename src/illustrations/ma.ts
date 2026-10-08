// ま (ma) illustration: a little sailing ship. Ma as in mast.
// The long vertical stroke is the mast, the two crossbars are the yards with a square sail hanging from each,
// and the loop at the bottom is a lifebuoy hanging on the hull, its rope (the tail) running off to the bow.
// Parts are layered back to front and bloom in one by one.
import type { Draw } from './types';
import { shadow } from './helpers';

const HULL = '#3F6A9C', HULL_SHADE = '#2D4F78', SAIL = '#F6EEDD', SAIL_SHADE = '#DDCFB2', WOOD = '#C99A62', WOOD_SHADE = '#9C7443', FLAG = '#E0584A';

const draw: Draw = () => [
  shadow(57, 101, 34),
  // mast and the two yards, along the three straight strokes
  `<path d="M55.8,14 C57.3,15.8 57.6,18.6 57.6,21.2 C57.6,24 57.9,60 58,78" fill="none" stroke="${WOOD}" stroke-width="3.2" stroke-linecap="round"/>` +
    `<path d="M58.8,20 C58.9,34 59.1,60 59.2,78" fill="none" stroke="${WOOD_SHADE}" stroke-width="1" stroke-linecap="round"/>` +
    `<path d="M30.5,33 C33,33.7 35,33.8 37,33.6 C48.5,32.5 63,30.4 71.6,28.7 C74.5,28.1 77,28.2 78.6,28.2" fill="none" stroke="${WOOD}" stroke-width="2.6" stroke-linecap="round"/>` +
    `<path d="M34.5,52.4 C37,53.6 39,53.6 41.8,53.1 C51.3,51.6 59.6,50 68.8,47.9 C72,47.2 75,46.6 76.8,46.6" fill="none" stroke="${WOOD}" stroke-width="2.6" stroke-linecap="round"/>`,
  // the two square sails, bellied out by the wind
  `<path d="M35,34.4 C48,33.2 62,31.3 74.8,29.2 C77.6,34 77.4,40 74.6,44.2 C62.5,45 50,46.3 37.6,48.3 C34,44 33.4,38.6 35,34.4Z" fill="${SAIL}"/>` +
    `<path d="M66,30.7 C70,30.1 72.4,29.7 74.8,29.2 C77.6,34 77.4,40 74.6,44.2 C71.4,44.4 68.6,44.6 66,44.8 C68.4,40 68.6,35 66,30.7Z" fill="${SAIL_SHADE}"/>` +
    `<path d="M39,54 C50,52.4 61,50.6 73.8,48 C76.4,53.4 76.2,60.6 73.4,66.2 C62,66.8 51,67.8 41.4,69.6 C37.8,64.6 37.4,58.6 39,54Z" fill="${SAIL}"/>` +
    `<path d="M65.4,49.7 C68.6,49.1 71.2,48.6 73.8,48 C76.4,53.4 76.2,60.6 73.4,66.2 C70.6,66.3 68,66.5 65.4,66.7 C67.8,61 67.8,55 65.4,49.7Z" fill="${SAIL_SHADE}"/>`,
  // pennant flying from the top of the mast
  `<path d="M57,14.6 L70,18.4 L57.4,21.6Z" fill="${FLAG}"/>`,
  // round-bellied hull, stern on the left and bow rising on the right
  `<path d="M18,75 L96,72 C93,81 89,89 83,94.5 C75,100 48,101.2 35,98.4 C25,95.8 19,87 18,75Z" fill="${HULL}"/>` +
    `<path d="M96,72 C93,81 89,89 83,94.5 C75,100 58,101 48,100.4 C64,97 78,91 86,72.4Z" fill="${HULL_SHADE}"/>` +
    `<path d="M18.4,77.8 L95,74.8" stroke="${SAIL}" stroke-width="2.2"/>` +
    `<path d="M17,74.2 L97,71.2" stroke="${WOOD}" stroke-width="2.4" stroke-linecap="round"/>`,
  // lifebuoy hanging on the side (the loop), its rope running off to the bow (the tail)
  `<path d="M57,81 C63,84 71,88 79,90.6 C85,92 89,86 89,76" fill="none" stroke="${WOOD}" stroke-width="1.4" stroke-linecap="round"/>` +
    `<ellipse cx="42.4" cy="84.8" rx="14.6" ry="8.8" fill="none" stroke="${SAIL}" stroke-width="5.6"/>` +
    `<ellipse cx="42.4" cy="84.8" rx="14.6" ry="8.8" fill="none" stroke="${FLAG}" stroke-width="5.6" stroke-dasharray="9.6 9.6" stroke-dashoffset="4"/>` +
    `<path d="M42.4,93.6 C49,93.6 55,90.6 57,85.6" fill="none" stroke="#2A2530" stroke-width="5.6" opacity=".12"/>`,
  // highlights on the sails and hull
  `<path d="M37.6,37.6 C37.4,40.4 37.8,43 38.8,45.2" fill="none" stroke="#fff" stroke-width="1.2" stroke-linecap="round"/>` +
    `<path d="M41.6,57.6 C41.4,60.4 41.8,63 42.8,65.2" fill="none" stroke="#fff" stroke-width="1.2" stroke-linecap="round"/>` +
    `<path d="M21.6,82 C22.4,87 24.4,91 27.4,93.6" fill="none" stroke="#FFF4EE" stroke-width="1.3" stroke-linecap="round" opacity=".8"/>` +
    `<path d="M30.6,80.4 C32.6,77.8 36,76.6 39.6,76.4" fill="none" stroke="#fff" stroke-width="1" stroke-linecap="round"/>`,
];

export default draw;
