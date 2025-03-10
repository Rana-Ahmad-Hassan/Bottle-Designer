import { useRef, useEffect, useState } from 'react';
import { Color, DoubleSide, type Group, Mesh, MeshPhysicalMaterial } from 'three';
import { BottleDesign } from '../../types/bottles';
import useLabelTexture from '../../hooks/useLabedTexture';

interface BottleModelProps {
  design: BottleDesign;
}

const bottleShapes = {
  bordeaux: { bodyHeight: 2.2, bodyRadius: 0.4, neckHeight: 0.8, neckRadius: 0.15, shoulderHeight: 0.3 },
  burgundy: { bodyHeight: 2.0, bodyRadius: 0.5, neckHeight: 0.7, neckRadius: 0.15, shoulderHeight: 0.4 },
  alsace: { bodyHeight: 2.4, bodyRadius: 0.35, neckHeight: 0.9, neckRadius: 0.12, shoulderHeight: 0.25 },
  champagne: { bodyHeight: 2.1, bodyRadius: 0.45, neckHeight: 0.6, neckRadius: 0.18, shoulderHeight: 0.35 },
  port: { bodyHeight: 1.9, bodyRadius: 0.42, neckHeight: 0.5, neckRadius: 0.16, shoulderHeight: 0.3 },
  rhine: { bodyHeight: 2.3, bodyRadius: 0.38, neckHeight: 0.85, neckRadius: 0.14, shoulderHeight: 0.28 },
};

export default function BottleModel({ design }: BottleModelProps) {
  const bottleRef = useRef<Mesh>(null);
  const capsuleRef = useRef<Mesh>(null);
  const groupRef = useRef<Group>(null);
  const [labelTexture, setLabelTexture] = useState<string | null>(null);

  const shapeParams = bottleShapes[design.type];

  useEffect(() => {
    if (design.label) {
      setLabelTexture(design.label);
    } else {
      setLabelTexture(null);
    }
  }, [design.label]);

  const texture = useLabelTexture(labelTexture);

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.traverse((child) => {
        if (child instanceof Mesh) {
          if (child.name.includes('bottle')) {
            const material = new MeshPhysicalMaterial({
              color: new Color(design.color),
            });

            switch (design.texture) {
              case 'rough':
                material.roughness = 0.8;
                material.clearcoat = 0.2;
                break;
              case 'hammered':
                material.roughness = 0.6;
                material.clearcoat = 0.4;
                material.clearcoatRoughness = 0.7;
                break;
              case 'frosted':
                material.transmission = 0.8;
                material.roughness = 0.9;
                material.clearcoat = 0;
                break;
              case 'matte':
                material.roughness = 1;
                material.clearcoat = 0;
                material.transmission = 0.5;
                break;
              default:
                material.roughness = 0.1;
                material.clearcoat = 0.5;
                break;
            }
            child.material = material;
          }
        }
      });
    }
  }, [design.color, design.texture]);

  return (
    <group ref={groupRef} position={[0, -0.7, 0]}>
      {/* Bottle body */}
      <mesh name="bottle-body" ref={bottleRef} castShadow receiveShadow>
        <cylinderGeometry args={[shapeParams.bodyRadius, shapeParams.bodyRadius, shapeParams.bodyHeight, 32]} />
        <meshPhysicalMaterial
          color={design.color}
          transparent
          opacity={design.color === 'clear' ? 0.1 : 1}
          roughness={0.1}
          metalness={0}
          transmission={design.color === 'clear' ? 1 : 0}
          thickness={design.color === 'clear' ? 0.2 : 0}
          ior={1.5}
          side={DoubleSide}
        />
      </mesh>

      {/* Bottle shoulder */}
      <mesh
        name="bottle-shoulder"
        position={[0, shapeParams.bodyHeight / 2 + shapeParams.shoulderHeight / 2, 0]}
        castShadow
        receiveShadow
      >
        <cylinderGeometry args={[shapeParams.neckRadius, shapeParams.bodyRadius, shapeParams.shoulderHeight, 32]} />
        <meshPhysicalMaterial
          color={design.color}
          transparent={design.color === 'clear'}
          opacity={design.color === 'clear' ? 0.5 : 1}
          roughness={0.2}
          metalness={0}
          clearcoat={0.5}
        />
      </mesh>

      {/* Bottle neck */}
      <mesh
        name="bottle-neck"
        position={[0, shapeParams.bodyHeight / 2 + shapeParams.shoulderHeight + shapeParams.neckHeight / 2, 0]}
        castShadow
        receiveShadow
      >
        <cylinderGeometry args={[shapeParams.neckRadius, shapeParams.neckRadius, shapeParams.neckHeight, 32]} />
        <meshPhysicalMaterial
          color={design.color}
          transparent={design.color === 'clear'}
          opacity={design.color === 'clear' ? 0.5 : 1}
          roughness={0.2}
          metalness={0}
          clearcoat={0.5}
        />
      </mesh>

      {/* Bottle capsule*/}
      {design.capsule && (
        <mesh
          name="capsule"
          ref={capsuleRef}
          position={[0, shapeParams.bodyHeight / 2 + shapeParams.shoulderHeight + shapeParams.neckHeight + 0.1, 0]}
          castShadow
          receiveShadow
        >
          <cylinderGeometry args={[shapeParams.neckRadius * 1.1, shapeParams.neckRadius * 1.1, 0.2, 32]} />
          <meshStandardMaterial color={design.capsuleColor} />
        </mesh>
      )}

      {design.label && texture && (
        <mesh name="label" position={[0, 0, 0]}>
          <cylinderGeometry
            args={[
              shapeParams.bodyRadius + 0.001,
              shapeParams.bodyRadius + 0.001,
              shapeParams.bodyHeight * 0.4,
              32,
              1,
              true,
            ]}
          />
          <meshBasicMaterial map={texture} side={DoubleSide} opacity={3} />
        </mesh>
      )}
    </group>
  );
}
