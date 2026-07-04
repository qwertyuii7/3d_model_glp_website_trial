import { create } from 'zustand';

/**
 * Zustand Store: Developer & Calibration Metrics
 * Tracks live FPS, frame times, model load duration, and live camera coordinates for developers.
 */
export const useDeveloperStore = create((set) => ({
  fps: 60,
  frameTime: 16.6,
  modelLoadTimeMs: 0,
  liveOrbit: '30deg 75deg 18m',
  liveTarget: '0m 6m 0m',
  liveFov: '35deg',
  isDevHUDOpen: false,

  setMetrics: (metrics) => {
    set((state) => ({ ...state, ...metrics }));
  },

  setLiveCamera: (liveOrbit, liveTarget, liveFov) => {
    set({ liveOrbit, liveTarget, liveFov });
  },

  toggleDevHUD: () => {
    set((state) => ({ isDevHUDOpen: !state.isDevHUDOpen }));
  },
}));
