import React from 'react';
import { frameworkConfig } from '../framework.config';

export const FallbackUI = React.memo(function FallbackUI({ scenes }) {
  return (
    <div style={{ minHeight: '100vh', width: '100%', background: 'var(--bg)', color: 'var(--text-primary)', padding: '48px 24px', overflowY: 'auto' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 48, paddingBottom: 24, borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>
            {frameworkConfig.branding.name}
          </div>
          <h1 style={{ fontSize: 40, fontWeight: 300, letterSpacing: '-0.02em', marginBottom: 12 }}>
            {frameworkConfig.branding.exhibitionTitle}
          </h1>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
            Static Architectural Presentation (3D Engine Unavailable)
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
          {scenes.map((scene, idx) => (
            <div key={scene.id} style={{ padding: 32, borderRadius: 'var(--radius)', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                  Exhibit {String(idx + 1).padStart(2, '0')}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>{scene.subtitle}</span>
              </div>
              <h2 style={{ fontSize: 24, fontWeight: 300, marginBottom: 12 }}>{scene.title}</h2>
              <p style={{ fontSize: 14, fontWeight: 300, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{scene.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
