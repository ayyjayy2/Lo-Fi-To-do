
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
      {/* Kawaii Sun */}
      <div className="absolute top-8 right-16 w-16 h-16 bg-yellow-300 rounded-full shadow-lg animate-pulse relative">
        <div className="absolute inset-0 bg-yellow-200 rounded-full blur-md opacity-50 animate-pulse" />
        <div className="absolute top-4 left-4 w-2 h-2 bg-yellow-800 rounded-full" />
        <div className="absolute top-4 right-4 w-2 h-2 bg-yellow-800 rounded-full" />
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-3 h-1 bg-yellow-800 rounded-full" />
      </div>
      
      {/* Fluffy Clouds */}
      <div className="absolute top-12 left-20 animate-float" style={{ animationDelay: '0s' }}>
        <div className="w-24 h-12 bg-white/90 rounded-full relative shadow-sm">
          <div className="absolute -top-2 left-4 w-8 h-8 bg-white/80 rounded-full" />
          <div className="absolute -top-1 right-4 w-6 h-6 bg-white/85 rounded-full" />
        </div>
      </div>
      <div className="absolute top-20 right-32 animate-float" style={{ animationDelay: '2s' }}>
        <div className="w-20 h-10 bg-white/85 rounded-full relative shadow-sm">
          <div className="absolute -top-1 left-3 w-6 h-6 bg-white/75 rounded-full" />
          <div className="absolute -top-2 right-3 w-7 h-7 bg-white/80 rounded-full" />
        </div>
      </div>
      
      {/* Grass gradient */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-green-300 via-green-200 to-transparent opacity-80" />
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-green-400/60 to-transparent" />
    </div>
  );

  const renderNightScene = () => (
    <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 via-purple-800 to-indigo-700">
      {/* Detailed Moon */}
      <div className="absolute top-12 right-20 w-12 h-12 bg-yellow-100 rounded-full shadow-lg relative">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-yellow-200 rounded-full" />
        <div className="absolute top-2 left-2 w-1.5 h-1.5 bg-yellow-300 rounded-full opacity-60" />
        <div className="absolute top-4 right-3 w-1 h-1 bg-yellow-300 rounded-full opacity-40" />
        <div className="absolute bottom-3 left-4 w-1 h-1 bg-yellow-300 rounded-full opacity-50" />
        <div className="absolute inset-0 bg-yellow-50/30 rounded-full blur-sm animate-pulse" />
      </div>
      
      {/* Twinkling Stars */}
      {[...Array(25)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
          style={{
            top: `${10 + Math.random() * 60}%`,
            left: `${10 + Math.random() * 80}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        />
      ))}
      
      {/* Reflective lake with ripples */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-indigo-800 via-purple-700/80 to-transparent">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" />
        {animationsEnabled && (
          <div className="absolute bottom-8 left-1/3 w-16 h-1 bg-white/20 rounded-full animate-ping" 
               style={{ animationDelay: '1s', animationDuration: '3s' }} />
        )}
        {animationsEnabled && (
          <div className="absolute bottom-10 right-1/4 w-12 h-1 bg-white/15 rounded-full animate-ping" 
               style={{ animationDelay: '3s', animationDuration: '4s' }} />
        )}
      </div>
      
      {/* Kawaii animals */}
      <div className="absolute bottom-8 left-24 flex items-end gap-4">
        {/* Kawaii Raccoon */}
        <div className="relative">
          <div className="w-6 h-5 bg-gray-400 rounded-full" />
          <div className="absolute -top-1 left-1 w-1.5 h-1.5 bg-gray-400 rounded-full" />
          <div className="absolute -top-1 right-1 w-1.5 h-1.5 bg-gray-400 rounded-full" />
          <div className="absolute top-1 left-1.5 w-1 h-1 bg-black rounded-full" />
          <div className="absolute top-1 right-1.5 w-1 h-1 bg-black rounded-full" />
          <div className="absolute top-2 left-2 w-0.5 h-0.5 bg-pink-300 rounded-full" />
          <div className="absolute -right-3 top-1 w-4 h-0.5 bg-gray-400 rounded-full" />
        </div>
        
        {/* Kawaii Owl */}
        <div className="relative">
          <div className="w-5 h-6 bg-amber-200 rounded-full" />
          <div className="absolute -top-1 left-0.5 w-1 h-2 bg-amber-200 rounded-full transform -rotate-12" />
          <div className="absolute -top-1 right-0.5 w-1 h-2 bg-amber-200 rounded-full transform rotate-12" />
          <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-amber-800 rounded-full" />
          <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-amber-800 rounded-full" />
          <div className="absolute top-2.5 left-2 w-0.5 h-1 bg-orange-400" />
        </div>
      </div>
    </div>
  );

  const renderRainyScene = () => (
    <div className="absolute inset-0 bg-gradient-to-b from-gray-500 via-blue-200 to-blue-100">
      {/* Rain Cloud */}
      <div className="absolute top-6 left-1/4 animate-float">
        <div className="w-32 h-16 bg-gray-600/80 rounded-full relative shadow-lg">
          <div className="absolute -top-2 left-6 w-10 h-10 bg-gray-500/70 rounded-full" />
          <div className="absolute -top-3 right-6 w-12 h-12 bg-gray-600/75 rounded-full" />
        </div>
      </div>
      
      {/* Sliding rain drops */}
      {animationsEnabled && [...Array(25)].map((_, i) => (
        <div
          key={i}
          className="absolute w-0.5 h-6 bg-blue-400/70 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-${Math.random() * 20}px`,
            animation: `slideDown ${1.5 + Math.random()}s linear infinite`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
      
      {/* Atmospheric clouds */}
      <div className="absolute top-16 right-20 w-28 h-14 bg-gray-400/50 rounded-full animate-float" 
           style={{ animationDelay: '1s' }} />
      
      {/* Soft ground matching rainy tones */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-blue-300/80 via-gray-200/60 to-transparent" />
    </div>
  );

  const renderCatsScene = () => (
    <div className="absolute inset-0 bg-gradient-to-b from-pink-200 via-purple-100 to-rose-100">
      {/* Kawaii Cat 1 */}
      <div className="absolute bottom-32 left-20 relative">
        <div className="w-10 h-8 bg-orange-200 rounded-2xl relative border-2 border-orange-300/50">
          <div className="absolute -top-2 left-2 w-2 h-3 bg-orange-200 rounded-full border border-orange-300/50" />
          <div className="absolute -top-2 right-2 w-2 h-3 bg-orange-200 rounded-full border border-orange-300/50" />
          <div className="absolute top-2 left-2.5 w-2 h-2 bg-black rounded-full" />
          <div className="absolute top-2 right-2.5 w-2 h-2 bg-black rounded-full" />
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-pink-400 rounded-full" />
          <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-2 h-1 bg-pink-300 rounded-full" />
          <div className="absolute -right-6 top-3 w-8 h-1 bg-orange-200 rounded-full animate-bounce border border-orange-300/50" 
               style={{ animationDelay: '1s', animationDuration: '3s' }} />
        </div>
      </div>
      
      {/* Kawaii Cat 2 */}
      <div className="absolute bottom-28 right-32 relative">
        <div className="w-12 h-10 bg-gray-200 rounded-2xl relative border-2 border-gray-300/50">
          <div className="absolute -top-2 left-3 w-2 h-3 bg-gray-200 rounded-full border border-gray-300/50" />
          <div className="absolute -top-2 right-3 w-2 h-3 bg-gray-200 rounded-full border border-gray-300/50" />
          <div className="absolute top-3 left-3 w-2 h-2 bg-black rounded-full" />
          <div className="absolute top-3 right-3 w-2 h-2 bg-black rounded-full" />
          <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-pink-400 rounded-full" />
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-3 h-1 bg-pink-300 rounded-full" />
          <div className="absolute -right-7 top-4 w-10 h-1 bg-gray-200 rounded-full animate-bounce border border-gray-300/50" 
               style={{ animationDelay: '2s', animationDuration: '4s' }} />
        </div>
      </div>
      
      {/* Floating hearts */}
      {animationsEnabled && [...Array(12)].map((_, i) => (
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
      
      {/* Soft floor/desk elements */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-purple-200/60 via-pink-100/40 to-transparent" />
      <div className="absolute bottom-8 left-24 text-pink-400 text-2xl animate-bounce" style={{ animationDelay: '1s' }}>🌸</div>
      <div className="absolute bottom-12 right-28 text-yellow-400 text-xl animate-bounce" style={{ animationDelay: '3s' }}>🌻</div>
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-purple-400 text-lg animate-bounce" style={{ animationDelay: '2s' }}>✨</div>
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
      
      {/* CSS for sliding rain animation */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            transform: translateY(-100vh);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          to {
            transform: translateY(100vh);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
