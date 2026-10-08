import { useCallback, useEffect, useState } from 'react';
import SvgDefs from './components/SvgDefs';
import KanaChart from './components/KanaChart';
import HelpSheet, { type HelpTopic } from './components/HelpSheet';
import Lesson, { type LessonMode } from './views/Lesson';
import Review from './views/Review';
import Album from './views/Album';
import NewSticker from './components/NewSticker';
import CoinPurse from './components/CoinPurse';
import { balance, pull } from './data/gacha';
import { KANA, kanaIndex } from './data/kana';
import { STICKERS, newlyEarned } from './data/stickers';
import { MON, currentStreak, loadProgress, saveProgress, touchDay, type Progress } from './lib/progress';

type Route = { view: 'lesson'; index: number; mode: LessonMode } | { view: 'review' } | { view: 'stickers' };

// Routes live in the URL hash so they survive a reload and can be linked: #/learn/ka, #/practice/ka, #/review, #/stickers
function parseHash(): Route {
  const [, a, b] = window.location.hash.split('/');
  if (a === 'review') return { view: 'review' };
  if (a === 'stickers') return { view: 'stickers' };
  const index = Math.max(0, kanaIndex(b ?? ''));
  return { view: 'lesson', index, mode: a === 'practice' ? 'practice' : 'learn' };
}
function toHash(r: Route) {
  return r.view === 'lesson' ? `#/${r.mode}/${KANA[r.index].romaji}` : `#/${r.view}`;
}

export default function App() {
  const [route, setRoute] = useState<Route>(parseHash);
  const [progress, setProgress] = useState<Progress>(loadProgress);
  const [help, setHelp] = useState(false);
  const [lastIndex, setLastIndex] = useState(route.view === 'lesson' ? route.index : 0);
  const [toasts, setToasts] = useState<string[]>([]);
  const [purse, setPurse] = useState(false);
  // the sticker currently being dragged into the album, if any
  const [placing, setPlacing] = useState<string | null>(null);
  const placeSticker = useCallback(
    (id: string) => setProgress((p) => ({ ...p, toStick: p.toStick.filter((x) => x !== id) })),
    [],
  );

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

  // Opening a lesson for the first time earns a mon and counts towards the day's practice.
  const openedRomaji = route.view === 'lesson' ? KANA[route.index].romaji : null;
  useEffect(() => {
    if (!openedRomaji) return;
    setProgress((p) => (p.opened.includes(openedRomaji) ? p : touchDay({ ...p, opened: [...p.opened, openedRomaji], mon: p.mon + MON.open })));
  }, [openedRomaji]);

  // Award any sticker whose goal has just been met, and announce it.
  useEffect(() => {
    const fresh = newlyEarned(progress);
    if (!fresh.length) return;
    const now = new Date().toISOString();
    setProgress((p) => ({
      ...p,
      stickers: { ...p.stickers, ...Object.fromEntries(fresh.map((x) => [x.id, now])) },
      toStick: [...p.toStick, ...fresh.map((x) => x.id).filter((id) => !p.toStick.includes(id))],
    }));
    setToasts((t) => [...t, ...fresh.map((x) => x.id).filter((id) => !t.includes(id))]);
  }, [progress]);
  const dropToast = useCallback(() => setToasts((t) => t.slice(1)), []);

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

  // Writing from memory: 5 mon the first time, 2 after that, and 3 more for a write with no slips.
  const markWritten = useCallback(
    (romaji: string, retries: number) =>
      setProgress((p) => {
        const first = !p.written.includes(romaji);
        const clean = retries === 0;
        return touchDay({
          ...p,
          written: first ? [...p.written, romaji] : p.written,
          mon: p.mon + (first ? MON.write : MON.rewrite) + (clean ? MON.perfect : 0),
          perfect: p.perfect + (clean ? 1 : 0),
        });
      }),
    [],
  );
  // Review: a mon per right answer, more while a run of right answers keeps going.
  const recordReview = useCallback(
    (romaji: string, right: boolean) =>
      setProgress((p) => {
        const s = p.review[romaji] ?? { right: 0, wrong: 0 };
        const run = right ? p.run + 1 : 0;
        const earned = right ? MON.right + (run >= 10 ? MON.runBonus10 : run >= 5 ? MON.runBonus5 : 0) : 0;
        return touchDay({
          ...p,
          review: { ...p.review, [romaji]: right ? { ...s, right: s.right + 1 } : { ...s, wrong: s.wrong + 1 } },
          answered: p.answered + 1,
          run,
          bestRun: Math.max(p.bestRun, run),
          mon: p.mon + earned,
        });
      }),
    [],
  );
  const dismissTip = () => setProgress((p) => ({ ...p, tipsSeen: [...p.tipsSeen, 'practice'] }));

  const topic: HelpTopic = route.view === 'lesson' ? route.mode : route.view;
  const streak = currentStreak(progress);
  const stickerCount = Object.keys(progress.stickers).length;

  return (
    <>
      <SvgDefs />
      <header className="appbar">
        <a className="brand" href="#/learn/a" onClick={(e) => { e.preventDefault(); go(0, 'learn'); }}>
          <span className="mark" lang="ja" aria-hidden="true">あ</span>
          <span className="daisen">
            <small lang="ja">ひらがな絵本</small>
            <b>Hiragana Picture Book</b>
          </span>
        </a>
        <nav aria-label="Main">
          <button type="button" aria-current={route.view === 'lesson' ? 'page' : undefined} onClick={() => go(lastIndex)}>
            Lessons
          </button>
          <button type="button" aria-current={route.view === 'review' ? 'page' : undefined} onClick={() => setRoute({ view: 'review' })}>
            Review
          </button>
          <button type="button" aria-current={route.view === 'stickers' ? 'page' : undefined} onClick={() => setRoute({ view: 'stickers' })}>
            Stickers <span className="nav-count">{stickerCount}/{STICKERS.length}</span>
          </button>
        </nav>
        <button type="button" className="purse" onClick={() => setPurse(true)} title="Your purse: mon earned and days in a row">
          <span className="coin" lang="ja" aria-hidden="true">文</span>
          <b>{balance(progress)}</b>
          <span className="sep" aria-hidden="true" />
          <b>{streak}</b>
          <span className="unit">{streak === 1 ? 'day' : 'days'}</span>
          <span className="sr-only">
            {balance(progress)} mon to spend, {streak} day streak
          </span>
        </button>
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
        ) : route.view === 'review' ? (
          <Review stats={progress.review} onResult={recordReview} />
        ) : (
          <Album
            progress={progress}
            onOpenPurse={() => setPurse(true)}
            placing={placing}
            onPlace={setPlacing}
            onPull={() => {
              const r = pull(progress);
              if (!r) return null;
              setProgress(r.next);
              return { capsule: r.capsule, isNew: r.isNew };
            }}
            onPlaced={(id) => {
              placeSticker(id);
              setPlacing(null);
            }}
          />
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
      {purse && <CoinPurse progress={progress} onClose={() => setPurse(false)} />}
      {toasts.length > 0 && (
        <NewSticker
          id={toasts[0]}
          onLater={dropToast}
          onStick={() => {
            const id = toasts[0];
            dropToast();
            setPlacing(id);
            setRoute({ view: 'stickers' });
          }}
        />
      )}
    </>
  );
}
