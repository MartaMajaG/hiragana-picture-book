// ぬ (nu) illustration: a bowl of noodles with chopsticks. Nu as in noodles.
// The first stroke and the start of the second are the two chopsticks, pinched together in the bowl;
// the rest of the second stroke is the noodles swirling round the bowl and curling up at the end.
// Parts are layered back to front and bloom in one by one.
import type { Draw } from './types';
import { shadow } from './helpers';

const BOWL = '#D9534A', BOWL_SHADE = '#B23D36', BROTH = '#E9A65A', NOODLE = '#FBE3A0', NOODLE_SHADE = '#E3BE62', WOOD = '#B9814E', WOOD_SHADE = '#946038';

// The noodle part of the second stroke, from the chopstick tips round the bowl to the curl.
const NOODLES =
  'M39.6,73.8 C27.7,94.8 19,75 19,69.2 C19,46.6 62.7,25 81.4,39.7 C89,45.7 91.2,54.2 90.5,63 C88.5,89.8 57.6,91.4 57.6,79.9 C57.6,70.5 75,72.8 84.7,78.8 C87.8,80.7 92,84 94.2,86.3';

const strand = (dx: number, dy: number, w: number, c: string) =>
  `<path d="${NOODLES}" transform="translate(${dx} ${dy})" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;

/** A chopstick from its thick end (x1,y1) tapering to the tip (x2,y2). */
function chopstick(x1: number, y1: number, x2: number, y2: number) {
  const a = Math.atan2(y2 - y1, x2 - x1), nx = -Math.sin(a), ny = Math.cos(a), w1 = 1.9, w2 = 1;
  const p = (x: number, y: number, w: number, s: number) => `${(x + nx * w * s).toFixed(2)},${(y + ny * w * s).toFixed(2)}`;
  return `<path d="M${p(x1, y1, w1, 1)} L${p(x2, y2, w2, 1)} L${p(x2, y2, w2, -1)} L${p(x1, y1, w1, -1)}Z" fill="${WOOD}"/>` +
    `<path d="M${p(x1, y1, w1, 1)} L${p(x2, y2, w2, 1)} L${p(x2, y2, 0, 1)} L${p(x1, y1, 0, 1)}Z" fill="${WOOD_SHADE}"/>`;
}

const draw: Draw = () => [
  shadow(55, 104, 30),
  // the bowl, seen from a little above: body, foot and the rim
  `<path d="M14,60 C15,84 33,100 55,100 C77,100 95,84 96,60Z" fill="${BOWL}"/>` +
    `<path d="M72,97 C87,90 95,77 96,60 L86,60 C85,76 81,88 72,97Z" fill="${BOWL_SHADE}"/>` +
    `<path d="M44,99 L45,103 L65,103 L66,99Z" fill="${BOWL_SHADE}"/>` +
    `<ellipse cx="55" cy="60" rx="41" ry="31" fill="${BOWL}"/>`,
  // the broth inside
  `<ellipse cx="55" cy="61" rx="37.5" ry="27.5" fill="${BROTH}"/>` +
    `<path d="M22,50 C30,38 42,33 55,33.5 C40,36 29,43 22,50Z" fill="#fff" opacity=".35"/>`,
  // the noodles: a few strands swirling round the bowl along the second stroke
  strand(2.4, 1.6, 3.4, NOODLE_SHADE) + strand(-2.2, -1.2, 3.4, NOODLE_SHADE) +
    strand(2.4, 1.6, 2.2, NOODLE) + strand(-2.2, -1.2, 2.2, NOODLE) +
    strand(0, 0, 3.8, NOODLE_SHADE) + strand(0, 0, 2.8, NOODLE),
  // the two chopsticks, pinched together at the noodles (the first stroke and the start of the second)
  chopstick(25.4, 27.5, 43.6, 80.5) + chopstick(58, 18.5, 40.4, 73),
  // highlight on the rim
  `<path d="M20,52 C24,42 33,35.5 43,32.5" fill="none" stroke="#FFF4EE" stroke-width="1.4" stroke-linecap="round"/>`,
];

export default draw;
