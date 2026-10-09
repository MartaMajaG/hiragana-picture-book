// The surface the book lies on, picked in Settings and remembered in this browser.
export const DESKS = [
  { id: 'indigo', jp: '藍染', name: 'Indigo cloth', note: 'Indigo-dyed cotton, stencilled with linked circles' },
  { id: 'wood', jp: '文机', name: 'Wooden desk', note: 'A walnut writing desk under the lamp' },
  { id: 'kinpaku', jp: '金箔', name: 'Gold leaf', note: 'Deep green paper flecked with gold leaf' },
] as const;
export type DeskId = (typeof DESKS)[number]['id'];

const KEY = 'kana-ehon-desk';

export function loadDesk(): DeskId {
  try {
    const d = localStorage.getItem(KEY);
    if (DESKS.some((x) => x.id === d)) return d as DeskId;
  } catch {
    /* storage unavailable */
  }
  return 'indigo';
}

export function applyDesk(d: DeskId) {
  document.documentElement.dataset.desk = d;
  // keep the phone's status bar in the same colour as the desk
  const bar = { indigo: '#1b2a46', wood: '#2a1a10', kinpaku: '#1f302a' }[d];
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', bar);
}

export function saveDesk(d: DeskId) {
  applyDesk(d);
  try {
    localStorage.setItem(KEY, d);
  } catch {
    /* storage unavailable */
  }
}
