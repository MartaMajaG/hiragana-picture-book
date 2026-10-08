# Notes for Claude

A hiragana learning app (Vite + React + TypeScript, no other runtime dependencies). See README.md for structure.

## Product

- Two areas in the app bar: **Lessons** (one character at a time, with a Learn / Practice toggle) and **Review** (all characters shuffled). Keep them separate.
- Practice is always about the character currently open: trace with a guide, then write from memory, then the picture appears.
- Help lives behind the "?" button. The only proactive tip is the one-time coach mark on the practice pad.
- It is a portfolio playground piece, so visual quality matters as much as function.

## Points and stickers

- Mon (文) are earned for opening lessons, writing from memory and right review answers; amounts are in `MON` in `src/lib/progress.ts`. The daily streak (日) counts days with any practice.
- Stickers are defined in `src/data/stickers.ts` (name, culture note, goal). Their art is one file per id in `src/stickers/art/`, a flat SVG snippet in a 100 × 100 box. The app adds the die-cut white edge and shadow, so each sticker must be one compact silhouette.

## Illustrations

- One file per character in `src/illustrations/`, drawn in KanjiVG's 109 × 109 space so shapes line up with strokes.
- Style direction so far: crisp flat vector shapes, a small palette per picture, one shade shape and one or two highlights. No grain filters, sparkles, glow blobs or decorative extras that don't serve the mnemonic (for example, no ribbon on the candy apple).
- Every picture must sound like its kana in English (か = cat, き = key, え = egg) and its shapes should follow the strokes.
- House style is the candy apple (`a.ts`): flat fills, no gradients, no background scenery; grounded objects sit on `shadow()` from `helpers.ts`.
- Draw in plain, full-strength hex colours. `pastelize` in `src/lib/illustration.ts` softens every colour at render time, so all pictures share one pastel palette. Tune the look there, not per file.
- The owner art-directs these. Change one illustration at a time and show it before moving on.

## Conventions

- Stroke data comes from KanjiVG (CC BY-SA 3.0); keep the footer credit.
- Look: a picture book printed on washi. Warm paper, sumi ink, a vermilion seal (`--shu`) for readings, a faint seigaiha band, Mincho type. Colours go through the CSS tokens in `src/styles.css`; each character's hue is only used for the soft wash behind its picture and for hints.
- Check changes with `npm run build` (typecheck + build) before calling them done.
