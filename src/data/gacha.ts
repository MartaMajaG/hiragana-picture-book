// The gachapon capsule series, collected by spending mon. Each series unlocks once the one before it has all but its super rare.
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

/** What a turn of the handle costs, and what a spare (duplicate) sticker trades back for, by rarity. */
export const GACHA_COST = 30;
export const TRADE_VALUE: Record<Rarity, number> = { common: 10, rare: 15, super: 25 };
const WEIGHT: Record<Rarity, number> = { common: 10, rare: 7, super: 4 };

const SWEETS: Capsule[] = [
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
const YOKAI: Capsule[] = [
  { id: 'gy-kappa', jp: '河童', reading: 'kappa', name: 'Kappa', rarity: 'common', shell: ['#6E9A57', '#FFFFFF'],
    note: 'A river sprite with a dish of water on its head. Bow to a kappa and it bows back, spilling its water and losing its strength. It loves cucumbers, so cucumber sushi is a kappa-maki.' },
  { id: 'gy-karakasa', jp: '唐傘お化け', reading: 'karakasa-obake', name: 'Umbrella spirit', rarity: 'common', shell: ['#D9604E', '#FFFFFF'],
    note: 'Old things that reach a hundred years old come alive as tsukumogami. A forgotten paper umbrella becomes this one-eyed, one-legged hopper.' },
  { id: 'gy-chochin', jp: '提灯お化け', reading: 'chōchin-obake', name: 'Lantern ghost', rarity: 'common', shell: ['#E84A5F', '#FFFFFF'],
    note: 'Another tsukumogami: an old paper lantern that splits open into a grin. Mostly harmless, mostly cheeky.' },
  { id: 'gy-nekomata', jp: '猫又', reading: 'nekomata', name: 'Nekomata', rarity: 'common', shell: ['#8A6A9E', '#FFFFFF'],
    note: 'Folk tales say a cat that lives very long grows a second tail and gains magic powers, so people once trimmed cats’ tails just in case.' },
  { id: 'gy-nurikabe', jp: '塗壁', reading: 'nurikabe', name: 'Nurikabe', rarity: 'common', shell: ['#9AA3B5', '#FFFFFF'],
    note: 'An invisible wall that blocks tired travellers at night. The trick to get past: tap the bottom of it with a stick.' },
  { id: 'gy-tengu', jp: '天狗', reading: 'tengu', name: 'Tengu', rarity: 'rare', shell: ['#C25A47', '#FDF3EC'],
    note: 'Long-nosed mountain spirits, masters of swordsmanship. Legend says they trained the young samurai Minamoto no Yoshitsune.' },
  { id: 'gy-zashiki', jp: '座敷童子', reading: 'zashiki-warashi', name: 'Zashiki-warashi', rarity: 'rare', shell: ['#E07A8A', '#FDF3EC'],
    note: 'A child spirit who lives in old houses and plays pranks. As long as she stays, the family prospers; some inns are famous for her.' },
  { id: 'gy-kyubi', jp: '九尾の狐', reading: 'kyūbi no kitsune', name: 'Nine-tailed fox', rarity: 'super', shell: ['#E3B04B', '#F7E2A0'],
    note: 'Foxes grow a new tail every hundred years. With nine tails, a fox becomes wise, powerful and golden: the rarest yōkai of all.' },
];

const FESTIVAL: Capsule[] = [
  { id: 'gf-kingyo', jp: '金魚すくい', reading: 'kingyo-sukui', name: 'Goldfish scooping', rarity: 'common', shell: ['#E8604E', '#FFFFFF'],
    note: 'At festival stalls you try to scoop goldfish with a paper paddle, a poi, before the paper tears. Catch one and you take it home in a bag.' },
  { id: 'gf-yoyo', jp: '水ヨーヨー', reading: 'mizu yōyō', name: 'Water yo-yo', rarity: 'common', shell: ['#7CC6D6', '#FFFFFF'],
    note: 'A water balloon on a rubber band that bounces back to your hand. Fished out of a tub with a paper hook.' },
  { id: 'gf-taiko', jp: '太鼓', reading: 'taiko', name: 'Taiko drum', rarity: 'common', shell: ['#B5463A', '#FFFFFF'],
    note: 'The big drum sets the rhythm for bon-odori, the summer dance everyone joins in a circle.' },
  { id: 'gf-uchiwa', jp: '団扇', reading: 'uchiwa', name: 'Uchiwa fan', rarity: 'common', shell: ['#5B6F92', '#FFFFFF'],
    note: 'Flat, round fans handed out at festivals and summer fireworks, often printed with goldfish or fireworks.' },
  { id: 'gf-wataame', jp: '綿あめ', reading: 'wataame', name: 'Cotton candy', rarity: 'common', shell: ['#F7B8C6', '#FFFFFF'],
    note: 'Spun sugar in printed bags with anime characters, one of the sweetest smells of a summer night.' },
  { id: 'gf-hyottoko', jp: 'ひょっとこ', reading: 'hyottoko', name: 'Hyottoko mask', rarity: 'rare', shell: ['#F2C14E', '#FDF3EC'],
    note: 'The comic mask of a man blowing on a fire, pursed lips and all. He dances at festivals to make everyone laugh.' },
  { id: 'gf-yatai', jp: '屋台', reading: 'yatai', name: 'Festival stall', rarity: 'rare', shell: ['#D9604E', '#FDF3EC'],
    note: 'Rows of yatai stalls line the shrine path: yakisoba, candy apples, shooting games, all under paper lanterns.' },
  { id: 'gf-mikoshi', jp: '神輿', reading: 'mikoshi', name: 'Golden mikoshi', rarity: 'super', shell: ['#E3B04B', '#F7E2A0'],
    note: 'A portable shrine carried through the streets on dozens of shoulders, with shouts of wasshoi! The god rides inside for the festival.' },
];

const ANIMALS: Capsule[] = [
  { id: 'ga-shiba', jp: '柴犬', reading: 'shiba inu', name: 'Shiba inu', rarity: 'common', shell: ['#E8913A', '#FFFFFF'],
    note: 'One of Japan’s oldest dog breeds: foxy face, curled tail, strong opinions. Famous for the shiba scream when they don’t want to go home.' },
  { id: 'ga-saru', jp: '日本猿', reading: 'nihonzaru', name: 'Snow monkey', rarity: 'common', shell: ['#C9864A', '#FFFFFF'],
    note: 'The world’s most northern monkeys. In Nagano they keep warm in winter by soaking in hot springs.' },
  { id: 'ga-shika', jp: '鹿', reading: 'shika', name: 'Nara deer', rarity: 'common', shell: ['#B07A4A', '#FFFFFF'],
    note: 'Over a thousand deer roam Nara freely as messengers of the gods. Buy shika-senbei crackers and they bow to ask for one.' },
  { id: 'ga-enaga', jp: 'シマエナガ', reading: 'shima-enaga', name: 'Snow fairy', rarity: 'common', shell: ['#BFD9E4', '#FFFFFF'],
    note: 'A tiny round bird from Hokkaido, white as a snowball. Its nickname is yuki no yōsei, the snow fairy.' },
  { id: 'ga-tancho', jp: '丹頂', reading: 'tanchō', name: 'Red-crowned crane', rarity: 'common', shell: ['#D9473A', '#FFFFFF'],
    note: 'Cranes dance in pairs on the snowy marshes of Hokkaido. They are said to live a thousand years and stand for long life.' },
  { id: 'ga-momonga', jp: 'モモンガ', reading: 'momonga', name: 'Flying squirrel', rarity: 'rare', shell: ['#9AA3B5', '#FDF3EC'],
    note: 'The Ezo flying squirrel glides from tree to tree on flaps of skin, with eyes as big as its whole face.' },
  { id: 'ga-kamoshika', jp: 'カモシカ', reading: 'kamoshika', name: 'Serow', rarity: 'rare', shell: ['#7C8794', '#FDF3EC'],
    note: 'A shaggy goat-antelope of the mountains, protected as a special natural monument. It stares calmly at hikers.' },
  { id: 'ga-yamaneko', jp: 'イリオモテヤマネコ', reading: 'Iriomote yamaneko', name: 'Iriomote wildcat', rarity: 'super', shell: ['#E3B04B', '#F7E2A0'],
    note: 'Found only on one small southern island, with around a hundred left. Seeing one is a once-in-a-lifetime moment.' },
];

const CATS: Capsule[] = [
  { id: 'gn-mike', jp: '三毛猫', reading: 'mikeneko', name: 'Calico cat', rarity: 'common', shell: ['#E8913A', '#FFFFFF'],
    note: 'Three-coloured calico cats are almost always female, and sailors once took them to sea for good luck.' },
  { id: 'gn-hako', jp: '箱猫', reading: 'hako neko', name: 'Cat in a box', rarity: 'common', shell: ['#C9A06A', '#FFFFFF'],
    note: 'If it fits, it sits. Japanese has a word for cats loafing in boxes and a whole internet devoted to them.' },
  { id: 'gn-kobako', jp: '香箱座り', reading: 'kōbako-zuwari', name: 'Loaf cat', rarity: 'common', shell: ['#9AA3B5', '#FFFFFF'],
    note: 'The paws-tucked loaf pose is called kōbako-zuwari, sitting like an incense box. It means the cat feels safe.' },
  { id: 'gn-sakana', jp: '猫とお魚', reading: 'neko to osakana', name: 'Cat with a fish', rarity: 'common', shell: ['#E8A04A', '#FFFFFF'],
    note: 'A cat proudly carrying off its dinner, a favourite of old picture books and of fishing villages.' },
  { id: 'gn-neru', jp: '寝る猫', reading: 'neru neko', name: 'Sleepy cat', rarity: 'common', shell: ['#4A4E5E', '#FFFFFF'],
    note: 'One theory says neko, cat, comes from neru ko, the child that sleeps. Cats nap up to sixteen hours a day.' },
  { id: 'gn-kotatsu', jp: 'こたつ猫', reading: 'kotatsu neko', name: 'Kotatsu cat', rarity: 'rare', shell: ['#D9604E', '#FDF3EC'],
    note: 'A kotatsu is a low table with a heater and a quilt. A children’s song says the dog runs in the snow while the cat curls up under it.' },
  { id: 'gn-ninja', jp: '忍者猫', reading: 'ninja neko', name: 'Ninja cat', rarity: 'rare', shell: ['#3A4257', '#FDF3EC'],
    note: 'Silent paws, night vision, sudden appearances: some say cats were the first ninja.' },
  { id: 'gn-tama', jp: 'たま駅長', reading: 'Tama ekichō', name: 'Tama the station master', rarity: 'super', shell: ['#E3B04B', '#F7E2A0'],
    note: 'A real calico cat who became station master of Kishi station in Wakayama in 2007, with her own little cap. Visitors came from all over to see her, and saved the railway line.' },
];

const ONSEN: Capsule[] = [
  { id: 'go-noren', jp: 'ゆ', reading: 'yu', name: 'Bathhouse curtain', rarity: 'common', shell: ['#4FA3A0', '#FFFFFF'],
    note: 'Look for a curtain with the hiragana ゆ (yu, hot water) on it: that’s the entrance to a public bath. Blue is usually for men, red for women.' },
  { id: 'go-kerorin', jp: 'ケロリン桶', reading: 'Kerorin oke', name: 'Kerorin bucket', rarity: 'common', shell: ['#F2C14E', '#FFFFFF'],
    note: 'The yellow plastic bucket in almost every bathhouse, printed with an advert for Kerorin headache pills since 1963. It is so loved that people buy them as souvenirs.' },
  { id: 'go-milk', jp: 'コーヒー牛乳', reading: 'kōhī gyūnyū', name: 'Coffee milk', rarity: 'common', shell: ['#B98A5E', '#FFFFFF'],
    note: 'After the bath: a cold glass bottle of coffee milk, drunk in one go with your other hand on your hip. It is the rule.' },
  { id: 'go-tamago', jp: '黒たまご', reading: 'kuro tamago', name: 'Black egg', rarity: 'common', shell: ['#4A4E5E', '#FFFFFF'],
    note: 'At Owakudani near Hakone, eggs boiled in the volcanic springs turn black. Each one you eat is said to add seven years to your life.' },
  { id: 'go-mark', jp: '♨', reading: 'onsen kigō', name: 'Hot spring sign', rarity: 'common', shell: ['#D9604E', '#FFFFFF'],
    note: 'The ♨ symbol, a bowl with three wisps of steam, has marked hot springs on Japanese maps for over a century.' },
  { id: 'go-capybara', jp: 'カピバラ温泉', reading: 'kapibara onsen', name: 'Bathing capybara', rarity: 'rare', shell: ['#C9864A', '#FDF3EC'],
    note: 'Since 1982, the capybaras at Izu Shaboten Zoo get their own hot bath every winter, sometimes with yuzu fruit floating in it. They close their eyes and melt.' },
  { id: 'go-fuji', jp: '富士山の壁画', reading: 'Fujisan no hekiga', name: 'Mt Fuji mural', rarity: 'rare', shell: ['#7CB0D6', '#FDF3EC'],
    note: 'Old Tokyo bathhouses have a huge painting of Mount Fuji over the bath. Only a few painters still know how to paint them.' },
  { id: 'go-yukimi', jp: '雪見風呂', reading: 'yukimi-buro', name: 'Snow-viewing bath', rarity: 'super', shell: ['#E3B04B', '#F7E2A0'],
    note: 'Sitting in a steaming outdoor bath while snow falls around you is called yukimi-buro, snow-viewing bath. Many say it is the best feeling in Japan.' },
];

const OFFICE: Capsule[] = [
  { id: 'gs-hanko', jp: '判子', reading: 'hanko', name: 'Name seal', rarity: 'common', shell: ['#C25A47', '#FFFFFF'],
    note: 'Documents are approved with a personal seal, not a signature. In some offices, juniors stamp at a slight tilt so their seal bows to the boss’s.' },
  { id: 'gs-meishi', jp: '名刺', reading: 'meishi', name: 'Business card', rarity: 'common', shell: ['#E8E2D2', '#FFFFFF'],
    note: 'Cards are given and taken with both hands and a bow, then laid on the table in front of you during the meeting. Never write on one!' },
  { id: 'gs-coffee', jp: '缶コーヒー', reading: 'kan kōhī', name: 'Canned coffee', rarity: 'common', shell: ['#5B6F92', '#FFFFFF'],
    note: 'Japan has around four million vending machines. In winter they sell coffee in cans that are hot, ready to warm your hands on the way to work.' },
  { id: 'gs-tsurikawa', jp: '吊り革', reading: 'tsurikawa', name: 'Train strap', rarity: 'common', shell: ['#9AA3B5', '#FFFFFF'],
    note: 'Tokyo’s morning trains are so full that at some stations staff in white gloves gently push people in so the doors can close.' },
  { id: 'gs-nekutai', jp: 'ネクタイ鉢巻', reading: 'nekutai hachimaki', name: 'Tie headband', rarity: 'common', shell: ['#D9473A', '#FFFFFF'],
    note: 'The classic cartoon of a tipsy salaryman after work: necktie tied round his head like a hachimaki headband, singing karaoke.' },
  { id: 'gs-kanpai', jp: '乾杯', reading: 'kanpai', name: 'Kanpai!', rarity: 'rare', shell: ['#E3A93A', '#FDF3EC'],
    note: 'The after-work drinking party, nomikai. Pour for others, never for yourself, and hold your glass a little lower than your boss’s when you clink.' },
  { id: 'gs-capsule', jp: 'カプセルホテル', reading: 'kapuseru hoteru', name: 'Capsule hotel', rarity: 'rare', shell: ['#E8E2D2', '#FDF3EC'],
    note: 'Invented in Osaka in 1979 for workers who missed the last train home: a bed-sized pod with a light, a TV and a curtain.' },
  { id: 'gs-shinkansen', jp: '新幹線', reading: 'shinkansen', name: 'Bullet train', rarity: 'super', shell: ['#E3B04B', '#F7E2A0'],
    note: 'The business trip ride. Since 1964 its average delay has been under a minute, and cleaning crews turn a whole train around in seven minutes.' },
];

export interface Series {
  id: string;
  jp: string;
  name: string;
  /** Body colour of this series' machine: main, shade, deep. */
  machine: [string, string, string];
  capsules: Capsule[];
}

/** Capsule series, in the order they unlock: finish one to open the next. */
export const SERIES: Series[] = [
  { id: 'sweets', jp: 'お菓子', name: 'Sweets & snacks', machine: ['#D9473A', '#B0342C', '#8E2A24'], capsules: SWEETS },
  { id: 'yokai', jp: '妖怪', name: 'Friendly yōkai', machine: ['#4F6384', '#3E4F6C', '#2C3A52'], capsules: YOKAI },
  { id: 'festival', jp: '祭り', name: 'Summer festival', machine: ['#E3A93A', '#C48A22', '#9A6A14'], capsules: FESTIVAL },
  { id: 'animals', jp: '動物', name: 'Animals of Japan', machine: ['#6E9A57', '#557D42', '#3E5E30'], capsules: ANIMALS },
  { id: 'cats', jp: '猫', name: 'Cats', machine: ['#E07A8A', '#C25E6E', '#9A4452'], capsules: CATS },
  { id: 'onsen', jp: '温泉', name: 'Hot springs', machine: ['#4FA3A0', '#3D8582', '#2C6563'], capsules: ONSEN },
  { id: 'office', jp: 'サラリーマン', name: 'Salaryman life', machine: ['#6B7A8F', '#56647A', '#414D60'], capsules: OFFICE },
];

/** Every capsule in every series. */
export const CAPSULES: Capsule[] = SERIES.flatMap((x) => x.capsules);

export const seriesDone = (p: Progress, x: Series) => x.capsules.every((c) => p.capsules[c.id]);
/** The next series opens once everything but the super rare is collected: the super rare can take a long time to turn up. */
export const seriesUnlocksNext = (p: Progress, x: Series) => x.capsules.every((c) => c.rarity === 'super' || p.capsules[c.id]);
/** A series is open once the one before it has all but its super rare. */
export const seriesOpen = (p: Progress, i: number) => i === 0 || seriesUnlocksNext(p, SERIES[i - 1]);


/** What's left in the purse to spend: everything earned, less what's gone into the machine. */
export const balance = (p: Progress) => p.mon - p.spent;

/** One turn of the handle: pay and get a random capsule (rarer ones less often). Duplicates are kept as spares to trade. */
export function pull(p: Progress, series: Series, rand = Math.random): { next: Progress; capsule: Capsule; isNew: boolean } | null {
  if (balance(p) < GACHA_COST) return null;
  const pool = series.capsules;
  const total = pool.reduce((a, c) => a + WEIGHT[c.rarity], 0);
  let r = rand() * total;
  const capsule = pool.find((c) => (r -= WEIGHT[c.rarity]) < 0) ?? pool[0];
  const isNew = !p.capsules[capsule.id];
  return {
    capsule,
    isNew,
    next: {
      ...p,
      spent: p.spent + GACHA_COST,
      capsules: { ...p.capsules, [capsule.id]: (p.capsules[capsule.id] ?? 0) + 1 },
      capsuleToStick: isNew ? [...p.capsuleToStick, capsule.id] : p.capsuleToStick,
    },
  };
}

/** Trade one spare copy of a capsule sticker back for mon. The first copy, the one in the book, can't be traded. */
export function trade(p: Progress, id: string): Progress | null {
  const c = CAPSULES.find((x) => x.id === id);
  if (!c || (p.capsules[id] ?? 0) < 2) return null;
  return { ...p, spent: p.spent - TRADE_VALUE[c.rarity], capsules: { ...p.capsules, [id]: p.capsules[id] - 1 } };
}
