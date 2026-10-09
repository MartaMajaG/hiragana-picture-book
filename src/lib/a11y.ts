import type { KeyboardEvent } from 'react';

/**
 * Arrow-key navigation for a tablist or radiogroup, as the ARIA patterns expect: ← → (and ↑ ↓) move to the
 * previous or next enabled tab/radio and select it, Home and End jump to the ends.
 */
export function arrowKeys(e: KeyboardEvent<HTMLElement>) {
  const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'];
  if (!keys.includes(e.key)) return;
  const items = [...e.currentTarget.querySelectorAll<HTMLElement>('[role="tab"]:not(:disabled), [role="radio"]:not(:disabled)')];
  const at = items.indexOf(document.activeElement as HTMLElement);
  if (at < 0 || !items.length) return;
  e.preventDefault();
  const next =
    e.key === 'Home' ? 0 : e.key === 'End' ? items.length - 1 : (at + (e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 1) + items.length) % items.length;
  items[next].focus();
  items[next].click();
}
