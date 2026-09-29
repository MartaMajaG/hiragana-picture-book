// Small, local-only progress store. Lives in this browser; nothing is sent anywhere.

export interface Progress {
  /** Romaji of characters written from memory at least once. */
  written: string[];
  /** Review results per romaji. */
  review: Record<string, { right: number; wrong: number }>;
  /** One-time tips the learner has already dismissed. */
  tipsSeen: string[];
}

const KEY = 'hiragana-picture-book/v1';
const empty = (): Progress => ({ written: [], review: {}, tipsSeen: [] });

export function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...empty(), ...JSON.parse(raw) } : empty();
  } catch {
    return empty();
  }
}

export function saveProgress(p: Progress) {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    /* storage can be blocked (private mode); the app still works without it */
  }
}
