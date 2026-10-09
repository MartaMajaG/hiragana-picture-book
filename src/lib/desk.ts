// The surface the book lies on, picked in Settings and remembered in this browser. Real photographs (see the credits
// in the README); `tile` ones repeat at that size, the rest cover the window. `tone` says whether text written straight
// on the desk should be light (on dark desks) or dark (on light ones).
export const DESKS = [
  { id: 'katazome', jp: '型染', name: 'Indigo stencil-dye', note: 'Indigo cloth with circles and vines (Met Museum)', file: 'indigo-katazome.jpg', tone: 'dark', bar: '#1c3a63' },
  { id: 'floral', jp: '藍花', name: 'Indigo flowers', note: 'Indigo cotton printed with white blossoms', file: 'indigo-floral.jpg', tone: 'dark', bar: '#26476e' },
  { id: 'wood', jp: '文机', name: 'Dark wood', note: 'A dark wooden writing desk', file: 'wood.jpg', tone: 'dark', bar: '#2a1a12', tile: 800 },
  { id: 'flowers', jp: '花絵', name: 'Painted blossoms', note: 'A Japanese painting of pink blossoms (Cleveland Museum of Art)', file: 'flowers.jpg', tone: 'light', bar: '#e9e2d3' },
] as const;
export type DeskId = (typeof DESKS)[number]['id'];

const KEY = 'kana-ehon-desk';

export const deskImage = (d: (typeof DESKS)[number]) => `url("${import.meta.env.BASE_URL}backgrounds/${d.file}")`;

export function loadDesk(): DeskId {
  try {
    const d = localStorage.getItem(KEY);
    if (DESKS.some((x) => x.id === d)) return d as DeskId;
  } catch {
    /* storage unavailable */
  }
  return 'katazome';
}

export function applyDesk(id: DeskId) {
  const d = DESKS.find((x) => x.id === id) ?? DESKS[0];
  const root = document.documentElement;
  root.dataset.desk = d.id;
  root.dataset.tone = d.tone;
  root.style.setProperty('--desk-img', deskImage(d));
  root.style.setProperty('--desk-size', 'tile' in d ? `${d.tile}px` : 'cover');
  root.style.setProperty('--desk-repeat', 'tile' in d ? 'repeat' : 'no-repeat');
  // keep the phone's status bar in the same colour as the desk
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', d.bar);
}

export function saveDesk(d: DeskId) {
  applyDesk(d);
  try {
    localStorage.setItem(KEY, d);
  } catch {
    /* storage unavailable */
  }
}
