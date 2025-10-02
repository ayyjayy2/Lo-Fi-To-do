
import { useEffect, useState } from 'react';
import { AnimatedBackgrounds } from './AnimatedBackgrounds';

interface AnimatedBackgroundProps {
  scene?: string;
  animationsEnabled?: boolean;
  listName?: string;
}

// Detects emojis in title and returns appropriate theme
const detectThemeFromTitle = (title: string): string => {
  if (!title) return 'day';
  
  const emojiThemeMap: Record<string, string> = {
    // Autumn
    '🍂': 'autumn',
    '🍁': 'autumn',
    '🎃': 'autumn-cozy',
    '🍄': 'autumn-forest',
    '🌽': 'autumn-harvest',
    
    // Winter
    '❄️': 'winter',
    '⛄': 'winter',
    '☃️': 'winter',
    
    // Spring
    '🌸': 'spring',
    '🌺': 'spring',
    '🌼': 'spring',
    '🌷': 'spring',
    
    // Summer
    '🏖️': 'summer-beach',
    '🏝️': 'summer-beach',
    '🌊': 'summer-beach',
    '🌻': 'summer-garden',
    '🌹': 'summer-garden',
    
    // Weather
    '☀️': 'day',
    '🌞': 'day',
    '🌙': 'night',
    '⭐': 'night',
    '🌟': 'night',
    '🌧️': 'raining',
    '☁️': 'raining',
    '⛈️': 'raining',
    
    // Animals
    '🐱': 'cats',
    '😺': 'cats',
    '🐈': 'cats',
    '🐾': 'cats',
  };
  
  // Find first matching emoji in title
  for (const [emoji, theme] of Object.entries(emojiThemeMap)) {
    if (title.includes(emoji)) {
      return theme;
    }
  }
  
  return 'day'; // Default fallback
};

export const AnimatedBackground = ({ 
  scene = 'lofi', 
  animationsEnabled = true,
  listName = ''
}: AnimatedBackgroundProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Legacy support for existing 'lofi' scene
  let normalizedScene = scene === 'lofi' ? 'day' : scene;
  
  // If theme-by-title is selected, detect theme from list name
  if (normalizedScene === 'theme-by-title' && listName) {
    normalizedScene = detectThemeFromTitle(listName);
  } else if (normalizedScene === 'theme-by-title') {
    // Fallback if no list name provided
    normalizedScene = 'day';
  }

  return <AnimatedBackgrounds scene={normalizedScene} animationsEnabled={animationsEnabled} />;
};
