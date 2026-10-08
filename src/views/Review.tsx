import { useCallback, useEffect, useMemo, useState } from 'react';
import KanaStage from '../components/KanaStage';
import { CHART, KANA, type Kana } from '../data/kana';
import type { Progress } from '../lib/progress';

type Format = 'read' | 'find';

/** What to practise: which kind of question, and which rows of the chart. */
interface Settings {
  format: Format | 'mix';
  row: string; // 'all' or a row's first kana, e.g. 'か'
}
// ん has a row of its own in the chart, but on its own it isn't a quiz, so it joins the わ row here.
const ROWS = CHART.map((r) => r[0][0]).filter((r) => r !== 'ん');
const SETTINGS_KEY = 'hiragana-review-settings';
function loadSettings(): Settings {
  try {
    const s = JSON.parse(localStorage.getItem(SETTINGS_KEY) ?? '');
    if (s && ['read', 'find', 'mix'].includes(s.format) && (s.row === 'all' || ROWS.includes(s.row))) return s;
  } catch {
    /* no saved settings */
  }
  return { format: 'mix', row: 'all' };
}
const poolFor = (row: string) =>
  row === 'all' ? KANA : KANA.filter((k) => k.row === row || (row === 'わ' && k.row === 'ん'));
interface Question {
  kana: Kana;
  format: Format;
  options: Kana[];
}

interface Props {
  stats: Progress['review'];
  onResult: (romaji: string, right: boolean) => void;
}

const shuffle = <T,>(a: T[]) => a.map((x) => [Math.random(), x] as const).sort((p, q) => p[0] - q[0]).map((p) => p[1]);

/** Pick a character, weighted towards the ones missed more often. */
function pick(stats: Props['stats'], from: Kana[], last?: string): Kana {
  const pool = from.length > 1 ? from.filter((k) => k.romaji !== last) : from;
  const weights = pool.map((k) => {
    const s = stats[k.romaji] ?? { right: 0, wrong: 0 };
    return (1 + s.wrong * 2) / (1 + s.right * 0.5);
  });
  let r = Math.random() * weights.reduce((a, b) => a + b, 0);
  for (let i = 0; i < pool.length; i++) {
    r -= weights[i];
    if (r <= 0) return pool[i];
  }
  return pool[pool.length - 1];
}

function makeQuestion(stats: Props['stats'], settings: Settings, last?: string): Question {
  const pool = poolFor(settings.row);
  const kana = pick(stats, pool, last);
  // Wrong answers come from the same row when it has enough characters, so the choice stays a real test.
  const near = pool.length >= 4 ? pool : KANA;
  const others = shuffle(near.filter((k) => k !== kana)).slice(0, 3);
  const format = settings.format === 'mix' ? (Math.random() < 0.5 ? 'read' : 'find') : settings.format;
  return { kana, format, options: shuffle([...others, kana]) };
}

export default function Review({ stats, onResult }: Props) {
  const [settings, setSettings] = useState<Settings>(loadSettings);
  const [q, setQ] = useState<Question>(() => makeQuestion(stats, settings));
  const [answer, setAnswer] = useState<Kana | null>(null);
  const [tally, setTally] = useState({ right: 0, asked: 0, streak: 0 });

  const nextQ = useCallback(() => {
    setAnswer(null);
    setQ((prev) => makeQuestion(stats, settings, prev.kana.romaji));
  }, [stats, settings]);

  const changeSettings = (patch: Partial<Settings>) => {
    const next = { ...settings, ...patch };
    setSettings(next);
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable: settings last for this visit */
    }
    setAnswer(null);
    setQ(makeQuestion(stats, next));
  };

  const choose = (k: Kana) => {
    if (answer) return;
    const right = k === q.kana;
    setAnswer(k);
    setTally((t) => ({ right: t.right + (right ? 1 : 0), asked: t.asked + 1, streak: right ? t.streak + 1 : 0 }));
    onResult(q.kana.romaji, right);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (answer && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        nextQ();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [answer, nextQ]);

  const correct = answer === q.kana;
  const stageKey = useMemo(() => `${q.kana.romaji}-${tally.asked}`, [q, tally.asked]);

  return (
    <section className="review" aria-labelledby="review-h">
      <div className="review-bar">
        <div>
          <h1 id="review-h">Review</h1>
          <p>
            {settings.row === 'all' ? `All ${KANA.length} characters` : `The ${settings.row} row`}, shuffled. The ones you miss
            come back more often.
          </p>
        </div>
        <div className="tally">
          <span>
            Streak <b>{tally.streak}</b>
          </span>
          <span>
            Correct <b>{tally.right}</b> of <b>{tally.asked}</b>
          </span>
        </div>
      </div>

      <div className="review-settings">
        <div className="seg" role="group" aria-label="Kind of question">
          {(
            [
              ['mix', 'Mixed'],
              ['read', 'Read the character'],
              ['find', 'Find the character'],
            ] as const
          ).map(([f, label]) => (
            <button key={f} type="button" aria-pressed={settings.format === f} onClick={() => changeSettings({ format: f })}>
              {label}
            </button>
          ))}
        </div>
        <label className="row-pick">
          <span>Rows</span>
          <select value={settings.row} onChange={(e) => changeSettings({ row: e.target.value })}>
            <option value="all">All rows</option>
            {ROWS.map((r) => (
              <option key={r} value={r}>
                {r === 'わ' ? 'わ row and ん' : `${r} row`}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="spread">
        <div className="plate">
          {q.format === 'read' || answer ? (
            <KanaStage
              key={stageKey}
              kana={q.kana}
              picture={!!answer}
              speed={1.4}
              label={answer ? undefined : 'Character to read'}
            />
          ) : (
            <div className="sound-card">
              <span className="lab">Find the character for</span>
              <span className="sound">{q.kana.romaji}</span>
            </div>
          )}
        </div>

        <div className="info">
          <h2>{q.format === 'read' ? 'How do you read this one?' : `Which one is “${q.kana.romaji}”?`}</h2>
          <div className={`opts ${q.format}`}>
            {q.options.map((k) => {
              const state = !answer ? '' : k === q.kana ? 'right' : k === answer ? 'wrong' : '';
              return (
                <button key={k.romaji} type="button" className={`opt ${state}`} disabled={!!answer} onClick={() => choose(k)}>
                  {q.format === 'read' ? k.romaji : <span lang="ja">{k.kana}</span>}
                </button>
              );
            })}
          </div>
          <p className="feedback" aria-live="polite">
            {answer && (
              <>
                {correct ? <span className="ok">Yes. </span> : <span className="no">Not quite. </span>}
                <b lang="ja">{q.kana.kana}</b> is <b>{q.kana.romaji}</b>: {q.kana.title.toLowerCase()}.
              </>
            )}
          </p>
          {answer && (
            <div>
              <button type="button" className="btn primary" onClick={nextQ} autoFocus>
                Next question →
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
