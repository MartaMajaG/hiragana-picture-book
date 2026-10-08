// き (ki) illustration: a key. Ki sounds like key.
// The two short strokes are the teeth, the long diagonal is the shaft, the bottom curve is the bow.
// Parts are layered back to front and bloom in one by one.
import type { Draw } from './types';

const GOLD = '#E3B04B', SHADE = '#B8862E';

const draw: Draw = S=>[
  `<path d="${S[2]}" fill="none" stroke="${GOLD}" stroke-width="7.5" stroke-linecap="round" stroke-linejoin="round"/><path d="${S[0]}" fill="none" stroke="${GOLD}" stroke-width="6.5" stroke-linecap="round"/><path d="${S[1]}" fill="none" stroke="${GOLD}" stroke-width="6.5" stroke-linecap="round"/>`,
  `<ellipse cx="53" cy="82.5" rx="17.5" ry="10.5" fill="none" stroke="${GOLD}" stroke-width="7"/><path d="M36.5,85 C40,92 48,94 56,93.6 C63,93 68,90.5 70,86.5" fill="none" stroke="${SHADE}" stroke-width="3" stroke-linecap="round"/>`,
  `<path d="M45,17 C51,31 58,42 66,52" fill="none" stroke="#FFF4DA" stroke-width="1.3" stroke-linecap="round"/><path d="M42,76 C48,73 58,73 64,76" fill="none" stroke="#FFF4DA" stroke-width="1.1" stroke-linecap="round"/>`,
  `<path d="M53,93 C52,98 55,100 53,104" fill="none" stroke="#C2303A" stroke-width="2" stroke-linecap="round"/><circle cx="53" cy="104" r="2.2" fill="#C2303A"/><path d="M50.5,105 L48.5,112 M52,105.5 L51.5,112.5 M53.5,105.5 L54.5,112.5 M55.5,105 L57.5,112" stroke="#C2303A" stroke-width="1.3" stroke-linecap="round"/>`
 ];

export default draw;
