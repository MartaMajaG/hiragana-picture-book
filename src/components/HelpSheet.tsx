import { useEffect, useRef } from 'react';

export type HelpTopic = 'learn' | 'practice' | 'review' | 'stickers';

const CONTENT: Record<HelpTopic, { title: string; items: [string, string][] }> = {
  learn: {
    title: 'How learning works',
    items: [
      ['Watch it being written', 'Each stroke draws in the order you should write it. Replay it any time.'],
      ['Picture or strokes', 'Picture shows the mnemonic drawing. Strokes hides it and numbers each stroke.'],
      ['Move on', 'Use the arrows or your keyboard’s ← → keys, or pick any character from the chart.'],
    ],
  },
  practice: {
    title: 'How writing practice works',
    items: [
      ['Press and drag to write', 'Start each stroke at the pulsing dot and lift when the stroke ends.'],
      ['On a Mac trackpad', 'Turn on three-finger drag (System Settings › Accessibility › Pointer Control › Trackpad Options). It feels closest to a pen.'],
      ['On a phone or tablet', 'Write with your finger or a stylus directly on the pad.'],
      ['Order, direction and shape', 'If a stroke is out of order, backwards or off, the correct one is shown so you can try again.'],
    ],
  },
  stickers: {
    title: 'How stickers work',
    items: [
      ['Earn mon', 'Mon (文) are old Japanese coins. You get them for opening lessons, writing from memory (extra for no slips) and right answers in review, with a bonus while a run keeps going.'],
      ['Keep a daily streak', 'Practise a little every day. The 日 count in the top bar shows how many days in a row.'],
      ['Collect stickers', 'Each sticker is something from Japanese culture. Hover or tap one in the album to read about it. One is a secret.'],
    ],
  },
  review: {
    title: 'How review works',
    items: [
      ['Choose what to practise', 'Above the quiz, pick the kind of question and which rows of the chart to include.'],
      ['Two kinds of question', 'Read the character shown, or find the character for a sound.'],
      ['Focus on the hard ones', 'Characters you miss come up more often until you get them right.'],
    ],
  },
};

interface Props {
  topic: HelpTopic;
  onClose: () => void;
}

export default function HelpSheet({ topic, onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  const c = CONTENT[topic];
  return (
    <div className="scrim" onClick={onClose}>
      <div
        className="sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="help-title"
        tabIndex={-1}
        ref={ref}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sheet-h">
          <h2 id="help-title">{c.title}</h2>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close help">
            ×
          </button>
        </div>
        <ol className="notes">
          {c.items.map(([t, d]) => (
            <li key={t}>
              <b>{t}.</b> {d}
            </li>
          ))}
        </ol>
        <div className="sheet-f">
          <button type="button" className="btn primary" onClick={onClose}>
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
