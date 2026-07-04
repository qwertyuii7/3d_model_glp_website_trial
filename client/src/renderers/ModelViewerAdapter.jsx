import React, { useRef, useEffect } from 'react';
import { useResourceManager } from '../engine/ResourceManager';
import { useDeveloperStore } from '../store/developerStore';
import { useAnimationEngine } from '../engine/AnimationEngine';

/**
 * ModelViewerAdapter — Fullscreen fixed 3D canvas.
 */
export const ModelViewerAdapter = React.memo(function ModelViewerAdapter({ modelSrc }) {
  const viewerRef = useRef(null);
  const startLoading = useResourceManager((s) => s.startLoading);
  const setModelProgress = useResourceManager((s) => s.setModelProgress);
  const onModelLoaded = useResourceManager((s) => s.onModelLoaded);
  const onError = useResourceManager((s) => s.onError);
  const setLiveCamera = useDeveloperStore((s) => s.setLiveCamera);
  const setMetrics = useDeveloperStore((s) => s.setMetrics);

  useAnimationEngine(viewerRef);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;
    startLoading();

    const onProgress = (e) => setModelProgress(e.detail.totalProgress);
    const onLoad = () => onModelLoaded();
    const onErr = () => onError(new Error('Failed to load 3D model.'));
    const onCam = () => {
      try {
        const o = viewer.getCameraOrbit();
        const t = viewer.getCameraTarget();
        const f = viewer.getFieldOfView();
        setLiveCamera(
          `${(o.theta * 180 / Math.PI).toFixed(1)}deg ${(o.phi * 180 / Math.PI).toFixed(1)}deg ${o.radius.toFixed(2)}m`,
          `${t.x.toFixed(2)}m ${t.y.toFixed(2)}m ${t.z.toFixed(2)}m`,
          `${(f * 180 / Math.PI).toFixed(1)}deg`
        );
      } catch(e) {}
    };

    viewer.addEventListener('progress', onProgress);
    viewer.addEventListener('load', onLoad);
    viewer.addEventListener('error', onErr);
    viewer.addEventListener('camera-change', onCam);

    let fc = 0, lt = performance.now(), aid;
    const mfps = () => {
      fc++;
      const n = performance.now();
      if (n - lt >= 1000) {
        const fps = Math.round((fc * 1000) / (n - lt));
        setMetrics({ fps, frameTime: Number((1000 / (fps || 60)).toFixed(1)) });
        fc = 0; lt = n;
      }
      aid = requestAnimationFrame(mfps);
    };
    aid = requestAnimationFrame(mfps);

    return () => {
      viewer.removeEventListener('progress', onProgress);
      viewer.removeEventListener('load', onLoad);
      viewer.removeEventListener('error', onErr);
      viewer.removeEventListener('camera-change', onCam);
      cancelAnimationFrame(aid);
    };
  }, [modelSrc]);

  return (
    <div className="mv-canvas">
      <model-viewer
        ref={viewerRef}
        src={modelSrc}
        alt="Hintze Hall 3D Exhibition"
        camera-controls
        shadow-intensity="1"
        exposure="1"
        environment-image="neutral"
        tone-mapping="aces"
        min-camera-orbit="auto auto 0m"
        reveal="auto"
        loading="lazy"
        interpolation-decay="150"
        interaction-prompt="none"
      ></model-viewer>
    </div>
  );
});
