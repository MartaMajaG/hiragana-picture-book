import { useCallback, useEffect, useRef, useState } from 'react';
import KanaStage from '../components/KanaStage';
import TracePad, { type TracePhase } from '../components/TracePad';
import { KANA, STROKES, kanaIndex, type Kana } from '../data/kana';
import Egg, { kanjiNum, numberNote } from '../components/Egg';

export type LessonMode = 'learn' | 'practice';

/**
 * Print details for the spread, each a little easter egg with a note: folios (each lesson is one opening, two pages),
 * the running head, the owner's seal and the silk bookmark.
 */
function PrintDetails({ kana }: { kana: Kana }) {
  const left = kanaIndex(kana.romaji) * 2 + 1;
  const rowRomaji = KANA.find((k) => k.kana === kana.row)?.romaji ?? kana.romaji;
  return (
    <>
      <Egg className="folio l" note={numberNote(left)}>{kanjiNum(left)}</Egg>
      <Egg className="folio r" note={numberNote(left + 1)}>{kanjiNum(left + 1)}</Egg>
      <Egg
        className="hashira"
        place="left"
        note={
          <>
            <b lang="ja">{kana.row}行</b> <i>{rowRomaji}-gyō</i> · the {rowRomaji} row. <b lang="ja">かな絵本</b>{' '}
            <i>kana ehon</i> · kana picture book, the name of this book.
            <span className="egg-fact">
              Old Japanese books printed the title down the outer margin of every page. It's called the hashira, the
              pillar.
            </span>
          </>
        }
      >
        {kana.row}行　かな絵本
      </Egg>
      <Egg
        className="zousho"
        place="left"
        note={
          <>
            <b lang="ja">絵本</b> <i>ehon</i> · picture book: 絵 picture + 本 book.
            <span className="egg-fact">
              Book lovers stamped their books with a red seal called a zōshoin, a collection seal. Some old books carry a
              whole trail of them, one for each owner.
            </span>
          </>
        }
      >
        絵本
      </Egg>
      <Egg
        className="shiori"
        place="right"
        note={
          <>
            <b lang="ja">栞</b> <i>shiori</i> · bookmark.
            <span className="egg-fact">
              It comes from shiori, bending twigs to mark your way through a forest so you could find the path back.
            </span>
          </>
        }
      >
        {''}
      </Egg>
    </>
  );
}

interface Props {
  index: number;
  mode: LessonMode;
  onMode: (m: LessonMode) => void;
  onGo: (index: number) => void;
  onWritten: (romaji: string, retries: number) => void;
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
  chevronLeft: (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 3 5 8l5 5" />
    </svg>
  ),
  chevronRight: (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m6 3 5 5-5 5" />
    </svg>
  ),
};

export default function Lesson({ index, mode, onMode, onGo, onWritten, showPracticeTip, onDismissTip }: Props) {
  const kana = KANA[index];
  const prev = KANA[(index - 1 + KANA.length) % KANA.length];
  const next = KANA[(index + 1) % KANA.length];

  // Swipe across the book to turn the page (but not while writing on the practice pad).
  const touchX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = (e.target as HTMLElement).closest('.pad') ? null : e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 60) onGo(index + (dx < 0 ? 1 : -1));
  };

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
      </div>

      <div className="book" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {/* index tabs sticking out of the top of the book */}
        <div className="book-tabs" role="tablist" aria-label="Lesson mode">
          {(['learn', 'practice'] as const).map((m) => (
            <button key={m} type="button" role="tab" aria-selected={mode === m} className={`tab ${m}`} onClick={() => onMode(m)}>
              <span lang="ja">{m === 'learn' ? '学ぶ' : '書く'}</span>
              {m === 'learn' ? 'Learn' : 'Practice'}
            </button>
          ))}
        </div>
        <button type="button" className="turn prev" onClick={() => onGo(index - 1)} aria-label={`Previous page: ${prev.kana}`}>
          {icon.chevronLeft}
          <span lang="ja">{prev.kana}</span>
        </button>
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
        <button type="button" className="turn next" onClick={() => onGo(index + 1)} aria-label={`Next page: ${next.kana}`}>
          {icon.chevronRight}
          <span lang="ja">{next.kana}</span>
        </button>
      </div>
    </section>
  );
}

function LearnPanel({ kana, onPractice }: { kana: Kana; onPractice: () => void }) {
  const [picture, setPicture] = useState(true);
  const [replay, setReplay] = useState(0);
  return (
    <div className="spread">
      <PrintDetails kana={kana} />
      <div className="plate">
        <KanaStage kana={kana} picture={picture} numbers={!picture} replayKey={replay} />
        <Egg
          className="tate"
          place="left"
          note={
            <>
              <b lang="ja">{kana.word.kana}</b> <i>{kana.word.reading}</i>
              <span className="egg-fact">
                Written top to bottom, right to left: tategaki. Most Japanese novels, newspapers and manga are still printed
                this way.
              </span>
            </>
          }
        >
          {kana.word.kana}
        </Egg>
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
            <dt>Example word</dt>
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
  onWritten: (romaji: string, retries: number) => void;
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
      <PrintDetails kana={kana} />
      <div className="plate">
        <TracePad
          key={round}
          kana={kana}
          phase={phase}
          onPhaseChange={setPhase}
          onFeedback={setFeedback}
          onProgress={setProgress}
          onWritten={(retries) => onWritten(kana.romaji, retries)}
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
      <div className="info practice-info">
        <ol className="steps">
          {steps.map(([id, label], j) => (
            <li key={id} className={id === phase ? 'on' : j < order.indexOf(phase) ? 'ok' : ''}>
              {label}
            </li>
          ))}
        </ol>
        <h2>{prompt}</h2>
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
