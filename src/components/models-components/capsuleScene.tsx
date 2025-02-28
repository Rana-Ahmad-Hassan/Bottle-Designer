import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Suspense, memo } from 'react';
import { capsules } from '../../constants/models';

interface SceneProps {
  interactive?: boolean;
  className?: string;
  color?: string;
  capsuleModelId?: string;
}

const CapsuleScene = memo(function Scene({
  interactive = true,
  className = 'w-full h-full',
  capsuleModelId= capsules[0].id,
  color = 'red',
}: SceneProps) {
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

          {CapsuleModelComponent && <CapsuleModelComponent scale={[0.5, 0.5, 0.5]} color={color} />}
        

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

export default CapsuleScene;
