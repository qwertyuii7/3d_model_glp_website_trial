import React from 'react';
import { useStoryStore } from '../store/storyStore';
import { useUIStore } from '../store/uiStore';

/**
 * Navigation Component
 * Desktop side icon nav & Mobile bottom sheet drawer. Pure CSS classes.
 */
const sceneIcons = {
  Landmark: '🏛️', Compass: '🧭', Bone: '🦴', Footprints: '🦕',
  Trees: '🌳', Layers: '🪨', Sparkles: '☄️', BookOpen: '📜',
  Bug: '🐞', Sprout: '🌿', CircleDot: '🪸', Waves: '🐟',
  Maximize2: '🦒', Cpu: '⚙️', Eye: '👁️',
};

export const Navigation = React.memo(function Navigation({ scenes }) {
  const activeSceneIndex = useStoryStore((s) => s.activeSceneIndex);
  const setActiveSceneIndex = useStoryStore((s) => s.setActiveSceneIndex);
  const isMobileDrawerOpen = useUIStore((s) => s.isMobileDrawerOpen);
  const setMobileDrawerOpen = useUIStore((s) => s.setMobileDrawerOpen);
  const isScreenshotMode = useUIStore((s) => s.isScreenshotMode);

  if (isScreenshotMode || !scenes) return null;

  const jumpTo = (idx) => {
    setActiveSceneIndex(idx);
    setMobileDrawerOpen(false);
    const card = document.querySelector(`[data-scene-index="${idx}"]`);
    if (card) card.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Desktop Side Nav */}
      <nav className="side-nav">
        {scenes.map((scene, idx) => {
          const isActive = idx === activeSceneIndex;
          return (
            <button
              key={scene.id}
              className={`side-nav-btn ${isActive ? 'active' : ''}`}
              onClick={() => jumpTo(idx)}
              title={`${String(idx + 1).padStart(2, '0')}. ${scene.title}`}
            >
              {sceneIcons[scene.icon] || '🏛️'}
              <span className="side-nav-tooltip">
                {String(idx + 1).padStart(2, '0')}. {scene.title}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Mobile Trigger */}
      <button
        className="mobile-nav-trigger"
        onClick={() => setMobileDrawerOpen(true)}
        aria-label="Open exhibition menu"
      >
        🧭
      </button>

      {/* Mobile Drawer */}
      {isMobileDrawerOpen && (
        <div className="mobile-drawer-backdrop open" onClick={() => setMobileDrawerOpen(false)}>
          <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-handle" />
            <div className="mobile-drawer-header">
              <h3>Exhibition Directory</h3>
              <button className="mobile-drawer-close" onClick={() => setMobileDrawerOpen(false)}>✕</button>
            </div>
            <div className="mobile-drawer-list">
              {scenes.map((scene, idx) => {
                const isActive = idx === activeSceneIndex;
                return (
                  <button
                    key={scene.id}
                    className={`mobile-drawer-item ${isActive ? 'active' : ''}`}
                    onClick={() => jumpTo(idx)}
                  >
                    <div className="mobile-drawer-item-icon" style={{
                      background: isActive ? 'var(--accent)' : 'rgba(255,255,255,0.08)',
                      color: isActive ? '#000' : '#fff'
                    }}>
                      {sceneIcons[scene.icon] || '🏛️'}
                    </div>
                    <div>
                      <div className="item-meta">Exhibit {String(idx + 1).padStart(2, '0')}</div>
                      <div className="item-title">{scene.title}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
});
