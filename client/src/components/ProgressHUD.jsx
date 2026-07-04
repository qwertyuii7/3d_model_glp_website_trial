import React, { useState, useEffect } from 'react';
import { useStoryStore } from '../store/storyStore';
import { useUIStore } from '../store/uiStore';

export const ProgressHUD = React.memo(function ProgressHUD({ scenes }) {
  const activeSceneIndex = useStoryStore((s) => s.activeSceneIndex);
  const isScreenshotMode = useUIStore((s) => s.isScreenshotMode);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (h > 0) setPct((window.scrollY / h) * 100);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (isScreenshotMode || !scenes) return null;
  const s = scenes[activeSceneIndex] || scenes[0];

  return (
    <>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="btm-label">
        <span className="btm-num">{String(activeSceneIndex + 1).padStart(2, '0')} / {String(scenes.length).padStart(2, '0')}</span>
        <div className="btm-sep" />
        <span className="btm-title">{s.title}</span>
      </div>
    </>
  );
});
