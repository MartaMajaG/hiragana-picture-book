// し (shi) illustration: a little ship dropping its anchor. Shi as in ship.
// The ship floats at the top where the stroke starts; the stroke is the anchor chain dropping straight down
// from its hull into the anchor's shank, and the curve at the bottom is the anchor's big arm sweeping up to its fluke.
// Parts are layered back to front and bloom in one by one.
import type { Draw } from './types';

const IRON = '#56688A', SHADE = '#3F4E6B', HULL = '#D9604E', HULL_SHADE = '#B04637', SAIL = '#F6EEDD', SAIL_SHADE = '#DDCFB2', JIB = '#F0B84A', JIB_SHADE = '#D39A2E', WOOD = '#C99A62';

const draw: Draw = S => [
  // the anchor's short arm on the far side, in shade
  `<path d="M38.5,82 C33,82.5 27,80 23,75" fill="none" stroke="${SHADE}" stroke-width="4.6" stroke-linecap="round"/>` +
    `<path d="M17.5,68.5 L31,73.5 L25,76.8 L20.5,84Z" fill="${SHADE}"/>`,
  // chain links dropping from the hull, along the top of the stroke
  `<path d="M39.12,17.5c1.25,3.12,0.93,6.74,0.38,10.25c-0.4,2.8-0.8,5.4-1,8" fill="none" stroke="${SHADE}" stroke-width="3.6" stroke-dasharray="3.2 1.6" stroke-linecap="round"/>` +
    `<path d="M39.12,17.5c1.25,3.12,0.93,6.74,0.38,10.25c-0.4,2.8-0.8,5.4-1,8" fill="none" stroke="${IRON}" stroke-width="1.6" stroke-dasharray="3.2 1.6" stroke-linecap="round"/>`,
  // anchor shank and big arm, along the rest of the stroke
  `<path d="M38,42 C37,50 36.5,58 36.5,66.87 C36.5,94.25 56.38,97 82,84.12" fill="none" stroke="${IRON}" stroke-width="6" stroke-linecap="round"/>` +
    `<path d="M39.6,44 C39.2,52 38.8,58 38.8,67 C38.8,88 54,94 72,89.5" fill="none" stroke="${SHADE}" stroke-width="2" stroke-linecap="round"/>` +
    // pointed fluke at the tip of the arm
    `<path d="M90,79.8 L73.8,78.6 L80.6,84.8 L79.4,92.6Z" fill="${IRON}"/><path d="M90,79.8 L80.6,84.8 L79.4,92.6Z" fill="${SHADE}"/>`,
  // ring at the top of the shank, and the stock crossbar
  `<circle cx="38.2" cy="39.5" r="3.6" fill="none" stroke="${IRON}" stroke-width="2.4"/>` +
    `<rect x="26" y="45" width="24" height="4.6" rx="2.3" fill="${IRON}"/>` +
    `<rect x="26" y="47.6" width="24" height="2" rx="1" fill="${SHADE}"/>` +
    `<circle cx="26" cy="47.3" r="3" fill="${IRON}"/><circle cx="50" cy="47.3" r="3" fill="${IRON}"/>`,
  // little mast with a big yellow main sail and a small white jib
  `<path d="M44,-1.6 V10" stroke="${WOOD}" stroke-width="2" stroke-linecap="round"/>` +
    `<path d="M42.6,-1 C36,2.6 28,6.6 21,10 L42.6,10Z" fill="${JIB}"/>` +
    `<path d="M42.6,-1 C40.4,3.4 39,7 38.2,10 L42.6,10Z" fill="${JIB_SHADE}"/>` +
    `<path d="M45.4,0 L58,10 L45.4,10Z" fill="${SAIL}"/>` +
    `<path d="M45.4,0 L58,10 L52.4,10Z" fill="${SAIL_SHADE}"/>`,
  // round little hull, bow rising on the right, with portholes
  `<path d="M14,10.4 L68,8.8 C66.6,14 62,18.6 54,20.2 C45,21.6 31,21.4 24,19.8 C18.4,18.4 15,15 14,10.4Z" fill="${HULL}"/>` +
    `<path d="M68,8.8 C66.6,14 62,18.6 54,20.2 C48,21.2 42,21.4 37,21.2 C49,19.2 58,15.4 61.6,9Z" fill="${HULL_SHADE}"/>` +
    `<path d="M13.4,10.4 L68.6,8.8" stroke="${WOOD}" stroke-width="2.2" stroke-linecap="round"/>` +
    `<circle cx="26.6" cy="14.6" r="2.2" fill="${SAIL}" stroke="${HULL_SHADE}" stroke-width="1"/>` +
    `<circle cx="51" cy="14.2" r="2.2" fill="${SAIL}" stroke="${HULL_SHADE}" stroke-width="1"/>` +
    // hawse hole the chain runs out of
    `<circle cx="39.2" cy="17.8" r="1.6" fill="${SHADE}"/>`,
  // highlights
  `<path d="M17.4,13.4 C18.8,16 20.6,17.6 23,18.6" fill="none" stroke="#FFF4EE" stroke-width="1" stroke-linecap="round" opacity=".8"/>` +
    `<path d="M34.4,48 C34,54 33.8,60 33.8,66" fill="none" stroke="#FFF4EE" stroke-width="1.1" stroke-linecap="round" opacity=".8"/>` +
    `<path d="M28.6,46 H38" stroke="#FFF4EE" stroke-width="0.9" stroke-linecap="round" opacity=".8"/>`,
];

export default draw;
