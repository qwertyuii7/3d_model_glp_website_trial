import React, { useState, useEffect } from 'react';
import { useResourceManager } from '../engine/ResourceManager';

export const Loader = React.memo(function Loader() {
  const status = useResourceManager((s) => s.status);
  const progress = useResourceManager((s) => s.progress);
  const errorMessage = useResourceManager((s) => s.errorMessage);
  const retry = useResourceManager((s) => s.retry);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (status === 'ready') {
      const t = setTimeout(() => setHidden(true), 1600);
      return () => clearTimeout(t);
    }
  }, [status]);

  if (hidden) return null;

  if (status === 'error') {
    return (
      <div className="error-screen">
        <div className="error-box">
          <h2>Unable to load exhibition</h2>
          <p>{errorMessage}</p>
          <button onClick={retry}>Retry</button>
        </div>
      </div>
    );
  }

  const texts = {
    idle: 'Initializing...',
    preloading: 'Loading museum assets',
    loadingModel: 'Preparing exhibition',
    introAnimation: 'Entering Hintze Hall',
  };

  return (
    <div className={`loader ${status === 'ready' ? 'hidden' : ''}`}>
      <div className="loader-inner">
        <div className="loader-eyebrow">Natural History Museum</div>
        <div className="loader-heading">Hintze Hall</div>
        <div className="loader-bar">
          <div className="loader-bar-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="loader-status">{texts[status] || ''}</div>
      </div>
    </div>
  );
});
