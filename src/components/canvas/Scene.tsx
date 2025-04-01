import { useState, useEffect, useRef } from 'react';
import { Stage, Layer, Image as KonvaImage, Rect, Transformer, Group } from 'react-konva';
import useImage from 'use-image';
import b1 from '../../assets/images/Bordeaux_Basic-removebg-preview.png';
import b2 from '../../assets/images/Burgundy_Basic-removebg-preview.png';
import b3 from '../../assets/images/Rhone_Basic-removebg-preview.png';
import b4 from '../../assets/images/Champagne_Basic-removebg-preview.png';
import b5 from '../../assets/images/Port_375ml-removebg-preview.png';
import b6 from '../../assets/images/Port_750ml-removebg-preview.png';
import cap1 from '../../assets/images/2c.png';
import cap2 from '../../assets/images/Black_Capsule_Matte-removebg-preview (1).png';
import cap3 from '../../assets/images/Black_Capsule_Screwcap-removebg-preview.png';
import Konva from 'konva';

const bottleImages = { bordeaux: b1, burgundy: b2, alsace: b3, champagne: b4, port: b5, rhine: b6 };
const capsuleImages = {
  cork: cap1,
  screw: cap2,
  synthetic: cap3,
  none: '',
};

interface DesignProps {
  type: string;
  capsule?: string;
  label?: string;
  color?: string;
  capsuleColor?: string;
  texture?: string;
}

export default function BottleModel({ design }: { design: DesignProps }) {
  const [bottle] = useImage(bottleImages[design.type]);
  const [capsule] = useImage(design.capsule ? capsuleImages[design.capsule] : '');
  const [label] = useImage(design.label || '');

  const [capsuleGroupProps, setCapsuleGroupProps] = useState({
    x: 416,
    y: 42,
    width: 76,
    height: 70,
    scaleX: 1,
    scaleY: 1,
  });
  const [labelProps, setLabelProps] = useState({ x: 400, y: 250, width: 100, height: 80 });
  const [isCapsuleSelected, setIsCapsuleSelected] = useState(false);
  const [isLabelSelected, setIsLabelSelected] = useState(false);
  const [textureImage, setTextureImage] = useState<HTMLImageElement | null>(null);

  const capsuleGroupRef = useRef<Konva.Group>(null);
  const capsuleTransformerRef = useRef<Konva.Transformer>(null);
  const labelRef = useRef<Konva.Image>(null);
  const labelTransformerRef = useRef<Konva.Transformer>(null);

  const toggleCapsuleSelection = () => {
    setIsCapsuleSelected((prev) => !prev);
    setIsLabelSelected(false);
  };

  const toggleLabelSelection = () => {
    setIsLabelSelected((prev) => !prev);
    setIsCapsuleSelected(false);
  };

  const handleStageClick = (e: any) => {
    if (e.target === e.target.getStage()) {
      setIsCapsuleSelected(false);
      setIsLabelSelected(false);
    }
  };

  useEffect(() => {
    if (capsuleTransformerRef.current && capsuleGroupRef.current) {
      capsuleTransformerRef.current.nodes(isCapsuleSelected ? [capsuleGroupRef.current] : []);
      capsuleTransformerRef.current.getLayer()?.batchDraw();
    }
  }, [isCapsuleSelected]);

  useEffect(() => {
    if (labelTransformerRef.current && labelRef.current) {
      labelTransformerRef.current.nodes(isLabelSelected ? [labelRef.current] : []);
      labelTransformerRef.current.getLayer()?.batchDraw();
    }
  }, [isLabelSelected]);

  useEffect(() => {
    if (!design.texture) {
      setTextureImage(null);
      return;
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 120;
    canvas.height = 80;

    if (design.texture === 'rough') {
      ctx.fillStyle = '#ddd';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < 2000; i++) {
        ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.2})`;
        ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 1, 1);
      }
    } else if (design.texture === 'hammered') {
      ctx.fillStyle = '#ccc';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 0.5;
      for (let i = 0; i < 50; i++) {
        ctx.beginPath();
        ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 15 + 5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.1)';
        ctx.fill();
      }
    } else if (design.texture === 'frosted') {
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else if (design.texture === 'matte') {
      ctx.fillStyle = 'rgba(0,0,0,0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Convert canvas to image
    const img = new Image();
    img.onload = () => {
      setTextureImage(img);
    };
    img.src = canvas.toDataURL();
  }, [design.texture]);

  return (
    <Stage width={900} height={600} onClick={handleStageClick}>
      <Layer>
        <KonvaImage image={bottle} x={400} y={40} width={100} height={400} />
        {design.color && (
          <Rect
            x={400}
            y={40}
            width={100}
            height={400}
            fill={design.color}
            opacity={0.7}
            globalCompositeOperation="source-atop"
          />
        )}
        {capsule && (
          <>
            <Group
              ref={capsuleGroupRef}
              {...capsuleGroupProps}
              draggable
              onClick={toggleCapsuleSelection}
              onTap={toggleCapsuleSelection}
              onDragEnd={(e) => setCapsuleGroupProps({ ...capsuleGroupProps, x: e.target.x(), y: e.target.y() })}
              onTransformEnd={(e) => {
                const node = e.target;
                setCapsuleGroupProps({
                  ...capsuleGroupProps,
                  x: node.x(),
                  y: node.y(),
                  scaleX: node.scaleX(),
                  scaleY: node.scaleY(),
                });
              }}
            >
              <KonvaImage image={capsule} width={capsuleGroupProps.width} height={capsuleGroupProps.height} />
              {design.capsuleColor && (
                <Rect
                  width={capsuleGroupProps.width}
                  height={capsuleGroupProps.height}
                  fill={design.capsuleColor}
                  opacity={0.5}
                  globalCompositeOperation="source-atop"
                />
              )}
            </Group>
            {isCapsuleSelected && (
              <Transformer
                ref={capsuleTransformerRef}
                boundBoxFunc={(oldBox, newBox) => (newBox.width < 20 || newBox.height < 20 ? oldBox : newBox)}
              />
            )}
          </>
        )}
        {label && (
          <>
            <KonvaImage
              ref={labelRef}
              image={label}
              {...labelProps}
              draggable
              onClick={toggleLabelSelection}
              onTap={toggleLabelSelection}
              onDragEnd={(e) => setLabelProps({ ...labelProps, x: e.target.x(), y: e.target.y() })}
              onTransformEnd={() => {
                const node = labelRef.current;
                if (node) {
                  setLabelProps({
                    ...labelProps,
                    x: node.x(),
                    y: node.y(),
                    width: node.width() * node.scaleX(),
                    height: node.height() * node.scaleY(),
                  });
                  node.scaleX(1);
                  node.scaleY(1);
                }
              }}
            />
            {isLabelSelected && (
              <Transformer
                ref={labelTransformerRef}
                boundBoxFunc={(oldBox, newBox) => (newBox.width < 20 || newBox.height < 20 ? oldBox : newBox)}
              />
            )}
            {textureImage && (
              <Rect
                x={labelProps.x}
                y={labelProps.y}
                width={labelProps.width}
                height={labelProps.height}
                fillPatternImage={textureImage}
                opacity={0.4}
                globalCompositeOperation="source-atop"
              />
            )}
          </>
        )}
      </Layer>
    </Stage>
  );
}