import type { Progress } from '../lib/progress';
import { KANA } from './kana';

/** True once every character in at least one row of the chart has been written from memory. */
const rowDone = (p: Progress) =>
  [...new Set(KANA.map((k) => k.row))].some((row) => KANA.filter((k) => k.row === row).every((k) => p.written.includes(k.romaji)));

export interface Sticker {
  id: string;
  /** Japanese name and its reading. */
  jp: string;
  reading: string;
  /** English name. */
  name: string;
  /** How to earn it, shown on the empty slot. */
  how: string;
  /** A little note about the thing pictured, shown once it's earned. */
  note: string;
  /** Secret stickers keep their slot a mystery until earned. */
  secret?: boolean;
  /** Progress towards it: current value and the goal. */
  goal: (p: Progress) => [number, number];
}

export interface StickerGroup {
  title: string;
  jp: string;
  stickers: Sticker[];
}

const N = KANA.length;
const s = (x: Sticker) => x;

export const STICKER_GROUPS: StickerGroup[] = [
  {
    title: 'Writing',
    jp: '書',
    stickers: [
      s({ id: 'fude', jp: '筆', reading: 'fude', name: 'First brush', how: 'Write a character from memory.',
        note: 'Calligraphy students grind their own ink on a suzuri ink stone before they write. Shodō, the way of writing, is still taught in Japanese schools.',
        goal: (p) => [p.written.length, 1] }),
      s({ id: 'mato', jp: '剣玉', reading: 'kendama', name: 'Kendama', how: 'Write a character from memory with no slips.',
        note: 'Landing the ball on the spike, tome-ken, takes a steady hand and perfect timing. Kendama players chase it the way calligraphers chase a clean stroke.',
        goal: (p) => [p.perfect, 1] }),
      s({ id: 'sakura', jp: '桜', reading: 'sakura', name: 'Cherry blossom', how: 'Write 5 characters from memory.',
        note: 'Every spring the news follows the cherry blossom front north, and friends picnic under the trees for hanami, flower viewing.',
        goal: (p) => [p.written.length, 5] }),
      s({ id: 'hanabi', jp: '花火', reading: 'hanabi', name: 'Fireworks', how: 'Write 15 characters from memory.',
        note: 'Hanabi means fire flowers. Summer festivals end with them, watched by crowds in light cotton yukata.',
        goal: (p) => [p.written.length, 15] }),
      s({ id: 'momiji', jp: '紅葉', reading: 'momiji', name: 'Autumn maple', how: 'Write 30 characters from memory.',
        note: 'Momiji-gari, maple hunting, is the autumn trip to see the leaves turn. The same kanji can also be read kōyō, autumn colours.',
        goal: (p) => [p.written.length, 30] }),
      s({ id: 'furin', jp: '風鈴', reading: 'fūrin', name: 'Wind chime', how: 'Write every character in one row from memory.',
        note: 'Glass wind chimes ring through Japanese summers. The sound is said to make a hot day feel cooler; the paper strip below catches the breeze.',
        goal: (p) => [rowDone(p) ? 1 : 0, 1] }),
      s({ id: 'enso', jp: '円相', reading: 'ensō', name: 'Ensō', how: 'Write 10 characters from memory with no slips.',
        note: 'The ensō is a circle painted in a single breath. Zen calligraphers paint one a day: it can’t be corrected, only practised.',
        goal: (p) => [p.perfect, 10] }),
      s({ id: 'yukidaruma', jp: '雪だるま', reading: 'yukidaruma', name: 'Snow daruma', how: `Write all ${N} characters from memory.`,
        note: "Japanese snowmen have two snowballs, not three, and are named after daruma dolls. You've written the whole syllabary!",
        goal: (p) => [p.written.length, N] }),
    ],
  },
  {
    title: 'Reading the book',
    jp: '読',
    stickers: [
      s({ id: 'shoshin', jp: '初心', reading: 'shoshin', name: "Beginner's mind", how: 'Open your first lesson.',
        note: 'Shoshin is the Zen idea of keeping a beginner’s open eyes. The green and yellow wakaba, young leaf, mark is what new drivers in Japan stick on their cars.',
        goal: (p) => [p.opened.length, 1] }),
      s({ id: 'chochin', jp: '提灯', reading: 'chōchin', name: 'Paper lantern', how: 'Open 10 lessons.',
        note: 'Red chōchin hang outside izakaya and shrines. A lit lantern by a door means come in, we’re open.',
        goal: (p) => [p.opened.length, 10] }),
      s({ id: 'wagasa', jp: '和傘', reading: 'wagasa', name: 'Paper umbrella', how: 'Open half the book (23 lessons).',
        note: 'Wagasa are made of oiled washi paper stretched over dozens of split-bamboo ribs. Rain sounds different on paper.',
        goal: (p) => [p.opened.length, 23] }),
      s({ id: 'sensu', jp: '扇子', reading: 'sensu', name: 'Folding fan', how: `Open all ${N} lessons.`,
        note: 'The folding fan was invented in Japan. It widens as it opens, like a future opening out, so fans make a lucky gift.',
        goal: (p) => [p.opened.length, N] }),
    ],
  },
  {
    title: 'Practice',
    jp: '練',
    stickers: [
      s({ id: 'kaeru', jp: '蛙', reading: 'kaeru', name: 'Frog', how: 'Answer 25 review questions.',
        note: 'Kaeru, frog, sounds like kaeru, to return, so frog charms are carried to bring travellers home safe, and lost things back.',
        goal: (p) => [p.answered, 25] }),
      s({ id: 'omamori', jp: 'お守り', reading: 'omamori', name: 'Lucky charm', how: 'Answer 50 review questions.',
        note: "Shrines sell omamori for exams, travel or health. Never open one: they say the luck escapes.",
        goal: (p) => [p.answered, 50] }),
      s({ id: 'kitsune', jp: '狐', reading: 'kitsune', name: 'Fox mask', how: 'Answer 100 review questions.',
        note: 'Foxes are the messengers of Inari, god of rice. At summer festivals you can buy a kitsune mask to wear on the side of your head.',
        goal: (p) => [p.answered, 100] }),
      s({ id: 'tanuki', jp: '狸', reading: 'tanuki', name: 'Tanuki', how: 'Answer 250 review questions.',
        note: 'Tanuki statues in straw hats stand outside restaurants all over Japan, welcoming guests and good fortune. In folk tales they are cheerful shape-shifters.',
        goal: (p) => [p.answered, 250] }),
      s({ id: 'fuji', jp: '富士山', reading: 'Fujisan', name: 'Mount Fuji', how: 'Answer 500 review questions.',
        note: 'Climbers set out at night to watch sunrise from the summit, goraikō. A saying goes: a wise person climbs Fuji once, only a fool climbs it twice.',
        goal: (p) => [p.answered, 500] }),
    ],
  },
  {
    title: 'Review runs',
    jp: '連',
    stickers: [
      s({ id: 'maneki', jp: '招き猫', reading: 'manekineko', name: 'Beckoning cat', how: 'Get 5 review answers right in a row.',
        note: 'A raised left paw beckons customers, a right paw beckons money. Look for them in shop windows all over Japan.',
        goal: (p) => [p.bestRun, 5] }),
      s({ id: 'daruma', jp: 'だるま', reading: 'daruma', name: 'Daruma', how: 'Get 10 right in a row.',
        note: 'Paint in one eye when you set a goal and the other when you reach it. Knock it over and it rolls back up: fall seven times, get up eight.',
        goal: (p) => [p.bestRun, 10] }),
      s({ id: 'orizuru', jp: '折り鶴', reading: 'orizuru', name: 'Paper crane', how: 'Get 20 right in a row.',
        note: 'Fold a thousand cranes, senbazuru, and a wish is granted, they say. The crane stands for a long, happy life.',
        goal: (p) => [p.bestRun, 20] }),
      s({ id: 'kabuto', jp: '兜', reading: 'kabuto', name: 'Samurai helmet', how: 'Get 30 right in a row.',
        note: 'On Children’s Day, 5 May, families display a kabuto to wish their children strength. Origami helmets are folded from newspaper.',
        goal: (p) => [p.bestRun, 30] }),
    ],
  },
  {
    title: 'Every day',
    jp: '日',
    stickers: [
      s({ id: 'matcha', jp: '抹茶', reading: 'matcha', name: 'Matcha', how: 'Practise 2 days in a row.',
        note: 'In the tea ceremony you turn the bowl before drinking, so you don’t sip from its front. Ichigo ichie: treat each meeting as once in a lifetime.',
        goal: (p) => [p.days.best, 2] }),
      s({ id: 'sushi', jp: '寿司', reading: 'sushi', name: 'Sushi', how: 'Practise 3 days in a row.',
        note: 'Sushi began as a way to preserve fish in fermented rice. At a sushi counter it’s polite to eat each piece in one bite, fish side down.',
        goal: (p) => [p.days.best, 3] }),
      s({ id: 'onigiri', jp: 'おにぎり', reading: 'onigiri', name: 'Rice ball', how: 'Practise 5 days in a row.',
        note: 'Onigiri are the classic packed lunch, often hiding a sour umeboshi plum in the middle. Every convenience store sells dozens of kinds.',
        goal: (p) => [p.days.best, 5] }),
      s({ id: 'torii', jp: '鳥居', reading: 'torii', name: 'Torii gate', how: 'Practise 7 days in a row.',
        note: 'A torii marks the way into a shrine. Bow before you pass through, and walk at the side: the middle is the path of the gods.',
        goal: (p) => [p.days.best, 7] }),
      s({ id: 'kokeshi', jp: 'こけし', reading: 'kokeshi', name: 'Kokeshi doll', how: 'Practise 14 days in a row.',
        note: 'Kokeshi are turned on a lathe from a single piece of wood, a craft from the hot-spring towns of northern Japan. No two faces are painted alike.',
        goal: (p) => [p.days.best, 14] }),
      s({ id: 'koinobori', jp: '鯉のぼり', reading: 'koinobori', name: 'Carp streamers', how: 'Practise 21 days in a row.',
        note: 'Carp swim upstream against the current, so streamers fly for Children’s Day: a wish for children to grow strong and keep going.',
        goal: (p) => [p.days.best, 21] }),
      s({ id: 'tsukimi', jp: '月見', reading: 'tsukimi', name: 'Moon viewing', how: 'Practise 30 days in a row.',
        note: 'Where others see a man in the moon, Japan sees a rabbit pounding mochi. Autumn moon viewing comes with round dango dumplings.',
        goal: (p) => [p.days.best, 30] }),
    ],
  },
  {
    title: 'Treasure',
    jp: '宝',
    stickers: [
      s({ id: 'koban', jp: '小判', reading: 'koban', name: 'Gold koban', how: 'Collect 100 mon.',
        note: 'Koban were oval gold coins of the Edo period. 猫に小判, a koban to a cat: something precious given to someone who can’t appreciate it.',
        goal: (p) => [p.mon, 100] }),
      s({ id: 'tai', jp: '鯛', reading: 'tai', name: 'Sea bream', how: 'Collect 250 mon.',
        note: 'Tai is the fish of celebrations because it rhymes with medetai, joyful. A whole red sea bream is served at weddings and New Year.',
        goal: (p) => [p.mon, 250] }),
      s({ id: 'senryo', jp: '千両箱', reading: 'senryōbako', name: 'Money chest', how: 'Collect 500 mon.',
        note: 'A senryōbako held a thousand ryō in gold, a fortune. Your mon are named after the humble copper coins of the same era.',
        goal: (p) => [p.mon, 500] }),
      s({ id: 'takarabune', jp: '宝船', reading: 'takarabune', name: 'Treasure ship', how: 'Collect 1000 mon.',
        note: 'The Seven Lucky Gods sail in on a treasure ship at New Year. Sleep with its picture under your pillow and your first dream of the year will be lucky.',
        goal: (p) => [p.mon, 1000] }),
      s({ id: 'fukurou', jp: '梟', reading: 'fukurō', name: 'Night owl', how: 'A secret. Keep practising…', secret: true,
        note: 'You practised late at night. Fukurō, owl, can be written 不苦労, no hardship, so owls are lucky charms. Hoot.',
        goal: (p) => [p.late ? 1 : 0, 1] }),
      s({ id: 'asagao', jp: '朝顔', reading: 'asagao', name: 'Morning glory', how: 'A secret. Keep practising…', secret: true,
        note: 'You practised at dawn. Asagao, morning face, opens at sunrise and closes by noon. Japanese children grow one each summer for school.',
        goal: (p) => [p.early ? 1 : 0, 1] }),
    ],
  },
];

export const STICKERS = STICKER_GROUPS.flatMap((g) => g.stickers);

/** Stickers whose goal is now met but which haven't been awarded yet. */
export const newlyEarned = (p: Progress) => STICKERS.filter((x) => !p.stickers[x.id] && ((g) => g[0] >= g[1])(x.goal(p)));
