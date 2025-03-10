import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Suspense, useRef, useState, useEffect } from 'react';
import { BottleDesign } from '../../types/bottles';
import BottleModel from './Scene';
import * as THREE from 'three';

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

interface DraggableBottleProps {
  design: BottleDesign;
  dragMode: boolean;
  resizeMode: boolean;
}

const DraggableBottle = ({ design, dragMode, resizeMode }: DraggableBottleProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [targetPosition, setTargetPosition] = useState<[number, number, number]>([0, 0, 0]);
  const [scale, setScale] = useState(1);
  const { camera, gl } = useThree();
  const dragPlane = useRef(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0));
  const intersection = useRef(new THREE.Vector3());

  useFrame(() => {
    if (!groupRef.current) return;

    groupRef.current.position.x += (targetPosition[0] - groupRef.current.position.x) * 0.1;
    groupRef.current.position.y += (targetPosition[1] - groupRef.current.position.y) * 0.1;
  });

  useEffect(() => {
    const domElement = gl.domElement;

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0 || !dragMode) return;

      setIsDragging(true);
      domElement.style.cursor = 'grabbing';

      event.stopPropagation();
      domElement.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!isDragging || !dragMode) return;

      const rect = domElement.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(x, y), camera);

      raycaster.ray.intersectPlane(dragPlane.current, intersection.current);

      const maxRange = 2.5;
      const clampedX = Math.max(-maxRange, Math.min(maxRange, intersection.current.x));
      const clampedY = Math.max(-maxRange, Math.min(maxRange, intersection.current.y));

      setTargetPosition([clampedX, clampedY, 0]);
    };

    const onPointerUp = (event: PointerEvent) => {
      if (isDragging) {
        setIsDragging(false);
        domElement.style.cursor = 'auto';
        domElement.releasePointerCapture(event.pointerId);
      }
    };

    const onWheel = (event: WheelEvent) => {
      if (!resizeMode) return;

      event.preventDefault();
      setScale((prevScale) => Math.max(0.5, Math.min(3, prevScale - event.deltaY * 0.002)));
    };

    domElement.addEventListener('pointerdown', onPointerDown);
    domElement.addEventListener('pointermove', onPointerMove);
    domElement.addEventListener('pointerup', onPointerUp);
    domElement.addEventListener('pointercancel', onPointerUp);
    domElement.addEventListener('wheel', onWheel);

    return () => {
      domElement.removeEventListener('pointerdown', onPointerDown);
      domElement.removeEventListener('pointermove', onPointerMove);
      domElement.removeEventListener('pointerup', onPointerUp);
      domElement.removeEventListener('pointercancel', onPointerUp);
      domElement.removeEventListener('wheel', onWheel);
      domElement.style.cursor = 'auto';
    };
  }, [isDragging, gl, camera, dragMode, resizeMode]);

  useEffect(() => {
    if (!dragMode && groupRef.current) {
      setTargetPosition([0, 0, 0]);
      setIsDragging(false);
    }
  }, [dragMode]);

  return (
    <group ref={groupRef} scale={[scale, scale, scale]}>
      <BottleModel design={design} />
    </group>
  );
};

export default function BottlePreview({ design }: BottlePreviewProps) {
  const [dragMode, setDragMode] = useState(false);
  const [resizeMode, setResizeMode] = useState(false);

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

            <DraggableBottle design={design} dragMode={dragMode} resizeMode={resizeMode} />

            <OrbitControls makeDefault enableZoom={false} enableRotate enablePan={false} />
            <Environment preset={backgroundToPreset[design.background as keyof typeof backgroundToPreset] ?? 'studio'} />
          </Suspense>
        </Canvas>
      </div>

      <div className="absolute top-2 right-2 z-20 flex space-x-2">
        <button
          onClick={() => setDragMode(!dragMode)}
          className={`px-3 py-1 rounded text-xs ${
            dragMode ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
          }`}
        >
          {dragMode ? 'Drag Mode: ON' : 'Drag Mode: OFF'}
        </button>
        <button
          onClick={() => setResizeMode(!resizeMode)}
          className={`px-3 py-1 rounded text-xs ${
            resizeMode ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'
          }`}
        >
          {resizeMode ? 'Resize Mode: ON' : 'Resize Mode: OFF'}
        </button>
      </div>

      <div className="absolute bottom-2 left-2 z-20 bg-black/50 text-white text-xs px-2 py-1 rounded">
        {dragMode
          ? 'Click and drag the bottle • Use right-click to rotate view'
          : resizeMode
          ? 'zoom in and out to resize the bottle • Use right-click to rotate view'
          : 'Use right-click to rotate view'}
      </div>
    </div>
  );
}
