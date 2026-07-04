import { useEffect, useRef } from 'react';
import { useCameraStore } from '../store/cameraStore';
import { frameworkConfig } from '../framework.config';

/**
 * Decoupled Animation Engine
 * Handles cubic/quartic easing, transition durations, and immediate tween interruption.
 */
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

    // Check for reduced motion
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = isReducedMotion
      ? frameworkConfig.accessibility.reducedMotionCameraDuration
      : frameworkConfig.transitions.cameraDuration;

    // Interrupt previous tween
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }

    // Apply new camera attributes with smooth built-in WebGL interpolation
    if (orbit) viewer.setAttribute('camera-orbit', orbit);
    if (target) viewer.setAttribute('camera-target', target);
    if (fov) viewer.setAttribute('field-of-view', fov);

    // Set interpolation decay for Apple Vision Pro cubic smoothness
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
