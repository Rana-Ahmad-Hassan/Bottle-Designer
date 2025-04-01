import { BottleDesign } from '../../types/bottles';
import BottleModel from './Scene';
import defaultBg from '../../assets/images/defaultbg.jpeg';

interface BottlePreviewProps {
  design: BottleDesign;
}

export default function BottlePreview({ design }: BottlePreviewProps) {
  return (
    <div className="relative w-full h-[450px] border mb-2 aspect-[4/3] rounded-lg flex justify-center overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${design.background ? design.background : defaultBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div className="absolute inset-0 z-10" id="bottle-preview">
        <BottleModel design={design} />
      </div>
    </div>
  );
}
