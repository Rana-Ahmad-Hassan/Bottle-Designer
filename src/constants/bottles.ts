import { BottleType, TextureType } from '../types/bottles';
import { CapsuleType } from '../types/bottles';
import b1 from '../assets/images/b1.png';
import b2 from '../assets/images/b2.png';
import b3 from '../assets/images/b3.png';
import b4 from '../assets/images/b4.png';
import b5 from '../assets/images/b5.png';
import b6 from '../assets/images/b6.png';
import c1 from '../assets/images/1c.png';
import c2 from '../assets/images/2c.png';
import c3 from '../assets/images/3c.png';
import c4 from '../assets/images/4c.png';

export const bottleOptions: { type: BottleType; name: string; image: string }[] = [
  {
    type: 'bordeaux',
    name: 'Bordeaux Bottle',
    image: b1,
  },
  {
    type: 'burgundy',
    name: 'Burgundy Bottle',
    image: b2,
  },
  {
    type: 'alsace',
    name: 'Alsace Bottle',
    image: b3,
  },
  {
    type: 'champagne',
    name: 'Champagne Bottle',
    image: b4,
  },
  {
    type: 'port',
    name: 'Port Bottle',
    image: b5,
  },
  {
    type: 'rhine',
    name: 'Rhine Bottle',
    image: b6,
  },
];

export const bottleVariants = {
  white: Array.from({ length: 24 }, (_, i) => ({
    id: `white-${i + 1}`,
    name: `White ${i + 1}`,
    value: `hsl(60, 100%, ${90 - i * 2}%)`,
  })),
  rose: Array.from({ length: 24 }, (_, i) => ({
    id: `rose-${i + 1}`,
    name: `Rosé ${i + 1}`,
    value: `hsl(0, 70%, ${90 - i * 2}%)`,
  })),
  red: Array.from({ length: 24 }, (_, i) => ({
    id: `red-${i + 1}`,
    name: `Red ${i + 1}`,
    value: `hsl(350, 60%, ${80 - i * 2}%)`,
  })),
};

export const capsuleOptions: { type: CapsuleType; name: string; image: string }[] = [
  {
    type: 'cork',
    name: 'Cork Capsule',
    image: c1,
  },
  {
    type: 'screw',
    name: 'Screw Cap',
    image: c2,
  },
  {
    type: 'synthetic',
    name: 'Synthetic Cork',
    image: c3,
  },
  {
    type: 'crown',
    name: 'Crown Cap',
    image: c4,
  },
];

export const capsuleVariants = [
  { id: 'white', name: 'White', colors: Array.from({ length: 10 }, (_, i) => `hsl(60, 100%, ${90 - i * 2}%)`) },
  { id: 'rose', name: 'Rosé', colors: Array.from({ length: 10 }, (_, i) => `hsl(0, 70%, ${90 - i * 2}%)`) },
  { id: 'red', name: 'Red', colors: Array.from({ length: 4 }, (_, i) => `hsl(350, 60%, ${80 - i * 2}%)`) },
];

export const textureOptions: { type: TextureType; name: string; description: string }[] = [
  {
    type: 'smooth',
    name: 'Smooth Glass',
    description: 'Classic smooth glass texture with high transparency',
  },
  {
    type: 'rough',
    name: 'Rough Glass',
    description: 'Textured surface with slight imperfections',
  },
  {
    type: 'hammered',
    name: 'Hammered Glass',
    description: 'Distinctive hammered pattern effect',
  },
  {
    type: 'frosted',
    name: 'Frosted Glass',
    description: 'Matte finish with translucent effect',
  },
  {
    type: 'matte',
    name: 'Matte Finish',
    description: 'Non-reflective matte surface',
  },
];

export const backgroundTypes = [
  { id: 'wood', name: 'Wood Texture', value: 'https://images.pexels.com/photos/164005/pexels-photo-164005.jpeg' },
  { id: 'marble', name: 'Marble', value: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg' },
  { id: 'water', name: 'Water Splash', value: 'https://images.pexels.com/photos/635279/pexels-photo-635279.jpeg' },
  { id: 'forest', name: 'Forest', value: 'https://images.pexels.com/photos/4827/nature-forest-trees-fog.jpeg' },
];
