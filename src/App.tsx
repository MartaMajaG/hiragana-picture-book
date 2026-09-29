import { useCallback, useEffect, useState } from 'react';
import SvgDefs from './components/SvgDefs';
import KanaChart from './components/KanaChart';
import HelpSheet, { type HelpTopic } from './components/HelpSheet';
import Lesson, { type LessonMode } from './views/Lesson';
import Review from './views/Review';
import { KANA, kanaIndex } from './data/kana';
import { loadProgress, saveProgress, type Progress } from './lib/progress';

type Route = { view: 'lesson'; index: number; mode: LessonMode } | { view: 'review' };

// Routes live in the URL hash so they survive a reload and can be linked: #/learn/ka, #/practice/ka, #/review
function parseHash(): Route {
  const [, a, b] = window.location.hash.split('/');
  if (a === 'review') return { view: 'review' };
  const index = Math.max(0, kanaIndex(b ?? ''));
  return { view: 'lesson', index, mode: a === 'practice' ? 'practice' : 'learn' };
}
function toHash(r: Route) {
  return r.view === 'review' ? '#/review' : `#/${r.mode}/${KANA[r.index].romaji}`;
}

export default function App() {
  const [route, setRoute] = useState<Route>(parseHash);
  const [progress, setProgress] = useState<Progress>(loadProgress);
  const [help, setHelp] = useState(false);
  const [lastIndex, setLastIndex] = useState(route.view === 'lesson' ? route.index : 0);

  useEffect(() => {
    const onHash = () => setRoute(parseHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  useEffect(() => {
    const h = toHash(route);
    if (window.location.hash !== h) window.history.replaceState(null, '', h);
    if (route.view === 'lesson') {
      setLastIndex(route.index);
      document.documentElement.style.setProperty('--hue', String(KANA[route.index].hue));
    }
  }, [route]);
  useEffect(() => saveProgress(progress), [progress]);

  const go = (index: number, mode?: LessonMode) =>
    setRoute((r) => ({
      view: 'lesson',
      index: (index + KANA.length) % KANA.length,
      mode: mode ?? (r.view === 'lesson' ? r.mode : 'learn'),
    }));

  // ← → move between characters while in a lesson (not while typing or drawing)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (route.view !== 'lesson' || help) return;
      if ((e.target as HTMLElement)?.closest('input, textarea')) return;
      if (e.key === 'ArrowRight') go(route.index + 1);
      if (e.key === 'ArrowLeft') go(route.index - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [route, help]);

  const markWritten = useCallback(
    (romaji: string) =>
      setProgress((p) => (p.written.includes(romaji) ? p : { ...p, written: [...p.written, romaji] })),
    [],
  );
  const recordReview = useCallback(
    (romaji: string, right: boolean) =>
      setProgress((p) => {
        const s = p.review[romaji] ?? { right: 0, wrong: 0 };
        return { ...p, review: { ...p.review, [romaji]: right ? { ...s, right: s.right + 1 } : { ...s, wrong: s.wrong + 1 } } };
      }),
    [],
  );
  const dismissTip = () => setProgress((p) => ({ ...p, tipsSeen: [...p.tipsSeen, 'practice'] }));

  const topic: HelpTopic = route.view === 'review' ? 'review' : route.mode;

  return (
    <>
      <SvgDefs />
      <header className="appbar">
        <a className="brand" href="#/learn/a" onClick={(e) => { e.preventDefault(); go(0, 'learn'); }}>
          <span className="mark" lang="ja" aria-hidden="true">あ</span>
          <span>
            <b>Hiragana Picture Book</b>
            <small lang="ja">ひらがな えほん</small>
          </span>
        </a>
        <nav aria-label="Main">
          <button type="button" aria-current={route.view === 'lesson' ? 'page' : undefined} onClick={() => go(lastIndex)}>
            Lessons
          </button>
          <button type="button" aria-current={route.view === 'review' ? 'page' : undefined} onClick={() => setRoute({ view: 'review' })}>
            Review
          </button>
        </nav>
        <button type="button" className="icon-btn help" aria-label="Help" aria-haspopup="dialog" onClick={() => setHelp(true)}>
          ?
        </button>
      </header>

      <main className="wrap">
        {route.view === 'lesson' ? (
          <>
            <Lesson
              index={route.index}
              mode={route.mode}
              onMode={(mode) => setRoute({ ...route, mode })}
              onGo={(i) => go(i)}
              onWritten={markWritten}
              showPracticeTip={!progress.tipsSeen.includes('practice')}
              onDismissTip={dismissTip}
            />
            <KanaChart
              current={KANA[route.index].romaji}
              written={progress.written}
              onPick={(r) => {
                go(kanaIndex(r));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </>
        ) : (
          <Review stats={progress.review} onResult={recordReview} />
        )}
      </main>

      <footer className="wrap foot">
        Stroke order data from{' '}
        <a href="https://kanjivg.tagaini.net" target="_blank" rel="noopener noreferrer">
          KanjiVG
        </a>{' '}
        by Ulrich Apel, CC BY-SA 3.0. Illustrations and mnemonics are original.
      </footer>

      {help && <HelpSheet topic={topic} onClose={() => setHelp(false)} />}
    </>
  );
}
