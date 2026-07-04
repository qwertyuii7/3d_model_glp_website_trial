import React, { useState } from 'react';
import { useDeveloperStore } from '../../store/developerStore';
import { useCameraStore } from '../../store/cameraStore';
import { useUIStore } from '../../store/uiStore';

export const DeveloperHUD = React.memo(function DeveloperHUD() {
  const fps = useDeveloperStore((s) => s.fps);
  const ft = useDeveloperStore((s) => s.frameTime);
  const lo = useDeveloperStore((s) => s.liveOrbit);
  const lt = useDeveloperStore((s) => s.liveTarget);
  const lf = useDeveloperStore((s) => s.liveFov);
  const open = useDeveloperStore((s) => s.isDevHUDOpen);
  const toggle = useDeveloperStore((s) => s.toggleDevHUD);
  const cal = useCameraStore((s) => s.isCalibrationMode);
  const setCal = useCameraStore((s) => s.setCalibrationMode);
  const hide = useUIStore((s) => s.isScreenshotMode);
  const [copied, setCopied] = useState(false);

  if (hide) return null;

  const copy = () => {
    navigator.clipboard.writeText(`{ orbit: "${lo}", target: "${lt}", fov: "${lf}" }`);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <button className={`ctrl ctrl-dev ${open?'on':''}`} onClick={toggle}>
        ⌘<span className="ctrl-lbl">{fps} fps</span>
      </button>
      {open && (
        <div className="dev-panel">
          <div className="dev-head"><span>Camera Inspector</span><button className="dev-close" onClick={toggle}>✕</button></div>
          <div className="dev-row"><span className="l">FPS</span><span className="v">{fps}</span></div>
          <div className="dev-row"><span className="l">Frame</span><span className="v">{ft}ms</span></div>
          <div className="dev-row"><span className="l">Orbit</span><span className="v">{lo}</span></div>
          <div className="dev-row"><span className="l">Target</span><span className="v">{lt}</span></div>
          <div className="dev-row"><span className="l">FOV</span><span className="v">{lf}</span></div>
          <div className="dev-row">
            <span className="l">Calibrate</span>
            <button onClick={() => setCal(!cal)} style={{ background: cal?'rgba(255,255,255,0.12)':'none', border:'1px solid rgba(255,255,255,0.12)', color:'var(--text-dim)', borderRadius:3, padding:'2px 7px', fontSize:9, cursor:'pointer', fontFamily:'var(--font-mono)' }}>
              {cal?'On':'Off'}
            </button>
          </div>
          <button className="dev-copy" onClick={copy}>{copied?'✓ Copied':'Copy Preset'}</button>
        </div>
      )}
    </>
  );
});
