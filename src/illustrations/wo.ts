// を (wo) illustration: someone going "Whoa!" as they slip on a banana peel. を is said "o" (sometimes "wo"), as in "whoa!".
// The short top stroke is their arms flung out, the zigzag middle stroke is their body twisting as they topple,
// and the last stroke is their legs: one kicked up high, the other skidding down onto the peel, with the curve
// at the bottom as the slide along the ground. Parts are layered back to front and bloom in one by one.
import type { Draw } from './types';
import { shadow } from './helpers';

const SKIN = '#F2C9A5', SKIN_SHADE = '#DDA880', HAIR = '#3B2F2A', SHIRT = '#E07B5A', SHIRT_SHADE = '#C25F42',
  PANTS = '#5D8FC9', PANTS_SHADE = '#4674AA', SHOE = '#3B2F2A', PEEL = '#F2CF4A', PEEL_SHADE = '#D9AE2E', INK = '#2E2A22';

const draw: Draw = () => [
  shadow(56, 95, 30),
  // the skid along the ground (the curve at the bottom of the last stroke)
  `<path d="M35.31,83.88c3.28,9.48,17.93,9.12,29.98,7.75c4.48-0.51,9.15-1.12,12.4-1.75" fill="none" stroke="#CDBB98" stroke-width="2.4" stroke-linecap="round"/>`,
  // banana peel under the sliding foot, flaps splayed out
  `<path d="M33,89 C29.4,83.6 26,81.4 22.6,82 C25.4,85 27.6,88 29.4,91Z" fill="${PEEL_SHADE}"/>` +
    `<path d="M40,88.6 C44.6,83.4 49,81.8 52.6,83.4 C49.6,85.8 46.6,88.8 44,91.4Z" fill="${PEEL}"/>` +
    `<path d="M26.6,91.4 C29.6,87.2 42,86.6 47.6,91.2 C40.6,93.6 33,93.6 26.6,91.4Z" fill="${PEEL}"/>` +
    `<path d="M36,90 C38.4,92.6 42.4,94.2 47,94 C44,92.2 41.6,90.2 39.6,88.4Z" fill="${PEEL_SHADE}"/>` +
    `<circle cx="22.9" cy="82.1" r="1" fill="#8A6A2E"/><circle cx="52.3" cy="83.4" r="1" fill="#8A6A2E"/><circle cx="46.6" cy="94" r=".9" fill="#8A6A2E"/>` +
    `<path d="M30,90.4 C34,88.6 40,88.4 44.6,90.2" fill="none" stroke="#FFF4EE" stroke-width=".8" stroke-linecap="round" opacity=".8"/>`,
  // legs in a split along the long diagonal: one skidding down onto the peel, one kicked up into the air
  `<path d="M54,62 C49,68 44,74 39.6,79.6" fill="none" stroke="${PANTS}" stroke-width="8.4" stroke-linecap="round"/>` +
    `<path d="M56,61 C63,56 70,51.6 77,47" fill="none" stroke="${PANTS}" stroke-width="8.4" stroke-linecap="round"/>` +
    `<path d="M58.6,64.4 C65,60 71,56 77.6,51.6" fill="none" stroke="${PANTS_SHADE}" stroke-width="2.2" stroke-linecap="round"/>` +
    `<ellipse cx="36.6" cy="83" rx="6" ry="3.4" transform="rotate(-35 36.6 83)" fill="${SHOE}"/>` +
    `<ellipse cx="80.8" cy="43.6" rx="6" ry="3.4" transform="rotate(-62 80.8 43.6)" fill="${SHOE}"/>`,
  // twisting body, bending back as they topple (the zigzag middle stroke)
  `<path d="M34.4,31 C38,27.4 46,26.4 51.6,27.6 C51.6,37 53.6,46 61,56.4 C61.4,62.6 56.6,67 50.4,66 C40,60 33.4,48 34.4,31Z" fill="${SHIRT}"/>` +
    `<path d="M51.6,27.6 C51.6,37 53.6,46 61,56.4 C61.4,62.6 56.6,67 50.4,66 C55,63 56.4,59 55.2,55.6 C49.6,47 48,38 51.6,27.6Z" fill="${SHIRT_SHADE}"/>`,
  // arms flung out wide (the short top stroke)
  `<path d="M31,28.6 C37,28.6 42,28 47,27 C53,26 59,24.6 65,23.6" fill="none" stroke="${SHIRT}" stroke-width="6.6" stroke-linecap="round"/>` +
    `<circle cx="28.4" cy="28.6" r="3.6" fill="${SKIN}"/><circle cx="68" cy="23.2" r="3.6" fill="${SKIN}"/>`,
  // round head and hair, thrown back in surprise
  `<g transform="rotate(-16 44 24)">` +
    `<circle cx="44" cy="12.6" r="12.4" fill="${SKIN}"/><path d="M52,3.6 C56.6,7 58,13 55.4,18.8 C53,23.4 48.4,25.4 44,25 C51,21 54.6,13 52,3.6Z" fill="${SKIN_SHADE}"/>` +
    `<path d="M31.6,11.6 C31,3.6 36.8,0 44,0 C51.6,0 57,3.6 56.4,11.6 C53.6,7 49,5.4 44,5.6 C39,5.6 34.4,7.4 31.6,11.6Z" fill="${HAIR}"/>` +
    // face: eyes wide, brows up, mouth open in a "Whoa!", pink cheek
    `<ellipse cx="40" cy="13" rx="1.7" ry="2.5" fill="${INK}"/><circle cx="39.5" cy="12.2" r=".6" fill="#fff"/>` +
    `<ellipse cx="48.4" cy="13" rx="1.7" ry="2.5" fill="${INK}"/><circle cx="47.9" cy="12.2" r=".6" fill="#fff"/>` +
    `<path d="M37.6,8.6 L41.6,7.8 M46.6,7.8 L50.6,8.6" stroke="${HAIR}" stroke-width="1" stroke-linecap="round"/>` +
    `<ellipse cx="44.2" cy="19.4" rx="2.4" ry="3" fill="#8A3A3A"/><circle cx="52.4" cy="17" r="1.8" fill="#F2A7A0" opacity=".8"/>` +
    `<path d="M35,6.4 C36.6,4.4 39,3.2 41.4,2.8" fill="none" stroke="#FFF4EE" stroke-width="1" stroke-linecap="round" opacity=".7"/>` +
  `</g>`,
  // highlight
  `<path d="M38,34 C38.4,40 40,46 43,51" fill="none" stroke="#FFF4EE" stroke-width="1.2" stroke-linecap="round" opacity=".7"/>`,
];

export default draw;
