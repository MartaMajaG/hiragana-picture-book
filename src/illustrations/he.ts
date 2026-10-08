// へ (he) illustration: a hedgehog trundling along. He as in hedgehog.
// The single stroke is its spiny back: the short rise on the left is its forehead climbing to the top of its head,
// and the long slope down to the right is the prickles running down to its rump. Parts are layered back to front and bloom in one by one.
import type { Draw } from './types';
import { shadow } from './helpers';

const SPINE = '#8C6A4F', SPINE_SHADE = '#6E513C', TIP = '#D9C2A6', FACE = '#E8C9A2', FACE_SHADE = '#CFA97F', INK = '#2E2A22';

// Points along the back, just outside the stroke, from forehead to rump.
const BACK: [number, number][] = [
  [24, 45], [30, 40.5], [36, 35.5], [42, 32.5], [48, 34.5], [55, 40], [62, 45.8], [69, 51.6], [76, 57.4], [83, 63.4], [90, 69.6], [96, 76],
];

/** Zigzag of prickles: between each pair of back points, a spike pointing up and back. */
function prickles(pts: [number, number][], len: number) {
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let k = 1; k < pts.length; k++) {
    const [x0, y0] = pts[k - 1], [x1, y1] = pts[k];
    const mx = (x0 + x1) / 2, my = (y0 + y1) / 2, dx = x1 - x0, dy = y1 - y0, L = Math.hypot(dx, dy);
    // outward normal (up), nudged backwards so the spikes sweep towards the tail
    const nx = dy / L, ny = -dx / L;
    d += ` L${(mx + nx * len + dx / L * 2.5).toFixed(2)},${(my + ny * len + dy / L * 2.5).toFixed(2)} L${x1},${y1}`;
  }
  return d;
}

const draw: Draw = () => [
  shadow(56, 88, 40),
  // far legs, in shade
  `<ellipse cx="40" cy="85" rx="3.4" ry="2.6" fill="${FACE_SHADE}"/><ellipse cx="80" cy="85" rx="3.4" ry="2.6" fill="${FACE_SHADE}"/>`,
  // face and tummy, under the prickly coat
  `<path d="M28,46 C20,47 13,52 7.5,58.5 C9,62.5 15,64.5 22,66 C28,72 34,80 44,84 L86,84 L60,58Z" fill="${FACE}"/>` +
    `<path d="M9.5,61.8 C14,64 18,65 22,66 C27,71 32,77 38,81 C30,78 24,72 20,68.5 C16,67 12,65 9.5,61.8Z" fill="${FACE_SHADE}"/>`,
  // the prickly coat along the stroke
  `<path d="${prickles(BACK, 6.5)} C98,80 96,84 90,84 L50,84 C44,78 36,66 30,52 C29,49 27,47 24,45Z" fill="${SPINE}"/>` +
    `<path d="M92,72 C97,78 95,84 90,84 L58,84 C74,82 88,79 92,72Z" fill="${SPINE_SHADE}"/>` +
    `<path d="M40,45 l3,-4 M50,47 l3,-4 M60,53 l3,-4 M70,61 l3,-4 M80,69 l3,-4 M46,58 l3,-4 M58,64 l3,-4 M70,72 l3,-4 M56,74 l3,-4" stroke="${TIP}" stroke-width="1.2" stroke-linecap="round"/>`,
  // near legs
  `<ellipse cx="46" cy="86" rx="3.6" ry="2.6" fill="${FACE}"/><ellipse cx="86" cy="86" rx="3.6" ry="2.6" fill="${FACE}"/>`,
  // nose, eye, ear, cheek
  `<circle cx="8" cy="58.8" r="2.3" fill="${INK}"/>` +
    `<ellipse cx="21" cy="53.5" rx="1.8" ry="2.4" fill="${INK}"/><circle cx="20.5" cy="52.7" r=".6" fill="#fff"/>` +
    `<ellipse cx="29.5" cy="47.5" rx="2.6" ry="3.2" fill="${FACE_SHADE}"/>` +
    `<ellipse cx="22" cy="60" rx="2.6" ry="1.8" fill="#EDB8B4"/>`,
  // highlights on the forehead and the front of the coat
  `<path d="M13,55 C15.5,51.5 18.5,49.5 22,48.6" fill="none" stroke="#FFF4EE" stroke-width="1.2" stroke-linecap="round"/>` +
    `<path d="M33,44 C35.5,41 38.5,38.6 42,37.4" fill="none" stroke="#FFF4EE" stroke-width="1.3" stroke-linecap="round" opacity=".8"/>`,
];

export default draw;
