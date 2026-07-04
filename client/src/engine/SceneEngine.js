import { useEffect } from 'react';
import { useStoryStore } from '../store/storyStore';
import { useCameraStore } from '../store/cameraStore';
import { useUIStore } from '../store/uiStore';
import { frameworkConfig } from '../framework.config';

/**
 * Reusable Scene Timeline Engine
 * Orchestrates IntersectionObserver for self-contained scenes and triggers camera/plugin hooks.
 */
export function useSceneEngine(scenes, cameraPresets) {
  const setActiveSceneIndex = useStoryStore((state) => state.setActiveSceneIndex);
  const activeSceneIndex = useStoryStore((state) => state.activeSceneIndex);
  const setCameraTarget = useCameraStore((state) => state.setCameraTarget);
  const isCalibrationMode = useCameraStore((state) => state.isCalibrationMode);
  const plugins = useUIStore((state) => state.plugins);

  useEffect(() => {
    if (isCalibrationMode || !scenes || scenes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-scene-index'));
            if (!isNaN(index) && index !== activeSceneIndex) {
              // Trigger scene change
              const prevScene = scenes[activeSceneIndex];
              const nextScene = scenes[index];

              // Notify plugins
              Object.values(plugins).forEach((plugin) => {
                if (plugin.onSceneExit && prevScene) plugin.onSceneExit(prevScene);
                if (plugin.onSceneEnter && nextScene) plugin.onSceneEnter(nextScene);
              });

              setActiveSceneIndex(index);

              // Update camera preset if not in calibration mode
              if (cameraPresets && cameraPresets[nextScene.id]) {
                const preset = cameraPresets[nextScene.id];
                setCameraTarget(preset.orbit, preset.target, preset.fov);
              }
            }
          }
        });
      },
      {
        rootMargin: "-20% 0px -40% 0px",
        threshold: 0
      }
    );

    const elements = document.querySelectorAll('.story');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [scenes, cameraPresets, activeSceneIndex, isCalibrationMode, setActiveSceneIndex, setCameraTarget, plugins]);
}
