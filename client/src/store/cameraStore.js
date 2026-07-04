import { create } from 'zustand';

/**
 * Zustand Store: Authoritative Camera State
 * Manages orbit, target, fov, and interruption flags for discrete cubic/quartic camera tweening.
 */
export const useCameraStore = create((set, get) => ({
  orbit: '30deg 75deg 18m',
  target: '0m 6m 0m',
  fov: '35deg',
  isTransitioning: false,
  isInterrupted: false,
  isCalibrationMode: false,

  setCameraTarget: (orbit, target, fov) => {
    set({
      orbit,
      target: target || get().target,
      fov: fov || get().fov,
      isTransitioning: true,
      isInterrupted: false,
    });
  },

  interruptTransition: () => {
    if (get().isTransitioning) {
      set({ isInterrupted: true, isTransitioning: false });
    }
  },

  completeTransition: () => {
    set({ isTransitioning: false, isInterrupted: false });
  },

  setCalibrationMode: (active) => {
    set({ isCalibrationMode: active });
  },
}));
