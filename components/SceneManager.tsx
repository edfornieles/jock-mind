import { useState, useEffect } from 'react';
import { Scene } from './Scene';
import type { Scene as SceneType } from '@/data/scenes';

interface SceneManagerProps {
  scenes: SceneType[];
}

export const SceneManager: React.FC<SceneManagerProps> = ({ scenes }) => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const currentScene = scenes[currentSceneIndex];
    const totalDuration = currentScene.duration * 1000;

    const timer = setTimeout(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSceneIndex((prev) => (prev + 1) % scenes.length);
        setIsTransitioning(false);
      }, 1000); // 1s transition between scenes
    }, totalDuration);

    return () => clearTimeout(timer);
  }, [currentSceneIndex, scenes]);

  return (
    <div className={`transition-opacity duration-1000 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
      <Scene scene={scenes[currentSceneIndex]} />
    </div>
  );
}; 