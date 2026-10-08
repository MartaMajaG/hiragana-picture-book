// Small, local-only progress store. Lives in this browser; nothing is sent anywhere.

export interface Progress {
  /** Romaji of characters written from memory at least once. */
  written: string[];
  /** Review results per romaji. */
  review: Record<string, { right: number; wrong: number }>;
  /** One-time tips the learner has already dismissed. */
  tipsSeen: string[];
  /** Romaji of lessons opened at least once. */
  opened: string[];
  /** Mon (文), points earned. Named after the Edo-period copper coin. */
  mon: number;
  /** Characters written from memory with no retries. */
  perfect: number;
  /** Review questions answered, and the current and best run of correct answers in a row. */
  answered: number;
  run: number;
  bestRun: number;
  /** Days in a row with some practice. `last` is the local date (YYYY-MM-DD) of the latest active day. */
  days: { last: string; streak: number; best: number };
  /** Practised late at night, or early in the morning (for secret stickers). */
  late: boolean;
  early: boolean;
  /** Stickers earned: id → ISO date. */
  stickers: Record<string, string>;
}

const KEY = 'hiragana-picture-book/v1';
const empty = (): Progress => ({
  written: [], review: {}, tipsSeen: [], opened: [], mon: 0, perfect: 0, answered: 0, run: 0, bestRun: 0,
  days: { last: '', streak: 0, best: 0 }, late: false, early: false, stickers: {},
});

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

/** How many mon each action earns. */
export const MON = { open: 1, write: 5, rewrite: 2, perfect: 3, right: 1, runBonus5: 1, runBonus10: 2, newDay: 3 };

const dayKey = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

/** Any practice counts towards the daily streak; the first activity of a new day earns a small bonus. */
export function touchDay(p: Progress, now = new Date()): Progress {
  const today = dayKey(now);
  const hour = now.getHours();
  const late = p.late || hour >= 22 || hour < 4;
  const early = p.early || (hour >= 4 && hour < 7);
  if (p.days.last === today) return late === p.late && early === p.early ? p : { ...p, late, early };
  const y = new Date(now);
  y.setDate(y.getDate() - 1);
  const streak = p.days.last === dayKey(y) ? p.days.streak + 1 : 1;
  return { ...p, late, early, mon: p.mon + MON.newDay, days: { last: today, streak, best: Math.max(p.days.best, streak) } };
}

/** The daily streak as it stands today: it lapses if yesterday was missed. */
export function currentStreak(p: Progress, now = new Date()): number {
  const y = new Date(now);
  y.setDate(y.getDate() - 1);
  return p.days.last === dayKey(now) || p.days.last === dayKey(y) ? p.days.streak : 0;
}
