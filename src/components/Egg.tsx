import type { ReactNode } from 'react';

/**
 * A small printed detail on the page that reveals a note when hovered, focused or tapped:
 * a translation and a fun fact about Japanese. `place` says which side the note opens towards.
 */
export default function Egg({
  className,
  place = 'up',
  note,
  children,
}: {
  className: string;
  place?: 'up' | 'left' | 'right' | 'down';
  note: ReactNode;
  children: ReactNode;
}) {
  return (
    <span className={`egg ${className}`} tabIndex={0}>
      <span lang="ja">{children}</span>
      <span className={`egg-note ${place}`} role="tooltip">
        {note}
      </span>
    </span>
  );
}

const DIGITS = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
const READ = ['', 'ichi', 'ni', 'san', 'yon', 'go', 'roku', 'nana', 'hachi', 'kyū'];
const NAME = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

/** Page numbers the way an old Japanese book prints them: 1 → 一, 12 → 十二, 40 → 四十. */
export const kanjiNum = (n: number) => (n >= 20 ? DIGITS[Math.floor(n / 10)] : '') + (n >= 10 ? '十' : '') + DIGITS[n % 10];

const NUMBER_FACTS = [
  '四 (4) is usually read yon, not shi, because shi also sounds like the word for death.',
  '九 (9) is read kyū rather than ku, which can sound like the word for suffering.',
  '八 (8) is lucky: it widens towards the bottom, like a future that opens out. This is called suehirogari.',
  'Old Japanese books were printed on one side of a sheet, folded at the edge and sewn. Each fold made two pages.',
  'Japanese counts big numbers in groups of four zeros: 万 (man) is 10,000, so a million is 百万, a hundred ten-thousands.',
  'Kanji numbers are still written on New Year envelopes, shop signs and vertical text, where 1, 2, 3 would look out of place.',
  '〇 is the kanji-style zero, used for years like 二〇二六.',
];

/** How to read a kanji page number, as a little sum, plus a number fact. */
export function numberNote(n: number) {
  const tens = Math.floor(n / 10), ones = n % 10;
  const reading = [tens > 1 ? READ[tens] : '', tens ? 'jū' : '', READ[ones]].filter(Boolean).join('-');
  const sum = [
    tens > 1 ? `${DIGITS[tens]} ${NAME[tens]} × 十 ten` : tens ? '十 ten' : '',
    ones ? `${DIGITS[ones]} ${NAME[ones]}` : '',
  ].filter(Boolean).join(' + ');
  return (
    <>
      <b lang="ja">{kanjiNum(n)}</b> <i>{reading}</i> · page {n}
      {tens > 0 && <span className="egg-sum">Read it like a sum: {sum}.</span>}
      <span className="egg-fact">{NUMBER_FACTS[n % NUMBER_FACTS.length]}</span>
    </>
  );
}
