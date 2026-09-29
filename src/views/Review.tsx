import { useCallback, useEffect, useMemo, useState } from 'react';
import KanaStage from '../components/KanaStage';
import { KANA, type Kana } from '../data/kana';
import type { Progress } from '../lib/progress';

type Format = 'read' | 'find';
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
function pick(stats: Props['stats'], last?: string): Kana {
  const pool = KANA.filter((k) => k.romaji !== last);
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

function makeQuestion(stats: Props['stats'], last?: string): Question {
  const kana = pick(stats, last);
  const others = shuffle(KANA.filter((k) => k !== kana)).slice(0, 3);
  return { kana, format: Math.random() < 0.5 ? 'read' : 'find', options: shuffle([...others, kana]) };
}

export default function Review({ stats, onResult }: Props) {
  const [q, setQ] = useState<Question>(() => makeQuestion(stats));
  const [answer, setAnswer] = useState<Kana | null>(null);
  const [tally, setTally] = useState({ right: 0, asked: 0, streak: 0 });

  const nextQ = useCallback(() => {
    setAnswer(null);
    setQ((prev) => makeQuestion(stats, prev.kana.romaji));
  }, [stats]);

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
          <p>All {KANA.length} characters, shuffled. The ones you miss come back more often.</p>
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
                {correct ? 'Yes. ' : 'Not quite. '}
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
