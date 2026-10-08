// か (ka) illustration: a cat mid-stretch. Ka as in cat.
// The slash is its back sloping down to the outstretched front paws, stroke 1 is the raised rump and hind leg,
// and the short third stroke is its tail held high.
// Parts are layered back to front and bloom in one by one.
import type { Draw } from './types';
import { shadow } from './helpers';

const FUR = '#E8913A', SHADE = '#C46F27', CREAM = '#F8E6C8', INK = '#2E2A22';

const draw: Draw = () => [
  shadow(46, 88, 38),
  // tail up and curling over, along the third stroke
  `<path d="M62,34 C65,25 76,22 83,29 C88,34 91,44 90,53" fill="none" stroke="${FUR}" stroke-width="6" stroke-linecap="round"/>` +
    `<path d="M85,32 C88,37 90,44 90,51" fill="none" stroke="${SHADE}" stroke-width="6" stroke-linecap="round"/>`,
  // front legs stretched out along the ground
  `<path d="M36,71 C29,77 21,81 13,83" fill="none" stroke="${SHADE}" stroke-width="5.5" stroke-linecap="round"/>` +
    `<path d="M39,74 C31,80 23,84 15,86" fill="none" stroke="${FUR}" stroke-width="5.5" stroke-linecap="round"/>` +
    `<ellipse cx="13" cy="86.3" rx="3.6" ry="2.2" fill="${CREAM}"/>`,
  // body: rump high, back sloping down to the shoulders, hind leg planted
  `<path d="M56,28 C62,27 68,33 68,42 C68,52 66,62 66,72 C66,78 66,82 65.5,85 L55.5,85 C55,83 56.5,82 59,82 C59,76 58.5,68 57,61 C51,62 44,68 39,74 C35,75 31,71 31,65 C34,58 46,31 56,28Z" fill="${FUR}"/>` +
    `<path d="M63,31 C67,35 68,40 68,46 C67.5,56 66,64 66,72 C66,78 66,82 65.5,85 L62,85 C63.5,72 65,50 63,31Z" fill="${SHADE}"/>`,
  // head low between the shoulders, eyes shut mid-stretch
  `<path d="M19.5,58 L14,47.5 L27,54Z M30,54 L34,44 L37.5,57Z" fill="${FUR}"/><path d="M20,55 L17.5,50.5 L23.5,54Z M32,53.5 L33.8,48.5 L35.5,55Z" fill="#F2A7A0"/>` +
    `<circle cx="27.5" cy="63.5" r="10.5" fill="${FUR}"/>` +
    `<path d="M20.5,62.5 Q22.5,64.5 24.5,62.5 M29.5,62.5 Q31.5,64.5 33.5,62.5" fill="none" stroke="${INK}" stroke-width="1" stroke-linecap="round"/>` +
    `<path d="M25.8,66.5 L29.2,66.5 L27.5,68.3Z" fill="#D9606E"/><path d="M27.5,68.3 Q26,70.3 24.5,69.3 M27.5,68.3 Q29,70.3 30.5,69.3" fill="none" stroke="${INK}" stroke-width=".6" stroke-linecap="round"/>`,
  // highlight along the back
  `<path d="M40,46 C45,37 50,31.5 55.5,30" fill="none" stroke="#FFF4EE" stroke-width="1.4" stroke-linecap="round"/>`,
];

export default draw;
