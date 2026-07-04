import { create } from 'zustand';

/**
 * Zustand Store: Story & Scene State
 * Tracks active scene, scroll progress, and emits analytics events without re-rendering unrelated components.
 */
export const useStoryStore = create((set, get) => ({
  activeSceneIndex: 0,
  scrollProgress: 0,
  visitedScenes: new Set([0]),
  analyticsCallbacks: [],

  setActiveSceneIndex: (index) => {
    const { activeSceneIndex, visitedScenes, emitAnalytics } = get();
    if (index !== activeSceneIndex) {
      const updatedVisited = new Set(visitedScenes).add(index);
      set({ activeSceneIndex: index, visitedScenes: updatedVisited });
      emitAnalytics('exhibit_viewed', { index });
    }
  },

  setScrollProgress: (progress) => {
    set({ scrollProgress: progress });
  },

  registerAnalyticsCallback: (cb) => {
    set((state) => ({
      analyticsCallbacks: [...state.analyticsCallbacks, cb],
    }));
    return () => {
      set((state) => ({
        analyticsCallbacks: state.analyticsCallbacks.filter((c) => c !== cb),
      }));
    };
  },

  emitAnalytics: (eventName, payload) => {
    const { analyticsCallbacks } = get();
    analyticsCallbacks.forEach((cb) => {
      try {
        cb(eventName, payload);
      } catch (err) {
        console.error('Analytics callback error:', err);
      }
    });
  },
}));
