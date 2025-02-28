import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Suspense, memo } from 'react';
import { models } from '../../constants/models';
import { capsules } from '../../constants/models';

interface SceneProps {
  modelId?: string;
  scale?: number;
  interactive?: boolean;
  className?: string;
  color?: string;
  capsuleModelId?: string;

}

const Scene = memo(function Scene({
  modelId = models[0].id,
  scale = 1.4,
  interactive = true,
  className = 'w-full h-full',
  capsuleModelId,
  color = 'black',
}: SceneProps) {
  const selectedModel = models.find((m) => m.id === modelId) ?? models[0];
  const ModelComponent = selectedModel?.component;
  const CapsuleModelComponent = capsuleModelId && capsules.find((m) => m.id === capsuleModelId)?.component;
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
        dpr={[1, 2]}
        gl={{
          powerPreference: 'default',
          antialias: true,
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <Environment preset="city" />

          <ModelComponent scale={[scale, scale, scale]} color={color} opacity={0.6} />
          {CapsuleModelComponent && <CapsuleModelComponent scale={[0.1, 0.1, 0.1]} />}
        

          {interactive && (
            <OrbitControls
              enableZoom={false}
              enablePan={true}
              minPolarAngle={0}
              maxPolarAngle={Math.PI / 1.5}
              makeDefault
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
});

export default Scene;
