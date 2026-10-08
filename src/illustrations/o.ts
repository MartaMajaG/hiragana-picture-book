// お (o) illustration: someone going "Oh!" as a ball bounces off their eye. O as in "Oh!".
// The loop is their round face, the long stroke runs down to the hand clapped over the sore eye,
// the cross marks the flash of pain and the dot is the ball flying off. Parts are layered back to front and bloom in one by one.
import type { Draw } from './types';

const SKIN = '#F2C9A5', SKIN_SHADE = '#DDA880', HAIR = '#3B2F2A', SHIRT = '#5D8FC9', SHIRT_SHADE = '#4674AA', INK = '#2E2A22';

const draw: Draw = () => [
  // shoulders and neck
  `<path d="M40,109 C41,98 50,92 64,92 C78,92 87,98 88,109Z" fill="${SHIRT}"/><path d="M76,94 C83,97 87,102 88,109 L80,109 C80,103 79,98 76,94Z" fill="${SHIRT_SHADE}"/>` +
    `<path d="M58,84 L70,84 L70,93 C66,95 62,95 58,93Z" fill="${SKIN_SHADE}"/>`,
  // round face and hair (the loop)
  `<circle cx="64" cy="70" r="20" fill="${SKIN}"/><path d="M76,54 C83,59 86,68 83,77 C80,85 72,90 64,90 C75,84 80,70 76,54Z" fill="${SKIN_SHADE}"/>` +
    `<path d="M44,68 C43,55 52,48.5 64,48.5 C77,48.5 85,55 84,68 C80,60 72,56.5 64,57 C56,57 48,61 44,68Z" fill="${HAIR}"/>`,
  // face: one eye wide in surprise, mouth open in an "Oh!", a tear from the sore eye
  `<ellipse cx="72" cy="69" rx="2.1" ry="2.9" fill="${INK}"/><circle cx="71.4" cy="68" r=".7" fill="#fff"/>` +
    `<path d="M68,63.5 L75.5,62.5" stroke="${HAIR}" stroke-width="1.2" stroke-linecap="round"/>` +
    `<ellipse cx="66" cy="81" rx="3" ry="3.8" fill="#8A3A3A"/><circle cx="76.5" cy="76" r="2.2" fill="#F2A7A0" opacity=".8"/>` +
    `<path d="M57,79 C55.5,82 55.5,84 57,85 C58.5,84 58.5,82 57,79Z" fill="#8FC7E8"/>`,
  // arm coming up to hold the sore eye (along the long stroke)
  `<path d="M44,109 C43,100 44,92 46,86" fill="none" stroke="${SHIRT}" stroke-width="8" stroke-linecap="round"/>` +
    `<path d="M46,88 C47,82 49,78 52,75" fill="none" stroke="${SKIN}" stroke-width="7" stroke-linecap="round"/>` +
    `<ellipse cx="55" cy="69" rx="7" ry="8.2" transform="rotate(-18 55 69)" fill="${SKIN}"/>` +
    `<path d="M52,63 C54,65 56,67 58,68 M50.5,66.5 C52.5,68.5 54.5,70 56.5,71" fill="none" stroke="${SKIN_SHADE}" stroke-width="1" stroke-linecap="round"/>`,
  // flash of pain (the cross) and the ball bouncing away (the dot)
  `<path d="M43,21 Q44.6,30.4 54,32 Q44.6,33.6 43,43 Q41.4,33.6 32,32 Q41.4,30.4 43,21Z" fill="#F2B43E"/>` +
    `<path d="M66,50 C68,44 70,40 73,36 M70,52 C72.5,47 75,43 78,40" fill="none" stroke="#C9C2B4" stroke-width="1.2" stroke-linecap="round" stroke-dasharray="2.5 2.5"/>` +
    `<circle cx="79" cy="29" r="6" fill="#E0564A"/><path d="M84.5,27.5 C84,32 80.5,35 76,34.8" fill="none" stroke="#B83E34" stroke-width="2" stroke-linecap="round"/><circle cx="76.8" cy="26.6" r="1.4" fill="#FFF4EE"/>`,
  // highlight
  `<path d="M73,53.5 C76.5,55 79.5,58 81,61.5" fill="none" stroke="#FFF4EE" stroke-width="1.3" stroke-linecap="round"/>`,
];

export default draw;
