// み (mi) illustration: a medium ("mee-dee-um") gazing into her crystal ball. Mi as in medium.
// Stroke 1's top bar and diagonal are the edge of her headscarf, falling from her forehead down past her cheek;
// its loop is the glowing crystal ball on its little gold stand, and its long tail is her shawl sweeping out to the right.
// Stroke 2, crossing the shawl, is her other arm raised with the hand held up theatrically. Parts are layered back to front and bloom in one by one.
import type { Draw } from './types';
import { shadow } from './helpers';

const SKIN = '#F2C9A5', SKIN_SHADE = '#DDA880', HAIR = '#3B2F2A', INK = '#2E2A22',
  SCARF = '#D2486E', SCARF_SHADE = '#A8345A', DRESS = '#3F8C8A', DRESS_SHADE = '#2E6E6C',
  SHAWL = '#6E3A86', SHAWL_SHADE = '#542A68', GOLD = '#E8B23A', GOLD_SHADE = '#BF8A22',
  BALL = '#A6CFF2', BALL_SHADE = '#7BA6DC', SWIRL = '#D9CCF7';

const draw: Draw = () => [
  shadow(48, 97, 40),
  // headscarf falling behind her head to the shoulders
  `<path d="M33,21.8 C41,20.4 50,20.6 56,21.5 C59.5,22.5 60,26 58.6,30 L48.6,58.5 C40,61 28,60.5 19.6,57.5 C20.4,49 21,40 23,33 C24.6,27 28,22.8 33,21.8Z" fill="${SCARF}"/>` +
    `<path d="M58.6,30 L48.6,58.5 C45,59.5 41.5,60 38,60 C44,52 50,40 56,24.5 C58.6,25.5 59.4,27.6 58.6,30Z" fill="${SCARF_SHADE}"/>`,
  // ends of the headscarf hanging down behind
  `<path d="M23,40 C17.6,44 15.6,52 17,58 L21.6,57 C21,51 21.6,46 24.6,42Z M24,44 C21.6,49 21.8,54 24,58.6 L27,57.6 C25.4,53 25.6,48.6 26.4,45Z" fill="${SCARF_SHADE}"/>`,
  // seated body in a teal dress, the near arm resting at her side
  `<path d="M16,96.6 C11.6,95.6 12.6,78 17,68 C20,62 24,58.6 28,57.5 L50,57.5 C58,61 62.6,72 62.6,93 C62.6,96 61,97.6 58,98 C44,99.6 28,99.4 16,96.6Z" fill="${DRESS}"/>` +
    `<path d="M55,62 C60,68 62.6,80 62.6,93 C62.6,96 61,97.6 58,98 C56,98.3 54,98.5 52,98.6 C57,88 58,74 55,62Z" fill="${DRESS_SHADE}"/>` +
    `<path d="M59.6,70 C61.8,77 61.6,86 58,94" fill="none" stroke="${DRESS_SHADE}" stroke-width="7" stroke-linecap="round"/>`,
  // shawl round her shoulders, its long end sweeping out to the right (stroke 1's tail), gold coins on the hem
  `<path d="M18,62 C26,55 50,54.5 58,60.5 C60,64 60,68 59,71.5 C46,75 30,75 17,71 C16,67.5 16.5,64.5 18,62Z" fill="${SHAWL}"/>` +
    `<path d="M44,59 C56,60 68,62.5 79,66.5 C85,68.5 90,71 95.5,74 L91,85 C85,81.5 79,78.5 72,76 C62,72.5 52,71 44,71Z" fill="${SHAWL}"/>` +
    `<path d="M52,71.3 C60,72 66,73.5 72,76 C79,78.5 85,81.5 91,85 L92.6,81 C86,77.6 80,75 73,72.6 C66,70.4 59,69.6 52,71.3Z" fill="${SHAWL_SHADE}"/>` +
    `<circle cx="96.4" cy="76.6" r="1.7" fill="${GOLD}"/><circle cx="95" cy="80.6" r="1.7" fill="${GOLD}"/><circle cx="93.4" cy="84.6" r="1.7" fill="${GOLD}"/>`,
  // neck and face, looking down into the ball with a cheeky smile
  `<path d="M35,50 L45,50 L45,58 C41.5,59.5 38.5,59.5 35,58Z" fill="${SKIN_SHADE}"/>` +
    `<circle cx="39" cy="43" r="11" fill="${SKIN}"/><path d="M45.5,34 C50,38 51,45 48,50.5 C45.6,54 41.6,55 38,54 C44.6,50.4 47.6,42 45.5,34Z" fill="${SKIN_SHADE}"/>` +
    `<path d="M30.5,38.5 C31,34 34.5,31.5 39,31.5 C43.5,31.5 47.5,34 48,38.5 C45,36 42,35.2 39,35.2 C36,35.2 33,36 30.5,38.5Z" fill="${HAIR}"/>` +
    `<ellipse cx="33.6" cy="42.6" rx="1.6" ry="2.2" fill="${INK}"/><circle cx="33.2" cy="41.8" r=".55" fill="#fff"/>` +
    `<ellipse cx="41.6" cy="42.6" rx="1.6" ry="2.2" fill="${INK}"/><circle cx="41.2" cy="41.8" r=".55" fill="#fff"/>` +
    `<path d="M31.6,39 L35.4,38.4 M39.8,37.4 C41.4,36.4 43.2,36.4 44.6,37.4" fill="none" stroke="${HAIR}" stroke-width="1" stroke-linecap="round"/>` +
    `<path d="M34.6,47.6 C36.6,50.2 40.6,50.4 43,47.4" fill="none" stroke="#8A3A3A" stroke-width="1.3" stroke-linecap="round"/>` +
    `<circle cx="32" cy="46" r="1.8" fill="#F2A7A0" opacity=".8"/><circle cx="45.4" cy="45.6" r="1.8" fill="#F2A7A0" opacity=".8"/>`,
  // front edge of the headscarf (stroke 1's top bar and diagonal) with a coin fringe, crescent pin and hoop earring
  `<path d="M33,21.8 C41,20.4 50,20.6 56,21.5 C59.5,22.5 60,26 58.6,30 L50,54.5 L47.6,53.6 C50,46 52.6,38 54.6,31.6 C52,30.2 46,29.6 39,29.6 C34,29.6 30.4,30.6 28.2,32.2 C27.6,27 29,23 33,21.8Z" fill="${SCARF}"/>` +
    `<path d="M30,31 C35,29.4 45,29.2 54.4,31" fill="none" stroke="${GOLD_SHADE}" stroke-width="1" stroke-linecap="round"/>` +
    [31.4, 35.2, 39, 42.8, 46.6, 50.4].map((x, i) => `<circle cx="${x}" cy="${i % 2 ? 32.8 : 32.2}" r="1.55" fill="${GOLD}"/>`).join('') +
    `<path d="M52.6,24.6 A3.6,3.6 0 1 0 55.8,30 A2.8,2.8 0 1 1 52.6,24.6Z" fill="${GOLD}"/>` +
    `<circle cx="46.4" cy="53.4" r="3.4" fill="none" stroke="${GOLD}" stroke-width="1.3"/>`,
  // other arm raised with the hand held up, fingers spread (stroke 2)
  `<path d="M57,94.5 C70,86 76,73 79.4,61" fill="none" stroke="${DRESS}" stroke-width="7" stroke-linecap="round"/>` +
    `<path d="M60.6,95 C71,87.6 76.4,77 79.4,66" fill="none" stroke="${DRESS_SHADE}" stroke-width="2" stroke-linecap="round"/>` +
    `<path d="M76.4,62.4 L82.4,62.4" stroke="${GOLD}" stroke-width="2.2" stroke-linecap="round"/>` +
    `<path d="M76.4,46.6 L76.4,53 M79.4,44.6 L79.4,52 M82.4,45.6 L82.4,52.6 M85,49 L84,54.4" fill="none" stroke="${SKIN}" stroke-width="2.4" stroke-linecap="round"/>` +
    `<path d="M75.2,54 C75.2,51.6 77,50.4 79.6,50.4 C82.4,50.4 84.4,51.6 84.4,54.4 C84.4,58 82.4,60.4 79.6,60.4 C77,60.4 75.2,58 75.2,54Z" fill="${SKIN}"/>` +
    `<path d="M73,53.6 C72,51.6 72.6,50 74,50.4 C75,50.8 75.6,52.6 76,54.6" fill="${SKIN}"/>`,
  // the crystal ball (stroke 1's loop) on its gold stand
  `<path d="M17.6,83 C21,86.6 32,86.6 35.4,83 L32.4,89 L36,93 C36,95.4 17,95.4 17,93 L20.6,89Z" fill="${GOLD}"/>` +
    `<path d="M31,85.4 C33,84.8 34.4,84 35.4,83 L32.4,89 L36,93 C36,94.4 32,95 28,95.1 C32,93.6 32,90 30.4,88.6Z" fill="${GOLD_SHADE}"/>` +
    `<circle cx="27.4" cy="73.4" r="12.8" fill="${BALL}"/>` +
    `<path d="M37,65.4 C41.2,71.6 40.2,80.6 34.4,84.4 C29,88 21,87.4 16.8,82.8 C24.8,85 32,81.8 34.8,76 C36.2,72.6 37.2,69 37,65.4Z" fill="${BALL_SHADE}"/>` +
    `<path d="M20.4,75.4 C19.6,70.6 23.6,67.4 27.8,68.2 C31.4,68.8 32.6,72.8 30.2,74.8 C28.2,76.4 25.2,75.2 25.8,73.2 C24.2,74.8 25.2,78.4 29,78.4 C24.8,80.6 21,79 20.4,75.4Z" fill="${SWIRL}"/>` +
    `<path d="M18.8,69.4 C20,66.4 22.6,64.2 25.8,63.6" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/><circle cx="17.8" cy="72.8" r="1" fill="#fff"/>`,
  // highlights
  `<path d="M22,56 C28,53.6 36,53.4 44,55" fill="none" stroke="#FFF4EE" stroke-width="1" stroke-linecap="round" opacity=".6"/>` +
    `<path d="M33,24.2 C38,23 44,22.8 49,23.2" fill="none" stroke="#FFF4EE" stroke-width="1" stroke-linecap="round" opacity=".7"/>`,
];

export default draw;
