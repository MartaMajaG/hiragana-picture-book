// き (ki) illustration. Parts are layered back to front and bloom in one by one.
import type { Draw } from './types';

const draw: Draw = S=>[
  `<path d="${S[2]}" fill="none" stroke="url(#gGold)" stroke-width="7.5" stroke-linecap="round" stroke-linejoin="round"/><path d="${S[0]}" fill="none" stroke="url(#gGold)" stroke-width="6.5" stroke-linecap="round"/><path d="${S[1]}" fill="none" stroke="url(#gGold)" stroke-width="6.5" stroke-linecap="round"/>`,
  `<ellipse cx="53" cy="82.5" rx="17.5" ry="10.5" fill="none" stroke="url(#gGold)" stroke-width="7"/><ellipse cx="53" cy="82.5" rx="9" ry="4.4" fill="none" stroke="#A8741E" stroke-width="1" opacity=".6"/>`,
  `<path d="M45,17 C51,31 58,42 66,52" fill="none" stroke="#FFF3C6" stroke-width="1.3" stroke-linecap="round" opacity=".85"/><path d="M42,76 C48,73 58,73 64,76" fill="none" stroke="#FFF3C6" stroke-width="1.1" stroke-linecap="round" opacity=".8"/>`,
  `<path d="M53,93 C52,98 55,100 53,104" fill="none" stroke="#C2303A" stroke-width="2" stroke-linecap="round"/><circle cx="53" cy="104" r="2.2" fill="#C2303A"/><path d="M50.5,105 L48.5,116 M52,105.5 L51.5,116.5 M53.5,105.5 L54.5,116.5 M55.5,105 L57.5,116" stroke="#C2303A" stroke-width="1.3" stroke-linecap="round"/>`
 ];

export default draw;
