import { useGLTF } from '@react-three/drei';
import { useEffect } from 'react';
import * as THREE from 'three';

interface BottleProps {
  scale?: [number, number, number];
  rotation?: [number, number, number];
  color?: string;
  opacity?: number;
}

export function Capsule1({
  scale,
  rotation = [0, 0, 0],
  color = 'red',
  opacity = 0.7,
  ...props
}: BottleProps) {
  const { scene } = useGLTF('/model/bottleNeck1.glb');

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const material = new THREE.MeshStandardMaterial({
          color,
          transparent: true,
          opacity,
          roughness: 0.3,
          metalness: 0.5,
          side: THREE.DoubleSide,
        });
        mesh.material = material;
      }
    });
  }, [scene, color, opacity]);

  return <primitive object={scene} scale={scale} position={[2, 8, -1]} rotation={rotation} {...props} />;
}
