import React, { useEffect, useRef } from 'react';
import { useUIStore } from '../store/uiStore';

export const AmbientAudio = React.memo(function AmbientAudio() {
  const isPlaying = useUIStore((s) => s.isAudioPlaying);
  const toggle = useUIStore((s) => s.toggleAudio);
  const hide = useUIStore((s) => s.isScreenshotMode);
  const ctxRef = useRef(null);

  useEffect(() => {
    if (!isPlaying) { ctxRef.current?.state === 'running' && ctxRef.current.suspend(); return; }
    if (!ctxRef.current) {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      ctxRef.current = ctx;
      const g = ctx.createGain(); g.gain.setValueAtTime(0.04, ctx.currentTime); g.connect(ctx.destination);
      const o1 = ctx.createOscillator(); o1.type='sine'; o1.frequency.setValueAtTime(55,ctx.currentTime);
      const g1 = ctx.createGain(); g1.gain.setValueAtTime(0.5,ctx.currentTime); o1.connect(g1).connect(g); o1.start();
      const o2 = ctx.createOscillator(); o2.type='sine'; o2.frequency.setValueAtTime(82.41,ctx.currentTime);
      const g2 = ctx.createGain(); g2.gain.setValueAtTime(0.25,ctx.currentTime); o2.connect(g2).connect(g); o2.start();
      const bs=ctx.sampleRate*2, buf=ctx.createBuffer(1,bs,ctx.sampleRate), d=buf.getChannelData(0);
      for(let i=0;i<bs;i++) d[i]=Math.random()*2-1;
      const ns=ctx.createBufferSource(); ns.buffer=buf; ns.loop=true;
      const f=ctx.createBiquadFilter(); f.type='lowpass'; f.frequency.setValueAtTime(280,ctx.currentTime);
      ns.connect(f).connect(g); ns.start();
    } else if (ctxRef.current.state==='suspended') ctxRef.current.resume();
  }, [isPlaying]);

  if (hide) return null;
  return (
    <button className={`ctrl ctrl-audio ${isPlaying?'on':''}`} onClick={toggle}>
      {isPlaying ? '◉' : '○'}<span className="ctrl-lbl">{isPlaying?'Sound On':'Sound'}</span>
    </button>
  );
});
