import { CHART, KANA } from '../data/kana';

interface Props {
  current: string;
  written: string[];
  onPick: (romaji: string) => void;
}

/** The gojūon chart, read right to left like the printed original. Characters without a lesson yet are dashed. */
export default function KanaChart({ current, written, onPick }: Props) {
  return (
    <section className="chart-sec" aria-labelledby="chart-h">
      <div className="sec-h">
        <h2 id="chart-h">All characters</h2>
        <span>
          {KANA.length} of 46 ready · read right to left, like the printed chart
        </span>
      </div>
      <div className="chart-scroll">
        <div className="chart">
          {CHART.map((row, r) => (
            <div className="col" key={r}>
              {row.map(([kana, romaji], j) => {
                if (!kana) return <span className="cell empty" key={j} aria-hidden="true" />;
                const lesson = KANA.find((k) => k.kana === kana);
                if (!lesson)
                  return (
                    <span className="cell locked" key={j} title="Coming soon" aria-label={`${kana}, ${romaji}, coming soon`}>
                      <span className="ck" lang="ja">{kana}</span>
                      <span className="cr">{romaji}</span>
                    </span>
                  );
                return (
                  <button
                    type="button"
                    className="cell"
                    key={j}
                    aria-current={lesson.romaji === current}
                    aria-label={`${kana}, ${romaji}${written.includes(romaji) ? ', written from memory' : ''}`}
                    onClick={() => onPick(lesson.romaji)}
                  >
                    <span className="ck" lang="ja">{kana}</span>
                    <span className="cr">{romaji}</span>
                    {written.includes(romaji) && <span className="done-mark" aria-hidden="true" />}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
