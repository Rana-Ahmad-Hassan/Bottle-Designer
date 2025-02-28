export interface BottleDesign {
  shape: string;
  color: string;
  capsule: string;
  capsuleColor: string;
  label: File | null;
  texture: string;
  background: string;
}

export interface StepProps {
  design: BottleDesign;
  updateDesign: (updates: Partial<BottleDesign>) => void;
  onNext: () => void;
  onBack: () => void;
  onReset: () => void;
}

export interface Bottle {
  id: string;
  name: string;
  image: string;
}

export interface Capsule {
  id: string;
  name: string;
  image: string;
}

export interface Color {
  id: string;
  name: string;
  value: string;
}
