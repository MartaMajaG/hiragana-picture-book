// お (o) illustration. Parts are layered back to front and bloom in one by one.
import type { Draw } from './types';
import { bubbles, water } from './helpers';

const draw: Draw = S=>[
  water,
  `<path d="M2,110 C-2,94 8,86 2,72 C-3,60 6,52 3,40" stroke="#4F8A5B" stroke-width="4.5" fill="none" stroke-linecap="round"/><path d="M11,110 C15,98 7,92 12,80" stroke="#6BA474" stroke-width="3.5" fill="none" stroke-linecap="round"/>`,
  `<g fill="none" stroke="#D2544F" stroke-width="5.4" stroke-linecap="round"><path d="M48,84 C42,94 46,101 38,104 C34,105.5 32,101 35.5,100"/><path d="M57,88 C55,98 58,104 53,109 C50,112 46.5,109 49,107"/><path d="M68,90 C69,100 66,106 71,110 C74,112 77,108 74.5,106.5"/><path d="M79,87 C85,96 84,102 91,104 C95,105 96,100 93,99.5"/><path d="M86,80 C95,84 98,90 104,88 C108,86.5 106,82 103.5,83.5"/></g><g fill="#F7C5B8"><circle cx="45" cy="92" r="1"/><circle cx="43.5" cy="97" r="1"/><circle cx="56" cy="96" r="1"/><circle cx="55.5" cy="102" r="1"/><circle cx="69" cy="98" r="1"/><circle cx="82.5" cy="93" r="1"/><circle cx="87" cy="98" r="1"/><circle cx="94" cy="86" r="1"/></g>`,
  `<ellipse cx="66" cy="70" rx="23.5" ry="20.5" fill="url(#gCoral)"/><ellipse cx="59" cy="58" rx="8" ry="3.8" transform="rotate(-18 59 58)" fill="#fff" opacity=".35"/>`,
  `<ellipse cx="58.5" cy="71" rx="4.2" ry="4.8" fill="#fff"/><ellipse cx="74.5" cy="71" rx="4.2" ry="4.8" fill="#fff"/><circle cx="59.4" cy="72" r="2.3" fill="#1B1E26"/><circle cx="75.4" cy="72" r="2.3" fill="#1B1E26"/><circle cx="58.7" cy="71" r=".8" fill="#fff"/><circle cx="74.7" cy="71" r=".8" fill="#fff"/><circle cx="53" cy="79" r="3" fill="#FF9E98" opacity=".75"/><circle cx="80" cy="79" r="3" fill="#FF9E98" opacity=".75"/><ellipse cx="66.5" cy="81" rx="2.4" ry="2" fill="#A8303B"/>`,
  bubbles([[79,29,8.5],[92,13,3.2],[86,4,1.9],[30,56,1.6]])
 ];

export default draw;
