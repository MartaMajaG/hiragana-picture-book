// The gachapon capsule series: Japanese sweets and street snacks, collected by spending mon.
import type { Progress } from '../lib/progress';

export type Rarity = 'common' | 'rare' | 'super';

export interface Capsule {
  id: string;
  jp: string;
  reading: string;
  name: string;
  rarity: Rarity;
  note: string;
  /** Capsule shell colours, top half then bottom half. */
  shell: [string, string];
}

/** What a turn of the handle costs, and what a duplicate gives back. */
export const GACHA_COST = 30;
export const DUPLICATE_REFUND = 5;
const WEIGHT: Record<Rarity, number> = { common: 10, rare: 7, super: 4 };

export const CAPSULES: Capsule[] = [
  { id: 'gc-dango', jp: '団子', reading: 'dango', name: 'Hanami dango', rarity: 'common', shell: ['#F2A7B5', '#FFFFFF'],
    note: 'Three-colour dango are eaten under the cherry blossoms: pink for spring, white for the last snow, green for the summer to come.' },
  { id: 'gc-taiyaki', jp: 'たい焼き', reading: 'taiyaki', name: 'Taiyaki', rarity: 'common', shell: ['#E8A04A', '#FFFFFF'],
    note: 'A fish-shaped cake filled with sweet red bean. Friends still argue about whether to eat it head or tail first.' },
  { id: 'gc-dorayaki', jp: 'どら焼き', reading: 'dorayaki', name: 'Dorayaki', rarity: 'common', shell: ['#C9864A', '#FFFFFF'],
    note: 'Named after the dora gong it looks like, and famously the favourite snack of Doraemon, the robot cat.' },
  { id: 'gc-senbei', jp: '煎餅', reading: 'senbei', name: 'Rice cracker', rarity: 'common', shell: ['#8A6440', '#FFFFFF'],
    note: 'Grilled over charcoal and brushed with soy sauce. In old Tokyo shops you can still watch them toasted by hand.' },
  { id: 'gc-ramune', jp: 'ラムネ', reading: 'ramune', name: 'Ramune', rarity: 'common', shell: ['#7CC6D6', '#FFFFFF'],
    note: 'The bottle is sealed with a glass marble. Push it down, pop, and the soda fizzes up. The marble rattles as you drink.' },
  { id: 'gc-takoyaki', jp: 'たこ焼き', reading: 'takoyaki', name: 'Takoyaki', rarity: 'common', shell: ['#D9604E', '#FFFFFF'],
    note: 'Osaka’s street snack: batter balls with octopus inside, flipped with picks in a dimpled pan. Very hot inside, careful!' },
  { id: 'gc-melonpan', jp: 'メロンパン', reading: 'melon pan', name: 'Melon pan', rarity: 'common', shell: ['#B8D36A', '#FFFFFF'],
    note: 'Named for its crackly crust that looks like a melon’s rind. Most melon pan has no melon in it at all.' },
  { id: 'gc-kakigori', jp: 'かき氷', reading: 'kakigōri', name: 'Shaved ice', rarity: 'common', shell: ['#E84A5F', '#FFFFFF'],
    note: 'Shaved ice with syrup, the taste of summer festivals. Eat it too fast and you get kiiin: brain freeze.' },
  { id: 'gc-daifuku', jp: 'いちご大福', reading: 'ichigo daifuku', name: 'Strawberry daifuku', rarity: 'rare', shell: ['#F07B8C', '#FDF3EC'],
    note: 'Soft mochi wrapped round red bean paste and a whole strawberry. Invented in the 1980s, a spring favourite ever since.' },
  { id: 'gc-nerikiri', jp: '練り切り', reading: 'nerikiri', name: 'Nerikiri', rarity: 'rare', shell: ['#E9A3C2', '#FDF3EC'],
    note: 'Tea-ceremony sweets shaped by hand into the flower of the season, so the shapes change with the months.' },
  { id: 'gc-ekiben', jp: '駅弁', reading: 'ekiben', name: 'Station bento', rarity: 'rare', shell: ['#6E9A57', '#FDF3EC'],
    note: 'Bento sold on station platforms, every region proud of its own. Some come in little clay pots you get to keep.' },
  { id: 'gc-kinpaku', jp: '金箔ソフト', reading: 'kinpaku sofuto', name: 'Gold-leaf soft serve', rarity: 'super', shell: ['#E3B04B', '#F7E2A0'],
    note: 'Kanazawa makes almost all of Japan’s gold leaf, and wraps whole ice creams in it. Yes, you eat the gold.' },
];

/** What's left in the purse to spend: everything earned, less what's gone into the machine. */
export const balance = (p: Progress) => p.mon - p.spent;

/** One turn of the handle: pay, get a random capsule (rarer ones less often), and a little back for a duplicate. */
export function pull(p: Progress, rand = Math.random): { next: Progress; capsule: Capsule; isNew: boolean } | null {
  if (balance(p) < GACHA_COST) return null;
  const total = CAPSULES.reduce((a, c) => a + WEIGHT[c.rarity], 0);
  let r = rand() * total;
  const capsule = CAPSULES.find((c) => (r -= WEIGHT[c.rarity]) < 0) ?? CAPSULES[0];
  const isNew = !p.capsules[capsule.id];
  return {
    capsule,
    isNew,
    next: {
      ...p,
      spent: p.spent + GACHA_COST - (isNew ? 0 : DUPLICATE_REFUND),
      capsules: { ...p.capsules, [capsule.id]: (p.capsules[capsule.id] ?? 0) + 1 },
      capsuleToStick: isNew ? [...p.capsuleToStick, capsule.id] : p.capsuleToStick,
    },
  };
}
