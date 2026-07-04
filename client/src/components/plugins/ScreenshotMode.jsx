import React from 'react';
import { useUIStore } from '../../store/uiStore';

export const ScreenshotMode = React.memo(function ScreenshotMode() {
  const on = useUIStore((s) => s.isScreenshotMode);
  const toggle = useUIStore((s) => s.toggleScreenshotMode);
  return (
    <button className={`ctrl ctrl-screenshot ${on?'on':''}`} onClick={toggle}>
      ◫<span className="ctrl-lbl">{on?'Exit':'Capture'}</span>
    </button>
  );
});
