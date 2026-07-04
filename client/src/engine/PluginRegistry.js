import { useUIStore } from '../store/uiStore';

/**
 * Formal Plugin Registration API
 * Exposes registerPlugin({ id, component, onSceneEnter, onSceneExit, toolbarButton })
 */
export const PluginRegistry = {
  register: (pluginConfig) => {
    if (!pluginConfig.id || !pluginConfig.component) {
      console.warn('Plugin registration failed: missing id or component', pluginConfig);
      return;
    }
    useUIStore.getState().registerPlugin(pluginConfig);
  },

  unregister: (pluginId) => {
    const currentPlugins = { ...useUIStore.getState().plugins };
    delete currentPlugins[pluginId];
    useUIStore.setState({ plugins: currentPlugins });
  },

  getAll: () => {
    return useUIStore.getState().plugins;
  },
};
