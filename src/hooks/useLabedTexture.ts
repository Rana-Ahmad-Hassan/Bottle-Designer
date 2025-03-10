import { useLoader } from '@react-three/fiber';
import { useMemo } from 'react';
import { TextureLoader } from 'three';

function useLabelTexture(labelTexture: string | null) {
  return useMemo(() => {
    if (!labelTexture) return null;
    return useLoader(TextureLoader, labelTexture);
  }, [labelTexture]);
}

export default useLabelTexture;
