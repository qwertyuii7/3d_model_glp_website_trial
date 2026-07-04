import { create } from 'zustand';

/**
 * Finite State Machine for Resource Loading
 * States: idle -> preloading -> loadingModel -> introAnimation -> ready -> error
 */
export const useResourceManager = create((set, get) => ({
  status: 'idle', // idle | preloading | loadingModel | introAnimation | ready | error
  progress: 0, // 0 to 100
  errorMessage: null,
  startTime: null,
  loadDurationMs: 0,

  startLoading: () => {
    set({ status: 'preloading', progress: 5, startTime: performance.now(), errorMessage: null });
  },

  setModelProgress: (val) => {
    // val is 0 to 1 from <model-viewer> progress event
    const pct = Math.min(Math.round(val * 90) + 5, 95);
    set({ status: 'loadingModel', progress: pct });
  },

  onModelLoaded: () => {
    const duration = get().startTime ? Math.round(performance.now() - get().startTime) : 0;
    set({ status: 'introAnimation', progress: 100, loadDurationMs: duration });
    // Event-driven cinematic intro completion
    setTimeout(() => {
      set({ status: 'ready' });
    }, 1500); // 1.5s cinematic intro fade/fly-in
  },

  onError: (err) => {
    console.error('Resource Manager Error:', err);
    set({ status: 'error', errorMessage: err?.message || 'Unable to load exhibition assets.' });
  },

  retry: () => {
    set({ status: 'idle', progress: 0, errorMessage: null });
  },
}));
