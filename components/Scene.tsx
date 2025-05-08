import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import type { Scene as SceneType } from '@/data/scenes';

interface SceneProps {
  scene: SceneType;
}

export const Scene: React.FC<SceneProps> = ({ scene }) => {
  const [currentThoughtIndex, setCurrentThoughtIndex] = useState(0);
  const [fadeState, setFadeState] = useState<'in' | 'out'>('in');
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const nextImageRef = useRef<HTMLImageElement>(null);

  // Preload next scene's image
  useEffect(() => {
    if (nextImageRef.current) {
      nextImageRef.current.src = scene.background;
    }
  }, [scene.background]);

  // Handle thought transitions
  useEffect(() => {
    const thoughtDuration = scene.duration * 1000 / scene.thoughts.length;
    const fadeOutTime = thoughtDuration - 2000; // Start fade out 2s before next thought
    const transitionTime = 2000; // 2s for fade in/out

    const cycleThought = () => {
      // Start fade out
      setFadeState('out');

      // After fade out, change thought and fade in
      setTimeout(() => {
        setCurrentThoughtIndex((prev) => (prev + 1) % scene.thoughts.length);
        setFadeState('in');
      }, transitionTime);
    };

    const interval = setInterval(cycleThought, thoughtDuration);
    return () => clearInterval(interval);
  }, [scene.thoughts.length, scene.duration]);

  return (
    <div className="relative w-full h-screen">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={scene.background}
          alt={`Scene background for ${scene.id}`}
          fill
          className="object-cover"
          priority
          onLoad={() => setIsImageLoaded(true)}
        />
        {/* Preload next image */}
        <img ref={nextImageRef} className="hidden" alt="Next scene" />
      </div>

      {/* Thought Text */}
      <div 
        className={`absolute inset-0 flex items-center justify-center p-8 transition-opacity duration-2000 ${
          fadeState === 'in' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <p className="text-white text-4xl font-bold text-center max-w-3xl">
          {scene.thoughts[currentThoughtIndex]}
        </p>
      </div>
    </div>
  );
}; 