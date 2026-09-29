import { useEffect, useRef } from 'react';

export type HelpTopic = 'learn' | 'practice' | 'review';

const CONTENT: Record<HelpTopic, { title: string; items: [string, string][] }> = {
  learn: {
    title: 'Learning a character',
    items: [
      ['Watch it being written', 'Each stroke draws in the order you should write it. Replay it any time.'],
      ['Picture or strokes', 'Picture shows the mnemonic drawing. Strokes hides it and numbers each stroke.'],
      ['Move on', 'Use the arrows or your keyboard’s ← → keys, or pick any character from the chart.'],
    ],
  },
  practice: {
    title: 'Writing practice',
    items: [
      ['Press and drag to write', 'Start each stroke at the pulsing dot and lift when the stroke ends.'],
      ['On a Mac trackpad', 'Turn on three-finger drag (System Settings › Accessibility › Pointer Control › Trackpad Options). It feels closest to a pen.'],
      ['On a phone or tablet', 'Write with your finger or a stylus directly on the pad.'],
      ['Order, direction and shape', 'If a stroke is out of order, backwards or off, the correct one is shown so you can try again.'],
    ],
  },
  review: {
    title: 'Review',
    items: [
      ['Everything, shuffled', 'Questions mix all the characters that have lessons.'],
      ['Two kinds of question', 'Read a character, or find the character for a sound.'],
      ['Focus on the hard ones', 'Characters you miss come up more often.'],
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
        <dl>
          {c.items.map(([t, d]) => (
            <div key={t}>
              <dt>{t}</dt>
              <dd>{d}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
