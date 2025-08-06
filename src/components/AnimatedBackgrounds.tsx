
import { useEffect, useState } from 'react';

interface AnimatedBackgroundsProps {
  scene: string;
  animationsEnabled: boolean;
}

export const AnimatedBackgrounds = ({ 
  scene, 
  animationsEnabled 
}: AnimatedBackgroundsProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const renderDayScene = () => (
    <div className="absolute inset-0 bg-gradient-to-b from-blue-200 via-pink-100 to-yellow-100">
      {/* Sun */}
      <div className="absolute top-8 right-16 w-16 h-16 bg-yellow-300 rounded-full shadow-lg animate-pulse" />
      
      {/* Clouds */}
      <div className="absolute top-12 left-20 w-24 h-12 bg-white/80 rounded-full animate-float" 
           style={{ animationDelay: '0s' }} />
      <div className="absolute top-20 right-32 w-20 h-10 bg-white/70 rounded-full animate-float" 
           style={{ animationDelay: '2s' }} />
      
      {/* Mountains */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-green-200 to-green-100" />
      <div className="absolute bottom-16 left-10 w-0 h-0 border-l-16 border-r-16 border-b-24 border-transparent border-b-sage/40" />
      <div className="absolute bottom-12 right-20 w-0 h-0 border-l-20 border-r-20 border-b-32 border-transparent border-b-sage/30" />
    </div>
  );

  const renderNightScene = () => (
    <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 via-purple-800 to-indigo-700">
      {/* Moon */}
      <div className="absolute top-12 right-20 w-12 h-12 bg-yellow-100 rounded-full shadow-lg animate-pulse" />
      
      {/* Stars */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
          style={{
            top: `${10 + Math.random() * 60}%`,
            left: `${10 + Math.random() * 80}%`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}
      
      {/* City silhouette */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-900 to-gray-700" />
      <div className="absolute bottom-0 left-16 w-8 h-20 bg-gray-800" />
      <div className="absolute bottom-0 left-32 w-12 h-16 bg-gray-800" />
      <div className="absolute bottom-0 right-24 w-10 h-24 bg-gray-800" />
    </div>
  );

  const renderRainyScene = () => (
    <div className="absolute inset-0 bg-gradient-to-b from-gray-400 via-gray-300 to-blue-200">
      {/* Rain drops */}
      {animationsEnabled && [...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute w-0.5 h-8 bg-blue-300/60 animate-bounce"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: '1s',
          }}
        />
      ))}
      
      {/* Clouds */}
      <div className="absolute top-8 left-16 w-28 h-14 bg-gray-500/60 rounded-full animate-float" />
      <div className="absolute top-16 right-20 w-32 h-16 bg-gray-400/50 rounded-full animate-float" 
           style={{ animationDelay: '1s' }} />
      
      {/* Ground */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-green-300 to-green-200" />
    </div>
  );

  const renderCatsScene = () => (
    <div className="absolute inset-0 bg-gradient-to-b from-orange-200 via-pink-100 to-purple-100">
      {/* Cats */}
      <div className="absolute bottom-32 left-20 flex items-end">
        {/* Cat 1 */}
        <div className="relative">
          <div className="w-8 h-6 bg-orange-300 rounded-full" />
          <div className="absolute -top-2 left-1 w-2 h-2 bg-orange-300 rounded-full" />
          <div className="absolute -top-2 right-1 w-2 h-2 bg-orange-300 rounded-full" />
          <div className="absolute top-1 left-2 w-1 h-1 bg-black rounded-full" />
          <div className="absolute top-1 right-2 w-1 h-1 bg-black rounded-full" />
          <div className="absolute -right-4 top-2 w-6 h-1 bg-orange-300 rounded-full animate-bounce" 
               style={{ animationDelay: '1s', animationDuration: '3s' }} />
        </div>
      </div>
      
      <div className="absolute bottom-28 right-32 flex items-end">
        {/* Cat 2 */}
        <div className="relative">
          <div className="w-10 h-8 bg-gray-400 rounded-full" />
          <div className="absolute -top-2 left-2 w-2 h-2 bg-gray-400 rounded-full" />
          <div className="absolute -top-2 right-2 w-2 h-2 bg-gray-400 rounded-full" />
          <div className="absolute top-2 left-3 w-1 h-1 bg-black rounded-full" />
          <div className="absolute top-2 right-3 w-1 h-1 bg-black rounded-full" />
          <div className="absolute -right-5 top-3 w-8 h-1 bg-gray-400 rounded-full animate-bounce" 
               style={{ animationDelay: '2s', animationDuration: '4s' }} />
        </div>
      </div>
      
      {/* Floating hearts */}
      {animationsEnabled && [...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute text-pink-400 text-lg animate-float"
          style={{
            top: `${20 + Math.random() * 60}%`,
            left: `${10 + Math.random() * 80}%`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        >
          ♡
        </div>
      ))}
      
      {/* Ground with flowers */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-green-200 to-green-100" />
      <div className="absolute bottom-8 left-24 text-pink-400 text-2xl">🌸</div>
      <div className="absolute bottom-12 right-28 text-yellow-400 text-xl">🌻</div>
    </div>
  );

  const scenes = {
    day: renderDayScene,
    night: renderNightScene,
    raining: renderRainyScene,
    cats: renderCatsScene,
  };

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {scenes[scene as keyof typeof scenes]?.() || scenes.day()}
      
      {/* Floating particles */}
      {animationsEnabled && (
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-2 h-2 bg-sage/30 rounded-full animate-float" 
               style={{ animationDelay: '0s' }} />
          <div className="absolute top-40 right-20 w-3 h-3 bg-terracotta/20 rounded-full animate-float" 
               style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-32 left-1/4 w-1 h-1 bg-dusty-rose/40 rounded-full animate-float" 
               style={{ animationDelay: '4s' }} />
          <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-primary/25 rounded-full animate-float" 
               style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-20 right-10 w-2 h-2 bg-accent/30 rounded-full animate-float" 
               style={{ animationDelay: '3s' }} />
        </div>
      )}

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/70 via-background/50 to-background/70" />
    </div>
  );
};
