// う (u) illustration. Parts are layered back to front and bloom in one by one.
import type { Draw } from './types';

const draw: Draw = S=>[
  `<circle cx="94" cy="16" r="10" fill="#F6B55E"/><circle cx="94" cy="16" r="16" fill="#F6B55E" opacity=".2"/>`,
  `<path d="M44,117 C56,86 80,66 100,68 C112,69 118,76 118,84 L118,117Z" fill="#8FC7DA" opacity=".75"/>`,
  `<path d="M33,42.38c2.12,1.12,4.12,2.88,8.5,1.38c4.38-1.5,12.75-7.12,18.5-7c5.75,0.12,10.25,5,10.25,18c0,15.49-8.25,30.24-24.37,41.24 L30,117 L-8,117 L-8,64 C6,50 20,40 33,42.38Z" fill="url(#gSea)"/><path d="M36,50 C46,50 55,44 60,46 C66,48 64,62 58,74" fill="none" stroke="#8DD0E6" stroke-width="1.6" opacity=".7" stroke-linecap="round"/><path d="M-4,84 C8,78 18,82 30,76" fill="none" stroke="#8DD0E6" stroke-width="1.2" opacity=".5" stroke-linecap="round"/>`,
  `<g fill="#fff"><circle cx="35" cy="41" r="3.4"/><circle cx="42" cy="40.5" r="3.8"/><circle cx="49.5" cy="38.2" r="3.4"/><circle cx="56.5" cy="35.4" r="3.8"/><circle cx="63.5" cy="36" r="3.3"/><circle cx="69" cy="41" r="3"/><circle cx="71.4" cy="47.5" r="2.4"/><circle cx="27" cy="44" r="2.6"/><circle cx="76" cy="40" r="1.4"/><circle cx="79" cy="45" r="1"/></g>`,
  `<path d="M53,5 C60,13 66,18.5 64,24 C62,29.5 45,29.5 43,24 C41,18.5 46,12 53,5Z" fill="#A8DCEC"/><ellipse cx="48" cy="20" rx="1.6" ry="2.8" transform="rotate(20 48 20)" fill="#fff" opacity=".85"/>`,
  `<circle cx="30" cy="12" r="1.3" fill="#A8DCEC"/><circle cx="72" cy="10" r="1.6" fill="#A8DCEC"/><circle cx="24" cy="24" r="1" fill="#A8DCEC"/>`
 ];

export default draw;
