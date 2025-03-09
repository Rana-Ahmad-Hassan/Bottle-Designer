import { Canvas } from '@react-three/fiber';
import { OrbitControls, PresentationControls, Environment } from '@react-three/drei';
import { Suspense } from 'react';
import { BottleDesign } from '../../types/bottles';
import BottleModel from './Scene';

const backgroundToPreset = {
  plain: 'studio',
  studio: 'studio',
  shelf: 'warehouse',
  cellar: 'night',
  vineyard: 'sunset',
} as const;

interface BottlePreviewProps {
  design: BottleDesign;
}

export default function BottlePreview({ design }: BottlePreviewProps) {
  return (
    <div className="relative w-full h-[450px] border mb-2 aspect-[4/3] rounded-lg overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${design.background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      <div className="absolute inset-0 z-10" id="bottle-preview">
        <Canvas
          shadows
          dpr={[1, 2]}
          gl={{
            preserveDrawingBuffer: true,
            antialias: true,
            alpha: true,
          }}
          camera={{ position: [0, 0, 4.5], fov: 50 }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
            <PresentationControls
              global
              zoom={0.9}
              rotation={[0, -Math.PI / 4, 0]}
              polar={[-Math.PI / 4, Math.PI / 4]}
              azimuth={[-Math.PI / 4, Math.PI / 4]}
            >
              <BottleModel design={design} />
            </PresentationControls>
            <OrbitControls makeDefault enableZoom={false} />
            <Environment preset={backgroundToPreset[design.background] ?? 'studio'} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
