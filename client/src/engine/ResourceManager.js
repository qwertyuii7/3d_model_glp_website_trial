import { create } from 'zustand';

export const useResourceManager = create((set, get) => ({
  status: 'idle',
  progress: 0,
  errorMessage: null,
  startTime: null,
  loadDurationMs: 0,

  startLoading: () => {
    set({ status: 'preloading', progress: 5, startTime: performance.now(), errorMessage: null });
  },

  setModelProgress: (val) => {

    const pct = Math.min(Math.round(val * 90) + 5, 95);
    set({ status: 'loadingModel', progress: pct });
  },

  onModelLoaded: () => {
    const duration = get().startTime ? Math.round(performance.now() - get().startTime) : 0;
    set({ status: 'introAnimation', progress: 100, loadDurationMs: duration });

    setTimeout(() => {
      set({ status: 'ready' });
    }, 1500);
  },

  onError: (err) => {
    console.error('Resource Manager Error:', err);
    set({ status: 'error', errorMessage: err?.message || 'Unable to load exhibition assets.' });
  },

  retry: () => {
    set({ status: 'idle', progress: 0, errorMessage: null });
  },
}));
