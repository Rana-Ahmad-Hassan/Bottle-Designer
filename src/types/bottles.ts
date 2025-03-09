export type BottleType = 'bordeaux' | 'burgundy' | 'alsace' | 'champagne' | 'port' | 'rhine';
export type CapsuleType = 'cork' | 'screw' | 'synthetic' | 'crown' | 't-cork';
export type TextureType = 'smooth' | 'rough' | 'hammered' | 'frosted' | 'matte' | 'none';

export interface BottleDesign {
  type: BottleType;
  color: string;
  capsule: CapsuleType | string;
  capsuleColor: string;
  label: string;
  texture: TextureType;
  background: string;
}

export interface StepProps {
  design: BottleDesign;
  updateDesign: (updates: Partial<BottleDesign>) => void;
  onNext: () => void;
  onBack: () => void;
  onReset: () => void;
}
