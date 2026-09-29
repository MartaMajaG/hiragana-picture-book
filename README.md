# Hiragana Picture Book

A small web app for learning hiragana. Each character is written stroke by stroke, then turns into a picture that helps you remember it. You can practise writing it yourself with a trackpad, mouse, finger or pen, and review everything in a shuffled quiz.

Currently covers the あ and か rows (10 of 46 characters).

## Run it

You need Node.js 18 or newer.

```bash
npm install
npm run dev        # opens a local dev server, usually http://localhost:5173
npm run build      # production build into dist/
npm run preview    # serve the production build locally
```

`dist/` is a static site. It can go on Vercel, Netlify or GitHub Pages as is, and it works from a subpath, so it can be embedded in a portfolio page.

## How it's organised

```
src/
  App.tsx                 app bar (Lessons, Review, help), routing via the URL hash
  views/
    Lesson.tsx            one character: Learn / Practice toggle
    Review.tsx            shuffled quiz across all characters, weighted towards misses
  components/
    KanaStage.tsx         writes a character stroke by stroke, then shows its picture
    TracePad.tsx          the writing pad: pointer input and stroke checking
    KanaChart.tsx         gojūon chart, the table of contents
    HelpSheet.tsx         help dialog behind the "?" button
    SvgDefs.tsx           shared SVG gradients and filters
  illustrations/
    a.ts, i.ts, ...       one file per character's picture
    helpers.ts            shared drawing helpers (fish, flowers, bubbles...)
    index.ts              registers each illustration by romaji
  data/
    kana.ts               mnemonics, example words, chart layout
    strokes.json          stroke paths from KanjiVG
  lib/
    geometry.ts           path measuring and stroke matching
    progress.ts           progress saved in the browser (localStorage)
```

URLs: `#/learn/ka`, `#/practice/ka`, `#/review`.

## Adding a character

1. Add its stroke paths to `src/data/strokes.json`. Take them from the KanjiVG file for that character (for example `3055.svg` for さ), in order.
2. Add its entry to `KANA` in `src/data/kana.ts`: romaji, hue, mnemonic title, story and first word.
3. Create `src/illustrations/<romaji>.ts` and register it in `src/illustrations/index.ts`.

## Drawing illustrations

Pictures are drawn in the same 109 × 109 coordinate space as the KanjiVG strokes, so a shape lines up with the part of the character it represents. Each illustration returns a list of SVG snippets, layered back to front. They bloom in one by one after the strokes finish.

To use art made in Figma or Illustrator: export as SVG on a 109 × 109 artboard with the character's strokes as a guide layer, delete the guide layer, and paste the shapes into the illustration file as one or more parts.

## How stroke checking works

Each stroke the learner draws is resampled to 32 points and compared with the reference stroke: start point, end point and average distance along the shape. Tolerances scale with stroke length. If a stroke matches but runs backwards, or matches a different stroke, the learner is told which. The thresholds are in `matchStroke` in `src/lib/geometry.ts`.

## Credits

Stroke order data: [KanjiVG](https://kanjivg.tagaini.net) by Ulrich Apel, licensed CC BY-SA 3.0. Keep this credit visible (it's in the app footer).
Illustrations and mnemonics are original.
