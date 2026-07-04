import { create } from 'zustand';
import { frameworkConfig } from '../framework.config';

export const useUIStore = create((set, get) => ({
  lightingPreset: 'neutral',
  isAudioPlaying: false,
  isScreenshotMode: false,
  isMobileDrawerOpen: false,
  plugins: {},
  activePluginId: null,

  setLightingPreset: (preset) => {
    if (frameworkConfig.lightingPresets[preset]) {
      set({ lightingPreset: preset });
    }
  },

  toggleAudio: () => {
    set((state) => ({ isAudioPlaying: !state.isAudioPlaying }));
  },

  toggleScreenshotMode: () => {
    set((state) => ({ isScreenshotMode: !state.isScreenshotMode }));
  },

  setMobileDrawerOpen: (open) => {
    set({ isMobileDrawerOpen: open });
  },

  registerPlugin: (pluginConfig) => {
    set((state) => ({
      plugins: {
        ...state.plugins,
        [pluginConfig.id]: pluginConfig,
      },
    }));
  },

  setActivePlugin: (pluginId) => {
    set({ activePluginId: pluginId });
  },
}));
