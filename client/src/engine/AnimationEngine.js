import { useEffect, useRef } from 'react';
import { useCameraStore } from '../store/cameraStore';
import { frameworkConfig } from '../framework.config';

export function useAnimationEngine(modelViewerRef) {
  const orbit = useCameraStore((state) => state.orbit);
  const target = useCameraStore((state) => state.target);
  const fov = useCameraStore((state) => state.fov);
  const isTransitioning = useCameraStore((state) => state.isTransitioning);
  const completeTransition = useCameraStore((state) => state.completeTransition);
  const isCalibrationMode = useCameraStore((state) => state.isCalibrationMode);

  const transitionTimeoutRef = useRef(null);

  useEffect(() => {
    if (!modelViewerRef.current || isCalibrationMode || !isTransitioning) return;

    const viewer = modelViewerRef.current;

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = isReducedMotion
      ? frameworkConfig.accessibility.reducedMotionCameraDuration
      : frameworkConfig.transitions.cameraDuration;

    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }

    if (orbit) viewer.setAttribute('camera-orbit', orbit);
    if (target) viewer.setAttribute('camera-target', target);
    if (fov) viewer.setAttribute('field-of-view', fov);

    viewer.setAttribute('interpolation-decay', isReducedMotion ? '50' : '150');

    transitionTimeoutRef.current = setTimeout(() => {
      completeTransition();
    }, duration);

    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, [orbit, target, fov, isTransitioning, isCalibrationMode, completeTransition, modelViewerRef]);
}
