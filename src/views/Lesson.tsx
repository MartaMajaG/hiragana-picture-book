import { useCallback, useEffect, useState } from 'react';
import KanaStage from '../components/KanaStage';
import TracePad, { type TracePhase } from '../components/TracePad';
import { KANA, STROKES, type Kana } from '../data/kana';

export type LessonMode = 'learn' | 'practice';

interface Props {
  index: number;
  mode: LessonMode;
  onMode: (m: LessonMode) => void;
  onGo: (index: number) => void;
  onWritten: (romaji: string) => void;
  showPracticeTip: boolean;
  onDismissTip: () => void;
}

const icon = {
  replay: (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
      <path d="M13 8a5 5 0 1 1-1.6-3.7" />
      <path d="M13 2.5v3h-3" />
    </svg>
  ),
  eye: (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
      <path d="M1.5 8s2.5-4.5 6.5-4.5S14.5 8 14.5 8 12 12.5 8 12.5 1.5 8 1.5 8Z" />
      <circle cx="8" cy="8" r="2" />
    </svg>
  ),
};

export default function Lesson({ index, mode, onMode, onGo, onWritten, showPracticeTip, onDismissTip }: Props) {
  const kana = KANA[index];
  const prev = KANA[(index - 1 + KANA.length) % KANA.length];
  const next = KANA[(index + 1) % KANA.length];

  return (
    <section className="lesson" aria-label={`Lesson: ${kana.kana}`}>
      <div className="lesson-bar">
        <div className="lesson-id">
          <span className="k" lang="ja">{kana.kana}</span>
          <span className="r">{kana.romaji}</span>
          <span className="pos">
            {kana.row} row · {index + 1} of {KANA.length}
          </span>
        </div>
        <div className="seg" role="tablist" aria-label="Lesson mode">
          {(['learn', 'practice'] as const).map((m) => (
            <button key={m} type="button" role="tab" aria-selected={mode === m} onClick={() => onMode(m)}>
              {m === 'learn' ? 'Learn' : 'Practice'}
            </button>
          ))}
        </div>
        <div className="step-nav">
          <button type="button" className="btn ghost" onClick={() => onGo(index - 1)} aria-label={`Previous: ${prev.kana}`}>
            ← <span lang="ja">{prev.kana}</span>
          </button>
          <button type="button" className="btn ghost" onClick={() => onGo(index + 1)} aria-label={`Next: ${next.kana}`}>
            <span lang="ja">{next.kana}</span> →
          </button>
        </div>
      </div>

      {mode === 'learn' ? (
        <LearnPanel kana={kana} onPractice={() => onMode('practice')} />
      ) : (
        <PracticePanel
          key={kana.romaji}
          kana={kana}
          next={next}
          onNext={() => onGo(index + 1)}
          onWritten={onWritten}
          showTip={showPracticeTip}
          onDismissTip={onDismissTip}
        />
      )}
    </section>
  );
}

function LearnPanel({ kana, onPractice }: { kana: Kana; onPractice: () => void }) {
  const [picture, setPicture] = useState(true);
  const [replay, setReplay] = useState(0);
  return (
    <div className="spread">
      <div className="plate">
        <KanaStage kana={kana} picture={picture} numbers={!picture} replayKey={replay} />
        <div className="tools">
          <button type="button" className="chip" onClick={() => setReplay((r) => r + 1)}>
            {icon.replay}Replay strokes
          </button>
          <div className="seg small" role="group" aria-label="View">
            <button type="button" aria-pressed={picture} onClick={() => setPicture(true)}>
              Picture
            </button>
            <button type="button" aria-pressed={!picture} onClick={() => setPicture(false)}>
              Strokes
            </button>
          </div>
        </div>
      </div>
      <div className="info">
        <h2>{kana.title}</h2>
        <p className="story">{kana.story}</p>
        <dl className="facts">
          <div>
            <dt>Strokes</dt>
            <dd>{STROKES[kana.kana].length}</dd>
          </div>
          <div>
            <dt>Sounds like</dt>
            <dd>{kana.sounds}</dd>
          </div>
          <div className="wide">
            <dt>First word</dt>
            <dd>
              <span className="word" lang="ja">
                {kana.word.kana}
              </span>
              {kana.word.reading}
            </dd>
          </div>
        </dl>
        <div>
          <button type="button" className="btn primary" onClick={onPractice}>
            Practise writing <span lang="ja">{kana.kana}</span> →
          </button>
        </div>
      </div>
    </div>
  );
}

interface PracticeProps {
  kana: Kana;
  next: Kana;
  onNext: () => void;
  onWritten: (romaji: string) => void;
  showTip: boolean;
  onDismissTip: () => void;
}

function PracticePanel({ kana, next, onNext, onWritten, showTip, onDismissTip }: PracticeProps) {
  const [phase, setPhase] = useState<TracePhase>('trace');
  const [feedback, setFeedback] = useState('');
  const [progress, setProgress] = useState(0);
  const [hintKey, setHintKey] = useState(0);
  const [round, setRound] = useState(0);
  const n = STROKES[kana.kana].length;

  useEffect(() => {
    if (phase === 'done') onWritten(kana.romaji);
  }, [phase, kana.romaji, onWritten]);

  const restart = useCallback(() => {
    setPhase('trace');
    setFeedback('');
    setRound((r) => r + 1);
  }, []);

  const steps: [TracePhase, string][] = [
    ['trace', 'Trace'],
    ['memory', 'From memory'],
    ['done', 'Done'],
  ];
  const order = steps.map((s) => s[0]);
  const prompt =
    phase === 'trace'
      ? `Trace stroke ${progress + 1} of ${n}`
      : phase === 'memory'
        ? `Write stroke ${progress + 1} of ${n} from memory`
        : `You wrote ${kana.kana} from memory`;

  return (
    <div className="spread">
      <div className="plate">
        <TracePad
          key={round}
          kana={kana}
          phase={phase}
          onPhaseChange={setPhase}
          onFeedback={setFeedback}
          onProgress={setProgress}
          hintKey={hintKey}
        />
        {showTip && (
          <div className="coach" role="note">
            <p>
              <strong>Press and drag to write.</strong> Start each stroke at the number. On a phone or tablet, use your finger.
            </p>
            <button type="button" className="btn primary small" onClick={onDismissTip}>
              Got it
            </button>
          </div>
        )}
        <div className="tools">
          {phase === 'done' ? (
            <button type="button" className="chip" onClick={restart}>
              {icon.replay}Practise again
            </button>
          ) : (
            <>
              <button type="button" className="chip" onClick={() => setHintKey((h) => h + 1)}>
                {icon.eye}Show me
              </button>
              <button type="button" className="chip" onClick={restart}>
                {icon.replay}Start over
              </button>
            </>
          )}
        </div>
      </div>
      <div className="info">
        <ol className="steps">
          {steps.map(([id, label], j) => (
            <li key={id} className={id === phase ? 'on' : j < order.indexOf(phase) ? 'ok' : ''}>
              {label}
            </li>
          ))}
        </ol>
        <h2>{prompt}</h2>
        <div className="pips" aria-hidden="true">
          {Array.from({ length: n }, (_, j) => (
            <span key={j} className={phase === 'done' || j < progress ? 'ok' : j === progress ? 'now' : ''} />
          ))}
        </div>
        <p className="feedback" aria-live="polite">
          {feedback}
          {phase === 'done' && (
            <>
              {' '}
              <b>{kana.title}</b>, read <b>{kana.romaji}</b>.
            </>
          )}
        </p>
        {phase === 'done' && (
          <div>
            <button type="button" className="btn primary" onClick={onNext}>
              Next: <span lang="ja">{next.kana}</span> →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
