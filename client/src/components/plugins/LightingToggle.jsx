import React from 'react';
import { useUIStore } from '../../store/uiStore';

/**
 * LightingToggle Plugin — Pure CSS classes.
 */
const presets = [
  { id: 'neutral', label: 'Daylight', emoji: '☀️' },
  { id: 'sunset', label: 'Sunset', emoji: '🌅' },
  { id: 'legacy', label: 'Dramatic', emoji: '🌙' },
];

export const LightingToggle = React.memo(function LightingToggle() {
  const lightingPreset = useUIStore((s) => s.lightingPreset);
  const setLightingPreset = useUIStore((s) => s.setLightingPreset);
  const isScreenshotMode = useUIStore((s) => s.isScreenshotMode);

  if (isScreenshotMode) return null;

  return (
    <div className="lighting-toggle-wrap" style={{
      position: 'fixed', left: 28, top: '50%', transform: 'translateY(-50%)', zIndex: 20,
      display: 'none', flexDirection: 'column', gap: 4, padding: 6,
      borderRadius: 18, background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.08)',
      backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
    }}>
      <style>{`.lighting-toggle-wrap { display: none !important; } @media (min-width: 1024px) { .lighting-toggle-wrap { display: flex !important; } }`}</style>
      {presets.map((p) => (
        <button
          key={p.id}
          onClick={() => setLightingPreset(p.id)}
          title={`Lighting: ${p.label}`}
          style={{
            width: 40, height: 40, borderRadius: 12, border: 'none',
            background: lightingPreset === p.id ? '#fff' : 'transparent',
            color: lightingPreset === p.id ? '#000' : 'rgba(255,255,255,0.55)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, transition: 'all 200ms ease',
            boxShadow: lightingPreset === p.id ? '0 0 16px rgba(255,255,255,0.35)' : 'none',
          }}
        >
          {p.emoji}
        </button>
      ))}
    </div>
  );
});
