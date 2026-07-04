import React from 'react';
import { useStoryStore } from '../../store/storyStore';
import { useUIStore } from '../../store/uiStore';

export const MiniMap = React.memo(function MiniMap({ scenes }) {
  const activeSceneIndex = useStoryStore((s) => s.activeSceneIndex);
  const isScreenshotMode = useUIStore((s) => s.isScreenshotMode);

  if (isScreenshotMode || !scenes) return null;

  const dotTop = 12 + (activeSceneIndex / Math.max(1, scenes.length - 1)) * 72;
  const dotLeft = 30 + Math.sin(activeSceneIndex * 0.7) * 18;

  return (
    <div style={{
      position: 'fixed', left: 28, top: 110, zIndex: 20,
      padding: 16, borderRadius: 20,
      background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.08)',
      backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
      boxShadow: '0 16px 40px rgba(0,0,0,0.4)', width: 180,
      display: 'none',
    }} className="minimap-wrap">
      <style>{`.minimap-wrap { display: none !important; } @media (min-width: 1024px) { .minimap-wrap { display: block !important; } }`}</style>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.5)', fontWeight: 700 }}>Hall Overview</span>
        <div className="hud-ping" />
      </div>

      <div style={{
        position: 'relative', width: '100%', height: 100,
        background: 'rgba(255,255,255,0.03)', borderRadius: 12,
        border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden',
      }}>
        {}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '14px 14px',
        }} />
        {}
        <div style={{
          position: 'absolute', inset: 10,
          border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8,
        }} />
        {}
        <div style={{
          position: 'absolute', width: 10, height: 10, borderRadius: '50%',
          background: 'var(--accent)', boxShadow: '0 0 12px rgba(56,189,248,0.9)',
          border: '2px solid #fff', transition: 'all 0.7s ease-out', zIndex: 2,
          top: `${dotTop}%`, left: `${dotLeft}%`,
        }} />
        <div style={{ position: 'relative', zIndex: 1, fontFamily: 'var(--font-mono)', fontSize: 8, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', padding: 6, display: 'flex', justifyContent: 'space-between', height: '100%', flexDirection: 'column' }}>
          <span>North</span>
          <span style={{ textAlign: 'right' }}>South</span>
        </div>
      </div>
    </div>
  );
});
