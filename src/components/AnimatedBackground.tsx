import { useEffect, useState } from 'react';
import backgroundImage from '@/assets/lofi-background.jpg';

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

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      />
      
      {/* Animated floating elements */}
      {animationsEnabled && (
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-4 h-4 bg-sage/30 rounded-full animate-float" 
               style={{ animationDelay: '0s' }} />
          <div className="absolute top-40 right-20 w-6 h-6 bg-terracotta/20 rounded-full animate-float" 
               style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-dusty-rose/40 rounded-full animate-float" 
               style={{ animationDelay: '4s' }} />
          <div className="absolute top-1/3 right-1/3 w-5 h-5 bg-primary/25 rounded-full animate-float" 
               style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-20 right-10 w-4 h-4 bg-accent/30 rounded-full animate-float" 
               style={{ animationDelay: '3s' }} />
        </div>
      )}

      {/* Gradient overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-background/80" />
    </div>
  );
};