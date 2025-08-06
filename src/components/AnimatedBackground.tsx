
import { useEffect, useState } from 'react';
import { AnimatedBackgrounds } from './AnimatedBackgrounds';

interface AnimatedBackgroundProps {
  scene?: string;
  animationsEnabled?: boolean;
}

export const AnimatedBackground = ({ 
  scene = 'lofi', 
  animationsEnabled = true 
}: AnimatedBackgroundProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Legacy support for existing 'lofi' scene
  const normalizedScene = scene === 'lofi' ? 'day' : scene;

  return <AnimatedBackgrounds scene={normalizedScene} animationsEnabled={animationsEnabled} />;
};
