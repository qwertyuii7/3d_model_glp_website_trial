import React, { useEffect } from 'react';
import Lenis from 'lenis';

import { hintzeExhibits } from './data/hintzeHall/exhibits';
import { hintzeCameraPresets } from './data/hintzeHall/cameraPresets';
import { useSceneEngine } from './engine/SceneEngine';
import { useResourceManager } from './engine/ResourceManager';
import { useUIStore } from './store/uiStore';

import { ModelViewerAdapter } from './renderers/ModelViewerAdapter';
import { StorySection } from './components/StorySection';
import { ProgressHUD } from './components/ProgressHUD';
import { Loader } from './components/Loader';
import { AmbientAudio } from './components/AmbientAudio';
import { ScreenshotMode } from './components/plugins/ScreenshotMode';
import { DeveloperHUD } from './components/plugins/DeveloperHUD';
import { StaticFooter } from './components/StaticFooter';

import './styles/globals.css';

export default function App() {
  const status = useResourceManager((s) => s.status);
  const ss = useUIStore((s) => s.isScreenshotMode);

  useSceneEngine(hintzeExhibits, hintzeCameraPresets);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ duration: 1.4, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <>
      <Loader />
      <ModelViewerAdapter modelSrc="/models/hintze_hall_nhm_london_surface_model.glb" />

      {!ss && (
        <>
          <ProgressHUD scenes={hintzeExhibits} />
          <AmbientAudio />
          <DeveloperHUD />
        </>
      )}
      <ScreenshotMode />

      {}
      <div style={{ position: 'relative', zIndex: 5 }}>

        {}
        <section className="hero">
          <div className="hero-bg" />
          <div className="hero-content">
            <div className="hero-tag">
              <span>HISTORIA NATURALIS</span>
              <span className="dot">•</span>
              <span>CATHEDRAL OF NATURE</span>
              <span className="dot">•</span>
              <span>متحف التاريخ الطبيعي</span>
            </div>

            <h1 className="hero-title">Hintze Hall</h1>

            <p className="hero-desc">The Cathedral of Nature.</p>

            <div className="hero-cue">
              <span>Scroll to explore</span>
              <div className="hero-cue-line" />
            </div>
          </div>
        </section>

        {}
        {hintzeExhibits.map((scene, idx) => (
          <StorySection key={scene.id} scene={scene} index={idx} total={hintzeExhibits.length} />
        ))}

        <div className="end-pad" />
        <StaticFooter />
      </div>
    </>
  );
}
